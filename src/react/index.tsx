import React, { useEffect, useState } from 'react';
import { MarkdownParser } from '../core/parser';

interface ReactMarkdownProps {
	children?: string;
	className?: string;
	components?: Record<string, React.ComponentType<any>>;
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
	const [content, setContent] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

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
					console.log('No markdown content provided');
					setContent(null);
					return;
				}

				console.log('Parsing markdown:', children);
				const html = await parser.parse(children);
				
				if (!html) {
					console.error('Failed to parse markdown to HTML');
					setContent(null);
					return;
				}

				console.log('Generated HTML:', html);
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
	}, [
		children,
		components,
		urlTransform,
		allowedElements,
		disallowedElements,
		highlight,
	]);

	if (error) {
		return <div className="markdown-error">Error: {error}</div>;
	}

	if (!content) {
		return <div className="markdown-empty">Loading...</div>;
	}

	return (
		<div 
			className={className}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
}
