<script>
	import { onDestroy, onMount } from 'svelte';

	// Props
	export let words = ['web developer', 'web designer'];
	export let typingSpeed = { min: 50, max: 200 };
	export let deletingSpeed = { min: 30, max: 130 };
	export let pauseDuration = 2000;
	export let nextWordDelay = 500;

	// State
	let currentWordIndex = 0;
	let currentCharIndex = 0;
	let isDeleting = false;
	let isTyping = false;
	let displayText = '';
	let isGlitching = false;

	let typewriterTimeout;
	let glitchInterval;

	function addGlitchEffect() {
		isGlitching = true;
	}

	function removeGlitchEffect() {
		isGlitching = false;
	}

	function typeWriter() {
		const currentWord = words[currentWordIndex];

		if (!isDeleting && currentCharIndex < currentWord.length) {
			// Typing
			if (!isTyping) {
				isTyping = true;
				addGlitchEffect();
			}

			displayText = currentWord.substring(0, currentCharIndex + 1);
			currentCharIndex++;

			// Random typing speed with glitch effect
			typewriterTimeout = setTimeout(
				typeWriter,
				Math.random() * (typingSpeed.max - typingSpeed.min) + typingSpeed.min
			);
		} else if (!isDeleting && currentCharIndex === currentWord.length) {
			// Finished typing, pause then start deleting
			removeGlitchEffect();
			isTyping = false;
			typewriterTimeout = setTimeout(() => {
				isDeleting = true;
				addGlitchEffect();
				typeWriter();
			}, pauseDuration);
		} else if (isDeleting && currentCharIndex > 0) {
			// Deleting
			currentCharIndex--;
			displayText = currentWord.substring(0, currentCharIndex);
			typewriterTimeout = setTimeout(
				typeWriter,
				Math.random() * (deletingSpeed.max - deletingSpeed.min) + deletingSpeed.min
			);
		} else if (isDeleting && currentCharIndex === 0) {
			// Finished deleting, move to next word
			removeGlitchEffect();
			isDeleting = false;
			currentWordIndex = (currentWordIndex + 1) % words.length;
			typewriterTimeout = setTimeout(typeWriter, nextWordDelay);
		}
	}

	onMount(() => {
		// Start the effect
		typeWriter();

		// Add random glitch bursts
		glitchInterval = setInterval(() => {
			if (Math.random() < 0.05) {
				addGlitchEffect();
				setTimeout(removeGlitchEffect, 150);
			}
		}, 3000);
	});

	onDestroy(() => {
		if (typewriterTimeout) {
			clearTimeout(typewriterTimeout);
		}
		if (glitchInterval) {
			clearInterval(glitchInterval);
		}
	});
</script>

<div class="container">
	<div class="typewriter" class:glitch={isGlitching}>
		<span class="text">{displayText}</span>
		<span class="cursor">|</span>
	</div>
</div>

<style>
	.container {
		text-align: center;
		width: fit-content;
	}

	.typewriter {
		font-size: 80px;
		font-weight: bold;
		color: transparent;
		position: relative;
		display: inline-block;
		text-shadow:
			0 0 3px #fa5c29,
			0 0 6px #fa5c29;
		color: rgb(0, 0, 0);
		-webkit-text-stroke: 1px #fa5c29;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
	}

	.typewriter::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(250, 92, 41, 0.1) 2px,
			rgba(250, 92, 41, 0.1) 4px
		);
		pointer-events: none;
	}

	.glitch {
		animation: glitch-text 0.8s infinite;
	}

	.cursor {
		display: inline-block;
		background-color: transparent;
		width: 3px;
		animation: blink 1s infinite;
		margin-left: 2px;
		padding-bottom: 20px;
	}

	@keyframes blink {
		0%,
		15%,
		30%,
		50% {
			opacity: 1;
		}
		51%,
		65%,
		80%,
		95% {
			opacity: 0;
		}
	}

	@keyframes glitch-text {
		0% {
			transform: translate(0);
		}
		20% {
			transform: translate(-1px, 1px);
		}
		40% {
			transform: translate(-1px, -1px);
		}
		60% {
			transform: translate(1px, 1px);
		}
		80% {
			transform: translate(1px, -1px);
		}
		100% {
			transform: translate(0);
		}
	}
</style>
