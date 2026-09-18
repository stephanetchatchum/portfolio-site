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
