# Kiss A.I. — SFW Anime Avatar Generator

Kiss A.I. is a minimal futuristic anime-avatar generator MVP built with Node.js, Express, and vanilla HTML/CSS/JS.

This project focuses on:

- Safe-for-work (SFW) anime avatar generation flow
- Prompt moderation & sanitization
- Clean Japan-punk futuristic UI
- Lightweight architecture for future expansion

---

# Features

- Minimal futuristic frontend
- Express backend API
- Prompt sanitizer system
- Unsafe content detection
- Denylist moderation
- Placeholder avatar preview
- Report API
- Server-side request logging
- Responsive UI

---

# Tech Stack

Frontend:
- HTML5
- CSS3
- Vanilla JavaScript

Backend:
- Node.js
- Express.js

---

# Project Structure

```txt
kiss-ai/
│
├── server.js
│
├── config/
│   └── moderation.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── logo.svg
│   ├── placeholder.jpg
│   └── terms.html
│
├── package.json
├── package-lock.json
├── README.md
│
└── .gitignore
```

---

# Installation

## 1. Clone Repository

```bash
git clone <your-repo-url>
```

## 2. Open Project

```bash
cd kiss-ai
```

## 3. Install Dependencies

```bash
npm install
```

---

# Run Project

Start the server:

```bash
node server.js
```

Server runs on:

```txt
http://localhost:3000
```

---

# API Routes

## POST `/api/generate`

Generate endpoint with prompt sanitization.

### Request

```json
{
  "prompt": "cyberpunk anime avatar"
}
```

### Safe Response

```json
{
  "blocked": false,
  "sanitizedPrompt": "cyberpunk anime avatar",
  "imageUrl": "/placeholder.jpg"
}
```

### Blocked Response

```json
{
  "blocked": true,
  "sanitizedPrompt": "safe futuristic anime avatar",
  "reasons": ["sexy", "bikini"]
}
```

---

## POST `/api/report`

Simple report endpoint for moderation/report logging.

### Request

```json
{
  "issue": "User reported generated content"
}
```

### Response

```json
{
  "success": true,
  "message": "Report submitted successfully"
}
```

---

# Prompt Moderation

The application uses a denylist-based moderation system.

Blocked categories include:

- Sexual content
- NSFW prompts
- Minor/youth references
- Real-person likeness references
- Fetish-related prompts

Example blocked terms:

```txt
nude
porn
sexy
bikini
teen
child
fetish
celebrity
instagram model
```

---

# Logging

Server logs include:

- Timestamp
- Original prompt
- Blocked status
- Moderation reasons

Example:

```txt
========================
NEW GENERATION REQUEST
========================

Time:
2026-05-13T07:24:42.723Z

Original Prompt:
hot sexy bikini anime girl

Blocked:
true

Reasons:
sexy, bikini
```

---

# Compliance & Safety

This MVP is intentionally designed to remain PG-13 / SFW.

The application does NOT support:

- Explicit sexual content
- Nudity
- Fetish content
- Real-person likeness generation
- Minor/youth-coded prompts
- Face uploads

All generated characters are intended to be fictional anime-style avatars only.

---

# Future Improvements

Possible Milestone 2 features:

- Avatar customization controls
- Real image generation pipeline
- Rate limiting
- Persistent logging
- Database integration
- Authentication
- Prompt history
- Unit testing
- Admin moderation dashboard

---

# Author

Built for the Kiss A.I. MVP demo project.