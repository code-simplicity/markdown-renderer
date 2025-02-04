import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

interface MarkdownParserOptions {
  components?: Record<string, unknown>;
  urlTransform?: (url: string) => string;
  allowedElements?: string[];
  disallowedElements?: string[];
  highlight?: Record<string, unknown>;
}

export class MarkdownParser {
  // biome-ignore lint/suspicious/noExplicitAny: Unified processor type is complex
  private processor: any;

  constructor(options: MarkdownParserOptions = {}) {
    this.processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype, {
        allowDangerousHtml: true,
        allowedElements: options.allowedElements,
        disallowedElements: options.disallowedElements,
      })
      .use(rehypeKatex)
      .use(rehypeHighlight, options.highlight || {})
      .use(rehypeStringify);
  }

  async parse(markdown: string): Promise<string | null> {
    try {
      if (!markdown) {
        return null;
      }

      const result = await this.processor.process(markdown);
      return result.toString();
    } catch (error) {
      console.error('Markdown parsing error:', error);
      return null;
    }
  }
}
