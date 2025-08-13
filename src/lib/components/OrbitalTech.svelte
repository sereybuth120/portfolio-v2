<script lang="ts">
	import Globe from './Globe.svelte';
	import ModelViewer from './ModelViewer.svelte';

	// Split icons between two rings
	let primaryRingIcons = [
		'react',
		'next',
		'svelte',
		'js',
		'tailwind',
		'node',
		'nest',
		'deno',
		'postgres',
		'docker'
	];

	// Commented out for now as it's not being used
	// let secondaryRingIcons = ['node', 'nest', 'deno', 'postgres', 'docker'];

	let primaryQuantity: number = primaryRingIcons.length;
	// let secondaryQuantity: number = secondaryRingIcons.length;
	let isHovering: boolean = false;
	let activeIcon: string | null = null;

	function handleMouseEnter(icon: string) {
		isHovering = true;
		activeIcon = icon;
	}

	function handleMouseLeave() {
		isHovering = false;
		activeIcon = null;
	}
</script>

<div class="perspective-1500 relative h-full w-full">
	<div class="globe-container">
		<Globe />
	</div>

	<!-- Primary Ring -->
	<div
		class="primary-ring"
		class:stop-rotation={isHovering}
		style="--quantity: {primaryQuantity}; --speed: {20}s;"
	>
		{#each primaryRingIcons as icon, index}
			<div class="item absolute inset-0" style="--position: {index + 1}">
				<div
					class="model-wrapper"
					class:active={activeIcon === icon}
					role="button"
					tabindex="0"
					aria-label={`${icon} technology icon`}
				>
					<ModelViewer
						modelPath="/icons-3d/{icon}.glb"
						width={150}
						height={150}
						on:mouseenter={() => handleMouseEnter(icon)}
						on:mouseleave={handleMouseLeave}
					/>
					{#if activeIcon === icon}
						<div class="icon-label">{icon}</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Secondary Ring -->
	<!-- <div
		class="secondary-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		style="--quantity: {secondaryQuantity}; --speed: {20}s;"
	>
		{#each secondaryRingIcons as icon, index}
			<div class="item absolute inset-0" style="--position: {index + 1}">
				<div class="model-wrapper">
					<ModelViewer modelPath="/icons-3d/{icon}.glb" />
				</div>
			</div>
		{/each}
	</div> -->
</div>

<style>
	.perspective-1500 {
		perspective: 1500px;
		transform-style: preserve-3d;
		height: 100%;
		width: 100%;
		position: relative;
	}

	.model-wrapper {
		position: relative;
		width: 150px;
		height: 150px;
		transform-style: preserve-3d;
		transform: scale(1);
		transition: transform 0.3s ease;
	}

	.model-wrapper.active {
		transform: scale(1.15);
		z-index: 200;
	}

	.icon-label {
		position: absolute;
		bottom: 0px;
		left: 50%;
		/* transform: translateX(-50%); */
		background: rgba(0, 0, 0, 0.7);
		color: white;
		border-radius: 4px;
		font-family: 'Exo2', sans-serif;
		text-transform: uppercase;
		font-weight: 600;
		font-size: 12px;
		white-space: nowrap;
		letter-spacing: 1px;
		z-index: 201;
	}

	.globe-container {
		transform-style: preserve-3d;
		width: min(600px, 90vw);
		height: min(600px, 90vw);
		position: absolute;
		top: 10%;
		left: 50%;
		transform: translate(-50%, -60%);
		z-index: 10;
	}

	.primary-ring {
		transform-style: preserve-3d;
		position: absolute;
		top: -250%;
		left: 50%;
		z-index: 5;
		animation: primaryRingRotation var(--speed) linear infinite;
		animation-play-state: running;
	}

	.primary-ring.stop-rotation {
		animation-play-state: paused;
	}

	@keyframes primaryRingRotation {
		from {
			transform: translate(-50%, -50%) rotateZ(0deg) rotateX(-5deg) rotateY(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotateZ(0deg) rotateX(-5deg) rotateY(-360deg);
		}
	}

	.item {
		transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
			translateZ(min(900px, 80vw));
		transition: transform 0.5s ease-in-out;
		will-change: transform;
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-style: preserve-3d;
		backface-visibility: hidden;
		z-index: 5;
	}

	/* Media queries for responsive sizing */
	@media screen and (min-width: 1441px) {
		.item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(min(1000px, 30vw));
		}
	}

	@media screen and (max-width: 1440px) {
		.globe-container {
			width: min(600px, 90vw);
			height: min(600px, 90vw);
		}

		.item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(min(700px, 45vw));
		}
	}

	@media screen and (max-width: 1023px) {
		.globe-container {
			width: min(500px, 90vw);
			height: min(500px, 90vw);
		}

		.item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(min(600px, 40vw));
		}
	}

	@media screen and (max-width: 767px) {
		.globe-container {
			width: min(350px, 85vw);
			height: min(350px, 85vw);
		}

		.item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(min(450px, 50vw));
		}
	}
</style>
