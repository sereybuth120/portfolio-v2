<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'outline';
	type Size = 'sm' | 'md' | 'lg';
	type ButtonType = 'button' | 'submit' | 'reset';

	let {
		variant = 'primary',
		size = 'md',
		type = 'button'
	} = $props<{
		variant?: Variant;
		size?: Size;
		type?: ButtonType;
	}>();

	const dispatch = createEventDispatcher<{
		click: MouseEvent;
	}>();

	const baseStyles =
		'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

	const variants: Record<Variant, string> = {
		primary:
			'bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] focus:ring-[var(--color-primary-500)]',
		secondary:
			'bg-[var(--color-secondary-600)] text-white hover:bg-[var(--color-secondary-700)] focus:ring-[var(--color-secondary-500)]',
		outline:
			'border-2 border-[var(--color-primary-600)] text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] focus:ring-[var(--color-primary-500)]'
	};

	const sizes: Record<Size, string> = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};

	function handleClick(event: MouseEvent) {
		dispatch('click', event);
	}
</script>

<button
	{type}
	class={`${baseStyles} ${variants[variant as Variant]} ${sizes[size as Size]}`}
	onclick={handleClick}
>
	<slot />
</button>
