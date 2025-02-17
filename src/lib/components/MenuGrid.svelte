<script lang="ts">
	import Button from './Button.svelte';

	export let onClick: () => void = () => {};

	const menuItems = [
		{ title: 'WORK', link: '/work' },
		{ title: 'ABOUT', link: '/ABOUT' },
		{ title: 'SKILLS', link: '/SKILLS' },
		{ title: 'CONNECT', link: '/CONNECT' }
	];
</script>

<div class="menu-container">
	<div class="menu-grid">
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
	.menu-container {
		position: relative;
		height: 100vh;
		width: 100vw;
		background: #2d3436;
	}

	.menu-grid {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.menu-item {
		position: absolute;
		background: #2d3436;
		border: 2px solid rgba(231, 231, 231, 0.1);
		transition: all 0.3s ease-in-out;
	}

	/* Base hover effect */
	.menu-item:hover {
		background: #ffd700;
		z-index: 1;
	}

	.menu-item[data-title='WORK'] {
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
		transition: all 0.3s ease-in-out;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid red;
		z-index: 2;
	}

	/* WORK Hover effects */
	.menu-grid:has(.menu-item[data-title='WORK']:hover) .menu-item[data-title='WORK'] {
		width: 70vw;
		height: 45vh;
	}
	.menu-grid:has(.menu-item[data-title='WORK']:hover) .menu-item[data-title='ABOUT'] {
		width: 30vw;
		height: 65vh;
		left: 70vw;
	}
	.menu-grid:has(.menu-item[data-title='WORK']:hover) .menu-item[data-title='SKILLS'] {
		width: 50vw;
		height: 55vh;
		left: 0%;
		top: 45%;
	}
	.menu-grid:has(.menu-item[data-title='WORK']:hover) .menu-item[data-title='CONNECT'] {
		width: 50vw;
		height: 35vh;
		left: 50%;
		top: 65%;
	}
	.menu-grid:has(.menu-item[data-title='WORK']:hover) .button-container {
		top: 45vh;
		left: 60vw;
	}

	/* ABOUT Hover effects */
	.menu-grid:has(.menu-item[data-title='ABOUT']:hover) .menu-item[data-title='ABOUT'] {
		width: 55vw;
		height: 70vh;
		left: 45%;
	}
	.menu-grid:has(.menu-item[data-title='ABOUT']:hover) .menu-item[data-title='WORK'] {
		width: 45vw;
		height: 50vh;
	}
	.menu-grid:has(.menu-item[data-title='ABOUT']:hover) .menu-item[data-title='SKILLS'] {
		width: 25vw;
		height: 50vh;
		top: 50%;
	}
	.menu-grid:has(.menu-item[data-title='ABOUT']:hover) .menu-item[data-title='CONNECT'] {
		width: 75vw;
		height: 30vh;
		top: 70%;
		left: 25%;
	}
	.menu-grid:has(.menu-item[data-title='ABOUT']:hover) .button-container {
		top: 50vh;
		left: 35vw;
	}

	/* SKILLS Hover effects */
	.menu-grid:has(.menu-item[data-title='SKILLS']:hover) .menu-item[data-title='SKILLS'] {
		width: 55vw;
		height: 70vh;
		top: 30%;
	}
	.menu-grid:has(.menu-item[data-title='SKILLS']:hover) .menu-item[data-title='WORK'] {
		width: 75vw;
		height: 30vh;
	}
	.menu-grid:has(.menu-item[data-title='SKILLS']:hover) .menu-item[data-title='ABOUT'] {
		width: 25vw;
		height: 50vh;
		left: 75%;
	}
	.menu-grid:has(.menu-item[data-title='SKILLS']:hover) .menu-item[data-title='CONNECT'] {
		height: 50vh;
		top: 50%;
		width: 45vw;
		left: 55%;
	}
	.menu-grid:has(.menu-item[data-title='SKILLS']:hover) .button-container {
		top: 30vh;
		left: 65vw;
	}

	/* CONNECT Hover effects */
	.menu-grid:has(.menu-item[data-title='CONNECT']:hover) .menu-item[data-title='CONNECT'] {
		width: 70vw;
		height: 45vh;
		top: 55%;
		left: 30%;
	}
	.menu-grid:has(.menu-item[data-title='CONNECT']:hover) .menu-item[data-title='WORK'] {
		width: 50vw;
		height: 35vh;
	}
	.menu-grid:has(.menu-item[data-title='CONNECT']:hover) .menu-item[data-title='ABOUT'] {
		width: 50vw;
		height: 55vh;
		left: 50%;
	}
	.menu-grid:has(.menu-item[data-title='CONNECT']:hover) .menu-item[data-title='SKILLS'] {
		width: 30vw;
		height: 65vh;
		top: 35%;
	}
	.menu-grid:has(.menu-item[data-title='CONNECT']:hover) .button-container {
		top: 35vh;
		left: 40%;
	}
</style>
