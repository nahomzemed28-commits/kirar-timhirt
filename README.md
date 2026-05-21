# Kirar Timhirt ✛

> **"Timhirt"** (ትምህርት) means *teaching* or *learning* in Amharic.

An educational platform for learning the **Kirar** — a six-string lyre at the heart of Ethiopian Orthodox church music, traditional Mezmur, and Ethiopian folk tradition. Built so that anyone, anywhere, can learn this ancient instrument through structured video lessons, looping finger-pattern GIFs, and a clear, step-by-step curriculum.

---

## What Is the Kirar?

The Kirar is one of the oldest stringed instruments in the world. It appears in ancient Ethiopian manuscripts, church ceremonies, and the music of legendary artists like **Tewodros Kassahun (Teddy Afro)** and **Mahmoud Ahmed**. Despite its cultural significance, almost no structured learning resources exist online in English or Amharic. This platform exists to change that.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth & Database | Supabase |
| Payments | Stripe |
| Video Hosting | (planned — see [Video Infrastructure](#video-infrastructure)) |
| Deployment | Vercel |

---

## Project Structure

```
kirar-timhirt/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Sign-in page
│   │   └── signup/page.tsx         # Sign-up page (with plan selection)
│   ├── (protected)/
│   │   ├── dashboard/page.tsx      # Student dashboard — progress overview
│   │   ├── lessons/[id]/page.tsx   # Individual lesson page
│   │   └── layout.tsx              # Auth guard for protected routes
│   ├── auth/signout/route.ts       # Supabase sign-out API route
│   ├── globals.css                 # Tailwind base + custom design tokens
│   ├── layout.tsx                  # Root layout (font, metadata)
│   └── page.tsx                    # Public landing page
├── components/
│   ├── lesson/
│   │   ├── GifLoop.tsx             # Looping finger-pattern GIF viewer
│   │   ├── MarkComplete.tsx        # Lesson completion button + Supabase write
│   │   └── VideoPlayer.tsx         # Embedded video player
│   └── nav/
│       ├── Navbar.tsx              # Top navigation bar (public)
│       └── Sidebar.tsx             # Side navigation (protected routes)
├── lib/
│   └── supabase/                   # Supabase client (browser + server)
├── public/
│   └── assets/                     # Kirar.png, Angel head.png, Meskel.png
└── supabase/                       # (Supabase migrations — add here)
```

---

## Curriculum Structure

The course is divided into **4 levels**, each unlocking after the previous is completed. This is enforced in the database via `order_index` on both lessons and levels.

| Level | Title | Description |
|---|---|---|
| 01 | Foundations | Posture, string names, tuning by ear, and your first clean pluck |
| 02 | Patterns | Repeating patterns, right-hand rhythm, and building speed safely |
| 03 | Real Music | Traditional melodies and beginner Mezmur |
| 04 | Expression | Improvisation, feel, and personal voice on the instrument |

### Lesson Format

Every lesson follows the same three-part structure:

1. **Video** — Short, focused lesson (recorded and uploaded by the instructor)
2. **GIF Pattern Loop** — An endlessly looping animation showing the exact finger movement
3. **Challenge** — A concrete task the student must complete before marking the lesson done

---

## Database Schema

The app reads from three Supabase tables:

### `levels`
```sql
id          uuid primary key
title       text            -- e.g. "Foundations"
order_index integer         -- determines unlock order (1, 2, 3, 4)
```

### `lessons`
```sql
id          uuid primary key
title       text
level_id    uuid references levels(id)
order_index integer         -- lesson order within the level
video_url   text            -- hosted video URL (see Video Infrastructure)
gif_url     text            -- hosted GIF URL
challenge   text            -- the prompt shown to the student
is_free     boolean         -- first two lessons are free without login
```

### `user_progress`
```sql
id          uuid primary key
user_id     uuid references auth.users(id)
lesson_id   uuid references lessons(id)
completed   boolean default false
completed_at timestamptz
```

### Row Level Security (RLS)

Enable RLS on all three tables. `user_progress` rows should only be readable and writable by the user who owns them:

```sql
-- users can only see their own progress
create policy "Own progress only"
on user_progress for all
using (auth.uid() = user_id);
```

---

## Video Infrastructure

Video lessons are recorded by the instructor and must be hosted somewhere fast and streamable. Three options in order of recommendation:

### Option A — Mux (Recommended)
- Upload videos via Mux API or dashboard
- Mux transcodes to HLS automatically (adaptive bitrate)
- Embed with `<video>` or the `@mux/mux-player-react` component
- Store the `mux_playback_id` in the `lessons.video_url` column
- Cost: ~$0.015/min stored + $0.025/min delivered

### Option B — Supabase Storage
- Store video files directly in a Supabase Storage bucket
- Good for small libraries (< 50 videos, < 10GB total)
- No transcoding — serve as-is via signed URLs
- Add `video_path` column to `lessons` and generate signed URLs server-side

### Option C — YouTube (Unlisted)
- Upload lessons as unlisted YouTube videos
- Embed via `<iframe>` with `youtube.com/embed/{videoId}`
- Free, but students can navigate away from your platform
- Good for MVP / testing content before investing in hosting

### GIF Storage

Finger-pattern GIFs should be uploaded to **Supabase Storage** in a public bucket called `lesson-gifs`. Reference the public URL in `lessons.gif_url`.

```
https://<project>.supabase.co/storage/v1/object/public/lesson-gifs/<filename>.gif
```

---

## Local Development

### Prerequisites
- Node.js 20+
- A Supabase project
- A Stripe account (for payment flows)

### 1. Clone and install

```bash
git clone <repo-url>
cd kirar-timhirt
npm install
```

### 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Authentication

Auth is handled entirely by **Supabase Auth** (email + password). The flow:

- `/signup` — creates a Supabase account; Stripe customer is created on first payment
- `/login` — signs in and redirects to `/dashboard`
- `/auth/signout` — server route that clears the session and redirects to `/`

Protected routes live under `app/(protected)/` and are guarded by the layout at `app/(protected)/layout.tsx`, which checks for a valid Supabase session server-side.

---

## Payments

Stripe handles both pricing tiers:

| Plan | Price | Description |
|---|---|---|
| Monthly | $19/month | Full access, cancel anytime |
| Lifetime | $79 one-time | Full access forever, includes future lessons |

The first two lessons (`is_free = true`) are accessible without a subscription.

Webhook events to handle:
- `checkout.session.completed` — grant access
- `customer.subscription.deleted` — revoke monthly access

---

## Deployment

The app is designed to deploy on **Vercel** with zero configuration. Push to `main` and Vercel picks up the Next.js app automatically.

Set all environment variables in the Vercel project dashboard under **Settings → Environment Variables**.

---

## Design Language

The visual identity draws from Ethiopian Orthodox iconography:

- **Background**: `#1A1209` — deep, near-black coffee brown
- **Gold accent**: `#C9A84C` — Ethiopian gold, used for all interactive and highlight elements
- **Text**: `#F5EDD6` — warm parchment white
- **Motifs**: Ethiopian cross (✛), Meskel imagery, angel iconography
- **Typography**: Bold, high-contrast headlines; generous letter-spacing on labels

The design avoids the generic "AI startup" aesthetic — no purple gradients, no glassmorphism, no pure blacks. Everything is grounded in the visual culture of Ethiopian Orthodoxy.

---

## Roadmap

- [ ] Real video upload pipeline (Mux or Supabase Storage)
- [ ] Supabase migrations folder with initial schema
- [ ] Stripe webhook handler (`/api/webhooks/stripe`)
- [ ] Admin dashboard for uploading lessons and GIFs
- [ ] Amharic ( አማርኛ) language toggle
- [ ] Mobile app (React Native / Expo)
- [ ] Community forum for students to share recordings

---

## About

Built by **Nahom Zemed** — a student, developer, and Ethiopian musician who couldn't find a single structured resource for learning the Kirar online. This platform is the resource that didn't exist.

The Kirar has been played for thousands of years. It deserves to be taught with the same care.

✛
