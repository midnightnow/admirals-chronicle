// Admiral's Chronicle - Unit 1 Code Coach Challenges
// Complete implementation with tests, hints, and progressive difficulty

export interface TestCase {
  id: string
  input: string[]
  expectedOutput: string
  description: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
  hidden: boolean
}

export interface Hint {
  level: 1 | 2 | 3 | 4 | 5
  trigger: 'time' | 'failures' | 'request'
  persona: 'ada' | 'kernel' | 'sophia'
  message: string
  codeExample?: string
}

export interface Challenge {
  id: string
  unit: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  estimatedTime: string
  concepts: string[]
  learningObjectives: string[]
  starterCode: string
  solution: string
  testCases: TestCase[]
  hints: Hint[]
  realWorldContext: string
  successMessage: string
  nextSteps: string[]
}

// Unit 1 Primary Challenge: Basic Echo Command
export const echoCommandChallenge: Challenge = {
  id: 'echo-command-basic',
  unit: 'unit1-intro-os',
  title: 'Implement a Basic Echo Command',
  description: `
Create a simple echo command that takes command-line arguments and prints them back to the user.
This challenge introduces you to fundamental shell command concepts and argument processing.

Your echo command should:
- Accept multiple arguments from the command line
- Print all arguments separated by spaces
- End with a newline character
- Handle edge cases like no arguments
  `,
  difficulty: 'beginner',
  estimatedTime: '15-20 minutes',
  concepts: ['shell', 'process', 'kernel'],
  learningObjectives: [
    'Understand how shell commands process arguments',
    'Learn the relationship between user input and system calls',
    'Practice basic input/output operations',
    'Explore the process creation model'
  ],
  
  starterCode: `// Basic Echo Command Implementation
// Your mission: Create a function that mimics the shell's echo command

function echo(args) {
  // TODO: Implement the echo command logic
  // Hint: The shell passes arguments as an array
  // Your goal is to join them with spaces and return the result
  
  return ""; // Replace this with your implementation
}

// Test your implementation
console.log(echo(["Hello", "World"])); // Should output: "Hello World"
console.log(echo(["Operating", "Systems", "Rule"])); // Should output: "Operating Systems Rule"`,

  solution: `// Basic Echo Command Implementation - Complete Solution
// This demonstrates fundamental shell command processing

function echo(args) {
  // Handle edge case: no arguments provided
  if (!args || args.length === 0) {
    return "";
  }
  
  // Join all arguments with spaces, mimicking shell behavior
  // This is exactly what the real echo command does!
  return args.join(" ");
}

// Advanced version with more shell-like features
function echoAdvanced(args) {
  if (!args || args.length === 0) {
    return "";
  }
  
  // Handle special flags (like real echo command)
  const processedArgs = [];
  let suppressNewline = false;
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    // Handle -n flag (suppress trailing newline)
    if (arg === "-n" && i === 0) {
      suppressNewline = true;
      continue;
    }
    
    processedArgs.push(arg);
  }
  
  const output = processedArgs.join(" ");
  return suppressNewline ? output : output + "\\n";
}

// Export for testing
module.exports = { echo, echoAdvanced };`,

  testCases: [
    {
      id: 'basic-hello-world',
      input: ['Hello', 'World'],
      expectedOutput: 'Hello World',
      description: 'Basic two-argument echo',
      difficulty: 'basic',
      hidden: false
    },
    {
      id: 'single-argument',
      input: ['Hello'],
      expectedOutput: 'Hello',
      description: 'Single argument handling',
      difficulty: 'basic',
      hidden: false
    },
    {
      id: 'multiple-arguments',
      input: ['Operating', 'Systems', 'Are', 'Fascinating'],
      expectedOutput: 'Operating Systems Are Fascinating',
      description: 'Multiple argument processing',
      difficulty: 'basic',
      hidden: false
    },
    {
      id: 'empty-arguments',
      input: [],
      expectedOutput: '',
      description: 'Handle empty argument list',
      difficulty: 'intermediate',
      hidden: false
    },
    {
      id: 'special-characters',
      input: ['Hello,', 'World!', '🚀'],
      expectedOutput: 'Hello, World! 🚀',
      description: 'Special characters and punctuation',
      difficulty: 'intermediate',
      hidden: true
    },
    {
      id: 'numeric-arguments',
      input: ['42', '3.14', '0'],
      expectedOutput: '42 3.14 0',
      description: 'Numeric arguments as strings',
      difficulty: 'intermediate',
      hidden: true
    },
    {
      id: 'long-sentence',
      input: ['The', 'kernel', 'manages', 'processes', 'and', 'memory', 'allocation'],
      expectedOutput: 'The kernel manages processes and memory allocation',
      description: 'Long argument list processing',
      difficulty: 'advanced',
      hidden: true
    }
  ],

  hints: [
    {
      level: 1,
      trigger: 'time',
      persona: 'ada',
      message: "Welcome to your first coding challenge! 🌟 The echo command is like a friendly parrot - it simply repeats what you tell it. Think about how you might combine multiple words into a single sentence.",
      codeExample: `// Think about what joins words together in a sentence
const words = ["Hello", "World"];
// What character goes between words?`
    },
    {
      level: 2,
      trigger: 'failures',
      persona: 'kernel',
      message: "Focus on the core operation, cadet. The shell passes arguments as an array. Your mission: transform that array into a single string. JavaScript's join() method is your tool here.",
      codeExample: `// Example of joining array elements
const parts = ["part1", "part2", "part3"];
const result = parts.join(" "); // "part1 part2 part3"`
    },
    {
      level: 3,
      trigger: 'failures',
      persona: 'sophia',
      message: "What is the essence of echo? Is it mere repetition, or communication? Consider: what happens when there are no arguments to echo? The void speaks in silence.",
      codeExample: `// Edge cases reveal the nature of your implementation
if (!args || args.length === 0) {
  return ""; // What should echo return for no input?
}`
    },
    {
      level: 4,
      trigger: 'request',
      persona: 'ada',
      message: "You're so close! 🎯 Remember, the echo command joins arguments with spaces. Don't overthink it - the solution is simpler than you might imagine. Just join the array elements!",
      codeExample: `function echo(args) {
  // Handle the empty case first
  if (!args || args.length === 0) {
    return "";
  }
  
  // Now join the arguments...
  return args.join(?); // What character goes in the ?
}`
    },
    {
      level: 5,
      trigger: 'request',
      persona: 'kernel',
      message: "Final guidance: return args.join(' ') with appropriate null handling. This is exactly how the shell's echo command processes arguments internally.",
      codeExample: `function echo(args) {
  return args && args.length > 0 ? args.join(" ") : "";
}`
    }
  ],

  realWorldContext: `
🌊 **Real-World Context: Why Echo Matters**

The humble echo command is your first glimpse into how shells work! Every time you type a command:

1. **Shell Parsing**: The shell breaks your command line into arguments
2. **Process Creation**: The kernel creates a new process for your command
3. **Argument Passing**: Your arguments arrive as an array in the program
4. **System Calls**: The program uses system calls to output to the terminal

Professional applications of echo concepts:
- **Web Servers**: Processing HTTP request parameters (similar to command arguments)
- **APIs**: Handling function parameters and returning formatted responses  
- **Build Scripts**: Echoing status messages during compilation
- **DevOps**: Logging and debugging in automated deployment pipelines

Fun fact: The Unix echo command has been essentially unchanged since 1971, yet it's still used billions of times daily across the world's servers!
  `,

  successMessage: `
🎉 **Outstanding, Admiral!** 🎉

You've successfully implemented your first shell command! This echo command demonstrates fundamental concepts you'll use throughout your OS journey:

✅ **Argument Processing**: Understanding how programs receive input
✅ **String Manipulation**: Basic text operations that power user interfaces  
✅ **Edge Case Handling**: Robust programming practices
✅ **Shell Integration**: How user commands become running processes

Your echo command is now part of your growing fleet of system tools. Ready for your next challenge?
  `,

  nextSteps: [
    'Explore process creation: How does the shell actually run your echo command?',
    'Advanced Challenge: Add support for echo flags like -n (suppress newline)',
    'Deep Dive: Investigate how real shell commands parse complex argument patterns',
    'System Calls: Learn how your output reaches the terminal display'
  ]
}

// Additional Unit 1 Challenges (for progression)
export const unit1Challenges: Challenge[] = [
  echoCommandChallenge,
  
  // Additional challenges can be added here as the curriculum expands
  // Examples: process listing, simple file operations, memory usage display
]

// Export challenge data
export { unit1Challenges as challenges }
export default echoCommandChallenge