<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import HeroSection from '$lib/components/Hero.svelte';
	import MatrixRain from '$lib/components/MatrixRain.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { onMount } from 'svelte';

	let showMenu = false;
	// Create arrays for stars and shooting stars
	const START_COUNT = 50;
	const SHOOTING_STAR_COUNT = 8;

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

<div class="relative h-[100vh] overflow-hidden bg-transparent text-center">
	<!-- <MatrixRain
		opacity={0.1}
		columnSpacing={80}
		fallSpeed={{ min: 3, max: 6 }}
		fontSize={{ min: 6, max: 14 }}
	/> -->

	<div class="container-c">
		<HeroSection onClick={handleClick} menuOpen={showMenu} />
		<Menu onClick={handleClick} menuOpen={showMenu} />
	</div>
</div>

<style>
	.container-c {
		margin: 0;
		background:
			radial-gradient(circle at 20% 30%, rgba(50, 50, 50, 0.3) 0%, transparent 40%),
			radial-gradient(circle at 80% 70%, rgba(75, 75, 75, 0.2) 0%, transparent 50%),
			linear-gradient(45deg, #000000, #0a0a0a, #111111, #0a0a0a, #000000);
		background-size: 200% 200%;
		background: #000;
		animation: cosmicFlow 30s ease infinite;
		position: relative;
		height: 100vh;
	}

	@keyframes cosmicFlow {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 100% 100%;
		}
		100% {
			background-position: 0% 0%;
		}
	}

	.container-c::before {
		content: '';
		position: absolute;
		width: 170%;
		height: 170%;
		border-radius: 50%;
		background:
			radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.07) 0%, transparent 40%),
			radial-gradient(circle at 30% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 40%);
		animation: nebulaDrift 30s linear infinite;
		mix-blend-mode: screen;
	}

	.container-c::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.6) 100%),
			repeating-linear-gradient(
				0deg,
				rgba(255, 255, 255, 0.01) 0px,
				rgba(255, 255, 255, 0.01) 1px,
				transparent 1px,
				transparent 4px
			);
		pointer-events: none;
	}

	@keyframes nebulaDrift {
		0% {
			transform: translate(-10%, -10%) rotate(0deg);
		}
		100% {
			transform: translate(10%, 10%) rotate(360deg);
		}
	}
</style>
