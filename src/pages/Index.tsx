import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";
import MobileProgressBar from "@/components/MobileProgressBar";
import FloatingContactButton from "@/components/FloatingContactButton";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import VirtualAssistant from "@/components/VirtualAssistant";
import { useMobileSwipe } from "@/hooks/useMobileSwipe";
import { type Section } from "@/hooks/useScrollNavigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionsRef = useRef<{ [key in Section]: HTMLElement | null }>({
    home: null,
    skills: null,
    projects: null,
    blog: null,
    contact: null,
  });

  const handleSectionChange = (section: string) => {
    const newSection = section as Section;
    const targetElement = sectionsRef.current[newSection];
    if (targetElement) {
      // Set scrolling flag to prevent observer conflicts
      setIsScrolling(true);
      
      // Update state immediately for responsive UI
      setActiveSection(newSection);
      
      // Use custom smooth scroll for better mobile performance
      const targetTop = targetElement.offsetTop;
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Mobile: Use manual scroll with easing for smoother transitions
        const startTime = performance.now();
        const startTop = window.pageYOffset;
        const distance = targetTop - startTop;
        const duration = 800; // Smooth duration for mobile
        
        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);
          
          window.scrollTo(0, startTop + distance * easedProgress);
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };
        
        requestAnimationFrame(animateScroll);
      } else {
        // Desktop: Use standard smooth scroll
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

      // Clear scrolling flag after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, isMobile ? 800 : 1000);
    }
  };

  // Mobile swipe navigation
  const sections = ["home", "skills", "projects", "blog", "contact"];
  const getCurrentSectionIndex = () => sections.indexOf(activeSection);
  
  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) {
      handleSectionChange(sections[currentIndex + 1]);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      handleSectionChange(sections[currentIndex - 1]);
    }
  };

  useMobileSwipe({
    onSwipeUp: goToNextSection,
    onSwipeDown: goToPreviousSection,
  });

  // Use Intersection Observer to track which section is currently visible
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0.1, 0.5, 0.9],
    };

    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver((entries) => {
      // Don't update during programmatic scrolling
      if (isScrolling) return;

      // Debounce the observer updates to prevent rapid changes
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let currentSection = activeSection;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const sectionId = entry.target.id as Section;
            if (sectionId) {
              currentSection = sectionId;
            }
          }
        });

        // Update active section if we found a better match and it's significantly visible
        if (maxRatio > 0.3 && currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
      }, 100); // 100ms debounce
    }, observerOptions);

    // Observe all sections
    Object.values(sectionsRef.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [isScrolling, activeSection]);

  // Handle wheel scrolling for section navigation
  useEffect(() => {
    let isScrolling = false;
    const scrollThrottle = 1000;

    const handleWheel = (event: WheelEvent) => {
      if (isScrolling) return;

      // Check if we're at the top or bottom of the page
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const atTop = scrollTop <= 10;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;

      // Only trigger section navigation at page boundaries
      if ((event.deltaY > 0 && atBottom) || (event.deltaY < 0 && atTop)) {
        const sections = ["home", "skills", "projects", "blog", "contact"];
        const currentIndex = sections.indexOf(activeSection);
        
        if (event.deltaY > 0 && currentIndex < sections.length - 1) {
          // Scrolling down at bottom - go to next section
          const nextSection = sections[currentIndex + 1] as Section;
          handleSectionChange(nextSection);
          event.preventDefault();
        } else if (event.deltaY < 0 && currentIndex > 0) {
          // Scrolling up at top - go to previous section
          const prevSection = sections[currentIndex - 1] as Section;
          handleSectionChange(prevSection);
          event.preventDefault();
        }
      }
      // Allow normal scrolling when not at boundaries
    };

    // Handle keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        const sections = ["home", "skills", "projects", "blog", "contact"];
        const currentIndex = sections.indexOf(activeSection);
        if (currentIndex < sections.length - 1) {
          handleSectionChange(sections[currentIndex + 1]);
        }
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        const sections = ["home", "skills", "projects", "blog", "contact"];
        const currentIndex = sections.indexOf(activeSection);
        if (currentIndex > 0) {
          handleSectionChange(sections[currentIndex - 1]);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSection]);

  return (
    <div className="relative">
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      {/* Removed MobileProgressBar since bottom nav handles navigation */}
      
      <main>
        {/* Home Section */}
        <section
          id="home"
          ref={(el) => (sectionsRef.current.home = el)}
          className="min-h-screen w-full"
        >
          <HeroSection onSectionChange={handleSectionChange} />
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={(el) => (sectionsRef.current.skills = el)}
          className="min-h-screen w-full"
        >
          <SkillsSection />
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={(el) => (sectionsRef.current.projects = el)}
          className="min-h-screen w-full"
        >
          <ProjectsSection />
        </section>

        {/* Blog Section */}
        <section
          id="blog"
          ref={(el) => (sectionsRef.current.blog = el)}
          className="min-h-screen w-full"
        >
          <BlogSection />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={(el) => (sectionsRef.current.contact = el)}
          className="min-h-screen w-full"
        >
          <ContactSection />
        </section>
      </main>

      <MobileNavigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      <FloatingContactButton onSectionChange={handleSectionChange} />
      <VirtualAssistant />
    </div>
  );
};

export default Index;
