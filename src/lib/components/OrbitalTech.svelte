<script lang="ts">
	import Globe from './Globe.svelte';
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

<div class="perspective-1500 relative h-full w-full">
	<div class="globe-container">
		<Globe />
	</div>

	<!-- Primary Ring -->
	<div class="primary-ring" style="--quantity: {primaryQuantity}; --speed: {20}s;">
		{#each primaryRingIcons as icon, index}
			<div class="item absolute inset-0" style="--position: {index + 1}">
				<i class="{icon} icon-spin"></i>
			</div>
		{/each}
	</div>

	<!-- Secondary Ring -->
	<div
		class="secondary-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		style="--quantity: {secondaryQuantity}; --speed: {20}s;"
	>
		{#each secondaryRingIcons as icon, index}
			<div class="item absolute inset-0" style="--position: {index + 1}">
				<i class="{icon} icon-spin"></i>
			</div>
		{/each}
	</div>
</div>

<style>
	.perspective-1500 {
		perspective: 1500px;
		transform-style: preserve-3d;
		height: 100%;
		width: 100%;
	}

	.globe-container {
		transform-style: preserve-3d;
		width: min(700px, 90vw);
		height: min(700px, 90vw);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 50;
	}

	.primary-ring {
		transform-style: preserve-3d;
		position: absolute;
		width: 0px;
		height: 0px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: primaryRingRotation var(--speed) linear infinite;
		z-index: 5;
	}

	.secondary-ring {
		transform-style: preserve-3d;
		position: absolute;
		width: 0px;
		height: 0px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: secondaryRingRotation var(--speed) linear infinite;
		z-index: 5;
	}

	@keyframes primaryRingRotation {
		from {
			transform: translate(-50%, -50%) rotateZ(-35deg) rotateX(-5deg) rotateY(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotateZ(-35deg) rotateX(-5deg) rotateY(-360deg);
		}
	}

	@keyframes secondaryRingRotation {
		from {
			transform: translate(-50%, -50%) rotateZ(35deg) rotateX(-5deg) rotateY(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotateZ(35deg) rotateX(-5deg) rotateY(-360deg);
		}
	}

	.item {
		transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
			translateZ(min(900px, 80vw));
		transition: transform 0.5s ease-in-out;
		will-change: transform;
		height: 120%;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-style: preserve-3d;
		backface-visibility: visible;
	}

	.secondary-ring .item {
		transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
			translateZ(min(900px, 80vw));
	}

	.icon-spin {
		display: inline-block;
		transform-style: preserve-3d;
		font-size: clamp(2rem, 5vw, 3rem);
		color: rgba(0, 0, 0, 0.95);
		filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))
			drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
		text-shadow:
			0 0 15px rgba(255, 255, 255, 0.5),
			0 0 5px rgba(255, 255, 255, 0.7),
			0 0 2px rgba(255, 255, 255, 0.8);
	}

	/* Media queries for responsive sizing */
	@media screen and (min-width: 1441px) {
		.item,
		.secondary-ring .item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(min(1000px, 30vw));
		}
	}

	@media screen and (max-width: 1440px) {
		.globe-container {
			width: min(600px, 90vw);
			height: min(600px, 90vw);
		}

		.item,
		.secondary-ring .item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(min(700px, 45vw));
		}
	}

	@media screen and (max-width: 1023px) {
		.globe-container {
			width: min(500px, 90vw);
			height: min(500px, 90vw);
		}

		.item,
		.secondary-ring .item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(min(600px, 40vw));
		}
	}

	@media screen and (max-width: 767px) {
		.globe-container {
			width: min(350px, 85vw);
			height: min(350px, 85vw);
		}

		.item,
		.secondary-ring .item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(min(450px, 50vw));
		}

		.icon-spin {
			font-size: clamp(1.5rem, 4vw, 2.5rem);
		}
	}
</style>
