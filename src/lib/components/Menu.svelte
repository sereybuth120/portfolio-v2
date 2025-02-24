<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import Button from './Button.svelte';

	export let onClick: () => void;
	export let menuOpen: boolean = false;

	let navigatingTo: string | null = null;
	let isTransitioning = false;

	function handleEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && menuOpen) {
			onClick();
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleEscape);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleEscape);
		}
	});

	const menuItems = [
		{ title: 'WORKS', link: '/works' },
		{ title: 'ABOUT', link: '/about' },
		{ title: 'SKILLS', link: '/skills' },
		{ title: 'CONNECT', link: '/connect' }
	];

	function handleHomeClick(e: CustomEvent<MouseEvent>) {
		e.stopPropagation();
		onClick();
	}

	async function handleNavigation(link: string, title: string) {
		if (!document.startViewTransition) {
			goto(link);
			return;
		}

		navigatingTo = title;
		isTransitioning = true;

		// Add a delay before starting the transition
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Start view transition
		const transition = document.startViewTransition(async () => {
			await goto(link);
		});

		try {
			await transition.finished;
		} catch (error) {
			console.error('Transition failed:', error);
		} finally {
			// Only reset after a delay to ensure smooth transition
			setTimeout(() => {
				navigatingTo = null;
				isTransitioning = false;
			}, 100);
		}
	}
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-transparent transition-opacity duration-300"
	class:opacity-100={menuOpen}
	class:pointer-events-auto={menuOpen}
	class:opacity-0={!menuOpen}
	class:pointer-events-none={!menuOpen}
>
	<div
		class={menuOpen ? 'menu-layout' : ''}
		class:is-navigating={navigatingTo !== null || isTransitioning}
	>
		{#each menuItems as item, index}
			<button
				class="menu-item"
				class:glitch-in={menuOpen}
				class:is-navigating-to={navigatingTo === item.title}
				data-title={item.title}
				style="--item-delay: {index * 0.2}s; view-transition-name: menu-{item.title.toLowerCase()}"
				on:click={() => handleNavigation(item.link, item.title)}
			>
				{#if isTransitioning && navigatingTo === item.title}
					<p
						class="text-white-500 flex h-full w-full items-center justify-center text-5xl transition-all duration-500"
					>
						{item.title}
					</p>
				{:else}
					<p
						class="flex h-full w-full items-center justify-center text-3xl text-white transition-all duration-500"
					>
						{item.title}
					</p>
				{/if}
			</button>
		{/each}
		<div class="button-container">
			<div class="button-back">
				<Button on:click={handleHomeClick}>Home</Button>
			</div>
		</div>
	</div>
</div>

<style>
	:root {
		--transition-timing: 0.3s ease-in-out;
		--border-color: #e7e7e71a;
		--hover-color: #2a2a2a37;
		--bg-color: transparent;
		--glitch-duration: 0.3s;
		--total-load-time: 1.2s; /* 4 items * 0.2s delay + 0.4s animation */
	}

	@keyframes noise {
		0%,
		100% {
			background-position: 0 0;
		}
		10% {
			background-position: -5% -10%;
		}
		20% {
			background-position: -15% 5%;
		}
		30% {
			background-position: 7% -25%;
		}
		40% {
			background-position: 20% 25%;
		}
		50% {
			background-position: -25% 10%;
		}
		60% {
			background-position: 15% 5%;
		}
		70% {
			background-position: 0% 15%;
		}
		80% {
			background-position: 25% 35%;
		}
		90% {
			background-position: -10% 10%;
		}
	}

	.menu-layout {
		position: relative;
		width: 100%;
		height: 100%;
		pointer-events: none; /* Disable all interactions initially */
		animation: enableInteraction var(--total-load-time) forwards;
	}

	@keyframes enableInteraction {
		0%,
		99% {
			pointer-events: none;
		}
		100% {
			pointer-events: all;
		}
	}

	.menu-item {
		position: absolute;
		background: var(--bg-color);
		border: 2px solid var(--border-color);
		transition: all var(--transition-timing);
		opacity: 0;
		visibility: hidden;
		filter: blur(0);
		transform-style: preserve-3d;
		perspective: 1000px;
		contain: paint;
	}

	.menu-item:hover p {
		color: white !important;
		font-size: 3rem !important;
	}

	.menu-item.is-navigating-to {
		color: white !important;
		background: black !important;
	}

	.glitch-in {
		animation: glitchIn var(--glitch-duration) steps(2) forwards;
		animation-delay: var(--item-delay);
		visibility: visible;
	}

	@keyframes glitchIn {
		0% {
			opacity: 0;
			transform: scale(0.95) translateX(-5px);
			filter: brightness(1.5);
		}
		20% {
			opacity: 0.5;
			transform: scale(1.02) translateX(4px) skewX(2deg);
			filter: brightness(1.2);
		}
		40% {
			opacity: 0.8;
			transform: scale(0.98) translateX(-3px) skewX(-2deg);
			filter: brightness(1.4);
		}
		60% {
			opacity: 1;
			transform: scale(1) translateX(2px);
			filter: brightness(1.1);
		}
		80% {
			transform: translateX(-2px);
		}
		100% {
			opacity: 1;
			transform: scale(1) translateX(0);
			filter: none;
		}
	}

	.glitch-in::before,
	.glitch-in::after {
		content: '';
		position: absolute;
		inset: 0;
		background: inherit;
		border: inherit;
		pointer-events: none;
		z-index: -1;
	}

	.glitch-in::before {
		background: linear-gradient(90deg, transparent, rgba(92, 92, 92, 0.1));
		animation: glitchBefore 0.3s steps(2) forwards;
		animation-delay: calc(var(--item-delay) + 0.1s);
		mix-blend-mode: screen;
		transform: translateX(-3px);
	}

	.glitch-in::after {
		background: linear-gradient(90deg, transparent, rgba(18, 18, 18, 0.1));
		animation: glitchAfter 0.3s steps(2) forwards;
		animation-delay: calc(var(--item-delay) + 0.15s);
		mix-blend-mode: screen;
		transform: translateX(3px);
	}

	@keyframes glitchBefore {
		0%,
		100% {
			opacity: 0;
			transform: translateX(0);
		}
		20%,
		80% {
			opacity: 0.2;
			transform: translateX(-3px);
		}
		40%,
		60% {
			opacity: 0.1;
			transform: translateX(3px);
		}
	}

	@keyframes glitchAfter {
		0%,
		100% {
			opacity: 0;
			transform: translateX(0);
		}
		20%,
		80% {
			opacity: 0.2;
			transform: translateX(3px);
		}
		40%,
		60% {
			opacity: 0.1;
			transform: translateX(-3px);
		}
	}

	/* Base hover effect */
	.menu-item:hover {
		background: var(--hover-color);
		z-index: 1;
	}

	.menu-item[data-title='WORKS'] {
		width: 60vw;
		height: 40vh;
		left: 0%;
	}

	.menu-item[data-title='ABOUT'] {
		width: 40vw;
		height: 60vh;
		left: 60%;
		top: 0;
	}

	.menu-item[data-title='SKILLS'] {
		width: 40vw;
		height: 60vh;
		left: 0%;
		top: 40%;
	}

	.menu-item[data-title='CONNECT'] {
		width: 60vw;
		height: 40vh;
		left: 40%;
		top: 60%;
	}

	.button-container {
		position: absolute;
		left: 50%;
		top: 40vh;
		transform: translateX(-50%);
		width: 20%;
		height: 20%;
		transition: all var(--transition-timing);
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--border-color);
		pointer-events: none; /* Disable button container interactions initially */
		animation: enableInteraction var(--total-load-time) forwards;
	}

	.button-container:hover {
		width: 30%;
		height: 30%;
		top: 35vh;
	}
	.menu-layout:has(.button-container:hover) .menu-item[data-title='CONNECT'] {
		width: 35vw;
		height: 65vh;
		left: 65%;
		top: 35%;
	}
	.menu-layout:has(.button-container:hover) .menu-item[data-title='SKILLS'] {
		width: 65vw;
		height: 35vh;
		top: 65%;
	}
	.menu-layout:has(.button-container:hover) .menu-item[data-title='ABOUT'] {
		width: 65vw;
		height: 35vh;
		left: 35%;
	}
	.menu-layout:has(.button-container:hover) .menu-item[data-title='WORKS'] {
		width: 35vw;
		height: 65vh;
	}

	/* WORKS Hover effects */
	.menu-layout:has(.menu-item[data-title='WORKS']:hover) .menu-item[data-title='WORKS'] {
		width: 70vw;
		height: 45vh;
	}
	.menu-layout:has(.menu-item[data-title='WORKS']:hover) .menu-item[data-title='ABOUT'] {
		width: 30vw;
		height: 65vh;
		left: 70vw;
	}
	.menu-layout:has(.menu-item[data-title='WORKS']:hover) .menu-item[data-title='SKILLS'] {
		width: 50vw;
		height: 55vh;
		left: 0%;
		top: 45%;
	}
	.menu-layout:has(.menu-item[data-title='WORKS']:hover) .menu-item[data-title='CONNECT'] {
		width: 50vw;
		height: 35vh;
		left: 50%;
		top: 65%;
	}
	.menu-layout:has(.menu-item[data-title='WORKS']:hover) .button-container {
		top: 45vh;
		left: 60vw;
	}

	/* ABOUT Hover effects */
	.menu-layout:has(.menu-item[data-title='ABOUT']:hover) .menu-item[data-title='ABOUT'] {
		width: 55vw;
		height: 70vh;
		left: 45%;
	}
	.menu-layout:has(.menu-item[data-title='ABOUT']:hover) .menu-item[data-title='WORKS'] {
		width: 45vw;
		height: 50vh;
	}
	.menu-layout:has(.menu-item[data-title='ABOUT']:hover) .menu-item[data-title='SKILLS'] {
		width: 25vw;
		height: 50vh;
		top: 50%;
	}
	.menu-layout:has(.menu-item[data-title='ABOUT']:hover) .menu-item[data-title='CONNECT'] {
		width: 75vw;
		height: 30vh;
		top: 70%;
		left: 25%;
	}
	.menu-layout:has(.menu-item[data-title='ABOUT']:hover) .button-container {
		top: 50vh;
		left: 35vw;
	}

	/* SKILLS Hover effects */
	.menu-layout:has(.menu-item[data-title='SKILLS']:hover) .menu-item[data-title='SKILLS'] {
		width: 55vw;
		height: 70vh;
		top: 30%;
	}
	.menu-layout:has(.menu-item[data-title='SKILLS']:hover) .menu-item[data-title='WORKS'] {
		width: 75vw;
		height: 30vh;
	}
	.menu-layout:has(.menu-item[data-title='SKILLS']:hover) .menu-item[data-title='ABOUT'] {
		width: 25vw;
		height: 50vh;
		left: 75%;
	}
	.menu-layout:has(.menu-item[data-title='SKILLS']:hover) .menu-item[data-title='CONNECT'] {
		height: 50vh;
		top: 50%;
		width: 45vw;
		left: 55%;
	}
	.menu-layout:has(.menu-item[data-title='SKILLS']:hover) .button-container {
		top: 30vh;
		left: 65vw;
	}

	/* CONNECT Hover effects */
	.menu-layout:has(.menu-item[data-title='CONNECT']:hover) .menu-item[data-title='CONNECT'] {
		width: 70vw;
		height: 45vh;
		top: 55%;
		left: 30%;
	}
	.menu-layout:has(.menu-item[data-title='CONNECT']:hover) .menu-item[data-title='WORKS'] {
		width: 50vw;
		height: 35vh;
	}
	.menu-layout:has(.menu-item[data-title='CONNECT']:hover) .menu-item[data-title='ABOUT'] {
		width: 50vw;
		height: 55vh;
		left: 50%;
	}
	.menu-layout:has(.menu-item[data-title='CONNECT']:hover) .menu-item[data-title='SKILLS'] {
		width: 30vw;
		height: 65vh;
		top: 35%;
	}
	.menu-layout:has(.menu-item[data-title='CONNECT']:hover) .button-container {
		top: 35vh;
		left: 40%;
	}

	.menu-layout.is-navigating .menu-item:not(.is-navigating-to) {
		opacity: 0;
		transform: translateX(-100vw);
		transition: all 0.3s ease-in-out;
		pointer-events: none;
	}

	.menu-layout.is-navigating .menu-item.is-navigating-to {
		width: 100vw !important;
		height: 100vh !important;
		left: 0 !important;
		top: 0 !important;
		transition: all 0.3s ease-in-out;
		pointer-events: none;
		z-index: 50;
	}

	.menu-layout.is-navigating .button-container {
		opacity: 0;
		transform: translateY(100vh);
		transition: all 0.3s ease-in-out;
		pointer-events: none;
	}

	/* WORKS navigation effect */
	.menu-layout.is-navigating:has(.menu-item[data-title='WORKS'].is-navigating-to)
		.menu-item[data-title='ABOUT'] {
		transform: translateX(100vw);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='WORKS'].is-navigating-to)
		.menu-item[data-title='SKILLS'] {
		transform: translateY(100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='WORKS'].is-navigating-to)
		.menu-item[data-title='CONNECT'] {
		transform: translate(100vw, 100vh);
	}

	/* ABOUT navigation effect */
	.menu-layout.is-navigating:has(.menu-item[data-title='ABOUT'].is-navigating-to)
		.menu-item[data-title='WORKS'] {
		transform: translateX(-100vw);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='ABOUT'].is-navigating-to)
		.menu-item[data-title='SKILLS'] {
		transform: translate(-100vw, 100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='ABOUT'].is-navigating-to)
		.menu-item[data-title='CONNECT'] {
		transform: translateY(100vh);
	}

	/* SKILLS navigation effect */
	.menu-layout.is-navigating:has(.menu-item[data-title='SKILLS'].is-navigating-to)
		.menu-item[data-title='WORKS'] {
		transform: translateY(-100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='SKILLS'].is-navigating-to)
		.menu-item[data-title='ABOUT'] {
		transform: translate(100vw, -100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='SKILLS'].is-navigating-to)
		.menu-item[data-title='CONNECT'] {
		transform: translateX(100vw);
	}

	/* CONNECT navigation effect */
	.menu-layout.is-navigating:has(.menu-item[data-title='CONNECT'].is-navigating-to)
		.menu-item[data-title='WORKS'] {
		transform: translate(-100vw, -100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='CONNECT'].is-navigating-to)
		.menu-item[data-title='ABOUT'] {
		transform: translateY(-100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='CONNECT'].is-navigating-to)
		.menu-item[data-title='SKILLS'] {
		transform: translateX(-100vw);
	}
</style>
