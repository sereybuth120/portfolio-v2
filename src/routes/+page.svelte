<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
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

<div class="relative h-[100vh] w-full overflow-hidden bg-transparent text-center">
	<div class="container-c">
		<div class="star-field" class:blur-md={showMenu}>
			<!-- Stars -->
			{#each Array(50) as _}
				<div
					class="star"
					style={`top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; animation-delay: ${Math.random() * 10}s; width: ${1 + Math.random() * 3}px; height: ${1 + Math.random() * 3}px;`}
				></div>
			{/each}

			<!-- Shooting Stars -->
			{#each Array(8) as _}
				<div
					class="shooting-star"
					style={`animation-delay: ${Math.random() * 8}s; top: ${Math.random() * 70 + 10}%; left: ${Math.random() * 70 + 10}%; --rotation: ${Math.floor(Math.random() * 60) - 30}deg; --shoot-animation: ${Math.random() > 0.5 ? 'shootFromLeft' : 'shootFromRight'};`}
				></div>
			{/each}
		</div>

		<div class="w-full">
			<HeroSection onClick={handleClick} menuOpen={showMenu} />
			<Menu onClick={handleClick} menuOpen={showMenu} />
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/ica-rubrik-black');
	@import url('https://fonts.cdnfonts.com/css/poppins');

	.container-c {
		margin: 0;
		min-height: 100vh;
		background: linear-gradient(45deg, #000000, #020202, #040404, #020202, #000000);
		background-size: 400% 400%;
		animation: cosmicFlow 20s linear infinite;
		position: relative;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@keyframes cosmicFlow {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.container-c::before {
		content: '';
		position: absolute;
		width: 170%;
		height: 170%;
		border-radius: 50%;
		background:
			radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 35%),
			radial-gradient(circle at 30% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 35%);
		animation: nebulaDrift 30s linear infinite;
		mix-blend-mode: screen;
	}

	@keyframes nebulaDrift {
		0% {
			transform: translate(-10%, -10%) rotate(0deg);
		}
		100% {
			transform: translate(10%, 10%) rotate(360deg);
		}
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
</style>
