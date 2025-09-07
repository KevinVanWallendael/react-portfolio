import { useState } from "react";
import { MessageCircle, X, Send, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

// Component to format W.A.L.L.Y's messages with proper styling
const FormattedMessage = ({ content, isUser }: { content: string; isUser: boolean }) => {
  if (isUser) {
    return <span>{content}</span>;
  }

  // Split content by line breaks and format
  const parts = content.split('\n').map((line, index) => {
    // Handle URLs - make them clickable
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Clean up bullet points - remove existing bullet symbols and dashes
    let cleanLine = line.trim();
    if (cleanLine.startsWith('•') || cleanLine.startsWith('-')) {
      cleanLine = cleanLine.replace(/^[•\-]\s*/, '').trim();
    }
    
    const lineWithLinks = cleanLine.split(urlRegex).map((part, partIndex) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={partIndex}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-blue hover:text-neon-purple underline transition-colors"
          >
            {part}
          </a>
        );
      }
      
      // Handle bold text **text**
      return part.split(/(\*\*.*?\*\*)/).map((textPart, textIndex) => {
        if (textPart.startsWith('**') && textPart.endsWith('**')) {
          return (
            <strong key={textIndex} className="font-semibold text-neon-purple">
              {textPart.slice(2, -2)}
            </strong>
          );
        }
        return textPart;
      });
    });

    // Handle bullet points (check original line for bullet indicators)
    if (line.trim().startsWith('- ') || line.trim().startsWith('•')) {
      return (
        <div key={index} className="flex items-start space-x-3 my-2 pl-2">
          <span className="text-neon-purple text-lg mt-0.5 flex-shrink-0">•</span>
          <span className="flex-1 leading-relaxed">{lineWithLinks}</span>
        </div>
      );
    }

    // Handle empty lines as spacing
    if (line.trim() === '') {
      return <div key={index} className="h-2" />;
    }

    // Regular lines
    return (
      <div key={index} className="mb-2 leading-relaxed">
        {lineWithLinks}
      </div>
    );
  });

  return <div className="space-y-1">{parts}</div>;
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const VirtualAssistant = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm W.A.L.L.Y, Kevin's AI assistant! 🤖 I can answer questions about Kevin's background, skills, and experience. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the edge function for OpenAI processing
      const { data, error } = await supabase.functions.invoke('chat-with-wally', {
        body: {
          messages: messages,
          userMessage: userMessage
        }
      });

      if (error) {
        throw error;
      }

      const assistantReply = data.content || "I'm having trouble processing that. Can you try rephrasing your question?";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantReply }]);

    } catch (error) {
      console.error('W.A.L.L.Y error:', error);
      const fallbackResponse = getFallbackResponse(input);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: fallbackResponse
      }]);
    }

    setIsLoading(false);
  };

  const getFallbackResponse = (input: string): string => {
    const inputLower = input.toLowerCase();
    
    if (inputLower.includes('skill') || inputLower.includes('expertise') || inputLower.includes('technology')) {
      return "Kevin specializes in Business Intelligence & Data Warehousing! 📊 His expertise includes Power BI, Quicksight, Streamlit, AWS, and Python ML. He's worked at Amazon developing data-driven solutions! 🚀";
    }
    if (inputLower.includes('experience') || inputLower.includes('background') || inputLower.includes('work') || inputLower.includes('amazon')) {
      return "Kevin is a Business Intelligence Engineer with valuable Amazon experience! 💼 He develops data-driven solutions that improve operational efficiency and has certifications in MicroStrategy and Azure! 😎";
    }
    if (inputLower.includes('contact') || inputLower.includes('reach') || inputLower.includes('email')) {
      return "You can reach Kevin at kev.vanwallendael@gmail.com 📧 Or connect on LinkedIn: https://www.linkedin.com/in/kevin-van-wallendael/ and GitHub: https://github.com/KevinVanWallendael 🤝";
    }
    if (inputLower.includes('project')) {
      return "Kevin has awesome projects! 💻 Check out his Stock Portfolio Analyzer, Warsaw Housing Prediction model, and Otodom Web Scraper on GitHub. All use Python, ML, and data visualization! ✨";
    }
    if (inputLower.includes('fun') || inputLower.includes('hobby') || inputLower.includes('interest')) {
      return "Kevin loves vinyl records 🎵, traveling for coffee ☕, playing squash 🏸, fantasy shows like Game of Thrones 🐉, and Taylor Swift concerts! 🎤 He's Belgian-Polish and lives in Luxembourg! 🌍";
    }
    if (inputLower.includes('language') || inputLower.includes('speak')) {
      return "Kevin speaks Dutch, English, and Polish! 🌍 He's got that international flair with his Belgian-Polish heritage! 🇧🇪🇵🇱";
    }
    
    return "That's a great question! 🤔 Kevin is a BI Engineer at Amazon passionate about data analytics and ML. Feel free to ask about his projects, experience, fun facts, or anything else! 💡";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div 
      className={`fixed z-[9998] ${isMobile ? 'bottom-20 right-4' : 'bottom-6 right-6'}`}
      style={{ 
        position: 'fixed',
        zIndex: 9998,
        bottom: isMobile ? '80px' : '24px',
        right: isMobile ? '16px' : '24px',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {!isOpen && (
        <div className="relative">
          {/* Enhanced pulsating rings */}
          <div className="absolute inset-0 w-20 h-20 rounded-full animate-ping bg-neon-blue/20 -m-2"></div>
          <div className="absolute inset-0 w-20 h-20 rounded-full animate-pulse bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 -m-2" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 w-20 h-20 rounded-full animate-ping bg-neon-purple/15 -m-2" style={{ animationDelay: '1s' }}></div>
          
          <Button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-violet hover:from-neon-purple hover:via-neon-violet hover:to-neon-blue shadow-2xl shadow-neon-blue/40 hover:shadow-neon-purple/50 transition-all duration-500 group overflow-hidden border border-neon-blue/30 hover:scale-110"
          >
            {/* Space particle effects */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
            
            {/* Happy robot face */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* Cute robot eyes */}
              <div className="flex space-x-1 mb-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-sm"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-sm" style={{ animationDelay: '0.2s' }}></div>
              </div>
              {/* Happy smile */}
              <div className="w-3 h-1.5 border border-white rounded-b-full border-t-0"></div>
              {/* Message icon overlay */}
              <MessageCircle size={14} className="absolute text-white/60 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            </div>
            
            {/* Floating hearts */}
            <div className="absolute -top-1 -right-1 text-xs animate-bounce" style={{ animationDuration: '2s' }}>💝</div>
          </Button>
        </div>
      )}

      {isOpen && (
        <Card className="w-80 h-[500px] md:w-96 md:h-[600px] bg-background/90 backdrop-blur-xl border border-neon-blue/40 shadow-2xl shadow-neon-blue/25 flex flex-col relative overflow-hidden">
          {/* Space background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(155,135,245,0.1),transparent_50%)]"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neon-purple/30 bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-violet/10 backdrop-blur-sm relative z-10">
            <div className="flex items-center space-x-3">
              {/* Enhanced robot avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-violet/20 rounded-full border-2 border-neon-blue/50 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-neon-blue/30 hover:scale-110 transition-all duration-300 group">
                <div className="flex flex-col items-center animate-bounce" style={{ animationDuration: '2s' }}>
                  {/* Happy sparkling eyes */}
                  <div className="flex space-x-1.5 mb-1.5">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-neon-blue to-blue-400 rounded-full animate-pulse shadow-lg shadow-neon-blue/50"></div>
                      {/* Eye sparkle */}
                      <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    </div>
                    <div className="relative">
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-neon-blue to-blue-400 rounded-full animate-pulse shadow-lg shadow-neon-blue/50" style={{ animationDelay: '0.3s' }}></div>
                      {/* Eye sparkle */}
                      <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                  {/* Happy smile */}
                  <div className="w-5 h-2.5 border-2 border-neon-purple/90 rounded-b-full border-t-0 shadow-sm group-hover:border-pink-400 transition-colors duration-300"></div>
                  {/* Cute cheek blushes */}
                  <div className="absolute -left-1 top-2 w-1.5 h-1.5 bg-pink-300/60 rounded-full animate-pulse"></div>
                  <div className="absolute -right-1 top-2 w-1.5 h-1.5 bg-pink-300/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">W.A.L.L.Y</h3>
                <p className="text-sm text-neon-blue font-medium">Kevin's AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-5 relative z-10">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-neon-blue via-neon-purple to-neon-violet text-primary-foreground shadow-neon-blue/20'
                        : 'bg-card/80 backdrop-blur-sm border border-neon-blue/30 text-foreground shadow-neon-purple/10'
                    }`}
                  >
                    <FormattedMessage 
                      content={message.content} 
                      isUser={message.role === 'user'} 
                    />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-card/80 backdrop-blur-sm border border-neon-blue/30 p-4 rounded-2xl shadow-lg shadow-neon-purple/10">
                    <div className="flex items-center space-x-2">
                      <Loader className="animate-spin w-4 h-4 text-neon-blue" />
                      <span className="text-sm text-muted-foreground">W.A.L.L.Y is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-neon-purple/30 bg-gradient-to-r from-neon-blue/5 via-neon-purple/5 to-neon-violet/5 backdrop-blur-sm relative z-10">
            <div className="flex space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Kevin..."
                className="flex-1 border-neon-blue/40 focus:border-neon-purple/60 bg-background/80 backdrop-blur-sm shadow-sm rounded-xl"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                size="sm"
                className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-violet hover:from-neon-purple hover:via-neon-violet hover:to-neon-blue shadow-lg shadow-neon-blue/30 hover:shadow-neon-purple/40 transition-all duration-300 rounded-xl px-4"
                disabled={isLoading || !input.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VirtualAssistant;