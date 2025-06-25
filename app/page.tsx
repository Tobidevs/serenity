"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "../components/ui/sidebar";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3  justify-center relative items-center w-full h-full border">
      <div className="flex">
        <button className="btn" onClick={() => router.push("/auth")}>
          Sign in
        </button>
      </div>
      <div className="text-4xl w-fit h-fit">Landing Page</div>
      <p className="text-[#505673]">Under Construction</p>
    </div>
  );
}
