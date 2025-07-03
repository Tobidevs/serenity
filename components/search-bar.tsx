import { ChevronRightIcon } from "lucide-react";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { translationsData } from "../data/translation-data";
import { useAccountStore } from "../store/useAccountStore";

export const SearchBar = () => {
  const { preferred_translation, setPreferredTranslation } = useAccountStore();
  const translationStyle = translationsData.find(
    (t) => t.name === preferred_translation
  );

  return (
    <div className="h-16 border-b-2 w-full flex pr-4 pl-4 items-center justify-between">
      <SidebarTrigger size={"lg"} className="border border-grey-alt" />
      <Input className="w-6/10" placeholder="Search..." />
      <div className="dropdown dropdown-bottom dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className={`btn m-1 w-22 h-9 pr-1 pl-1 rounded-md text-white ${translationStyle?.bg_primary_color}`}
        >
          <ChevronRightIcon className="rotate-90" size={"22"} />
          {translationStyle?.abbreviation}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content  bg-grey-main rounded-box z-1 w-fit p-2 shadow-sm"
        >
          {translationsData.map((translation, key) => (
            <li
              className={`btn btn-lg flex ${
                // Change color based on selected translation
                preferred_translation === translation.name
                  ? `${translation.bg_primary_color} text-white border-gray-300 border-3 shadow-lg`
                  : `${translation.bg_color} ${translation.text_color} border-grey-main`
              } flex-wrap w-65 h-17 rounded-2xl border-2 shadow-none`}
              key={key}
              onClick={() => setPreferredTranslation(translation.name)}
            >
              <h2 className={`font-bold text-center`}>{translation.name}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
