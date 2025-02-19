<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import '$lib/styles/theme.css';
	import { onMount } from 'svelte';
	import '../app.css';
	let { children } = $props();

	onMount(() => {
		document.documentElement.classList.add('has-view-transitions');
	});

	beforeNavigate(({ from, to }) => {
		if (!document.startViewTransition) return;

		// Add transition names to the pages based on the route
		const pageName = to?.route.id?.split('/')[1] || 'home';
		document.documentElement.dataset.transitionPage = pageName;
	});
</script>

<div class="min-h-screen bg-gray-50">
	<!-- <Navigation /> -->
	<main>
		<div class="page-container">
			{@render children()}
		</div>
	</main>
</div>

<style>
	:global(html.has-view-transitions) {
		view-transition-name: none;
	}

	:global(::view-transition-old(menu-works)),
	:global(::view-transition-new(menu-works)) {
		animation: none;
		mix-blend-mode: normal;
		display: block;
	}

	:global(::view-transition-old(menu-about)),
	:global(::view-transition-new(menu-about)) {
		animation: none;
		mix-blend-mode: normal;
		display: block;
	}

	:global(::view-transition-old(menu-skills)),
	:global(::view-transition-new(menu-skills)) {
		animation: none;
		mix-blend-mode: normal;
		display: block;
	}

	:global(::view-transition-old(menu-connect)),
	:global(::view-transition-new(menu-connect)) {
		animation: none;
		mix-blend-mode: normal;
		display: block;
	}

	.page-container {
		width: 100%;
		height: 100%;
		contain: paint;
	}

	/* Define view transition names for each page */
	:global([data-transition-page='works']) .page-container {
		view-transition-name: menu-works;
	}

	:global([data-transition-page='about']) .page-container {
		view-transition-name: menu-about;
	}

	:global([data-transition-page='skills']) .page-container {
		view-transition-name: menu-skills;
	}

	:global([data-transition-page='connect']) .page-container {
		view-transition-name: menu-connect;
	}

	/* Custom transition animation */
	:global(::view-transition-group(*)) {
		animation-duration: 0.8s;
	}

	:global(::view-transition-new(*)) {
		animation:
			0.5s cubic-bezier(0.4, 0, 0.2, 1) both fade-in,
			0.5s cubic-bezier(0.4, 0, 0.2, 1) both scale-up;
		animation-delay: 0.3s;
		z-index: 1;
	}

	:global(::view-transition-old(*)) {
		animation: none;
		opacity: 0;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes scale-up {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1);
		}
	}

	/* Ensure menu transitions take precedence */
	:global(::view-transition-old(menu-works)),
	:global(::view-transition-old(menu-about)),
	:global(::view-transition-old(menu-skills)),
	:global(::view-transition-old(menu-connect)) {
		z-index: 50;
	}

	:global(::view-transition-new(menu-works)),
	:global(::view-transition-new(menu-about)),
	:global(::view-transition-new(menu-skills)),
	:global(::view-transition-new(menu-connect)) {
		z-index: 50;
	}
</style>
