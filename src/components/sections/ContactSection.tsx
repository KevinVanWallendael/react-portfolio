import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mail, Linkedin, MapPin, Phone, MessageCircle, Music, Heart, Coffee } from "lucide-react";
import { useState, useEffect } from "react";

const ContactSection = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const funFacts = [
    "Kevin speaks 4 languages: English, Dutch, Polish, and French",
    "Transformed Amazon's data pipelines, improving efficiency by 40%", 
    "Coffee-powered developer who thinks in SQL and dreams in Python",
    "Has worked across 3 continents, bringing global perspective to every project",
    "Can turn complex data into compelling stories that drive decisions"
  ];

  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 4000);

    return () => {
      clearInterval(factInterval);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 py-section pb-24 md:pb-section">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Let's Connect</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on your next data project or discuss opportunities? 
            I'd love to hear from you and explore how we can create value together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Contact Info */}
          <div className="card-elegant rounded-2xl p-6 md:p-8 space-y-6">
            <div className="text-center mb-6 md:mb-8">
              <MessageCircle size={40} className="text-accent mx-auto mb-3 md:mb-4 md:w-12 md:h-12" />
              <h3 className="text-xl md:text-2xl font-bold">Get In Touch</h3>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div 
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary/70 transition-colors min-h-[60px]"
                onClick={() => window.open('mailto:kev.vanwallendael@gmail.com', '_self')}
              >
                <Mail size={20} className="text-accent md:w-6 md:h-6 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-sm md:text-base">Email</p>
                  <p className="text-muted-foreground text-xs md:text-sm">kev.vanwallendael@gmail.com</p>
                </div>
              </div>

              <div 
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary/70 transition-colors min-h-[60px]"
                onClick={() => window.open('https://www.linkedin.com/in/kevin-van-wallendael/', '_blank')}
              >
                <Linkedin size={20} className="text-accent md:w-6 md:h-6 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-sm md:text-base">LinkedIn</p>
                  <p className="text-muted-foreground text-xs md:text-sm">kevinvanwallendael</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-secondary/50 min-h-[60px]">
                <MapPin size={20} className="text-accent md:w-6 md:h-6 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-sm md:text-base">Location</p>
                  <p className="text-muted-foreground text-xs md:text-sm">Europe, North America, or Remote</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Facts & Collaboration Section */}
          <div className="space-y-6 md:space-y-8">
            {/* Fun Facts Carousel */}
            <div className="card-elegant rounded-2xl p-6 md:p-8">
              <div className="text-center space-y-4 md:space-y-6">
                <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
                  <Heart size={20} className="text-accent md:w-6 md:h-6" />
                  <h3 className="text-lg md:text-2xl font-bold">Fun Facts</h3>
                </div>
                <div className="text-sm md:text-lg font-medium text-center min-h-[4rem] md:min-h-[3rem] flex items-center justify-center px-2">
                  <span className="animate-fade-in" key={currentFactIndex}>
                    {funFacts[currentFactIndex]}
                  </span>
                </div>
                <div className="flex justify-center gap-2">
                  {funFacts.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentFactIndex ? 'bg-accent' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Collaboration Readiness */}
            <div className="card-elegant rounded-2xl p-6 md:p-8">
              <div className="text-center space-y-4 md:space-y-6">
                <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
                  <Coffee size={20} className="text-accent md:w-6 md:h-6" />
                  <h3 className="text-lg md:text-2xl font-bold">Collaboration Readiness</h3>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between text-sm md:text-lg">
                    <span className="text-muted-foreground">Ready to collaborate</span>
                    <span className="font-bold text-accent">98%</span>
                  </div>
                  <Progress value={98} className="h-2 md:h-3" />
                  <div className="text-xs md:text-sm text-center text-muted-foreground">
                    Missing: 2% more coffee ☕
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            Response time: Usually within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;