import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../db/supabase-client";

type Account = {
  user_id: string | undefined;
  name: string;
  preferred_translation: string | null;
  topics_of_interest: string[] | null;
  study_plan: string | null;
  books: string[] | null;
  onboarding_complete: boolean;

  setUser_id: (user_id?: string) => void;
  setName: (name: string) => void;
  setPreferredTranslation: (preferredTranslation: string) => void;
  setTopicsOfInterest: (topics_of_interest: string[]) => void;
  setStudyPlan: (study_plan: string) => void;
  setBooks: (books: string[]) => void;
  setOnboardingComplete: (onboarding_complete: boolean) => void;

  completeOnboarding: (
    user_id: string | undefined,
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
      user_id: undefined,
      name: "",
      preferred_translation: null,
      topics_of_interest: null,
      study_plan: null,
      books: null,
      onboarding_complete: false,

      setUser_id: (user_id) => set({ user_id }),
      setName: (name) => set({ name }),
      setPreferredTranslation: (preferred_translation) =>
        set({ preferred_translation }),
      setTopicsOfInterest: (topics_of_interest) => set({ topics_of_interest }),
      setStudyPlan: (study_plan) => set({ study_plan }),
      setBooks: (books) => set({ books }),
      setOnboardingComplete: (onboarding_complete) =>
        set({ onboarding_complete }),

      // Complete User Onboarding
      completeOnboarding: async (
        user_id,
        name,
        preferred_translation,
        topics_of_interest,
        study_plan,
        books
      ) => {
        // Insert user data to db
        const { error: onboardingError } = await supabase
          .from("account")
          .insert({
            user_id: user_id,
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
        get().setUser_id(user_id);
        get().setName(name);
        get().setPreferredTranslation(preferred_translation);
        get().setTopicsOfInterest(topics_of_interest);
        get().setStudyPlan(study_plan);
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
          .update({ preferred_translation }) // todo Configure RLS for updates
          .eq("user_id", user?.id);
        if (error) {
          console.error("Error setting preferred translation:", error.message);
          console.log(error.message);
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
