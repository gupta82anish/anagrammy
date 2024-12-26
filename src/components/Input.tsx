"use client";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useImperativeHandle,
} from "react";
import { Puzzle } from "./Puzzle";

// Define the type for the exposed methods
export interface InputRef {
  reset: () => void;
}

interface InputProps {
  setCorrect?: (isCorrect: boolean) => void;
  className?: string;
  inputClassName?: string;
  puzzle: Puzzle;
  wordIndex: number;
  focusOnLoad?: boolean;
  moveFocus?: (currentIndex: number, direction: "next" | "prev", wordLength: number) => void;
  ref?: any;
}

type statusType = "correct" | "incorrect" | "idle";

function GuessInput({
  setCorrect,
  className = "",
  inputClassName = "",
  puzzle,
  wordIndex,
  focusOnLoad = false,
  moveFocus,
  ref
}: InputProps) {
  const length = puzzle.answer.length;
  const [guess, setGuess] = useState<string[]>(new Array(length).fill(""));
  const [status, setStatus] = useState<statusType>("idle");

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  useEffect(() => {
    // Focus on the first input if `focusOnLoad` is true
    if (focusOnLoad) {
      inputRefs.current[0]?.focus();
    }
  }, [focusOnLoad]);

  const onComplete = (otp: string) => {
    checkAnswer(otp);
    // If the word is completed, move focus to the next word
    moveFocus?.(wordIndex, "next", length);
  };

  useImperativeHandle(ref, () => ({
    reset: resetPuzzle,
  }));

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    const newGuess = [...guess];
    newGuess[index] = value;
    setGuess(newGuess);

    // Move focus to next input if current input is filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all inputs are filled
    if (newGuess.every((char) => char !== "")) {
      inputRefs.current[index]?.blur();
      onComplete(newGuess.join(""));
    } else {
      setStatus("idle");
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace to delete and move focus
    if (event.key === "Backspace") {
      if (!guess[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (index === 0 && guess[index] === "") {
        // If the first input is emptied, move to the previous word
        moveFocus?.(wordIndex, "prev", length);
      }
    }
  };

  const checkAnswer = (otp: string) => {
    if (otp.toLowerCase() === puzzle.answer.toLowerCase()) {
      setStatus("correct");
      setCorrect?.(true);
    } else {
      setStatus("incorrect");
      setCorrect?.(false);
    }
  };
  

  const resetPuzzle = () => {

    console.log('resetting puzzle')

    setGuess(new Array(length).fill(""));
    setStatus("idle");
    setCorrect?.(false);
  }

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {guess.map((char, index) => (
        <input
				id={`input-${wordIndex}-${index}`}
          key={index}
          type="text"
          maxLength={1}
          value={char}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
					// disabled={index > 0 && !guess[index - 1]}
          style={{ textTransform: "capitalize" }}
          className={`w-10 h-10 text-center 
              ${status === "idle" ? "border-b-4 border-solid border-white bg-none" : ""}
              ${
                status === "correct"
                  ? "border-4 border-solid border-green-800 bg-green-800"
                  : ""
              }
              ${
                status === "incorrect"
                  ? "border-4 border-solid border-red-500"
                  : ""
              }
              focus:outline-none focus:border-b-8 focus:border-white
              text-white font-bold text-2xl
              disabled:opacity-100
              bg-transparent
              disabled:bg-transparent
            `}
        />
      ))}
    </div>
  );
}

export default GuessInput;
