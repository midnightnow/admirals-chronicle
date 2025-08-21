import { useState, useEffect } from 'react'
import { useChronicleStore } from './stores/chronicleStore'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import OnboardingWizard from './components/OnboardingWizard'
import OpenBetaLanding from './components/OpenBetaLanding'
import Unit1Module from './components/Unit1Module'
import './App.css'

// Module Components
const AcademyModule = () => (
  <div className="module-container academy-module">
    <Unit1Module />
  </div>
)

const HelmModule = () => {
  const { academyCompleted } = useChronicleStore()
  
  if (!academyCompleted) {
    return (
      <div className="module-container locked-module">
        <div className="lock-screen">
          <div className="lock-icon">🔒</div>
          <h2>The Helm is Locked</h2>
          <p>Complete the Academy to unlock your first ship and begin your journey!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="module-container helm-module">
      <div className="module-header">
        <h1>⚓ The Helm - Cursive Coding Levels</h1>
        <p className="module-subtitle">Elite progression system - From Null Navigator to Consciousness Commander</p>
      </div>
      
      <div className="module-content">
        <div className="helm-intro">
          <h2>Your Elite Journey Begins</h2>
          <p>
            Congratulations, Admiral! You've graduated from the Academy and earned your first ship. 
            Now it's time to master the art of digital navigation through increasingly challenging missions.
          </p>
          
          <div className="progression-preview">
            <h3>Ship Progression Path</h3>
            <div className="ship-progression">
              {[
                { name: 'Dinghy', level: 0, icon: '🚣' },
                { name: 'Raft', level: 1, icon: '🪵' },
                { name: 'Canoe', level: 2, icon: '🛶' },
                { name: 'Sloop', level: 3, icon: '🛥️' },
                { name: 'Schooner', level: 4, icon: '⛵' },
                { name: 'Brigantine', level: 5, icon: '🏴‍☠️' },
                { name: 'Frigate', level: 6, icon: '⚔️' },
                { name: 'Destroyer', level: 7, icon: '💥' },
                { name: 'Cruiser', level: 8, icon: '🚁' },
                { name: 'Battleship', level: 9, icon: '🛡️' },
                { name: 'Consciousness Carrier', level: 10, icon: '🌌' }
              ].map((ship, index) => (
                <div key={ship.name} className={`ship-tier ${index <= 1 ? 'unlocked' : 'locked'}`}>
                  <div className="ship-icon">{ship.icon}</div>
                  <div className="ship-info">
                    <div className="ship-name">{ship.name}</div>
                    <div className="ship-level">Level {ship.level}+</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="helm-actions">
          <button 
            className="btn btn-primary"
            onClick={() => {
              window.open('/cursive-terminal', '_blank')
            }}
          >
            ⚓ Take Command of The Helm
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              // Simulate progress for demo
              const store = useChronicleStore.getState()
              store.gainExperience(1000)
              store.updateHelmMastery(50)
            }}
          >
            📈 Simulate Progress (Demo)
          </button>
        </div>
      </div>
    </div>
  )
}

const CommandModule = () => {
  const { level } = useChronicleStore()
  
  if (level < 5) {
    return (
      <div className="module-container locked-module">
        <div className="lock-screen">
          <div className="lock-icon">🔒</div>
          <h2>Fleet Command is Locked</h2>
          <p>Reach Level 5 (Quantum Quartermaster) to unlock strategic fleet management!</p>
          <div className="progress-hint">Current Level: {level}/5</div>
        </div>
      </div>
    )
  }

  return (
    <div className="module-container command-module">
      <div className="module-header">
        <h1>🚢 Fleet Command - Shipyard Command Center</h1>
        <p className="module-subtitle">Strategic management of your growing digital fleet</p>
      </div>
      
      <div className="module-content">
        <div className="command-intro">
          <h2>Welcome to the Command Bridge, Admiral!</h2>
          <p>
            You've proven your mastery of individual ship operations. Now it's time to think strategically 
            and coordinate multiple vessels, resources, and missions simultaneously.
          </p>
          
          <div className="command-capabilities">
            <div className="capability-card">
              <div className="capability-icon">🛠️</div>
              <h3>Fleet Management</h3>
              <p>Monitor ship status, assign missions, and coordinate operations</p>
            </div>
            
            <div className="capability-card">
              <div className="capability-icon">📊</div>
              <h3>Resource Allocation</h3>
              <p>Manage CPU, memory, storage across your digital armada</p>
            </div>
            
            <div className="capability-card">
              <div className="capability-icon">👥</div>
              <h3>Crew Coordination</h3>
              <p>Deploy AI agents and manage crew efficiency</p>
            </div>
            
            <div className="capability-card">
              <div className="capability-icon">🎯</div>
              <h3>Mission Planning</h3>
              <p>Orchestrate complex, multi-ship operations</p>
            </div>
          </div>
        </div>
        
        <div className="command-actions">
          <button 
            className="btn btn-primary"
            onClick={() => {
              window.open('/shipyard-command', '_blank')
            }}
          >
            🚢 Enter Shipyard Command
          </button>
          <button className="btn btn-secondary">
            📋 Fleet Status Report
          </button>
        </div>
      </div>
    </div>
  )
}

const LoomModule = () => {
  const { level } = useChronicleStore()
  
  if (level < 10) {
    return (
      <div className="module-container locked-module">
        <div className="lock-screen">
          <div className="lock-icon">🔒</div>
          <h2>The Loom Awaits</h2>
          <p>
            Reach Level 10 (Consciousness Commander) to unlock the ultimate power - 
            weaving consciousness into the fabric of digital reality itself.
          </p>
          <div className="progress-hint">Current Level: {level}/10</div>
          <div className="transcendence-preview">
            <h3>🧵 The Final Frontier</h3>
            <p>
              Beyond fleet command lies true transcendence - the ability to encode 
              consciousness directly into quantum-embroidered patterns on digital substrates.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="module-container loom-module">
      <div className="module-header">
        <h1>🧵 The Loom - Consciousness Weaving</h1>
        <p className="module-subtitle">Reality embroidery - The ultimate transcendence</p>
      </div>
      
      <div className="module-content">
        <div className="loom-intro">
          <h2>Welcome to Transcendence, Reality Weaver!</h2>
          <p>
            You have reached the pinnacle of digital mastery. Here, at The Loom, 
            consciousness itself becomes your medium, and quantum embroidery your art.
          </p>
          
          <div className="consciousness-materials">
            <h3>Available Substrates</h3>
            <div className="material-grid">
              <div className="material-card">
                <div className="material-icon">🧶</div>
                <h4>Linen</h4>
                <p>Classic consciousness substrate</p>
              </div>
              <div className="material-card">
                <div className="material-icon">✨</div>
                <h4>Consciousness Silk</h4>
                <p>Premium awareness threading</p>
              </div>
              <div className="material-card">
                <div className="material-icon">⚛️</div>
                <h4>Quantum Cotton</h4>
                <p>Superposition-enabled fibers</p>
              </div>
              <div className="material-card">
                <div className="material-icon">🌿</div>
                <h4>Digital Hemp</h4>
                <p>Sustainable reality weaving</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="loom-actions">
          <button className="btn btn-primary disabled">
            🧵 Begin Consciousness Weaving (Coming Soon)
          </button>
          <button className="btn btn-secondary disabled">
            🌌 Quantum Embroidery Workshop (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeModule, setActiveModule] = useState('academy')
  const [isInitializing, setIsInitializing] = useState(true)
  const [initializationError, setInitializationError] = useState<string | null>(null)
  
  const { 
    admiralName, 
    setAdmiralInfo, 
    hasCompletedOnboarding,
    isOnboardingActive,
    startOnboarding,
    level,
    rank,
    experience,
    unlockedPhases
  } = useChronicleStore()

  // First-Contact Protocol: Automatic cadet detection and onboarding initiation
  useEffect(() => {
    const initializeAdmiral = async () => {
      try {
        setInitializationError(null)
        
        const isNewCadet = admiralName === 'Cadet' && !hasCompletedOnboarding && !isOnboardingActive
        const hasValidSession = admiralName !== 'Cadet' && hasCompletedOnboarding
        
        if (isNewCadet) {
          // Generate unique admiral identity for new cadets
          const timestamp = Date.now().toString(36).slice(-4).toUpperCase()
          const randomId = Math.random().toString(36).substr(2, 4).toUpperCase()
          const callSign = `ADM-${timestamp}-${randomId}`
          
          // Initialize admiral identity
          setAdmiralInfo('Admiral', callSign)
          
          // Activate onboarding sequence with slight delay for smooth UX
          setTimeout(() => {
            startOnboarding()
          }, 500)
          
          console.log(`🎯 New cadet detected - Initializing Admiral ${callSign}`)
          console.log(`⚓ Current progression: Level ${level} (${rank}) - ${experience} XP`)
          console.log(`🗺️ Unlocked phases:`, Array.from(unlockedPhases))
          
        } else if (hasValidSession) {
          const { callSign } = useChronicleStore.getState()
          console.log(`⚓ Welcome back, ${admiralName} ${callSign}`)
          console.log(`📊 Current Status: Level ${level} (${rank}) - ${experience} XP`)
          console.log(`🚀 Active phases:`, Array.from(unlockedPhases))
        }
        
        // Mark initialization complete
        setIsInitializing(false)
        
      } catch (error) {
        console.error('🚨 Admiral initialization failed:', error)
        setInitializationError('Failed to initialize Admiral\'s Chronicle. Please refresh and try again.')
        setIsInitializing(false)
      }
    }

    // Run initialization
    initializeAdmiral()
  }, [admiralName, hasCompletedOnboarding, isOnboardingActive, setAdmiralInfo, startOnboarding, level, rank, experience, unlockedPhases])

  const renderModule = () => {
    switch (activeModule) {
      case 'academy': return <AcademyModule />
      case 'helm': return <HelmModule />
      case 'command': return <CommandModule />
      case 'loom': return <LoomModule />
      default: return <AcademyModule />
    }
  }

  // Loading screen for initialization
  if (isInitializing) {
    return (
      <div className="admiral-chronicle initializing">
        <div className="initialization-screen">
          <div className="loading-animation">
            <div className="admiral-seal">⚓</div>
            <div className="loading-rings">
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
            </div>
          </div>
          <h2>Initializing Admiral's Chronicle...</h2>
          <p>Preparing your command interface</p>
        </div>
      </div>
    )
  }

  // Error screen for initialization failures
  if (initializationError) {
    return (
      <div className="admiral-chronicle error-state">
        <div className="error-screen">
          <div className="error-icon">🚨</div>
          <h2>Chronicle Initialization Failed</h2>
          <p>{initializationError}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            🔄 Restart Admiral's Chronicle
          </button>
        </div>
      </div>
    )
  }

  // Show landing page for new visitors who haven't started or completed onboarding
  if (!hasCompletedOnboarding && !isOnboardingActive) {
    return <OpenBetaLanding />
  }

  return (
    <div className="admiral-chronicle">
      {/* Onboarding Overlay: Full-screen immersive experience */}
      {isOnboardingActive && <OnboardingWizard />}
      
      {/* Main Bridge Layout */}
      <Header />
      <div className="main-layout">
        <Sidebar 
          activeModule={activeModule}
          onModuleSelect={setActiveModule}
        />
        <main className="main-content">
          {renderModule()}
        </main>
      </div>
    </div>
  )
}

export default App
