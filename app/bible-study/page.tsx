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
import { useBibleStore } from "../../store/useBibleStore";

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
  } = useBibleStore();

  const translationStyle = translationsData.find(
    // todo change styling of button
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
      <div className="mt-20 w-full flex flex-col items-center">
        <Drawer>
          {selectedBook ? (
            <section
              className={`${translationStyle?.bg_color} ${translationStyle?.text_color} w-fit h-10 border border-grey-light rounded-2xl flex items-center shadow-sm`}
            >
              <DrawerTrigger asChild>
                <div
                  className="border-r-1 h-full flex justify-center items-center pl-2 pr-2"
                  onClick={() => getTranslationBooks()}
                >
                  {selectedBook} {selectedChapter}
                </div>
              </DrawerTrigger>
              <div className="dropdown dropdown-center">
                <div
                  className="flex justify-center items-center pl-2 pr-2"
                  tabIndex={0}
                  role="button"
                >
                  {translationStyle?.abbreviation}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content bg-grey-main flex flex-wrap rounded-box z-1 w-40 p-2 shadow-sm"
                >
                  {translationsData.map((translation, key) => (
                    <li
                      className={`btn flex ${
                        // Change color based on selected translation
                        selectedTranslation === translation.name
                          ? `${translation.bg_color} ${translation.text_color} border-gray-300 border-3 shadow-lg`
                          : ` border-none bg-grey-main text-grey-primary`
                      } flex-wrap w-18 h-12 rounded-2xl border-2 shadow-none`}
                      key={key}
                      onClick={() => setSelectedTranslation(translation.name)}
                    >
                      <h2 className={`font-bold text-center`}>
                        {translation.abbreviation}
                      </h2>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : (
            <DrawerTrigger asChild>
              <button
                className="btn bg-grey-alt w-fit rounded-2xl shadow-none text-grey-primary md:self-center-safe border-grey-alt"
                onClick={() => getTranslationBooks()}
              >
                Select Scripture
              </button>
            </DrawerTrigger>
          )}

          <DrawerContent className="bg-grey-main">
            <div
              className={`flex flex-wrap w-full overflow-x-auto pb-12 transition-transform duration-500 ease-in-out ${
                isBooksOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="w-full text-xl text-center font-bold p-5">
                Old Testament
              </div>
              <section className="flex flex-wrap gap-2 justify-center">
                {bibleBooks.slice(0, 39).map((book, key) => (
                  <div className="overflow-hidden" key={key}>
                    <button
                      className={`${
                        selectedBook === book
                          ? "bg-grey-primary text-white "
                          : "bg-grey-main"
                      } btn flex justify-center border-none shadow-none text-grey-primary items-center rounded-xl whitespace-nowrap w-31 h-10 p-1 `}
                      key={key}
                      onClick={() => handleSwitch(book)}
                    >
                      {book}
                    </button>
                  </div>
                ))}
              </section>
              <div className="w-full text-xl text-center font-bold p-5">
                New Testament
              </div>
              <section className="flex flex-wrap gap-2 justify-center">
                {bibleBooks.slice(39, 66).map((book, key) => (
                  <button
                    className={`${
                      selectedBook === book
                        ? "bg-grey-primary text-white "
                        : "bg-grey-main"
                    } btn flex justify-center border-none bg-grey-main shadow-none text-grey-primary items-center rounded-xl whitespace-nowrap w-29 h-10 `}
                    key={key}
                    onClick={() => handleSwitch(book)}
                  >
                    {book}
                  </button>
                ))}
              </section>
            </div>
            {/* Switch */}
            <div
              className={`absolute w-full h-full overflow-x-auto pb-6 mt-6 transition-transform duration-500 ease-in-out ${
                isBooksOpen ? "translate-x-full" : "translate-x-0"
              }`}
            >
              <button
                className="btn absolute top-6 left-4 rounded-xl flex justify-center border-none shadow-none items-center p-3 bg-grey-main "
                onClick={() => handleSwitch(selectedBook)}
              >
                <ChevronRightIcon className="rotate-180 text-grey-primary" />
              </button>
              <div className="mt-4 w-full h-fit flex flex-col items-center gap-4 p-2">
                <h1 className="text-xl font-bold">{selectedBook}</h1>
                <div className="w-10/12 flex gap-3 flex-wrap justify-center items-center">
                  {getBookChapters().map((number, key) => (
                    <div
                      className={`${
                        selectedChapter === number
                          ? "bg-grey-primary text-white "
                          : "bg-grey-main"
                      } btn bg-grey-main border-none shadow-none p-3 w-13 rounded-xl text-xl text-center text-grey-secondary`}
                      key={key}
                      onClick={() => setSelectedChapter(number)}
                    >
                      {number}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
