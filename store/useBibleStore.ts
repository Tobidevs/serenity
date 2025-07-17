import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAccountStore } from "./useAccountStore";
import { translationsData } from "../data/translation-data";
import { bibleBooks } from "../data/bible-data";

export type TranslationBook = {
  bookid: number;
  chronorder: number;
  name: string;
  chapters: number;
};

export type BibleText = {
  pk: number;
  verse: number;
  text: string;
};

type BibleStore = {
  bibleText: BibleText[] | null;
  selectedChapter: number | null;
  selectedBook: string;
  selectedTranslation: string | null;
  translationBooks: TranslationBook[] | null;
  setBibleText: (bibleText: BibleText[] | null) => void;
  setSelectedChapter: (selectedChapter: number | null) => void;
  setSelectedBook: (selectedBook: string) => void;
  setSelectedTranslation: (selectedTranslation: string) => void;
  getTranslationAbbrev: () => string | undefined;
  getBookChapters: (book: string) => TranslationBook | undefined;
  getTranslationBooks: () => Promise<void>;
  getBibleText: (
    selectedChatper: number | null,
    selectedTranslation?: string | null
  ) => void;
  getBookIndex: () => number | null;
};

const preferred_translation = useAccountStore.getState().preferred_translation;

export const useBibleStore = create<BibleStore>()(
  persist(
    (set, get) => ({
      bibleText: null,
      selectedChapter: null,
      selectedBook: "",
      selectedTranslation: preferred_translation || null,
      translationBooks: null,
      setBibleText: (bibleText) => set({ bibleText }),
      setSelectedChapter: (selectedChapter) => set({ selectedChapter }),
      setSelectedBook: (selectedBook) => set({ selectedBook }),
      setSelectedTranslation: (selectedTranslation: string) =>
        set({ selectedTranslation }),

      getTranslationAbbrev: () => {
        const selectedTranslation = translationsData.find(
          (selectedTranslation) =>
            selectedTranslation.name === get().selectedTranslation
        );
        return selectedTranslation?.abbreviation;
      },

      getBookChapters: (book: string) => {
        return get().translationBooks?.find(
          (translationBook) => translationBook.name === book
        );
      },

      // Method to fetch books based on selectedTranslation
      getTranslationBooks: async () => {
        console.log(get().selectedTranslation);
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
        } catch (error) {
          console.error("Error fetching selectedTranslation books:", error);
        }
      },

      getBookIndex: () => {
        const index = bibleBooks.findIndex(
          (book) => book === get().selectedBook
        );
        return index !== -1 ? index + 1 : null;
      },

      getBibleText: async (selectedChapter, selectedTranslation?) => {
        // Update Selected Chapter State
        get().setSelectedChapter(selectedChapter);
        // If Translation is provided, update the selected translation
        if (selectedTranslation) {
          get().setSelectedTranslation(selectedTranslation);
        }

        const bookIndex = get().getBookIndex();
        const abbrev = get().getTranslationAbbrev();
        try {
          const response = await fetch(
            `https://bolls.life/get-text/${abbrev}/${bookIndex}/${selectedChapter}/`
          );
          if (!response.ok) {
            throw new Error("API failed to fetch");
          }
          const data = await response.json();
          set({ bibleText: data });
        } catch (error) {
          console.error("Error fetching Bible text:", error);
        }
      },
    }),
    {
      name: "bible-store",
    }
  )
);
