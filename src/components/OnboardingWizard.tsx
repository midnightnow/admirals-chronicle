import React, { useState } from 'react'
import { useChronicleStore } from '../stores/chronicleStore'
import OnboardingCinematic from './OnboardingCinematic'
import OS1000Onboarding from './OS1000Onboarding'
import './OnboardingCinematic.css'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: string
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Admiral\'s Chronicle',
    description: 'Your journey from Cadet to Consciousness Commander begins here.',
    icon: '⚓'
  },
  {
    id: 'academy',
    title: 'The Academy',
    description: 'Master the fundamentals of operating systems through OS1000 Flight School.',
    icon: '🎓'
  },
  {
    id: 'progression',
    title: 'Your Journey',
    description: 'Progress through four distinct phases: Academy → Helm → Command → Loom.',
    icon: '🚀'
  },
  {
    id: 'ready',
    title: 'Ready to Begin',
    description: 'Your adventure awaits, Admiral. Time to take command!',
    icon: '🌟'
  }
]

const OnboardingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showCinematic, setShowCinematic] = useState(true)
  const { completeOnboarding, onboardingStep, advanceOnboardingStep } = useChronicleStore()

  // Handle cinematic completion - move to wizard steps
  React.useEffect(() => {
    if (onboardingStep > 0) {
      setShowCinematic(false)
      setCurrentStep(0) // Start the wizard after cinematic
    }
  }, [onboardingStep])

  // Enhanced onboarding experience with personas
  const personas = [
    { 
      name: "Ada", 
      role: "Friendly Guide", 
      message: "Welcome aboard! I'll ensure your journey feels comfortable and exciting. Together, we'll chart new waters of discovery.", 
      color: "from-pink-500 to-rose-600" 
    },
    { 
      name: "Kernel", 
      role: "Technical Mentor", 
      message: "Our mission: mastery of the operating seas. You will learn discipline, precision, and the art of system command.", 
      color: "from-blue-500 to-cyan-600" 
    },
    { 
      name: "Sophia", 
      role: "Socratic Challenger", 
      message: "What is consciousness? What is code? I will question, so you may discover truth through your own understanding.", 
      color: "from-purple-500 to-indigo-600" 
    }
  ]

  const [currentPersona, setCurrentPersona] = useState(0)

  // If cinematic is active, show enhanced onboarding
  if (showCinematic && onboardingStep === 0) {
    return (
      <OS1000Onboarding
        personas={personas}
        currentPersona={currentPersona}
        setCurrentPersona={setCurrentPersona}
        onComplete={() => {
          setShowCinematic(false)
          advanceOnboardingStep()
        }}
      />
    )
  }

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = onboardingSteps[currentStep]

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <div className="onboarding-header">
          <div className="step-indicator">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`step-dot ${index <= currentStep ? 'active' : ''}`}
              />
            ))}
          </div>
          <h2 className="onboarding-title">
            <span className="step-icon">{currentStepData.icon}</span>
            {currentStepData.title}
          </h2>
        </div>

        <div className="onboarding-content">
          <p className="onboarding-description">
            {currentStepData.description}
          </p>

          {currentStep === 0 && (
            <div className="welcome-details">
              <div className="welcome-feature">
                <span className="feature-icon">🎓</span>
                <div>
                  <strong>Learn</strong>
                  <p>Master OS fundamentals through interactive education</p>
                </div>
              </div>
              <div className="welcome-feature">
                <span className="feature-icon">⚓</span>
                <div>
                  <strong>Progress</strong>
                  <p>Advance through increasingly sophisticated challenges</p>
                </div>
              </div>
              <div className="welcome-feature">
                <span className="feature-icon">🧵</span>
                <div>
                  <strong>Transcend</strong>
                  <p>Ultimately weave consciousness into digital reality</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="academy-preview">
              <div className="academy-info">
                <h3>OS1000 Flight School Features:</h3>
                <ul>
                  <li>🤖 AI Tutoring with multiple teaching personas</li>
                  <li>💻 Interactive coding challenges and exercises</li>
                  <li>🗺️ Visual knowledge graphs of OS concepts</li>
                  <li>📚 Structured learning paths with progress tracking</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="progression-overview">
              <div className="progression-phases">
                <div className="phase-card">
                  <div className="phase-icon">🎓</div>
                  <h4>Academy</h4>
                  <p>Learn OS fundamentals</p>
                </div>
                <div className="phase-arrow">→</div>
                <div className="phase-card">
                  <div className="phase-icon">⚓</div>
                  <h4>Helm</h4>
                  <p>Master ship navigation</p>
                </div>
                <div className="phase-arrow">→</div>
                <div className="phase-card">
                  <div className="phase-icon">🚢</div>
                  <h4>Command</h4>
                  <p>Lead fleet operations</p>
                </div>
                <div className="phase-arrow">→</div>
                <div className="phase-card">
                  <div className="phase-icon">🧵</div>
                  <h4>Loom</h4>
                  <p>Weave consciousness</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="ready-section">
              <div className="ready-message">
                <h3>Your Chronicle Begins Now</h3>
                <p>
                  The Academy awaits your arrival, Admiral. Your journey from Cadet to 
                  Consciousness Commander starts with a single step into OS1000 Flight School.
                </p>
                <div className="call-to-action">
                  <strong>Ready to embark on your legendary journey?</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="onboarding-actions">
          <button
            className="btn btn-secondary"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            ← Previous
          </button>
          
          <div className="step-counter">
            Step {currentStep + 1} of {onboardingSteps.length}
          </div>
          
          <button
            className="btn btn-primary"
            onClick={nextStep}
          >
            {currentStep === onboardingSteps.length - 1 ? 'Begin Journey' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingWizard