import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownCache = new Map<string, string>();

function Markdown({ src, className = '' }: { src: string; className?: string }) {
  const [markdown, setMarkdown] = useState(() => markdownCache.get(src) ?? '');
  const [isLoading, setIsLoading] = useState(!markdownCache.has(src));

  useEffect(() => {
    const cached = markdownCache.get(src);
    if (cached !== undefined) {
      setMarkdown(cached);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    let isActive = true;
    setIsLoading(true);

    fetch(src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Markdown load failed: ${response.status}`);
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('text/html')) {
          throw new Error(`Markdown file not found: ${src}`);
        }
        return response.text();
      })
      .then((content) => {
        if (!isActive) return;
        markdownCache.set(src, content);
        setMarkdown(content);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        if (isActive) setMarkdown('');
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [src]);

  if (isLoading) {
    return <div className="markdown-loading" aria-label="콘텐츠를 불러오는 중" />;
  }

  return (
    <div className={`markdown ${className}`.trim()}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children, title }) {
            if (href && /\.mp4(?:$|[?#])/i.test(href)) {
              const label = typeof children === 'string' ? children : (title ?? '프로젝트 영상');

              return (
                <video className="markdown-video" controls preload="metadata" aria-label={label}>
                  <source src={href} type="video/mp4" />
                  브라우저에서 영상을 재생할 수 없습니다.
                </video>
              );
            }

            return (
              <a href={href} title={title}>
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
