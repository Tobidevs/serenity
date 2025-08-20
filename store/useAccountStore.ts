import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../db/supabase-client";
import { User } from "@supabase/supabase-js";

type Account = {
  user: User | null;
  name: string;
  preferred_translation: string | null;
  topics_of_interest: string[] | null;
  study_plan: string | null;
  books: string[] | null;
  onboarding_complete: boolean;

  setUser: (user?: User) => void;
  setName: (name: string) => void;
  setPreferredTranslation: (preferredTranslation: string | null) => void;
  setTopicsOfInterest: (topics_of_interest: string[] | null) => void;
  setStudyPlan: (study_plan: string | null) => void;
  setBooks: (books: string[] | null) => void;
  setOnboardingComplete: (onboarding_complete: boolean) => void;

  fetchUser: () => Promise<void>;
  loadAccount: () => Promise<void>;
  completeOnboarding: (
    name: string,
    preferred_translation: string,
    topics_of_interest: string[],
    studyPlan: string,
    books: string[]
  ) => Promise<null | string>;
  updatePreferredTranslation: (preferred_translation: string) => Promise<void>;
};

export const useAccountStore = create<Account>()(
  persist(
    (set, get) => ({
      user: null,
      name: "",
      preferred_translation: null,
      topics_of_interest: null,
      study_plan: null,
      books: null,
      onboarding_complete: false,

      setUser: (user) => set({ user }),
      setName: (name) => set({ name }),
      setPreferredTranslation: (preferred_translation) =>
        set({ preferred_translation }),
      setTopicsOfInterest: (topics_of_interest) => set({ topics_of_interest }),
      setStudyPlan: (study_plan) => set({ study_plan }),
      setBooks: (books) => set({ books }),
      setOnboardingComplete: (onboarding_complete) =>
        set({ onboarding_complete }),

      // Fetch user
      fetchUser: async () => {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (user) {
          set({ user });
        } else {
          console.error("Failed to fetch user", error?.message);
        }
      },
      // Load account state locally
      loadAccount: async () => {
        await get().fetchUser();
        const { data: account, error: loadAccountError } = await supabase
          .from("account")
          .select("*")
          .eq("user_id", get().user?.id)
          .single();
        if (loadAccountError) {
          console.error("Failed to load account:", loadAccountError?.message);
        } else {
          // Update State locally
          get().setName(account.name);
          get().setPreferredTranslation(account.preferred_translation);
          get().setTopicsOfInterest(account.topics_of_interest);
          get().setStudyPlan(account.study_plan);
          get().setBooks(account.books);
          get().setOnboardingComplete(account.onboarding_complete);
        }
      },

      // Complete User Onboarding
      completeOnboarding: async (
        name,
        preferred_translation,
        topics_of_interest,
        study_plan,
        books
      ) => {
        // Fetch User
        await get().fetchUser();
        // Insert user data to db
        const { error: onboardingError } = await supabase
          .from("account")
          .insert({
            user_id: get().user?.id,
            email: get().user?.email,
            name,
            preferred_translation,
            topics_of_interest,
            study_plan,
            books,
            onboarding_complete: true,
          });
        if (onboardingError) {
          console.error("Error Onboarding User:", onboardingError.message);
          return onboardingError.message;
        }

        // Update Account Store State
        get().setName(name);
        get().setPreferredTranslation(preferred_translation);
        get().setTopicsOfInterest(topics_of_interest);
        get().setStudyPlan(study_plan);
        get().setBooks(books);
        get().setOnboardingComplete(true);

        return null;
      },

      // Update Preferred Translation
      updatePreferredTranslation: async (preferred_translation) => {
        get().setPreferredTranslation(preferred_translation);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { error } = await supabase
          .from("account")
          .update({ preferred_translation })
          .eq("user_id", user?.id);
        if (error) {
          console.error("Error setting preferred translation:", error.message);
        }
      },

      //
    }),
    // Options
    {
      name: "account-store",
    }
  )
);
