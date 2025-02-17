<script lang="ts">
	import Button from './Button.svelte';

	export let images: string[] = [];
	export let quantity: number = images.length;
	export let containerClass: string = '';
	export let imageClass: string = '';
	export let speed: number = 20;
	export let onClick: () => void = () => {};
	export let menuOpen: boolean = false;
</script>

<div class="relative {menuOpen ? 'opacity-0' : 'opacity-100'}">
	<div
		class="slider absolute top-120 left-1/2 h-[300px] w-[240px] -translate-x-1/2 -translate-y-1/2 {containerClass}"
		style="--quantity: {quantity}; --speed: {speed}s;"
	>
		{#each images as image, index}
			<div class="item absolute inset-0" style="--position: {index + 1}">
				<img
					src={image}
					alt="Slide {index + 1}"
					class="h-full w-full rounded-lg object-cover shadow-xl {imageClass}"
				/>
			</div>
		{/each}
	</div>

	<div class="content absolute top-150 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
		<h1
			class="relative leading-tight whitespace-nowrap text-[#25283B]"
			data-content="HOUT SEREYBUTH"
		>
			WEB DEVELOPER
		</h1>
		<h4
			class="relative mt-4 leading-tight whitespace-nowrap text-[#25283B]"
			data-content="HOUT SEREYBUTH"
		>
			Hout Sereybuth
		</h4>
		<Button on:click={onClick}>Contact Me</Button>
	</div>
</div>

<style>
	.slider {
		transform-style: preserve-3d;
		transform: perspective(3000px);
		animation: autoRun var(--speed) linear infinite;
		z-index: 20;
	}

	@keyframes autoRun {
		from {
			transform: perspective(3000px) rotateX(-20deg) rotateY(0deg);
		}
		to {
			transform: perspective(3000px) rotateX(-20deg) rotateY(360deg);
		}
	}

	.item {
		transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
			translateZ(1100px);
		transition: transform 0.5s ease-in-out;
		will-change: transform;
		width: 130%;
		height: 130%;
	}

	h1 {
		font-size: clamp(2rem, 6vw, 7rem);
		text-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
	}

	h4 {
		font-size: clamp(1rem, 3vw, 2rem);
		text-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
	}

	/* Large screens */
	@media screen and (min-width: 1441px) {
		.slider {
			height: 300px;
			width: 240px;
		}
		.item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(1100px);
		}
	}

	/* Medium screens */
	@media screen and (max-width: 1440px) {
		.slider {
			height: 250px;
			width: 200px;
		}
		.item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(900px);
		}
	}

	/* Tablet */
	@media screen and (max-width: 1023px) {
		.slider {
			height: 200px;
			width: 170px;
		}
		.item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(700px);
		}
	}

	/* Mobile */
	@media screen and (max-width: 767px) {
		.slider {
			height: 140px;
			width: 160px;
		}
		.item {
			transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
				translateZ(500px);
		}
	}
</style>
