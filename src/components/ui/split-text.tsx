import React from "react";

interface SplitTextProps {
  text: string;
  className?: string;
}

export const SplitText = ({ text, className = "" }: SplitTextProps) => {
  return (
    <span className={`reveal-mask ${className}`} style={{ paddingRight: '0.05em' }}>
      {text.split(" ").map((word, wordIndex, wordsArray) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="reveal-content inline-block translate-y-[110%] opacity-0"
              style={{ paddingRight: '0.01em' }}
            >
              {char}
            </span>
          ))}
          {/* Add a space character after the word, except for the last word */}
          {wordIndex < wordsArray.length - 1 && (
            <span className="reveal-content inline-block translate-y-[110%] opacity-0">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  );
};
