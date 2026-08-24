import { useState } from 'react'
import { Bot, Send } from 'lucide-react'
import { useFitness } from '../context/FitnessContext'
import { createFitnessAssistant } from '../services/assistantService'

const prompts = ['What should I eat to reach my protein target?', 'Create a push workout.', 'Analyze my workout progress.']

export default function AssistantPage() {
  const fitness = useFitness()
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Ask me about your logged training or nutrition. This demo assistant runs locally and uses only the fitness data in this app.' }])
  async function ask(value = question) {
    if (!value.trim()) return
    setMessages((previous) => [...previous, { role: 'user', text: value }])
    setQuestion('')
    const response = await createFitnessAssistant(fitness).ask(value)
    setMessages((previous) => [...previous, { role: 'assistant', text: response }])
  }
  return <div className="mx-auto max-w-3xl space-y-6"><div><p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Local fitness intelligence</p><h2 className="mt-2 text-3xl font-semibold text-white">Fitness assistant</h2><p className="mt-2 text-sm text-slate-400">General fitness information only. This assistant is not medical advice.</p></div><div className="card min-h-[420px] rounded-2xl p-5"><div className="space-y-4">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.role === 'user' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-200'}`}>{message.role === 'assistant' && <Bot size={15} className="mb-2 text-emerald-300" />}{message.text}</div></div>)}</div><div className="mt-8 flex flex-wrap gap-2">{prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)} className="rounded-full border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:border-emerald-400/50">{prompt}</button>)}</div><form onSubmit={(event) => { event.preventDefault(); ask() }} className="mt-5 flex gap-2"><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about your fitness data..." className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" aria-label="Ask fitness assistant" /><button className="rounded-xl bg-emerald-500 px-4 text-slate-950" aria-label="Send question"><Send size={17} /></button></form></div></div>
}
