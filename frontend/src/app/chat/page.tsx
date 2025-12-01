'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/DashboardLayout';
import { Send, Bot, User, Loader2, Paperclip, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm your Gestoría Copilot. I can help you understand Spanish bureaucracy, explain official documents, and guide you through administrative processes. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    'How do I register for the padrón?',
    'What is the Beckham Law?',
    'How do I appeal a traffic fine?',
    'When is the tax filing deadline?',
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock response based on input
    let response = "I understand you're asking about Spanish bureaucracy. ";
    if (input.toLowerCase().includes('padrón') || input.toLowerCase().includes('padron')) {
      response =
        "The **padrón** (empadronamiento) is the municipal registration that proves you live in a specific city in Spain. Here's what you need:\n\n1. **Required Documents:**\n   - Passport or NIE\n   - Rental contract or property deed\n   - Completed application form\n\n2. **Process:**\n   - Book an appointment at your local Ayuntamiento\n   - Bring all documents\n   - They'll process it on the spot\n\n3. **Important:** The padrón is required for many other procedures like healthcare, school enrollment, and residency applications.\n\nWould you like me to help you prepare a checklist for your specific city?";
    } else if (input.toLowerCase().includes('beckham')) {
      response =
        "The **Beckham Law** (Ley Beckham) is a special tax regime for new tax residents in Spain. Key points:\n\n**Benefits:**\n- Flat 24% tax rate on Spanish income (vs progressive up to 47%)\n- Foreign income generally not taxed\n- Valid for 6 years\n\n**Requirements:**\n- Haven't been Spanish tax resident in last 5 years\n- Move to Spain for work (employee or director)\n- Apply within 6 months of starting work\n\n**How to apply:**\n1. File Modelo 149 with Agencia Tributaria\n2. Need your employer's documentation\n3. Get approval before filing your first tax return\n\nShall I help you check your eligibility or prepare the application?";
    } else if (input.toLowerCase().includes('fine') || input.toLowerCase().includes('multa')) {
      response =
        "For **traffic fines** (multas de tráfico) in Spain, here's what you need to know:\n\n**Payment Options:**\n- **50% discount** if paid within 20 days\n- Full amount if paid within 30 days\n- Can appeal instead of paying\n\n**How to Pay:**\n- Online at sede.dgt.gob.es\n- Bank transfer\n- In person at traffic office\n\n**How to Appeal:**\n1. Submit written appeal within 20 days\n2. Include evidence (photos, witness statements)\n3. Wait for resolution (can take months)\n\n**Tip:** If you have a document, upload it and I can extract the specific deadline and amount for you.\n\nWould you like help with paying or appealing?";
    } else if (input.toLowerCase().includes('tax') || input.toLowerCase().includes('renta')) {
      response =
        "The Spanish **tax filing** (Declaración de la Renta) season runs from **April to June** each year.\n\n**Key Dates for 2024:**\n- Pre-campaign info: March\n- Filing opens: April 3\n- Online deadline: June 30\n- In-person deadline: June 28\n\n**Who must file:**\n- Income over 22,000€ from single employer\n- Income over 15,000€ from multiple employers\n- Self-employed (any amount)\n- Capital gains over 1,600€\n\n**How to file:**\n- Renta Web (online)\n- Phone appointment\n- In-person at tax office\n\nI can set up reminders for you as the deadlines approach. Would you like that?";
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Sparkles className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t('nav.chat')}</h1>
            <p className="text-sm text-gray-500">Ask me anything about Spanish bureaucracy</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-gray-600" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div
                  className={`text-sm whitespace-pre-wrap ${
                    message.role === 'user' ? '' : 'text-gray-700 prose prose-sm'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br />'),
                  }}
                />
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="p-2 rounded-full h-8 w-8 flex items-center justify-center bg-gray-200">
                <Bot className="h-4 w-4 text-gray-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => setInput(question)}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-end gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition">
              <Paperclip className="h-5 w-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chat.placeholder')}
                rows={1}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            AI responses are for guidance only. Always verify with official sources.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
