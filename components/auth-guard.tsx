"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSessionStore } from "../store/useSessionStore";
import { RouteToAuth } from "./route-to-auth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const { session, fetchSession } = useSessionStore();
  const [isLoading, setIsLoading] = useState(true);

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/auth", "/help-serenity"];

  useEffect(() => {
    const initializeAuth = async () => {
      await fetchSession();
      setIsLoading(false);
    };

    initializeAuth();
  }, [fetchSession]);

  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  // If it's a public route, always render children
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For protected routes, show loading while checking auth
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
        <div className="bg-grey-main h-auto w-5/6 flex flex-col items-center md:w-3/8 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="loading loading-spinner loading-lg"></div>
            <h2 className="text-xl font-semibold text-center text-grey-primary">
              Loading...
            </h2>
            <p className="text-sm text-grey-secondary text-center">
              Checking authentication status
            </p>
          </div>
        </div>
      </div>
    );
  }

  // For protected routes, check if user is authenticated
  if (!session) {
    return <RouteToAuth />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
