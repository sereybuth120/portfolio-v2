<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Menu from '$lib/components/Menu.svelte';
	import Slider3D from '$lib/components/OrbitalTech.svelte';
	import { onMount } from 'svelte';

	let showMenu = false;

	// Initialize menu state from storage on mount
	onMount(() => {
		if (browser) {
			const storedMenuState = sessionStorage.getItem('menuState');
			showMenu = storedMenuState === 'true';
			console.log('Initial menu state:', showMenu);
		}
	});

	// Track updates

	function handleClick() {
		showMenu = !showMenu;

		if (browser) {
			sessionStorage.setItem('menuState', showMenu.toString());
		}
	}

	// Handle pathname changes
	$: if (browser && $page.url.pathname === '/') {
		const storedMenuState = sessionStorage.getItem('menuState');
		showMenu = storedMenuState === 'true';
	}
</script>

<div class="relative h-[100vh] w-full overflow-hidden bg-[#2D3436] text-center">
	<Slider3D onClick={handleClick} menuOpen={showMenu} />
	<Menu onClick={handleClick} menuOpen={showMenu} />
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/ica-rubrik-black');
	@import url('https://fonts.cdnfonts.com/css/poppins');
</style>
