import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAccountStore } from "./useAccountStore";
import { translationsData } from "../data/translation-data";

export type TranslationBook = {
  bookid: number;
  chronorder: number;
  name: string;
  chapters: number;
};

type BibleStore = {
  selectedChapter: number | null;
  selectedBook: string;
  translation: string | null;
  translationBooks: TranslationBook[] | null;
  setSelectedChapter: (selectedChapter: number | null) => void;
  setSelectedBook: (selectedBook: string) => void;
  setTranslation: (translation: string) => void;
  getTranslationAbbrev: () => string | undefined;
  getBookChapters: (book: string) => TranslationBook | undefined;
  getTranslationBooks: () => Promise<void>;
};

const preferred_translation = useAccountStore.getState().preferred_translation;

export const useBibleStore = create<BibleStore>()(
  persist(
    (set, get) => ({
      selectedChapter: null,
      selectedBook: "",
      translation: preferred_translation || null,
      translationBooks: null,
      setSelectedChapter: (selectedChapter) => set({ selectedChapter }),
      setSelectedBook: (selectedBook) => set({ selectedBook }),
      setTranslation: (translation: string) => set({ translation }),

      getTranslationAbbrev: () => {
        const translation = translationsData.find(
          (translation) => translation.name === get().translation
        );
        return translation?.abbreviation;
      },

      getBookChapters: (book: string) => {
        return get().translationBooks?.find(
          (translationBook) => translationBook.name === book
        );
      },

      // Method to fetch books based on translation
      getTranslationBooks: async () => {
        const abbrev = get().getTranslationAbbrev();
        try {
          // Simulate fetching books from an API or database
          const response = await fetch(
            `https://bolls.life/get-books/${abbrev}/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch books");
          }
          const data = await response.json();

          set({ translationBooks: data });
          console.log(get().translation);
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
