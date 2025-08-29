"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkUserOnboardingStatus } from "../../../db/supabase-client";
import { useAccountStore } from "../../../store/useAccountStore";

export default function AuthCallbackPage() {
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useAccountStore();

  

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Wait a bit for Supabase to process the OAuth callback
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check user's onboarding status
        const { needsOnboarding, user, error: statusError } = await checkUserOnboardingStatus();
        
        if (statusError) {
          setError(statusError);
          setIsChecking(false);
          return;
        }

        if (user) {
          // Set user in store
          setUser(user);
          
          if (needsOnboarding) {
            // New user or incomplete onboarding - redirect to onboarding
            console.log("User needs onboarding, redirecting to onboarding page");
            router.push("/onboarding");
          } else {
            // Existing user with complete onboarding - redirect to dashboard
            console.log("User onboarding complete, redirecting to dashboard");
            router.push("/dashboard");
          }
        } else {
          setError("Failed to get user information");
          setIsChecking(false);
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setError("Authentication failed. Please try again.");
        setIsChecking(false);
      }
    };

    handleAuthCallback();
  }, [router, setUser]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-full w-full min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="text-red-600 text-center">
            <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
            <p className="text-sm text-grey-secondary mb-4">{error}</p>
            <button 
              onClick={() => router.push("/auth")}
              className="btn bg-grey-primary text-white rounded-xl"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading UI while checking user status
  if (isChecking) {
    return (
      <div className="flex justify-center items-center h-full w-full min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-infinity w-2/10 md:w-20 text-grey-primary"></span>
          <h2 className="text-xl font-semibold text-center text-grey-primary">
            Completing sign in...
          </h2>
          <p className="text-sm text-grey-secondary text-center">
            Please wait while we set up your account
          </p>
        </div>
      </div>
    );
  }

  // This should never be reached, but just in case
  return (
    <div className="flex justify-center items-center h-full w-full min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-infinity w-2/10 md:w-20 text-grey-primary"></span>
        <h2 className="text-xl font-semibold text-center text-grey-primary">
          Redirecting...
        </h2>
        <p className="text-sm text-grey-secondary text-center">
          Please wait while we redirect you
        </p>
      </div>
    </div>
  );
}
