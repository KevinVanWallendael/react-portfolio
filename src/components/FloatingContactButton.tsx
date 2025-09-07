import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Mail, Phone, Linkedin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingContactButtonProps {
  onSectionChange: (section: string) => void;
}

const FloatingContactButton = ({ onSectionChange }: FloatingContactButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const contactOptions = [
    {
      icon: Mail,
      label: "Email",
      action: () => window.open('mailto:kev.vanwallendael@gmail.com', '_self'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      action: () => window.open('https://www.linkedin.com/in/kevin-van-wallendael/', '_blank'),
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      icon: MessageCircle,
      label: "Contact Form",
      action: () => {
        onSectionChange('contact');
        setIsExpanded(false);
      },
      color: "bg-neon-purple hover:bg-neon-violet"
    }
  ];

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {/* Contact options */}
      <div className={`flex flex-col gap-2 mb-2 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {contactOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.label}
              size="icon"
              className={`w-12 h-12 rounded-full shadow-lg ${option.color} text-white transition-all duration-200 transform hover:scale-110`}
              style={{
                transitionDelay: isExpanded ? `${index * 50}ms` : '0ms'
              }}
              onClick={option.action}
            >
              <Icon size={20} />
            </Button>
          );
        })}
      </div>

      {/* Main toggle button */}
      <Button
        size="icon"
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-180' 
            : 'bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-violet hover:scale-110'
        } text-white`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
    </div>
  );
};

export default FloatingContactButton;