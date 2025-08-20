"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSessionStore } from "../store/useSessionStore";
import { useAccountStore } from "../store/useAccountStore";
import { supabase } from "../db/supabase-client";
import { RouteToAuth } from "./route-to-auth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const { session, setSession } = useSessionStore();
  const [isLoading, setIsLoading] = useState(true);

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/auth", "/help-serenity"];
  
  // Define semi-protected routes that require auth but have special handling
  const semiProtectedRoutes = ["/onboarding"];

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(initialSession);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
        if (isMounted) {
          setSession(null);
          setIsLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        console.log("Auth state changed:", event, session?.user?.email);
        
        setSession(session);
        
        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            // User signed in, load their account data
            if (session) {
              try {
                await useAccountStore.getState().loadAccount();
              } catch (error) {
                console.error("Error loading account after sign in:", error);
              }
            }
            break;
            
          case 'SIGNED_OUT':
            // User signed out, clear all local data
            console.log("User signed out, clearing stores");
            // Reset account store to initial state
            const accountStore = useAccountStore.getState();
            accountStore.setUser(undefined);
            accountStore.setName("");
            accountStore.setPreferredTranslation(null);
            accountStore.setTopicsOfInterest(null);
            accountStore.setStudyPlan(null);
            accountStore.setBooks(null);
            accountStore.setOnboardingComplete(false);
            break;
            
          case 'TOKEN_REFRESHED':
            // Session was refreshed, no additional action needed
            console.log("Token refreshed successfully");
            break;
            
          case 'USER_UPDATED':
            // User data was updated
            console.log("User data updated");
            break;
        }
      }
    );

    // Initialize auth
    initializeAuth();

    // Cleanup function
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setSession]);

  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(pathname);
  const isSemiProtectedRoute = semiProtectedRoutes.includes(pathname);

  // If it's a public route, always render children
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For protected and semi-protected routes, show loading while checking auth
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

  // For protected and semi-protected routes, check if user is authenticated
  if (!session) {
    return <RouteToAuth />;
  }

  // For semi-protected routes (like onboarding), allow access regardless of onboarding status
  // The individual page components will handle their own logic
  if (isSemiProtectedRoute) {
    return <>{children}</>;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
