import { useState, useEffect } from "react";
import { GameLevel } from "@/types";
import { Lock, Award, ChevronRight, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import MilitaryCard from "./MilitaryCard";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playSound } from "@/utils/soundUtils";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

interface LevelCardProps {
  level: GameLevel;
  userLevel: number;
  className?: string;
}

const LevelCard = ({ level, userLevel, className }: LevelCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { getLevelProgress, isLevelUnlocked, isUpdating } = useProgress();
  const navigate = useNavigate();
  
  const progress = getLevelProgress(level.id);
  const isUnlocked = isLevelUnlocked(level.id);
  
  // Debug log to track state changes
  useEffect(() => {
    console.log(`Level ${level.id} - isUnlocked: ${isUnlocked}, isUpdating: ${isUpdating}`);
  }, [isUnlocked, isUpdating, level.id]);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isUnlocked) {
      playSound("buttonClick", 0.2);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    
    // Get fresh unlock state
    const currentlyUnlocked = isLevelUnlocked(level.id);
    
    console.log(`Card clicked for ${level.id}:`, {
      currentlyUnlocked,
      isUpdating,
      progress
    });
    
    if (!currentlyUnlocked) {
      playSound("error", 0.3);
      toast.error("This level is locked!", {
        description: `Complete the previous level to unlock ${level.name}`
      });
      return;
    }
    
    playSound("buttonClick", 0.4);
    navigate(`/level/${level.id}`);
  };
  
  let difficultyColor = "bg-green-500";
  if (level.difficulty === "medium") difficultyColor = "bg-yellow-500";
  if (level.difficulty === "hard") difficultyColor = "bg-orange-500";
  if (level.difficulty === "expert") difficultyColor = "bg-red-500";

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  return (
    <div 
      className={cn(
        "group transition-all duration-300 transform cursor-pointer",
        isHovered && isUnlocked && "scale-[1.02]",
        !isUnlocked && "opacity-75",
        isUpdating && "opacity-90", // Show updating state
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          
          {/* Updating overlay */}
          {isUpdating && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-military-accent animate-pulse" />
          )}
          
          {/* Lock overlay if level is locked */}
          {!isUnlocked && !isUpdating && (
            <div className="absolute inset-0 bg-military/70 flex flex-col items-center justify-center">
              <Lock className="w-10 h-10 text-military-red mb-2" />
              <p className="text-sm font-medium">Unlocks at Level {level.unlockLevel}</p>
            </div>
          )}
          
          {/* Completed badge */}
          {progress.completed && (
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
          <p className="text-sm text-muted-foreground mb-3 flex-1">{level.description}</p>
          
          {/* Progress stats */}
          {isUnlocked && (progress.attempts > 0 || progress.timeSpent > 0) && (
            <div className="flex justify-between text-xs text-muted-foreground mb-3 p-2 bg-military-dark rounded">
              <div className="flex items-center gap-1">
                <Target className="w-3 h-3" />
                <span>Attempts: {progress.attempts}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Best: {formatTime(progress.timeSpent)}</span>
              </div>
            </div>
          )}
          
          <Button 
            className={cn(
              "w-full mt-auto transition-all duration-200",
              !isUnlocked && !isUpdating
                ? "bg-military-light border border-military-red/50 text-military-red/50" 
                : isUpdating
                ? "bg-military-accent/70 animate-pulse"
                : progress.completed
                ? "bg-military-accent hover:bg-military-accent/90"
                : "bg-military-red hover:bg-military-red/90"
            )}
            disabled={!isUnlocked && !isUpdating}
          >
            {isUpdating 
              ? "Updating..." 
              : !isUnlocked 
              ? "Locked" 
              : progress.completed 
              ? "Replay Mission" 
              : "Start Mission"
            }
            {(isUnlocked || isUpdating) && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </MilitaryCard>
    </div>
  );
};

export default LevelCard;