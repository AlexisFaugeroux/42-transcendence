/* global React, MsnIcon, MsnWordmark, MsnAvatar, MsnFramed, MsnSolid */
const { useState: useStateMsg, useMemo: useMemoMsg, useRef: useRefMsg, useEffect: useEffectMsg } = React;

// ===========================================================================
// Demo data — shaped like ConversationSummary / ChatMessage from the design doc
// ===========================================================================
const ME = { id: "u-lex", alias: "lex moreau", handle: "lex.moreau" };

const CONVERSATIONS = [
  {
    id: "c1", lastMessageAt: "11:42", unreadCount: 2,
    peer: { id: "u-maya", artistName: "maya okafor", handle: "maya.o", online: true },
    lastMessage: { body: "sent you the vocal stems, they're at 88 not 92", senderId: "u-maya" },
  },
  {
    id: "c2", lastMessageAt: "09:15", unreadCount: 0,
    peer: { id: "u-theo", artistName: "theo rivera", handle: "theo", online: true },
    lastMessage: { body: "ok I'll bounce side B tonight", senderId: "u-lex" },
  },
  {
    id: "c3", lastMessageAt: "yesterday", unreadCount: 5,
    peer: { id: "u-idris", artistName: "idris khan", handle: "idris", online: false },
    lastMessage: { body: "that break at bar 32 is filthy — what kit is that?", senderId: "u-idris" },
  },
  {
    id: "c4", lastMessageAt: "yesterday", unreadCount: 0,
    peer: { id: "u-anouk", artistName: "anouk lemaire", handle: "anouk", online: true },
    lastMessage: { body: "added you to Friday Lab", senderId: "u-anouk" },
  },
  {
    id: "c5", lastMessageAt: "Mon", unreadCount: 0,
    peer: { id: "u-cleo", artistName: "cleo banner", handle: "cleo.b", online: false },
    lastMessage: { body: "thanks for the feedback on the drum jam ♥", senderId: "u-cleo" },
  },
  {
    id: "c6", lastMessageAt: "Mon", unreadCount: 0,
    peer: { id: "u-jun", artistName: "jun park", handle: "junpark", online: false },
    lastMessage: { body: "master is up, -9 LUFS as asked", senderId: "u-jun" },
  },
  {
    id: "c7", lastMessageAt: "Jul 22", unreadCount: 0,
    peer: { id: "u-rosa", artistName: "rosa petrov", handle: "rosa", online: false },
    lastMessage: { body: "which sample pack was the shaker from?", senderId: "u-rosa" },
  },
];

// Thread for c1, oldest → newest, grouped by day
const THREAD = [
  { day: "Yesterday", messages: [
    { id: "m1", senderId: "u-maya", body: "yo — you around later? want to try tracking those vocals over Liquid Drum", at: "21:04" },
    { id: "m2", senderId: "u-lex",  body: "yeah after 22h, garage is free", at: "21:09" },
    { id: "m3", senderId: "u-maya", body: "perfect. I'll bring the SM7", at: "21:10" },
  ]},
  { day: "Today", messages: [
    { id: "m4", senderId: "u-maya", body: "ok that take was good but the room is ringing a bit around 300", at: "11:31" },
    { id: "m5", senderId: "u-lex",  body: "I hear it. notch it in the mixing session, I left the strip open", at: "11:33" },
    { id: "m6", senderId: "u-lex",  body: "also can you send the raw stems? want to comp take 3 and 4", at: "11:33" },
    { id: "m7", senderId: "u-maya", body: "on it", at: "11:40" },
    { id: "m8", senderId: "u-maya", body: "sent you the vocal stems, they're at 88 not 92", at: "11:42", unread: true },
  ]},
];

const SEARCH_RESULTS = [
  { id: "u-nadia", artistName: "nadia haddad", handle: "nadia.h" },
  { id: "u-noah",  artistName: "noah brandt",  handle: "noah" },
  { id: "u-nina",  artistName: "nina sørlie",  handle: "nina.s" },
];

// ===========================================================================
// Page
// ===========================================================================
window.MessagesPage = function MessagesPage() {
  // "populated" | "empty" | "loading" | "error"
  const [variant, setVariant] = useStateMsg("populated");
  const [activeId, setActiveId] = useStateMsg("c1");
  const [searching, setSearching] = useStateMsg(false);
  const [searchQuery, setSearchQuery] = useStateMsg("");
  const [draft, setDraft] = useStateMsg("");

  const conversations = variant === "empty" ? [] : CONVERSATIONS;
  const unreadTotal = conversations.reduce((a, c) => a + c.unreadCount, 0);
  const active = conversations.find(c => c.id === activeId) || null;

  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      background: "var(--bg-app)", color: "var(--fg1)",
      fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 300,
      overflow: "hidden",
    }}>
      <MsgHeader/>

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <LeftNav unread={unreadTotal}/>

        {/* Conversation list column */}
        <section style={{
          width: 320, flexShrink: 0,
          background: "var(--bg-panel)",
          borderRight: "1px solid var(--line-faint)",
          display: "flex", flexDirection: "column", minHeight: 0,
        }}>
          <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--line-faint)" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
              <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 400, letterSpacing: -0.01 }}>Messages</h1>
              {unreadTotal > 0 && (
                <span style={{
                  background: "var(--color-red)", color: "rgba(0,0,0,0.85)",
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  padding: "1px 6px", borderRadius: 8, lineHeight: "14px",
                }}>{unreadTotal} new</span>
              )}
            </div>
            <NewConversationSearch
              open={searching} setOpen={setSearching}
              query={searchQuery} setQuery={setSearchQuery}
            />
          </div>

          {variant === "loading" ? <ListSkeleton/>
            : variant === "error" ? <ListError/>
            : conversations.length === 0 ? <ListEmpty onSearch={() => setSearching(true)}/>
            : (
              <div style={{ flex: 1, overflow: "auto" }}>
                {conversations.map(c => (
                  <ConversationRow key={c.id} conv={c} active={c.id === activeId} onClick={() => setActiveId(c.id)}/>
                ))}
              </div>
            )}

          <StatePreview variant={variant} setVariant={setVariant}/>
        </section>

        {/* Thread column */}
        {variant === "populated" && active
          ? <MessageThread conv={active} draft={draft} setDraft={setDraft}/>
          : <ThreadEmpty onSearch={() => setSearching(true)}/>}
      </div>
    </div>
  );
};

// ===========================================================================
// App chrome
// ===========================================================================
function MsgHeader() {
  return (
    <header style={{
      height: 56, flexShrink: 0,
      background: "var(--bg-panel)", borderBottom: "1px solid var(--line-faint)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px",
    }}>
      <a href="MakeSomeNoise Landing.html" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <MsnIcon name="msn" size="20px" color="var(--color-orange)"/>
        <MsnWordmark size={15}/>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button title="Notifications" style={{ background: "transparent", border: 0, color: "var(--fg2)", cursor: "pointer" }}>
          <MsnIcon name="bell" size="16px"/>
        </button>
        <a href="MakeSomeNoise Dashboard.html" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <MsnAvatar name={ME.alias} size={28} status="online"/>
          <span style={{ color: "var(--fg1)", fontSize: 12 }}>@{ME.handle}</span>
        </a>
      </div>
    </header>
  );
}

function LeftNav({ unread }) {
  const items = [
    { icon: "home",     label: "Home",        href: "MakeSomeNoise Home.html" },
    { icon: "folder",   label: "My Sessions", href: "MakeSomeNoise Sessions.html", badge: "14" },
    { icon: "music",    label: "Tracks",      badge: "32" },
    { icon: "waveform", label: "Samples",     href: "MakeSomeNoise Samples.html" },
    { icon: "download", label: "Exports" },
  ];
  const social = [
    { icon: "users", label: "Producers", href: "MakeSomeNoise Users.html", badge: "58" },
    { icon: "chat",  label: "Messages",  active: true, badge: unread > 0 ? String(unread) : null, badgeColor: "var(--color-red)" },
    { icon: "heart", label: "Liked" },
    { icon: "list",  label: "Playlists" },
  ];
  const Item = ({ it }) => {
    const inner = (
      <>
        <MsnIcon name={it.icon} size="14px"/>
        <span style={{ flex: 1 }}>{it.label}</span>
        {it.badge && <span style={{
          background: it.badgeColor ? `color-mix(in srgb, ${it.badgeColor} 18%, transparent)` : "var(--color-void)",
          color: it.badgeColor || "var(--fg3)",
          fontSize: 10, padding: "1px 6px", borderRadius: 8, fontFamily: "var(--font-mono)",
        }}>{it.badge}</span>}
      </>
    );
    const style = {
      display: "flex", alignItems: "center", gap: 10,
      padding: "7px 8px", borderRadius: 3, fontSize: 12, textDecoration: "none",
      color: it.active ? "var(--color-orange)" : "var(--fg2)",
      background: it.active ? "color-mix(in srgb, var(--color-orange) 8%, transparent)" : "transparent",
      borderLeft: `2px solid ${it.active ? "var(--color-orange)" : "transparent"}`,
      paddingLeft: it.active ? 6 : 8,
      cursor: "pointer",
    };
    return it.href ? <a href={it.href} style={style}>{inner}</a> : <div style={style}>{inner}</div>;
  };
  const Label = ({ children }) => (
    <div style={{ color: "var(--fg3)", fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", padding: "6px 6px 4px" }}>{children}</div>
  );
  return (
    <nav style={{
      width: 200, flexShrink: 0,
      background: "var(--bg-panel)", borderRight: "1px solid var(--line-faint)",
      padding: "16px 12px", display: "flex", flexDirection: "column", gap: 2,
    }}>
      <Label>Workspace</Label>
      {items.map(it => <Item key={it.label} it={it}/>)}
      <div style={{ height: 14 }}/>
      <Label>Social</Label>
      {social.map(it => <Item key={it.label} it={it}/>)}
      <div style={{ flex: 1 }}/>
      <a href="MakeSomeNoise Dashboard.html" style={{
        display: "flex", alignItems: "center", gap: 8,
        color: "var(--fg2)", fontSize: 11, textDecoration: "none",
        border: "0.5px solid var(--line-soft)", borderRadius: 3, padding: "6px 10px",
      }}>
        <MsnIcon name="settings" size="13px"/> Preferences
      </a>
    </nav>
  );
}

// ===========================================================================
// New conversation search
// ===========================================================================
function NewConversationSearch({ open, setOpen, query, setQuery }) {
  const results = useMemoMsg(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null; // doc: minLength 2 on q
    return SEARCH_RESULTS.filter(u => u.artistName.includes(q) || u.handle.includes(q));
  }, [query]);

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "var(--color-void)",
        border: `0.5px solid ${open ? "var(--color-orange)" : "var(--line-soft)"}`,
        borderRadius: 3, padding: "0 10px", height: 32,
        boxShadow: open ? "0 0 6px -2px var(--color-orange)" : "none",
      }}>
        <MsnIcon name="search" size="13px" color={open ? "var(--color-orange)" : "var(--fg3)"}/>
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={e => setQuery(e.target.value)}
          placeholder="Message a producer…"
          style={{ flex: 1, background: "transparent", border: 0, outline: "none", color: "var(--fg1)", fontFamily: "var(--font-body)", fontSize: 13, height: "100%" }}
        />
        {(query || open) && (
          <button onClick={() => { setQuery(""); setOpen(false); }} style={{ background: "transparent", border: 0, color: "var(--fg3)", cursor: "pointer" }}>×</button>
        )}
      </div>

      {open && (
        <div style={{
          position: "absolute", left: 0, right: 0, top: 38, zIndex: 20,
          background: "var(--bg-elevated)", border: "0.5px solid var(--line-soft)",
          borderRadius: 4, boxShadow: "0 14px 32px rgba(0,0,0,0.55)", padding: 4,
        }}>
          {results === null ? (
            <div style={{ padding: "10px 10px", color: "var(--fg3)", fontSize: 11, fontFamily: "var(--font-mono)" }}>
              Type at least 2 characters
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: "10px 10px", color: "var(--fg3)", fontSize: 12, fontFamily: "var(--font-body)" }}>
              No producer matches “{query}”
            </div>
          ) : results.map(u => (
            <button key={u.id} style={{
              width: "100%", textAlign: "left", background: "transparent", border: 0,
              padding: "7px 8px", borderRadius: 3, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10, color: "var(--fg1)",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "color-mix(in srgb, var(--fg1) 6%, transparent)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <MsnAvatar name={u.artistName} size={26}/>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 12, textTransform: "capitalize", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.artistName}</span>
                <span style={{ display: "block", fontSize: 10, color: "var(--fg3)", fontFamily: "var(--font-mono)" }}>@{u.handle}</span>
              </span>
              <MsnIcon name="arrowR" size="12px" color="var(--color-orange)"/>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// Conversation row
// ===========================================================================
function ConversationRow({ conv, active, onClick }) {
  const mine = conv.lastMessage && conv.lastMessage.senderId === ME.id;
  const unread = conv.unreadCount > 0;
  return (
    <div onClick={onClick} style={{
      display: "flex", gap: 10, padding: "11px 14px",
      borderBottom: "1px solid var(--line-faint)",
      background: active ? "color-mix(in srgb, var(--color-orange) 8%, transparent)" : "transparent",
      borderLeft: `2px solid ${active ? "var(--color-orange)" : "transparent"}`,
      cursor: "pointer",
    }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
      <MsnAvatar name={conv.peer.artistName} size={36} status={conv.peer.online ? "online" : "offline"}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{
            flex: 1, minWidth: 0, fontSize: 13,
            color: unread ? "var(--fg1)" : "var(--fg1)",
            fontWeight: unread ? 400 : 300,
            textTransform: "capitalize",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{conv.peer.artistName}</span>
          <span style={{ color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)", flexShrink: 0 }}>{conv.lastMessageAt}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
          <span style={{
            flex: 1, minWidth: 0, fontSize: 12, fontFamily: "var(--font-body)",
            color: unread ? "var(--fg1)" : "var(--fg3)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {mine && <span style={{ color: "var(--fg3)" }}>You: </span>}
            {conv.lastMessage ? conv.lastMessage.body : <em style={{ color: "var(--fg3)" }}>No messages yet</em>}
          </span>
          {unread && (
            <span style={{
              flexShrink: 0, background: "var(--color-red)", color: "rgba(0,0,0,0.85)",
              fontFamily: "var(--font-mono)", fontSize: 10, minWidth: 18, textAlign: "center",
              padding: "1px 5px", borderRadius: 9, lineHeight: "14px",
              boxShadow: "0 0 8px -3px var(--color-red)",
            }}>{conv.unreadCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Thread
// ===========================================================================
function MessageThread({ conv, draft, setDraft }) {
  const max = 2000;
  return (
    <section style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "var(--bg-panel-2)" }}>
      {/* Thread header */}
      <div style={{
        height: 56, flexShrink: 0, padding: "0 20px",
        borderBottom: "1px solid var(--line-faint)",
        background: "var(--bg-panel)",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <MsnAvatar name={conv.peer.artistName} size={32} status={conv.peer.online ? "online" : "offline"}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, color: "var(--fg1)", textTransform: "capitalize" }}>{conv.peer.artistName}</div>
          <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: conv.peer.online ? "var(--color-green)" : "var(--fg3)" }}>
            {conv.peer.online ? "● online" : "○ offline"} · @{conv.peer.handle}
          </div>
        </div>
        <a href={"MakeSomeNoise Profile.html?u=" + conv.peer.handle} style={{ textDecoration: "none" }}>
          <MsnFramed color="var(--fg1)" size="sm">View profile</MsnFramed>
        </a>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: "auto", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ textAlign: "center", padding: "4px 0 14px" }}>
          <span style={{ color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span className="msn-spin" style={{ width: 10, height: 10, borderRadius: "50%", border: "1.5px solid var(--line-hover)", borderTopColor: "var(--color-orange)", display: "inline-block" }}/>
            loading older messages…
          </span>
        </div>

        {THREAD.map(group => (
          <div key={group.day} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0 8px" }}>
              <div style={{ flex: 1, height: 1, background: "var(--line-faint)" }}/>
              <span style={{ color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 0.5 }}>{group.day}</span>
              <div style={{ flex: 1, height: 1, background: "var(--line-faint)" }}/>
            </div>
            {group.messages.map((m, i) => {
              const prev = group.messages[i - 1];
              return <Bubble key={m.id} m={m} peer={conv.peer} grouped={prev && prev.senderId === m.senderId}/>;
            })}
          </div>
        ))}
      </div>

      {/* Composer */}
      <div style={{ flexShrink: 0, borderTop: "1px solid var(--line-faint)", background: "var(--bg-panel)", padding: "12px 20px" }}>
        <div style={{
          display: "flex", alignItems: "flex-end", gap: 10,
          background: "var(--color-void)", border: "0.5px solid var(--line-soft)",
          borderRadius: 4, padding: "8px 10px",
        }}>
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value.slice(0, max))}
            rows={1}
            placeholder={`Message ${conv.peer.artistName}…`}
            style={{
              flex: 1, background: "transparent", border: 0, outline: "none", resize: "none",
              color: "var(--fg1)", fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5,
              maxHeight: 120, minHeight: 20,
            }}
          />
          <MsnSolid color="var(--color-orange)" size="sm" style={{ opacity: draft.trim() ? 1 : 0.5 }}>
            Send <MsnIcon name="arrowR" size="11px"/>
          </MsnSolid>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ color: "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)" }}>Enter to send · Shift+Enter for a new line</span>
          <span style={{ color: draft.length > max * 0.9 ? "var(--color-yellow)" : "var(--fg3)", fontSize: 10, fontFamily: "var(--font-mono)" }}>{draft.length}/{max}</span>
        </div>
      </div>
    </section>
  );
}

function Bubble({ m, peer, grouped }) {
  const mine = m.senderId === ME.id;
  return (
    <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", gap: 8, marginTop: grouped ? 2 : 8 }}>
      {!mine && (
        <span style={{ width: 26, flexShrink: 0, visibility: grouped ? "hidden" : "visible" }}>
          <MsnAvatar name={peer.artistName} size={26}/>
        </span>
      )}
      <div style={{ maxWidth: "62%", display: "flex", flexDirection: "column", alignItems: mine ? "flex-end" : "flex-start", gap: 3 }}>
        <div style={{
          background: mine ? "color-mix(in srgb, var(--color-orange) 16%, var(--color-void))" : "var(--bg-card)",
          border: `0.5px solid ${mine ? "color-mix(in srgb, var(--color-orange) 45%, transparent)" : "var(--line-soft)"}`,
          borderRadius: 4,
          padding: "8px 11px",
          color: "var(--fg1)", fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5,
          textWrap: "pretty",
        }}>{m.body}</div>
        <span style={{ color: "var(--fg3)", fontSize: 9, fontFamily: "var(--font-mono)", display: "inline-flex", alignItems: "center", gap: 5 }}>
          {m.at}
          {m.unread && <span style={{ color: "var(--color-red)" }}>● new</span>}
        </span>
      </div>
    </div>
  );
}

// ===========================================================================
// Empty / loading / error states
// ===========================================================================
function ThreadEmpty({ onSearch }) {
  return (
    <section style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-panel-2)", padding: 32 }}>
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 8, margin: "0 auto 18px",
          background: "color-mix(in srgb, var(--color-orange) 12%, var(--color-void))",
          border: "1px solid color-mix(in srgb, var(--color-orange) 45%, transparent)",
          color: "var(--color-orange)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 22px -8px var(--color-orange)",
        }}>
          <MsnIcon name="chat" size="30px"/>
        </div>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 400, color: "var(--fg1)" }}>No conversation open</h2>
        <p style={{ margin: "8px 0 18px", color: "var(--fg2)", fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.55 }}>
          Pick a conversation on the left, or search a producer by alias or handle to start a new one.
        </p>
        <MsnSolid color="var(--color-orange)" onClick={onSearch}>
          <MsnIcon name="plus" size="12px"/> Message a producer
        </MsnSolid>
      </div>
    </section>
  );
}

function ListEmpty({ onSearch }) {
  return (
    <div style={{ flex: 1, padding: "40px 20px", textAlign: "center" }}>
      <div style={{ color: "var(--color-orange)", marginBottom: 10 }}><MsnIcon name="chat" size="24px"/></div>
      <h3 style={{ margin: 0, fontWeight: 400, fontSize: 14, color: "var(--fg1)" }}>No conversations yet</h3>
      <p style={{ margin: "6px 0 14px", color: "var(--fg2)", fontFamily: "var(--font-body)", fontSize: 12, lineHeight: 1.5 }}>
        Search a producer above to send your first message.
      </p>
      <MsnFramed color="var(--color-orange)" size="sm" onClick={onSearch}>Find a producer</MsnFramed>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div style={{ flex: 1, overflow: "hidden" }}>
      {[0,1,2,3,4,5].map(i => (
        <div key={i} style={{ display: "flex", gap: 10, padding: "11px 14px", borderBottom: "1px solid var(--line-faint)", opacity: 1 - i * 0.13 }}>
          <div style={{ width: 36, height: 36, borderRadius: 4, background: "var(--bg-card)", flexShrink: 0 }}/>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
            <div style={{ height: 9, width: "52%", background: "var(--bg-card)", borderRadius: 2 }}/>
            <div style={{ height: 8, width: "80%", background: "var(--bg-card)", borderRadius: 2 }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function ListError() {
  return (
    <div style={{ flex: 1, padding: "40px 20px", textAlign: "center" }}>
      <div style={{
        width: 30, height: 30, borderRadius: "50%", margin: "0 auto 12px",
        background: "color-mix(in srgb, var(--color-red) 18%, transparent)",
        border: "1px solid var(--color-red)", color: "var(--color-red)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
      }}>!</div>
      <h3 style={{ margin: 0, fontWeight: 400, fontSize: 14, color: "var(--fg1)" }}>Couldn’t load conversations</h3>
      <p style={{ margin: "6px 0 14px", color: "var(--fg2)", fontFamily: "var(--font-body)", fontSize: 12 }}>
        Connection to the server was lost.
      </p>
      <MsnFramed color="var(--color-red)" size="sm">Retry</MsnFramed>
    </div>
  );
}

// Dev-only state switcher
function StatePreview({ variant, setVariant }) {
  return (
    <div style={{ flexShrink: 0, borderTop: "1px dashed var(--line-soft)", padding: "10px 12px" }}>
      <div style={{ color: "var(--fg3)", fontSize: 9, fontFamily: "var(--font-mono)", marginBottom: 6 }}>// preview state</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {[
          { v: "populated", label: "Populated" },
          { v: "empty",     label: "Empty" },
          { v: "loading",   label: "Loading" },
          { v: "error",     label: "Error" },
        ].map(o => (
          <button key={o.v} onClick={() => setVariant(o.v)} style={{
            background: variant === o.v ? "color-mix(in srgb, var(--color-orange) 14%, transparent)" : "transparent",
            color: variant === o.v ? "var(--color-orange)" : "var(--fg2)",
            border: "0.5px solid var(--line-soft)", borderRadius: 2,
            padding: "5px 8px", fontFamily: "var(--font-display)", fontSize: 10,
            cursor: "pointer", textAlign: "left",
          }}>{o.label}</button>
        ))}
      </div>
    </div>
  );
}
