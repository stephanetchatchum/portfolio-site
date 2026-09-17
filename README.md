# Portfolio Site

A public portfolio: projects (with status/stage), a blog, and an AI-assisted
CV generator that turns project data into resume content.

## Stack

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Hosting:** Vercel
- **Database + Auth + Storage:** Supabase
- **Rich text editor:** Tiptap (planned — not yet installed)
- **PDF generation:** TBD (Puppeteer/Playwright or `@react-pdf/renderer`)
- **AI provider (CV generation):** TBD

## v1 scope

- [ ] Admin login (single user — you)
- [ ] Project CRUD: title, status, tech stack, build notes (rich text),
      deploy/repo links, vlog link + structured summary, key achievements
- [ ] Public project listing + detail pages
- [ ] Blog posts (general or project-linked), rich text + images
- [ ] Base CV record (education, base skills, past experience)
- [ ] Admin-triggered "Generate CV" → AI merges base CV + projects →
      editable draft → PDF export
- [ ] Public "download latest CV" button, rate-limited by IP + global
      daily cap (see `cv_downloads` table)

**Deferred past v1:** JD-tailored CV generation, visitors generating their
own CV live, YouTube transcript auto-fetch (structured vlog summary covers
this for now).

## Project structure

```
app/
  (public)/
    projects/          # public project listing + [slug] detail pages
    blog/               # public blog listing + [slug] detail pages
  admin/
    login/               # Supabase Auth sign-in
    projects/            # project CRUD
    blog/                # blog post CRUD
    cv/                  # trigger CV generation, review/edit draft
  api/
    cv/generate/         # POST — admin only, calls the AI provider
    cv/download/         # GET  — public, rate-limited
    upload/               # POST — admin only, image uploads to Supabase Storage
lib/
  supabase/
    client.ts            # browser client
    server.ts             # server client (Server Components, Route Handlers)
supabase/
  migrations/
    0001_init.sql         # schema: projects, blog_posts, base_cv,
                           # generated_cvs, cv_downloads + RLS policies
middleware.ts              # protects /admin/* routes
```

## Getting started

1. Create a Supabase project, then copy `.env.example` to `.env.local` and
   fill in the values from Project Settings → API.
2. Run the migration in `supabase/migrations/0001_init.sql` against your
   Supabase project (SQL editor, or `supabase db push` if using the CLI).
3. Create your own Supabase Auth user (Authentication → Users → Add user) —
   this is the only account, used to log into `/admin`.
4. `npm install && npm run dev`

## Build order

Data model → admin auth → project CRUD → public pages → blog →
CV generation (AI + PDF) last, since it depends on real project data
existing first.
