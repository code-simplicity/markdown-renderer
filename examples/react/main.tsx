import 'highlight.js/styles/github.css';
import 'katex/dist/katex.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactMarkdown } from '../../src/index';
import './styles.css';

console.log('Script loaded');

const markdownContent = `
# Hello Markdown

This is a **bold** text and *italic* text.

\`\`\`javascript
function hello() {
	console.log('Hello World!');
}
\`\`\`

Math equation: $E = mc^2$

| Table | Header |
|-------|--------|
| Cell  | Cell   |
`;

function App() {
	console.log('App component rendering');
	return (
		<div style={{ padding: '20px' }}>
			<ReactMarkdown className="markdown-body">{markdownContent}</ReactMarkdown>
		</div>
	);
}

// 确保 DOM 已经加载
document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM loaded, looking for root element');
	const rootElement = document.getElementById('root');

	if (!rootElement) {
		console.error('Root element not found!');
		return;
	}

	console.log('Root element found, creating React root');
	try {
		const root = createRoot(rootElement);
		console.log('React root created, rendering App');
		root.render(
			<React.StrictMode>
				<App />
			</React.StrictMode>
		);
		console.log('App rendered');
	} catch (error) {
		console.error('Error rendering React app:', error);
	}
});
