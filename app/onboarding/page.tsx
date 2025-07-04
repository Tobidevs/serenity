"use client";
import { ChevronRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { translationsData } from "../../data/translation-data";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { bibleBooks, bibleTopics } from "../../data/bible-data";
import { Input } from "../../components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { useRouter } from "next/navigation";
import { useAccountStore } from "../../store/useAccountStore";
import { supabase } from "../../db/supabase-client";
import { toast } from "sonner";

export default function OnboardingPage() {
  const { completeOnboarding, fetchUser } = useAccountStore();
  const router = useRouter();
  // Used for changing question
  const [questionNumber, setQuestionNumber] = useState(1);
  // Loading UI
  const [loading, setLoading] = useState(false);
  // User Data
  const [name, setName] = useState("");
  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [studyPlanName, setStudyPlanName] = useState("");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  // UI Effects
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

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
      }, 50);
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

  // Handle Selected Book
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
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      toast("Successfully Created Account!");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Submit Onboarding
  const handleSubmit = async () => {
    // Complete Onboarding Process
    const error = await completeOnboarding(
      name,
      selectedTranslation,
      selectedTopics,
      studyPlanName,
      selectedBooks
    );
    if (error) {
      console.log("Onboarding Error", error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      {!loading ? (
        <div className="w-full flex min-h-screen justify-center items-start md:items-center pb-4 pt-4">
          <Card className="w-full lg:w-3/6 md:justify-center h-fit border relative flex sm:gap-12 lg:gap-17 flex-col bg-transparent border-none shadow-none">
            <CardHeader className="w-full ">
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
                    className={`transition-opacity duration-500 flex flex-col items-center w-full gap-3 container ${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {/* Question */}
                    <h2 className="text-xl text-grey-primary md:text-center w-full font-extrabold">
                      What's your Name?
                    </h2>
                    <Input
                      type="text"
                      placeholder="Type your name..."
                      onChange={(e) => setName(e.target.value)}
                      className="input bg-grey-light border border-grey-alt-dark md:w-3/5"
                    />
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
                              : `${translation.bg_color} ${translation.text_color} border-grey-main shadow-none`
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
                        className="pointer-events-none opacity-30 btn rounded-xl flex justify-center border border-gray-300 shadow-none items-center p-3 bg-grey-main w-fit"
                        onClick={() => handleUiChange("previous")}
                      >
                        <ChevronRightIcon className="rotate-180 " />
                        <p className="text-md text-grey-primary">Prev</p>
                      </button>
                      <Progress
                        value={progress}
                        className="w-27 md:w-1/2 [&>div]:bg-[#414142]"
                      />
                      <button
                        className={`${
                          !selectedTranslation || name.length === 0
                            ? "pointer-events-none opacity-30"
                            : ""
                        } btn rounded-xl flex justify-center border border-gray-300 shadow-none items-center p-3 bg-grey-main w-fit`}
                        onClick={() => handleUiChange("next")}
                      >
                        <p className="text-md text-grey-primary">Next</p>
                        <ChevronRightIcon className="text-grey-primary" />
                      </button>
                    </div>
                  </div>
                )
              }
              {
                // Onboarding Question #2
                questionNumber === 2 && (
                  <div
                    className={`transition-opacity duration-500 flex flex-col items-center w-full gap-3 container ${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {/* Question */}
                    <h2 className="text-xl text-grey-primary font-extrabold">
                      What topic are you most interested in?
                    </h2>
                    {/* Question Content */}
                    <div className="flex justify-center gap-3 flex-wrap mx-auto md:mx-0 w-full">
                      {bibleTopics.map((topic, key) => (
                        <button
                          className={`btn rounded-xl btn-lg text-grey-secondary border border-gray-300 shadow-none ${
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
                        className="btn rounded-xl flex justify-center items-center p-3 border border-gray-300 shadow-none bg-grey-main "
                        onClick={() => handleUiChange("previous")}
                      >
                        <ChevronRightIcon className="rotate-180 text-grey-primary" />
                        <p className="text-md text-grey-primary ">Prev</p>
                      </button>
                      <Progress
                        value={progress}
                        className="w-27 md:w-1/2 [&>div]:bg-[#414142]"
                      />
                      <button
                        className={`${
                          selectedTopics.length === 0 &&
                          "pointer-events-none opacity-30"
                        } btn rounded-xl flex justify-center border border-gray-300 shadow-none items-center p-3 bg-grey-main w-fit`}
                        onClick={() => handleUiChange("next")}
                      >
                        <p className="text-md text-grey-primary">Next</p>
                        <ChevronRightIcon className="text-grey-primary" />
                      </button>
                    </div>
                  </div>
                )
              }
              {
                // Onboarding Question #3
                questionNumber === 3 && (
                  <div
                    className={`transition-opacity duration-500 flex flex-col items-center w-full gap-3 container ${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {/* Question */}
                    <h2 className="text-xl w-11/12 text-grey-primary font-extrabold">
                      Create Your Study plan
                    </h2>
                    {/* Question Content */}

                    <div className="flex justify-center w-11/12 gap-6 flex-col ">
                      <div className="flex flex-col gap-2">
                        <h3>Name your study plan</h3>
                        <Input
                          type="text"
                          placeholder="Name"
                          onChange={(e) => setStudyPlanName(e.target.value)}
                          className="md:w-3/5"
                        />
                      </div>
                      <div className="flex justify-center gap-2 flex-col ">
                        <h3>Select books to add to study plan</h3>
                        <Drawer>
                          <DrawerTrigger asChild>
                            <button className="btn bg-grey-alt w-full md:w-3/5 rounded-xl shadow-none text-grey-primary md:self-center-safe border-grey-alt">
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
                                        : "bg-grey-main "
                                    } btn flex justify-center border-none shadow-none text-grey-primary items-center rounded-xl whitespace-nowrap w-31 h-10 p-1 `}
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
                                        : "bg-grey-main"
                                    } btn flex justify-center border-none shadow-none text-grey-primary items-center rounded-xl whitespace-nowrap w-29 h-10 `}
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
                        <div className="flex flex-wrap gap-2 w-full items-center justify-center ">
                          {selectedBooks.map((book) => (
                            <div className="badge text-xs pr-2 pl-2 bg-grey-light">
                              {book}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Navigation */}
                    <div className="flex justify-between items-center w-9/10">
                      <button
                        className="btn rounded-xl flex justify-center border border-gray-300 shadow-none items-center p-3 bg-grey-main "
                        onClick={() => handleUiChange("previous")}
                      >
                        <ChevronRightIcon className="rotate-180 text-grey-primary" />
                        <p className="text-md text-grey-primary">Prev</p>
                      </button>
                      <Progress
                        value={progress}
                        className="w-27 md:w-1/2 [&>div]:bg-[#414142]"
                      />
                      <button
                        className={`btn rounded-xl flex justify-center border border-gray-300 shadow-none items-center p-3 bg-grey-main w-fit`}
                        onClick={() => handleUiChange("next")}
                      >
                        <p className="text-md text-grey-primary">
                          {studyPlanName && selectedBooks.length > 0
                            ? "Finish"
                            : "Skip"}
                        </p>
                        <ChevronRightIcon className="text-grey-primary" />
                      </button>
                    </div>
                  </div>
                )
              }
              {
                // Completion Screen
                questionNumber === 4 && (
                  <div
                    className={`transition-opacity duration-500 flex flex-col h-50 justify-center items-center gap-5 container ${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <Progress
                      value={progress}
                      className="w-27 [&>div]:bg-[#414142]"
                    />
                    <h2 className="flex justify-center text-2xl font-bold text-grey-primary">
                      Your All Set!
                    </h2>
                    <button
                      onClick={handleSubmit}
                      className="btn rounded-2xl border-none shadow-none text-grey-main bg-grey-primary"
                    >
                      Go To Dashboard
                    </button>
                  </div>
                )
              }
            </CardContent>
          </Card>
        </div>
      ) : (
        // Page Loading UI
        <div className="flex justify-center items-center h-full w-full">
          <span className="loading loading-infinity w-2/10 md:w-20 text-grey-primary"></span>
        </div>
      )}
    </>
  );
}
