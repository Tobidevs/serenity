import { create } from "zustand";
import { useAccountStore } from "./useAccountStore";
import { useBibleStore } from "./useBibleStore";
import { translationsData } from "../data/translation-data";
import { bibleBooks } from "../data/bible-data";

type BibleQuizStore = {
  verse: string | null;
  topics_of_interest: string[];
  bookFilter: string | null;
  correctAnswer: string | null;
  incorrectAnswers: string[] | null;
  questionTranslation: string | null;
  answerChoices: string[] | null;
  currentQuestion: number;
  totalQuestions: number;
  setVerse: (verse: string | null) => void;
  setTopicsOfInterest: (topics: string[]) => void;
  setBookFilter: (bookFilter: string | null) => void;
  setCorrectAnswer: (correctAnswer: string | null) => void;
  setIncorrectAnswers: (incorrectAnswers: string[] | null) => void;
  getTranslationAbbrev: () => string | undefined;
  getBookName: (bookId: string) => string | null;

  generateVerses: () => void;
  generateQuestion: (results: ResultsObject[]) => void;
  resetQuiz: () => void;
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
  topics_of_interest: topics_of_interest || [],
  bookFilter: null,
  correctAnswer: null,
  incorrectAnswers: null,
  questionTranslation: preferred_translation || null,
  answerChoices: null,
  currentQuestion: 0,
  totalQuestions: 10, // Set a default number of questions

  setVerse: (verse) => set({ verse }),
  setTopicsOfInterest: (topics) => set({ topics_of_interest: topics }),
  setBookFilter: (bookFilter) => set({ bookFilter }),
  setCorrectAnswer: (correctAnswer) => set({ correctAnswer }),
  setIncorrectAnswers: (incorrectAnswers) => set({ incorrectAnswers }),
  getTranslationAbbrev: () => {
    const translationAbbrev = translationsData.find(
      (translation) => translation.name === get().questionTranslation
    );
    return translationAbbrev?.abbreviation;
  },
  getBookName: (bookId) => {
    const bookIndex = Number(bookId) - 1;
    return bibleBooks[bookIndex] || null;
  },

  generateVerses: async () => {
    // Logic to generate a question based on the user's topics of interest
    const topic =
      get().topics_of_interest?.[
        Math.floor(Math.random() * get().topics_of_interest.length)
      ] ?? "faith"; // Default to "faith" if no topics are set
    const translationAbbrev = get().getTranslationAbbrev();

    let bookFilterValue: string | null = null;
    if (get().bookFilter === "New Testament") {
      bookFilterValue = "nt";
    } else if (get().bookFilter === "Old Testament") {
      bookFilterValue = "ot";
    } else if (get().bookFilter === "Proverbs") {
      bookFilterValue = "20";
    } else {
      bookFilterValue = null; // No filter applied
    }

    try {
      const response = await fetch(
        `https://bolls.life/v2/find/${translationAbbrev}?search=${topic}&book=${bookFilterValue || "nt"}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch verse");
      }
      const { results } = await response.json();
      get().generateQuestion(results as ResultsObject[]);
    } catch (error) {
      console.error("Error generating verses", error);
    }
  },

  generateQuestion: (results) => {
    // Pick a random verse from the results
    const verseData = results[Math.floor(Math.random() * results.length)];
    const book = get().getBookName(verseData.book);
    const correctAnswer = `${book} ${verseData.chapter}:${verseData.verse}`;
    const incorrectAnswers: string[] = [];

    // Generate 3 random incorrect answers
    while (incorrectAnswers.length < 3) {
      const randomVerse = results[Math.floor(Math.random() * results.length)];
      const randomText = `${get().getBookName(randomVerse.book)} ${
        randomVerse.chapter
      }:${randomVerse.verse}`;

      if (
        randomText !== correctAnswer &&
        !incorrectAnswers.includes(randomText)
      ) {
        incorrectAnswers.push(randomText);
      }
    }
    // Shuffle the answers
    get().answerChoices = [correctAnswer, ...incorrectAnswers].sort(
      () => Math.random() - 0.5
    );

    // Set the state with the generated question
    set({
      verse: verseData.text,
      correctAnswer,
      incorrectAnswers,
      currentQuestion: get().currentQuestion + 1,
    });
  },

  resetQuiz: () => {
    set({
      verse: null,
      correctAnswer: null,
      incorrectAnswers: null,
      answerChoices: null,
      currentQuestion: 0,
    });
  },
}));
