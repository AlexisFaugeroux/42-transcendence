# Direct messages

App: `apps/back` (`routes/chat.ts`, `controllers/chat.ts`, `repositories/chat.ts`)
and `apps/front` (`pages/Messages`, `api/chat`)

One-to-one conversations between two users. Messages are **written over HTTP** and
**delivered over the WebSocket** — see [realtime.md](./realtime.md) for the socket
itself.

## Data model

Three tables (`apps/back/prisma/schema.prisma`):

```
Conversation ──1:N──► ConversationParticipant ──1:N──► Message
                            ▲                            (author, to)
                            │
                          User
```

`ConversationParticipant` is the join row, primary-keyed on
`@@id([conversationId, userId])`.

### Why `Message` points at participants, not users

`Message.author` and `Message.to` are composite foreign keys —
`(conversationId, authorId)` and `(conversationId, toId)` — onto
`ConversationParticipant`, not plain `userId` columns onto `User`.

The payoff is that **"the author is a participant of this conversation" becomes a
referential-integrity guarantee**. With `authorId` referencing `User` directly,
nothing at the database level would stop a row claiming user X wrote in a
conversation X was never part of; every read would have to re-verify it. Here the
foreign key cannot resolve unless the participant row exists.

The cost is that a `Message` cannot exist without its participant rows, and that
`onDelete: Cascade` on `ConversationParticipant` takes the messages with it. That
is the intended behaviour: removing someone from a conversation removes their
messages from it.

### Why `Conversation.pairKey` exists

`pairKey` is `[idUserA, idUserB].sort().join(':')`, with a `@unique` constraint.

Sorting is what makes it canonical: A→B and B→A produce the same key, so the pair
identifies the conversation regardless of who opens it first. The unique index then
makes a duplicate thread **impossible**, including under a race where both users
tap "message" simultaneously — the second insert fails on the constraint instead
of creating a second thread that each user sees half of.

`unreadCount` and `lastReadAt` are denormalised onto the participant row rather
than computed from `Message`. A badge count is read on every conversation-list
render; counting rows for it each time would be a query per conversation.

## API (`/api/chat`, all authenticated)

| Route                                | Purpose                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------- |
| `POST /createConversation`           | create the conversation **and** send its first message                  |
| `POST /sendMessage`                  | send into an existing conversation                                      |
| `GET  /listConversations`            | the caller's conversations, hydrated with participants and last message |
| `GET  /listMessages?conversationId=` | the messages of one conversation                                        |
| `POST /markAsRead`                   | reset the caller's `unreadCount` to 0                                   |

**Every handler re-derives the caller from the session and checks membership.**
`sendMessage` rejects unless `body.authorId === req.authUser.id` _and_ the author
is a participant; `listMessages` and `markAsRead` check membership via the private
`isAParticipant`. The client sends `authorId` in the body, and the server treats it
as a claim to be verified, not as identity — otherwise anyone could post as anyone.

Both writes are wrapped in a `$transaction`: creating a conversation inserts the
`Conversation` and both participant rows together, and sending a message inserts
the `Message`, bumps `Conversation.lastMessageAt` and increments the recipient's
`unreadCount` together. A message that existed without its `lastMessageAt` bump
would sort to the bottom of the conversation list and effectively be invisible.

After the write, the controller calls `websocketController.sendMessage(message)`,
which looks the conversation's participants up in the socket registry and pushes a
`{ event: 'message', data }` frame to each of their open sockets. Participants who
are offline get nothing — they will read it from `listMessages` on their next
visit. There is no offline queue because the database _is_ the queue.

## Front-end delivery path

App: `apps/front` — `api/chat/chat.ts`, `pages/Messages/`, `message/MessageListener`.

`openConversation()` posts the **flat** body `{ authorId, toId, content }` (the
`messageInput` / `message` envelope was removed in `143e2f1`), seeds the returned
conversation into `['conversations', user.id]` and navigates to `/messages/:id`.
`NewConversationModal` picks the recipient from `useUserRelations()` — the union of
`GET /api/user/listFollowers` and `/listFollowing` — minus the users the caller
already has a thread with, which is how the UI avoids the duplicate-conversation
error below.

`MessageListener` does more than append to `['messages', conversationId, user.id]`:

- if the frame's `conversationId` is **not** already in `['conversations', user.id]`,
  it refetches that list — a first message from someone new has no row to patch;
- otherwise it patches the row in place (`lastMessage`, `lastMessageAt`, and the
  recipient's `unreadCount + 1`) and **skips the increment while that thread is
  open** (`useMatch('/messages/:id')`). Without the guard the badge would count
  messages the user is currently reading.

## Known issues

- **`createConversation` throws if the conversation already exists.**
  `createConversation` inserts unconditionally, so the `pairKey` unique constraint
  surfaces as a `ConflictError`. The caller has to know to use `sendMessage`
  instead. The front works around it rather than the server —
  `NewConversationModal` only offers relations with no existing thread — so an
  upsert, or a find-then-create, would make the endpoint idempotent and let the
  modal drop that filter.
- **`Message.updateMessage` / `deleteMessage` / `deleteConversation` exist in the
  repository but are not exposed by any route.** Edit and delete are not
  implemented in the API or the UI.
- **No pagination.** `listMessages` returns the whole conversation.
