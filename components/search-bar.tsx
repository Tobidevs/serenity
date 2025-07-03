"use client";
import { ChevronRightIcon } from "lucide-react";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { translationsData } from "../data/translation-data";
import { useState } from "react";

export const SearchBar = () => {
  const [userTranslation, setUserTranslation] = useState("");
  return (
    <div className="h-16 border-b-2 w-full flex pr-4 pl-4 items-center justify-between">
      <SidebarTrigger size={"lg"} className="border border-grey-alt" />
      <Input className="w-6/10" placeholder="Search..." />
      <div className="dropdown dropdown-bottom dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 w-22 h-9 pr-1 pl-1 rounded-md"
        >
          <ChevronRightIcon className="rotate-90" size={"22"} />
          ESV
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content  bg-grey-main rounded-box z-1 w-fit p-2 shadow-sm"
        >
          {translationsData.map((translation, key) => (
            <li
              className={`btn btn-lg flex ${
                // Change color based on selected translation
                userTranslation === translation.name
                  ? `${translation.bg_primary_color} text-white border-gray-300 border-3 shadow-lg`
                  : `${translation.bg_color} ${translation.text_color} border-grey-main`
              } flex-wrap w-65 h-17 rounded-2xl border-2 shadow-none`}
              key={key}
              onClick={() => setUserTranslation(translation.name)}
            >
              <h2 className={`font-bold text-center`}>{translation.name}</h2>
            </li>
          ))}
        </ul>
      </div>
      {/* <button role="button" className="dropdown dropdown-bottom dropdown-end flex w-20 pt-1 pb-1 rounded-md pr-2 pl-2">
        <ChevronRightIcon className="rotate-90" size={"22"} />
        <h2 role="button" className="font-bold">ESV</h2>
        <div
          tabIndex={0}
          className="dropdown-content bg-base-100 rounded-box z-1 w-fit p-2 shadow-sm flex justify-center gap-3 flex-wrap mx-auto md:mx-0"
        >
          {translationsData.map((translation, key) => (
            <li
              className={`btn btn-lg flex ${
                // Change color based on selected translation
                userTranslation === translation.name
                  ? `${translation.bg_primary_color} text-white border-gray-300 border-3 shadow-lg`
                  : `${translation.bg_color} ${translation.text_color} border-grey-main shadow-none`
              } flex-wrap w-60 h-17 rounded-2xl border-2`}
              key={key}
              onClick={() => setUserTranslation(translation.name)}
            >
              <h2 className={`font-bold`}>{translation.name}</h2>
            </li>
          ))}
        </div>
      </button> */}
    </div>
  );
};
