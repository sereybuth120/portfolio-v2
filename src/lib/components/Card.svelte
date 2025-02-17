<script lang="ts">
	type PaddingType = 'normal' | 'large' | 'none';

	let { padding = 'normal' } = $props<{
		padding?: PaddingType;
	}>();

	const paddingStyles: Record<PaddingType, string> = {
		normal: 'p-4',
		large: 'p-6',
		none: ''
	};
</script>

<div class={`rounded-lg bg-white shadow-md ${paddingStyles[padding]}`}>
	<slot />
</div>
