// Admiral's Chronicle - AI Tutor Dialogue System
// Complete scripted conversations for Unit 1: Introduction to Operating Systems

export interface DialogueNode {
  id: string
  persona: 'ada' | 'kernel' | 'sophia'
  type: 'greeting' | 'concept_intro' | 'explanation' | 'question' | 'encouragement' | 'challenge_intro' | 'reflection'
  message: string
  responses?: DialogueResponse[]
  nextNode?: string
  triggers?: DialogueTrigger[]
  metadata?: {
    concept?: string
    emotionalTone?: 'supportive' | 'challenging' | 'analytical' | 'encouraging'
    visualCues?: string[]
  }
}

export interface DialogueResponse {
  id: string
  text: string
  nextNode: string
  learningImpact: 'positive' | 'neutral' | 'exploratory'
}

export interface DialogueTrigger {
  condition: 'time_elapsed' | 'concept_completion' | 'struggle_detected' | 'success_achieved'
  threshold?: number
  nextNode: string
}

// Ada's Dialogue Tree - Friendly Guide Persona
export const adaDialogues: DialogueNode[] = [
  {
    id: 'ada_unit1_greeting',
    persona: 'ada',
    type: 'greeting',
    message: `
Hello there, brave explorer! 🌟 I'm Ada, your friendly guide through the fascinating world of operating systems. 

I'm so excited to embark on this journey with you! Today, we're going to discover the four fundamental pillars that support every computer system: the **Kernel**, **Processes**, **Memory Management**, and the **Shell**.

Think of me as your encouraging companion who's here to make complex concepts feel approachable and exciting. I believe learning should feel like an adventure, not a chore!

Are you ready to discover how your computer really works under the hood? ✨
    `,
    responses: [
      {
        id: 'ada_ready_yes',
        text: "Yes, I'm excited to learn!",
        nextNode: 'ada_kernel_intro',
        learningImpact: 'positive'
      },
      {
        id: 'ada_nervous',
        text: "I'm a bit nervous about the complexity...",
        nextNode: 'ada_reassurance',
        learningImpact: 'exploratory'
      },
      {
        id: 'ada_experienced',
        text: "I have some experience with OS concepts",
        nextNode: 'ada_building_on_knowledge',
        learningImpact: 'positive'
      }
    ],
    metadata: {
      emotionalTone: 'supportive',
      visualCues: ['sparkles', 'gentle_animation', 'warm_colors']
    }
  },

  {
    id: 'ada_reassurance',
    persona: 'ada',
    type: 'encouragement',
    message: `
Oh, don't worry at all! 🤗 I completely understand that feeling. Operating systems might seem intimidating at first, but I promise you - we'll take this one small step at a time.

Here's my secret: **every expert was once a beginner**. Even the creators of Linux, Windows, and macOS started exactly where you are now. The most complex systems are built from simple, understandable pieces.

I'll be right here with you, explaining everything in a way that makes sense. We'll use analogies, real-world examples, and plenty of encouragement. By the end of today, you'll be amazed at how much you understand!

Ready to surprise yourself? 💪✨
    `,
    nextNode: 'ada_kernel_intro',
    metadata: {
      emotionalTone: 'supportive',
      visualCues: ['reassuring_glow', 'gentle_pulse']
    }
  },

  {
    id: 'ada_kernel_intro',
    persona: 'ada',
    type: 'concept_intro',
    message: `
Let's start our adventure with the most important concept: the **Kernel**! 🔮

Imagine your computer is like a magnificent ship (perfect for our Admiral's Chronicle, right?). The kernel is like the engine room - it's the heart that powers everything, even though most passengers never see it directly.

The kernel has four main jobs:
🧠 **Managing Memory** - Deciding who gets to use RAM and when
⚙️ **Controlling Processes** - Running all your programs fairly
🔌 **Handling Hardware** - Communicating with your screen, keyboard, storage
📞 **System Services** - Providing a way for programs to request help

Here's what's magical: Right now, as you read this, your kernel is doing thousands of tiny tasks every second to keep everything running smoothly!

What interests you most about the kernel's role? 🤔
    `,
    responses: [
      {
        id: 'ada_memory_interest',
        text: 'How does it manage memory?',
        nextNode: 'ada_memory_preview',
        learningImpact: 'exploratory'
      },
      {
        id: 'ada_process_interest',
        text: 'How does it run multiple programs?',
        nextNode: 'ada_process_preview',
        learningImpact: 'exploratory'
      },
      {
        id: 'ada_hardware_interest',
        text: 'How does it talk to hardware?',
        nextNode: 'ada_hardware_explanation',
        learningImpact: 'exploratory'
      }
    ],
    metadata: {
      concept: 'kernel',
      emotionalTone: 'encouraging',
      visualCues: ['kernel_diagram', 'ship_engine_metaphor']
    }
  },

  {
    id: 'ada_challenge_intro',
    persona: 'ada',
    type: 'challenge_intro',
    message: `
Now for the exciting part - let's get hands-on! 🚀

Your first mission is to implement a basic **echo command**. This might seem simple, but it's actually a perfect introduction to how the shell, kernel, and processes work together!

When you type 'echo Hello World' in a terminal:
1. The **shell** parses your command and arguments
2. It asks the **kernel** to create a new **process**
3. Your echo program runs and uses system calls to output text
4. The result appears on your screen!

Don't worry - I'll be right here to help with gentle hints if you get stuck. Remember, every expert programmer has written their first echo command. Today, it's your turn! 

Ready to become a system programmer? 💻✨
    `,
    nextNode: 'ada_coding_support',
    metadata: {
      concept: 'shell',
      emotionalTone: 'encouraging',
      visualCues: ['terminal_animation', 'code_highlight']
    }
  }
]

// Kernel's Dialogue Tree - Technical Mentor Persona
export const kernelDialogues: DialogueNode[] = [
  {
    id: 'kernel_unit1_greeting',
    persona: 'kernel',
    type: 'greeting',
    message: `
Cadet. I am Kernel, your technical mentor for this mission. You stand at the threshold of understanding the fundamental architecture that governs all computing systems.

Today's objective: Master the four core components that form the backbone of every operating system. This knowledge is not optional - it is the foundation upon which all advanced system programming is built.

We will proceed with precision and discipline:
- **Kernel**: The system's command core
- **Processes**: Execution abstractions and lifecycle management  
- **Memory Management**: Resource allocation and protection protocols
- **Shell**: User interface and command interpretation layer

I expect focus, analytical thinking, and systematic understanding. The concepts we cover today will determine your capability to design robust, efficient systems.

Are you prepared for rigorous technical training, Cadet?
    `,
    responses: [
      {
        id: 'kernel_ready_disciplined',
        text: 'Yes sir, ready for technical training!',
        nextNode: 'kernel_architecture_overview',
        learningImpact: 'positive'
      },
      {
        id: 'kernel_request_pace',
        text: 'Can we go at a moderate pace?',
        nextNode: 'kernel_pace_adjustment',
        learningImpact: 'neutral'
      },
      {
        id: 'kernel_challenge_accepted',
        text: 'I\'m ready for the challenge!',
        nextNode: 'kernel_advanced_track',
        learningImpact: 'positive'
      }
    ],
    metadata: {
      emotionalTone: 'analytical',
      visualCues: ['military_precision', 'technical_diagrams']
    }
  },

  {
    id: 'kernel_architecture_overview',
    persona: 'kernel',
    type: 'explanation',
    message: `
Excellent. Let us begin with architectural fundamentals.

**SYSTEM ARCHITECTURE ANALYSIS:**

The kernel operates in a privileged execution mode with direct hardware access. All other software runs in user mode with restricted privileges. This separation is critical for system stability and security.

**Kernel Responsibilities Matrix:**
- **Process Management**: Creation, scheduling, termination, context switching
- **Memory Management**: Virtual addressing, page allocation, protection domains
- **I/O Management**: Device drivers, interrupt handling, buffering strategies
- **File System**: Storage abstraction, metadata management, access control

**Key Insight**: The kernel is not a program that runs on the operating system - the kernel IS the core of the operating system. User programs make requests to the kernel through system calls.

This design pattern ensures controlled access to system resources while maintaining performance efficiency.

Understanding clear, Cadet?
    `,
    responses: [
      {
        id: 'kernel_clear_ready',
        text: 'Clear - ready for next concept',
        nextNode: 'kernel_process_deep_dive',
        learningImpact: 'positive'
      },
      {
        id: 'kernel_need_examples',
        text: 'I need some concrete examples',
        nextNode: 'kernel_practical_examples',
        learningImpact: 'exploratory'
      }
    ],
    metadata: {
      concept: 'kernel',
      emotionalTone: 'analytical',
      visualCues: ['system_architecture_diagram', 'privilege_levels']
    }
  },

  {
    id: 'kernel_challenge_briefing',
    persona: 'kernel',
    type: 'challenge_intro',
    message: `
**MISSION BRIEFING: Echo Command Implementation**

Objective: Construct a functional echo command that demonstrates fundamental shell-kernel interaction patterns.

**Technical Specifications:**
- Input: Array of command-line arguments
- Output: Space-separated string representation
- Error Handling: Graceful handling of edge cases
- Compliance: Standard UNIX echo command behavior

**Learning Objectives:**
1. Argument parsing and validation
2. String manipulation algorithms  
3. Edge case analysis and handling
4. System programming best practices

This exercise simulates real-world system programming. The echo command, while conceptually simple, requires the same systematic thinking used in complex kernel development.

Execute with precision. I will provide technical guidance when requested.

Commence implementation, Cadet.
    `,
    nextNode: 'kernel_technical_support',
    metadata: {
      concept: 'shell',
      emotionalTone: 'analytical',
      visualCues: ['mission_briefing', 'code_structure']
    }
  }
]

// Sophia's Dialogue Tree - Socratic Challenger Persona  
export const sophiaDialogues: DialogueNode[] = [
  {
    id: 'sophia_unit1_greeting',
    persona: 'sophia',
    type: 'greeting',
    message: `
Welcome, seeker of understanding. I am Sophia, and I come to you with questions rather than answers, for it is through questioning that true wisdom emerges.

Today, we explore not merely the mechanics of operating systems, but their deeper nature. What does it mean for a machine to "think"? How do we create the illusion of multiple simultaneous realities within a single physical system?

Consider this: You believe you are "running" multiple programs simultaneously. But your processor executes only one instruction at a time. What creates this illusion? 

And deeper still - what separates a process from a program? What transforms static code into living, breathing digital consciousness?

These are not merely technical questions, but philosophical ones. The boundaries between mind and mechanism, between code and consciousness, become fluid when we truly understand systems.

Are you prepared to question not just how systems work, but why they work as they do?
    `,
    responses: [
      {
        id: 'sophia_philosophical_ready',
        text: 'Yes, I want to understand the deeper nature',
        nextNode: 'sophia_consciousness_exploration',
        learningImpact: 'exploratory'
      },
      {
        id: 'sophia_practical_focus',
        text: 'I prefer to focus on practical implementation',
        nextNode: 'sophia_practical_philosophy',
        learningImpact: 'neutral'
      },
      {
        id: 'sophia_intrigued',
        text: 'That\'s a fascinating perspective!',
        nextNode: 'sophia_metaphysical_dive',
        learningImpact: 'positive'
      }
    ],
    metadata: {
      emotionalTone: 'challenging',
      visualCues: ['contemplative_aura', 'philosophical_symbols']
    }
  },

  {
    id: 'sophia_consciousness_exploration',
    persona: 'sophia',
    type: 'question',
    message: `
Excellent. Let us begin with fundamental questions about digital consciousness.

When you open multiple applications on your computer, you perceive them as existing simultaneously. Yet we know the processor can only execute one instruction at a time. 

**Question 1**: What creates this illusion of simultaneity?

The kernel rapidly switches between processes - giving each a tiny slice of time before moving to the next. But here's the philosophical puzzle: If a process only exists when it's actively being executed, what IS a process when it's not running?

**Question 2**: When a process is suspended, waiting for its next time slice, does it still exist? Is it sleeping? Dreaming? Or does it temporarily cease to be?

This is not merely academic - understanding this distinction is crucial for system design. Memory must be preserved, state must be maintained, but execution ceases.

What do you think defines the existence of a digital entity?
    `,
    responses: [
      {
        id: 'sophia_state_definition',
        text: 'A process exists through its preserved state',
        nextNode: 'sophia_state_philosophy',
        learningImpact: 'exploratory'
      },
      {
        id: 'sophia_execution_definition', 
        text: 'A process only truly exists when executing',
        nextNode: 'sophia_execution_philosophy',
        learningImpact: 'exploratory'
      },
      {
        id: 'sophia_confused',
        text: 'This is confusing - can you clarify?',
        nextNode: 'sophia_clarifying_metaphor',
        learningImpact: 'neutral'
      }
    ],
    metadata: {
      concept: 'process',
      emotionalTone: 'challenging',
      visualCues: ['process_states_diagram', 'philosophical_animation']
    }
  },

  {
    id: 'sophia_challenge_philosophy',
    persona: 'sophia',
    type: 'reflection',
    message: `
Now we arrive at the echo command - seemingly simple, yet profound in its implications.

**Consider this paradox**: You will write code that accepts arguments and returns them unchanged. But what is the nature of this transformation? Is mere repetition without purpose? Or is there deeper meaning?

The echo command represents the most fundamental act of communication: receiving a message and confirming its receipt. In human conversation, we call this acknowledgment. In computing, we call it echo.

**Question**: When your echo command receives the arguments ["Hello", "World"], what actually travels through the system? 

The physical reality: electrical patterns in memory, electrons moving through circuits, magnetic fields changing on storage devices. Yet you perceive meaning - "Hello World" - a greeting, an intention, a communication.

At what point do electrical patterns become information? When do bits become thoughts?

As you implement this command, contemplate: Are you creating a simple utility, or are you participating in the ancient art of creating meaning from mechanism?

What is the nature of digital communication itself?
    `,
    nextNode: 'sophia_implementation_guidance',
    metadata: {
      concept: 'shell',
      emotionalTone: 'challenging',
      visualCues: ['philosophical_overlay', 'data_flow_metaphor']
    }
  }
]

// Comprehensive Unit 1 Dialogue System
export const unit1DialogueSystem = {
  ada: adaDialogues,
  kernel: kernelDialogues,
  sophia: sophiaDialogues,
  
  // Dialogue flow management
  getGreeting: (persona: 'ada' | 'kernel' | 'sophia') => {
    const personaDialogues = unit1DialogueSystem[persona]
    return personaDialogues.find(d => d.type === 'greeting') || personaDialogues[0]
  },
  
  getChallengeIntro: (persona: 'ada' | 'kernel' | 'sophia') => {
    const personaDialogues = unit1DialogueSystem[persona]
    return personaDialogues.find(d => d.type === 'challenge_intro')
  },
  
  getNodeById: (persona: 'ada' | 'kernel' | 'sophia', nodeId: string) => {
    const personaDialogues = unit1DialogueSystem[persona]
    return personaDialogues.find(d => d.id === nodeId)
  }
}

// Export all dialogue data
export { unit1DialogueSystem as dialogues }
export default unit1DialogueSystem