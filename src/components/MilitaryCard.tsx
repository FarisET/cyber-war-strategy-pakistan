
import React from "react";
import { cn } from "@/lib/utils";

interface MilitaryCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "timer";
  timeRemaining?: number;
  totalTime?: number;
}

const MilitaryCard = ({
  children,
  className,
  variant = "default",
  timeRemaining,
  totalTime
}: MilitaryCardProps) => {
  // Calculate progress percentage for timer variant
  const progressPercentage = timeRemaining && totalTime
    ? (timeRemaining / totalTime) * 100
    : 100;
  
  // Determine color based on remaining time
  const getTimerColor = () => {
    if (!timeRemaining || !totalTime) return 'bg-military-accent';
    if (progressPercentage > 60) return 'bg-military-accent';
    if (progressPercentage > 30) return 'bg-yellow-500';
    return 'bg-military-red';
  };

  return (
    <div
      className={cn(
        "bg-military-light p-4 relative overflow-hidden", // Key: `relative overflow-hidden`
        variant === "bordered" && "military-border",        // Key: `military-border`
        className
      )}
    >
      {/* Corner decorations if using bordered variant */}
      {variant === "bordered" && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-military-red" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-military-red" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-military-red" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-military-red" />
        </>
      )}
      
      {/* Timer decoration if using timer variant */}
      {variant === "timer" && (
        <div className="absolute top-0 left-0 w-full h-1 bg-military">
          <div 
            className={`h-full ${getTimerColor()} transition-all duration-1000 ease-linear`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}
      
      {children} {/* Children are rendered here */}
    </div>
  );
};

export default MilitaryCard;
