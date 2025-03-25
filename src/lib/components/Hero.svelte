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
	class="relative bg-transparent opacity-0 transition-all duration-300"
	class:opacity-100={!menuOpen}
	class:pointer-events-auto={!menuOpen}
	class:opacity-10={menuOpen}
	class:pointer-events-none={menuOpen}
	class:blur-md={menuOpen}
>
	<div class="z-10 flex h-screen flex-col items-start justify-between">
		<h1 class="">WEB DEVELOPER</h1>
		<div>
			<h4 class="text-[6rem] text-white" data-content="Web Developer">Web Developer</h4>
			<div class=" z-20">
				<Button on:click={handleMenuClick}>Menu</Button>
			</div>
		</div>
		<div></div>
	</div>
	<OrbitalTech />
</div>

<style>
	h1 {
		color: rgb(0, 0, 0);
		-webkit-text-stroke: 2px rgb(255, 255, 255);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
		font-size: 12vw;
		line-height: 190px;
		word-break: break-all;
	}
</style>
