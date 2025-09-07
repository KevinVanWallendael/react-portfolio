import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, BookOpen, MessageCircle, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const MobileNavigation = ({ activeSection, onSectionChange }: MobileNavigationProps) => {
  const isMobile = useIsMobile();

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "skills", label: "Skills", icon: User },
    { id: "projects", label: "Work", icon: Briefcase },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  if (!isMobile) return null;

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-card/95 backdrop-blur-md border-t border-border shadow-2xl" 
      style={{ 
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        right: '0px',
        zIndex: 9999,
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 min-h-[44px] transition-all duration-200 ${
                isActive 
                  ? "text-neon-blue bg-neon-blue/10" 
                  : "text-muted-foreground hover:text-neon-blue"
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon size={18} className={isActive ? "text-neon-blue" : ""} />
              <span className={`text-xs font-medium ${isActive ? "text-neon-blue" : ""}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;