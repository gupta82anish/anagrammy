"use client";
import GuessInput, { InputRef } from "@/components/Input";
import PuzzleRow from "@/components/Square";
import { useEffect, useRef, useState } from "react";
import { Pill } from "./CategoryPill";
import { Button } from "./Button";


export type Puzzle = {
  jumble: string;
  answer: string;
};

export type Sentence = {
  word: Puzzle[];
};

export type ThePuzzleProps = {
  puzzle: Sentence
  category: string
  getNewPuzzle: () => void
}

export default function ThePuzzle({ puzzle, category, getNewPuzzle }: ThePuzzleProps) {
  const inputRef = useRef<InputRef[]>([])

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

    const targetId =
      direction === "next"
        ? `${currentIndex + 1}-0`
        : `${currentIndex - 1}-${wordLengthMap[currentIndex - 2] - 1}`;

    const targetInput = document.getElementById(`input-${targetId}`);
    targetInput?.focus();
  };

  const handleReset = () => {

    console.log('handle reset')
    puzzle.word.map((puzzle, index) => {
      if(inputRef.current[index]){
        console.log('resetting', index)
      inputRef.current[index].reset()
    }
    })
  }

  const resetGame = () => {
    setCorrectArray(new Array(puzzle.word.length).fill(false));
    handleReset()
    
  }

  const giveUp = () => {
    setCorrectArray(new Array(puzzle.word.length).fill(true));
  }

 const startNewPuzzle = () => {
    getNewPuzzle()
    resetGame()
 }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 gap-8 items-center justify-center">
        <div className="flex gap-4">
            <Pill text={category} className="text-base px-4 py-2" />
            <Button onClick={resetGame} text="Reset" className="text-base px-4 py-2" />
            <Button onClick={giveUp} text="Give Up" className="text-base px-4 py-2" showIcon={false}/>
            <Button onClick={startNewPuzzle} text="New Puzzle" className="text-base px-4 py-2" showIcon={false}/>
        </div>
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
              key={`${index}-${puzzle.jumble}`}
              wordIndex={index + 1}
              puzzle={puzzle}
              setCorrect={(isCorrect: boolean) =>
                updateCorrectness(index, isCorrect)
              }
              focusOnLoad={index === 0}
              moveFocus={moveFocus}
              ref={() =>(inputRef.current[index])}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
