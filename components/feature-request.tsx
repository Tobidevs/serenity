"use client";
import { useEffect } from "react";

// Extend Window interface to include Tally
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export default function FeatureRequest() {
  useEffect(() => {
    // Load Tally embed script if not already loaded
    if (
      !document.querySelector('script[src="https://tally.so/widgets/embed.js"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.Tally) window.Tally.loadEmbeds();
      };
      document.body.appendChild(script);
    } else {
      // Script already exists, just reload embeds
      if (window.Tally) window.Tally.loadEmbeds();
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <iframe
        data-tally-src="https://tally.so/embed/mO2L68?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="✝️ Improve Serenity"
      ></iframe>
    </div>
  );
}
