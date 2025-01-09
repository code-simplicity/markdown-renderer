import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { Root } from 'hast';

interface MarkdownParserOptions {
	components?: Record<string, unknown>;
	urlTransform?: (url: string) => string;
	allowedElements?: string[];
	disallowedElements?: string[];
	highlight?: Record<string, unknown>;
}

export class MarkdownParser {
	private processor: ReturnType<typeof unified>;
	private options: MarkdownParserOptions;

	constructor(options: MarkdownParserOptions = {}) {
		this.options = options;
		this.initProcessor();
	}

	private initProcessor(): void {
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

	async parse(markdown: string): Promise<string | null> {
		try {
			if (!markdown) {
				return null;
			}

			const result = await this.processor.process(markdown);
			return result.value.toString();
		} catch (error) {
			console.error('Markdown parsing error:', error);
			return null;
		}
	}
}
