"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { supabase } from "../db/supabase-client";
import { useSessionStore } from "../store/useSessionStore";
import { useRouter } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { FaBookBible } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { FaBoxArchive } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useAccountStore } from "../store/useAccountStore";
import { translationsData } from "../data/translation-data";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Navbar() {
  const { setSession } = useSessionStore();
  const [email, setEmail] = useState("");
  const { name, preferred_translation } = useAccountStore();
  const router = useRouter();
  const pathname = usePathname();
  const translationStyle = translationsData.find(
    (t) => t.name === preferred_translation
  );

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      setEmail(user?.email || "");
    };

    fetchUser();
  }, []);

  const onLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/");
  };

  return (
    <Sidebar>
      <div className="w-full h-full bg-grey-main pb-10 pt-10 pr-3 pl-3">
        <section className="h-1/8 w-full flex gap-3 items-center">
          <div className="avatar avatar-placeholder w-15 h-15">
            <div className="bg-grey-primary text-white rounded-full">
              <span className="text-2xl">{name.slice(0, 1)}</span>
            </div>
          </div>
          <div className=" w-fit">
            <h1 className="text-2xl text-grey-primary font-semibold">{name}</h1>
            <p className="text-grey-secondary text-sm">{email}</p>
          </div>
        </section>

        <main className="flex gap-6 flex-col text-grey-primary w-full mt-5 pl-5">
          <Link
            href={"/dashboard"}
            className={`flex p-2 rounded-lg justify-center items-center w-fit text-xl gap-3 font-bold ${
              pathname === "/dashboard" && `${translationStyle?.bg_color}`
            }`}
          >
            <BiSolidDashboard
              size={30}
              className={`${
                pathname === "/dashboard" && `${translationStyle?.text_color}`
              }`}
            />
            <h2
              className={`${
                pathname === "/dashboard" && `${translationStyle?.text_color}`
              }`}
            >
              Dashboard
            </h2>
          </Link>

          <Link
            href={"/bible-study"}
            className={`flex p-2 rounded-lg justify-center items-center w-fit text-xl gap-3 font-bold ${
              pathname === "/bible-study" && `${translationStyle?.bg_color}`
            }`}
          >
            <FaBookBible
              size={30}
              className={`${
                pathname === "/bible-study" && `${translationStyle?.text_color}`
              }`}
            />
            <h2
              className={`${
                pathname === "/bible-study" && `${translationStyle?.text_color}`
              }`}
            >
              Bible Study
            </h2>
          </Link>

          <Link
            href={"/study-plan"}
            className={`flex p-2 rounded-lg justify-center items-center w-fit text-xl gap-3 font-bold ${
              pathname === "/study-plan" && `${translationStyle?.bg_color}`
            }`}
          >
            <LuNotebookPen
              size={30}
              className={`${
                pathname === "/study-plan" && `${translationStyle?.text_color}`
              }`}
            />
            <h2
              className={`${
                pathname === "/study-plan" && `${translationStyle?.text_color}`
              }`}
            >
              Study Plan
            </h2>
          </Link>

          <Link
            href={"/my-stuff"}
            className={`flex p-2 rounded-lg justify-center items-center w-fit text-xl gap-3 font-bold ${
              pathname === "/my-stuff" && `${translationStyle?.bg_color}`
            }`}
          >
            <FaBoxArchive
              size={30}
              className={`${
                pathname === "/my-stuff" && `${translationStyle?.text_color}`
              }`}
            />
            <h2
              className={`${
                pathname === "/my-stuff" && `${translationStyle?.text_color}`
              }`}
            >
              My Stuff
            </h2>
          </Link>

          <Link
            href={"/help-serenity"}
            className={`flex p-2 rounded-lg justify-center items-center w-fit text-xl gap-3 font-bold ${
              pathname === "/help-serenity" && `${translationStyle?.bg_color}`
            }`}
          >
            <FaHandsHelping
              size={30}
              className={`${
                pathname === "/help-serenity" &&
                `${translationStyle?.text_color}`
              }`}
            />
            <h2
              className={`${
                pathname === "/help-serenity" &&
                `${translationStyle?.text_color}`
              }`}
            >
              Help Serenity
            </h2>
          </Link>
        </main>

        <div className="divider" />

        <footer className="flex">
          <button
            className="btn border-none bg-grey-alt text-lg shadow-none text-grey-secondary"
            onClick={onLogout}
          >
            <FaSignOutAlt />
            Log out
          </button>
        </footer>
      </div>
    </Sidebar>
  );
}
