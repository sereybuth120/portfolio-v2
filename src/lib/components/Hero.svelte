<script lang="ts">
	import Button from './Button.svelte';
	import GlitchText from './GlitchText.svelte';
	import MatrixRain from './MatrixRain.svelte';
	import OrbitalTech from './OrbitalTech.svelte';
	import TypewriterGlitch from './TypewriterGlitch.svelte';

	export let onClick: () => void;
	export let menuOpen: boolean = false;

	function handleMenuClick(e: CustomEvent<MouseEvent>) {
		e.stopPropagation();
		onClick();
	}
</script>

<div
	class="relative flex h-full w-full flex-col justify-between bg-transparent px-5 opacity-0 transition-all duration-300"
	class:opacity-100={!menuOpen}
	class:pointer-events-auto={!menuOpen}
	class:opacity-10={menuOpen}
	class:pointer-events-none={menuOpen}
	class:blur-md={menuOpen}
>
	<MatrixRain
		opacity={0.1}
		columnSpacing={80}
		fallSpeed={{ min: 3, max: 6 }}
		fontSize={{ min: 6, max: 14 }}
	/>
	<div class="flex w-full flex-col">
		<div class="flex justify-end">
			<GlitchText />
		</div>
		<div class="flex justify-start">
			<TypewriterGlitch words={['web_developer', 'web_designer']} />
		</div>
	</div>

	<div class="orbit-container">
		<div class="button-container">
			<Button on:click={handleMenuClick}>EXPLORE</Button>
		</div>

		<OrbitalTech />
	</div>

	<div></div>
</div>

<style>
	.button-container {
		position: relative;
		top: 150px;
		z-index: 900;
	}

	.orbit-container {
		z-index: 1;
		position: relative;
	}
</style>
