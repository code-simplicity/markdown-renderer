import { createApp } from 'vue';
import { VueMarkdown } from '../../src/vue/index.js';
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.css';

const App = {
	components: {
		VueMarkdown,
	},
	setup() {
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

		return {
			markdownContent,
		};
	},
	template: `
    <VueMarkdown
      class="markdown-body"
      :content="markdownContent"
      :highlight="{ theme: 'github' }"
    />
  `,
};

createApp(App).mount('#app');
