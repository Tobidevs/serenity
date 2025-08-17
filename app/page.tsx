"use client";
import { useRouter } from "next/navigation";
import { useSessionStore } from "../store/useSessionStore";
import { useEffect } from "react";
import AOS from "aos";
import { ReactTyped } from "react-typed";
import { PiSignIn } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import "aos/dist/aos.css";
import { FaHandsHelping } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const { session, fetchSession } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Check Session on page load
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div className="flex flex-col pl-4 pr-4 pt-6 w-full h-full">
      <div className="flex items-center justify-center w-full h-fit gap-13">
        {/* Header Section */}
        <div className="flex w-full md:w-1/4 items-center justify-between">
          {/* External links */}
          <div className="flex gap-4 w-1/3 justify-start">
            <Link
              href={"https://github.com/Tobidevs/serenity"}
              data-aos="fade-down-right"
              data-aos-delay="250"
              className="flex flex-col items-center"
            >
              <FaGithub size={15} className="text-3xl text-grey-primary" />
              <label className="text-xs text-grey-secondary">Github</label>
            </Link>
            <Link
              href={"/help-serenity"}
              data-aos="fade-down-right"
              data-aos-delay="200"
              className="flex flex-col items-center"
            >
              <FaHandsHelping
                size={15}
                className="text-3xl text-grey-primary"
              />
              <label className="text-xs text-grey-secondary">Help</label>
            </Link>
          </div>
          {/* Title */}
          <div
            data-aos="fade-down"
            className="text-2xl md:text-4xl flex w-1/3 items-center justify-center font-bold text-grey-primary"
          >
            Serenity
          </div>
          {/* Authentication Links */}
          <div className="flex gap-4 w-1/3 justify-end">
            <div
              className="flex flex-col items-center cursor-pointer"
              data-aos="fade-down-left"
              data-aos-delay="200"
              onClick={() =>
                session ? router.push("/dashboard") : router.push("/auth")
              }
            >
              <MdOutlineAccountCircle
                className="text-3xl text-grey-primary"
                size={15}
              />
              <label className="text-xs text-grey-secondary">Sign Up</label>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer"
              data-aos="fade-down-left"
              data-aos-delay="250"
              onClick={() =>
                session ? router.push("/dashboard") : router.push("/auth")
              }
            >
              <PiSignIn className="text-3xl text-grey-primary" size={15} />
              <label className="text-xs text-grey-secondary">Sign In</label>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex md:justify-center md:w-full relative">
        <div className="absolute top-5 left-2 w-48 h-48 md:top-10 md:left-5 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-pink-600 to-red-500 opacity-30 blur-3xl animate-blob" />
        <div className="absolute top-20 right-2 w-40 h-40 md:top-1/4 md:right-5 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 opacity-30 blur-3xl animate-blob animation-delay-5s" />
        <div className="absolute top-40 left-8 w-48 h-48 md:top-1/2 md:left-1/4 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-green-500 to-teal-400 opacity-30 blur-3xl animate-blob animation-delay-10s" />
        <div className="absolute bottom-32 right-8 w-40 h-40 md:bottom-1/4 md:right-1/4 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-30 blur-3xl animate-blob animation-delay-15s" />
        <div className="absolute bottom-5 left-1/4 w-48 h-48 md:bottom-10 md:left-1/3 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-30 blur-3xl animate-blob animation-delay-20s" />

        <div className="flex flex-col md:flex-row md:w-8/10 md:justify-center items-center">
          {/* Main Content */}

          <div className="flex h-3/5 flex-col w-full md:w-7/10 justify-start items-center md:items-start">
            <ReactTyped
              data-aos="fade-up"
              className="text-3xl md:text-7xl w-9/10 h-30  md:h-2/5 text-center md:text-start font-bold text-grey-primary mt-8"
              strings={[
                "Focused on building tools for the Christian community.",
                "Building apps that strengthen your walk with God.",
                "Tools to inspire, connect, and grow in faith.",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop={true}
            ></ReactTyped>
            <div
              data-aos="fade-down"
              className="hidden md:flex items-center justify-start gap-2 w-4/6 -mt-30 md:mt-5"
            >
              <p className="text-[20px] w-9/10 text-grey-secondary text-start font-semibold">
                Serenity helps you grow closer to God through scripture, prayer,
                and faith-building tools.
              </p>
              <button
                className={
                  "btn animated-button pulse-correct rounded-lg scale-130 flex justify-center text-grey-primary border border-gray-300 shadow-none items-center p-3 bg-grey-main w-fit"
                }
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="flex w-full md:w-3/10 justify-center items-center flex-col h-fit">
            {/* iPhone Mockup */}
            <div
              data-aos="zoom-in-up"
              className="scale-75 md:scale-90 origin-top mt-8 md:mt-18"
            >
              <div className="mockup-phone border-grey-primary">
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display">
                  <img
                    alt="wallpaper"
                    src="/iphoneMockup.png"
                    className="block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-8 w-full md:hidden">
        <div data-aos="fade-down" className="flex w-full flex-col -mt-30">
          <h1 className="text-2xl text-grey-primary font-bold text-center">
            Hi, I'm Tobi
          </h1>
          <p className="text-grey-secondary text-center mt-4">
            I'm a software engineer with a passion to glorify God through
            technology. Take a look at what I’ve been building!
          </p>
        </div>
      </div>
      <div className="h-96 w-full"></div>
    </div>
  );
}
