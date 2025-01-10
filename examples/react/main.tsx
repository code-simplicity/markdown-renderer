import 'highlight.js/styles/github.css';
import 'katex/dist/katex.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactMarkdown } from '../../src/index';
import './styles.css';

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
	return (
		<div style={{ padding: '20px' }}>
			<ReactMarkdown className="markdown-body">{markdownContent}</ReactMarkdown>
		</div>
	);
}

// 确保 DOM 已经加载
document.addEventListener('DOMContentLoaded', () => {
	const rootElement = document.getElementById('root');

	if (!rootElement) {
		throw new Error('Failed to find root element');
	}

	const root = createRoot(rootElement);

	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
});
