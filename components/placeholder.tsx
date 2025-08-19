import Link from "next/link";
import React from "react";
import { FaBookBible } from "react-icons/fa6";
import { LiaSchoolSolid } from "react-icons/lia";

export const Placeholder = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-70 h-70 flex flex-col items-center justify-center">
        <div className="text-xl text-center text-grey-primary font-bold mb-4">
          This page is under construction. Please check back later or visit
          these pages:
        </div>
        <Link
          href={"/bible-study"}
          className={`flex p-2 rounded-lg justify-center items-center w-fit text-xl gap-3 font-bold`}
        >
          <FaBookBible size={25} className={`text-grey-primary`} />
          <h2 className={`text-grey-primary text-2xl`}>Bible Study</h2>
        </Link>

        <Link
          href={"/quiz-menu"}
          className={`flex p-2 rounded-lg justify-center items-center w-fit text-xl gap-3 font-bold `}
        >
          <LiaSchoolSolid size={28} className={`text-grey-primary`} />
          <h2 className={`text-grey-primary text-2xl`}>Bible Quiz</h2>
        </Link>
      </div>
    </div>
  );
};
export default Placeholder;
