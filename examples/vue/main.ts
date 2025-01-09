import { createApp, h } from 'vue';
import { VueMarkdown } from '../../src/index';
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.css';
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

const app = createApp({
	name: 'App',
	setup() {
		console.log('App component rendering');
		return () => h('div', { style: { padding: '20px' } }, [
			h(VueMarkdown, {
				content: markdownContent,
				className: 'markdown-body',
			}),
		]);
	},
});

// 确保 DOM 已经加载
document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM loaded, looking for root element');
	const rootElement = document.getElementById('app');

	if (!rootElement) {
		console.error('Root element not found!');
		return;
	}

	console.log('Root element found, mounting Vue app');
	try {
		app.mount(rootElement);
		console.log('App mounted');
	} catch (error) {
		console.error('Error mounting Vue app:', error);
	}
});
