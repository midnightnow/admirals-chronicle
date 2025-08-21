// Admiral's Chronicle - Unit 1: Introduction to Operating Systems
// Knowledge Graph: Complete concept mapping with relationships

export interface Concept {
  id: string
  title: string
  description: string
  category: 'fundamental' | 'component' | 'interface' | 'abstraction'
  complexity: 1 | 2 | 3 | 4 | 5
  prerequisites: string[]
  learningObjectives: string[]
  realWorldExamples: string[]
  commonMisconceptions: string[]
  keyInsights: string[]
}

export interface Relationship {
  from: string
  to: string
  type: 'contains' | 'manages' | 'communicates_with' | 'depends_on' | 'implements' | 'abstracts'
  strength: 1 | 2 | 3 | 4 | 5
  description: string
  bidirectional: boolean
}

// Core OS Concepts for Unit 1
export const unit1Concepts: Concept[] = [
  {
    id: 'kernel',
    title: 'Kernel',
    description: 'The core component of an operating system that manages system resources and provides fundamental services to all other programs.',
    category: 'fundamental',
    complexity: 4,
    prerequisites: [],
    learningObjectives: [
      'Understand the kernel as the bridge between hardware and software',
      'Identify kernel responsibilities: memory, processes, devices, system calls',
      'Distinguish between kernel mode and user mode execution',
      'Recognize different kernel architectures (monolithic, microkernel, hybrid)'
    ],
    realWorldExamples: [
      'Linux kernel managing your web browser\'s memory allocation',
      'Windows NT kernel handling file system operations',
      'macOS kernel (XNU) coordinating between your apps and hardware',
      'Android kernel managing smartphone sensors and battery'
    ],
    commonMisconceptions: [
      'The kernel IS the operating system (it\'s just the core component)',
      'All kernels work the same way (different architectures exist)',
      'The kernel runs applications (it provides services FOR applications)',
      'Users directly interact with the kernel (they interact through interfaces)'
    ],
    keyInsights: [
      'The kernel is like a ship\'s engine room - invisible but essential',
      'Kernel mode vs user mode is like restricted bridge access on a naval vessel',
      'System calls are the communication protocol between user programs and kernel',
      'Kernel design affects entire system performance and security'
    ]
  },
  
  {
    id: 'process',
    title: 'Process',
    description: 'A running instance of a program, containing the program code, data, and execution context managed by the operating system.',
    category: 'abstraction',
    complexity: 3,
    prerequisites: ['kernel'],
    learningObjectives: [
      'Define a process as an abstraction of a running program',
      'Identify process components: code, data, stack, heap, PCB',
      'Understand process states and state transitions',
      'Explain process creation, execution, and termination lifecycle'
    ],
    realWorldExamples: [
      'Each browser tab running as a separate process',
      'Your text editor maintaining document state while running',
      'Background processes like antivirus scanners',
      'Multiple instances of the same application (like multiple terminals)'
    ],
    commonMisconceptions: [
      'Process and program are the same thing (program is static, process is dynamic)',
      'Only one process can run at a time (modern systems multitask)',
      'Processes can directly access each other\'s memory (isolation is enforced)',
      'Process creation is instantaneous (it involves significant system overhead)'
    ],
    keyInsights: [
      'Processes are like individual crew members with specific assigned duties',
      'Process isolation prevents one misbehaving program from crashing others',
      'Context switching allows illusion of simultaneous execution',
      'Process scheduling determines system responsiveness and fairness'
    ]
  },
  
  {
    id: 'memory_management',
    title: 'Memory Management',
    description: 'The system responsible for allocating, tracking, and reclaiming memory resources for processes while ensuring isolation and efficient utilization.',
    category: 'component',
    complexity: 4,
    prerequisites: ['kernel', 'process'],
    learningObjectives: [
      'Understand physical vs virtual memory addressing',
      'Explain memory allocation strategies and fragmentation',
      'Describe paging and segmentation mechanisms',
      'Identify memory protection and sharing techniques'
    ],
    realWorldExamples: [
      'Web browser requesting more RAM for a complex webpage',
      'Video game loading textures into graphics memory',
      'Virtual machines sharing physical RAM between multiple OS instances',
      'Memory-mapped files allowing direct file access through memory'
    ],
    commonMisconceptions: [
      'More RAM always means better performance (depends on usage patterns)',
      'Virtual memory is just extra storage (it\'s an addressing abstraction)',
      'Memory is automatically cleaned up (garbage collection varies by language)',
      'All memory access has the same speed (cache levels create hierarchy)'
    ],
    keyInsights: [
      'Memory management is like organizing a ship\'s storage compartments',
      'Virtual memory allows programs to think they have more RAM than exists',
      'Memory fragmentation is like having scattered empty storage spaces',
      'Memory protection ensures processes can\'t interfere with each other'
    ]
  },
  
  {
    id: 'shell',
    title: 'Shell',
    description: 'A command-line interface that provides users with a way to interact with the operating system by interpreting and executing commands.',
    category: 'interface',
    complexity: 2,
    prerequisites: ['kernel', 'process'],
    learningObjectives: [
      'Define the shell as a user interface to the operating system',
      'Understand command parsing, execution, and I/O redirection',
      'Explain shell scripting and automation capabilities',
      'Identify different shell types and their characteristics'
    ],
    realWorldExamples: [
      'Terminal commands like `ls`, `cd`, `mkdir` for file operations',
      'Bash scripts automating system administration tasks',
      'PowerShell managing Windows system configuration',
      'Shell pipelines combining multiple commands with |'
    ],
    commonMisconceptions: [
      'The shell IS the operating system (it\'s just an interface)',
      'All shells work identically (different shells have different features)',
      'Shell commands directly control hardware (they make system calls)',
      'Command-line interfaces are obsolete (they\'re powerful and efficient)'
    ],
    keyInsights: [
      'The shell is like the ship\'s bridge where officers give navigation orders',
      'Shell commands are translated into system calls to the kernel',
      'Pipes and redirection enable powerful command composition',
      'Shell scripting turns interactive commands into reusable automation'
    ]
  }
]

// Relationships between Unit 1 concepts
export const unit1Relationships: Relationship[] = [
  {
    from: 'kernel',
    to: 'process',
    type: 'manages',
    strength: 5,
    description: 'The kernel creates, schedules, and terminates processes, maintaining their execution context and enforcing isolation.',
    bidirectional: false
  },
  
  {
    from: 'kernel',
    to: 'memory_management',
    type: 'implements',
    strength: 5,
    description: 'The kernel implements memory management algorithms, handling virtual memory, paging, and memory protection.',
    bidirectional: false
  },
  
  {
    from: 'process',
    to: 'memory_management',
    type: 'depends_on',
    strength: 4,
    description: 'Processes require memory allocation and management services to store code, data, and execution state.',
    bidirectional: false
  },
  
  {
    from: 'shell',
    to: 'kernel',
    type: 'communicates_with',
    strength: 4,
    description: 'The shell makes system calls to the kernel to execute commands and access system services.',
    bidirectional: false
  },
  
  {
    from: 'shell',
    to: 'process',
    type: 'manages',
    strength: 3,
    description: 'The shell creates and manages child processes when executing commands and scripts.',
    bidirectional: false
  },
  
  {
    from: 'memory_management',
    to: 'process',
    type: 'contains',
    strength: 3,
    description: 'Memory management systems track which memory regions belong to which processes.',
    bidirectional: false
  }
]

// Learning progression for Unit 1
export const unit1LearningPath = {
  unitId: 'unit1-intro-os',
  title: 'Unit 1: Introduction to Operating Systems',
  description: 'Master the fundamental concepts that govern all digital systems through interactive exploration of kernel, processes, memory, and shell.',
  estimatedDuration: '45-60 minutes',
  prerequisites: ['Basic programming knowledge', 'Familiarity with computers'],
  learningSequence: [
    {
      phase: 'foundation',
      concepts: ['kernel'],
      description: 'Understand the kernel as the system\'s foundation'
    },
    {
      phase: 'abstraction',
      concepts: ['process'],
      description: 'Learn how programs become running processes'
    },
    {
      phase: 'resource_management',
      concepts: ['memory_management'],
      description: 'Explore how memory is allocated and protected'
    },
    {
      phase: 'interaction',
      concepts: ['shell'],
      description: 'Master command-line interface and system interaction'
    }
  ],
  assessmentCriteria: [
    'Can explain the role of each core OS component',
    'Understands the relationships between kernel, processes, memory, and shell',
    'Can identify real-world examples of each concept in action',
    'Successfully implements basic echo command challenge'
  ]
}

// Export all knowledge graph data
export const unit1KnowledgeGraph = {
  concepts: unit1Concepts,
  relationships: unit1Relationships,
  learningPath: unit1LearningPath
}