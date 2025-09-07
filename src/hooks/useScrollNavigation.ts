import { useEffect, useCallback, useRef } from "react";

export type Section = "home" | "skills" | "projects" | "blog" | "contact";

const SECTIONS: Section[] = ["home", "skills", "projects", "blog", "contact"];
const SCROLL_THROTTLE = 1000; // Prevent rapid section changes

interface UseScrollNavigationProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export const useScrollNavigation = ({
  activeSection,
  onSectionChange,
}: UseScrollNavigationProps) => {
  const lastScrollTime = useRef(0);
  const isScrolling = useRef(false);

  const getCurrentSectionIndex = useCallback(() => {
    return SECTIONS.indexOf(activeSection);
  }, [activeSection]);

  const goToNextSection = useCallback(() => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < SECTIONS.length - 1) {
      onSectionChange(SECTIONS[currentIndex + 1]);
    }
  }, [getCurrentSectionIndex, onSectionChange]);

  const goToPreviousSection = useCallback(() => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      onSectionChange(SECTIONS[currentIndex - 1]);
    }
  }, [getCurrentSectionIndex, onSectionChange]);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      const now = Date.now();
      
      // Only handle section navigation if scrolling at page boundaries
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const atTop = scrollTop <= 10;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      
      // Only prevent default and change sections at page boundaries
      if ((event.deltaY > 0 && atBottom) || (event.deltaY < 0 && atTop)) {
        // Prevent rapid scrolling
        if (now - lastScrollTime.current < SCROLL_THROTTLE || isScrolling.current) {
          event.preventDefault();
          return;
        }

        lastScrollTime.current = now;
        isScrolling.current = true;

        // Set scrolling to false after animation completes
        setTimeout(() => {
          isScrolling.current = false;
        }, 600);

        if (event.deltaY > 0) {
          // Scrolling down at bottom - go to next section
          goToNextSection();
        } else {
          // Scrolling up at top - go to previous section
          goToPreviousSection();
        }

        event.preventDefault();
      }
      // Allow normal scrolling when not at boundaries
    },
    [goToNextSection, goToPreviousSection]
  );

  const handleTouchStart = useRef<{ y: number } | null>(null);

  const handleTouchStartEvent = useCallback((event: TouchEvent) => {
    handleTouchStart.current = {
      y: event.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!handleTouchStart.current) return;

      const now = Date.now();
      
      if (now - lastScrollTime.current < SCROLL_THROTTLE || isScrolling.current) {
        return;
      }

      const yDiff = handleTouchStart.current.y - event.changedTouches[0].clientY;
      const threshold = 50; // Minimum swipe distance

      if (Math.abs(yDiff) > threshold) {
        lastScrollTime.current = now;
        isScrolling.current = true;

        setTimeout(() => {
          isScrolling.current = false;
        }, 600);

        if (yDiff > 0) {
          // Swiped up - go to next section
          goToNextSection();
        } else {
          // Swiped down - go to previous section
          goToPreviousSection();
        }
      }

      handleTouchStart.current = null;
    },
    [goToNextSection, goToPreviousSection]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goToNextSection();
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goToPreviousSection();
      }
    };

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStartEvent, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      // Cleanup event listeners
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStartEvent);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, goToNextSection, goToPreviousSection, handleTouchStartEvent, handleTouchEnd]);

  return {
    getCurrentSectionIndex,
    totalSections: SECTIONS.length,
    canGoNext: getCurrentSectionIndex() < SECTIONS.length - 1,
    canGoPrevious: getCurrentSectionIndex() > 0,
  };
};