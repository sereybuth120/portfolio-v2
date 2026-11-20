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
		{ title: 'WORKS', link: '/works', subtitle: 'PROJECT ARCHIVE', icon: '◈' },
		{ title: 'ABOUT', link: '/about', subtitle: 'ORIGIN SIGNAL', icon: '◉' },
		{ title: 'SKILLS', link: '/skills', subtitle: 'CAPABILITIES', icon: '◇' },
		{ title: 'CONNECT', link: '/contact', subtitle: 'ESTABLISH LINK', icon: '◎' }
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

		await new Promise((resolve) => setTimeout(resolve, 1000));

		const transition = document.startViewTransition(async () => {
			await goto(link);
		});

		try {
			await transition.finished;
		} catch (error) {
			console.error('Transition failed:', error);
		} finally {
			setTimeout(() => {
				navigatingTo = null;
				isTransitioning = false;
			}, 100);
		}
	}
</script>

<div
	class="menu-overlay"
	class:active={menuOpen}
>
	<!-- Cosmic grid background -->
	<div class="cosmic-grid"></div>

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
				<!-- Sector background effects -->
				<div class="sector-bg">
					<div class="sector-stars"></div>
					<div class="sector-gradient"></div>
				</div>

				<!-- Content -->
				<div class="sector-content">
					<div class="sector-header">
						<span class="sector-icon">{item.icon}</span>
						<span class="sector-subtitle">{item.subtitle}</span>
					</div>
					<p class="sector-title">{item.title}</p>
				</div>

				<!-- Scan line effect -->
				<div class="scan-line"></div>

				<!-- Corner accents -->
				<div class="corner corner-tl"></div>
				<div class="corner corner-tr"></div>
				<div class="corner corner-bl"></div>
				<div class="corner corner-br"></div>
			</button>
		{/each}

		<!-- Centered button container -->
		<div class="button-container">
			<div class="button-back">
				<Button on:click={handleHomeClick}>
					<span class="beacon-text">
						<span class="beacon-icon">↩</span>
						RETURN
					</span>
				</Button>
			</div>
		</div>
	</div>
</div>

<style>
	:root {
		--transition-timing: 0.3s ease-in-out;
		--border-color: rgba(255, 255, 255, 0.08);
		--hover-color: rgba(255, 255, 255, 0.02);
		--bg-color: transparent;
		--glitch-duration: 0.3s;
		--total-load-time: 1.2s;
	}

	.menu-overlay {
		position: fixed;
		inset: 0;
		z-index: 50;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s ease;
		background: rgba(0, 0, 0, 0.95);
	}

	.menu-overlay.active {
		opacity: 1;
		pointer-events: auto;
	}

	/* Cosmic Grid Background */
	.cosmic-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
		background-size: 50px 50px;
		opacity: 0.5;
	}

	.menu-layout {
		position: relative;
		width: 100%;
		height: 100%;
		pointer-events: none;
		animation: enableInteraction var(--total-load-time) forwards;
	}

	@keyframes enableInteraction {
		0%, 99% { pointer-events: none; }
		100% { pointer-events: all; }
	}

	/* ===== MENU ITEM BASE ===== */
	.menu-item {
		position: absolute;
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		transition: all var(--transition-timing);
		opacity: 0;
		visibility: hidden;
		filter: blur(0);
		transform-style: preserve-3d;
		perspective: 1000px;
		contain: paint;
		cursor: pointer;
		overflow: hidden;
	}

	/* Sector Background */
	.sector-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.sector-stars {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.3), transparent),
			radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.2), transparent),
			radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.3), transparent),
			radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.2), transparent),
			radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent),
			radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.2), transparent);
		background-size: 200px 200px;
		opacity: 0.5;
	}

	.sector-gradient {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
	}

	/* Sector Content */
	.sector-content {
		position: relative;
		z-index: 10;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		text-align: center;
	}

	.sector-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		opacity: 0.4;
		transition: all 0.3s ease;
	}

	.menu-item:hover .sector-header {
		opacity: 0.7;
	}

	.sector-icon {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.6);
		transition: color 0.3s ease;
	}

	.menu-item:hover .sector-icon {
		color: #fa5c29;
	}

	.sector-subtitle {
		font-family: 'Exo2', monospace;
		font-size: 0.5rem;
		letter-spacing: 0.3em;
		color: rgba(255, 255, 255, 0.4);
	}

	.sector-title {
		font-family: 'Blanka', sans-serif;
		font-size: clamp(1.8rem, 4vw, 3rem);
		color: rgba(255, 255, 255, 0.8);
		letter-spacing: 0.1em;
		margin: 0;
		transition: all 0.3s ease;
	}

	.menu-item:hover .sector-title {
		color: #fa5c29;
		text-shadow: 0 0 40px rgba(250, 92, 41, 0.4);
		transform: scale(1.08);
	}

	.menu-item.is-navigating-to .sector-title {
		color: #fa5c29;
	}

	/* Scan Line */
	.scan-line {
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.menu-item:hover .scan-line {
		opacity: 1;
		animation: scan 2.5s linear infinite;
	}

	@keyframes scan {
		0% { top: 0; }
		100% { top: 100%; }
	}

	/* Corner Accents */
	.corner {
		position: absolute;
		width: 15px;
		height: 15px;
		border-color: rgba(255, 255, 255, 0.08);
		border-style: solid;
		border-width: 0;
		transition: all 0.3s ease;
	}

	.corner-tl { top: 10px; left: 10px; border-top-width: 1px; border-left-width: 1px; }
	.corner-tr { top: 10px; right: 10px; border-top-width: 1px; border-right-width: 1px; }
	.corner-bl { bottom: 10px; left: 10px; border-bottom-width: 1px; border-left-width: 1px; }
	.corner-br { bottom: 10px; right: 10px; border-bottom-width: 1px; border-right-width: 1px; }

	.menu-item:hover .corner {
		border-color: rgba(250, 92, 41, 0.25);
		width: 25px;
		height: 25px;
	}

	/* ===== GLITCH ANIMATION ===== */
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
		0%, 100% { opacity: 0; transform: translateX(0); }
		20%, 80% { opacity: 0.2; transform: translateX(-3px); }
		40%, 60% { opacity: 0.1; transform: translateX(3px); }
	}

	@keyframes glitchAfter {
		0%, 100% { opacity: 0; transform: translateX(0); }
		20%, 80% { opacity: 0.2; transform: translateX(3px); }
		40%, 60% { opacity: 0.1; transform: translateX(-3px); }
	}

	/* ===== BASE HOVER EFFECT ===== */
	.menu-item:hover {
		background: var(--hover-color);
		border-color: rgba(255, 255, 255, 0.15);
		z-index: 1;
	}

	/* ===== BASE POSITIONS (Asymmetric Layout) ===== */
	.menu-item[data-title='WORKS'] {
		width: 60vw;
		height: 40vh;
		left: 0%;
		top: 0;
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

	/* ===== BUTTON CONTAINER ===== */
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
		pointer-events: none;
		animation: enableInteraction var(--total-load-time) forwards;
		background: rgba(0, 0, 0, 0.5);
	}

	.button-container:hover {
		width: 30%;
		height: 30%;
		top: 35vh;
		background: rgba(0, 0, 0, 0.7);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.beacon-text {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'Exo2', monospace;
		letter-spacing: 0.2em;
	}

	.beacon-icon {
		font-size: 0.8rem;
	}

	/* ===== BUTTON CONTAINER HOVER SHIFTS ===== */
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

	/* ===== WORKS HOVER SHIFTS ===== */
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

	/* ===== ABOUT HOVER SHIFTS ===== */
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

	/* ===== SKILLS HOVER SHIFTS ===== */
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

	/* ===== CONNECT HOVER SHIFTS ===== */
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

	/* ===== NAVIGATION ANIMATIONS ===== */
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
		background: #000;
	}

	.menu-layout.is-navigating .button-container {
		opacity: 0;
		transform: translateY(100vh);
		transition: all 0.3s ease-in-out;
		pointer-events: none;
	}

	/* WORKS navigation effect */
	.menu-layout.is-navigating:has(.menu-item[data-title='WORKS'].is-navigating-to) .menu-item[data-title='ABOUT'] {
		transform: translateX(100vw);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='WORKS'].is-navigating-to) .menu-item[data-title='SKILLS'] {
		transform: translateY(100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='WORKS'].is-navigating-to) .menu-item[data-title='CONNECT'] {
		transform: translate(100vw, 100vh);
	}

	/* ABOUT navigation effect */
	.menu-layout.is-navigating:has(.menu-item[data-title='ABOUT'].is-navigating-to) .menu-item[data-title='WORKS'] {
		transform: translateX(-100vw);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='ABOUT'].is-navigating-to) .menu-item[data-title='SKILLS'] {
		transform: translate(-100vw, 100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='ABOUT'].is-navigating-to) .menu-item[data-title='CONNECT'] {
		transform: translateY(100vh);
	}

	/* SKILLS navigation effect */
	.menu-layout.is-navigating:has(.menu-item[data-title='SKILLS'].is-navigating-to) .menu-item[data-title='WORKS'] {
		transform: translateY(-100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='SKILLS'].is-navigating-to) .menu-item[data-title='ABOUT'] {
		transform: translate(100vw, -100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='SKILLS'].is-navigating-to) .menu-item[data-title='CONNECT'] {
		transform: translateX(100vw);
	}

	/* CONNECT navigation effect */
	.menu-layout.is-navigating:has(.menu-item[data-title='CONNECT'].is-navigating-to) .menu-item[data-title='WORKS'] {
		transform: translate(-100vw, -100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='CONNECT'].is-navigating-to) .menu-item[data-title='ABOUT'] {
		transform: translateY(-100vh);
	}
	.menu-layout.is-navigating:has(.menu-item[data-title='CONNECT'].is-navigating-to) .menu-item[data-title='SKILLS'] {
		transform: translateX(-100vw);
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 768px) {
		.menu-item[data-title='WORKS'],
		.menu-item[data-title='ABOUT'],
		.menu-item[data-title='SKILLS'],
		.menu-item[data-title='CONNECT'] {
			width: 100vw;
			height: 22vh;
			left: 0;
		}

		.menu-item[data-title='WORKS'] { top: 0; }
		.menu-item[data-title='ABOUT'] { top: 22vh; }
		.menu-item[data-title='SKILLS'] { top: 44vh; }
		.menu-item[data-title='CONNECT'] { top: 66vh; }

		.button-container {
			top: auto;
			bottom: 2vh;
			left: 50%;
			width: 40%;
			height: 10vh;
		}

		.sector-title {
			font-size: 1.5rem;
		}

		/* Disable hover shifts on mobile */
		.menu-layout:has(.menu-item:hover) .menu-item,
		.menu-layout:has(.button-container:hover) .menu-item {
			width: 100vw !important;
			height: 22vh !important;
			left: 0 !important;
		}

		.menu-layout:has(.menu-item:hover) .menu-item[data-title='WORKS'],
		.menu-layout:has(.button-container:hover) .menu-item[data-title='WORKS'] { top: 0 !important; }
		.menu-layout:has(.menu-item:hover) .menu-item[data-title='ABOUT'],
		.menu-layout:has(.button-container:hover) .menu-item[data-title='ABOUT'] { top: 22vh !important; }
		.menu-layout:has(.menu-item:hover) .menu-item[data-title='SKILLS'],
		.menu-layout:has(.button-container:hover) .menu-item[data-title='SKILLS'] { top: 44vh !important; }
		.menu-layout:has(.menu-item:hover) .menu-item[data-title='CONNECT'],
		.menu-layout:has(.button-container:hover) .menu-item[data-title='CONNECT'] { top: 66vh !important; }

		.menu-layout:has(.menu-item:hover) .button-container,
		.menu-layout:has(.button-container:hover) .button-container {
			top: auto !important;
			bottom: 2vh !important;
			left: 50% !important;
		}
	}
</style>
