
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import MilitaryCard from "@/components/MilitaryCard";
import { GAME_LEVELS } from "@/data/gameLevels";
import { LEVEL_ONE_SCENARIO } from "@/data/gameLevels";
import { Button } from "@/components/ui/button";
import { playSound } from "@/utils/soundUtils";
import { ArrowLeft, Flag, Clock, AlertCircle } from "lucide-react";
import { GameQuestion } from "@/types";
import { toast } from "sonner";
import TerminalText from "@/components/TerminalText";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const LevelDetail = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds per question
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();
  
  const level = GAME_LEVELS.find(level => level.id === levelId);
  const scenario = LEVEL_ONE_SCENARIO; // We're using level one scenario for now
  
  useEffect(() => {
    // Reset state when level changes
    setQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setTimeRemaining(30); // Reset to 30 seconds
    setTotalTimeTaken(0);
    
    // Set first question
    if (scenario && scenario.questions.length > 0) {
      setCurrentQuestion(scenario.questions[0]);
    }
    
    // Play sound effect
    playSound("startup", 0.3);

    // Fetch attempts data for this level
    fetchAttemptData();
    
    return () => {
      // Cleanup timer on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [levelId, scenario]);

  // Fetch attempts data for this level from user profile
  const fetchAttemptData = async () => {
    if (!user || !levelId) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('attempts')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error fetching attempt data:", error);
        return;
      }

      if (data && data.attempts) {
        const levelAttempts = data.attempts[levelId] || 0;
        setAttempts(levelAttempts);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Start timer when question is displayed
  useEffect(() => {
    if (!currentQuestion) return;

    // Start the timer
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestion, questionIndex]);

  const startTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Reset time for this question
    setTimeRemaining(30);

    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up
          clearInterval(timerRef.current!);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeUp = () => {
    // If no option selected yet, treat as incorrect answer
    if (!selectedOption) {
      playSound("error", 0.4);
      toast.error("Time's up!", {
        description: "The mission has failed due to delayed response.",
      });
      handleMissionFailed();
    }
  };

  const handleMissionFailed = async () => {
    // Update attempts for this level
    if (user && levelId) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      try {
        // Get current attempts data
        const { data } = await supabase
          .from('profiles')
          .select('attempts')
          .eq('id', user.id)
          .single();

        const currentAttempts = data?.attempts || {};
        const updatedAttempts = {
          ...currentAttempts,
          [levelId]: newAttempts,
          total: Object.values({...currentAttempts, [levelId]: newAttempts})
            .reduce((sum: number, value: any) => sum + (typeof value === 'number' ? value : 0), 0)
        };

        // Update profile with new attempts data
        await supabase
          .from('profiles')
          .update({ attempts: updatedAttempts })
          .eq('id', user.id);

      } catch (error) {
        console.error("Error updating attempts:", error);
      }
    }

    // Redirect back to home after a short delay
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const updateTimeTaken = async () => {
    if (!user || !levelId) return;

    try {
      // Calculate time taken for this question (30 - remaining time)
      const questionTimeTaken = 30 - timeRemaining;
      
      // Add to total time taken
      const newTotalTime = totalTimeTaken + questionTimeTaken;
      setTotalTimeTaken(newTotalTime);
      
      // Get current time_taken data
      const { data } = await supabase
        .from('profiles')
        .select('time_taken')
        .eq('id', user.id)
        .single();

      const currentTimeTaken = data?.time_taken || {};
      
      // Update time taken for this specific level and total
      const updatedTimeTaken = {
        ...currentTimeTaken,
        [levelId]: newTotalTime,
        total: Object.values({...currentTimeTaken, [levelId]: newTotalTime})
          .reduce((sum: number, value: any) => sum + (typeof value === 'number' ? value : 0), 0)
      };

      // Update profile with new time data
      await supabase
        .from('profiles')
        .update({ time_taken: updatedTimeTaken })
        .eq('id', user.id);

    } catch (error) {
      console.error("Error updating time taken:", error);
    }
  };
  
  if (!level || !scenario) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Mission Not Found</h1>
          <p className="mb-6">The requested operation could not be located.</p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-military-red hover:bg-military-red/90"
          >
            Return to Command Center
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleOptionSelect = async (optionId: string) => {
    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    playSound("buttonClick", 0.3);
    setSelectedOption(optionId);
    
    // Check if correct
    const isAnswerCorrect = optionId === currentQuestion?.correctOptionId;
    setIsCorrect(isAnswerCorrect);
    
    // Update time taken regardless of correct/incorrect
    await updateTimeTaken();
    
    if (!isAnswerCorrect) {
      // Incorrect answer - mission failed
      playSound("error", 0.4);
      toast.error("Mission Failed!", {
        description: "Your tactical decision has compromised the operation.",
      });
      
      handleMissionFailed();
    } else {
      // Correct answer - show explanation
      setShowExplanation(true);
      playSound("success", 0.5);
      toast.success("Correct decision!", {
        description: "Your tactical choice was optimal.",
      });
    }
  };
  
  const handleNextQuestion = () => {
    playSound("buttonClick", 0.3);
    
    // Move to next question if available
    if (questionIndex < scenario.questions.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setCurrentQuestion(scenario.questions[nextIndex]);
      setSelectedOption(null);
      setShowExplanation(false);
      startTimer(); // Start timer for next question
    } else {
      // Mission complete - update user profile
      completeMission();
    }
  };

  const completeMission = async () => {
    playSound("success", 0.5);
    toast.success("Mission Complete!", {
      description: "You have successfully completed this operation.",
    });
    
    if (user && levelId) {
      try {
        // Get current completed levels
        const { data } = await supabase
          .from('profiles')
          .select('completed_levels, score')
          .eq('id', user.id)
          .single();
        
        if (data) {
          const { completed_levels, score } = data;
          
          // Add this level if not already completed
          let updatedLevels = [...(completed_levels || [])];
          if (!updatedLevels.includes(levelId)) {
            updatedLevels.push(levelId);
          }
          
          // Add points for completing level
          const newScore = (score || 0) + 100;
          
          // Update profile
          await supabase
            .from('profiles')
            .update({ 
              completed_levels: updatedLevels,
              score: newScore
            })
            .eq('id', user.id);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    
    // Navigate back to home after delay
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="mr-2"
            onClick={() => {
              playSound("buttonClick", 0.3);
              navigate("/");
            }}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{level.name}</h1>
        </div>
        
        <MilitaryCard variant="bordered" className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Flag className="h-5 w-5 text-military-red" />
            <h2 className="text-xl font-bold">{scenario.title}</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-muted-foreground">{scenario.description}</p>
          </div>
          
          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Mission Time: {Math.floor(scenario.timeLimit / 60)} minutes</span>
            </div>
            
            {attempts > 0 && (
              <div className="text-military-red flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span>Previous Attempts: {attempts}</span>
              </div>
            )}
          </div>
        </MilitaryCard>
        
        {currentQuestion && (
          <MilitaryCard 
            variant="timer" 
            className="mb-6"
            timeRemaining={timeRemaining}
            totalTime={30}
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">Scenario {questionIndex + 1} of {scenario.questions.length}</h3>
                <div className="flex items-center gap-2 text-xs bg-military-dark px-2 py-1 rounded">
                  <Clock className="h-3 w-3" />
                  <span>{timeRemaining}s remaining</span>
                </div>
              </div>
              
              <p className="text-lg mb-4">{currentQuestion.text}</p>
              
              <div className="space-y-3">
                {currentQuestion.options.map(option => (
                  <button
                    key={option.id}
                    className={`w-full p-3 border text-left transition-all ${
                      selectedOption === option.id
                        ? selectedOption === currentQuestion.correctOptionId
                          ? "bg-military-accent/20 border-military-accent"
                          : "bg-military-red/20 border-military-red"
                        : "bg-military-dark border-military-light hover:border-military-light/80"
                    } ${showExplanation || selectedOption ? "cursor-default" : "cursor-pointer"}`}
                    onClick={() => !selectedOption && handleOptionSelect(option.id)}
                    disabled={!!selectedOption}
                  >
                    <div className="font-medium">{option.text}</div>
                    {selectedOption === option.id && option.consequence && (
                      <div className="text-sm mt-1 text-muted-foreground">
                        Consequence: {option.consequence}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {showExplanation && (
              <div className={`p-4 mb-4 ${isCorrect ? "bg-military-accent/10" : "bg-military-red/10"}`}>
                <h4 className="font-bold mb-2">Analysis:</h4>
                <TerminalText
                  text={currentQuestion.explanation}
                  typingSpeed={15}
                />
              </div>
            )}
            
            {showExplanation && (
              <Button 
                className="w-full bg-military-red hover:bg-military-red/90"
                onClick={handleNextQuestion}
              >
                {questionIndex < scenario.questions.length - 1
                  ? "Next Scenario"
                  : "Complete Mission"}
              </Button>
            )}
          </MilitaryCard>
        )}
      </div>
    </Layout>
  );
};

export default LevelDetail;
