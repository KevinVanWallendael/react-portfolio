import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Briefcase, BookOpen, MessageCircle } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "skills", label: "Skills", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile since we have bottom nav */}
      <nav className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "nav"}
              size="icon"
              className="w-12 h-12 rounded-full"
              onClick={() => onSectionChange(item.id)}
              title={item.label}
            >
              <Icon size={20} />
            </Button>
          );
        })}
      </nav>
    </>
  );
};

export default Navigation;