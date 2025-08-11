"use client";
import { useRouter } from "next/navigation";
import { useSessionStore } from "../store/useSessionStore";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
    <div className="flex flex-col pl-4 pr-4 pt-10 w-full h-full">
      <div className="flex"></div>
      <div className="flex flex-col items-center gap-13">
        <div className="flex w-full items-center justify-between">
          
          <div
            data-aos="fade-down"
            className="text-xl flex items-center justify-center font-bold text-grey-primary"
          >
            Serenity.
          </div>
          <button
            data-aos="fade-down-left"
            className="btn rounded-xl flex justify-center border border-gray-300 text-grey-primary shadow-none items-center p-3 bg-grey-main w-fit"
            onClick={() =>
              session ? router.push("/dashboard") : router.push("/auth")
            }
          >
            Sign in
          </button>
        </div>
        <div
          data-aos="fade-up"
          className="text-3xl w-9/10 text-center font-bold text-grey-primary mb-4"
        >
          Focused on building tools for the Christian community.
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div data-aos="zoom-in-up" className="scale-70 origin-top mt-10">
          <div className="mockup-phone border-grey-primary">
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display">
              <img
                alt="wallpaper"
                src="https://img.daisyui.com/images/stock/453966.webp"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
