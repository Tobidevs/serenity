import { create } from "zustand";
import { supabase } from "../db/supabase-client";

type Account = {
  user_id: String | undefined;
  name: String;
  preferred_translation: String | null;
  topics_of_interest: String[] | null;
  study_plan: String | null;
  books: String[] | null;
  onboarding_complete: Boolean;

  setUser_id: (user_id?: String) => void;
  setName: (name: String) => void;
  setPreferredTranslation: (preferredTranslation: String) => void;
  setTopicsOfInterest: (topics_of_interest: String[]) => void;
  setStudyPlan: (study_plan: String) => void;
  setBooks: (books: String[]) => void;
  setOnboardingComplete: (onboarding_complete: Boolean) => void;

  completeOnboarding: (
    user_id: String | undefined,
    name: String,
    preferred_translation: String,
    topics_of_interest: String[],
    studyPlan: String,
    books: String[]
  ) => Promise<null | string>;
};

export const useAccountStore = create<Account>((set, get) => ({
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
  setOnboardingComplete: (onboarding_complete) => set({ onboarding_complete }),

  completeOnboarding: async (
    user_id,
    name,
    preferred_translation,
    topics_of_interest,
    study_plan,
    books
  ) => {
    // Insert user data to db
    const { error: onboardingError } = await supabase.from("account").insert({
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
}));
