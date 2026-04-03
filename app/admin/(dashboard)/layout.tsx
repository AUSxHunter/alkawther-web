import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — Al Kawther", robots: "noindex,nofollow" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (!session.isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="h-screen bg-cream flex overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-y-auto pt-[52px] lg:pt-0 p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}
