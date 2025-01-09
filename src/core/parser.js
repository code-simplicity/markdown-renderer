import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export class MarkdownParser {
	constructor(options = {}) {
		this.options = options;
		this.initProcessor();
	}

	initProcessor() {
		this.processor = unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkMath)
			.use(remarkRehype, {
				allowDangerousHtml: true,
				allowedElements: this.options.allowedElements,
				disallowedElements: this.options.disallowedElements,
			})
			.use(rehypeKatex)
			.use(rehypeHighlight, this.options.highlight || {})
			.use(rehypeStringify);
	}

	async parse(markdown) {
		try {
			if (!markdown) {
				return null;
			}

			const result = await this.processor.process(markdown);
			return result.value;
		} catch (error) {
			console.error('Markdown parsing error:', error);
			return null;
		}
	}
}
