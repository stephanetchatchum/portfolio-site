export type ProjectStatus = "idea" | "in-progress" | "shipped" | "paused";

export interface Project {
  id: string;
  title: string;
  slug: string;
  status: ProjectStatus;
  short_description: string | null;
  tech_stack: string[];
  build_notes: unknown | null; // Tiptap JSON — upgraded from plain text later
  deploy_link: string | null;
  repo_link: string | null;
  vlog_link: string | null;
  vlog_summary: unknown | null;
  key_achievements: string[];
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export type BlogPostType = "general" | "project-update";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  post_type: BlogPostType;
  project_id: string | null;
  content: unknown | null; // plain text for now, Tiptap JSON later
  published_at: string | null;
  created_at: string;
  updated_at: string;
}