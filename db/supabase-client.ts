import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY!
);

export const signInToSupabase = async (email: string, password: string) => {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError) {
    console.error("Error signing in:", signInError.message);
    return signInError.message;
  }

  // Session will be automatically updated by AuthGuard's auth state listener
  return null;
};

export const signUpToSupabase = async (email: string, password: string) => {
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) {
    console.error("Error signing up:", signUpError.message);
    return signUpError.message;
  }

  // Session will be automatically updated by AuthGuard's auth state listener
  return null;
};

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  
  if (error) {
    console.error("Error signing in with Google:", error.message);
    return error.message;
  }
  
  return null;
};

// New function to check if user needs onboarding after Google auth
export const checkUserOnboardingStatus = async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { needsOnboarding: false, error: userError?.message || 'No user found' };
  }

  // Check if user has an account record
  const { data: account, error: accountError } = await supabase
    .from("account")
    .select("onboarding_complete")
    .eq("user_id", user.id)
    .single();

  if (accountError) {
    // If no account record exists, user needs onboarding
    if (accountError.code === 'PGRST116') {
      return { needsOnboarding: true, user };
    }
    return { needsOnboarding: false, error: accountError.message };
  }

  return { needsOnboarding: !account.onboarding_complete, user };
};
