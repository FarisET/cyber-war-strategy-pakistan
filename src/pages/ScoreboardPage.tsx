
import Layout from "@/components/Layout";
import Scoreboard from "@/components/Scoreboard";
import { Trophy, Target } from "lucide-react";
import MilitaryCard from "@/components/MilitaryCard";

const ScoreboardPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="h-8 w-8 text-military-red" />
          <h1 className="text-3xl font-bold tracking-tight">
            Cyber Command Leaderboard
          </h1>
        </div>
        
        <MilitaryCard variant="bordered" className="mb-6 p-4">
          <div className="text-center">
            <Target className="h-12 w-12 text-military-red mx-auto mb-3" />
            <h2 className="text-lg font-bold mb-2">Ranking System</h2>
            <p className="text-muted-foreground">
              Operatives are ranked by levels completed, then by fastest completion time. 
              Complete more levels and beat your best times to climb the ranks!
            </p>
          </div>
        </MilitaryCard>

        <Scoreboard />
      </div>
    </Layout>
  );
};

export default ScoreboardPage;
