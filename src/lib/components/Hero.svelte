<script lang="ts">
	import Button from './Button.svelte';
	import OrbitalTech from './OrbitalTech.svelte';

	export let onClick: () => void;
	export let menuOpen: boolean = false;

	function handleMenuClick(e: CustomEvent<MouseEvent>) {
		e.stopPropagation();
		onClick();
	}
</script>

<div
	class="relative flex h-full w-full flex-col justify-center bg-transparent px-5 opacity-0 transition-all duration-300"
	class:opacity-100={!menuOpen}
	class:pointer-events-auto={!menuOpen}
	class:opacity-10={menuOpen}
	class:pointer-events-none={menuOpen}
	class:blur-md={menuOpen}
>
	<h1 class="main-text text-left text-8xl" data-content="HOUT SEREYBUTH">HOUT SEREYBUTH</h1>
	<h1 class="secondary-text text-right text-8xl" data-content="Web">WEB DEVELOPER</h1>
	<h1 class="secondary-text text-left text-8xl" data-content="Web">WEB DESIGNER</h1>
	<div class="">
		<Button on:click={handleMenuClick}>EXPLORE</Button>
	</div>

	<div class="absolute inset-0">
		<OrbitalTech />
	</div>
</div>

<style>
	.main-text {
		color: #ffffff;
		word-break: break-all;
		font-family: 'Exo2', sans-serif;
		font-weight: 500;
	}
	.secondary-text {
		color: rgb(0, 0, 0);
		-webkit-text-stroke: 2px #e97100;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
	}
</style>
