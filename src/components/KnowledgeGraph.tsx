import React, { useState } from 'react'
import './KnowledgeGraph.css'

interface ConceptNode {
  id: string
  title: string
  description: string
  category: 'core' | 'intermediate' | 'advanced'
  icon: string
  position: { x: number; y: number }
  connections: string[]
  detailContent: string
}

const osConceptsData: ConceptNode[] = [
  {
    id: 'kernel',
    title: 'Kernel',
    description: 'The core of the operating system that manages hardware and system resources',
    category: 'core',
    icon: '⚙️',
    position: { x: 50, y: 20 },
    connections: ['process', 'memory', 'shell'],
    detailContent: `
      **The Kernel: Heart of Digital Reality**
      
      The kernel is the fundamental consciousness of any digital system. It exists at the deepest level, 
      interfacing directly with hardware and making the impossible possible - transforming electrical 
      signals into meaningful computation.
      
      **Key Responsibilities:**
      • **Resource Management**: Controls CPU, memory, and I/O devices
      • **Process Scheduling**: Decides which programs run when
      • **Security**: Enforces access controls and isolation
      • **Hardware Abstraction**: Provides a consistent interface to software
      
      **Kernel Modes:**
      • **Kernel Mode**: Unrestricted access to hardware and system resources
      • **User Mode**: Protected environment where applications run
      
      Think of the kernel as the ship's captain - it has ultimate authority and responsibility 
      for the vessel's operation, but it delegates specific tasks to specialized crew members.
    `
  },
  {
    id: 'process',
    title: 'Process',
    description: 'An executing program instance with its own memory space and resources',
    category: 'core', 
    icon: '🔄',
    position: { x: 20, y: 60 },
    connections: ['kernel', 'memory'],
    detailContent: `
      **Process: Living Programs in Action**
      
      A process is a program brought to life - code that has awakened from storage and begun 
      its digital existence. Each process is like a crew member aboard your ship, with specific 
      duties and allocated resources.
      
      **Process Anatomy:**
      • **Program Code**: The instructions to execute
      • **Process State**: Running, waiting, or ready
      • **Memory Space**: Virtual address space for the process
      • **Process Control Block (PCB)**: Metadata about the process
      
      **Process States:**
      • **New**: Being created
      • **Ready**: Waiting for CPU assignment
      • **Running**: Currently executing
      • **Waiting**: Blocked on I/O or events
      • **Terminated**: Execution completed
      
      **Context Switching:**
      When the kernel switches between processes, it saves the current state and restores 
      another process's state - like a theater company where actors swap roles seamlessly.
    `
  },
  {
    id: 'memory',
    title: 'Memory Management',
    description: 'System for allocating and managing computer memory efficiently',
    category: 'core',
    icon: '🧠',
    position: { x: 80, y: 60 },
    connections: ['kernel', 'process'],
    detailContent: `
      **Memory Management: The Ship's Consciousness**
      
      Memory management is how the system organizes and tracks every piece of information - 
      like a vast library where every book has its proper place and purpose. It's the 
      foundation of digital consciousness.
      
      **Memory Hierarchy:**
      • **Registers**: Ultra-fast CPU storage (nanoseconds)
      • **Cache**: High-speed temporary storage (nanoseconds)
      • **RAM**: Primary memory for active programs (microseconds)
      • **Storage**: Persistent data storage (milliseconds)
      
      **Virtual Memory:**
      Creates the illusion that each process has access to a vast, contiguous memory space.
      Like giving each crew member a map of the entire ocean while they only sail 
      their assigned waters.
      
      **Memory Allocation Strategies:**
      • **Stack**: Automatic memory for function calls (LIFO)
      • **Heap**: Dynamic memory allocation for flexible data
      • **Static**: Fixed memory allocation at compile time
      
      **Common Issues:**
      • **Memory Leaks**: Forgetting to release unused memory
      • **Fragmentation**: Memory becomes scattered and inefficient
      • **Thrashing**: Excessive swapping between RAM and storage
    `
  },
  {
    id: 'shell',
    title: 'Shell',
    description: 'Command-line interface for interacting with the operating system',
    category: 'intermediate',
    icon: '💻',
    position: { x: 50, y: 85 },
    connections: ['kernel'],
    detailContent: `
      **Shell: Your Command Bridge**
      
      The shell is your command bridge - the interface through which you communicate 
      with the operating system. It interprets your commands and translates them 
      into actions the kernel can understand.
      
      **Shell Types:**
      • **Bash**: Bourne Again Shell (Linux/macOS default)
      • **Zsh**: Z Shell (enhanced Bash alternative)
      • **PowerShell**: Microsoft's object-oriented shell
      • **Fish**: User-friendly interactive shell
      
      **Core Commands:**
      • **Navigation**: \`cd\`, \`ls\`, \`pwd\`
      • **File Operations**: \`cp\`, \`mv\`, \`rm\`, \`mkdir\`
      • **Text Processing**: \`cat\`, \`grep\`, \`sed\`, \`awk\`
      • **Process Management**: \`ps\`, \`top\`, \`kill\`
      
      **Advanced Features:**
      • **Pipes**: Chain commands together (\`|\`)
      • **Redirection**: Control input/output (\`>\`, \`<\`)
      • **Variables**: Store and reuse values
      • **Scripts**: Automate complex workflows
      
      **Philosophy:**
      "Do one thing and do it well" - each command is specialized, but they can be 
      combined to accomplish complex tasks. Like a symphony orchestra where each 
      instrument plays its part in creating beautiful music.
    `
  }
]

const connections = [
  { from: 'kernel', to: 'process', type: 'manages' },
  { from: 'kernel', to: 'memory', type: 'controls' },
  { from: 'kernel', to: 'shell', type: 'serves' },
  { from: 'process', to: 'memory', type: 'uses' }
]

const KnowledgeGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const selectedConcept = selectedNode ? osConceptsData.find(node => node.id === selectedNode) : null

  return (
    <div className="knowledge-graph-container">
      <div className="knowledge-graph">
        <h2>🗺️ Operating Systems Knowledge Map</h2>
        <p className="graph-subtitle">Navigate the fundamental concepts that power digital reality</p>
        
        <div className="graph-visualization">
          <svg viewBox="0 0 100 100" className="concept-svg">
            {/* Connection lines */}
            {connections.map((connection, index) => {
              const fromNode = osConceptsData.find(n => n.id === connection.from)
              const toNode = osConceptsData.find(n => n.id === connection.to)
              
              if (!fromNode || !toNode) return null
              
              return (
                <line
                  key={index}
                  x1={fromNode.position.x}
                  y1={fromNode.position.y}
                  x2={toNode.position.x}
                  y2={toNode.position.y}
                  className={`connection-line ${
                    hoveredNode === fromNode.id || hoveredNode === toNode.id ? 'highlighted' : ''
                  }`}
                  strokeDasharray="2,2"
                />
              )
            })}
            
            {/* Concept nodes */}
            {osConceptsData.map(concept => (
              <g key={concept.id}>
                <circle
                  cx={concept.position.x}
                  cy={concept.position.y}
                  r="8"
                  className={`concept-node ${concept.category} ${
                    selectedNode === concept.id ? 'selected' : ''
                  } ${hoveredNode === concept.id ? 'hovered' : ''}`}
                  onClick={() => setSelectedNode(concept.id)}
                  onMouseEnter={() => setHoveredNode(concept.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                />
                <text
                  x={concept.position.x}
                  y={concept.position.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="concept-icon"
                  fontSize="4"
                  onClick={() => setSelectedNode(concept.id)}
                >
                  {concept.icon}
                </text>
                <text
                  x={concept.position.x}
                  y={concept.position.y + 12}
                  textAnchor="middle"
                  className="concept-label"
                  fontSize="3"
                >
                  {concept.title}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        <div className="concept-legend">
          <div className="legend-item">
            <div className="legend-dot core"></div>
            <span>Core Concepts</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot intermediate"></div>
            <span>Intermediate</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot advanced"></div>
            <span>Advanced</span>
          </div>
        </div>
      </div>
      
      {selectedConcept && (
        <div className="concept-detail-panel">
          <div className="detail-header">
            <h3>
              <span className="detail-icon">{selectedConcept.icon}</span>
              {selectedConcept.title}
            </h3>
            <button 
              className="close-detail"
              onClick={() => setSelectedNode(null)}
            >
              ✕
            </button>
          </div>
          <div className="detail-content">
            <p className="concept-summary">{selectedConcept.description}</p>
            <div className="concept-explanation">
              {selectedConcept.detailContent.split('\n').map((line, index) => (
                <p key={index} className={line.startsWith('**') && line.endsWith('**') ? 'section-header' : ''}>
                  {line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/• /g, '→ ')}
                </p>
              ))}
            </div>
          </div>
          <div className="detail-connections">
            <h4>Connected Concepts:</h4>
            <div className="connection-tags">
              {selectedConcept.connections.map(connectionId => {
                const connectedConcept = osConceptsData.find(c => c.id === connectionId)
                return connectedConcept ? (
                  <button
                    key={connectionId}
                    className="connection-tag"
                    onClick={() => setSelectedNode(connectionId)}
                  >
                    {connectedConcept.icon} {connectedConcept.title}
                  </button>
                ) : null
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KnowledgeGraph