"use client";
import { useEffect } from "react";
import Head from "next/head";

export default function HelpSerenityPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>✝️ Help Build Serenity</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <style>{`
          html, body {
            margin: 0;
            min-height: 100vh;
            overflow: auto;
          }
          iframe {
            width: 100%;
            height: 100vh;
            border: 0;
            display: block;
          }
        `}</style>
      </Head>
      <iframe
        data-tally-src="https://tally.so/r/nPL6GB?transparentBackground=1"
        title="✝️ Help Build Serenity"
        width={"100%"}
      />
    </>
  );
}
