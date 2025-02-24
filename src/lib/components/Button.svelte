<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type Size = 'sm' | 'md' | 'lg';
	type ButtonType = 'button' | 'submit' | 'reset';

	let { size = 'md', type = 'button' } = $props<{
		size?: Size;
		type?: ButtonType;
	}>();

	const dispatch = createEventDispatcher<{
		click: MouseEvent;
	}>();

	const baseStyles = 'relative font-medium transition-all duration-300 group overflow-hidden';

	const sizes: Record<Size, string> = {
		sm: 'group-hover:px-10 group-hover:py-3 px-8 py-2 text-sm',
		md: 'group-hover:px-12 group-hover:py-4 px-10 py-3 text-base',
		lg: 'group-hover:px-14 group-hover:py-5 px-12 py-4 text-lg'
	};

	function handleClick(event: MouseEvent) {
		dispatch('click', event);
	}
</script>

<button
	{type}
	class={`${baseStyles} ${sizes[size as Size]} text-gray-300 group-hover:text-black hover:text-black`}
	onclick={handleClick}
>
	<span class="relative z-10">
		<slot />
	</span>
	<!-- Corner brackets -->
	<span
		class="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-gray-300 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-white"
	></span>
	<span
		class="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-gray-300 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-white"
	></span>
	<span
		class="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-gray-300 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-white"
	></span>
	<span
		class="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-gray-300 transition-all duration-300 group-hover:h-5 group-hover:w-5 group-hover:border-white"
	></span>
	<!-- Hover background with inner padding -->
	<span
		class="absolute inset-[6px] z-0 rounded-sm bg-transparent transition-all duration-300 group-hover:bg-white"
	></span>
</button>
