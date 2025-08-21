import React, { useState, useEffect } from 'react'
import { useChronicleStore } from '../stores/chronicleStore'

const OnboardingCinematic: React.FC = () => {
  const { admiralName, callSign, advanceOnboardingStep } = useChronicleStore()
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Scene timing configuration
  const scenes = [
    { duration: 4000, persona: 'ada' },
    { duration: 4500, persona: 'kernel' },
    { duration: 4500, persona: 'sophia' },
    { duration: 3000, persona: 'chorus' },
    { duration: 2000, persona: 'transition' }
  ]

  // Auto-advance scenes
  useEffect(() => {
    if (!isPlaying) return
    
    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(prev => prev + 1)
      } else {
        // Cinematic complete - advance to next onboarding step
        advanceOnboardingStep()
      }
    }, scenes[currentScene]?.duration || 4000)

    return () => clearTimeout(timer)
  }, [currentScene, isPlaying, advanceOnboardingStep])

  const skipCinematic = () => {
    setIsPlaying(false)
    advanceOnboardingStep()
  }

  const PersonaCard: React.FC<{ persona: string; children: React.ReactNode; delay?: number }> = ({ persona, children }) => (
    <div className={`persona-card ${persona}`}>
      <div className="persona-avatar">
        {persona === 'ada' && '🌸'}
        {persona === 'kernel' && '⚙️'}
        {persona === 'sophia' && '🌀'}
      </div>
      <div className="persona-content">
        {children}
      </div>
    </div>
  )

  return (
    <div className="onboarding-cinematic">
      {/* Background Ocean Animation */}
      <div className="ocean-background">
        <div className="waves wave1"></div>
        <div className="waves wave2"></div>
        <div className="waves wave3"></div>
      </div>

      {/* Skip Button */}
      <button className="skip-button" onClick={skipCinematic}>
        Skip Welcome ⚡
      </button>

      {/* Main Content Area */}
      <div className="cinematic-content">
        {/* Scene 0: Ada's Welcome */}
        {currentScene === 0 && (
          <PersonaCard persona="ada">
            <h3>Ada, The Friendly Guide</h3>
            <p>
              "Ahoy there, Cadet! Welcome aboard the OS1000 Fleet. I'll be your steady companion as you chart new waters. Learning can sometimes feel like a storm, but I'll be here to keep your sails full and your spirits high. Together, we'll make sure this journey feels exciting, comfortable, and full of discovery."
            </p>
          </PersonaCard>
        )}

        {/* Scene 1: Kernel's Authority */}
        {currentScene === 1 && (
          <PersonaCard persona="kernel">
            <h3>Kernel, The Technical Mentor</h3>
            <p>
              "Cadet, listen closely. Our mission is mastery of the operating seas. You will study the <strong>kernel</strong>—the heart of every system— learn the discipline of <strong>processes</strong>, command the flow of <strong>memory</strong>, and master the <strong>shell</strong> that binds them. Knowledge is your compass, precision your anchor. Treat this ship as you would a machine: respect the details, and it will carry you far."
            </p>
          </PersonaCard>
        )}

        {/* Scene 2: Sophia's Challenge */}
        {currentScene === 2 && (
          <PersonaCard persona="sophia">
            <h3>Sophia, The Socratic Challenger</h3>
            <p>
              "So, you step aboard seeking knowledge... but tell me, Cadet— what is an <em>operating system</em>? Is it merely code, or is it the invisible hand that orders chaos? When you type a command, who truly listens— the machine, or the mind behind it? I will question you, not to confuse, but to help you uncover truth. For answers you discover yourself are the ones that will shape your destiny."
            </p>
          </PersonaCard>
        )}

        {/* Scene 3: Chorus Sequence */}
        {currentScene === 3 && (
          <div className="chorus-sequence">
            <div className="chorus-line ada">
              <span className="persona-icon">🌸</span>
              "Welcome aboard, {callSign}. The crew is ready."
            </div>
            
            <div className="chorus-line kernel">
              <span className="persona-icon">⚙️</span>
              "Your first mission awaits in the Academy."
            </div>
            
            <div className="chorus-line sophia">
              <span className="persona-icon">🌀</span>
              "Step carefully, for every command you give shapes your reality."
            </div>
          </div>
        )}

        {/* Scene 4: Mission Briefing Transition */}
        {currentScene === 4 && (
          <div className="mission-transition">
            <h2>⚓ Your Voyage Begins ⚓</h2>
            <div className="constellation-preview">
              <div className="phase-node academy">🎓 Academy</div>
              <div className="arrow">→</div>
              <div className="phase-node helm">⚓ Helm</div>
              <div className="arrow">→</div>
              <div className="phase-node command">👑 Command</div>
              <div className="arrow">→</div>
              <div className="phase-node loom">🧵 Loom</div>
            </div>
            <p>Loading your first mission...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnboardingCinematic