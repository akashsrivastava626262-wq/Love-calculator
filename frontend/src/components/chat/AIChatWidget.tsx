'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminAPI } from '@/lib/api';

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm AAKSHI's style assistant 💕 How can I help you find the perfect jewelry today?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await adminAPI.aiChat(userMsg);
      setMessages((m) => [...m, { role: 'bot', text: data.response }]);
    } catch {
      setMessages((m) => [...m, { role: 'bot', text: 'Sorry, I couldn\'t process that. Try asking about shipping, returns, or our collections!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
        aria-label="Chat support"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-secondary overflow-hidden"
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">AAKSHI Assistant</p>
                <p className="text-xs text-white/70">AI Style Support</p>
              </div>
              <button onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === 'user' ? 'bg-primary text-white' : 'bg-secondary text-foreground'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && <p className="text-xs text-gray-400">Thinking...</p>}
            </div>

            <div className="p-3 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products, shipping..."
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button size="icon" onClick={sendMessage} disabled={loading}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
