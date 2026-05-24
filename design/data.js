/* global */
// Demo data for the MakeSomeNoise home screen mockups.
window.MSN_DATA = {
  user: {
    name: "Lex Moreau",
    handle: "@lex.moreau",
    plan: "Producer",
  },
  savedSessions: [
    { id: 1, title: "Liquid Drum 808",     kind: "production", bpm: 142, key: "F min",   updated: "2h ago",  duration: "3:42", seed: "liquid808" },
    { id: 2, title: "Tape Saturator demo", kind: "mixing",     bpm: 96,  key: "A min",   updated: "yesterday", duration: "2:51", seed: "tapesat" },
    { id: 3, title: "Vocal Take 04",       kind: "recording",  bpm: 88,  key: "C maj",   updated: "3d ago",  duration: "1:08", seed: "vocal4" },
    { id: 4, title: "Granular Pads",       kind: "production", bpm: 110, key: "D# min",  updated: "1w ago",  duration: "5:20", seed: "granular" },
    { id: 5, title: "Late Night Bounce",   kind: "mixing",     bpm: 128, key: "G min",   updated: "1w ago",  duration: "4:02", seed: "latenight" },
    { id: 6, title: "First Steps",         kind: "production", bpm: 120, key: "C maj",   updated: "2w ago",  duration: "2:14", seed: "firststeps" },
    { id: 7, title: "Field Recording 02",  kind: "recording",  bpm: null, key: null,     updated: "3w ago",  duration: "6:48", seed: "field2" },
  ],
  online: [
    { name: "Maya Okafor",    handle: "@maya.o",    status: "live",    activity: "Recording vocals",        listeners: 12 },
    { name: "Theo Rivera",    handle: "@theo",      status: "online",  activity: "Mixing — Side B",         listeners: 0 },
    { name: "Anouk Lemaire",  handle: "@anouk",     status: "online",  activity: "Producing — 92 BPM",      listeners: 0 },
    { name: "Idris Khan",     handle: "@idris",     status: "live",    activity: "Streaming a beat set",    listeners: 47 },
    { name: "Rosa Petrov",    handle: "@rosa",      status: "idle",    activity: "Browsing samples",        listeners: 0 },
    { name: "Jun Park",       handle: "@junpark",   status: "online",  activity: "Mastering single",        listeners: 0 },
    { name: "Cleo Banner",    handle: "@cleo.b",    status: "live",    activity: "Live drum jam",           listeners: 8 },
    { name: "Sam West",       handle: "@samwest",   status: "online",  activity: "Playlist: late night",    listeners: 0 },
  ],
  activity: [
    { who: "Maya Okafor",  did: "liked",     what: "your track \u201CLiquid Drum 808\u201D",   when: "3m" },
    { who: "Theo Rivera",  did: "commented", what: "on \u201CTape Saturator demo\u201D",     when: "12m" },
    { who: "Anouk Lemaire",did: "added",     what: "you to \u201CFriday Lab\u201D playlist",   when: "1h" },
    { who: "Idris Khan",   did: "started",   what: "a live mixing session",                  when: "2h" },
    { who: "Cleo Banner",  did: "followed",  what: "you back",                                when: "5h" },
  ],
};
