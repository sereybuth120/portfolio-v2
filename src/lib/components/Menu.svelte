<script lang="ts">
	import Button from './Button.svelte';

	export let onClick: () => void = () => {};
	export let menuOpen: boolean = false;
	const menuItems = [
		{ title: 'WORKS', link: '/works' },
		{ title: 'ABOUT', link: '/about' },
		{ title: 'SKILLS', link: '/skills' },
		{ title: 'CONNECT', link: '/connect' }
	];
</script>

<div class="relative h-screen w-screen {menuOpen ? 'opacity-100' : 'opacity-0'}">
	<div class="menu-layout">
		{#each menuItems as item, index}
			<div
				class="menu-item {menuOpen ? 'glitch-in' : ''}"
				data-title={item.title}
				style="--item-delay: {index * 0.2}s"
			>
				<a
					href={item.link}
					class="flex h-full w-full items-center justify-center text-3xl text-white transition-all duration-500"
				>
					{item.title}
				</a>
			</div>
		{/each}
		<div class="button-container">
			<div class="button-back">
				<Button on:click={onClick}>Home</Button>
			</div>
		</div>
	</div>
</div>

<style>
	:root {
		--transition-timing: 0.3s ease-in-out;
		--border-color: rgba(231, 231, 231, 0.1);
		--hover-color: #ffd700;
		--bg-color: #2d3436;
		--glitch-duration: 0.4s;
	}

	.menu-layout {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.menu-item {
		position: absolute;
		background: var(--bg-color);
		border: 2px solid var(--border-color);
		transition: all var(--transition-timing);
		opacity: 0;
		visibility: hidden;
		filter: blur(0);
	}

	.glitch-in {
		animation: glitchIn var(--glitch-duration) forwards;
		animation-delay: var(--item-delay);
		visibility: visible;
	}

	@keyframes glitchIn {
		0% {
			opacity: 0;
			transform: scale(0.8);
			filter: blur(4px);
			clip-path: inset(0 0 100% 0);
		}
		15% {
			opacity: 0.4;
			transform: scale(1.2) skew(10deg);
			filter: blur(2px);
			clip-path: inset(0 0 50% 0);
		}
		20% {
			opacity: 0.6;
			transform: scale(1.1) skew(-5deg);
			filter: blur(0);
			clip-path: inset(0 0 0 0);
		}
		25% {
			opacity: 0.4;
			transform: scale(0.9) skew(5deg);
			filter: blur(2px);
		}
		35% {
			opacity: 0.8;
			transform: scale(1.05) skew(-2deg);
			filter: blur(0);
		}
		45% {
			opacity: 0.6;
			transform: scale(1);
			filter: blur(1px);
		}
		60%,
		100% {
			opacity: 1;
			transform: scale(1);
			filter: blur(0);
			clip-path: inset(0 0 0 0);
		}
	}

	.menu-item::before,
	.menu-item::after {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--bg-color);
		border: 2px solid var(--border-color);
		opacity: 0;
	}

	.glitch-in::before {
		animation: glitchBefore 0.2s steps(2) forwards;
		animation-delay: calc(var(--item-delay) + 0.1s);
	}

	.glitch-in::after {
		animation: glitchAfter 0.2s steps(2) forwards;
		animation-delay: calc(var(--item-delay) + 0.1s);
	}

	@keyframes glitchBefore {
		0%,
		100% {
			opacity: 0;
			transform: translate(0);
		}
		20% {
			opacity: 0.4;
			transform: translate(-4px, 2px);
		}
		40% {
			opacity: 0.2;
			transform: translate(4px, -2px);
		}
		60% {
			opacity: 0.3;
			transform: translate(2px, 4px);
		}
		80% {
			opacity: 0.1;
			transform: translate(-2px, -4px);
		}
	}

	@keyframes glitchAfter {
		0%,
		100% {
			opacity: 0;
			transform: translate(0);
		}
		20% {
			opacity: 0.3;
			transform: translate(4px, -2px);
		}
		40% {
			opacity: 0.2;
			transform: translate(-4px, 2px);
		}
		60% {
			opacity: 0.4;
			transform: translate(-2px, -4px);
		}
		80% {
			opacity: 0.1;
			transform: translate(2px, 4px);
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
		z-index: 20;
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
</style>
