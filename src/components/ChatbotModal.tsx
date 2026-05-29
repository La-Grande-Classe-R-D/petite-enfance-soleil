'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import { useFocusTrap } from '@/lib/useFocusTrap';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function renderContent(text: string) {
  return text.split('\n').map((line, lineIdx, lines) => {
    const segments = line.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
      seg.startsWith('**') && seg.endsWith('**')
        ? <strong key={i}>{seg.slice(2, -2)}</strong>
        : seg
    );
    return lineIdx < lines.length - 1 ? [...segments, <br key={`br-${lineIdx}`} />] : segments;
  });
}

const WELCOME_SUGGESTIONS = [
  'Quelles sont les normes d\'encadrement en crèche ?',
  'Comment obtenir l\'agrément assistante maternelle ?',
  'Quelles aides financières pour la garde d\'enfant ?',
];

export function ChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(isOpen && !isClosing, dialogRef);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 260);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeModal]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    const userMessage: Message = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const reply = res.ok ? data.message : 'Désolé, une erreur est survenue. Veuillez réessayer.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Désolé, une erreur est survenue. Veuillez réessayer.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="chatbot-fab"
        onClick={openModal}
        aria-label="Ouvrir l'assistant Petite Enfance"
      >
        <MessageCircle size={26} strokeWidth={2} />
        <span className="chatbot-fab__label">Assistant</span>
      </button>

      {isOpen && (
        <div className={`chatbot-modal ${isClosing ? 'is-closing' : 'is-open'}`}>
          <div className="chatbot-modal__overlay" onClick={closeModal} aria-hidden="true" />

          <div
            ref={dialogRef}
            className="chatbot-modal__content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-modal-title"
          >
            <div className="chatbot-modal__header">
              <div className="chatbot-modal__header-info">
                <div className="chatbot-modal__avatar">
                  <Bot size={18} strokeWidth={2} />
                </div>
                <div>
                  <h2 id="chatbot-modal-title" className="chatbot-modal__title">Assistant Petite Enfance</h2>
                  <p className="chatbot-modal__subtitle">
                    <span className="chatbot-modal__status-dot" />
                    En ligne
                  </p>
                </div>
              </div>
              <button className="chatbot-modal__close" onClick={closeModal} aria-label="Fermer">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="chatbot-modal__messages">
              {messages.length === 0 && (
                <div className="chatbot-modal__welcome">
                  <div className="chatbot-modal__welcome-icon">
                    <Sparkles size={28} />
                  </div>
                  <p className="chatbot-modal__welcome-text">
                    Bonjour ! Je suis votre assistant spécialisé en petite enfance.
                    Posez-moi vos questions sur la réglementation, la pédagogie, les formations ou les aides financières.
                  </p>
                  <div className="chatbot-modal__suggestions">
                    {WELCOME_SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        className="chatbot-modal__suggestion"
                        onClick={() => sendMessage(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chatbot-modal__message chatbot-modal__message--${msg.role}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="chatbot-modal__msg-avatar">
                      <Bot size={12} />
                    </div>
                  )}
                  <div className="chatbot-modal__bubble">{renderContent(msg.content)}</div>
                </div>
              ))}

              {isLoading && (
                <div className="chatbot-modal__message chatbot-modal__message--assistant">
                  <div className="chatbot-modal__msg-avatar">
                    <Bot size={12} />
                  </div>
                  <div className="chatbot-modal__bubble chatbot-modal__bubble--typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-modal__footer">
              <input
                ref={inputRef}
                type="text"
                className="chatbot-modal__input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Posez votre question…"
                disabled={isLoading}
                aria-label="Message"
              />
              <button
                className="chatbot-modal__send"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                aria-label="Envoyer"
              >
                <Send size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
