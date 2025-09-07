import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import DynamicGreeting from "@/components/DynamicGreeting";
const profilePhoto = "/images/profilePicture.png";

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

const HeroSection = ({ onSectionChange }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 relative pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Content */}
        <div className="space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-1">
          <div className="space-y-3 md:space-y-4">
            <DynamicGreeting />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              Kevin Van<br />Wallendael
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium">
              Business Intelligence Engineer
            </p>
          </div>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0">
            Transforming complex data into actionable insights that drive business growth. 
            Passionate about creating elegant solutions that bridge the gap between 
            technology and strategic decision-making.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
            <Button 
              variant="hero" 
              onClick={() => onSectionChange('projects')}
              className="group min-h-[44px] text-base md:text-lg px-6 md:px-8"
            >
              View My Work
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 md:gap-4 pt-4 justify-center md:justify-start">
            <Button 
              variant="nav" 
              size="icon" 
              className="rounded-full min-h-[44px] min-w-[44px] w-11 h-11 md:w-10 md:h-10"
              onClick={() => window.open('https://github.com/KevinVanWallendael', '_blank')}
            >
              <Github size={20} />
            </Button>
            <Button 
              variant="nav" 
              size="icon" 
              className="rounded-full min-h-[44px] min-w-[44px] w-11 h-11 md:w-10 md:h-10"
              onClick={() => window.open('https://www.linkedin.com/in/kevin-van-wallendael/', '_blank')}
            >
              <Linkedin size={20} />
            </Button>
            <Button 
              variant="nav" 
              size="icon" 
              className="rounded-full min-h-[44px] min-w-[44px] w-11 h-11 md:w-10 md:h-10"
              onClick={() => window.open('mailto:kev.vanwallendael@gmail.com', '_self')}
            >
              <Mail size={20} />
            </Button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center order-1 md:order-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-violet/15 rounded-full blur-2xl animate-pulse"></div>
            <img
              src={profilePhoto}
              alt="Kevin Van Wallendael"
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-full border-4 border-neon-blue/30 shadow-2xl"
              style={{ 
                boxShadow: `0 0 40px hsl(var(--neon-blue) / 0.3), 0 0 80px hsl(var(--neon-purple) / 0.2)`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;