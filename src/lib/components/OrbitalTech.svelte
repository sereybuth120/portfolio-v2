<script lang="ts">
	import Button from './Button.svelte';

	export let onClick: () => void = () => {};
	export let menuOpen: boolean = false;

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
</script>

<div class="relative {menuOpen ? 'opacity-0' : 'scene opacity-100'}">
	<!-- Primary Ring -->
	<div
		class="slider primary-ring absolute top-120 left-1/2 h-[300px] w-[240px] -translate-x-1/2 -translate-y-1/2"
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
		class="slider secondary-ring absolute top-120 left-1/2 h-[300px] w-[240px] -translate-x-1/2 -translate-y-1/2"
		style="--quantity: {secondaryQuantity}; --speed: {20}s;"
	>
		{#each secondaryRingIcons as icon, index}
			<div class="item absolute inset-0" style="--position: {index + 1}">
				<i class="{icon} icon-spin text-5xl text-red-500"></i>
			</div>
		{/each}
	</div>

	<div class="content absolute top-130 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
		<h1
			class="relative leading-tight whitespace-nowrap text-yellow-500"
			data-content="HOUT SEREYBUTH"
		>
			WEB DEVELOPER
		</h1>
		<h4
			class="relative mt-4 leading-tight whitespace-nowrap text-yellow-500"
			data-content="HOUT SEREYBUTH"
		>
			Hout Sereybuth
		</h4>
		<Button on:click={onClick}>Menu</Button>
	</div>
</div>

<style>
	.scene {
		perspective: 3000px;
		transform-style: preserve-3d;
		min-height: 100vh;
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
			transform: rotateZ(20deg) rotateX(-5deg) rotateY(0deg);
		}
		to {
			transform: rotateZ(20deg) rotateX(-5deg) rotateY(360deg);
		}
	}

	@keyframes secondaryRingRotation {
		from {
			transform: rotateZ(-20deg) rotateX(-5deg) rotateY(0deg);
		}
		to {
			transform: rotateZ(-20deg) rotateX(-5deg) rotateY(-360deg);
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
		.slider {
			height: 300px;
			width: 240px;
		}
		.item,
		.secondary-ring .item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(30vw);
		}
	}

	@media screen and (max-width: 1440px) {
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
