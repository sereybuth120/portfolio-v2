<script lang="ts">
	export let size = 24;
	export let className = '';
</script>

<svg
	class={className}
	width={size}
	height={size}
	fill="none"
	stroke="currentColor"
	viewBox="0 0 24 24"
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width={2}
		d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
	/>
</svg>
