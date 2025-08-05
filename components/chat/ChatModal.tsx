"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, ThumbsUp, ThumbsDown, Copy, ArrowUp, Plus, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function FullScreenChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi Dave! 👋 How can I assist you today?\n\nI've finished setting up this transaction from the contract you just uploaded. Let me know what you'd like to tackle first!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    controllerRef.current = new AbortController()

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newMessages }),
        headers: { "Content-Type": "application/json" },
        signal: controllerRef.current.signal,
      })

      if (!res.ok || !res.body) throw new Error("Failed to connect to chat API")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantMessage: Message = { role: "assistant", content: "" }

      setMessages((prev) => [...prev, assistantMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        assistantMessage.content += chunk
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { ...assistantMessage }
          return updated
        })
      }

      setIsLoading(false)
    } catch (err) {
      console.error("Stream error:", err)
      setIsLoading(false)
    }
  }

  const quickActions = ["Prepare next email", "List missing documents", "Review key dates", "Task summary"]

  const handleQuickAction = (action: string) => {
    setInput(action)
  }

  return (
    <>
      {/* Floating Button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 z-50"
        >
          <Sparkles size={20} />
          <span className="text-sm font-medium">AVA</span>
        </Button>
      )}

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="fixed top-0 right-0 w-96 h-full z-50 bg-white flex flex-col shadow-2xl border-l border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <h1 className="font-medium text-gray-900 text-base">AVA</h1>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className="space-y-3">
                {msg.role === "assistant" ? (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageCircle size={16} className="text-white" />
                    </div>
                    <div className="flex-1 max-w-[85%]">
                      <div className="bg-white rounded-2xl rounded-tl-md p-4 text-sm text-gray-800 leading-relaxed shadow-sm border border-gray-100 whitespace-pre-wrap">
                        {msg.content}
                      </div>

                      {i === 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {quickActions.map((action, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleQuickAction(action)}
                              className="text-sm bg-white border border-gray-200 rounded-xl p-3 hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-700 text-left font-medium shadow-sm"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-1 mt-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <ThumbsUp size={16} className="text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <ThumbsDown size={16} className="text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Copy size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-md p-4 text-sm max-w-[85%] shadow-sm whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="px-6 py-3 text-center bg-gray-50 border-t border-gray-100">
            <span className="text-xs text-gray-400">{new Date().toDateString()}</span>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative max-w-4xl mx-auto">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 border border-gray-200">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                >
                  <Plus size={18} className="text-gray-500" />
                </button>
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                  className="flex-1 bg-transparent px-3 py-3 text-sm placeholder-gray-500 border-0 focus:ring-0 focus:outline-none"
                  placeholder="Ask, use / for commands, @ for mentions, # for references"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-gray-300 hover:bg-blue-600 hover:text-white disabled:bg-gray-200 disabled:text-gray-400 text-gray-600 rounded-full transition-all flex-shrink-0"
                >
                  <ArrowUp size={18} />
                </button>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-xs text-gray-400">
                Ava can make mistakes. Verify important information.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
