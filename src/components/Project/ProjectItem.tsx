import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Markdown from '../Markdown';
import type { ProjectProps } from '../../types';

function ProjectItem({ name, period, description, stack, links, id }: ProjectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();
  const dialogTitleId = `${dialogId}-title`;
  const dialogPeriodId = `${dialogId}-period`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="project-card"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        onClick={() => setIsOpen(true)}
      >
        <span className="project-card-heading">
          <span className="project-card-title">{name}</span>
          <span className="project-card-period">
            {period[0]} - {period[1]}
          </span>
        </span>
        <span className="project-card-description">{description}</span>
        <span className="project-card-tags" aria-label="사용 기술">
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </button>

      {isOpen &&
        createPortal(
          <div className="project-dialog-layer">
            <button
              type="button"
              className="project-dialog-backdrop"
              tabIndex={-1}
              aria-label="프로젝트 상세 닫기"
              onClick={() => setIsOpen(false)}
            />
            <section
              ref={dialogRef}
              id={dialogId}
              className="project-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              aria-describedby={dialogPeriodId}
              tabIndex={-1}
            >
              <header className="project-dialog-header">
                <div className="project-dialog-heading">
                  <div className="project-dialog-title-row">
                    <h3 id={dialogTitleId}>{name}</h3>
                    {links && links.length > 0 && (
                      <span className="project-dialog-status" aria-hidden="true" />
                    )}
                  </div>
                  <p id={dialogPeriodId} className="project-dialog-period">
                    {period[0]} - {period[1]}
                  </p>

                  {links && links.length > 0 && (
                    <div className="project-dialog-links" aria-label="프로젝트 링크">
                      {links.map((link) => (
                        <a key={link.name} href={link.href} target="_blank" rel="noreferrer">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 3h6v6" />
                            <path d="M10 14 21 3" />
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          </svg>
                          {link.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="project-dialog-close"
                  aria-label="프로젝트 상세 닫기"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </header>

              <div className="project-dialog-content">
                <Markdown src={`/markdown/project/${id}.md`} className="project-dialog-markdown" />

                <section className="project-dialog-stack" aria-labelledby={`${dialogId}-stack`}>
                  <h4 id={`${dialogId}-stack`}>Tech Stack</h4>
                  <p>{stack.join(', ')}</p>
                </section>
              </div>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}

export default ProjectItem;
