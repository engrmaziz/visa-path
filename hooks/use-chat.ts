"use client"
import { useState, useRef } from "react"

export interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const abortControllerRef = useRef<AbortController | null>(null)

    const stop = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
            abortControllerRef.current = null
            setIsLoading(false)
        }
    }

    const append = async (message: Omit<Message, 'id'>) => {
        const newMsg: Message = { ...message, id: Date.now().toString() }
        const newMessages = [...messages, newMsg]
        setMessages(newMessages)
        setInput("")
        setIsLoading(true)

        abortControllerRef.current = new AbortController()

        try {
            const res = await fetch('/api/advisor/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
                signal: abortControllerRef.current.signal
            })

            if (!res.ok) throw new Error(res.statusText)

            const reader = res.body?.getReader()
            const decoder = new TextDecoder()

            const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' }
            setMessages(m => [...m, aiMessage])

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    if (value) {
                        const chunk = decoder.decode(value, { stream: true })
                        setMessages(m => {
                            const last = m[m.length - 1]
                            return [...m.slice(0, -1), { ...last, content: last.content + chunk }]
                        })
                    }
                }
            }
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                console.error(e)
            }
        } finally {
            setIsLoading(false)
            abortControllerRef.current = null
        }
    }

    return {
        messages,
        input,
        handleInputChange: (e: any) => setInput(e.target.value),
        handleSubmit: (e: any) => {
            e.preventDefault()
            if (!input.trim() || isLoading) return
            append({ role: 'user', content: input })
        },
        isLoading,
        stop
    }
}
