
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { GAME_LEVELS } from "@/data/gameLevels";
import TerminalText from "@/components/TerminalText";
import Radar from "@/components/Radar";
import LevelCard from "@/components/LevelCard";
import Scoreboard from "@/components/Scoreboard";
import { Button } from "@/components/ui/button";
import { playSound } from "@/utils/soundUtils";
import { Target, Trophy } from "lucide-react";

const Index = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [showingWelcome, setShowingWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Play startup sound when component mounts
    if (!isLoading && !isAuthenticated) {
      playSound("startup", 0.3);
    }
    
    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowingWelcome(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {isAuthenticated ? (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Welcome, Commander {user?.username}
                </h1>
                <p className="text-muted-foreground">
                  Current Status: Level {user?.level} Operative | Cyber Warfare Division
                </p>
              </div>
              
              <div className="hidden md:block">
                <Radar size={120} />
              </div>
            </div>
            
            <div className="mb-8">
              <TerminalText 
                text="MISSION BRIEFING: Select an available operation to deploy your cyber warfare capabilities against hostile targets."
                className="p-3 bg-military-dark border border-military-light text-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Target className="mr-2 h-5 w-5 text-military-red" />
                  Available Operations
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {GAME_LEVELS.map(level => (
                    <LevelCard
                      key={level.id}
                      level={level}
                      userLevel={user?.level || 1}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-military-red" />
                  Scoreboard
                </h2>
                <Scoreboard />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {showingWelcome ? (
              <div className="max-w-lg">
                <TerminalText
                  text="INITIALIZING SECURE CONNECTION..."
                  className="text-lg mb-2"
                  typingSpeed={50}
                />
                <TerminalText
                  text="ESTABLISHING ENCRYPTED CHANNEL TO PAKISTAN CYBER COMMAND..."
                  className="text-lg mb-2"
                  typingSpeed={50}
                  startDelay={1500}
                />
                <TerminalText
                  text="ACCESS GRANTED. WELCOME TO THE CYBER WAR SIMULATION."
                  className="text-lg mb-6"
                  typingSpeed={50}
                  startDelay={3500}
                />
              </div>
            ) : (
              <>
                <Radar size={150} className="mb-8" />
                <h1 className="text-4xl font-bold mb-4">Pak-India War Strategy Game</h1>
                <p className="text-xl mb-8 text-muted-foreground">
                  A cyber warfare simulation from Pakistan's perspective
                </p>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => {
                      playSound("buttonClick", 0.3);
                      navigate("/login");
                    }}
                    className="bg-military-light border border-military-red text-military-red hover:bg-military-red hover:text-white"
                    size="lg"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      playSound("buttonClick", 0.3);
                      navigate("/signup");
                    }}
                    className="bg-military-red text-white hover:bg-military-red/90"
                    size="lg"
                  >
                    Register
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
