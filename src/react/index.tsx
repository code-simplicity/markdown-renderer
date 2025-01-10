import { type ComponentType, type HTMLAttributes, useEffect, useState } from 'react';
import { MarkdownParser } from '../core/parser';

interface ReactMarkdownProps {
  children?: string;
  className?: string;
  components?: Record<string, ComponentType<HTMLAttributes<HTMLElement>>>;
  urlTransform?: (url: string) => string;
  allowedElements?: string[];
  disallowedElements?: string[];
  highlight?: {
    theme?: string;
    [key: string]: unknown;
  };
}

export function ReactMarkdown({
  children,
  className = 'markdown-body',
  components = {},
  urlTransform,
  allowedElements,
  disallowedElements,
  highlight,
}: ReactMarkdownProps) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const parser = new MarkdownParser({
      components,
      urlTransform,
      allowedElements,
      disallowedElements,
      highlight,
    });

    async function parseMarkdown() {
      try {
        if (!children) {
          setContent(null);
          return;
        }

        const html = await parser.parse(children);

        if (!html) {
          throw new Error('Failed to parse markdown content');
        }

        setContent(html);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setContent(null);
      }
    }

    parseMarkdown();
  }, [children, components, urlTransform, allowedElements, disallowedElements, highlight]);

  if (error) {
    return <div className="markdown-error">{error.message}</div>;
  }

  if (!content) {
    return <div className="markdown-empty">Loading...</div>;
  }

  return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
}
