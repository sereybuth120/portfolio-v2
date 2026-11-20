<script lang="ts">
	import type { Snippet } from 'svelte';

	type PaddingType = 'normal' | 'large' | 'none';

	let { padding = 'normal' as PaddingType, children } = $props<{
		padding?: PaddingType;
		children?: Snippet;
	}>();

	const paddingStyles: Record<PaddingType, string> = {
		normal: 'p-4',
		large: 'p-6',
		none: ''
	};
</script>

<div class={`rounded-lg bg-white shadow-md ${paddingStyles[padding as PaddingType]}`}>
	{#if children}{@render children()}{/if}
</div>
