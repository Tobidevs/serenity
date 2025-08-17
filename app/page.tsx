"use client";
import { useRouter } from "next/navigation";
import { useSessionStore } from "../store/useSessionStore";
import React, { useEffect } from "react";
import AOS from "aos";
import { ReactTyped } from "react-typed";
import { PiSignIn } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function Home() {
  const { session, fetchSession } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    // Only initialize AOS on the client side
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: "ease-in-out",
      });
      AOS.refresh();
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div className="flex flex-col px-4 pt-6 w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-center w-full gap-8">
        <div className="flex w-full md:w-1/4 items-center justify-between">
          {/* External links */}
          <div className="flex gap-4 w-1/3 justify-start">
            <Link
              href="https://github.com/Tobidevs/serenity"
              data-aos="fade-down-right"
              data-aos-delay="250"
              className="flex flex-col items-center"
            >
              <FaGithub className="text-lg md:text-2xl text-grey-primary" />
              <label className="text-xs text-grey-secondary">Github</label>
            </Link>
            <Link
              href="/help-serenity"
              data-aos="fade-down-right"
              data-aos-delay="200"
              className="flex flex-col items-center"
            >
              <FaHandsHelping className="text-lg md:text-2xl text-grey-primary" />
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

          {/* Auth */}
          <div className="flex gap-4 w-1/3 justify-end">
            <div
              onClick={() =>
                session ? router.push("/dashboard") : router.push("/auth")
              }
              className="flex flex-col items-center cursor-pointer"
              data-aos="fade-down-left"
              data-aos-delay="200"
            >
              <MdOutlineAccountCircle className="text-lg md:text-2xl text-grey-primary" />
              <label className="text-xs text-grey-secondary">Sign Up</label>
            </div>
            <div
              onClick={() =>
                session ? router.push("/dashboard") : router.push("/auth")
              }
              className="flex flex-col items-center cursor-pointer"
              data-aos="fade-down-left"
              data-aos-delay="250"
            >
              <PiSignIn className="text-lg md:text-2xl text-grey-primary" />
              <label className="text-xs text-grey-secondary">Sign In</label>
            </div>
          </div>
        </div>
      </div>

      <section className="relative w-full mt-6">
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-4 w-32 h-32 md:top-10 md:left-5 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-pink-600 to-red-500 opacity-50 md:opacity-35 blur-3xl animate-blob" />
          <div className="absolute top-32 right-0 w-36 h-36 md:top-1/4 md:right-5 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 opacity-50 md:opacity-35 blur-3xl animate-blob animation-delay-5s" />
          <div className="absolute top-64 left-1/4 w-40 h-40 md:top-1/2 md:left-1/4 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-green-500 to-teal-400 opacity-50 md:opacity-35 blur-3xl animate-blob animation-delay-10s" />
          <div className="absolute top-96 right-8 w-32 h-32 md:top-1/4 md:right-1/4 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-50 md:opacity-35 blur-3xl animate-blob animation-delay-15s" />
          <div className="absolute bottom-20 left-8 w-44 h-44 md:bottom-10 md:left-1/3 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-50 md:opacity-35 blur-3xl animate-blob animation-delay-20s" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row h-full md:justify-center items-center relative z-10">
          <div className="flex flex-col md:h-3/5 w-full md:w-7/12 justify-start items-center md:items-start">
            <ReactTyped
              data-aos="fade-up"
              className="text-3xl md:text-7xl w-9/10 h-30 md:h-53 text-center md:text-start font-bold text-grey-primary mt-8"
              strings={[
                "Focused on building tools for the Christian community.",
                "Building apps that strengthen your walk with God.",
                "Tools to inspire, connect, and grow in faith.",
              ]}
              typeSpeed={50}
              backSpeed={30}
              backDelay={2000}
              loop={true}
            />
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="hidden md:flex items-center justify-start gap-4 mt-5 w-5/7"
            >
              <p className="text-[20px] text-grey-secondary font-semibold">
                Serenity is a platform to help you grow closer to God through
                scripture, prayer, and faith-building tools.
              </p>
              <button
                className="btn animated-button rounded-lg flex justify-center text-grey-primary border border-gray-300 shadow-none items-center p-4 bg-grey-main w-fit"
                onClick={() => router.push("/auth")}
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="flex w-full md:w-3/12 justify-center items-center flex-col mt-8 md:mt-10">
            <div
              data-aos="zoom-in-up"
              className="scale-75 md:scale-90 origin-top"
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
      </section>

      {/* Intro */}
      <div className="flex items-center justify-center w-full py-20  z-10">
        <div className="flex w-full max-w-3xl flex-col px-4">
          <Fade direction="up" duration={1000}>
            <h1 className="text-2xl md:text-3xl text-grey-primary font-bold text-center">
              Hi, I'm Tobi
            </h1>
          </Fade>
          <Fade direction="up" duration={1000}>
            <p className="text-grey-secondary text-center mt-4 text-lg">
              I'm a software engineer with a passion to glorify God through
              technology. Take a look at what I’ve been building!
            </p>
          </Fade>
        </div>
      </div>

      <div className="w-full flex flex-col mt-15">
        <section className="flex flex-col border rounded-2xl p-4">
          <Fade direction="up" duration={1000}>
            <p className="text-sm text-grey-secondary font-semibold">
              Last updated: Aug 17, 2025
            </p>
            <p className="text-md text-grey-secondary font-semibold">
              I'm Currently Working On...
            </p>
          </Fade>
          <Fade direction="up" duration={1000}>
            <div className="flex justify-between items-center w-full mt-5 mb-7">
              <h1 className="text-3xl text-grey-primary font-bold ">
                Bible Quiz
              </h1>

              <div className="flex items-center bg-[#B5CEFF] h-7 rounded-2xl pr-3 pl-3 ">
                <div className="rounded-full h-3 w-3 bg-[#5F99DF] mr-2"></div>
                <div className="text-grey-primary text-sm font-semibold">
                  In progress
                </div>
              </div>
            </div>
          </Fade>
          <ReactTyped
            typeSpeed={50}
            strings={[
              "A fun and interactive way to test your knowledge on Scripture. User-friendly interface with multiple choice questions, and a variety of topics to choose from, including books of the Bible, themes, and more. Explore the quiz menu to get started!",
            ]}
            className="text-grey-secondary"
          ></ReactTyped>
        </section>
        <section>
          
        </section>
      </div>
      <div className="min-h-screen"></div>
    </div>
  );
}
