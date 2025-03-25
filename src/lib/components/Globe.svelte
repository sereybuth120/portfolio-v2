<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let className = '';

	const GLOBE_CONFIG = {
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
		markers: [
			{ location: [12.5657, 104.991], size: 0.06 },
		]
	};

	export let config = GLOBE_CONFIG;

	let canvasElement;
	let width = 0;
	let phi = 0;
	let r = 0;
	let pointerInteracting = null;
	let pointerInteractionMovement = 0;
	let globe;

	function updatePointerInteraction(value) {
		pointerInteracting = value;
		if (canvasElement) {
			canvasElement.style.cursor = value ? 'grabbing' : 'grab';
		}
	}

	function updateMovement(clientX) {
		if (pointerInteracting !== null) {
			const delta = clientX - pointerInteracting;
			pointerInteractionMovement = delta;
			r = delta / 200;
		}
	}

	function onRender(state) {
		if (!pointerInteracting) phi += 0.005;
		state.phi = phi + r;
		state.width = width * 2;
		state.height = width * 2;
	}

	function onResize() {
		if (canvasElement) {
			width = canvasElement.offsetWidth;
		}
	}

	function handlePointerDown(e) {
		updatePointerInteraction(e.clientX - pointerInteractionMovement);
	}

	function handlePointerUp() {
		updatePointerInteraction(null);
	}

	function handleMouseMove(e) {
		updateMovement(e.clientX);
	}

	function handleTouchMove(e) {
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
				});

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

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<div class={classNames('absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[900px]', className)}>
	<canvas
		class="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
		bind:this={canvasElement}
		on:pointerdown={handlePointerDown}
		on:pointerup={handlePointerUp}
		on:pointerout={handlePointerUp}
		on:mousemove={handleMouseMove}
		on:touchmove={handleTouchMove}
	></canvas>
</div>
