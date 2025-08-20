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
