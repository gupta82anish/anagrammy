"use client"
import GuessInput from "@/components/Input";
import PuzzleRow from "@/components/Square";
import { useState } from "react";

export type Puzzle = {
  jumble: string
  answer: string
}

export default function Home() {

  const [correct, setCorrect] = useState<boolean>(false);

  const [puzzle, setPuzzle] = useState<Puzzle>({
    jumble: "BENLMOT",
    answer: "BELMONT"
  });

  const onComplete = (otp: string) => {
    console.log("OTP is", otp);
    if(otp.toLowerCase() === puzzle.answer.toLowerCase()){
      console.log("Correct Answer");
      setCorrect(true);
    } else {
      console.log("Incorrect Answer");
      setCorrect(false);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 gap-8 items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <PuzzleRow puzzle={puzzle} correct={correct}/>
        </div>
        <GuessInput puzzle={puzzle} onCompleteProp={onComplete}/>
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
