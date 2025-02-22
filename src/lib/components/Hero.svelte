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
	class="border- relative bg-transparent px-50 opacity-0 transition-all duration-300"
	class:opacity-100={!menuOpen}
	class:pointer-events-auto={!menuOpen}
	class:opacity-10={menuOpen}
	class:pointer-events-none={menuOpen}
	class:blur-md={menuOpen}
>
	<OrbitalTech />
	<div class="z-10 mt-10 flex h-screen flex-col items-start justify-center">
		<h4 class="text-[10rem] text-white" data-content="Web">Web</h4>
		<h4 class="mt-25 text-[10rem] text-white" data-content="Developer">Developer</h4>
		<div class="relative z-20">
			<Button on:click={handleMenuClick}>Menu</Button>
		</div>
	</div>
</div>

<style>
</style>
