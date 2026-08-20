import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollRevealSectionProps {
  labelledBy: string;
  children: ReactNode;
  className?: string;
  revealWhen?: boolean;
}

function ScrollRevealSection({
  labelledBy,
  children,
  className = '',
  revealWhen = true,
}: ScrollRevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const classes = [className, 'scroll-reveal', isVisible && revealWhen ? 'is-visible' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={sectionRef} className={classes} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}

export default ScrollRevealSection;
