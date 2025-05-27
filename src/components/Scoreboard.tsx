
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Medal, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import MilitaryCard from "./MilitaryCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface LeaderboardUser {
  id: string;
  username: string;
  rank: string;
  avatar: string;
  completed_levels: string[];
  levels_completed: number;
  attempts: Record<string, number>;
  time_taken: Record<string, number>;
  score: number;
  last_login: string;
}

const Scoreboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        // Use the function we created instead of the view
        const { data, error } = await supabase.rpc('get_leaderboard');

        if (error) {
          console.error("Error fetching leaderboard:", error);
          return;
        }

        console.log("Leaderboard data:", data);
        setLeaderboardData(data as LeaderboardUser[]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const formatTime = (seconds: number) => {
    if (!seconds) return "N/A";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <MilitaryCard variant="bordered" className="overflow-hidden">
      <div className="flex items-center gap-2 mb-4 p-2 bg-military-dark">
        <Medal className="h-5 w-5 text-military-red" />
        <h2 className="text-lg font-bold">Cyber Command Scoreboard</h2>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">Loading scoreboard data...</div>
      ) : leaderboardData.length === 0 ? (
        <div className="text-center py-10">No scoreboard data available yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-military">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead>Operative</TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Target className="h-4 w-4" />
                    <span>Levels</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">Attempts</TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Time</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((player, index) => (
                <TableRow 
                  key={player.id}
                  className={cn(
                    player.id === user?.id && "bg-military-accent/10",
                    "hover:bg-military-light/50"
                  )}
                >
                  <TableCell className="text-center font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-military-dark overflow-hidden">
                      {player.avatar && (
                        <img 
                          src={player.avatar} 
                          alt={player.username} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{player.username}</div>
                      <div className="text-xs text-muted-foreground">{player.rank}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {player.levels_completed || 0}
                  </TableCell>
                  <TableCell className="text-center">
                    {player.attempts && player.attempts.total
                      ? player.attempts.total
                      : 0}
                  </TableCell>
                  <TableCell className="text-center">
                    {player.time_taken && player.time_taken.total
                      ? formatTime(player.time_taken.total)
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </MilitaryCard>
  );
};

export default Scoreboard;
