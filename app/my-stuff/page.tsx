"use client";
import React from "react";
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import Placeholder from "../../components/placeholder";

const page = () => {
  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="w-full mt-20">
        <Placeholder />
      </div>
    </div>
  );
};

export default page;
