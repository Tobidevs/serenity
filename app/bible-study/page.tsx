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
import { useBibleStore, TranslationBook } from "../../store/useBibleStore";

export default function BibleStudyPage() {
  const { session } = useSessionStore();
  const [selectedBook, setSelectedBook] = useState("");
  const [openChapters, setOpenChapters] = useState(false);
  const { preferred_translation } = useAccountStore();
  const { translationBooks, getTranslationBooks } = useBibleStore();

  const translationStyle = translationsData.find(
    (t) => t.name === preferred_translation
  );

  const handleSwitch = async (book: string) => {
    setOpenChapters(!openChapters);
    setSelectedBook(book);
  };

  const getBookChapters = () => {
    const bookData = translationBooks?.find(
      (translationBook) => translationBook.name === selectedBook
    );
    const chapters = bookData?.chapters || 0;
    return Array.from({length: chapters}, (_, i) => i + 1)
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
          <DrawerTrigger asChild>
            <button
              className="btn bg-grey-alt w-fit rounded-2xl shadow-none text-grey-primary md:self-center-safe border-grey-alt"
              // todo fix this
            >
              Select Scripture
            </button>
          </DrawerTrigger>

          <DrawerContent className="bg-grey-main">
            <div
              className={`flex flex-wrap w-full overflow-x-auto pb-6 transition-transform duration-500 ease-in-out ${
                openChapters ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="w-full text-xl text-center font-bold p-5 ">
                Old Testament
              </div>
              <section className="flex flex-wrap gap-2 justify-center">
                {bibleBooks.slice(0, 39).map((book, key) => (
                  <div className="overflow-hidden">
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
              className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                openChapters ? "translate-x-full" : "translate-x-0"
              }`}
            >
              <button
                className="btn absolute top-6 left-4 rounded-xl flex justify-center border-gray-300 shadow-none items-center p-3 bg-grey-main "
                onClick={() => setOpenChapters(!openChapters)}
              >
                <ChevronRightIcon className="rotate-180 text-grey-primary" />
              </button>
              <div className="mt-10 w-full h-fit flex flex-col items-center gap-4 p-2">
                <h1 className="text-xl font-bold text-grey-primary">
                  {selectedBook}
                </h1>
                <div className="w-10/12 border flex gap-3 flex-wrap">
                  {getBookChapters().map((number) => (
                    <div className="p-3 w-13 rounded-xl text-xl text-center ">{number}</div>
                  ))}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        {/* <section className="w-fit h-10 border rounded-2xl flex shadow-sm">
          <div className="border-r-1 flex justify-center items-center pl-2 pr-2">
            Romans 8:18
          </div>
          <div className="flex justify-center items-center pl-2 pr-2">ESV</div>
        </section> */}
      </div>
    </div>
  );
}
