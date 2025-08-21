import React, { useState } from 'react'
import './CodeCoach.css'

interface TestCase {
  id: string
  input: string
  expectedOutput: string
  description: string
}

interface Hint {
  level: 'beginner' | 'intermediate' | 'advanced'
  content: string
  codeExample?: string
}

interface Challenge {
  id: string
  title: string
  description: string
  instructions: string[]
  starterCode: string
  testCases: TestCase[]
  hints: Hint[]
  solution: string
}

const echoChallenge: Challenge = {
  id: 'basic-echo',
  title: 'Implement a Basic Echo Command',
  description: 'Create a simple echo command that takes input and returns it back. This is your first step in understanding how command-line programs work.',
  instructions: [
    'Read command-line arguments from process.argv',
    'Join the arguments into a single string',
    'Output the string to the console',
    'Handle the case where no arguments are provided'
  ],
  starterCode: `// Basic Echo Command Implementation
// Your mission: Create a program that echoes back what the user types

function echo(args) {
    // TODO: Implement your echo logic here
    // args is an array of command-line arguments
    
    return ""; // Replace this with your implementation
}

// Test your implementation
const args = process.argv.slice(2);
const result = echo(args);
console.log(result);

module.exports = echo;`,
  testCases: [
    {
      id: 'test-1',
      input: '["Hello", "World"]',
      expectedOutput: 'Hello World',
      description: 'Should join multiple arguments with spaces'
    },
    {
      id: 'test-2', 
      input: '["Welcome", "to", "Admiral\'s", "Chronicle"]',
      expectedOutput: 'Welcome to Admiral\'s Chronicle',
      description: 'Should handle multiple arguments correctly'
    },
    {
      id: 'test-3',
      input: '[]',
      expectedOutput: '',
      description: 'Should return empty string for no arguments'
    },
    {
      id: 'test-4',
      input: '["Single"]',
      expectedOutput: 'Single',
      description: 'Should handle single argument'
    }
  ],
  hints: [
    {
      level: 'beginner',
      content: 'The echo command should simply return the arguments joined together. In JavaScript, you can use the join() method on arrays.',
      codeExample: 'const words = ["hello", "world"];\nconst result = words.join(" "); // "hello world"'
    },
    {
      level: 'intermediate', 
      content: 'Consider edge cases: what happens when there are no arguments? What about special characters in the arguments?',
      codeExample: 'if (args.length === 0) {\n    return "";\n}\nreturn args.join(" ");'
    },
    {
      level: 'advanced',
      content: 'Real echo commands have flags like -n (no newline) and -e (enable interpretation of backslash escapes). For now, keep it simple, but think about how you might extend this.',
      codeExample: '// Advanced: Handle flags\nfunction echo(args) {\n    const flags = args.filter(arg => arg.startsWith("-"));\n    const text = args.filter(arg => !arg.startsWith("-"));\n    return text.join(" ");\n}'
    }
  ],
  solution: `function echo(args) {
    // Handle empty arguments
    if (args.length === 0) {
        return "";
    }
    
    // Join all arguments with spaces
    return args.join(" ");
}`
}

const CodeCoach: React.FC = () => {
  const [currentChallenge] = useState<Challenge>(echoChallenge)
  const [userCode, setUserCode] = useState<string>(currentChallenge.starterCode)
  const [testResults, setTestResults] = useState<Array<{id: string, passed: boolean, error?: string}>>([])
  const [showHints, setShowHints] = useState<boolean>(false)
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(0)
  const [showSolution, setShowSolution] = useState<boolean>(false)

  // Safe code evaluation function
  const evaluateCode = (code: string, args: any[]): { result: any, error?: string } => {
    try {
      // Create a safe environment for code execution
      const wrappedCode = `
        ${code}
        
        // Extract the echo function
        if (typeof echo === 'function') {
          return echo(${JSON.stringify(args)});
        } else {
          throw new Error('echo function not found');
        }
      `
      
      // Use Function constructor for safer evaluation than eval
      const fn = new Function(wrappedCode)
      const result = fn()
      return { result }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  const runTests = () => {
    const results = currentChallenge.testCases.map(testCase => {
      const args = JSON.parse(testCase.input)
      const { result, error } = evaluateCode(userCode, args)
      
      if (error) {
        return { id: testCase.id, passed: false, error }
      }
      
      const passed = result === testCase.expectedOutput
      return { id: testCase.id, passed }
    })
    
    setTestResults(results)
  }

  const getHint = () => {
    if (currentHintLevel < currentChallenge.hints.length) {
      setCurrentHintLevel(prev => prev + 1)
      setShowHints(true)
    }
  }

  const resetChallenge = () => {
    setUserCode(currentChallenge.starterCode)
    setTestResults([])
    setShowHints(false)
    setCurrentHintLevel(0)
    setShowSolution(false)
  }

  const allTestsPassed = testResults.length > 0 && testResults.every(result => result.passed)

  return (
    <div className="code-coach-container">
      <div className="challenge-header">
        <h2>🧪 Code Coach Challenge</h2>
        <div className="challenge-title">
          <span className="challenge-icon">⚡</span>
          {currentChallenge.title}
        </div>
        <p className="challenge-description">{currentChallenge.description}</p>
      </div>

      <div className="challenge-content">
        <div className="instructions-panel">
          <h3>📋 Mission Briefing</h3>
          <ol className="instruction-list">
            {currentChallenge.instructions.map((instruction, index) => (
              <li key={index} className="instruction-item">
                {instruction}
              </li>
            ))}
          </ol>
          
          <div className="challenge-actions">
            <button className="btn btn-secondary" onClick={getHint}>
              💡 Get Hint ({currentHintLevel}/{currentChallenge.hints.length})
            </button>
            <button className="btn btn-secondary" onClick={() => setShowSolution(!showSolution)}>
              🔍 {showSolution ? 'Hide' : 'Show'} Solution
            </button>
            <button className="btn btn-secondary" onClick={resetChallenge}>
              🔄 Reset Challenge
            </button>
          </div>
        </div>

        <div className="code-editor-panel">
          <div className="editor-header">
            <h3>💻 Code Editor</h3>
            <button className="btn btn-primary" onClick={runTests}>
              🧪 Run Tests
            </button>
          </div>
          
          <textarea
            className="code-editor"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="test-results">
          <h3>🧪 Test Results</h3>
          <div className="test-summary">
            <span className={`result-status ${allTestsPassed ? 'success' : 'pending'}`}>
              {allTestsPassed ? '✅ All Tests Passed!' : '⚠️ Some Tests Failed'}
            </span>
          </div>
          
          <div className="test-cases">
            {currentChallenge.testCases.map((testCase, index) => {
              const result = testResults.find(r => r.id === testCase.id)
              return (
                <div key={testCase.id} className={`test-case ${result?.passed ? 'passed' : 'failed'}`}>
                  <div className="test-header">
                    <span className="test-icon">
                      {result?.passed ? '✅' : '❌'}
                    </span>
                    <span className="test-title">Test {index + 1}: {testCase.description}</span>
                  </div>
                  <div className="test-details">
                    <div className="test-input">
                      <strong>Input:</strong> {testCase.input}
                    </div>
                    <div className="test-expected">
                      <strong>Expected:</strong> "{testCase.expectedOutput}"
                    </div>
                    {result?.error && (
                      <div className="test-error">
                        <strong>Error:</strong> {result.error}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          
          {allTestsPassed && (
            <div className="success-message">
              <h4>🎉 Congratulations, Admiral!</h4>
              <p>You've successfully implemented your first command-line program! This echo command demonstrates the fundamental principles of:</p>
              <ul>
                <li>Processing command-line arguments</li>
                <li>String manipulation and output</li>
                <li>Edge case handling</li>
                <li>Program structure and modularity</li>
              </ul>
              <p>Ready to tackle the next challenge in your journey to consciousness-weaving mastery!</p>
            </div>
          )}
        </div>
      )}

      {/* Hints Panel */}
      {showHints && (
        <div className="hints-panel">
          <h3>💡 Progressive Hints</h3>
          {currentChallenge.hints.slice(0, currentHintLevel).map((hint, index) => (
            <div key={index} className={`hint-card ${hint.level}`}>
              <div className="hint-header">
                <span className="hint-level">{hint.level.toUpperCase()}</span>
                <span className="hint-number">Hint {index + 1}</span>
              </div>
              <p className="hint-content">{hint.content}</p>
              {hint.codeExample && (
                <pre className="hint-code">
                  <code>{hint.codeExample}</code>
                </pre>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Solution Panel */}
      {showSolution && (
        <div className="solution-panel">
          <h3>🔍 Solution</h3>
          <div className="solution-warning">
            ⚠️ <strong>Admiral's Note:</strong> The journey of discovery is more valuable than the destination. 
            Try implementing your own solution before studying this one!
          </div>
          <pre className="solution-code">
            <code>{currentChallenge.solution}</code>
          </pre>
          <div className="solution-explanation">
            <h4>Solution Breakdown:</h4>
            <ul>
              <li><strong>Edge Case Handling:</strong> Check if args array is empty and return empty string</li>
              <li><strong>Array Join:</strong> Use join(" ") to combine all arguments with spaces</li>
              <li><strong>Simplicity:</strong> Keep the solution focused and readable</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeCoach