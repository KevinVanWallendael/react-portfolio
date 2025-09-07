import { useState, useEffect } from "react";

const DynamicGreeting = () => {
  const greetings = [
    "Hello, I'm",           // English
    "Hallo, ik ben",        // Dutch
    "Cześć, jestem",        // Polish
    "Bonjour, je suis",     // French
    "Hola, soy",            // Spanish
    "Hallo, ich bin",       // German
    "Ciao, sono",           // Italian
    "こんにちは、私は",        // Japanese
    "Привіт, я",            // Ukrainian
    "你好，我是",             // Chinese
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % greetings.length);
        setIsAnimating(false);
      }, 300); // Half of the animation duration
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 flex items-center overflow-hidden">
      <span 
        className={`text-accent text-xl font-medium block transition-all duration-300 transform ${
          isAnimating 
            ? 'opacity-0 -translate-y-4 scale-95' 
            : 'opacity-100 translate-y-0 scale-100'
        }`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {greetings[currentIndex]}
      </span>
    </div>
  );
};

export default DynamicGreeting;