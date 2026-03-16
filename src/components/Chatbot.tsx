import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { processCommand } from '@/lib/chatbotParser';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'System ready. Type **help** for commands.' },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const response = await processCommand(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response.text }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Error processing command.' }]);
    }
    setLoading(false);
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>
            : part
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Toggle chatbot"
      >
        <span className="text-lg font-mono font-bold">{open ? '×' : '>'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-20 right-6 z-50 w-96 bg-card shadow-elevated rounded-lg overflow-hidden border border-border"
          >
            <div className="bg-chatbot-header px-4 py-3 flex justify-between items-center">
              <span className="text-chatbot-header-foreground text-xs font-mono font-medium">IAM_PROTOCOL_V1</span>
              <span className="text-status-active text-xs font-mono">● ONLINE</span>
            </div>

            <div ref={scrollRef} className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                  <span className={`inline-block px-3 py-2 rounded-lg text-sm max-w-[85%] text-left ${
                    m.role === 'user'
                      ? 'bg-chatbot-user text-chatbot-user-foreground'
                      : 'bg-chatbot-bot text-chatbot-bot-foreground'
                  }`}>
                    {renderText(m.text)}
                  </span>
                </div>
              ))}
              {loading && (
                <div className="text-left">
                  <span className="inline-block px-3 py-2 rounded-lg text-sm bg-chatbot-bot text-muted-foreground">
                    Processing...
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter command..."
                className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
