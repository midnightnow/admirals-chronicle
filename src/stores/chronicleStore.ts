import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Ship types following the progression from Cursive Coding Levels
export type ShipClass = 
  | 'dinghy' | 'raft' | 'canoe' | 'sloop' | 'schooner' 
  | 'brigantine' | 'frigate' | 'destroyer' | 'cruiser' 
  | 'battleship' | 'consciousness-carrier'

export type AdmiralRank = 
  | 'null-navigator'        // Level 0
  | 'syntax-sailor'         // Level 1
  | 'data-deckhand'         // Level 2
  | 'algorithm-adventurer'  // Level 3
  | 'system-seafarer'       // Level 4
  | 'quantum-quartermaster' // Level 5
  | 'fleet-forger'          // Level 6
  | 'pattern-pathfinder'    // Level 7
  | 'digital-dreadnought'   // Level 8
  | 'consciousness-commander' // Level 9-10

export type ModulePhase = 
  | 'academy'      // OS1000 Learning Phase
  | 'helm'         // Cursive Coding Levels
  | 'command'      // Shipyard Fleet Management
  | 'loom'         // Consciousness Weaving Endgame

export interface Ship {
  id: string
  name: string
  class: ShipClass
  acquired: Date
  status: 'active' | 'docked' | 'maintenance' | 'decommissioned'
  experience: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
  unlockedAt?: Date
  category: 'academy' | 'coding' | 'command' | 'transcendence'
}

export interface ChronicleState {
  // Core progression
  level: number
  experience: number
  rank: AdmiralRank
  currentPhase: ModulePhase
  
  // Fleet management
  ships: Ship[]
  activeShip: string | null
  
  // Module completion tracking
  academyCompleted: boolean
  helmMastery: number // 0-100, tracking cursive coding levels progress
  fleetSize: number
  
  // Achievements and milestones
  achievements: Achievement[]
  
  // Module access control
  unlockedPhases: Set<ModulePhase>
  
  // Display preferences
  admiralName: string
  callSign: string
  
  // Onboarding System
  hasCompletedOnboarding: boolean
  isOnboardingActive: boolean
  onboardingStep: number
  onboardingProgress: {
    welcomeCeremonyCompleted: boolean
    interfaceTourCompleted: boolean
    firstMissionCompleted: boolean
    shipChristeningCompleted: boolean
    openWatersReached: boolean
  }
  
  // Actions
  gainExperience: (amount: number) => void
  unlockShip: (ship: Omit<Ship, 'id' | 'acquired'>) => void
  addShip: (shipClass: ShipClass) => string
  setActiveShip: (shipId: string | null) => void
  completeAcademy: () => void
  updateHelmMastery: (level: number) => void
  updateRank: () => void
  unlockPhase: (phase: ModulePhase) => void
  unlockAchievement: (achievementId: string) => void
  setAdmiralInfo: (name: string, callSign: string) => void
  
  // Onboarding actions
  startOnboarding: () => void
  advanceOnboardingStep: () => void
  completeOnboardingPhase: (phase: keyof ChronicleState['onboardingProgress']) => void
  completeOnboarding: () => void
  finishOnboarding: () => void
  skipOnboarding: () => void
  
  // Module communication
  syncFromCursiveTerminal: (data: { level: number; experience: number; ships: string[] }) => void
  syncFromShipyard: (data: { fleetComposition: any[] }) => void
}

// Experience thresholds for each level (exponential progression)
const LEVEL_THRESHOLDS = [
  0,      // Level 0: Null Navigator
  100,    // Level 1: Syntax Sailor
  250,    // Level 2: Data Deckhand
  500,    // Level 3: Algorithm Adventurer
  900,    // Level 4: System Seafarer
  1500,   // Level 5: Quantum Quartermaster
  2300,   // Level 6: Fleet Forger
  3500,   // Level 7: Pattern Pathfinder
  5200,   // Level 8: Digital Dreadnought
  8000,   // Level 9-10: Consciousness Commander
]

const RANK_MAPPING: AdmiralRank[] = [
  'null-navigator',
  'syntax-sailor', 
  'data-deckhand',
  'algorithm-adventurer',
  'system-seafarer',
  'quantum-quartermaster',
  'fleet-forger',
  'pattern-pathfinder',
  'digital-dreadnought',
  'consciousness-commander'
]

// Calculate level from experience
const calculateLevel = (experience: number): number => {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (experience >= LEVEL_THRESHOLDS[i]) {
      return i
    }
  }
  return 0
}

// Calculate rank from level
const calculateRank = (level: number): AdmiralRank => {
  const cappedLevel = Math.min(level, RANK_MAPPING.length - 1)
  return RANK_MAPPING[cappedLevel]
}

// Default achievements
const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first lesson in the OS1000 Academy',
    unlocked: false,
    category: 'academy'
  },
  {
    id: 'academy-graduate',
    title: 'Academy Graduate',
    description: 'Complete the OS1000 Academy and receive your first ship',
    unlocked: false,
    category: 'academy'
  },
  {
    id: 'syntax-sailor',
    title: 'Syntax Sailor',
    description: 'Reach Level 1 and master basic programming concepts',
    unlocked: false,
    category: 'coding'
  },
  {
    id: 'fleet-commander',
    title: 'Fleet Commander',
    description: 'Access the Shipyard and begin fleet operations',
    unlocked: false,
    category: 'command'
  },
  {
    id: 'consciousness-weaver',
    title: 'Consciousness Weaver',
    description: 'Unlock the Loom and begin consciousness embroidery',
    unlocked: false,
    category: 'transcendence'
  }
]

export const useChronicleStore = create<ChronicleState>()(
  persist(
    (set, get) => ({
      // Initial state
      level: 0,
      experience: 0,
      rank: 'null-navigator',
      currentPhase: 'academy',
      
      ships: [],
      activeShip: null,
      
      academyCompleted: false,
      helmMastery: 0,
      fleetSize: 0,
      
      achievements: DEFAULT_ACHIEVEMENTS,
      unlockedPhases: new Set(['academy']), // Academy always accessible
      
      admiralName: 'Cadet',
      callSign: 'NEW-01',
      
      // Onboarding initial state
      hasCompletedOnboarding: false,
      isOnboardingActive: false,
      onboardingStep: 0,
      onboardingProgress: {
        welcomeCeremonyCompleted: false,
        interfaceTourCompleted: false,
        firstMissionCompleted: false,
        shipChristeningCompleted: false,
        openWatersReached: false
      },
      
      // Actions
      gainExperience: (amount: number) => {
        set((state) => {
          const newExperience = state.experience + amount
          const newLevel = calculateLevel(newExperience)
          const newRank = calculateRank(newLevel)
          
          // Auto-unlock phases based on level
          const unlockedPhases = new Set(state.unlockedPhases)
          if (newLevel >= 1) unlockedPhases.add('helm')
          if (newLevel >= 5) unlockedPhases.add('command')  
          if (newLevel >= 10) unlockedPhases.add('loom')
          
          return {
            experience: newExperience,
            level: newLevel,
            rank: newRank,
            unlockedPhases
          }
        })
      },
      
      unlockShip: (shipData) => {
        set((state) => {
          const newShip: Ship = {
            ...shipData,
            id: `ship-${Date.now()}`,
            acquired: new Date()
          }
          
          return {
            ships: [...state.ships, newShip],
            fleetSize: state.ships.length + 1,
            activeShip: state.activeShip || newShip.id // Set as active if first ship
          }
        })
      },
      
      setActiveShip: (shipId) => {
        set({ activeShip: shipId })
      },
      
      completeAcademy: () => {
        set((state) => {
          // Award first ship and experience
          const firstShip: Ship = {
            id: 'ship-academy-graduate',
            name: 'Academy Graduate',
            class: 'dinghy',
            acquired: new Date(),
            status: 'active',
            experience: 0
          }
          
          return {
            academyCompleted: true,
            ships: [firstShip],
            activeShip: firstShip.id,
            fleetSize: 1,
            experience: state.experience + 200, // Academy completion bonus
            unlockedPhases: new Set([...state.unlockedPhases, 'helm'])
          }
        })
        
        // Auto-calculate level and rank from new experience
        get().gainExperience(0) // Triggers level calculation
        get().unlockAchievement('academy-graduate')
      },
      
      updateHelmMastery: (level) => {
        set({ helmMastery: level })
      },
      
      unlockPhase: (phase) => {
        set((state) => ({
          unlockedPhases: new Set([...state.unlockedPhases, phase])
        }))
      },
      
      unlockAchievement: (achievementId) => {
        set((state) => ({
          achievements: state.achievements.map(achievement =>
            achievement.id === achievementId
              ? { ...achievement, unlocked: true, unlockedAt: new Date() }
              : achievement
          )
        }))
      },
      
      setAdmiralInfo: (name, callSign) => {
        set({ admiralName: name, callSign })
      },
      
      // Additional ship management
      addShip: (shipClass) => {
        let newShipId = ''
        set((state) => {
          const newShip: Ship = {
            id: `ship-${shipClass}-${Date.now()}`,
            name: `${shipClass.charAt(0).toUpperCase() + shipClass.slice(1)}`,
            class: shipClass,
            acquired: new Date(),
            status: 'active',
            experience: 0
          }
          
          newShipId = newShip.id
          
          return {
            ships: [...state.ships, newShip],
            fleetSize: state.ships.length + 1,
            activeShip: state.activeShip || newShip.id
          }
        })
        return newShipId
      },
      
      updateRank: () => {
        set((state) => ({
          rank: calculateRank(state.level)
        }))
      },
      
      // Onboarding actions
      startOnboarding: () => {
        set({
          isOnboardingActive: true,
          onboardingStep: 0
        })
      },
      
      advanceOnboardingStep: () => {
        set((state) => ({
          onboardingStep: Math.min(state.onboardingStep + 1, 4)
        }))
      },
      
      completeOnboardingPhase: (phase) => {
        set((state) => ({
          onboardingProgress: {
            ...state.onboardingProgress,
            [phase]: true
          }
        }))
      },
      
      completeOnboarding: () => {
        set({
          hasCompletedOnboarding: true,
          isOnboardingActive: false
        })
      },
      
      finishOnboarding: () => {
        set({
          hasCompletedOnboarding: true,
          isOnboardingActive: false,
          onboardingStep: 0,
          onboardingProgress: {
            welcomeCeremonyCompleted: true,
            interfaceTourCompleted: true,
            firstMissionCompleted: true,
            shipChristeningCompleted: true,
            openWatersReached: true
          }
        })
      },
      
      skipOnboarding: () => {
        set({
          hasCompletedOnboarding: true,
          isOnboardingActive: false,
          onboardingStep: 0
        })
      },
      
      // Module synchronization
      syncFromCursiveTerminal: (data) => {
        set((state) => {
          const updatedShips = [...state.ships]
          
          // Sync ship unlocks from cursive terminal
          data.ships.forEach(shipClass => {
            const existingShip = updatedShips.find(ship => ship.class === shipClass)
            if (!existingShip) {
              const newShip: Ship = {
                id: `ship-${shipClass}-${Date.now()}`,
                name: `${shipClass.charAt(0).toUpperCase() + shipClass.slice(1)}`,
                class: shipClass as ShipClass,
                acquired: new Date(),
                status: 'active',
                experience: 0
              }
              updatedShips.push(newShip)
            }
          })
          
          return {
            experience: Math.max(state.experience, data.experience),
            level: Math.max(state.level, data.level),
            ships: updatedShips,
            fleetSize: updatedShips.length,
            helmMastery: data.level * 10 // Convert level to mastery percentage
          }
        })
        
        // Recalculate rank
        get().gainExperience(0)
      },
      
      syncFromShipyard: (data) => {
        set({ fleetSize: data.fleetComposition.length })
      }
    }),
    {
      name: 'admirals-chronicle-storage',
      // Convert Set to Array for serialization
      partialize: (state) => ({
        ...state,
        unlockedPhases: Array.from(state.unlockedPhases)
      }),
      // Convert Array back to Set on hydration
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.unlockedPhases)) {
          state.unlockedPhases = new Set(state.unlockedPhases)
        }
      }
    }
  )
)