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
		{@render children()}
	</main>
</div>

<style>
	:global(html.has-view-transitions) {
		view-transition-name: none;
	}

	:global(html[data-transition-page='works']) .page-container {
		view-transition-name: menu-works;
	}

	:global(html[data-transition-page='about']) .page-container {
		view-transition-name: menu-about;
	}

	:global(html[data-transition-page='skills']) .page-container {
		view-transition-name: menu-skills;
	}

	:global(html[data-transition-page='connect']) .page-container {
		view-transition-name: menu-connect;
	}

	.page-container {
		width: 100%;
		height: 100%;
		contain: paint;
	}
</style>
