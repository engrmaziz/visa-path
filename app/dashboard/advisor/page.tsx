"use client"

import { useEffect, useRef } from "react"
import { useChat } from "@/hooks/use-chat"
import { Send, Bot, Paperclip, Plus, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdvisorPage() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    return (
        <div className="h-[calc(100vh-80px)] -mx-6 lg:-mx-10 -mb-24 md:-mb-10 flex border-t border-white/5">
            {/* Sidebar History */}
            <div className="w-80 bg-[#080B14] border-r border-white/5 hidden lg:flex flex-col z-10">
                <div className="p-4 border-b border-white/5">
                    <Button className="w-full gap-2 justify-start bg-white/5 border-white/5 hover:bg-white/10" variant="secondary">
                        <Plus className="w-4 h-4" /> New Conversation
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <div className="px-3 py-2 text-xs font-bold text-[#8892A4] uppercase tracking-wider">Today</div>
                    <button className="w-full text-left px-3 py-2 rounded-xl bg-white/5 text-sm truncate flex items-center gap-3 border border-white/5 text-white shadow-sm">
                        <MessageSquare className="w-4 h-4 text-[#4F8EF7]" /> Digital Nomad Visa EU
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sm truncate text-[#8892A4] flex items-center gap-3 transition-colors">
                        <MessageSquare className="w-4 h-4" /> Japan Entry Requirements
                    </button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-[#0D1627] relative">
                <div className="h-16 border-b border-white/5 flex items-center px-6 shrink-0 bg-[#080B14]/50 backdrop-blur-sm z-10">
                    <h2 className="text-lg font-bold font-display flex items-center gap-2">
                        <Bot className="w-5 h-5 text-[var(--color-primary)]" /> VisaPath AI Advisor
                    </h2>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center max-w-lg mx-auto text-center space-y-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F8EF7]/20 to-[#A78BFA]/20 border border-[var(--color-primary)]/30 flex items-center justify-center shadow-[0_0_40px_rgba(79,142,247,0.2)]">
                                <Bot className="w-8 h-8 text-[var(--color-primary)]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">How can I help you travel?</h3>
                                <p className="text-[#8892A4]">Ask me to optimize a route, explain complex visa policies, or find the best residency by investment programs.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                {["Can I enter Europe with an Indian passport?", "Plan a 3 month trip to South America", "What are the rules for the Spain digital nomad visa?", "Show me cheapest golden visas"].map(q => (
                                    <button key={q} className="p-3 text-left bg-[#161B27] rounded-xl border border-white/5 hover:border-[var(--color-primary)]/50 hover:bg-[#4F8EF7]/5 text-sm text-[#8892A4] hover:text-white transition-all shadow-sm" onClick={() => handleInputChange({ target: { value: q } })}>
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto space-y-6 pb-4">
                            {messages.map(m => (
                                <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {m.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8EF7] to-[#A78BFA] flex items-center justify-center shrink-0 shadow-md">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                    <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed max-w-[85%] ${m.role === 'user'
                                            ? 'bg-gradient-to-br from-[#4F8EF7] to-[#A78BFA] text-white rounded-br-none shadow-[0_4px_20px_rgba(79,142,247,0.2)]'
                                            : 'glass border-white/10 rounded-bl-none text-[#D1D5DB] shadow-sm'
                                        }`}>
                                        <div dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\n/g, '<br/>') }} />
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8EF7] to-[#A78BFA] flex items-center justify-center shrink-0 shadow-md">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="px-5 py-4 glass border-white/10 rounded-2xl rounded-bl-none flex gap-1.5 items-center shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-[#8892A4] animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 rounded-full bg-[#8892A4] animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 rounded-full bg-[#8892A4] animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#080B14]/80 backdrop-blur-md border-t border-white/5 shrink-0 z-10">
                    <div className="max-w-3xl mx-auto relative">
                        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-[#161B27] border border-white/5 rounded-2xl p-2 focus-within:border-[var(--color-primary)]/50 focus-within:ring-1 focus-within:ring-[var(--color-primary)]/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                            <button type="button" className="p-2 text-[#8892A4] hover:text-white transition-colors shrink-0">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <textarea
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSubmit(e)
                                    }
                                }}
                                placeholder="Ask about visas, routes, ranking..."
                                className="w-full max-h-32 min-h-[40px] bg-transparent border-none focus:ring-0 resize-none py-2 text-sm text-white placeholder:text-[#4A5568]"
                                rows={1}
                            />
                            <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-[#4F8EF7] to-[#A78BFA] hover:opacity-90 border-none">
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                        <div className="text-center mt-3 text-[10px] text-[#4A5568] uppercase tracking-wider font-semibold">
                            VisaPath AI can make mistakes. Always verify with official sources.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
