
import { useState } from "react";
import { GameLevel } from "@/types";
import { Lock, Award, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import MilitaryCard from "./MilitaryCard";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playSound } from "@/utils/soundUtils";

interface LevelCardProps {
  level: GameLevel;
  userLevel: number;
  className?: string;
}

const LevelCard = ({ level, userLevel, className }: LevelCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLocked = level.unlockLevel > userLevel;
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isLocked) {
      playSound("buttonClick", 0.2);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    if (isLocked) {
      playSound("error", 0.3);
    } else {
      playSound("buttonClick", 0.4);
    }
  };
  
  let difficultyColor = "bg-green-500";
  if (level.difficulty === "medium") difficultyColor = "bg-yellow-500";
  if (level.difficulty === "hard") difficultyColor = "bg-orange-500";
  if (level.difficulty === "expert") difficultyColor = "bg-red-500";
  
  return (
    <div 
      className={cn(
        "group transition-all duration-300 transform",
        isHovered && !isLocked && "scale-[1.02]",
        isLocked && "opacity-75",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        to={isLocked ? "#" : `/level/${level.id}`}
        className={cn(
          "block",
          isLocked && "cursor-not-allowed"
        )}
        onClick={handleCardClick}
      >
        <MilitaryCard variant="bordered" className="h-full flex flex-col">
          <div className="relative h-40 overflow-hidden">
            {/* Level image with overlay */}
            <img 
              src={level.image} 
              alt={level.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-military to-transparent" />
            
            {/* Lock overlay if level is locked */}
            {isLocked && (
              <div className="absolute inset-0 bg-military/70 flex flex-col items-center justify-center">
                <Lock className="w-10 h-10 text-military-red mb-2" />
                <p className="text-sm font-medium">Unlocks at Level {level.unlockLevel}</p>
              </div>
            )}
            
            {/* Completed badge */}
            {level.completed && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-military-accent text-white">
                  <Award className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              </div>
            )}
            
            {/* Difficulty badge */}
            <div className="absolute top-2 left-2">
              <Badge className={difficultyColor}>
                {level.difficulty.charAt(0).toUpperCase() + level.difficulty.slice(1)}
              </Badge>
            </div>
          </div>
          
          <div className="p-2 flex-1 flex flex-col">
            <h3 className="text-lg font-bold mb-1">{level.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{level.description}</p>
            
            <Button 
              className={cn(
                "w-full mt-auto",
                isLocked 
                  ? "bg-military-light border border-military-red/50 text-military-red/50" 
                  : "bg-military-red hover:bg-military-red/90"
              )}
              disabled={isLocked}
            >
              {isLocked ? "Locked" : "Start Mission"}
              {!isLocked && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </MilitaryCard>
      </Link>
    </div>
  );
};

export default LevelCard;
