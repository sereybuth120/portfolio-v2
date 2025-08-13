<script lang="ts">
	import { onMount } from 'svelte';

	export let glitchDuration = 300; // milliseconds
	export let glitchInterval = 3000; // milliseconds

	let isGlitching = false;
	let previousIndex = -1; // Track the previous index

	// Available fonts
	// const fonts = ["'Exo2', sans-serif", "'Blanka', sans-serif"];
	const myName = [
		{
			name: ['HOUT', 'SEREY', 'BUTH'],
			font: "'Exo2', sans-serif",
			fontSize: '80px'
		},
		{
			name: ['HOUT', 'SEREY', 'BUTH'],
			font: "'Blanka', sans-serif",
			fontSize: '80px'
		},
		{
			name: ['ហួត', 'សិរី', 'បុត្រ'],
			font: "'Bokor', sans-serif",
			fontSize: '100px'
		},
		{
			name: ['ហួត', 'សិរី', 'បុត្រ'],
			font: "'Moulpali', sans-serif",
			fontSize: '90px'
		}
	];
	// Current font
	let currentFont = '';
	let currentFontSize = '';
	let currentName: string[] = [];
	function getRandomIndexExcept(exceptIndex: number, max: number): number {
		// Generate a random index that's not the same as exceptIndex
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * max);
		} while (newIndex === exceptIndex);

		return newIndex;
	}

	function triggerGlitch(): void {
		isGlitching = true;

		// Get a random index that's different from the previous one
		const currentIndex = getRandomIndexExcept(previousIndex, myName.length);
		currentFont = myName[currentIndex].font;
		currentFontSize = myName[currentIndex].fontSize;
		// Update previous index for next time
		previousIndex = currentIndex;
		currentName = myName[currentIndex].name;
		console.log(currentName);

		setTimeout(() => {
			isGlitching = false;
		}, glitchDuration);
	}

	onMount(() => {
		// Initial glitch
		triggerGlitch();

		// Set up interval for repeated glitching
		const interval = setInterval(triggerGlitch, glitchInterval);

		// Cleanup interval on component destroy
		return () => clearInterval(interval);
	});
</script>

<div class="my-4 flex flex-row">
	{#each currentName as name, index}
		<h1
			class={`glitch-name ${currentFontSize !== '80px' ? 'pt-8' : ''}`}
			class:glitching={isGlitching}
			style={`font-family: ${currentFont}; font-size: ${currentFontSize}; ${
				index === 2 ? 'color: #fa5c29' : 'color: #b0b0b0'
			}`}
		>
			{index === 1 ? '\u00A0' + name : name}
		</h1>
	{/each}
</div>

<style>
	.glitch-name {
		font-size: 80px;
		position: relative;
		opacity: 0.9;
		margin: 0;
	}

	.glitching {
		animation: glitch 0.6s linear;
		text-shadow:
			0px -12px #ffffff,
			0px 12px #404040,
			-12px 0px #d3d3d3,
			12px 0px #606060;
	}

	@keyframes glitch {
		0% {
			transform: translate(0px, 0px);
			opacity: 1;
		}
		8% {
			transform: translate(-5px, 3px);
			opacity: 0.6;
		}
		16% {
			transform: translate(4px, -2px);
			opacity: 0.4;
		}
		24% {
			transform: translate(-3px, 4px);
			opacity: 0.3;
		}
		32% {
			transform: translate(6px, -3px);
			opacity: 0.2;
		}
		40% {
			transform: translate(-4px, 2px);
			opacity: 0.5;
		}
		48% {
			transform: translate(3px, -4px);
			opacity: 0.3;
		}
		56% {
			transform: translate(-2px, 5px);
			opacity: 0.4;
		}
		64% {
			transform: translate(5px, -1px);
			opacity: 0.6;
		}
		72% {
			transform: translate(-6px, -2px);
			opacity: 0.5;
		}
		80% {
			transform: translate(2px, 3px);
			opacity: 0.7;
		}
		88% {
			transform: translate(-1px, -4px);
			opacity: 0.8;
		}
		96% {
			transform: translate(1px, 1px);
			opacity: 0.9;
		}
		100% {
			transform: none;
			opacity: 0.9;
		}
	}

	/* Make it responsive */
	@media (max-width: 768px) {
		.glitch-text {
			font-size: 80px;
		}
	}

	@media (max-width: 480px) {
		.glitch-text {
			font-size: 50px;
		}
	}
</style>
