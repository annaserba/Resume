import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import useOpenAI from '../../hooks/useOpenAI';
import useTranslation from '../../hooks/useTraslation';
import useRateLimit from '../../hooks/useRateLimit';
import { useTheme } from '../providers/ThemeProvider';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWidgetProps {
  apiKey?: string;
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
  secondaryColor?: string;
  language?: string;
  botName?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  apiKey,
  position = 'bottom-right',
  primaryColor = '#4a6cf7',
  secondaryColor = '#f5f5f5',
  language = 'ru'
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isLoading, init } = useOpenAI({ apiKey, language });
  const { t } = useTranslation(language);
  
  // Initialize rate limiting with 10 messages per day
  const { 
    remainingRequests, 
    isLimited, 
    timeUntilReset, 
    consumeRequest 
  } = useRateLimit({ maxRequests: 20 });

  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Обработка отправки сообщения
  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;
    
    // Check rate limit before proceeding
    if (isLimited) {
      const rateLimitMessage: Message = {
        id: Date.now().toString(),
        text: `${t.limitReached} ${timeUntilReset}`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, rateLimitMessage]);
      return;
    }
    
    // Consume a request from our daily limit
    const canProceed = consumeRequest();
    if (!canProceed) {
      const rateLimitMessage: Message = {
        id: Date.now().toString(),
        text: `${t.limitReached} ${timeUntilReset}`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, rateLimitMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Отправляем сообщение через хук useOpenAI
      const response = await sendMessage(inputText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response || t.error,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t.error,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Обработка нажатия Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Компонент ввода сообщения и кнопки отправки
  const renderInputArea = () => (
    <div className="chat-widget-input-container">
      {/* Show remaining messages counter */}
      <div className="chat-widget-rate-limit">
        {t.remaining} {remainingRequests}
      </div>
      <div className="chat-widget-input">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.botPlaceholder}
          onKeyDown={handleKeyPress}
          disabled={isLoading || isLimited}
        />
        <button 
          onClick={handleSendMessage} 
          disabled={inputText.trim() === '' || isLoading || isLimited}
          style={{ backgroundColor: primaryColor }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );

  return (init &&
    <div className={`chat-widget-container ${position} ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {!isOpen ? (
        <button 
          className="chat-widget-button"
          onClick={() => {setIsOpen(true)}}
          style={{ backgroundColor: primaryColor }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      ) : (
        <div className={`chat-widget-panel ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
          <div className="chat-widget-header" style={{ backgroundColor: primaryColor }}>
            <div className="chat-widget-title">{t.botName}</div>
            <button className="chat-widget-close" onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="chat-widget-messages">
            {messages.length === 0 ? (
              <div className="chat-placeholder">
                <div className="chat-welcome-message">
                  <p>{t.greeting}</p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  style={{ 
                    backgroundColor: message.sender === 'user' ? primaryColor : secondaryColor,
                    color: message.sender === 'user' ? '#fff' : '#333'
                  }}
                >
                  {message.sender === 'bot' ? (
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                  ) : (
                    message.text
                  )}
                  <div className="message-timestamp">
                    {new Intl.DateTimeFormat('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(message.timestamp)}
                  </div>
                </div>
              ))
            )}
            
            {isTyping && (
              <div className="chat-message bot-message typing-indicator" style={{ backgroundColor: secondaryColor }}>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {renderInputArea()}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
