"use client";
import { useRouter } from "next/navigation";
import { useSessionStore } from "../store/useSessionStore";
import { useEffect } from "react";

export default function Home() {
  const { session, fetchSession } = useSessionStore();
  const router = useRouter();

  // Check Session on page load
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div className="flex flex-col gap-3  justify-center relative items-center w-full h-full">
      <div className="flex">
        <button
          className="btn"
          onClick={() =>
            session ? router.push("/dashboard") : router.push("/auth")
          }
        >
          Sign in
        </button>
      </div>
      <div className="text-4xl w-fit h-fit">Landing Page</div>
      <p className="text-[#505673]">Under Construction</p>
    </div>
  );
}
