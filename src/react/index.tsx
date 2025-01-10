import { useEffect, useState, type ComponentType, type HTMLAttributes } from 'react';
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
  className,
  components = {},
  urlTransform,
  allowedElements,
  disallowedElements,
  highlight,
}: ReactMarkdownProps) {
  console.log('ReactMarkdown component rendered with props:', {
    children,
    className,
    components,
    urlTransform,
    allowedElements,
    disallowedElements,
    highlight,
  });

  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('ReactMarkdown useEffect triggered');
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
          console.log('No markdown content provided');
          setContent(null);
          return;
        }

        console.log('Parsing markdown:', children);
        const html = await parser.parse(children);
        console.log('Parser result:', html);

        if (!html) {
          console.error('Failed to parse markdown to HTML');
          setContent(null);
          return;
        }

        console.log('Setting content with HTML:', html);
        setContent(html);
        setError(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error rendering markdown:', error);
        setError(errorMessage);
        setContent(null);
      }
    }

    parseMarkdown();
  }, [children, components, urlTransform, allowedElements, disallowedElements, highlight]);

  console.log('Current state:', { content, error });

  if (error) {
    console.error('Rendering error state:', error);
    return <div className="markdown-error">Error: {error}</div>;
  }

  if (!content) {
    console.log('Rendering loading state');
    return <div className="markdown-empty">Loading...</div>;
  }

  console.log('Rendering markdown content');
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
