
import React from "react";
import { cn } from "@/lib/utils";

interface MilitaryCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered";
}

const MilitaryCard = ({ 
  children, 
  className,
  variant = "default" 
}: MilitaryCardProps) => {
  return (
    <div 
      className={cn(
        "bg-military-light p-4 relative overflow-hidden",
        variant === "bordered" && "military-border",
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
      
      {children}
    </div>
  );
};

export default MilitaryCard;
