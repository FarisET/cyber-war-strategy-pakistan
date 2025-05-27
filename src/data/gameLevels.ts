
import { GameLevel, GameScenario } from "../types";
import rafaleImage from '../utils/img/rafale.jpg';
import s400Image from '../utils/img/s400.webp';
import airBaseImage from '../utils/img/air-base.jpg'

export const GAME_LEVELS: GameLevel[] = [
  {
    id: "level-1",
    name: "Downing a Rafale Jet",
    description: "Intercept and neutralize an Indian Rafale aircraft violating Pakistani airspace using cyber warfare techniques.",
    difficulty: "easy",
    unlockLevel: 1,
    completed: false,
    image: rafaleImage
  },
  {
    id: "level-2",
    name: "Overwhelming India's S-400 System",
    description: "Develop and execute strategies to overwhelm and bypass the sophisticated S-400 air defense system.",
    difficulty: "medium",
    unlockLevel: 2,
    completed: false,
    image: s400Image
  },
  {
    id: "level-3",
    name: "Shutting down IAF Command Center",
    description: "Infiltrate and temporarily disable the Indian Air Force command center using advanced cyber techniques.",
    difficulty: "hard",
    unlockLevel: 3,
    completed: false,
    image: airBaseImage
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

export const LEVEL_TWO_SCENARIO: GameScenario = {
  id: "scenario-2",
  levelId: "level-2",
  title: "S-400 System Breach",
  description: "The Indian military has deployed their advanced S-400 air defense system near the border. Your mission is to create vulnerabilities in their defense network through sophisticated cyber attacks, allowing Pakistani air assets to operate freely in the region.",
  questions: [
    {
      id: "q1-l2",
      text: "Initial reconnaissance reveals the S-400 system's network architecture. How do you begin your attack?",
      options: [
        {
          id: "q1-l2-opt1",
          text: "Launch a direct DDoS attack on their primary radar systems",
          consequence: "Brute force approach that will be quickly detected and countered"
        },
        {
          id: "q1-l2-opt2",
          text: "Infiltrate their communication protocols using social engineering",
          consequence: "Takes time but provides deeper access to their systems"
        },
        {
          id: "q1-l2-opt3",
          text: "Deploy advanced persistent threats (APT) into their maintenance networks",
          consequence: "Long-term access but slow to take effect"
        },
        {
          id: "q1-l2-opt4",
          text: "Use electromagnetic pulse simulation to test their hardening",
          consequence: "Reveals vulnerabilities but may trigger their defensive protocols"
        }
      ],
      correctOptionId: "q1-l2-opt2",
      explanation: "Social engineering provides the best balance of stealth and effectiveness, allowing you to gain legitimate credentials and access without triggering automated defenses."
    },
    {
      id: "q2-l2",
      text: "You've gained access to their maintenance network. Multiple S-400 batteries are online. What's your strategy?",
      options: [
        {
          id: "q2-l2-opt1",
          text: "Simultaneously target all radar components to create complete blackout",
          consequence: "Maximum disruption but high risk of detection"
        },
        {
          id: "q2-l2-opt2",
          text: "Subtly alter their target identification algorithms",
          consequence: "Makes them see friendly aircraft as threats"
        },
        {
          id: "q2-l2-opt3",
          text: "Inject false radar signatures to overwhelm their processing capacity",
          consequence: "Creates confusion and reduces their response effectiveness"
        },
        {
          id: "q2-l2-opt4",
          text: "Focus on disrupting their communication between batteries",
          consequence: "Prevents coordinated defense but individual units remain active"
        }
      ],
      correctOptionId: "q2-l2-opt3",
      explanation: "Overwhelming their processing capacity with false signatures creates maximum confusion while appearing like natural interference, making it harder to trace back to cyber attack."
    },
    {
      id: "q3-l2",
      text: "The S-400 operators are becoming suspicious of system anomalies. How do you maintain your attack?",
      options: [
        {
          id: "q3-l2-opt1",
          text: "Escalate the attack before they can respond",
          consequence: "Risk of complete exposure and system lockdown"
        },
        {
          id: "q3-l2-opt2",
          text: "Switch to mimicking hardware malfunctions",
          consequence: "Diverts suspicion from cyber attack to technical issues"
        },
        {
          id: "q3-l2-opt3",
          text: "Temporarily reduce attack intensity to avoid detection",
          consequence: "Maintains access but reduces effectiveness"
        },
        {
          id: "q3-l2-opt4",
          text: "Redirect their attention to false cyber threats from other sources",
          consequence: "Complex but could completely misdirect their response"
        }
      ],
      correctOptionId: "q3-l2-opt2",
      explanation: "Mimicking hardware malfunctions is the most effective way to maintain your attack while avoiding cyber security protocols, as technical teams will focus on hardware diagnostics."
    }
  ],
  timeLimit: 450
};

export const LEVEL_THREE_SCENARIO: GameScenario = {
  id: "scenario-3",
  levelId: "level-3",
  title: "IAF Command Center Infiltration",
  description: "Intelligence indicates that the Indian Air Force is planning a major operation. Your objective is to infiltrate their central command center's networks and temporarily disable their coordination capabilities to protect Pakistani interests. This is the most complex cyber operation requiring multiple attack vectors.",
  questions: [
    {
      id: "q1-l3",
      text: "The IAF command center has multiple layers of security. Which entry point offers the best chance of success?",
      options: [
        {
          id: "q1-l3-opt1",
          text: "Target the civilian internet infrastructure they rely on",
          consequence: "Broad impact but may affect non-military targets"
        },
        {
          id: "q1-l3-opt2",
          text: "Exploit vulnerabilities in their satellite communication links",
          consequence: "High-value target but extremely well protected"
        },
        {
          id: "q1-l3-opt3",
          text: "Infiltrate through their logistics and supply chain management systems",
          consequence: "Indirect access but often has weaker security protocols"
        },
        {
          id: "q1-l3-opt4",
          text: "Use quantum-resistant encryption breaking techniques on their classified networks",
          consequence: "Cutting-edge approach but resource intensive"
        }
      ],
      correctOptionId: "q1-l3-opt3",
      explanation: "Supply chain systems often have weaker security but maintain connections to critical operational networks, providing an ideal backdoor for escalating access privileges."
    },
    {
      id: "q2-l3",
      text: "You've established a foothold in their logistics network. The command center uses AI-assisted threat detection. How do you avoid detection?",
      options: [
        {
          id: "q2-l3-opt1",
          text: "Use machine learning to mimic legitimate user behavior patterns",
          consequence: "Sophisticated but requires extensive data analysis"
        },
        {
          id: "q2-l3-opt2",
          text: "Operate only during high-traffic periods to blend in",
          consequence: "Reduces detection risk but limits operational windows"
        },
        {
          id: "q2-l3-opt3",
          text: "Deploy counter-AI techniques to confuse their detection algorithms",
          consequence: "Advanced approach but may trigger manual review"
        },
        {
          id: "q2-l3-opt4",
          text: "Use legitimate admin credentials acquired through social engineering",
          consequence: "Most natural approach but requires perfect impersonation"
        }
      ],
      correctOptionId: "q2-l3-opt1",
      explanation: "Machine learning-based mimicry is the most effective against AI detection systems, as it creates patterns that appear completely legitimate to automated analysis."
    },
    {
      id: "q3-l3",
      text: "You're now inside the command center's operational network. Multiple critical systems are accessible. What's your primary target?",
      options: [
        {
          id: "q3-l3-opt1",
          text: "The real-time battle management system",
          consequence: "Disrupts immediate operations but has strong failsafes"
        },
        {
          id: "q3-l3-opt2",
          text: "Communication relay systems connecting field units",
          consequence: "Breaks coordination between command and field operations"
        },
        {
          id: "q3-l3-opt3",
          text: "Intelligence data processing and analysis centers",
          consequence: "Blinds their strategic awareness but may not stop ongoing operations"
        },
        {
          id: "q3-l3-opt4",
          text: "Pilot scheduling and aircraft assignment systems",
          consequence: "Creates confusion and delays but doesn't disable capabilities"
        }
      ],
      correctOptionId: "q3-l3-opt2",
      explanation: "Communication relay systems are the nerve center of military operations. Disrupting these creates immediate operational paralysis across all connected units."
    },
    {
      id: "q4-l3",
      text: "Your attack is succeeding but you detect incoming cyber security response teams. How do you complete your mission?",
      options: [
        {
          id: "q4-l3-opt1",
          text: "Deploy logic bombs to activate after you've withdrawn",
          consequence: "Ensures continued disruption but leaves evidence of attack"
        },
        {
          id: "q4-l3-opt2",
          text: "Quickly extract all available intelligence before retreating",
          consequence: "Gains valuable information but may incomplete primary mission"
        },
        {
          id: "q4-l3-opt3",
          text: "Create false evidence pointing to other threat actors",
          consequence: "Misdirects investigation but requires additional time"
        },
        {
          id: "q4-l3-opt4",
          text: "Execute a coordinated shutdown of all compromised systems simultaneously",
          consequence: "Maximum immediate impact but burns all access points"
        }
      ],
      correctOptionId: "q4-l3-opt4",
      explanation: "A coordinated simultaneous shutdown achieves maximum operational disruption while ensuring the mission is completed before counter-measures can be fully deployed."
    }
  ],
  timeLimit: 600
};

export const getScenarioByLevelId = (levelId: string): GameScenario | null => {
  switch (levelId) {
    case "level-1":
      return LEVEL_ONE_SCENARIO;
    case "level-2":
      return LEVEL_TWO_SCENARIO;
    case "level-3":
      return LEVEL_THREE_SCENARIO;
    default:
      return null;
  }
};
