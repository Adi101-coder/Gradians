import React, { useState, useRef, useEffect, useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import { ThemeContext } from '../../context/ThemeContext'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const { language } = useContext(LanguageContext)
  const { theme } = useContext(ThemeContext)

  const translations = {
    en: {
      title: 'Customer Support',
      placeholder: 'Type your message...',
      send: 'Send',
      welcome: 'Hello! How can I help you today?',
      typing: 'Assistant is typing...',
      close: 'Close Chat',
      minimize: 'Minimize'
    },
    es: {
      title: 'Soporte al Cliente',
      placeholder: 'Escribe tu mensaje...',
      send: 'Enviar',
      welcome: '¡Hola! ¿Cómo puedo ayudarte hoy?',
      typing: 'El asistente está escribiendo...',
      close: 'Cerrar Chat',
      minimize: 'Minimizar'
    },
    fr: {
      title: 'Support Client',
      placeholder: 'Tapez votre message...',
      send: 'Envoyer',
      welcome: 'Bonjour! Comment puis-je vous aider aujourd\'hui?',
      typing: 'L\'assistant tape...',
      close: 'Fermer le Chat',
      minimize: 'Réduire'
    }
  }

  const t = translations[language] || translations.en

  // Predefined responses for demo purposes
  const responses = {
    en: {
      greeting: "Hello! I'm here to help you with any questions about our space-themed products!",
      products: "We offer a wide range of cosmic products including space suits, telescopes, rocket models, and more!",
      shipping: "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days.",
      returns: "You can return any item within 30 days for a full refund. No questions asked!",
      default: "Thank you for your message! Our support team will get back to you soon."
    },
    es: {
      greeting: "¡Hola! ¡Estoy aquí para ayudarte con cualquier pregunta sobre nuestros productos espaciales!",
      products: "Ofrecemos una amplia gama de productos cósmicos incluyendo trajes espaciales, telescopios, modelos de cohetes, ¡y más!",
      shipping: "Ofrecemos envío gratuito en pedidos superiores a $50. La entrega estándar toma 3-5 días hábiles.",
      returns: "Puedes devolver cualquier artículo dentro de 30 días para un reembolso completo. ¡Sin preguntas!",
      default: "¡Gracias por tu mensaje! Nuestro equipo de soporte te responderá pronto."
    },
    fr: {
      greeting: "Bonjour! Je suis là pour vous aider avec toutes vos questions sur nos produits spatiaux!",
      products: "Nous offrons une large gamme de produits cosmiques incluant des combinaisons spatiales, télescopes, modèles de fusées, et plus!",
      shipping: "Nous offrons la livraison gratuite sur les commandes de plus de 50$. La livraison standard prend 3-5 jours ouvrables.",
      returns: "Vous pouvez retourner tout article dans les 30 jours pour un remboursement complet. Sans questions!",
      default: "Merci pour votre message! Notre équipe de support vous répondra bientôt."
    }
  }

  const getResponse = (message) => {
    const msg = message.toLowerCase()
    const resp = responses[language] || responses.en
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hola') || msg.includes('bonjour')) {
      return resp.greeting
    } else if (msg.includes('product') || msg.includes('producto') || msg.includes('produit')) {
      return resp.products
    } else if (msg.includes('shipping') || msg.includes('envío') || msg.includes('livraison')) {
      return resp.shipping
    } else if (msg.includes('return') || msg.includes('devolver') || msg.includes('retour')) {
      return resp.returns
    } else {
      return resp.default
    }
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: t.welcome,
          sender: 'bot',
          timestamp: new Date()
        }
      ])
    }
  }, [isOpen, t.welcome, messages.length])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button 
        className={`chat-toggle ${theme}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="chat-icon">
          {isOpen ? '✕' : '💬'}
        </div>
        <div className="pulse-ring"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`chatbot-container ${theme}`}>
          <div className="chatbot-header">
            <h3>{t.title}</h3>
            <div className="header-buttons">
              <button 
                className="minimize-btn"
                onClick={() => setIsOpen(false)}
                title={t.minimize}
              >
                —
              </button>
              <button 
                className="close-btn"
                onClick={() => {
                  setIsOpen(false)
                  setMessages([])
                }}
                title={t.close}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender}`}
              >
                <div className="message-bubble">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot typing">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.placeholder}
              className="message-input"
            />
            <button 
              onClick={handleSend}
              className="send-btn"
              disabled={!inputValue.trim()}
            >
              {t.send}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot