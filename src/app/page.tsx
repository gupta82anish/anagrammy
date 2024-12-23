"use client";
import GuessInput from "@/components/Input";
import PuzzleRow from "@/components/Square";
import { create } from "domain";
import { useEffect, useState } from "react";

export type Puzzle = {
  jumble: string;
  answer: string;
};

export type Sentence = {
  word: Puzzle[];
};

export default function Home() {
  // Track correctness for each word

  const [puzzle, setPuzzle] = useState<Sentence>({
    word: [
      {
        jumble: "HTIS",
        answer: "THIS",
      },
      {
        jumble: "SI",
        answer: "IS",
      },
      {
        jumble: "HET",
        answer: "THE",
      },
      {
        jumble: "DEN",
        answer: "END",
      },
    ],
  });

  const [wordLengthMap, setWordLengthMap] = useState<number[]>(
    createWordLengthMap(puzzle)
  );

  function createWordLengthMap(sentence: Sentence) {
    return sentence.word.map((puzzle) => puzzle.answer.length);
  }


  const [correctArray, setCorrectArray] = useState<boolean[]>(
    new Array(puzzle.word.length).fill(false) // Initialize with `false` for each word
  );
  // Function to update correctness for a specific word
  const updateCorrectness = (index: number, isCorrect: boolean) => {
    setCorrectArray((prev) => {
      const updated = [...prev];
      updated[index] = isCorrect;
      return updated;
    });
  };

  const moveFocus = (
    currentIndex: number,
    direction: "next" | "prev",
    wordLength: number
  ) => {
    // const targetIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    // const targetIndex = direction === "next" ? currentIndex + wordLength : currentIndex - wordLength;
    console.log("currentIndex", currentIndex);
    console.log("wordLength", wordLength);
    console.log("maps", wordLengthMap);

    console.log("Current Word Length", wordLengthMap[currentIndex - 1]);
    console.log("Current Word", puzzle.word[currentIndex]?.answer);


    const targetId =
      direction === "next"
        ? `${currentIndex + 1}-0`
        : `${currentIndex - 1}-${wordLengthMap[currentIndex - 2] - 1}`;

    console.log("targetId", targetId);
    // if (targetIndex >= 0 && targetIndex >= wordLength) {
    console.log("invoking focus");
    // const index = currentIndex + wordLength
    const targetInput = document.getElementById(`input-${targetId}`);
    console.log("targetInput", targetInput?.id);
    targetInput?.focus();
    // }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 gap-8 items-center justify-center">
        <div className="flex flex-row gap-8 items-center justify-center">
          {puzzle.word.map((puzzle, index) => (
            <PuzzleRow
              key={index}
              wordIndex={index}
              puzzle={puzzle}
              correct={correctArray[index]}
            />
          ))}
        </div>
        <div className="flex flex-row gap-8 items-center justify-center">
          {puzzle.word.map((puzzle, index) => (
            <GuessInput
              key={index}
              wordIndex={index + 1}
              puzzle={puzzle}
              setCorrect={(isCorrect: boolean) =>
                updateCorrectness(index, isCorrect)
              }
              focusOnLoad={index === 0}
              moveFocus={moveFocus}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
