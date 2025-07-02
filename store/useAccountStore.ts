import { create } from "zustand";

type Account = {
    accountId: String | null;
    preferred_translation: String | null;
    topics_of_interest: String[] | null;
    onboarding_complete: Boolean | null;

    setAccountId: (accountId: String) => void
    setPreferredTranslation: (preferredTranslation: String) => void
    setTopicsOfInterest: (topics_of_interest: String[]) => void
    setOnboardingComplete: (onboarding_complete: Boolean) => void

    
}

export const useAccountStore = create<Account>((set) => ({
    accountId: null,
    preferred_translation: null,
    topics_of_interest: null,
    onboarding_complete: null,

    setAccountId: (accountId) => set({ accountId }),
    setPreferredTranslation: (preferred_translation) => set({ preferred_translation }),
    setTopicsOfInterest: (topics_of_interest) => set({ topics_of_interest }),
    setOnboardingComplete: (onboarding_complete) => set({ onboarding_complete }),

    

})) 
