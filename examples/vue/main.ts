import 'highlight.js/styles/github.css';
import 'katex/dist/katex.css';
import { createApp, h } from 'vue';
import { VueMarkdown } from '../../src/index';
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

const app = createApp({
	name: 'App',
	setup() {
		return () =>
			h('div', { style: { padding: '20px' } }, [
				h(VueMarkdown, {
					class: 'markdown-body',
					content: markdownContent,
				}),
			]);
	},
});

const rootElement = document.getElementById('app');

if (!rootElement) {
	throw new Error('Failed to find app element');
}

app.mount(rootElement);
