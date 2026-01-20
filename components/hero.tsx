"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const terminalLines = [
  { command: "$ whoami", response: "> Iraz Irfan - Software Engineer" },
  { command: "$ skills", response: "> .NET • JavaScript • PostgreSQL • Angular" },
  { command: "$ location", response: "> Dhaka, Bangladesh" },
]

export function Hero() {
  const [displayedLines, setDisplayedLines] = useState<typeof terminalLines>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTypingCommand, setIsTypingCommand] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  // Typing animation effect
  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) return

    const currentLine = terminalLines[currentLineIndex]
    const textToType = isTypingCommand ? currentLine.command : currentLine.response

    if (currentCharIndex < textToType.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1)
      }, isTypingCommand ? 50 : 30)
      return () => clearTimeout(timeout)
    } else {
      if (isTypingCommand) {
        // Finished typing command, start typing response
        const timeout = setTimeout(() => {
          setIsTypingCommand(false)
          setCurrentCharIndex(0)
        }, 200)
        return () => clearTimeout(timeout)
      } else {
        // Finished typing response, move to next line
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, currentLine])
          setCurrentLineIndex((prev) => prev + 1)
          setIsTypingCommand(true)
          setCurrentCharIndex(0)
        }, 400)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentLineIndex, currentCharIndex, isTypingCommand])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const getCurrentText = () => {
    if (currentLineIndex >= terminalLines.length) return null
    const currentLine = terminalLines[currentLineIndex]
    const textToType = isTypingCommand ? currentLine.command : currentLine.response
    return textToType.slice(0, currentCharIndex)
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16">
      {/* Terminal Window */}
      <div className="w-full max-w-2xl">
        <div className="rounded-xl border border-border bg-card shadow-lg dark:shadow-none overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm leading-relaxed bg-card">
            {/* Already displayed lines */}
            {displayedLines.map((line, index) => (
              <div key={index} className="mb-3">
                <div className="text-muted-foreground">{line.command}</div>
                <div className="text-foreground font-medium">{line.response}</div>
              </div>
            ))}

            {/* Currently typing line */}
            {currentLineIndex < terminalLines.length && (
              <div className="mb-3">
                {isTypingCommand ? (
                  <div className="text-muted-foreground">
                    {getCurrentText()}
                    <span
                      className={`inline-block w-2 h-4 ml-0.5 bg-foreground align-middle ${
                        showCursor ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                ) : (
                  <>
                    <div className="text-muted-foreground">
                      {terminalLines[currentLineIndex].command}
                    </div>
                    <div className="text-foreground font-medium">
                      {getCurrentText()}
                      <span
                        className={`inline-block w-2 h-4 ml-0.5 bg-foreground align-middle ${
                          showCursor ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Cursor after all lines are typed */}
            {currentLineIndex >= terminalLines.length && (
              <div className="text-muted-foreground">
                $ <span
                  className={`inline-block w-2 h-4 ml-0.5 bg-foreground align-middle ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg" className="font-medium">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-medium bg-transparent">
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
