import { create } from "zustand";
import { supabase } from "../db/supabase-client";

type Account = {
  user_id: String | undefined;
  name: String;
  preferred_translation: String | null;
  topics_of_interest: String[] | null;
  onboarding_complete: Boolean;

  setUser_id: (user_id?: String) => void;
  setPreferredTranslation: (preferredTranslation: String) => void;
  setTopicsOfInterest: (topics_of_interest: String[]) => void;
  setOnboardingComplete: (onboarding_complete: Boolean) => void;

  completeOnboarding: (
    user_id: String | undefined,
    name: String,
    preferred_translation: String,
    topics_of_interest: String[]
  ) => Promise<null | string>;
};

export const useAccountStore = create<Account>((set, get) => ({
  user_id: undefined,
  name: "",
  preferred_translation: null,
  topics_of_interest: null,
  onboarding_complete: false,

  setUser_id: (user_id) => set({ user_id }),
  setPreferredTranslation: (preferred_translation) =>
    set({ preferred_translation }),
  setTopicsOfInterest: (topics_of_interest) => set({ topics_of_interest }),
  setOnboardingComplete: (onboarding_complete) => set({ onboarding_complete }),

  completeOnboarding: async (
    user_id,
    name,
    preferred_translation,
    topics_of_interest
  ) => {
    // Insert user data to db
    const { error: onboardingError } = await supabase
      .from("account")
      .insert({
        user_id: user_id,
        name,
        preferred_translation,
        topics_of_interest,
        onboarding_complete: true
      });
    if (onboardingError) {
      console.error("Error Onboarding User:", onboardingError.message);
      return onboardingError.message;
    }

    // Updata Account Store State
    get().setUser_id((user_id))
    get().setPreferredTranslation(preferred_translation)
    get().setTopicsOfInterest(topics_of_interest)
    get().setOnboardingComplete(true)
    
    return null;
  },
}));
