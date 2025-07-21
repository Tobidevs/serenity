"use client";
import { useState } from "react";
import { Navbar } from "../../components/navbar";
import { RouteToAuth } from "../../components/route-to-auth";
import { SearchBar } from "../../components/search-bar";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { bibleBooks } from "../../data/bible-data";
import { translationsData } from "../../data/translation-data";
import { useAccountStore } from "../../store/useAccountStore";
import { useSessionStore } from "../../store/useSessionStore";
import { ChevronRightIcon } from "lucide-react";
import { BibleText, useBibleStore } from "../../store/useBibleStore";
import { Merriweather } from "next/font/google";
import { BibleDrawer } from "../../components/bible-drawer";

// Importing Merriweather font for Bible text styling
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function BibleStudyPage() {
  const { session } = useSessionStore();
  const [isBooksOpen, setIsBooksOpen] = useState(true);
  const {
    translationBooks,
    getTranslationBooks,
    selectedTranslation,
    setSelectedTranslation,
    selectedBook,
    setSelectedBook,
    selectedChapter,
    setSelectedChapter,
    bibleText,
    getBibleText,
  } = useBibleStore();

  const translationStyle = translationsData.find(
    (t) => t.name === selectedTranslation
  );

  const handleSwitch = async (book: string) => {
    setIsBooksOpen(!isBooksOpen);
    setSelectedBook(book);
    if (!isBooksOpen) {
      setSelectedChapter(null);
    }
  };

  const getBookChapters = () => {
    const bookData = translationBooks?.find(
      (translationBook) => translationBook.name === selectedBook
    );
    const chapters = bookData?.chapters || 0;
    return Array.from({ length: chapters }, (_, i) => i + 1);
  };

  if (!session) {
    return <RouteToAuth />;
  }
  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="mt-15 w-full flex flex-col items-center">
        <BibleDrawer />
        {/* Page Content */}
        <div className="flex flex-col items-center w-full">
          <button></button>
          <div className="w-10/12">
            <p className={`${merriweather.className} leading-relaxed`}>
              {bibleText?.map((verse, index) => {
                // Sanitize the verse text by removing <S> tags
                const sanitizedText = verse.text.replaceAll(
                  /<S>(.*?)<\/S>/g,
                  ""
                );
                // Return the verse with its number and sanitized text
                return (
                  <span
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: `<sup class="text-gray-500 mr-1">${verse.verse}</sup>${sanitizedText}`,
                    }}
                  />
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
