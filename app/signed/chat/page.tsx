"use client";
import Logo from "@/components/icons/logo";
import SignedSidebar from "@/components/sidebars/signed";
import React from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


export default function Page() {
  const [search, setSearch] = React.useState<string>("")
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }
  
  return (
    <main className="flex flex-row gap-4">
      <SignedSidebar />
      <div className="flex-[3] flex items-center justify-center flex-col">
        <Logo width={64} height={64} />
        <p className="mt-4 text-center font-semibold text-4xl">
          Hello, I am WellGab. Your AI assistant for all your symptoms and
          diagnosis questions
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for symptoms"
            className="w-[80%] h-10 mt-4 px-4 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-[80%] h-10 mt-4 px-4 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            Search
          </button>
        </form>
      </div>
    </main>
  );
}
