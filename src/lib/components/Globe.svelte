<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let className = '';

	// Define proper types for the globe config
	type Marker = {
		location: [number, number];
		size: number;
	};

	// Use Record for flexibility with the cobe library's state object
	type GlobeState = Record<string, unknown>;

	type GlobeConfig = {
		width: number;
		height: number;
		onRender: (state: GlobeState) => void;
		devicePixelRatio: number;
		phi: number;
		theta: number;
		dark: number;
		diffuse: number;
		mapSamples: number;
		mapBrightness: number;
		baseColor: [number, number, number];
		markerColor: [number, number, number];
		glowColor: [number, number, number];
		markers: Marker[];
	};

	const GLOBE_CONFIG: GlobeConfig = {
		width: 800,
		height: 800,
		onRender: () => {},
		devicePixelRatio: 2,
		phi: 0,
		theta: 0.3,
		dark: 2,
		diffuse: 1,
		mapSamples: 30000,
		mapBrightness: 2,
		baseColor: [1, 1, 1],
		markerColor: [251 / 255, 100 / 255, 21 / 255],
		glowColor: [1, 1, 1],
		markers: [{ location: [12.5657, 104.991], size: 0.06 }]
	};

	export let config: GlobeConfig = GLOBE_CONFIG;

	let canvasElement: HTMLCanvasElement;
	let width = 0;
	let phi = 0;
	let r = 0;
	let pointerInteracting: number | null = null;
	let pointerInteractionMovement = 0;

	// Define interface for the globe instance
	interface GlobeInstance {
		destroy: () => void;
	}

	let globe: GlobeInstance | undefined;

	function updatePointerInteraction(value: number | null): void {
		pointerInteracting = value;
		if (canvasElement) {
			canvasElement.style.cursor = value ? 'grabbing' : 'grab';
		}
	}

	function updateMovement(clientX: number): void {
		if (pointerInteracting !== null) {
			const delta = clientX - pointerInteracting;
			pointerInteractionMovement = delta;
			r = delta / 200;
		}
	}

	function onRender(state: GlobeState): void {
		if (!pointerInteracting) phi += 0.005;
		state.phi = phi + r;
		state.width = width * 2;
		state.height = width * 2;
	}

	function onResize(): void {
		if (canvasElement) {
			width = canvasElement.offsetWidth;
		}
	}

	function handlePointerDown(e: PointerEvent): void {
		updatePointerInteraction(e.clientX - pointerInteractionMovement);
	}

	function handlePointerUp(): void {
		updatePointerInteraction(null);
	}

	function handleMouseMove(e: MouseEvent): void {
		updateMovement(e.clientX);
	}

	function handleTouchMove(e: TouchEvent): void {
		if (e.touches[0]) updateMovement(e.touches[0].clientX);
	}

	onMount(() => {
		if (!browser) return;

		const initGlobe = async () => {
			try {
				// Dynamically import cobe to avoid SSR issues
				const cobeModule = await import('cobe');
				const createGlobe = cobeModule.default;

				window.addEventListener('resize', onResize);
				onResize();

				globe = createGlobe(canvasElement, {
					...config,
					width: width * 2,
					height: width * 2,
					onRender
				}) as GlobeInstance;

				// Make canvas visible after init
				setTimeout(() => {
					canvasElement.style.opacity = '1';
				});
			} catch (error) {
				console.error('Failed to initialize globe:', error);
			}
		};

		initGlobe();

		return () => {
			if (globe) globe.destroy();
			window.removeEventListener('resize', onResize);
		};
	});

	function classNames(...classes: string[]): string {
		return classes.filter(Boolean).join(' ');
	}
</script>

<div
	class={classNames(
		'absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[900px]',
		className
	)}
>
	<canvas
		class="size-full transition-opacity duration-500 [contain:layout_paint_size]"
		bind:this={canvasElement}
		on:pointerdown={handlePointerDown}
		on:pointerup={handlePointerUp}
		on:pointerout={handlePointerUp}
		on:mousemove={handleMouseMove}
		on:touchmove={handleTouchMove}
	></canvas>
</div>
