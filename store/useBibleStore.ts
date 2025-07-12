import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAccountStore } from "./useAccountStore";

type TranslationBook = {
  bookid: number;
  chronorder: number;
  name: string;
  chapters: number;
};

type BibleStore = {
  translation: string | null;
  translationBooks: TranslationBook[] | null;

  setTranslation: (translation: string) => void;

  getTranslationBooks: () => Promise<void>;
};

const preferred_translation = useAccountStore.getState().preferred_translation;

export const useBibleStore = create<BibleStore>()(
  persist(
    (set, get) => ({
      translation: preferred_translation || null,
      translationBooks: null,

      setTranslation: (translation: string) => {
        set({ translation });
      },

      

      // Method to fetch books based on translation
      getTranslationBooks: async () => {
        try {
          // Simulate fetching books from an API or database
          const response = await fetch(
            `https://bolls.life/get-books/${get().translation}/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch books");
          }
          const data = await response.json();

          set({ translationBooks: data });
          console.log("Fetched translation books:", data);
        } catch (error) {
          console.error("Error fetching translation books:", error);
        }
      },
    }),
    {
      name: "bible-store",
    }
  )
);
