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
      <div className="flex flex-col items-center gap-13">
        {/* Header Section */}
        <div className="flex w-full items-center justify-between">
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
            className="text-2xl flex w-1/3 items-center justify-center font-bold text-grey-primary"
          >
            Serenity
          </div>
          {/* Authentication Links */}
          <div className="flex gap-4 w-1/3 justify-end">
            <div
              className="flex flex-col items-center"
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
              className="flex flex-col items-center"
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
        {/* Main Content */}
        <ReactTyped
          data-aos="fade-up"
          className="text-3xl w-9/10 h-30 text-center font-bold text-grey-primary"
          strings={[
            "Focused on building tools for the Christian community.",
            "Building apps that strengthen your walk with God.",
            "Tools to inspire, connect, and grow in faith.",
          ]}
          typeSpeed={50}
          backSpeed={30}
          loop={true}
        ></ReactTyped>
      </div>
      <div className="flex w-full justify-center items-center flex-col h-fit">
        {/* iPhone Mockup */}
        <div data-aos="zoom-in-up" className="scale-75 origin-top mt-8">
          <div className="mockup-phone border-grey-primary">
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display">
              <img alt="wallpaper" src="/iphoneMockup.png" className="block" />
            </div>
          </div>
        </div>
        <div data-aos="fade-down" className="flex w-full flex-col -mt-30 ">
          <h1 className="text-2xl text-grey-primary font-bold text-center">
            Hi, I'm Tobi
          </h1>
          <p className="text-grey-secondary text-center mt-4">
            I'm a software engineer with a passion to glorify God through
            technology. Take a look at what I’ve been building!
          </p>
        </div>
      </div>
      <div className="h-96"></div>
    </div>
  );
}
