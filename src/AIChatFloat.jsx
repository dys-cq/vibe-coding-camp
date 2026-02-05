import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！我是 Vibe Coding 的 AI 助手，有什么可以帮你的吗？不管是课程问题还是编程疑惑，随时问我！🤖' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // 拖拽相关状态
  const constraintsRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Vercel 部署后，前后端同源，直接使用相对路径 /api/chat
      // 本地开发时如果用了 npm run dev 且配置了代理，也是 /api/chat
      // 或者判断环境：import.meta.env.PROD
      const apiUrl = '/api/chat'; 
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg,
          history: messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，我现在有点连接不上大脑（服务器），请稍后再试。🤒' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* 隐形的全屏约束容器，让拖拽限制在视口内 */}
      <div ref={constraintsRef} className="fixed inset-4 z-40 pointer-events-none" />

      {/* 悬浮按钮 - 可拖拽 */}
      <motion.button
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => !isOpen && setIsOpen(true)} // 防止拖拽时误触点击，但这在 Framer Motion 中通常处理得很好
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-opacity duration-300 pointer-events-auto cursor-grab active:cursor-grabbing bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <MessageCircle size={32} />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </motion.button>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-[380px] h-[600px] max-w-[calc(100vw-40px)] max-h-[calc(100vh-100px)] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md bg-white/90 dark:bg-[#1e1e24]/90"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white cursor-move">
              <div className="flex items-center gap-2">
                <Sparkles size={20} />
                <h3 className="font-bold text-lg">Vibe AI 助手</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-violet-600 text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-[#2a2a35] text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-white/5 rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#2a2a35] p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-white/5">
                    <Loader2 className="animate-spin text-violet-500" size={20} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 dark:bg-[#121212]/50 border-t border-gray-100 dark:border-white/5">
              <div className="flex gap-2 items-center bg-white dark:bg-[#2a2a35] p-2 rounded-full border border-gray-200 dark:border-white/10 focus-within:ring-2 focus-within:ring-violet-500/50 transition-all shadow-inner">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="问点什么..."
                  className="flex-1 bg-transparent px-3 py-2 outline-none text-gray-800 dark:text-white placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className={`p-2.5 rounded-full transition-all ${
                    inputValue.trim() && !isLoading
                      ? 'bg-violet-600 text-white shadow-md hover:scale-105 active:scale-95'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatFloat;
