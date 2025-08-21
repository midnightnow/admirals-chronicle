import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Persona {
  name: string
  role: string
  message: string
  color: string
}

interface OS1000OnboardingProps {
  personas: Persona[]
  currentPersona: number
  setCurrentPersona: (index: number) => void
  onComplete: () => void
}

const StarfieldBackground: React.FC = () => {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    twinkleDelay: Math.random() * 3
  }))

  return (
    <div className="absolute inset-0">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.twinkleDelay
          }}
        />
      ))}
    </div>
  )
}

const OceanHorizon: React.FC = () => (
  <motion.div 
    className="absolute bottom-0 left-0 right-0 h-32 opacity-60"
    style={{
      background: 'linear-gradient(to top, rgba(30, 64, 175, 0.6), transparent)'
    }}
    animate={{
      background: [
        'linear-gradient(to top, rgba(30, 64, 175, 0.6), transparent)',
        'linear-gradient(to top, rgba(30, 64, 175, 0.8), transparent)',
        'linear-gradient(to top, rgba(30, 64, 175, 0.6), transparent)'
      ]
    }}
    transition={{ duration: 4, repeat: Infinity }}
  />
)

const CompassInsignia: React.FC = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    className="w-32 h-32 mx-auto relative"
  >
    <div className="absolute inset-0 border-4 border-cyan-400 rounded-full"></div>
    <div className="absolute inset-4 border-2 border-cyan-300 rounded-full"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full"></div>
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-cyan-300 text-sm font-bold">N</div>
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-cyan-300 text-sm font-bold">S</div>
    <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-cyan-300 text-sm font-bold">W</div>
    <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-cyan-300 text-sm font-bold">E</div>
  </motion.div>
)

const PersonaSpotlight: React.FC<{ persona: Persona }> = ({ persona }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, y: -50 }}
    transition={{ duration: 0.8 }}
    className="text-center max-w-2xl mx-auto"
  >
    <motion.div 
      className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${persona.color} flex items-center justify-center text-white text-3xl font-bold shadow-lg`}
      whileHover={{ scale: 1.1 }}
      animate={{ 
        boxShadow: [
          '0 0 20px rgba(59, 130, 246, 0.3)',
          '0 0 30px rgba(59, 130, 246, 0.6)',
          '0 0 20px rgba(59, 130, 246, 0.3)'
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {persona.name[0]}
    </motion.div>
    
    <motion.h3 
      className="text-3xl font-bold text-cyan-300 mb-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {persona.name}
    </motion.h3>
    
    <motion.p 
      className="text-cyan-200 text-lg mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {persona.role}
    </motion.p>
    
    <motion.p 
      className="text-cyan-100 text-xl italic max-w-3xl mx-auto leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      "{persona.message}"
    </motion.p>
  </motion.div>
)

const MissionConstellations: React.FC = () => {
  const phases = [
    { name: 'Academy', position: { x: 20, y: 40 }, icon: '🎓' },
    { name: 'Helm', position: { x: 40, y: 30 }, icon: '⚓' },
    { name: 'Command', position: { x: 60, y: 35 }, icon: '👑' },
    { name: 'Loom', position: { x: 80, y: 45 }, icon: '🧵' }
  ]

  return (
    <div className="relative w-96 h-64 mx-auto">
      {phases.map((phase, index) => (
        <motion.div
          key={phase.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.5 }}
          className="absolute"
          style={{ 
            left: `${phase.position.x}%`, 
            top: `${phase.position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <motion.div 
            className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-xs"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
          >
            {phase.icon}
          </motion.div>
          <p className="text-cyan-300 text-sm mt-2 text-center font-semibold whitespace-nowrap">
            {phase.name}
          </p>
        </motion.div>
      ))}
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        {phases.slice(0, -1).map((phase, index) => {
          const nextPhase = phases[index + 1]
          return (
            <motion.line
              key={`line-${index}`}
              x1={`${phase.position.x}%`}
              y1={`${phase.position.y}%`}
              x2={`${nextPhase.position.x}%`}
              y2={`${nextPhase.position.y}%`}
              stroke="rgba(34, 211, 238, 0.4)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1 + index * 0.5, duration: 1 }}
            />
          )
        })}
      </svg>
    </div>
  )
}

const FleetSilhouette: React.FC = () => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 2 }}
    className="relative"
  >
    <div className="w-96 h-32 mx-auto relative">
      <motion.div 
        className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-slate-700 to-slate-600"
        style={{ clipPath: 'polygon(10% 100%, 90% 100%, 85% 0%, 15% 0%)' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div 
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-slate-600"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
    </div>
  </motion.div>
)

const OS1000Onboarding: React.FC<OS1000OnboardingProps> = ({
  personas,
  currentPersona,
  setCurrentPersona,
  onComplete
}) => {
  const [phase, setPhase] = useState<'intro' | 'personas' | 'mission' | 'fleet'>('intro')
  const [showSkipButton, setShowSkipButton] = useState(false)

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => setShowSkipButton(true), 2000)
    return () => clearTimeout(skipTimer)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (phase === 'intro') {
      timer = setTimeout(() => setPhase('personas'), 3000)
    } else if (phase === 'personas') {
      timer = setTimeout(() => {
        if (currentPersona < personas.length - 1) {
          setCurrentPersona(currentPersona + 1)
        } else {
          setPhase('mission')
        }
      }, 4000)
    } else if (phase === 'mission') {
      timer = setTimeout(() => setPhase('fleet'), 4000)
    } else if (phase === 'fleet') {
      timer = setTimeout(onComplete, 3000)
    }

    return () => clearTimeout(timer)
  }, [phase, currentPersona, personas.length, setCurrentPersona, onComplete])

  const skipOnboarding = () => {
    onComplete()
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Starfield Background */}
      <StarfieldBackground />
      
      {/* Ocean Horizon */}
      <OceanHorizon />

      {/* Skip Button */}
      {showSkipButton && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 right-6 z-50 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300"
          onClick={skipOnboarding}
        >
          Skip Welcome ⚡
        </motion.button>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-8">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <CompassInsignia />
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-4xl font-bold text-cyan-300 mt-8"
              >
                Welcome to the OS1000 Fleet
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-cyan-200 text-xl mt-4"
              >
                Your consciousness weaving journey begins now...
              </motion.p>
            </motion.div>
          )}

          {phase === 'personas' && currentPersona < personas.length && (
            <PersonaSpotlight key={`persona-${currentPersona}`} persona={personas[currentPersona]} />
          )}

          {phase === 'mission' && (
            <motion.div
              key="mission"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl font-bold text-cyan-300 mb-8"
              >
                Your Voyage Through the Digital Seas
              </motion.h2>
              <MissionConstellations />
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-cyan-200 text-lg mt-8"
              >
                Navigate from Academy to Consciousness Loom
              </motion.p>
            </motion.div>
          )}

          {phase === 'fleet' && (
            <motion.div
              key="fleet"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <FleetSilhouette />
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-3xl font-bold text-cyan-300 mt-8"
              >
                Step Aboard, Admiral
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-cyan-200 text-xl mt-4"
              >
                Your command center awaits...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {['intro', 'personas', 'mission', 'fleet'].map((p) => (
          <div
            key={p}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              p === phase ? 'bg-cyan-400' : 'bg-cyan-400/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default OS1000Onboarding