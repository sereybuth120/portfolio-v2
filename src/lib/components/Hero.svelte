<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import Button from './Button.svelte';
	import Globe from './Globe.svelte';

	export let onClick: () => void;
	export let menuOpen: boolean = false;

	// Typewriter state
	let displayedName = '';
	let nameComplete = false;
	const fullName = 'HOUT SEREYBOTH';
	let typewriterTimeout: ReturnType<typeof setTimeout> | undefined;

	function typewriterEffect() {
		if (displayedName.length < fullName.length) {
			displayedName = fullName.slice(0, displayedName.length + 1);
			const delay = 80 + Math.random() * 120;
			typewriterTimeout = setTimeout(typewriterEffect, delay);
		} else {
			nameComplete = true;
		}
	}

	onMount(() => {
		if (browser) {
			setTimeout(typewriterEffect, 800);
		}
	});

	onDestroy(() => {
		if (typewriterTimeout) clearTimeout(typewriterTimeout);
	});

	function handleMenuClick(e: CustomEvent<MouseEvent>) {
		e.stopPropagation();
		onClick();
	}
</script>

<div class="hero-container" class:menu-open={menuOpen}>
	<!-- Globe positioned upper right -->
	<div class="globe-container">
		<Globe />
	</div>

	<!-- Identity left side -->
	<main class="hero-content">
		<div class="identity-block">
			<h1 class="name-display">
				<span class="name-text">{displayedName}</span>
				<span class="cursor" class:hidden={nameComplete}>_</span>
			</h1>
			<div class="role-line">
				<span class="role-bracket">[</span>
				<span class="role-text">DIGITAL ARCHITECT</span>
				<span class="role-bracket">]</span>
			</div>
		</div>

		<div class="cta-container">
			<Button on:click={handleMenuClick}>
				<span class="cta-text">ENTER</span>
			</Button>
		</div>
	</main>
</div>

<style>
	.hero-container {
		position: relative;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		transition: all 0.6s ease;
	}

	.hero-container.menu-open {
		opacity: 0;
		transform: scale(0.98);
		pointer-events: none;
		filter: blur(8px);
	}

	.globe-container {
		position: absolute;
		top: 28%;
		left: 72%;
		transform: translate(-50%, -50%);
		width: min(450px, 50vw);
		height: min(450px, 50vw);
	}

	.hero-content {
		position: absolute;
		left: 8%;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2rem;
	}

	/* Identity Block */
	.identity-block {
		text-align: left;
	}

	.name-display {
		font-family: 'Blanka', sans-serif;
		font-size: clamp(2rem, 6vw, 4rem);
		color: rgba(255, 255, 255, 0.95);
		letter-spacing: 0.2em;
		margin: 0;
		min-height: 1.2em;
		text-shadow: 0 0 60px rgba(255, 255, 255, 0.15);
	}

	.name-text {
		display: inline;
	}

	.cursor {
		display: inline;
		animation: blink 0.8s step-end infinite;
		color: rgba(255, 255, 255, 0.8);
	}

	.cursor.hidden {
		display: none;
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}

	.role-line {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}

	.role-bracket {
		color: rgba(255, 255, 255, 0.35);
		font-family: 'Exo2', monospace;
		font-size: 0.85rem;
	}

	.role-text {
		font-family: 'Exo2', monospace;
		font-size: 0.75rem;
		letter-spacing: 0.3em;
		color: rgba(255, 255, 255, 0.5);
	}

	/* CTA */
	.cta-container {
		position: relative;
	}

	.cta-text {
		font-family: 'Exo2', monospace;
		font-size: 0.85rem;
		letter-spacing: 0.35em;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.globe-container {
			top: 25%;
			left: 50%;
			width: min(280px, 70vw);
			height: min(280px, 70vw);
		}

		.hero-content {
			left: 50%;
			top: auto;
			bottom: 15%;
			transform: translateX(-50%);
			align-items: center;
		}

		.identity-block {
			text-align: center;
		}

		.role-line {
			justify-content: center;
		}

		.name-display {
			font-size: clamp(1.5rem, 8vw, 2.5rem);
			letter-spacing: 0.15em;
		}

		.role-text {
			font-size: 0.65rem;
			letter-spacing: 0.2em;
		}
	}
</style>
