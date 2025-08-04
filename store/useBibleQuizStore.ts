import { create } from "zustand";
import { useAccountStore } from "./useAccountStore";
import { useBibleStore } from "./useBibleStore";
import { translationsData } from "../data/translation-data";

type BibleQuizStore = {
  verse: string | null;
  correctAnswer: string | null;
  incorrectAnswers: string[] | null;
  questionTranslation: string | null;
  setVerse: (verse: string | null) => void;
  setCorrectAnswer: (correctAnswer: string | null) => void;
  setIncorrectAnswers: (incorrectAnswers: string[] | null) => void;
  getTranslationAbbrev: () => string | undefined;

  generateVerses: () => void;
  generateQuestion: (results: ResultsObject[]) => void;
};

type ResultsObject = {
  book: string;
  chapter: number;
  pk: number;
  text: string;
  translation: string;
  verse: number;
};

const { preferred_translation, topics_of_interest } =
  useAccountStore.getState();

export const useBibleQuizStore = create<BibleQuizStore>((set, get) => ({
  verse: null,
  correctAnswer: null,
  incorrectAnswers: null,
  questionTranslation: preferred_translation || null,

  setVerse: (verse) => set({ verse }),
  setCorrectAnswer: (correctAnswer) => set({ correctAnswer }),
  setIncorrectAnswers: (incorrectAnswers) => set({ incorrectAnswers }),
  getTranslationAbbrev: () => {
    const translationAbbrev = translationsData.find(
      (translation) => translation.name === get().questionTranslation
    );
    return translationAbbrev?.abbreviation;
  },

  generateVerses: async () => {
    // Logic to generate a question based on the user's topics of interest
    const topic =
      topics_of_interest?.[
        Math.floor(Math.random() * topics_of_interest.length)
      ] ?? "faith"; // Default to "faith" if no topics are set
    const translationAbbrev = get().getTranslationAbbrev();

    try {
      const response = await fetch(
        `https://bolls.life/v2/find/${translationAbbrev}?search=${topic}&book=nt&limit=10`
      );
      console.log(topic, translationAbbrev);
      if (!response.ok) {
        throw new Error("Failed to fetch verse");
      }
      const { results } = await response.json();
      console.log(results);
    } catch (error) {
      console.error("Error generating verses", error);
    }
  },

  generateQuestion: (results) => {

    const correctVerseData = results[Math.floor(Math.random() * results.length)]
    // make function to get index of book

    const correctAnswer = `${correctVerseData.book} ${correctVerseData.chapter}:${correctVerseData.verse} - ${correctVerseData.text}`;
    const incorrectAnswers: string[] = [];

    // Generate 3 random incorrect answers
    while (incorrectAnswers.length < 3) {
      const randomVerse = results[Math.floor(Math.random() * results.length)];

      const randomText = `${randomVerse.book} ${randomVerse.chapter}:${randomVerse.verse} - ${randomVerse.text}`;
      if (
        randomText !== correctAnswer &&
        !incorrectAnswers.includes(randomText)
      ) {
        incorrectAnswers.push(randomText);
      }
    }

    // Set the state with the generated question
  },
}));
