<script lang="ts">
	import planet from '$lib/assets/images/planet.png';
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

<div class="orbital-container absolute top-1/2 right-[10%] -translate-y-1/2">
	<!-- Primary Ring -->
	<div
		class="slider primary-ring absolute h-[300px] w-[240px]"
		style="--quantity: {primaryQuantity}; --speed: {20}s;"
	>
		{#each primaryRingIcons as icon, index}
			<div class="item absolute inset-0" style="--position: {index + 1}">
				<i class="{icon} icon-spin text-6xl text-gray-300"></i>
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
				<i class="{icon} icon-spin text-5xl text-gray-300"></i>
			</div>
		{/each}
	</div>

	<div class="planet h-[200px] w-full">
		<img src={planet} alt="planet" class="" />
	</div>
</div>

<style>
	.planet {
		width: 300px;
		height: 300px;
		border-radius: 50%;
		background: radial-gradient(
			circle at center,
			#ffffff 0%,
			#eeeeee 30%,
			#dddddd 70%,
			#cccccc 100%
		);
		animation: rotate 30s linear infinite;
		box-shadow:
			0 0 80px rgba(255, 255, 255, 0.15),
			0 0 40px rgba(0, 0, 0, 0.8),
			inset 0 0 50px rgba(0, 0, 0, 0.2);
		position: relative;
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
		filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
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
