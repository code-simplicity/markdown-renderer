import { type PropType, defineComponent, h, ref, watch } from 'vue';
import { MarkdownParser } from '../core/parser';

export const VueMarkdown = defineComponent({
	name: 'VueMarkdown',
	props: {
		content: {
			type: String,
			required: true,
		},
		components: {
			type: Object as PropType<Record<string, unknown>>,
			default: () => ({}),
		},
		urlTransform: {
			type: Function as PropType<(url: string) => string>,
		},
		allowedElements: {
			type: Array as PropType<string[]>,
		},
		disallowedElements: {
			type: Array as PropType<string[]>,
		},
		highlight: {
			type: Object as PropType<Record<string, unknown>>,
			default: () => {
				return {};
			},
		},
	},
	setup(props) {
		const html = ref<string | null>(null);
		const error = ref<Error | null>(null);

		watch(
			() => [
				props.content,
				props.components,
				props.urlTransform,
				props.allowedElements,
				props.disallowedElements,
				props.highlight,
			],
			async () => {
				const parser = new MarkdownParser({
					components: props.components,
					urlTransform: props.urlTransform,
					allowedElements: props.allowedElements,
					disallowedElements: props.disallowedElements,
					highlight: props.highlight,
				});

				try {
					if (!props.content) {
						html.value = null;
						return;
					}

					const parsedHtml = await parser.parse(props.content);

					if (!parsedHtml) {
						throw new Error('Failed to parse markdown content');
					}

					html.value = parsedHtml;
					error.value = null;
				} catch (err) {
					error.value = err instanceof Error ? err : new Error('Unknown error');
					html.value = null;
				}
			},
			{ immediate: true }
		);

		return () => {
			if (error.value) {
				return h('div', { class: 'markdown-error' }, error.value.message);
			}

			if (!html.value) {
				return h('div', { class: 'markdown-empty' }, 'Loading...');
			}

			return h('div', {
				class: 'markdown-body',
				innerHTML: html.value,
			});
		};
	},
});
