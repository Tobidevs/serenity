"use client";
import { useState, useEffect } from "react";
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { useBibleStore } from "../../store/useBibleStore";
import { Merriweather } from "next/font/google";
import { BibleDrawer } from "../../components/bible-drawer";
import { DisclaimerModal } from "../../components/disclaimer-modal";

// Importing Merriweather font for Bible text styling
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function BibleStudyPage() {
  const { bibleText } = useBibleStore();
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [canAccess, setCanAccess] = useState(false);

  const handleContinue = () => {
    setCanAccess(true);
  };

  // Show disclaimer on first visit
  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem("bible-study-disclaimer");
    if (hasSeenDisclaimer) {
      setShowDisclaimer(false);
      setCanAccess(true);
    }
  }, []);

  const handleContinueAndRemember = () => {
    localStorage.setItem("bible-study-disclaimer", "true");
    handleContinue();
  };

  return (
    <div className="w-full flex min-h-screen">
      <DisclaimerModal 
        isOpen={showDisclaimer} 
        onContinue={handleContinueAndRemember}
      />
      
      {canAccess && (
        <>
          <Navbar />
          <SearchBar />
          <div className="mt-15 w-full flex flex-col items-center">
            <BibleDrawer />
            {/* Page Content */}
            <div className="flex flex-col items-center w-full">
              <div className="w-10/12 mb-10">
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
        </>
      )}
    </div>
  );
}
