"use client"
import React, { useState } from 'react'
import { useBibleStore } from '../store/useBibleStore';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { translationsData } from '../data/translation-data';
import { ChevronRightIcon } from 'lucide-react';
import { bibleBooks } from '../data/bible-data';


export const BibleDrawer = () => {
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

  return (
    <Drawer>
          {selectedBook ? ( // todo add important notice showing problems
            <div className="flex w-10/12 justify-between">
              {/* Previous Chapter Button, */}
              {
                // Check if there is a previous chapter
                getBookChapters().at(0) !== selectedChapter ? (
                  <button>
                    <ChevronRightIcon
                      className="rotate-180 rounded-full p-1"
                      size={30}
                      onClick={() =>
                        getBibleText(
                          selectedChapter,
                          selectedTranslation,
                          "previous"
                        )
                      }
                    />
                  </button>
                ) : (
                  <button className="rotate-180 rounded-full p-1 opacity-30 pointer-events-none">
                    <ChevronRightIcon className="rounded-full p-1" size={30} />
                  </button>
                )
              }

              {/* Control Tab */}
              <section
                className={`${translationStyle?.bg_color} ${translationStyle?.text_color} mt-5 mb-4 w-fit h-10 min-h-10 border border-grey-light rounded-2xl flex items-center shadow-none`}
              >
                {/* Bible Tab */}
                <DrawerTrigger asChild>
                  <div
                    className="border-r-1 h-full flex justify-center items-center pl-2 pr-2"
                    onClick={() => getTranslationBooks()}
                  >
                    {selectedBook} {selectedChapter}
                  </div>
                </DrawerTrigger>
                {/* Translation Tab */}
                <div className="dropdown dropdown-center">
                  <div
                    className="flex justify-center items-center pl-2 pr-2"
                    tabIndex={0}
                    role="button"
                  >
                    {translationStyle?.abbreviation}
                  </div>
                  {/* Translation Dropdown */}
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
                        onClick={() =>
                          getBibleText(selectedChapter, translation.name)
                        }
                      >
                        <h2 className={`font-bold text-center`}>
                          {translation.abbreviation}
                        </h2>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
              {/* Next Chapter Button */}
              {
                // Check if there is a next chapter
                getBookChapters().at(-1) !== selectedChapter ? (
                  <button>
                    <ChevronRightIcon
                      className={`rounded-full p-1`}
                      size={30}
                      onClick={() =>
                        getBibleText(
                          selectedChapter,
                          selectedTranslation,
                          "next"
                        )
                      }
                    />
                  </button>
                ) : (
                  <button className="rounded-full p-1 opacity-30 pointer-events-none">
                    <ChevronRightIcon
                      className={`rounded-full p-1`}
                      size={30}
                    />
                  </button>
                )
              }
            </div>
          ) : (
            // Select Scripture Tab
            <DrawerTrigger asChild>
              <button
                className="btn bg-grey-alt w-fit rounded-2xl shadow-none text-grey-primary md:self-center-safe border-grey-alt"
                onClick={() => getTranslationBooks()}
              >
                Select Scripture
              </button>
            </DrawerTrigger>
          )}
          {/* Bible Drawer */}
          <DrawerContent className="bg-grey-main">
            {/* Bible Books */}
            <div
              className={`flex flex-wrap w-full overflow-x-auto pb-12 transition-transform duration-500 ease-in-out ${
                isBooksOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              {/* Old Testament Books */}
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
              {/* New Testament Books */}
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
            {/* Bible Chapters */}
            <div
              className={`absolute w-full h-full overflow-x-auto pb-6 mt-6 transition-transform duration-500 ease-in-out ${
                isBooksOpen ? "translate-x-full" : "translate-x-0"
              }`}
            >
              {/* Back Button */}
              <button
                className="btn absolute top-6 left-4 rounded-xl flex justify-center border-none shadow-none items-center p-3 bg-grey-main "
                onClick={() => handleSwitch(selectedBook)}
              >
                <ChevronRightIcon className="rotate-180 text-grey-primary" />
              </button>
              {/* Bible Chapters */}
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
                      onClick={() => getBibleText(number)}
                    >
                      {number}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
  )
}

