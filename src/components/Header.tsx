import React, { useState } from 'react'
import { useChronicleStore } from '../stores/chronicleStore'
import { config } from '../config/env'

const Header: React.FC = () => {
  const [showVersionSelector, setShowVersionSelector] = useState(false)
  const [showDebugPanel, setShowDebugPanel] = useState(false)
  
  const { 
    level, 
    experience, 
    rank, 
    admiralName, 
    callSign, 
    activeShip,
    ships,
    achievements 
  } = useChronicleStore()
  
  // Find active ship details
  const currentShip = ships.find(ship => ship.id === activeShip)
  
  // Calculate progress to next level
  const LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1500, 2300, 3500, 5200, 8000]
  const currentThreshold = LEVEL_THRESHOLDS[level] || 0
  const nextThreshold = LEVEL_THRESHOLDS[level + 1] || 8000
  const progressPercent = level >= 9 ? 100 : 
    ((experience - currentThreshold) / (nextThreshold - currentThreshold)) * 100
  
  // Format rank for display
  const formatRank = (rank: string) => {
    return rank.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  // Get ship display name and class
  const getShipDisplay = (ship: any) => {
    if (!ship) return { name: 'No Active Ship', class: 'none' }
    return {
      name: ship.name,
      class: ship.class.charAt(0).toUpperCase() + ship.class.slice(1)
    }
  }
  
  const shipDisplay = getShipDisplay(currentShip)
  const unlockedAchievements = achievements.filter(a => a.unlocked).length

  return (
    <header className="admiral-header">
      <div className="header-content">
        {/* Admiral Identity */}
        <div className="admiral-identity">
          <div className="admiral-avatar">
            {level >= 10 ? '🌟' : level >= 7 ? '⭐' : level >= 4 ? '🚢' : level >= 1 ? '⚓' : '🎓'}
          </div>
          <div className="admiral-info">
            <div className="admiral-name">{admiralName}</div>
            <div className="admiral-callsign">Call Sign: {callSign}</div>
          </div>
        </div>

        {/* Rank and Progress */}
        <div className="rank-section">
          <div className="rank-display">
            <div className="rank-title">{formatRank(rank)}</div>
            <div className="level-display">Level {level}</div>
          </div>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
            <div className="experience-text">
              {level >= 9 ? 'MAX LEVEL' : `${experience}/${nextThreshold} XP`}
            </div>
          </div>
        </div>

        {/* Active Ship */}
        <div className="active-ship-section">
          <div className="ship-label">Active Ship:</div>
          <div className="ship-info">
            <div className="ship-name">{shipDisplay.name}</div>
            <div className="ship-class">{shipDisplay.class}</div>
          </div>
          <div className="ship-icon">
            {currentShip?.class === 'consciousness-carrier' ? '🌌' :
             currentShip?.class === 'battleship' ? '🛡️' :
             currentShip?.class === 'cruiser' ? '🚁' :
             currentShip?.class === 'destroyer' ? '💥' :
             currentShip?.class === 'frigate' ? '⚔️' :
             currentShip?.class === 'brigantine' ? '🏴‍☠️' :
             currentShip?.class === 'schooner' ? '⛵' :
             currentShip?.class === 'sloop' ? '🛥️' :
             currentShip?.class === 'canoe' ? '🛶' :
             currentShip?.class === 'raft' ? '🪵' :
             currentShip?.class === 'dinghy' ? '🚣' : '❓'}
          </div>
        </div>

        {/* Fleet Stats */}
        <div className="fleet-stats">
          <div className="stat-item">
            <div className="stat-label">Fleet</div>
            <div className="stat-value">{ships.length}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Achievements</div>
            <div className="stat-value">{unlockedAchievements}/{achievements.length}</div>
          </div>
        </div>

        {/* Command Center Controls */}
        <div className="command-controls">
          <div className="app-title">
            {config.appTitle} <span className="version-badge">v{config.version}</span>
          </div>
          
          {/* Environment Indicator */}
          <div className={`environment-indicator ${config.environment}`}>
            {config.environment.toUpperCase()}
          </div>
          
          {/* Feature-Gated Controls */}
          {config.featureFlags.showVersionSelector && (
            <button 
              className="control-btn"
              onClick={() => setShowVersionSelector(!showVersionSelector)}
              title="Version & Environment Controls"
            >
              ⚙️
            </button>
          )}
          
          {config.featureFlags.showDebugInfo && (
            <button 
              className="control-btn debug"
              onClick={() => setShowDebugPanel(!showDebugPanel)}
              title="Debug Information"
            >
              🔍
            </button>
          )}
        </div>
      </div>
      
      {/* Version Selector Dropdown */}
      {showVersionSelector && config.featureFlags.showVersionSelector && (
        <div className="version-selector-dropdown">
          <h3>⚙️ Command Center Controls</h3>
          <div className="version-info">
            <div><strong>Version:</strong> {config.version}</div>
            <div><strong>Environment:</strong> {config.environment}</div>
            <div><strong>Build Type:</strong> {config.isPublicBuild ? 'Public' : 'Internal'}</div>
          </div>
          
          <div className="feature-flags">
            <h4>Active Features:</h4>
            <ul>
              {config.featureFlags.showInternalTools && <li>🛠️ Internal Tools</li>}
              {config.featureFlags.showDebugInfo && <li>🔍 Debug Information</li>}
              {config.featureFlags.enableAdvancedFeatures && <li>🚀 Advanced Features</li>}
              {config.featureFlags.showVersionSelector && <li>⚙️ Version Selector</li>}
            </ul>
          </div>
          
          <button 
            onClick={() => setShowVersionSelector(false)}
            className="close-dropdown-btn"
          >
            ✕ Close
          </button>
        </div>
      )}

      {/* Debug Panel */}
      {showDebugPanel && config.featureFlags.showDebugInfo && (
        <div className="debug-panel">
          <h3>🔍 Debug Information</h3>
          <div className="debug-grid">
            <div><strong>API Base:</strong> {config.api.baseUrl}</div>
            <div><strong>Ships Count:</strong> {ships.length}</div>
            <div><strong>Active Ship ID:</strong> {activeShip || 'None'}</div>
            <div><strong>Current Level:</strong> {level}</div>
            <div><strong>Total XP:</strong> {experience}</div>
            <div><strong>Rank:</strong> {rank}</div>
          </div>
          <button 
            onClick={() => setShowDebugPanel(false)}
            className="close-debug-btn"
          >
            ✕ Close Debug
          </button>
        </div>
      )}

      {/* Achievement Notifications */}
      {unlockedAchievements > 0 && (
        <div className="achievement-ticker">
          {achievements.filter(a => a.unlocked).slice(-3).map(achievement => (
            <div key={achievement.id} className="achievement-notification">
              🏆 {achievement.title}
            </div>
          ))}
        </div>
      )}

      {/* Branding Footer (Public Builds Only) */}
      {config.branding.showPoweredBy && (
        <div className="branding-footer">
          Powered by {config.branding.companyName}
        </div>
      )}
    </header>
  )
}

export default Header