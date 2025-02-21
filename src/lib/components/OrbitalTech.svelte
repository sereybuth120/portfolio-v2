<script lang="ts">
	import Button from './Button.svelte';

	export let onClick: () => void;
	export let menuOpen: boolean = false;

	function handleMenuClick(e: CustomEvent<MouseEvent>) {
		console.log('Menu button clicked in OrbitalTech');
		e.stopPropagation();
		onClick();
	}

	// Split icons between two rings
	let primaryRingIcons = [
		'devicon-react-plain',
		'devicon-nextjs-plain',
		'devicon-svelte-plain',
		'devicon-redux-original',
		'devicon-css3-plain',
		'devicon-sass-original',
		'devicon-tailwindcss-original',
		'devicon-materialui-plain',
		'devicon-playwright-plain'
	];

	let secondaryRingIcons = [
		'devicon-nodejs-plain-wordmark',
		'devicon-express-original',
		'devicon-denojs-original',
		'devicon-nestjs-plain',
		'devicon-redis-plain',
		'devicon-mongodb-plain',
		'devicon-postgresql-plain',
		'devicon-docker-plain',
		'devicon-firebase-plain'
	];

	let primaryQuantity: number = primaryRingIcons.length;
	let secondaryQuantity: number = secondaryRingIcons.length;

	$: if (!menuOpen) {
		console.log('OrbitalTech is visible, ensuring click handler is active');
	}
</script>

<div
	class="relative transition-all duration-300 px-50"
	class:opacity-100={!menuOpen}
	class:pointer-events-auto={!menuOpen}
	class:opacity-0={menuOpen}
	class:pointer-events-none={menuOpen}
>
	<div class="orbital-container absolute top-1/2 right-[10%] -translate-y-1/2">
		<!-- Primary Ring -->
		<div
			class="slider primary-ring absolute h-[300px] w-[240px]"
			style="--quantity: {primaryQuantity}; --speed: {20}s;"
		>
			{#each primaryRingIcons as icon, index}
				<div class="item absolute inset-0" style="--position: {index + 1}">
					<i class="{icon} icon-spin text-6xl text-white"></i>
				</div>
			{/each}
		</div>

		<!-- Secondary Ring -->
		<div
			class="slider secondary-ring absolute h-[300px] w-[240px]"
			style="--quantity: {secondaryQuantity}; --speed: {20}s;"
		>
			{#each secondaryRingIcons as icon, index}
				<div class="item absolute inset-0" style="--position: {index + 1}">
					<i class="{icon} icon-spin text-5xl text-red-500"></i>
				</div>
			{/each}
		</div>

		<div class="h-[200px] w-[200px]">
			<div class="planet">
				<i class="devicon-javascript-plain"></i>
				<i class="devicon-typescript-plain"></i>
				<i class="devicon-python-plain"></i>
			</div>
		</div>
	</div>

	<div class="z-10 mt-10 flex h-screen flex-col items-start justify-center">
		<h4 class="text-[10rem] text-yellow-500" data-content="Web">Web</h4>
		<h4 class="mt-25 text-[10rem] text-red-500" data-content="Developer">Developer</h4>
		<div class="relative z-20">
			<Button on:click={handleMenuClick}>Menu</Button>
		</div>
	</div>
</div>

<style>
	.planet {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		position: relative;
		overflow: hidden;
		background: conic-gradient(
			from 120deg,
			#f7df1e 0deg 120deg,
			#3178c6 120deg 240deg,
			#4b8bbe 240deg 360deg
		);
	}

	.scene {
		perspective: 3000px;
		transform-style: preserve-3d;
		min-height: 100vh;
	}

	.orbital-container {
		transform-style: preserve-3d;
		width: 300px;
		height: 300px;
	}

	.slider {
		transform-style: preserve-3d;
		z-index: 0;
	}

	.content {
		transform-style: preserve-3d;
		transform: translateZ(0);
		z-index: 1;
		background: rgba(53, 54, 45, 0.8);
		backdrop-filter: blur(20px);
		padding: 2rem;
		border-radius: 50%;
	}

	.primary-ring {
		animation: primaryRingRotation var(--speed) linear infinite;
	}

	.secondary-ring {
		animation: secondaryRingRotation var(--speed) linear infinite;
	}

	@keyframes primaryRingRotation {
		from {
			transform: rotateZ(30deg) rotateX(-5deg) rotateY(0deg);
		}
		to {
			transform: rotateZ(30deg) rotateX(-5deg) rotateY(360deg);
		}
	}

	@keyframes secondaryRingRotation {
		from {
			transform: rotateZ(-30deg) rotateX(-5deg) rotateY(0deg);
		}
		to {
			transform: rotateZ(-30deg) rotateX(-5deg) rotateY(-360deg);
		}
	}

	.item {
		transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
			translateZ(500px);
		transition: transform 0.5s ease-in-out;
		will-change: transform;
		width: 120%;
		height: 120%;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-style: preserve-3d;
		backface-visibility: visible;
	}

	.secondary-ring .item {
		transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
			translateZ(500px);
	}

	.icon-spin {
		display: inline-block;
		transform-style: preserve-3d;
		backface-visibility: visible;
	}

	/* Media queries for responsive sizing */
	@media screen and (min-width: 1441px) {
		.orbital-container {
			right: 15%;
		}
		.slider {
			height: 300px;
			width: 240px;
		}
		.item,
		.secondary-ring .item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(20vw);
		}
	}

	@media screen and (max-width: 1440px) {
		.orbital-container {
			right: 10%;
		}
		.text-container {
			left: -25rem;
		}
		.slider {
			height: 250px;
			width: 200px;
		}
		.item,
		.secondary-ring .item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(450px);
		}
	}

	@media screen and (max-width: 1023px) {
		.orbital-container {
			right: 5%;
		}
		.text-container {
			left: -20rem;
		}
		.slider {
			height: 200px;
			width: 170px;
		}
		.item,
		.secondary-ring .item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(400px);
		}
	}

	@media screen and (max-width: 767px) {
		.orbital-container {
			right: 2%;
		}
		.text-container {
			left: -15rem;
		}
		.slider {
			height: 140px;
			width: 160px;
		}
		.item,
		.secondary-ring .item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(50vw);
		}
	}
</style>
