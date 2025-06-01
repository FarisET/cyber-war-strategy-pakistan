
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

interface LevelProgress {
  levelId: string;
  completed: boolean;
  timeSpent: number;
  attempts: number;
  score: number;
}

interface AttemptsData {
  [key: string]: number;
  total?: number;
}

interface TimeData {
  [key: string]: number;
  total?: number;
}

export const useProgress = () => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<LevelProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user progress:", error);
        return;
      }

      if (data) {
        // Convert database format to our progress format - now including level-0
        const progress: LevelProgress[] = [
          {
            levelId: "level-0",
            completed: data.completed_levels?.includes("level-0") || false,
            timeSpent: (data.time_taken as TimeData)?.["level-0"] || 0,
            attempts: (data.attempts as AttemptsData)?.["level-0"] || 0,
            score: 0
          },
          {
            levelId: "level-1",
            completed: data.completed_levels?.includes("level-1") || false,
            timeSpent: (data.time_taken as TimeData)?.["level-1"] || 0,
            attempts: (data.attempts as AttemptsData)?.["level-1"] || 0,
            score: 0
          },
          {
            levelId: "level-2",
            completed: data.completed_levels?.includes("level-2") || false,
            timeSpent: (data.time_taken as TimeData)?.["level-2"] || 0,
            attempts: (data.attempts as AttemptsData)?.["level-2"] || 0,
            score: 0
          },
          {
            levelId: "level-3",
            completed: data.completed_levels?.includes("level-3") || false,
            timeSpent: (data.time_taken as TimeData)?.["level-3"] || 0,
            attempts: (data.attempts as AttemptsData)?.["level-3"] || 0,
            score: 0
          },
          {
            levelId: "level-4",
            completed: data.completed_levels?.includes("level-4") || false,
            timeSpent: (data.time_taken as TimeData)?.["level-4"] || 0,
            attempts: (data.attempts as AttemptsData)?.["level-4"] || 0,
            score: 0
          }
        ];
        setUserProgress(progress);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgress = async (levelId: string, timeSpent: number, completed: boolean = false) => {
    if (!user) return;

    try {
      // Get current user data
      const { data: currentData, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current data:", fetchError);
        return;
      }

      // Update attempts - ensure we have proper object structure
      const currentAttempts = (currentData.attempts as AttemptsData) || {};
      const newAttempts: AttemptsData = {
        ...currentAttempts,
        [levelId]: (currentAttempts[levelId] || 0) + 1,
        total: (currentAttempts.total || 0) + 1
      };

      // Update time taken - ensure we have proper object structure
      const currentTimeTaken = (currentData.time_taken as TimeData) || {};
      const newTimeTaken: TimeData = {
        ...currentTimeTaken,
        [levelId]: Math.min((currentTimeTaken[levelId] || 999999), timeSpent), // Keep best time
        total: (currentTimeTaken.total || 0) + timeSpent
      };

      // Update completed levels
      let newCompletedLevels = currentData.completed_levels || [];
      let newLevel = currentData.level || 1;

      if (completed && !newCompletedLevels.includes(levelId)) {
        newCompletedLevels = [...newCompletedLevels, levelId];
        
        // Update user level based on completed levels - now includes level-0
        if (levelId === "level-0") newLevel = Math.max(newLevel, 1);
        if (levelId === "level-1") newLevel = Math.max(newLevel, 2);
        if (levelId === "level-2") newLevel = Math.max(newLevel, 3);
        if (levelId === "level-3") newLevel = Math.max(newLevel, 4);
        if (levelId === "level-4") newLevel = Math.max(newLevel, 5);
      }

      // Calculate new score (levels completed * 100 - total time in minutes)
      const newScore = newCompletedLevels.length * 100 - Math.floor((newTimeTaken.total || 0) / 60);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          attempts: newAttempts,
          time_taken: newTimeTaken,
          completed_levels: newCompletedLevels,
          level: newLevel,
          score: newScore,
          last_login: new Date().toISOString()
        })
        .eq("id", user.id);

      if (updateError) {
        console.error("Error updating progress:", updateError);
        toast.error("Failed to save progress");
        return;
      }

      // Refresh progress
      await fetchUserProgress();

      if (completed) {
        toast.success(`Level ${levelId.split('-')[1]} completed!`, {
          description: `Cyber warfare expertise increased: Level ${newLevel}`
        });
      }

    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Failed to save progress");
    }
  };

  const getLevelProgress = (levelId: string) => {
    return userProgress.find(p => p.levelId === levelId) || {
      levelId,
      completed: false,
      timeSpent: 0,
      attempts: 0,
      score: 0
    };
  };

  const isLevelUnlocked = (levelId: string) => {
    const completedLevels = userProgress.filter(p => p.completed).map(p => p.levelId);
    
    // Level 0 (APT36) is always unlocked - starting point
    if (levelId === "level-0") return true;
    
    // Level 1 requires Level 0 completion
    if (levelId === "level-1") return completedLevels.includes("level-0");
    
    // Level 2 requires Level 1 completion
    if (levelId === "level-2") return completedLevels.includes("level-1");
    
    // Level 3 requires Level 2 completion
    if (levelId === "level-3") return completedLevels.includes("level-2");
    
    // Level 4 requires Level 3 completion
    if (levelId === "level-4") return completedLevels.includes("level-3");
    
    return false;
  };

  return {
    userProgress,
    isLoading,
    updateProgress,
    getLevelProgress,
    isLevelUnlocked,
    refreshProgress: fetchUserProgress
  };
};
