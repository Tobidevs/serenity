import { useRouter } from "next/navigation";
import { useSessionStore } from "../store/useSessionStore";
import { useEffect, useState } from "react";

export const RouteToAuth = () => {
  const router = useRouter();
  const { session, fetchSession } = useSessionStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      await fetchSession();
      setIsLoading(false);
    };
    checkSession();
  }, [fetchSession]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
        <div className="bg-grey-main h-auto w-5/6 flex flex-col items-center md:w-3/8 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="loading loading-spinner loading-lg"></div>
            <h2 className="text-xl font-semibold text-center text-grey-primary">
              Please wait...
            </h2>
            <p className="text-sm text-grey-secondary text-center">
              Checking authentication status
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If we have a session, redirect to dashboard
  if (session) {
    router.push("/dashboard");
    return null;
  }

  // No session - show login prompt
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <div className="bg-grey-main h-auto w-5/6 flex flex-col items-center md:w-3/8 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold text-center text-grey-primary">Login Required</h2>
          <p className="text-sm text-grey-secondary text-center">
            You need to sign in to access this page
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="w-full bg-grey-primary text-white py-2 px-4 font-bold rounded-xl hover:bg-grey-primary/90 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};
