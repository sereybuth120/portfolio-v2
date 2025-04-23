<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import HeroSection from '$lib/components/Hero.svelte';
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
	<div class="container-c">
		<div class="star-field" class:blur-md={showMenu}>
			<!-- Stars -->
			{#each Array(START_COUNT)
				.fill(0)
				.map( () => ({ top: Math.random() * 100, left: Math.random() * 100, delay: Math.random() * 10, width: 1 + Math.random() * 3, height: 1 + Math.random() * 3 }) ) as star}
				<div
					class="star"
					style={`top: ${star.top}%; left: ${star.left}%; animation-delay: ${star.delay}s; width: ${star.width}px; height: ${star.height}px;`}
				></div>
			{/each}

			<!-- Fix this -->
			<!-- Shooting Stars -->
			{#each Array(SHOOTING_STAR_COUNT)
				.fill(0)
				.map( () => ({ delay: Math.random() * 8, top: Math.random() * 70 + 10, left: Math.random() * 70 + 10, rotation: Math.floor(Math.random() * 60) - 30, animation: Math.random() > 0.5 ? 'shootFromLeft' : 'shootFromRight' }) ) as shootingStar}
				<div
					class="shooting-star"
					style={`animation-delay: ${shootingStar.delay}s; top: ${shootingStar.top}%; left: ${shootingStar.left}%; --rotation: ${shootingStar.rotation}deg; --shoot-animation: ${shootingStar.animation};`}
				></div>
			{/each}
		</div>

		<HeroSection onClick={handleClick} menuOpen={showMenu} />
		<Menu onClick={handleClick} menuOpen={showMenu} />
	</div>
</div>

<style>
	.container-c {
		margin: 0;
		min-height: 100vh;
		background:
			radial-gradient(circle at 20% 30%, rgba(50, 50, 50, 0.3) 0%, transparent 40%),
			radial-gradient(circle at 80% 70%, rgba(75, 75, 75, 0.2) 0%, transparent 50%),
			linear-gradient(45deg, #000000, #0a0a0a, #111111, #0a0a0a, #000000);
		background: #000000;
		background-size: 200% 200%;
		animation: cosmicFlow 30s ease infinite;
		position: relative;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
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

	.star-field {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 5;
	}

	.star {
		position: absolute;
		background: rgb(255, 255, 255);
		z-index: 0;
		border-radius: 50%;
		animation: starTwinkle 4s ease infinite;
		box-shadow: 0 0 1px rgba(255, 255, 255, 0.2);
	}

	@keyframes starTwinkle {
		0%,
		100% {
			opacity: 0.2;
			transform: scale(0.8);
		}
		50% {
			opacity: 0.9;
			transform: scale(1.5);
		}
	}

	.shooting-star {
		position: absolute;
		width: 150px;
		height: 2px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
		animation: var(--shoot-animation, shootFromLeft) 4s linear infinite;
		opacity: 0;
		transform: rotate(var(--rotation, 0deg));
		transform-origin: center;
		box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.5);
	}

	@keyframes shootFromLeft {
		0% {
			opacity: 0;
			transform: translateX(-100px) rotate(var(--rotation));
		}
		5% {
			opacity: 1;
		}
		25% {
			opacity: 1;
		}
		40%,
		100% {
			opacity: 0;
			transform: translateX(calc(100vw + 100px)) rotate(var(--rotation));
		}
	}

	@keyframes shootFromRight {
		0% {
			opacity: 0;
			transform: translateX(calc(100vw + 100px)) rotate(var(--rotation));
		}
		5% {
			opacity: 1;
		}
		25% {
			opacity: 1;
		}
		40%,
		100% {
			opacity: 0;
			transform: translateX(-100px) rotate(var(--rotation));
		}
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
