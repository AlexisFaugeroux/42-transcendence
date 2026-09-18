# Real-time (WebSocket)

App: `apps/back` (`@fastify/websocket`) + `apps/front`

One WebSocket carries everything live: **presence** (which followed producers are
online) and **chat delivery**. There is a single endpoint, `GET /api/ws`, and a
single socket per browser tab.

> Collaborative DAW editing was in the original plan and is not implemented.

## Why one socket instead of two

Presence and chat have nothing to do with each other, so two endpoints would be
the obvious design. They share one because they share the thing that is actually
expensive: the _registry_ of who is connected. Presence needs it to answer "is
this user online"; chat needs it to answer "where do I deliver this message".
Splitting them would mean maintaining the same map twice and keeping the two in
agreement.

## Authentication

`routes/websocket.ts` is four lines:

```ts
app.get(
  "/ws",
  { preHandler: app.authenticate, websocket: true },
  websocketController.ws,
);
```

The same `authenticate` preHandler as every REST route. The handshake is a normal
HTTP request, so the session cookie travels with it and the socket cannot open
without a valid, non-revoked session — no token in the query string, no second
auth mechanism to keep in sync. By the time `ws()` runs, `req.authUser.id` is
already there.

## The registry

`utils/websockets.ts` holds the registry — one `WebSocketRegistry` class, exported
as the `webSocketRegistry` singleton — with two in-memory structures:

| Structure  | Type                          | Purpose                            |
| ---------- | ----------------------------- | ---------------------------------- |
| `_sockets` | `Map<userId, Set<WebSocket>>` | every open socket, grouped by user |
| `_alive`   | `WeakMap<WebSocket, boolean>` | heartbeat state for each socket    |

It is a util rather than part of `controllers/websocket.ts` because three callers
need it and only one of them is the socket route: the chat controller delivers
messages through `sendToUsers`, the user controller emits follow events, and the
admin controller calls `closeAll(userId)` so revoking an account's sessions drops
its live sockets instead of leaving them open until the next HTTP call. The
controller keeps presence, the registry keeps connections.

| Method                        | Used by                                     |
| ----------------------------- | ------------------------------------------- |
| `add` / `remove` / `isOnline` | the socket route and the presence broadcast |
| `send` / `sendToUsers`        | presence, chat delivery, follow events      |
| `closeAll(userId)`            | `POST /api/admin/users/revoke`              |

**A user maps to a _set_ of sockets, not one socket.** Three tabs are three
sockets for one user. That is what makes the next rule possible.

**Presence transitions fire on the edges, not on every connect.** A
`followingConnected` broadcast only happens when the set goes from empty to one,
and `followingDisconnected` only when it goes back to zero:

```ts
if (openSockets > 1) return; // already online — no broadcast
await this._broadcastToFollowers(userId, "followingConnected");
```

Without this, opening a second tab would tell all your followers you just came
online, and closing one would tell them you left while you were still there.

**`_alive` is a `WeakMap` on purpose.** Keying by socket object in a `Map` would
keep terminated sockets reachable and leak them; a `WeakMap` lets the entry
disappear with the socket.

## Heartbeat

The registry's constructor starts one interval for the whole process:

```ts
setInterval(() => {
  /* terminate sockets that did not pong, then ping the rest */
}, 15000).unref();
```

The mark-and-sweep is the standard `ws` pattern: each round terminates any socket
that has not answered the previous `ping`, then sets everyone to `false` and pings
again. A `pong` handler flips the flag back to `true`.

This exists because **TCP does not notice a client that vanished.** A laptop lid
closing or a dropped mobile connection leaves the server holding a socket it
believes is open, so the user shows as online forever and messages are delivered
into a void. Two rounds without a pong (≤30 s) is the detection window.

`.unref()` keeps the interval from holding the Node event loop open, so the
process can still exit.

## The wire protocol

Every frame is JSON with the same envelope — `{ event, data }`. The union is
declared on both ends and named `WebSocketEvent`
(`apps/back/src/utils/websockets.ts`, `apps/front/src/types/event.ts`); the two are
kept in sync by hand:

| `event`                       | `data`     | Direction | Meaning                                                             |
| ----------------------------- | ---------- | --------- | ------------------------------------------------------------------- |
| `onlineFollowingAtConnection` | `string[]` | → client  | user ids of followed producers already online, sent once on connect |
| `followingConnected`          | `string[]` | → client  | a followed producer just came online                                |
| `followingDisconnected`       | `string[]` | → client  | a followed producer went offline                                    |
| `producerFollowed`            | `string[]` | → client  | you just followed someone — sent to **you**, not to them            |
| `producerUnfollowed`          | `string[]` | → client  | you just unfollowed someone                                         |
| `message`                     | `Message`  | → client  | a chat message in one of your conversations                         |

Event names are camelCase. `producerFollowed` / `producerUnfollowed` exist because
the presence set is keyed by the people you follow: following someone mid-session
has to add them to that set (and show them online if they are), which neither a
connect nor a disconnect event would ever tell you.

**The client never sends a frame.** Chat messages are posted over HTTP
(`POST /api/chat/sendMessage`) and the socket is used only for the fan-out. That
keeps validation, rate limiting and error responses in the REST layer, where they
already exist, instead of duplicating them in a message router — and it means a
failed send surfaces as an HTTP error the UI can render, not as silence.

**`onlineFollowingAtConnection` is a snapshot, the other two are deltas.** A
client that only received deltas would start with an empty presence map and stay
wrong until someone happened to connect. The snapshot is sent before the connect
broadcast, and guarded by a re-check that the socket is still in the set —
`await` on the DB read means the client may have disconnected in the meantime.

`_broadcastToFollowers` sends to _followers_, while the snapshot reads
_following_. Both directions of the graph are needed and they are not the same
list: you learn about the people you follow, and the people who follow you learn
about you.

## Front-end side

Three providers, split by responsibility:

| Module                        | Responsibility                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `websocket/WebSocketProvider` | owns the single socket, fans frames out to subscribers                                              |
| `presence/PresenceProvider`   | keeps the online-user set from the five presence events                                             |
| `message/MessageListener`     | turns `message` frames into message **and conversation-list** cache updates (unread badge included) |

`WebSocketProvider` exposes only `subscribe(handler)` returning an unsubscribe
function, and holds handlers in a `useRef<Set<…>>`. The ref matters: putting the
handler set in state would re-run the connection effect on every subscribe and
tear the socket down. The effect depends on `[loading, userId]` only, so the
socket is created once the user is known and re-created only when the account
changes.

`PresenceStatus` is `'online' | 'offline' | 'live'` (`types/user.ts`, next to the
shared `User` type — `types/presence.ts` is gone). `'live'` is rendered purple by
`StatusAvatar` but nothing sets it yet: the socket only ever produces online and
offline. The backend's own union (`UserOnlineStatus['status']` in `domain/user.ts`)
is narrower — just `'online' | 'offline'` — and the two are duplicated by hand: they
do not have to match member for member, but a status the front cannot render would
show up as a missing colour in `STATUS_COLOR`.

`MessageListener` keeps the conversation list coherent as frames arrive — the
unread badge is a cache patch, not a refetch. See
[chat.md](./chat.md#front-end-delivery-path).

### Known limits

- **State is per-process and in memory.** Two backend replicas would each know
  only their own connections, so presence would be wrong and messages would only
  reach participants that happen to land on the same instance. Scaling out needs
  an external registry (Redis pub/sub or similar) first.
- **No reconnection.** `ws.onclose` logs and stops. A dropped connection means
  presence and incoming messages silently stop working until the page is
  reloaded. An exponential-backoff reconnect is the obvious next step.
