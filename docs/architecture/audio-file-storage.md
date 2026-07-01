# Audio File Storage & Access Control

Status: exploratory
Last updated: 2026-05-26

## Hosting

Preferred option: **Infomaniak VPS Lite** (from EUR 2.70/month).

- 1 vCPU, 2 GB RAM, 20 GB NVMe
- 500 Mb/s bandwidth, unlimited traffic
- Root SSH access, DDoS protection, Swiss-hosted

The VPS also serves the frontend builds and runs the Node.js backend (see
[deployment.md](deployment.md) if created). Audio files are served by nginx
as static content.

### Alternatives considered

| Option                        | Notes                                 |
| ----------------------------- | ------------------------------------- |
| Cloudflare R2                 | 10 GB free, no egress fees            |
| Backblaze B2 + Cloudflare CDN | 10 GB free, zero egress               |
| Oracle Cloud Free Tier        | Free ARM VPS, unreliable availability |

## Initial upload

Bulk upload via rsync over SSH:

```
rsync -avz ./samples/ root@<vps-ip>:/var/www/audio/
```

## User uploads

```
POST  /api/audio/upload         -> validates, stores to /var/www/audio/{userId}/{file}
GET   /audio/{userId}/{file}    -> served by nginx with auth gate
```

Backend validates file type, size, and sanitizes filenames.

## Per-user access control (nginx auth_request)

nginx delegates auth to the backend before serving any file:

```nginx
location /audio/ {
    auth_request /auth/check-access;
    root /var/www;
}

location = /auth/check-access {
    internal;
    proxy_pass http://localhost:3000/api/audio/check-access;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
    proxy_set_header X-Original-URI $request_uri;
    proxy_set_header Cookie $http_cookie;
}
```

The backend checks file ownership in the database — not URL structure.
Returns 200 (serve), 403 (denied), or 404 (not found).

### Ownership check (backend)

```
checkAccess(req):
    userId   = extractUserFromJWT(req.cookie)
    filePath = req.headers['x-original-uri']

    file = db.audioFiles.findOne({ path: filePath })

    if !file          -> 404
    if file.userId != userId -> 403
    return 200
```

### Data model

```
audio_files
    id        UUID   PK
    user_id   UUID   FK -> users
    filename  TEXT
    path      TEXT
    mime_type TEXT
    size      BIGINT
    created_at TIMESTAMP
```

## Security considerations

- Always validate file type and size on upload
- Sanitize filenames to prevent path traversal (`../../` attacks)
- Rate-limit uploads to prevent abuse
- The `auth_request` check must verify ownership, not just authentication —
  otherwise any logged-in user can access any file
- Storage quotas per user to prevent disk exhaustion on the VPS (20 GB shared)

## Open questions

- Per-user storage quota
- Public / shared samples
- Audio format constraints (wav, mp3, ogg?)
- Transcode on upload?
