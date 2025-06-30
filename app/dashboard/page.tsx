"use client";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { supabase } from "../../db/supabase-client";
import { useSessionStore } from "../../store/useSessionStore";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/navbar";
import { SidebarTrigger } from "../../components/ui/sidebar";

export default function DashboardPage() {
  const { setSession } = useSessionStore();
  const router = useRouter();

  const onLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/");
  };
  return (
    <div>
      <div>Dashboard</div>
      <button className="btn" onClick={onLogout}>
        Log out
      </button>
      <Navbar />
      <SidebarTrigger />
    </div>
  );
}
