<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';
	import MenuGrid from '$lib/components/MenuGrid.svelte';
	import Slider3D from '$lib/components/Slider3D.svelte';
	const dragonImages = Array.from(
		{ length: 9 },
		(_, i) =>
			`https://raw.githubusercontent.com/HoanghoDev/youtube_v2/refs/heads/main/slider_3d/images/dragon_${i + 1}.jpg`
	);

	let showMenu = false;

	function handleClick() {
		showMenu = !showMenu;
	}

	$: console.log('Current state:', showMenu ? 1 : 0);
</script>

<div class="relative h-[100vh] w-full overflow-hidden bg-[#2D3436] text-center">
	{#if showMenu}
		<Menu onClick={handleClick} />
	{:else}
		<Slider3D images={dragonImages} onClick={handleClick} />
	{/if}
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/ica-rubrik-black');
	@import url('https://fonts.cdnfonts.com/css/poppins');
</style>
