
import { GameLevel, GameScenario } from "../types";

export const GAME_LEVELS: GameLevel[] = [
  {
    id: "level-1",
    name: "Downing a Rafale Jet",
    description: "Intercept and neutralize an Indian Rafale aircraft violating Pakistani airspace using cyber warfare techniques.",
    difficulty: "easy",
    unlockLevel: 1,
    completed: false,
    image: "https://images.unsplash.com/photo-1543642178-7e34d5cccde5?q=80&w=1000"
  },
  {
    id: "level-2",
    name: "Overwhelming India's S-400 System",
    description: "Develop and execute strategies to overwhelm and bypass the sophisticated S-400 air defense system.",
    difficulty: "medium",
    unlockLevel: 2,
    completed: false,
    image: "https://images.unsplash.com/photo-1595264969333-9a885e2e8513?q=80&w=1000"
  },
  {
    id: "level-3",
    name: "Shutting down IAF Command Center",
    description: "Infiltrate and temporarily disable the Indian Air Force command center using advanced cyber techniques.",
    difficulty: "hard",
    unlockLevel: 3,
    completed: false,
    image: "https://images.unsplash.com/photo-1507712522505-a54be26995b2?q=80&w=1000"
  }
];

export const LEVEL_ONE_SCENARIO: GameScenario = {
  id: "scenario-1",
  levelId: "level-1",
  title: "Air Defense Alert",
  description: "Intelligence reports indicate an Indian Rafale jet has entered Pakistani airspace on a reconnaissance mission. As the cyber warfare specialist, your task is to intercept and neutralize the threat using digital means rather than conventional weapons.",
  questions: [
    {
      id: "q1-l1",
      text: "The Rafale jet is using an advanced communication system. What's your first action?",
      options: [
        {
          id: "q1-l1-opt1",
          text: "Jam all radio frequencies in the area",
          consequence: "This alerts the pilot and they take evasive action"
        },
        {
          id: "q1-l1-opt2",
          text: "Analyze the communication protocols to find vulnerabilities",
          consequence: "Gives you valuable intel but takes precious time"
        },
        {
          id: "q1-l1-opt3",
          text: "Deploy signal spoofing to send false coordinates",
          consequence: "You might redirect the jet to a safe interception zone"
        },
        {
          id: "q1-l1-opt4",
          text: "Hack into the jet's onboard systems directly",
          consequence: "Risky but could give complete control if successful"
        }
      ],
      correctOptionId: "q1-l1-opt3",
      explanation: "Signal spoofing is the optimal first response as it immediately affects the jet's navigation without alerting the pilot to your presence. This gives you time to prepare further actions."
    },
    {
      id: "q2-l1",
      text: "The Rafale pilot has detected something unusual. What's your next step?",
      options: [
        {
          id: "q2-l1-opt1",
          text: "Increase the intensity of your signal spoofing",
          consequence: "This might raise suspicions further"
        },
        {
          id: "q2-l1-opt2",
          text: "Switch to mimicking legitimate Indian air control communications",
          consequence: "This could convince the pilot everything is normal"
        },
        {
          id: "q2-l1-opt3",
          text: "Deploy electronic countermeasures to disable the jet's electronics",
          consequence: "Aggressive but effective if successful"
        },
        {
          id: "q2-l1-opt4",
          text: "Retreat and alert conventional air defenses",
          consequence: "Safe but mission failure"
        }
      ],
      correctOptionId: "q2-l1-opt2",
      explanation: "Mimicking legitimate communications maintains your covert operation while continuing to manipulate the situation. This approach is less likely to provoke an aggressive response from the pilot."
    }
  ],
  timeLimit: 300
};
