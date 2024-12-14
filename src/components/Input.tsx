"use client";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Puzzle } from "@/app/page";


interface InputProps {
  onCompleteProp?: (otp: string) => void;
  className?: string;
  inputClassName?: string;
	puzzle: Puzzle
}


type statusType = "correct" | "incorrect" | "idle"

function GuessInput({ onCompleteProp, className = "", inputClassName = "", puzzle}: InputProps) {
	const length = puzzle.answer.length
  const [guess, setGuess] = useState<string[]>(new Array(length).fill(""));

  const [status, setStatus] = useState<statusType>("idle");

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  useEffect(() => {
    // Focus on the first input when component mounts
    inputRefs.current[0]?.focus();
  }, [length]);

  useEffect(() => {
    // Shift focus to the next input when the otp state changes
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === "" && i > 0 && guess[i - 1] !== "") {
        inputRefs.current[i]?.focus();
        break;
      }
    }
  }, [guess]);

	const onComplete = (otp: string) => {
		checkAnswer(otp)
		onCompleteProp?.(otp)
	}

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

    // Check if OTP is complete
    if (newGuess.every((char) => char !== "")) {
      onComplete?.(newGuess.join(""));
    }else{
			setStatus("idle")
		}
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace to delete and move focus
    if (event.key === "Backspace" && !guess[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

	const checkAnswer = (otp: string) => {
		if(otp.toLowerCase() === puzzle.answer.toLowerCase()){
			setStatus("correct")
		} else {
			setStatus("incorrect")
		}
	}

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {guess.map((char, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={char}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={index > 0 && !guess[index - 1]}
          style={{ textTransform: "capitalize" }}
          className={`
              w-10 h-10 text-center 
              ${status=== "idle" ? "border-b-4 border-solid border-white" : ""}
							${status === "correct" ? "border-4 border-solid border-green-500" : ""}
							${status === "incorrect" ? "border-4 border-solid border-red-500" : ""}
              focus:outline-none focus:border-b-8focus:border-white
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
