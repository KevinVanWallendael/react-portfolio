import { useIsMobile } from "@/hooks/use-mobile";

interface MobileProgressBarProps {
  activeSection: string;
}

const MobileProgressBar = ({ activeSection }: MobileProgressBarProps) => {
  const isMobile = useIsMobile();
  
  const sections = ["home", "skills", "projects", "blog", "contact"];
  const currentIndex = sections.indexOf(activeSection);
  const progress = ((currentIndex + 1) / sections.length) * 100;

  if (!isMobile) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="relative h-1 bg-muted">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="px-4 py-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground capitalize">
            {activeSection}
          </span>
          <span className="text-muted-foreground">
            {currentIndex + 1} / {sections.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileProgressBar;