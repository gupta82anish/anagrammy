import React from 'react'

interface ButtonProps {
  onClick: () => void
  className?: string
  text: string
}

export function Button({ onClick, className = '', text }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        px-4 py-2 rounded
        bg-orange-100 hover:bg-orange-200
        text-orange-700 hover:text-orange-800
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-orange-300
        ${className}
      `}
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {text}
    </button>
  )
}

