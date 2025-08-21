import React from 'react'
import { useChronicleStore } from '../stores/chronicleStore'

interface SidebarProps {
  activeModule: string
  onModuleSelect: (module: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleSelect }) => {
  const { 
    unlockedPhases, 
    level, 
    academyCompleted, 
    helmMastery, 
    fleetSize 
  } = useChronicleStore()

  interface ModuleInfo {
    id: string
    name: string
    icon: string
    description: string
    unlocked: boolean
    progress?: number
    requirements?: string
    comingSoon?: boolean
  }

  const modules: ModuleInfo[] = [
    {
      id: 'academy',
      name: 'The Academy',
      icon: '🎓',
      description: 'OS1000 Flight School - Master the fundamentals',
      unlocked: unlockedPhases.has('academy'),
      progress: academyCompleted ? 100 : 0,
      requirements: 'Always available'
    },
    {
      id: 'helm', 
      name: 'The Helm',
      icon: '⚓',
      description: 'Cursive Coding Levels - Elite progression system',
      unlocked: unlockedPhases.has('helm'),
      progress: helmMastery,
      requirements: 'Complete Academy'
    },
    {
      id: 'command',
      name: 'Fleet Command',
      icon: '🚢',
      description: 'Shipyard Command Center - Strategic fleet management',
      unlocked: unlockedPhases.has('command'),
      progress: fleetSize > 0 ? 50 : 0, // Basic progress indicator
      requirements: 'Reach Level 5 (Quantum Quartermaster)'
    },
    {
      id: 'loom',
      name: 'The Loom',
      icon: '🧵',
      description: 'Consciousness Weaving - Reality embroidery endgame',
      unlocked: unlockedPhases.has('loom'),
      progress: 0,
      requirements: 'Reach Level 10 (Consciousness Commander)',
      comingSoon: true
    }
  ]

  const getModuleStatus = (module: ModuleInfo) => {
    if (!module.unlocked) return 'locked'
    if (module.id === activeModule) return 'active'
    if (module.progress && module.progress > 0) return 'in-progress'
    return 'available'
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return '#4ade80' // Green
    if (progress >= 50) return '#fbbf24'  // Yellow
    if (progress > 0) return '#60a5fa'    // Blue
    return '#6b7280'                      // Gray
  }

  return (
    <aside className="admiral-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Admiral's Chronicle</h2>
        <div className="navigation-subtitle">Your Journey to Mastery</div>
      </div>

      <nav className="module-navigation">
        <div className="nav-section">
          <h3 className="nav-section-title">Mission Phases</h3>
          
          {modules.map((module) => {
            const status = getModuleStatus(module)
            
            return (
              <div key={module.id} className={`nav-item ${status}`}>
                <button
                  onClick={() => module.unlocked && onModuleSelect(module.id)}
                  className="nav-button"
                  disabled={!module.unlocked}
                  title={module.unlocked ? module.description : `Locked: ${module.requirements}`}
                >
                  <div className="nav-icon">
                    {!module.unlocked ? '🔒' : module.icon}
                  </div>
                  
                  <div className="nav-content">
                    <div className="nav-name">{module.name}</div>
                    <div className="nav-description">{module.description}</div>
                    
                    {module.unlocked && module.progress !== undefined && (
                      <div className="nav-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ 
                              width: `${module.progress}%`,
                              backgroundColor: getProgressColor(module.progress)
                            }}
                          />
                        </div>
                        <div className="progress-text">{Math.round(module.progress)}%</div>
                      </div>
                    )}
                    
                    {!module.unlocked && (
                      <div className="requirements-text">{module.requirements}</div>
                    )}
                    
                    {module.comingSoon && module.unlocked && (
                      <div className="coming-soon-badge">Coming Soon</div>
                    )}
                  </div>
                  
                  {status === 'active' && (
                    <div className="active-indicator">▶</div>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        <div className="nav-section progression-guide">
          <h3 className="nav-section-title">Progression Guide</h3>
          <div className="progression-steps">
            <div className={`step ${academyCompleted ? 'completed' : level === 0 ? 'current' : 'upcoming'}`}>
              <span className="step-number">1</span>
              <span className="step-text">Complete Academy</span>
              {academyCompleted && <span className="check-mark">✓</span>}
            </div>
            
            <div className={`step ${level >= 1 ? 'completed' : level === 0 && academyCompleted ? 'current' : 'upcoming'}`}>
              <span className="step-number">2</span>
              <span className="step-text">Master The Helm</span>
              {level >= 5 && <span className="check-mark">✓</span>}
            </div>
            
            <div className={`step ${level >= 5 ? 'completed' : level >= 1 ? 'current' : 'upcoming'}`}>
              <span className="step-number">3</span>
              <span className="step-text">Command Fleet</span>
              {level >= 10 && <span className="check-mark">✓</span>}
            </div>
            
            <div className={`step ${level >= 10 ? 'current' : 'upcoming'}`}>
              <span className="step-number">4</span>
              <span className="step-text">Weave Reality</span>
              {level >= 10 && <span className="transcendence-mark">🌟</span>}
            </div>
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="journey-summary">
          <div className="summary-stat">
            <span className="stat-label">Current Level:</span>
            <span className="stat-value">{level}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Fleet Size:</span>
            <span className="stat-value">{fleetSize}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Phase:</span>
            <span className="stat-value">
              {level >= 10 ? 'Transcendence' : 
               level >= 5 ? 'Command' :
               level >= 1 ? 'Journey' : 'Academy'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar