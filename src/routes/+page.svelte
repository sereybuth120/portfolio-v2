<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import HeroSection from '$lib/components/Hero.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { onMount } from 'svelte';

	let showMenu = false;

	function getRandomRotation() {
		return Math.floor(Math.random() * 60) - 30; // Random angle between -30 and 30 degrees
	}

	const shootingStars = [...Array(5)].map(() => ({
		delay: Math.random() * 15,
		top: Math.random() * 100,
		left: Math.random() * 100,
		rotation: getRandomRotation()
	}));

	// Initialize menu state from storage on mount
	onMount(() => {
		if (browser) {
			const storedMenuState = sessionStorage.getItem('menuState');
			showMenu = storedMenuState === 'true';
			console.log('Initial menu state:', showMenu);
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
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each Array(12) as _, i}
				<div class={`star star-${i + 1}`}></div>
			{/each}

			{#each shootingStars as star}
				<div
					class="shooting-star"
					style={`animation-delay: ${star.delay}s; top: ${star.top}%; left: ${star.left}%; --rotation: ${star.rotation}deg;`}
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
		background: linear-gradient(45deg, #1a1a2a, #2a2a4a, #2a3a4a, #3a2a4a, #2a1a3a, #1a2a3a);
		background-size: 400% 400%;
		animation: cosmicFlow 10s linear infinite;
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
		width: 150%;
		height: 150%;
		background:
			radial-gradient(circle at 70% 20%, rgba(120, 160, 200, 0.1) 0%, transparent 30%),
			radial-gradient(circle at 30% 80%, rgba(160, 120, 200, 0.1) 0%, transparent 30%);
		animation: nebulaDrift 50s linear infinite;
		mix-blend-mode: soft-light;
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
	}

	.star {
		position: absolute;
		background: rgba(200, 220, 255, 0.9);
		width: 1.5px;
		height: 1.5px;
		border-radius: 50%;
		animation: starTwinkle 3s ease infinite;
	}

	@keyframes starTwinkle {
		0%,
		100% {
			opacity: 0.5;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.5);
		}
	}

	.star-1 {
		top: 15%;
		left: 20%;
		animation-delay: 0s;
	}
	.star-2 {
		top: 25%;
		left: 70%;
		animation-delay: 1.2s;
	}
	.star-3 {
		top: 60%;
		left: 40%;
		animation-delay: 2.5s;
	}
	.star-4 {
		top: 75%;
		left: 85%;
		animation-delay: 3.8s;
	}
	.star-5 {
		top: 45%;
		left: 10%;
		animation-delay: 4.2s;
	}
	.star-6 {
		top: 5%;
		left: 50%;
		animation-delay: 5.5s;
	}
	.star-7 {
		top: 85%;
		left: 30%;
		animation-delay: 6.7s;
	}
	.star-8 {
		top: 35%;
		left: 90%;
		animation-delay: 7.9s;
	}
	.star-9 {
		top: 55%;
		left: 65%;
		animation-delay: 8.4s;
	}
	.star-10 {
		top: 10%;
		left: 80%;
		animation-delay: 9.1s;
	}
	.star-11 {
		top: 70%;
		left: 15%;
		animation-delay: 10.3s;
	}
	.star-12 {
		top: 95%;
		left: 60%;
		animation-delay: 11.5s;
	}

	.shooting-star {
		position: absolute;
		width: 10px;
		height: 2px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
		animation: shoot 5s linear infinite;
		opacity: 0;
		transform-origin: center;
	}

	@keyframes shoot {
		0% {
			transform: translate(-100vw, -100vh) rotate(var(--rotation, -45deg));
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		100% {
			transform: translate(100vw, 100vh) rotate(var(--rotation, -45deg));
			opacity: 0;
		}
	}

	@keyframes contentGlow {
		0%,
		100% {
			box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
		}
		50% {
			box-shadow: 0 12px 40px rgba(80, 100, 150, 0.3);
		}
	}
</style>
