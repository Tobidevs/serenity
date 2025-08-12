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
          <div
            data-aos="fade-down-right"
            className="flex gap-4 w-1/3 justify-start"
          >
            <div className="flex flex-col items-center">
              <FaGithub size={15} className="text-3xl text-grey-primary" />
              <label className="text-xs text-grey-secondary">Github</label>
            </div>
            <div className="flex flex-col items-center">
              <FaHandsHelping
                size={15}
                className="text-3xl text-grey-primary"
              />
              <label className="text-xs text-grey-secondary">Help</label>
            </div>
          </div>
          {/* Title */}
          <div
            data-aos="fade-down"
            className="text-2xl flex w-1/3 items-center justify-center font-bold text-grey-primary"
          >
            Serenity
          </div>
          {/* Authentication Links */}
          <div
            data-aos="fade-down-left"
            className="flex gap-4 w-1/3 justify-end"
          >
            <div
              className="flex flex-col items-center"
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
      <div className="flex w-full justify-center items-center">
        {/* iPhone Mockup */}
        <div data-aos="zoom-in-up" className="scale-75 origin-top mt-8">
          <div className="mockup-phone border-grey-primary">
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display">
              <img alt="wallpaper" src="/iphoneMockup.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
