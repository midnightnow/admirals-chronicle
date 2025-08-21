import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useChronicleStore } from '../stores/chronicleStore'
import './OpenBetaLanding.css'

const OpenBetaLanding: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { startOnboarding } = useChronicleStore()

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    
    try {
      // Try API first
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          source: 'landing',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
        // Auto-start onboarding after successful signup
        setTimeout(() => {
          startOnboarding()
        }, 2000)
      } else {
        throw new Error('API unavailable')
      }
    } catch (error) {
      // Fallback to mailto
      window.location.href = `mailto:hello@admiralschronicle.com?subject=Beta%20Access&body=Email:%20${email}`
      setSubmitStatus('success')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="landing-container">
      {/* Animated Background */}
      <div className="landing-background">
        <div className="stars"></div>
        <div className="ocean-gradient"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <div className="hero-badge">
            <span className="badge-text">🚀 Open Beta Launch</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Transform Programming Education</span>
            <span className="title-highlight">Through Consciousness Weaving</span>
          </h1>
          
          <p className="hero-subtitle">
            Learn operating systems through an epic journey guided by three AI personas. 
            Progress from cadet to consciousness commander in the most immersive educational 
            experience ever created.
          </p>

          {/* Waitlist Form */}
          <form onSubmit={handleWaitlistSubmit} className="waitlist-form">
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for beta access..."
                className="email-input"
                disabled={isSubmitting || submitStatus === 'success'}
                required
              />
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting || submitStatus === 'success'}
              >
                {isSubmitting ? 'Joining...' : 
                 submitStatus === 'success' ? '✓ Joined!' : 
                 'Join Beta'}
              </button>
            </div>
            
            {submitStatus === 'success' && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="success-message"
              >
                🎉 Welcome aboard, Admiral! Preparing your onboarding experience...
              </motion.p>
            )}
          </form>

          {/* Quick Start Option */}
          <div className="quick-start">
            <button 
              onClick={startOnboarding}
              className="explore-btn"
            >
              ⚓ Start Journey Now
            </button>
            <p className="explore-hint">No signup required - explore the platform immediately</p>
          </div>
        </motion.div>
      </section>

      {/* AI Personas Preview */}
      <section className="personas-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="personas-content"
        >
          <h2 className="section-title">Meet Your AI Mentors</h2>
          <p className="section-subtitle">
            Three distinct personalities guide your consciousness-weaving journey
          </p>
          
          <div className="personas-grid">
            <motion.div 
              className="persona-card ada"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="persona-avatar">🌸</div>
              <h3>Ada</h3>
              <p className="persona-role">Friendly Guide</p>
              <p className="persona-desc">
                Encouraging mentor who celebrates every breakthrough and makes 
                complex concepts accessible through warmth and analogies.
              </p>
            </motion.div>
            
            <motion.div 
              className="persona-card kernel"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="persona-avatar">⚙️</div>
              <h3>Kernel</h3>
              <p className="persona-role">Technical Navigator</p>
              <p className="persona-desc">
                Precise instructor focused on technical excellence, systematic 
                thinking, and mastery of operating system fundamentals.
              </p>
            </motion.div>
            
            <motion.div 
              className="persona-card sophia"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="persona-avatar">🌀</div>
              <h3>Sophia</h3>
              <p className="persona-role">Socratic Challenger</p>
              <p className="persona-desc">
                Philosophical guide who asks deep questions, connecting code 
                to consciousness and technical concepts to meaning.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Learning Journey */}
      <section className="journey-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="journey-content"
        >
          <h2 className="section-title">Your Consciousness-Weaving Journey</h2>
          <p className="section-subtitle">
            Progress through four phases of digital mastery
          </p>
          
          <div className="journey-phases">
            <div className="phase-card">
              <div className="phase-icon">🎓</div>
              <div className="phase-info">
                <h3>Academy</h3>
                <p>Master OS fundamentals through Unit 1: Introduction to Operating Systems</p>
              </div>
            </div>
            
            <div className="phase-arrow">→</div>
            
            <div className="phase-card">
              <div className="phase-icon">⚓</div>
              <div className="phase-info">
                <h3>Helm</h3>
                <p>Navigate increasingly complex challenges with your ship</p>
              </div>
            </div>
            
            <div className="phase-arrow">→</div>
            
            <div className="phase-card">
              <div className="phase-icon">🚢</div>
              <div className="phase-info">
                <h3>Command</h3>
                <p>Lead fleet operations and coordinate multiple systems</p>
              </div>
            </div>
            
            <div className="phase-arrow">→</div>
            
            <div className="phase-card">
              <div className="phase-icon">🧵</div>
              <div className="phase-info">
                <h3>Loom</h3>
                <p>Weave consciousness into digital reality itself</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="features-content"
        >
          <h2 className="section-title">Revolutionary Learning Experience</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Knowledge Graph</h3>
              <p>Interactive visualization of OS concepts with deep-dive explanations</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🧪</div>
              <h3>Code Coach</h3>
              <p>Hands-on challenges with progressive hints and real-time testing</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Tutoring</h3>
              <p>Three distinct personas adapt to your learning style</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Gamified Progress</h3>
              <p>XP system, achievements, and ship upgrades as you advance</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎬</div>
              <h3>Cinematic Onboarding</h3>
              <p>Epic animated experience that transforms learning into adventure</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Complete Curriculum</h3>
              <p>Unit 1 ready with more consciousness-weaving content coming</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="cta-content"
        >
          <h2 className="cta-title">Ready to Begin Your Journey?</h2>
          <p className="cta-subtitle">
            Join the consciousness-weaving revolution and transform how you learn programming
          </p>
          
          <div className="cta-actions">
            <button onClick={startOnboarding} className="cta-primary">
              🚀 Start Learning Now
            </button>
            <a href="https://github.com/midnightnow/admirals-chronicle" className="cta-secondary">
              ⭐ Star on GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p className="footer-brand">Admiral's Chronicle</p>
            <p className="footer-tagline">Consciousness-Weaving Education Platform</p>
          </div>
          
          <div className="footer-links">
            <a href="mailto:hello@admiralschronicle.com?subject=Bug%20Report">Report Bug</a>
            <a href="https://github.com/midnightnow/admirals-chronicle">GitHub</a>
            <span className="footer-version">v1.0.0 • Beta</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default OpenBetaLanding