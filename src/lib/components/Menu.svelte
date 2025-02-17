<script lang="ts">
	import Button from './Button.svelte';

	export let onClick: () => void = () => {};

	const menuItems = [
		{ title: 'WORKS', link: '/works' },
		{ title: 'ABOUT', link: '/about' },
		{ title: 'SKILLS', link: '/skills' },
		{ title: 'CONNECT', link: '/connect' }
	];
</script>

<div class="relative h-screen w-screen">
	<div class="menu-layout">
		{#each menuItems as item}
			<div class="menu-item" data-title={item.title}>
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
				<Button on:click={onClick}>Back</Button>
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
