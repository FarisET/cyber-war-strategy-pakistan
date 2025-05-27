
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getScenarioByLevelId } from "@/data/gameLevels";
import { GameQuestion, GameQuestionOption } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";
import { playSound } from "@/utils/soundUtils";

const LevelDetail = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateProgress, isLevelUnlocked } = useProgress();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [answers, setAnswers] = useState<{ questionId: string; selectedOptionId: string; correct: boolean }[]>([]);

  const scenario = levelId ? getScenarioByLevelId(levelId) : null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (levelId && !isLevelUnlocked(levelId)) {
      toast.error("Level locked", {
        description: "Complete previous levels to unlock this mission."
      });
      navigate("/");
      return;
    }

    if (scenario) {
      setTimeLeft(scenario.timeLimit);
    }
  }, [levelId, scenario, user, navigate, isLevelUnlocked]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0 && !gameCompleted) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStarted && !gameCompleted) {
      handleGameEnd();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameCompleted]);

  const handleStartGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
    playSound("startup", 0.5);
  };

  const handleOptionSelect = (optionId: string) => {
    if (!isAnswered) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !scenario) return;

    const currentQuestion = scenario.questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctOptionId;
    
    setIsAnswered(true);
    
    if (isCorrect) {
      setScore(score + 1);
      playSound("success", 0.5);
    } else {
      playSound("error", 0.5);
    }

    const newAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: selectedOption,
      correct: isCorrect
    };
    
    setAnswers([...answers, newAnswer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < scenario!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setIsAnswered(false);
    } else {
      handleGameEnd();
    }
  };

  const handleGameEnd = async () => {
    setGameCompleted(true);
    playSound("success", 0.7);
    
    const endTime = Date.now();
    const totalTime = Math.floor((endTime - startTime) / 1000);
    const completed = score >= Math.ceil(scenario!.questions.length * 0.6); // 60% to pass
    
    if (levelId) {
      await updateProgress(levelId, totalTime, completed);
    }
    
    if (completed) {
      toast.success("Mission Complete!", {
        description: `Excellent work, Commander! Score: ${score}/${scenario!.questions.length}`
      });
    } else {
      toast.error("Mission Failed", {
        description: `Score: ${score}/${scenario!.questions.length}. Try again to improve!`
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!scenario) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Mission Not Found</h1>
          <Button onClick={() => navigate("/")} className="bg-military-red">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Command Center
          </Button>
        </div>
      </Layout>
    );
  }

  const currentQuestion = scenario.questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + (isAnswered ? 1 : 0)) / scenario.questions.length) * 100;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="border-military-red text-military-red hover:bg-military-red hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Command Center
          </Button>
          
          {gameStarted && !gameCompleted && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-military-red" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-military-red" />
                <span>Score: {score}/{scenario.questions.length}</span>
              </div>
            </div>
          )}
        </div>

        <Card className="mb-6 bg-military border-military-light">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              {scenario.title}
              <Badge variant="outline" className="ml-auto">
                Level {levelId?.split('-')[1]}
              </Badge>
            </CardTitle>
            <CardDescription className="text-base">
              {scenario.description}
            </CardDescription>
          </CardHeader>
        </Card>

        {!gameStarted ? (
          <Card className="bg-military border-military-light">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Mission Briefing</h3>
              <p className="text-muted-foreground mb-6">
                You have {formatTime(scenario.timeLimit)} to complete {scenario.questions.length} critical decisions.
                Answer at least 60% correctly to complete the mission successfully.
              </p>
              <Button 
                onClick={handleStartGame}
                className="bg-military-red hover:bg-military-red/90"
                size="lg"
              >
                Begin Mission
              </Button>
            </CardContent>
          </Card>
        ) : gameCompleted ? (
          <Card className="bg-military border-military-light">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                {score >= Math.ceil(scenario.questions.length * 0.6) ? (
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {score >= Math.ceil(scenario.questions.length * 0.6) ? "Mission Complete!" : "Mission Failed"}
              </h3>
              <p className="text-muted-foreground mb-6">
                Final Score: {score}/{scenario.questions.length} ({Math.round((score / scenario.questions.length) * 100)}%)
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-military-red hover:bg-military-red/90"
                >
                  Retry Mission
                </Button>
                <Button 
                  onClick={() => navigate("/scoreboard")}
                  variant="outline"
                  className="border-military-red text-military-red hover:bg-military-red hover:text-white"
                >
                  View Scoreboard
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {currentQuestionIndex + 1} of {scenario.questions.length}</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <Card className="bg-military border-military-light">
              <CardHeader>
                <CardTitle className="text-lg">{currentQuestion.text}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuestion.options.map((option: GameQuestionOption) => (
                    <div
                      key={option.id}
                      className={cn(
                        "p-4 rounded-lg border cursor-pointer transition-all",
                        selectedOption === option.id
                          ? "border-military-red bg-military-red/10"
                          : "border-military-light hover:border-military-red/50",
                        isAnswered && "cursor-not-allowed"
                      )}
                      onClick={() => handleOptionSelect(option.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 mt-0.5",
                          selectedOption === option.id
                            ? "border-military-red bg-military-red"
                            : "border-military-light"
                        )} />
                        <div className="flex-1">
                          <p className="font-medium">{option.text}</p>
                          {option.consequence && isAnswered && selectedOption === option.id && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Consequence: {option.consequence}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {isAnswered && (
                  <div className="mt-6 p-4 bg-military-dark rounded-lg">
                    <h4 className="font-semibold mb-2">Explanation:</h4>
                    <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  {!isAnswered ? (
                    <Button 
                      onClick={handleSubmitAnswer}
                      disabled={!selectedOption}
                      className="bg-military-red hover:bg-military-red/90"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextQuestion}
                      className="bg-military-red hover:bg-military-red/90"
                    >
                      {currentQuestionIndex < scenario.questions.length - 1 ? "Next Question" : "Complete Mission"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default LevelDetail;
