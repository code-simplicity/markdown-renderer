import { defineComponent, h, ref, watch, type PropType } from 'vue';
import { MarkdownParser } from '../core/parser';

export const VueMarkdown = defineComponent({
	name: 'VueMarkdown',
	props: {
		content: {
			type: String,
			default: '',
		},
		className: {
			type: String,
			default: '',
		},
		components: {
			type: Object as PropType<Record<string, unknown>>,
			default: () => ({}),
		},
		urlTransform: {
			type: Function as PropType<(url: string) => string>,
			default: undefined,
		},
		allowedElements: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		disallowedElements: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		highlight: {
			type: Object as PropType<{
				theme?: string;
				[key: string]: unknown;
			}>,
			default: () => ({}),
		},
	},
	setup(props) {
		const parser = new MarkdownParser({
			components: props.components,
			urlTransform: props.urlTransform,
			allowedElements: props.allowedElements,
			disallowedElements: props.disallowedElements,
			highlight: props.highlight,
		});

		const html = ref<string | null>(null);
		const error = ref<string | null>(null);

		async function parseMarkdown() {
			try {
				if (!props.content) {
					console.log('No markdown content provided');
					html.value = null;
					return;
				}

				console.log('Parsing markdown:', props.content);
				const parsedHtml = await parser.parse(props.content);

				if (!parsedHtml) {
					console.error('Failed to parse markdown to HTML');
					html.value = null;
					return;
				}

				console.log('Generated HTML:', parsedHtml);
				html.value = parsedHtml;
				error.value = null;
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Unknown error';
				console.error('Error rendering markdown:', err);
				error.value = errorMessage;
				html.value = null;
			}
		}

		watch(
			() => props.content,
			() => {
				parseMarkdown();
			},
			{ immediate: true }
		);

		return () => {
			if (error.value) {
				return h('div', { class: 'markdown-error' }, `Error: ${error.value}`);
			}

			if (!html.value) {
				return h('div', { class: 'markdown-empty' }, 'Loading...');
			}

			return h('div', {
				class: props.className,
				innerHTML: html.value,
			});
		};
	},
});
