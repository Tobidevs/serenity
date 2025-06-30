import { Sidebar } from "@/components/ui/sidebar";
import { supabase } from "../db/supabase-client";
import { useSessionStore } from "../store/useSessionStore";
import { useRouter } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { FaBookBible } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { FaBoxArchive } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import Link from "next/link";

export function Navbar() {
  const { setSession } = useSessionStore();
  const router = useRouter();

  const onLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/");
  };

  return (
    <Sidebar>
      <div className="w-full h-full bg-grey-alt pb-10 pt-10 pr-3 pl-3">
        <section className="h-1/8 w-full flex gap-3 items-center">
          <div className="avatar avatar-placeholder w-15 h-15">
            <div className="bg-grey-primary text-white rounded-full">
              <span className="text-2xl">T</span>
            </div>
          </div>
          <div className=" w-fit">
            <h1 className="text-2xl text-grey-primary font-semibold">Tobi Akere</h1>
            <p className="text-grey-secondary text-sm">
              emailaddress@gmail.com
            </p>
          </div>
        </section>
        
          <main className="flex text-grey-primary gap-6 flex-col w-full pb-10 pt-10 pl-5">
            <Link
              href={"/dashboard"}
              className="flex justify-center items-center w-fit text-xl gap-3 font-bold"
            >
              <BiSolidDashboard size={30} className="" />
              Dashboard
            </Link>

            <Link
              href={"/"}
              className="flex justify-center items-center w-fit text-xl gap-3 font-bold"
            >
              <FaBookBible size={30} className="" />
              Bible Study
            </Link>

            <Link
              href={"/"}
              className="flex justify-center items-center w-fit text-xl gap-3 font-bold"
            >
              <LuNotebookPen size={30} className="" />
              Study Plan
            </Link>

            <Link
              href={"/"}
              className="flex justify-center items-center w-fit text-xl gap-3 font-bold"
            >
              <FaBoxArchive size={30} className="" />
              My Stuff
            </Link>

            <Link
              href={"/"}
              className="flex justify-center items-center w-fit text-xl gap-3 font-bold"
            >
              <FaHandsHelping size={30} className="" />
              Help Serenity
            </Link>
          </main>
        
        <footer className="flex justify-center">
          <button
            className="btn border-none bg-grey-alt text-lg shadow-none text-red-400 "
            onClick={onLogout}
          >
            Log out
          </button>
        </footer>
      </div>
    </Sidebar>
  );
}
