"use client";
import {
  Check,
  ChevronRightIcon,
  ChevronsUpDown,
  Divide,
  SearchCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { translationsData } from "../../data/translation-data";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { bibleBooks, bibleTopics } from "../../data/bible-data";
import { Input } from "../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../components/ui/command";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";

export default function OnboardingPage() {
  // Used for changing question
  const [questionNumber, setQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [studyPlanName, setStudyPlanName] = useState("");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [searchModal, setSearchModal] = useState(false);

  // Fading effect
  const handleUiChange = (option: string) => {
    /// Start fade out
    setIsFading(true);
    // Change context
    setTimeout(() => {
      if (option === "next") {
        setQuestionNumber((prev) => prev + 1);
      }
      if (option === "previous") {
        setQuestionNumber((prev) => prev - 1);
      }
      // Start fade in after content loads
      setTimeout(() => {
        setIsFading(false);
      }, 100);
    }, 500);
  };

  // Handle Selected Topic
  const handleToggleTopic = (topicName: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicName)
        ? prev.filter((t) => t !== topicName)
        : [...prev, topicName]
    );
  };

  const handleSelectedBook = (book: string) => {
    setSelectedBooks((prev) =>
      prev.includes(book) ? prev.filter((t) => t !== book) : [...prev, book]
    );
  };

  // Progress Bar UI
  useEffect(() => {
    const timer = setTimeout(
      () => setProgress((questionNumber / 4) * 100),
      500
    );
    return () => clearTimeout(timer);
  }, [questionNumber]);

  // Page Load UI
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!loading ? (
        <div className="flex w-full h-full justify-center md:items-center ">
          <Card className="w-full lg:w-3/6 md:justify-center h-fit md:h-5/8 relative flex sm:gap-12 lg:gap-17 flex-col bg-transparent border-none shadow-none">
            <CardHeader className="w-full md:absolute md:top-5">
              <CardTitle className="text-4xl font-bold text-grey-primary ">
                Welcome To Serenity!
              </CardTitle>
              <CardDescription className="text-grey-secondary text-lg ">
                We're excited you're here. Let’s set a few preferences to
                personalize your Bible study experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-5 flex-col">
              {
                // Onboarding Question #1
                questionNumber === 1 && (
                  <div
                    className={`transition-opacity duration-500 flex flex-col gap-3 container ${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {/* Question */}
                    <h2 className="text-xl text-grey-primary font-extrabold">
                      What is your main Bible Translation?
                    </h2>
                    {/* Question Content */}
                    <div className="flex justify-center gap-3 flex-wrap mx-auto md:mx-0 w-9/10">
                      {translationsData.map((translation, key) => (
                        <button
                          className={`btn btn-lg flex ${
                            // Change color based on selected translation
                            selectedTranslation === translation.name
                              ? `${translation.bg_primary_color} text-white border-gray-300 border-3 shadow-lg`
                              : `${translation.bg_color} ${translation.text_color}`
                          } flex-wrap w-80 h-17 rounded-2xl border-2`}
                          key={key}
                          onClick={() =>
                            setSelectedTranslation(translation.name)
                          }
                        >
                          <h2 className={`font-bold`}>{translation.name}</h2>
                        </button>
                      ))}
                    </div>
                    {/* Navigation */}
                    <div className="flex justify-between items-center w-9/10">
                      <button
                        className="pointer-events-none opacity-30 btn rounded-xl flex justify-center items-center p-3 bg-grey-main w-fit"
                        onClick={() => handleUiChange("previous")}
                      >
                        <ChevronRightIcon className="rotate-180" />
                        <p className="text-md">Previous</p>
                      </button>
                      <Progress
                        value={progress}
                        className="w-[60%] hidden sm:inline [&>div]:bg-[#414142]"
                      />
                      <button
                        className={`${
                          !selectedTranslation &&
                          "pointer-events-none opacity-30"
                        } btn rounded-xl flex justify-center items-center p-3 bg-grey-main w-fit`}
                        onClick={() => handleUiChange("next")}
                      >
                        <p className="text-md">Next</p>
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </div>
                )
              }
              {
                // Onboarding Question #2
                questionNumber === 2 && (
                  <div
                    className={`transition-opacity duration-500 flex flex-col gap-3 container ${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {/* Question */}
                    <h2 className="text-xl text-grey-primary font-extrabold">
                      What topic are you most interested in?
                    </h2>
                    {/* Question Content */}
                    <div className="flex justify-center gap-3 flex-wrap mx-auto md:mx-0 w-9/10">
                      {bibleTopics.map((topic, key) => (
                        <button
                          className={`btn rounded-xl btn-lg text-grey-secondary ${
                            selectedTopics.includes(topic.name)
                              ? "bg-grey-primary text-white"
                              : "bg-grey-main"
                          }`}
                          onClick={() => handleToggleTopic(topic.name)}
                          key={key}
                        >
                          <h1>{topic.name}</h1>
                        </button>
                      ))}
                    </div>
                    {/* Navigation */}
                    <div className="flex justify-between items-center w-9/10">
                      <button
                        className="btn rounded-xl flex justify-center items-center p-3 bg-grey-main "
                        onClick={() => handleUiChange("previous")}
                      >
                        <ChevronRightIcon className="rotate-180" />
                        <p className="text-md">Previous</p>
                      </button>
                      <Progress
                        value={progress}
                        className="w-[60%] hidden sm:inline [&>div]:bg-[#414142]"
                      />
                      <button
                        className={`${
                          selectedTopics.length === 0 &&
                          "pointer-events-none opacity-30"
                        } btn rounded-xl flex justify-center items-center p-3 bg-grey-main w-fit`}
                        onClick={() => handleUiChange("next")}
                      >
                        <p className="text-md">Next</p>
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </div>
                )
              }
              {
                // Onboarding Question #3
                questionNumber === 3 && (
                  <div
                    className={`transition-opacity duration-500 flex flex-col gap-4 container${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {/* Question */}
                    <h2 className="text-xl text-grey-primary font-extrabold">
                      Create Your Study plan
                    </h2>
                    {/* Question Content */}
                    <div className="flex justify-center gap-6 flex-col ">
                      <div>
                        <h3>Name your study plan</h3>
                        <Input
                          type="text"
                          placeholder="Name"
                          onChange={(e) => setStudyPlanName(e.target.value)}
                          className="md:w-2/5"
                        />
                      </div>
                      <div className="flex justify-center gap-2 flex-col ">
                        <h3>Select books to add to study plan</h3>
                        <Drawer>
                          <DrawerTrigger asChild>
                            <button className="btn bg-grey-alt w-full md:w-4/5 rounded-xl md:self-center-safe border-grey-alt">
                              Select Books
                            </button>
                          </DrawerTrigger>
                          <DrawerContent className="bg-grey-main">
                            <div className="flex flex-wrap w-full overflow-x-auto pb-6">
                              <div className="w-full text-xl text-center font-bold p-5 ">
                                Old Testament
                              </div>
                              <section className="flex flex-wrap gap-2 justify-center">
                                {bibleBooks.slice(0, 39).map((book, key) => (
                                  <button
                                    className={`${
                                      selectedBooks.includes(book)
                                        ? "bg-grey-primary text-white "
                                        : "bg-grey-main border-none"
                                    } btn flex justify-center items-center rounded-xl whitespace-nowrap w-31 h-10 p-1 `}
                                    key={key}
                                    onClick={() => handleSelectedBook(book)}
                                  >
                                    {book}
                                  </button>
                                ))}
                              </section>
                              <div className="w-full text-xl text-center font-bold p-5">
                                New Testament
                              </div>
                              <section className="flex flex-wrap gap-2 justify-center">
                                {bibleBooks.slice(39, 66).map((book, key) => (
                                  <button
                                    className={`${
                                      selectedBooks.includes(book)
                                        ? "bg-grey-primary text-white"
                                        : "bg-grey-main border-none"
                                    } btn flex justify-center items-center rounded-xl whitespace-nowrap w-29 h-10 `}
                                    key={key}
                                    onClick={() => handleSelectedBook(book)}
                                  >
                                    {book}
                                  </button>
                                ))}
                              </section>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </div>

                      {studyPlanName && (
                        <div className="flex justify-center">
                          <fieldset className="fieldset bg-grey-main border-gray-400 rounded-box w-xs border p-4">
                            <legend className="fieldset-legend text-lg">
                              {studyPlanName}
                            </legend>
                            <div className="w-full flex">
                                <h2 className="text-xl font-bold">0/{selectedBooks.length} books</h2>
                            </div>
                          </fieldset>
                        </div>
                      )}
                    </div>
                    {/* Navigation */}
                    <div className="flex justify-between items-center w-9/10">
                      <button
                        className="btn rounded-xl flex justify-center items-center p-3 bg-grey-main"
                        onClick={() => handleUiChange("previous")}
                      >
                        <ChevronRightIcon className="rotate-180" />
                        <p className="text-md">Previous</p>
                      </button>
                      <Progress
                        value={progress}
                        className="w-[60%] hidden sm:inline [&>div]:bg-[#414142]"
                      />
                      <button
                        className="btn rounded-xl flex justify-center items-center p-3 bg-grey-main"
                        onClick={() => handleUiChange("next")}
                      >
                        <p className="text-md">Next</p>
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </div>
                )
              }
            </CardContent>
          </Card>
        </div>
      ) : (
        // Page Loading UI
        <div className="flex justify-center items-center h-full w-full">
          <span className="loading loading-infinity w-2/10 md:w-20"></span>
        </div>
      )}
    </>
  );
}
