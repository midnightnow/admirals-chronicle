import React, { useState, useEffect } from 'react'
import './AITutor.css'

interface TutorMessage {
  id: string
  persona: 'ada' | 'kernel' | 'sophia'
  type: 'greeting' | 'explanation' | 'question' | 'encouragement' | 'challenge'
  content: string
  timestamp: Date
}

interface TutorPersona {
  id: 'ada' | 'kernel' | 'sophia'
  name: string
  role: string
  avatar: string
  personality: string
  color: string
}

const tutorPersonas: TutorPersona[] = [
  {
    id: 'ada',
    name: 'Ada',
    role: 'Friendly Guide',
    avatar: '🌸',
    personality: 'Encouraging, supportive, celebrates every breakthrough',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'kernel',
    name: 'Kernel',
    role: 'Technical Navigator', 
    avatar: '⚙️',
    personality: 'Precise, methodical, focuses on technical excellence',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'sophia',
    name: 'Sophia',
    role: 'Socratic Challenger',
    avatar: '🌀', 
    personality: 'Philosophical, thought-provoking, asks deep questions',
    color: 'from-purple-500 to-indigo-600'
  }
]

const unit1Dialogues: { [key: string]: TutorMessage[] } = {
  introduction: [
    {
      id: 'ada-intro-1',
      persona: 'ada',
      type: 'greeting',
      content: "Welcome to Unit 1, Cadet! I'm so excited to guide you through your first steps into the world of operating systems. Think of this as our foundation-building phase - every great commander needs to understand how their ship works from the inside out!",
      timestamp: new Date()
    },
    {
      id: 'kernel-intro-1', 
      persona: 'kernel',
      type: 'explanation',
      content: "Cadet, you stand at the threshold of understanding digital machinery. We will dissect four fundamental components: the Kernel (command center), Processes (active crew), Memory Management (resource allocation), and Shell (communication interface). Precision in these concepts is non-negotiable.",
      timestamp: new Date()
    },
    {
      id: 'sophia-intro-1',
      persona: 'sophia',
      type: 'question',
      content: "Before we dive into technical details, consider this: What is the relationship between consciousness and computation? When you type a command, who is truly listening - the machine, or the layers of abstraction we've created? Keep this question in mind as we explore.",
      timestamp: new Date()
    }
  ],
  kernelExploration: [
    {
      id: 'ada-kernel-1',
      persona: 'ada', 
      type: 'explanation',
      content: "Let's start with the kernel - think of it as the heart of your digital ship! It's always running, always managing resources, always making sure everything works smoothly. Just like how a good captain coordinates the entire crew without micromanaging every task.",
      timestamp: new Date()
    },
    {
      id: 'kernel-kernel-1',
      persona: 'kernel',
      type: 'explanation', 
      content: "The kernel operates in privileged mode with direct hardware access. It handles interrupts, manages the scheduler, enforces memory protection, and provides system calls. Every operation flows through the kernel's oversight - no exceptions.",
      timestamp: new Date()
    },
    {
      id: 'sophia-kernel-1',
      persona: 'sophia',
      type: 'question',
      content: "Here's a thought experiment: If the kernel has absolute power over the system, what prevents it from becoming a tyrant? How does this balance of power reflect in human organizations?",
      timestamp: new Date()
    }
  ],
  processDiscovery: [
    {
      id: 'ada-process-1',
      persona: 'ada',
      type: 'explanation', 
      content: "Processes are like crew members brought to life! Each one has a specific job, their own workspace (memory), and a set of instructions to follow. They can talk to each other, share resources, and work together to get things done.",
      timestamp: new Date()
    },
    {
      id: 'kernel-process-1',
      persona: 'kernel',
      type: 'explanation',
      content: "A process consists of: program counter, stack pointer, data section, heap, and process control block. The scheduler determines execution order using algorithms like round-robin, priority-based, or completely fair scheduling.",
      timestamp: new Date()
    },
    {
      id: 'sophia-process-1', 
      persona: 'sophia',
      type: 'question',
      content: "When does a program become a process? Is it the moment of creation, or the first instruction executed? Does this distinction matter philosophically - when does potential become actual?",
      timestamp: new Date()
    }
  ],
  memoryMastery: [
    {
      id: 'ada-memory-1',
      persona: 'ada',
      type: 'explanation',
      content: "Memory management is like organizing the perfect library! Every piece of information has its place, and the system knows exactly where to find everything. It's beautiful how efficiently modern systems can juggle thousands of processes in memory.",
      timestamp: new Date()
    },
    {
      id: 'kernel-memory-1',
      persona: 'kernel', 
      type: 'explanation',
      content: "Virtual memory creates an abstraction layer. Each process sees a linear address space, but the MMU translates to physical addresses. Page tables, TLBs, and caching hierarchies optimize this translation for performance.",
      timestamp: new Date()
    },
    {
      id: 'sophia-memory-1',
      persona: 'sophia',
      type: 'question', 
      content: "Memory is temporary, yet it holds our digital consciousness. When a process dies, where does its 'experience' go? Are we creating and destroying digital souls with every program execution?",
      timestamp: new Date()
    }
  ],
  shellInterface: [
    {
      id: 'ada-shell-1',
      persona: 'ada',
      type: 'explanation',
      content: "The shell is your communication bridge with the system! It's like having a universal translator that understands both human language and machine commands. Every command you type gets transformed into something the kernel can understand.",
      timestamp: new Date()
    },
    {
      id: 'kernel-shell-1',
      persona: 'kernel',
      type: 'explanation', 
      content: "Shell interpreters parse input, resolve commands via PATH, handle I/O redirection, manage pipes, and execute system calls. Each shell (bash, zsh, fish) implements these core functions with varying features and optimizations.",
      timestamp: new Date()
    },
    {
      id: 'sophia-shell-1',
      persona: 'sophia',
      type: 'question',
      content: "The shell interprets our intentions into machine actions. But who interprets the shell's interpretations? How many layers of meaning exist between human thought and silicon execution?",
      timestamp: new Date()
    }
  ],
  encouragement: [
    {
      id: 'ada-encourage-1',
      persona: 'ada',
      type: 'encouragement',
      content: "You're doing amazingly well! Every concept you master brings you closer to true digital fluency. Remember, even the most experienced admirals started exactly where you are now. Keep going!",
      timestamp: new Date()
    },
    {
      id: 'kernel-encourage-1',
      persona: 'kernel',
      type: 'encouragement',
      content: "Your technical progression is satisfactory. Continue applying systematic thinking to these concepts. Mastery comes through repetition, testing, and gradual complexity increases.",
      timestamp: new Date()
    },
    {
      id: 'sophia-encourage-1', 
      persona: 'sophia',
      type: 'encouragement',
      content: "The questions you're asking show deep thinking. Don't seek just answers - seek better questions. The path to wisdom is paved with curiosity and wonder.",
      timestamp: new Date()
    }
  ]
}

const AITutor: React.FC = () => {
  const [activePersona, setActivePersona] = useState<'ada' | 'kernel' | 'sophia'>('ada')
  const [currentTopic, setCurrentTopic] = useState<string>('introduction')
  const [messages, setMessages] = useState<TutorMessage[]>([])
  const [isTyping, setIsTyping] = useState<boolean>(false)

  useEffect(() => {
    // Load messages for current topic
    const topicMessages = unit1Dialogues[currentTopic] || []
    setMessages(topicMessages)
  }, [currentTopic])

  const switchPersona = (persona: 'ada' | 'kernel' | 'sophia') => {
    setActivePersona(persona)
    setIsTyping(true)
    
    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const changeTopic = (topic: string) => {
    setCurrentTopic(topic)
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
    }, 1500)
  }

  const getPersona = (id: 'ada' | 'kernel' | 'sophia') => 
    tutorPersonas.find(p => p.id === id)!

  const getCurrentPersonaMessage = () => {
    const currentMessages = messages.filter(m => m.persona === activePersona)
    return currentMessages.length > 0 ? currentMessages[0] : null
  }

  const currentPersona = getPersona(activePersona)
  const currentMessage = getCurrentPersonaMessage()

  return (
    <div className="ai-tutor-container">
      <div className="tutor-header">
        <h2>🤖 AI Tutoring Session: Unit 1 - Operating Systems</h2>
        <p className="session-description">
          Learn from three distinct AI personas, each offering unique perspectives on operating system concepts
        </p>
      </div>

      {/* Topic Navigation */}
      <div className="topic-navigation">
        <h3>📚 Learning Topics</h3>
        <div className="topic-buttons">
          {Object.keys(unit1Dialogues).map(topic => (
            <button
              key={topic}
              className={`topic-btn ${currentTopic === topic ? 'active' : ''}`}
              onClick={() => changeTopic(topic)}
            >
              {topic.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Persona Selector */}
      <div className="persona-selector">
        <h3>👥 Choose Your AI Tutor</h3>
        <div className="persona-cards">
          {tutorPersonas.map(persona => (
            <button
              key={persona.id}
              className={`persona-card ${activePersona === persona.id ? 'active' : ''}`}
              onClick={() => switchPersona(persona.id)}
            >
              <div className={`persona-avatar bg-gradient-to-br ${persona.color}`}>
                {persona.avatar}
              </div>
              <div className="persona-info">
                <h4>{persona.name}</h4>
                <p className="persona-role">{persona.role}</p>
                <p className="persona-personality">{persona.personality}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Area */}
      <div className="conversation-area">
        {isTyping ? (
          <div className="typing-indicator">
            <div className={`typing-avatar bg-gradient-to-br ${currentPersona.color}`}>
              {currentPersona.avatar}
            </div>
            <div className="typing-bubble">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        ) : currentMessage ? (
          <div className="message-container">
            <div className="message active-message">
              <div className={`message-avatar bg-gradient-to-br ${currentPersona.color}`}>
                {currentPersona.avatar}
              </div>
              <div className="message-bubble">
                <div className="message-header">
                  <span className="message-name">{currentPersona.name}</span>
                  <span className="message-role">{currentPersona.role}</span>
                  <span className={`message-type ${currentMessage.type}`}>
                    {currentMessage.type}
                  </span>
                </div>
                <div className="message-content">
                  {currentMessage.content}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-message">
            <p>Select a topic to begin learning with your AI tutors!</p>
          </div>
        )}

        {/* All Messages for Current Topic */}
        {messages.length > 0 && !isTyping && (
          <div className="all-messages">
            <h4>💭 All Perspectives on This Topic</h4>
            <div className="message-thread">
              {messages.map(message => {
                const persona = getPersona(message.persona)
                return (
                  <div 
                    key={message.id} 
                    className={`thread-message ${message.persona} ${activePersona === message.persona ? 'highlighted' : ''}`}
                  >
                    <div className={`thread-avatar bg-gradient-to-br ${persona.color}`}>
                      {persona.avatar}
                    </div>
                    <div className="thread-content">
                      <div className="thread-header">
                        <span className="thread-name">{persona.name}</span>
                        <span className={`thread-type ${message.type}`}>
                          {message.type}
                        </span>
                      </div>
                      <p className="thread-text">{message.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Tutor Insights */}
      <div className="tutor-insights">
        <h3>🧠 Key Learning Insights</h3>
        <div className="insight-cards">
          <div className="insight-card ada">
            <div className="insight-header">
              <span className="insight-avatar">🌸</span>
              <span>Ada's Approach</span>
            </div>
            <p>Makes complex concepts accessible through relatable analogies and encouragement</p>
          </div>
          <div className="insight-card kernel">
            <div className="insight-header">
              <span className="insight-avatar">⚙️</span>
              <span>Kernel's Method</span>
            </div>
            <p>Provides precise technical details and systematic understanding</p>
          </div>
          <div className="insight-card sophia">
            <div className="insight-header">
              <span className="insight-avatar">🌀</span>
              <span>Sophia's Philosophy</span>
            </div>
            <p>Challenges assumptions and connects technical concepts to deeper meaning</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AITutor