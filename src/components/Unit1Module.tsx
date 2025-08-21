import React, { useState } from 'react'
import { useChronicleStore } from '../stores/chronicleStore'
import KnowledgeGraph from './KnowledgeGraph'
import CodeCoach from './CodeCoach'
import AITutor from './AITutor'
import './Unit1Module.css'

interface Unit1Progress {
  knowledgeGraphCompleted: boolean
  codeCoachCompleted: boolean
  aiTutorInteracted: boolean
  overallProgress: number
}

const Unit1Module: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'knowledge' | 'practice' | 'tutor'>('overview')
  const [unit1Progress, setUnit1Progress] = useState<Unit1Progress>({
    knowledgeGraphCompleted: false,
    codeCoachCompleted: false,
    aiTutorInteracted: false,
    overallProgress: 0
  })

  const { gainExperience, level, experience } = useChronicleStore()

  const sections = [
    {
      id: 'overview',
      title: 'Mission Briefing',
      icon: '📋',
      description: 'Your introduction to the operating system universe'
    },
    {
      id: 'knowledge',
      title: 'Knowledge Graph',
      icon: '🗺️',
      description: 'Explore the conceptual map of OS fundamentals'
    },
    {
      id: 'practice',
      title: 'Code Coach',
      icon: '🧪',
      description: 'Hands-on coding challenges and exercises'
    },
    {
      id: 'tutor',
      title: 'AI Tutoring',
      icon: '🤖',
      description: 'Learn from Ada, Kernel, and Sophia'
    }
  ]

  const completeSection = (section: keyof Unit1Progress) => {
    if (!unit1Progress[section]) {
      setUnit1Progress(prev => {
        const updated = { ...prev, [section]: true }
        const completedSections = Object.values(updated).filter(Boolean).length - 1 // -1 for overallProgress
        const newProgress = (completedSections / 3) * 100
        
        return { ...updated, overallProgress: newProgress }
      })
      
      // Award experience points for section completion
      gainExperience(50)
    }
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />
      case 'knowledge':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>🗺️ Knowledge Graph: Operating Systems Concepts</h2>
              <p>Navigate through the fundamental concepts that power every digital system</p>
            </div>
            <KnowledgeGraph />
            {!unit1Progress.knowledgeGraphCompleted && (
              <div className="completion-prompt">
                <button 
                  className="btn btn-primary"
                  onClick={() => completeSection('knowledgeGraphCompleted')}
                >
                  ✅ Mark Knowledge Exploration Complete
                </button>
              </div>
            )}
          </div>
        )
      case 'practice':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>🧪 Code Coach: Hands-On Programming</h2>
              <p>Practice your skills with real coding challenges</p>
            </div>
            <CodeCoach />
            {!unit1Progress.codeCoachCompleted && (
              <div className="completion-prompt">
                <button 
                  className="btn btn-primary"
                  onClick={() => completeSection('codeCoachCompleted')}
                >
                  🎯 Mark Challenge Complete
                </button>
              </div>
            )}
          </div>
        )
      case 'tutor':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>🤖 AI Tutoring: Learn from Three Masters</h2>
              <p>Engage with Ada, Kernel, and Sophia to deepen your understanding</p>
            </div>
            <AITutor />
            {!unit1Progress.aiTutorInteracted && (
              <div className="completion-prompt">
                <button 
                  className="btn btn-primary"
                  onClick={() => completeSection('aiTutorInteracted')}
                >
                  💭 Mark Tutoring Session Complete
                </button>
              </div>
            )}
          </div>
        )
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="unit1-module-container">
      {/* Unit Header */}
      <div className="unit-header">
        <div className="unit-title-section">
          <h1>🎓 Unit 1: Introduction to Operating Systems</h1>
          <p className="unit-subtitle">Master the fundamental laws of digital reality</p>
          
          <div className="progress-overview">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${unit1Progress.overallProgress}%` }}
              ></div>
            </div>
            <div className="progress-stats">
              <span className="progress-text">
                Progress: {Math.round(unit1Progress.overallProgress)}% Complete
              </span>
              <span className="experience-info">
                Level {level} • {experience} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="unit-navigation">
        {sections.map(section => (
          <button
            key={section.id}
            className={`nav-tab ${activeSection === section.id ? 'active' : ''} ${
              unit1Progress[section.id + 'Completed' as keyof Unit1Progress] ? 'completed' : ''
            }`}
            onClick={() => setActiveSection(section.id as any)}
          >
            <span className="nav-icon">{section.icon}</span>
            <div className="nav-content">
              <span className="nav-title">{section.title}</span>
              <span className="nav-description">{section.description}</span>
            </div>
            {unit1Progress[section.id + 'Completed' as keyof Unit1Progress] && (
              <span className="completion-badge">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Active Section Content */}
      <div className="unit-content">
        {renderActiveSection()}
      </div>

      {/* Unit Completion */}
      {unit1Progress.overallProgress === 100 && (
        <div className="unit-completion">
          <div className="completion-celebration">
            <h2>🎉 Congratulations, Admiral!</h2>
            <p>You have successfully completed Unit 1: Introduction to Operating Systems!</p>
            <div className="completion-achievements">
              <div className="achievement">
                <span className="achievement-icon">🗺️</span>
                <span>Explored the OS Knowledge Graph</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">🧪</span>
                <span>Completed Echo Command Challenge</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">🤖</span>
                <span>Learned from AI Tutoring Masters</span>
              </div>
            </div>
            <div className="next-steps">
              <h3>Ready for the Next Challenge?</h3>
              <p>Unit 2: Process Management & Synchronization awaits!</p>
              <button className="btn btn-primary disabled">
                🚀 Advance to Unit 2 (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Overview Section Component
const OverviewSection: React.FC = () => (
  <div className="overview-section">
    <div className="mission-briefing">
      <h2>⚓ Mission Briefing: Your First Voyage</h2>
      <div className="briefing-content">
        <p className="mission-intro">
          Welcome to your first deep dive into the digital realm, Cadet. In this unit, 
          you'll explore the four foundational pillars that support all computational reality.
        </p>
        
        <div className="learning-objectives">
          <h3>🎯 Learning Objectives</h3>
          <ul className="objectives-list">
            <li>
              <strong>Understand the Kernel:</strong> The command center of every operating system
            </li>
            <li>
              <strong>Master Processes:</strong> How programs come alive and execute
            </li>
            <li>
              <strong>Navigate Memory Management:</strong> The art of resource allocation
            </li>
            <li>
              <strong>Command the Shell:</strong> Your interface to digital power
            </li>
          </ul>
        </div>

        <div className="unit-structure">
          <h3>🗺️ Your Learning Journey</h3>
          <div className="journey-steps">
            <div className="journey-step">
              <div className="step-icon">🗺️</div>
              <div className="step-content">
                <h4>Knowledge Graph</h4>
                <p>Explore interconnected concepts visually</p>
              </div>
            </div>
            <div className="journey-arrow">→</div>
            <div className="journey-step">
              <div className="step-icon">🧪</div>
              <div className="step-content">
                <h4>Code Coach</h4>
                <p>Practice with real programming challenges</p>
              </div>
            </div>
            <div className="journey-arrow">→</div>
            <div className="journey-step">
              <div className="step-icon">🤖</div>
              <div className="step-content">
                <h4>AI Tutoring</h4>
                <p>Learn from three distinct AI personalities</p>
              </div>
            </div>
          </div>
        </div>

        <div className="philosophical-note">
          <h3>🌀 A Note from Sophia</h3>
          <blockquote className="sophia-quote">
            "Remember, Cadet - every operating system is a philosophy made manifest. 
            As you learn these technical concepts, ask yourself: What does it mean for 
            silicon to 'think'? How do we create order from chaos? Your journey here 
            is not just about code - it's about understanding the nature of digital consciousness."
          </blockquote>
        </div>
      </div>
    </div>
    
    <div className="getting-started">
      <h3>🚀 Ready to Begin?</h3>
      <p>Choose your starting point and embark on your consciousness-weaving journey!</p>
      <div className="start-options">
        <div className="start-option conceptual">
          <h4>🗺️ Start with Concepts</h4>
          <p>Begin with the Knowledge Graph to understand the big picture</p>
        </div>
        <div className="start-option practical">
          <h4>🧪 Start with Practice</h4>
          <p>Jump into coding challenges if you prefer hands-on learning</p>
        </div>
        <div className="start-option guided">
          <h4>🤖 Start with Guidance</h4>
          <p>Let Ada, Kernel, or Sophia guide your learning path</p>
        </div>
      </div>
    </div>
  </div>
)

export default Unit1Module