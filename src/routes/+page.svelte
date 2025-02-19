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
			if (storedMenuState === 'true') {
				showMenu = true;
			}

			// Listen for browser back/forward buttons
			window.addEventListener('popstate', () => {
				const storedMenuState = sessionStorage.getItem('menuState');
				if (storedMenuState === 'true') {
					showMenu = true;
				}
			});
		}
	});

	function handleClick() {
		showMenu = !showMenu;
		if (browser) {
			sessionStorage.setItem('menuState', showMenu.toString());
		}
	}

	// Reset menu state when navigating away from menu pages
	$: if (browser && $page.url.pathname === '/') {
		const storedMenuState = sessionStorage.getItem('menuState');
		if (storedMenuState === 'true') {
			showMenu = true;
		}
	}

	$: console.log('Current state:', showMenu ? 1 : 0);
</script>

<div class="relative h-[100vh] w-full overflow-hidden bg-[#2D3436] text-center">
	<Slider3D onClick={handleClick} menuOpen={showMenu} />
	<Menu onClick={handleClick} menuOpen={showMenu} />
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/ica-rubrik-black');
	@import url('https://fonts.cdnfonts.com/css/poppins');
</style>
