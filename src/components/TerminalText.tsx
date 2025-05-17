
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

const TerminalText = ({
  text,
  className,
  typingSpeed = 30,
  startDelay = 0,
  onComplete
}: TerminalTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Reset if text changes
    setDisplayedText("");
    setIsComplete(false);
    
    timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const typeNextChar = () => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex));
          currentIndex++;
          
          if (currentIndex <= text.length) {
            timeout = setTimeout(typeNextChar, typingSpeed);
          } else {
            setIsComplete(true);
            if (onComplete) onComplete();
          }
        }
      };
      
      typeNextChar();
    }, startDelay);
    
    return () => clearTimeout(timeout);
  }, [text, typingSpeed, startDelay, onComplete]);

  return (
    <div className={cn("terminal-text font-mono", isComplete && "after:content-['_']", className)}>
      {displayedText}
    </div>
  );
};

export default TerminalText;
