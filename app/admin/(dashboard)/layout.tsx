import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/projects">Projects</Link>
          <Link href="/admin/blog">Blog</Link>
          <Link href="/admin/cv">CV</Link>
        </div>
        <LogoutButton />
      </nav>
      {children}
    </div>
  );
}
