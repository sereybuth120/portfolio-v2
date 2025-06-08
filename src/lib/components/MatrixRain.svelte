<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	// Props
	export let opacity = 0.3;
	export let fontSize = { min: 12, max: 16 };
	export let columnSpacing = 40;
	export let fallSpeed = { min: 2, max: 5 }; // seconds
	export let characters =
		'QឌYhB^ដbLឧr#EឩឯឱឬឬdឭRZឭ{5ឆឮV>Oកឥu!sឪ@vឮmAឲ4lឋឨiJtឦឈNfឬឨឫMឃ9g7ខwT0F3ឩ,ញខឱzឩnIឈUឬWcLxឫS|X6GឣyHN=ឣ[oe;បqDឲjឋaCKKPឧ8ឣpឬ+km(ឲឯEឧBឌសឣអឧឣឣឥ/ឬឲល@ឭឆឍt1ឫសឍJឪPដឆ)ឬកឦ}xឋឣឧឬ.ឋzឋឃSឭ';

	// Define the column type
	interface Column {
		id: number;
		text: string;
		left: number;
		duration: number;
		delay: number;
		size: number;
	}

	// State
	let matrixContainer: HTMLElement;
	let columns: Column[] = [];
	let columnCount = 0;
	let textUpdateIntervals: number[] = [];
	let restartInterval: number | undefined;

	function getRandomChar() {
		return characters[Math.floor(Math.random() * characters.length)];
	}

	function getRandomFontSize() {
		return Math.random() * (fontSize.max - fontSize.min) + fontSize.min;
	}

	function generateColumnText() {
		const length = Math.floor(Math.random() * 30) + 20; // 20-50 characters
		let text = '';

		for (let i = 0; i < length; i++) {
			text += getRandomChar() + '\n';
		}

		return text;
	}

	function createColumns() {
		if (!browser) return;

		columnCount = Math.floor(window.innerWidth / columnSpacing);
		columns = [];

		// Clear existing intervals
		textUpdateIntervals.forEach((interval) => clearInterval(interval));
		textUpdateIntervals = [];

		for (let i = 0; i < columnCount; i++) {
			const column: Column = {
				id: i,
				text: generateColumnText(),
				left: i * columnSpacing,
				duration: Math.random() * (fallSpeed.max - fallSpeed.min) + fallSpeed.min,
				delay: Math.random() * 2,
				size: getRandomFontSize()
			};

			columns.push(column);

			// Schedule text updates for this column
			const interval = setInterval(
				() => {
					columns[i].text = generateColumnText();
					columns = [...columns]; // Trigger reactivity
				},
				Math.random() * 500 + 200
			);

			textUpdateIntervals.push(interval);
		}

		columns = [...columns]; // Trigger reactivity
	}

	function handleResize() {
		createColumns();
	}

	function startRestartInterval() {
		restartInterval = setInterval(() => {
			columns = columns.map((column) => {
				if (Math.random() < 0.1) {
					// 10% chance to restart
					return { ...column, delay: 0 };
				}
				return column;
			});
		}, 1000);
	}

	onMount(() => {
		createColumns();
		startRestartInterval();

		if (browser) {
			window.addEventListener('resize', handleResize);
		}
	});

	onDestroy(() => {
		textUpdateIntervals.forEach((interval) => clearInterval(interval));
		if (restartInterval) {
			clearInterval(restartInterval);
		}

		if (browser) {
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

<svelte:window on:resize={handleResize} />

<div class="matrix-container" bind:this={matrixContainer}>
	{#each columns as column (column.id)}
		<div
			class="matrix-column"
			style="
          left: {column.left}px;
          font-size: {column.size}px;
          line-height: {column.size}px;
          opacity: {opacity};
          animation-duration: {column.duration}s;
          animation-delay: {column.delay}s;
        "
		>
			{column.text}
		</div>
	{/each}
</div>

<style>
	.matrix-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 1;
		overflow: hidden;
	}

	.matrix-column {
		position: absolute;
		top: -200px;
		color: white;
		white-space: pre;
		animation: matrix-fall linear infinite;
	}

	@keyframes matrix-fall {
		0% {
			transform: translateY(-200px);
			opacity: 0;
		}
		5% {
			opacity: var(--opacity, 0.3);
		}
		95% {
			opacity: var(--opacity, 0.3);
		}
		100% {
			transform: translateY(calc(100vh + 50px));
			opacity: 0;
		}
	}
</style>
