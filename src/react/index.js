import React from 'react';
import { MarkdownParser } from '../core/parser.js';

export function ReactMarkdown({
	children,
	className,
	components = {},
	urlTransform,
	allowedElements,
	disallowedElements,
	highlight,
}) {
	const [content, setContent] = React.useState(null);
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
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
				console.error('Error rendering markdown:', error);
				setError(error.message);
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
