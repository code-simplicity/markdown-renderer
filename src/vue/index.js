import { defineComponent, h, ref, watch } from 'vue';
import { MarkdownParser } from '../core/parser.js';


function hastToVNode(node, options = {}) {
	if (!node) return null;

	if (node.type === 'text') {
		return node.value;
	}

	if (node.type === 'element') {
		const tag = options.components?.[node.tagName] || node.tagName;
		const props = {
			...node.properties,
		};

		const children = node.children?.map((child) => hastToVNode(child, options));

		return h(tag, props, children);
	}

	return null;
}

export const VueMarkdown = defineComponent({
	name: 'VueMarkdown',

	props: {
		content: String,
		components: {
			type: Object,
			default: () => ({}),
		},
		urlTransform: Function,
		allowedElements: Array,
		disallowedElements: Array,
		highlight: Object,
		class: String,
	},

	setup(props) {
		const content = ref(null);
		const parser = new MarkdownParser({
			components: props.components,
			urlTransform: props.urlTransform,
			allowedElements: props.allowedElements,
			disallowedElements: props.disallowedElements,
			highlight: props.highlight,
		});

		watch(
			() => props.content,
			async (newContent) => {
				try {
					const hast = await parser.parse(newContent);
					content.value = hastToVNode(hast, {
						components: props.components,
					});
				} catch (error) {
					console.error('Error rendering markdown:', error);
					content.value = h('div', 'Error rendering markdown');
				}
			},
			{ immediate: true }
		);

		return () =>
			h(
				'div',
				{
					class: props.class,
				},
				content.value
			);
	},
});
