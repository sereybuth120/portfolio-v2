<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import CosmicVoid from '$lib/components/CosmicVoid.svelte';
	import HeroSection from '$lib/components/Hero.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { onMount } from 'svelte';

	let showMenu = false;

	// Initialize menu state from storage on mount
	onMount(() => {
		if (browser) {
			const storedMenuState = sessionStorage.getItem('menuState');
			showMenu = storedMenuState === 'true';
		}
	});

	// Track updates
	function handleClick() {
		showMenu = !showMenu;

		if (browser) {
			sessionStorage.setItem('menuState', showMenu.toString());
		}
	}

	// Handle pathname changes
	$: if (browser && $page.url.pathname === '/') {
		const storedMenuState = sessionStorage.getItem('menuState');
		showMenu = storedMenuState === 'true';
	}
</script>

<svelte:head>
	<title>HOUT SEREYBOTH | Digital Architect</title>
	<meta name="description" content="Portfolio of Hout Sereyboth - Digital Architect building interfaces at the edge of the digital frontier." />
</svelte:head>

<div class="cosmic-container">
	<!-- The infinite void -->
	<CosmicVoid />

	<!-- Content layer -->
	<div class="content-layer">
		<HeroSection onClick={handleClick} menuOpen={showMenu} />
		<Menu onClick={handleClick} menuOpen={showMenu} />
	</div>

	<!-- Subtle vignette for depth -->
	<div class="vignette"></div>
</div>

<style>
	.cosmic-container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.content-layer {
		position: relative;
		z-index: 10;
		width: 100%;
		height: 100%;
	}

	.vignette {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 99;
		background: radial-gradient(
			ellipse at center,
			transparent 0%,
			transparent 60%,
			rgba(0, 0, 0, 0.3) 100%
		);
	}
</style>
