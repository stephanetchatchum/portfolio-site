-- v1 schema for the portfolio site.
-- Run via `supabase db push` or paste into the Supabase SQL editor.

create extension if not exists "pgcrypto";

-- ─── Projects ────────────────────────────────────────────────────────────
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  status text not null check (status in ('idea', 'in-progress', 'shipped', 'paused')),
  short_description text,
  tech_stack text[] not null default '{}',
  build_notes jsonb,              -- rich text (Tiptap JSON)
  deploy_link text,
  repo_link text,
  vlog_link text,
  vlog_summary jsonb,             -- { what_it_covers, key_points[], outcome }
  key_achievements text[] not null default '{}',
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Blog posts ──────────────────────────────────────────────────────────
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  post_type text not null check (post_type in ('general', 'project-update')),
  project_id uuid references projects(id) on delete set null,
  content jsonb,                  -- rich text (Tiptap JSON)
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Base CV (singleton) ─────────────────────────────────────────────────
create table base_cv (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_info jsonb,
  summary text,
  education jsonb not null default '[]',       -- [{institution, degree, dates}]
  base_skills text[] not null default '{}',
  past_experience jsonb not null default '[]',  -- [{org, role, dates, description}]
  updated_at timestamptz not null default now()
);

-- ─── Generated CVs ───────────────────────────────────────────────────────
create table generated_cvs (
  id uuid primary key default gen_random_uuid(),
  cv_type text not null check (cv_type in ('general', 'tailored')),
  job_description text,
  content jsonb not null,         -- structured resume content
  pdf_path text,                  -- path in Supabase Storage
  is_public_download boolean not null default false,
  generated_at timestamptz not null default now()
);

-- Only one CV should be "the" public download at a time.
create unique index one_public_cv on generated_cvs (is_public_download)
  where is_public_download;

-- ─── Download rate-limiting log ─────────────────────────────────────────
create table cv_downloads (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,          -- hash the IP, never store it raw
  generated_cv_id uuid references generated_cvs(id) on delete cascade,
  downloaded_at timestamptz not null default now()
);
create index cv_downloads_ip_idx on cv_downloads (ip_hash, downloaded_at);

-- ─── Row Level Security ──────────────────────────────────────────────────
-- Public can read projects/blog posts; only authenticated (admin) can write.
-- Only you have a Supabase Auth account in v1, so "authenticated" == you.

alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table base_cv enable row level security;
alter table generated_cvs enable row level security;
alter table cv_downloads enable row level security;

create policy "public read projects" on projects for select using (true);
create policy "admin write projects" on projects for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read published blog posts" on blog_posts for select
  using (published_at is not null and published_at <= now());
create policy "admin full access blog posts" on blog_posts for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin only base_cv" on base_cv for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read public cv" on generated_cvs for select
  using (is_public_download = true);
create policy "admin full access generated_cvs" on generated_cvs for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- cv_downloads: no public select policy (nobody needs to read this table
-- from the client) — writes happen via the API route using the service role.
