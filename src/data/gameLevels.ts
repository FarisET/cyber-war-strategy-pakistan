import { GameLevel, GameScenario } from "../types";
import rafaleImage from '../utils/img/rafale.jpg';
import s400Image from '../utils/img/s400.webp';
import airBaseImage from '../utils/img/air-base.jpg'
const apt36Image = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000';
const powerGridImage = 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000';

export const GAME_LEVELS: GameLevel[] = [
  {
    id: "level-0",
    name: "APT36 Cyber Espionage",
    description: "Infiltrate Indian military networks using APT36 tactics to gather intelligence on their defense capabilities and operational plans.",
    difficulty: "easy",
    unlockLevel: 0,
    completed: false,
    image: apt36Image
  },
  {
    id: "level-1",
    name: "Counter Rafale Strike",
    description: "Use intelligence from APT36 operations to intercept and neutralize an incoming Indian Rafale aircraft using advanced cyber warfare techniques.",
    difficulty: "easy",
    unlockLevel: 1,
    completed: false,
    image: rafaleImage
  },
  {
    id: "level-2",
    name: "Neutralize S-400 Defense",
    description: "Execute coordinated cyber attacks to overwhelm and disable India's sophisticated S-400 air defense system, clearing the path for operations.",
    difficulty: "medium",
    unlockLevel: 2,
    completed: false,
    image: s400Image
  },
  {
    id: "level-3",
    name: "Power Grid Cyber Attack",
    description: "Launch a cyber-physical attack on India's critical power grid infrastructure to disrupt their military command and control capabilities.",
    difficulty: "hard",
    unlockLevel: 3,
    completed: false,
    image: powerGridImage
  },
  {
    id: "level-4",
    name: "Maya OS Infiltration",
    description: "Execute the final phase: hack into Indian Air Force's Maya OS command systems to completely shut down their airbase operations and secure cyber warfare victory.",
    difficulty: "expert",
    unlockLevel: 4,
    completed: false,
    image: airBaseImage
  }
];

export const LEVEL_ZERO_SCENARIO: GameScenario = {
  id: "scenario-0",
  levelId: "level-0",
  title: "APT36 Intelligence Operation",
  description: "As part of the elite APT36 cyber espionage group, your mission is to infiltrate Indian military networks and gather critical intelligence about their defense systems and operational plans. This intelligence will be crucial for subsequent cyber warfare operations.",
  questions: [
    {
      id: "q1-l0",
      text: "You've identified the Indian military's external network perimeter. What's your initial reconnaissance approach?",
      options: [
        {
          id: "q1-l0-opt1",
          text: "Conduct aggressive port scanning to map all services",
          consequence: "Fast but likely to trigger intrusion detection systems"
        },
        {
          id: "q1-l0-opt2",
          text: "Use passive OSINT gathering from social media and public sources",
          consequence: "Slow but completely undetectable and provides valuable context"
        },
        {
          id: "q1-l0-opt3",
          text: "Deploy automated vulnerability scanners",
          consequence: "Comprehensive but generates significant network traffic"
        },
        {
          id: "q1-l0-opt4",
          text: "Target individual personnel through social engineering",
          consequence: "Human element is unpredictable but often the weakest link"
        }
      ],
      correctOptionId: "q1-l0-opt2",
      explanation: "OSINT gathering is the foundation of APT36 operations. It provides context about targets, organizational structure, and potential attack vectors while remaining completely undetectable."
    },
    {
      id: "q2-l0",
      text: "Your OSINT reveals that Indian Air Force personnel frequently use a specific professional networking platform. How do you exploit this?",
      options: [
        {
          id: "q2-l0-opt1",
          text: "Create fake profiles to directly contact military personnel",
          consequence: "Direct but risky - profiles might be detected as suspicious"
        },
        {
          id: "q2-l0-opt2",
          text: "Monitor their posts for operational security failures",
          consequence: "Patient approach that often reveals critical information"
        },
        {
          id: "q2-l0-opt3",
          text: "Launch spear-phishing attacks through the platform",
          consequence: "Effective but platform has security measures"
        },
        {
          id: "q2-l0-opt4",
          text: "Analyze their connection networks to map organizational structure",
          consequence: "Provides strategic intelligence about command hierarchy"
        }
      ],
      correctOptionId: "q2-l0-opt2",
      explanation: "Monitoring for OPSEC failures is a classic APT36 technique. Military personnel often inadvertently reveal locations, schedules, and even operational details through social media."
    },
    {
      id: "q3-l0",
      text: "You've discovered that the Indian Air Force uses a cloud-based logistics management system. What's your infiltration strategy?",
      options: [
        {
          id: "q3-l0-opt1",
          text: "Exploit known vulnerabilities in the cloud platform",
          consequence: "Technical approach but vulnerabilities might be patched"
        },
        {
          id: "q3-l0-opt2",
          text: "Compromise a third-party vendor with system access",
          consequence: "Supply chain attack - highly effective APT36 technique"
        },
        {
          id: "q3-l0-opt3",
          text: "Attempt credential stuffing with leaked password databases",
          consequence: "Simple but often effective against poor password hygiene"
        },
        {
          id: "q3-l0-opt4",
          text: "Deploy watering hole attacks on defense contractor websites",
          consequence: "Sophisticated but requires significant preparation"
        }
      ],
      correctOptionId: "q3-l0-opt2",
      explanation: "Supply chain attacks through third-party vendors are a signature APT36 technique. These vendors often have trusted access but weaker security than the primary target."
    }
  ],
  timeLimit: 240
};

export const LEVEL_ONE_SCENARIO: GameScenario = {
  id: "scenario-1",
  levelId: "level-1",
  title: "Operation Counter-Strike",
  description: "Based on intelligence gathered by APT36, an Indian Rafale jet is approaching Pakistani airspace for a precision strike. Using the reconnaissance data and network access obtained in the previous operation, neutralize this threat through cyber means.",
  questions: [
    {
      id: "q1-l1",
      text: "APT36 intelligence reveals the Rafale's communication frequencies. How do you exploit this knowledge?",
      options: [
        {
          id: "q1-l1-opt1",
          text: "Jam all identified frequencies simultaneously",
          consequence: "Brute force approach that alerts the pilot immediately"
        },
        {
          id: "q1-l1-opt2",
          text: "Use frequency data to inject false navigation commands",
          consequence: "Leverages your intelligence advantage for precise manipulation"
        },
        {
          id: "q1-l1-opt3",
          text: "Monitor communications to predict the flight path",
          consequence: "Good for intelligence but doesn't neutralize the threat"
        },
        {
          id: "q1-l1-opt4",
          text: "Spoof ground control communications using known protocols",
          consequence: "Sophisticated but requires perfect timing and execution"
        }
      ],
      correctOptionId: "q1-l1-opt2",
      explanation: "Using APT36's intelligence to inject false navigation commands leverages your reconnaissance advantage. The pilot receives what appears to be legitimate navigation updates, redirecting the aircraft away from targets."
    },
    {
      id: "q2-l1",
      text: "The Rafale pilot is becoming suspicious of navigation anomalies. Your next move?",
      options: [
        {
          id: "q2-l1-opt1",
          text: "Escalate to electronic warfare jamming",
          consequence: "Aggressive but confirms cyber attack is in progress"
        },
        {
          id: "q2-l1-opt2",
          text: "Switch to mimicking legitimate Indian air traffic control",
          consequence: "Maintains cover while continuing the operation"
        },
        {
          id: "q2-l1-opt3",
          text: "Deploy the network access gained from APT36 to disable ground radar",
          consequence: "Uses previous intelligence but affects broader systems"
        },
        {
          id: "q2-l1-opt4",
          text: "Temporarily cease operations to avoid detection",
          consequence: "Safe but allows the mission to proceed unchallenged"
        }
      ],
      correctOptionId: "q2-l1-opt2",
      explanation: "Mimicking legitimate air traffic control maintains the deception while leveraging the communication protocols and authentication methods discovered during APT36 reconnaissance."
    }
  ],
  timeLimit: 300
};

export const LEVEL_TWO_SCENARIO: GameScenario = {
  id: "scenario-2",
  levelId: "level-2",
  title: "S-400 System Neutralization",
  description: "With initial threats neutralized, India has activated their advanced S-400 air defense systems along the border. Using network access and system knowledge gained from previous operations, execute a coordinated cyber attack to disable their defensive capabilities.",
  questions: [
    {
      id: "q1-l2",
      text: "Your APT36 reconnaissance identified the S-400's network architecture. How do you exploit this intelligence?",
      options: [
        {
          id: "q1-l2-opt1",
          text: "Target the central command node identified in reconnaissance",
          consequence: "High-value target but heavily defended"
        },
        {
          id: "q1-l2-opt2",
          text: "Exploit the third-party maintenance network compromised earlier",
          consequence: "Uses existing access from APT36 operations for lateral movement"
        },
        {
          id: "q1-l2-opt3",
          text: "Deploy malware through the logistics system already penetrated",
          consequence: "Leverages supply chain access but may be detected"
        },
        {
          id: "q1-l2-opt4",
          text: "Coordinate simultaneous attacks on multiple radar sites",
          consequence: "Distributed approach but resource intensive"
        }
      ],
      correctOptionId: "q1-l2-opt2",
      explanation: "The maintenance network compromised during APT36 operations provides trusted access to S-400 systems while avoiding primary security layers focused on external threats."
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
  title: "Power Grid Disruption",
  description: "With air defenses compromised, execute a cyber-physical attack on India's power grid infrastructure. Target critical substations and control systems to disrupt military command centers and communication networks across the region.",
  questions: [
    {
      id: "q1-l3",
      text: "Your APT36 intelligence identified critical power grid control systems. What's your attack vector?",
      options: [
        {
          id: "q1-l3-opt1",
          text: "Target SCADA systems controlling major substations",
          consequence: "Direct impact but SCADA systems have specialized security"
        },
        {
          id: "q1-l3-opt2",
          text: "Exploit smart grid communication protocols",
          consequence: "Modern approach leveraging IoT vulnerabilities"
        },
        {
          id: "q1-l3-opt3",
          text: "Compromise energy management software used by operators",
          consequence: "Human interface attack that's harder to detect"
        },
        {
          id: "q1-l3-opt4",
          text: "Target backup power systems at military installations",
          consequence: "Focused military impact but limited scope"
        }
      ],
      correctOptionId: "q1-l3-opt3",
      explanation: "Compromising operator interfaces allows you to manipulate power distribution while appearing as legitimate operator actions, making detection and response much more difficult."
    },
    {
      id: "q2-l3",
      text: "You've successfully infiltrated the grid control systems. How do you maximize military impact?",
      options: [
        {
          id: "q2-l3-opt1",
          text: "Cause rolling blackouts across military installations",
          consequence: "Visible impact but may trigger emergency protocols"
        },
        {
          id: "q2-l3-opt2",
          text: "Subtly degrade power quality to damage sensitive equipment",
          consequence: "Long-term damage that's harder to trace to cyber attack"
        },
        {
          id: "q2-l3-opt3",
          text: "Target communication tower power supplies specifically",
          consequence: "Disrupts military communications while sparing civilian infrastructure"
        },
        {
          id: "q2-l3-opt4",
          text: "Overload transformers at key military airbases",
          consequence: "Focused impact on air operations but permanent damage"
        }
      ],
      correctOptionId: "q2-l3-opt3",
      explanation: "Targeting communication infrastructure power supplies disrupts military coordination and command capabilities while minimizing civilian impact and international criticism."
    },
    {
      id: "q3-l3",
      text: "Grid operators are responding to power anomalies. How do you maintain your attack while avoiding detection?",
      options: [
        {
          id: "q3-l3-opt1",
          text: "Simulate equipment failures to explain the disruptions",
          consequence: "Misdirects investigation but requires detailed system knowledge"
        },
        {
          id: "q3-l3-opt2",
          text: "Trigger multiple false alarms to overwhelm response teams",
          consequence: "Creates chaos but may lead to manual overrides"
        },
        {
          id: "q3-l3-opt3",
          text: "Use your access to hide evidence of the cyber attack",
          consequence: "Covers tracks but reduces ongoing operational impact"
        },
        {
          id: "q3-l3-opt4",
          text: "Coordinate power failures with physical infrastructure attacks",
          consequence: "Maximum confusion but escalates beyond cyber domain"
        }
      ],
      correctOptionId: "q3-l3-opt1",
      explanation: "Simulating equipment failures leverages your APT36 intelligence about system operations to make the attack appear as natural infrastructure problems rather than cyber warfare."
    }
  ],
  timeLimit: 540
};

export const LEVEL_FOUR_SCENARIO: GameScenario = {
  id: "scenario-4",
  levelId: "level-4",
  title: "Maya OS Final Assault",
  description: "Execute the final phase of the cyber warfare campaign. Infiltrate and completely shut down the Indian Air Force's Maya OS command systems, their indigenous operating system that controls airbase operations. Complete system shutdown will ensure total cyber warfare victory.",
  questions: [
    {
      id: "q1-l4",
      text: "Maya OS is India's most protected system. Using all previous intelligence, how do you approach this final target?",
      options: [
        {
          id: "q1-l4-opt1",
          text: "Exploit zero-day vulnerabilities discovered during APT36 operations",
          consequence: "Sophisticated but burns valuable zero-days"
        },
        {
          id: "q1-l4-opt2",
          text: "Use compromised vendor credentials from supply chain attacks",
          consequence: "Leverages existing access but vendor access may be limited"
        },
        {
          id: "q1-l4-opt3",
          text: "Combine all previous access points for coordinated multi-vector attack",
          consequence: "Maximum effectiveness using entire operation's intelligence"
        },
        {
          id: "q1-l4-opt4",
          text: "Target Maya OS update servers to deploy malicious patches",
          consequence: "Long-term persistence but slow initial impact"
        }
      ],
      correctOptionId: "q1-l4-opt3",
      explanation: "The culmination of your cyber warfare campaign requires leveraging all intelligence and access gained from APT36 espionage through the power grid operations for maximum impact."
    },
    {
      id: "q2-l4",
      text: "You're inside Maya OS infrastructure. What's your primary target for maximum airbase shutdown?",
      options: [
        {
          id: "q2-l4-opt1",
          text: "Flight control and air traffic management systems",
          consequence: "Grounds all aircraft but has multiple backup systems"
        },
        {
          id: "q2-l4-opt2",
          text: "Fuel management and logistics coordination systems",
          consequence: "Prevents operations but slower impact timeline"
        },
        {
          id: "q2-l4-opt3",
          text: "Maintenance scheduling and aircraft readiness systems",
          consequence: "Long-term impact but doesn't stop immediate operations"
        },
        {
          id: "q2-l4-opt4",
          text: "Central command authentication and access control",
          consequence: "Locks out operators from all systems simultaneously"
        }
      ],
      correctOptionId: "q2-l4-opt4",
      explanation: "Targeting the central authentication system creates immediate widespread system lockout, preventing operators from accessing any Maya OS functions across the entire airbase."
    },
    {
      id: "q3-l4",
      text: "Maya OS security is activating emergency protocols. How do you ensure complete system shutdown?",
      options: [
        {
          id: "q3-l4-opt1",
          text: "Deploy logic bombs throughout the system infrastructure",
          consequence: "Ensures continued disruption but leaves clear evidence"
        },
        {
          id: "q3-l4-opt2",
          text: "Corrupt critical system databases beyond recovery",
          consequence: "Permanent damage but may violate cyber warfare conventions"
        },
        {
          id: "q3-l4-opt3",
          text: "Lock administrators out while maintaining system degradation",
          consequence: "Achieves mission objectives while allowing eventual recovery"
        },
        {
          id: "q3-l4-opt4",
          text: "Trigger system-wide shutdown and prevent restart sequences",
          consequence: "Clean shutdown that demonstrates total control"
        }
      ],
      correctOptionId: "q3-l4-opt4",
      explanation: "A controlled system-wide shutdown demonstrates complete mastery of their most critical systems while achieving total cyber warfare victory without causing permanent damage."
    },
    {
      id: "q4-l4",
      text: "Final phase: Indian cyber defense teams are attempting emergency restoration. How do you secure total victory?",
      options: [
        {
          id: "q4-l4-opt1",
          text: "Maintain system lockout until they acknowledge defeat",
          consequence: "Clear victory demonstration but may escalate conflict"
        },
        {
          id: "q4-l4-opt2",
          text: "Plant evidence of your complete system penetration capabilities",
          consequence: "Psychological victory that deters future aggression"
        },
        {
          id: "q4-l4-opt3",
          text: "Execute coordinated shutdown of all systems compromised in the campaign",
          consequence: "Demonstrates the full scope of your cyber warfare capabilities"
        },
        {
          id: "q4-l4-opt4",
          text: "Withdraw gracefully while leaving monitoring capabilities",
          consequence: "Maintains future operational advantage"
        }
      ],
      correctOptionId: "q4-l4-opt3",
      explanation: "Coordinated shutdown of all systems from APT36 reconnaissance to Maya OS demonstrates the complete cyber warfare kill chain, achieving total strategic victory."
    }
  ],
  timeLimit: 720
};

export const getScenarioByLevelId = (levelId: string): GameScenario | null => {
  switch (levelId) {
    case "level-0":
      return LEVEL_ZERO_SCENARIO;
    case "level-1":
      return LEVEL_ONE_SCENARIO;
    case "level-2":
      return LEVEL_TWO_SCENARIO;
    case "level-3":
      return LEVEL_THREE_SCENARIO;
    case "level-4":
      return LEVEL_FOUR_SCENARIO;
    default:
      return null;
  }
};
