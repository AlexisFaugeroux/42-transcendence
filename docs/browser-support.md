# Browser support and known limitations

Which browsers MakeSomeNoise runs on, what each part of the application requires from
the browser, and where behaviour differs.

The mandatory target is the latest stable **Google Chrome**. On top of that the project
claims support for **Firefox** and **Safari**.

## Supported browsers

| Browser         | Minimum version | Status                                                         |
| --------------- | --------------- | -------------------------------------------------------------- |
| Chrome / Edge   | 119             | Reference target. Everything, including the studio.            |
| Firefox         | 121             | Everything, including the studio. See the notes below.         |
| Safari (macOS)  | 17.4            | Everything, including the studio. See the notes below.         |
| Safari (iOS)    | 17.4            | Front only — the studio is not usable, see below.              |
| Mobile browsers | —               | Front only. The studio requires a pointer and a wide viewport. |

The minimum versions are not arbitrary: they are the versions where the last of the
features the studio hard-requires became available. The binding one is
`Promise.withResolvers` (Chrome 119, Firefox 121, Safari 17.4).

## What the application requires from the browser

### The front (`apps/front`)

Standard: ES2022, CSS nesting via the SASS build, `fetch`, `URL.createObjectURL`,
`<canvas>` 2D for waveform rendering, WebSocket. Nothing exotic, and nothing that
excludes a current browser.

### The studio (`apps/studio`)

The studio checks its own requirements at startup — `testFeatures()` in
`apps/studio/src/lib/projectSetup.ts` — and refuses to boot rather than failing halfway
through loading a project:

| Requirement                        | Why                                         | Chrome | Firefox | Safari |
| ---------------------------------- | ------------------------------------------- | ------ | ------- | ------ |
| `Promise.withResolvers`            | openDAW SDK internals                       | 119    | 121     | 17.4   |
| `indexedDB`                        | project and sample caching                  | ✅     | ✅      | ✅     |
| `AudioWorkletNode`                 | the audio engine runs in an AudioWorklet    | 66     | 76      | 14.1   |
| `navigator.storage.getDirectory()` | OPFS — the SDK's local file storage         | 86     | 111     | 15.2   |
| `crypto.randomUUID`                | box and clip identifiers                    | 92     | 95      | 15.4   |
| `crypto.subtle.digest`             | content hashing — **secure context only**   | ✅     | ✅      | ✅     |
| `SharedArrayBuffer`                | audio frames shared with the worklet thread | 68     | 79      | 15.2   |

## The cross-origin isolation constraint

`SharedArrayBuffer` is only exposed to a **cross-origin isolated** page. The studio is
therefore served with two headers, in development by Vite
(`apps/studio/vite.config.ts`) and in production by nginx
(`apps/studio/nginx-spa.conf`):

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

This is the single most restrictive thing about the studio, and it has consequences
that are the same in every browser but produce different error messages:

- **Every cross-origin subresource must opt in.** Under `require-corp`, an image, audio
  file or script coming from another origin is blocked unless it is fetched in CORS mode
  against a server that allows the origin, or carries
  `Cross-Origin-Resource-Policy: cross-origin`. Audio is served by `nginx-media` on a
  separate origin, which sends `Access-Control-Allow-Origin` and
  `Access-Control-Allow-Credentials` (`infra/nginx/media.conf`), so a `fetch` in CORS
  mode works — but a bare `<audio src="…">` or `<img src="…">` pointing at that origin
  is blocked, because it is a no-CORS request and the response carries no
  `Cross-Origin-Resource-Policy`.
  **Limitation:** any new cross-origin media added to the studio must be loaded through
  `fetch`, not through a bare `src` attribute, until a
  `Cross-Origin-Resource-Policy: cross-origin` header is added to `media.conf`.
- **No third-party embeds.** No external iframe, font CDN, analytics or embedded player
  can be added to the studio without breaking isolation.
- **`crypto.subtle` needs a secure context.** The studio works on `localhost` and over
  HTTPS, never over plain HTTP on a LAN address. Testing from another machine means
  using the HTTPS reverse proxy, not `http://<ip>:5174`.

## Known browser-specific limitations

### Safari

- **`<a download>` is ignored for cross-origin URLs.** Track download in
  `apps/front/src/pages/Tracks/TrackList.tsx` uses a plain `<a download>` pointing at
  the media origin: Safari opens the file in a tab instead of saving it. Sample download
  does not have the problem because `downloadSample()`
  (`apps/front/src/pages/Samples/helpers.ts`) fetches the file and builds a blob URL
  first. **Fix: make track download go through the same helper.**
- **Strictest autoplay policy.** An `AudioContext` starts `suspended` and only resumes
  inside a user gesture. Playback always begins from a click in the interface; a
  programmatic `play()` outside a gesture is silently ignored.
- **iOS Safari: the studio is not usable.** It is not a bug to fix but a design limit —
  the timeline assumes a pointer, a keyboard and a wide viewport. The front (library,
  tracks, producers, messages) works normally on iOS.
- **Self-signed certificate.** In production the certificate is generated by the
  `reverse-proxy-seeder` container. Safari's warning flow is stricter than Chrome's:
  the exception has to be accepted through _Show details → visit this website_, and
  Safari will not open a WebSocket to an origin whose certificate has not been accepted
  in a normal tab first. **Accept the certificate on `https://localhost:8443` before
  logging in**, or presence and chat will silently fail to connect.

### Firefox

- **`<a download>` is also ignored for cross-origin URLs**, with the same consequence
  and the same fix as above.
- **Distinct OPFS quota.** Firefox applies its own storage quota to the origin private
  file system. In a private window OPFS is unavailable, so `testFeatures()` fails and
  the studio refuses to start — this is expected, not a regression.
- **WebSocket over a self-signed certificate.** Like Safari, Firefox refuses `wss://`
  to an origin whose certificate has not been accepted; accept it on the page first.

### Chrome / Edge

- Reference target. No known limitation.
