
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import MilitaryCard from "@/components/MilitaryCard";
import { GAME_LEVELS } from "@/data/gameLevels";
import { LEVEL_ONE_SCENARIO } from "@/data/gameLevels";
import { Button } from "@/components/ui/button";
import { playSound } from "@/utils/soundUtils";
import { ArrowLeft, Flag, Clock } from "lucide-react";
import { GameQuestion } from "@/types";
import { toast } from "sonner";
import TerminalText from "@/components/TerminalText";

const LevelDetail = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const level = GAME_LEVELS.find(level => level.id === levelId);
  const scenario = LEVEL_ONE_SCENARIO; // We're using level one scenario for now
  
  useEffect(() => {
    // Reset state when level changes
    setQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    
    // Set first question
    if (scenario && scenario.questions.length > 0) {
      setCurrentQuestion(scenario.questions[0]);
    }
    
    // Play sound effect
    playSound("startup", 0.3);
  }, [levelId, scenario]);
  
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
  
  const handleOptionSelect = (optionId: string) => {
    playSound("buttonClick", 0.3);
    setSelectedOption(optionId);
    
    // Check if correct
    const isAnswerCorrect = optionId === currentQuestion?.correctOptionId;
    setIsCorrect(isAnswerCorrect);
    
    // Show explanation
    setShowExplanation(true);
    
    // Show toast for feedback
    if (isAnswerCorrect) {
      playSound("success", 0.5);
      toast.success("Correct decision!", {
        description: "Your tactical choice was optimal.",
      });
    } else {
      playSound("error", 0.4);
      toast.error("Tactical error!", {
        description: "This decision may compromise the mission.",
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
    } else {
      // Mission complete
      playSound("success", 0.5);
      toast.success("Mission Complete!", {
        description: "You have successfully completed this operation.",
      });
      
      // Navigate back to home after delay
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
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
          
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Mission Time: {Math.floor(scenario.timeLimit / 60)} minutes</span>
          </div>
        </MilitaryCard>
        
        {currentQuestion && (
          <MilitaryCard className="mb-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">Scenario {questionIndex + 1} of {scenario.questions.length}</h3>
                <span className="text-xs bg-military-dark px-2 py-1 rounded">
                  Decision Point
                </span>
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
                    } ${showExplanation ? "cursor-default" : "cursor-pointer"}`}
                    onClick={() => !showExplanation && handleOptionSelect(option.id)}
                    disabled={showExplanation}
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
