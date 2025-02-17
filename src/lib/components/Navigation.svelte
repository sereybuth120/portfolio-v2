<script lang="ts">
	import { page } from '$app/stores';
	import MenuIcon from '$lib/assets/icons/MenuIcon.svelte';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/works', label: 'Works' },
		{ href: '/experience', label: 'Experience' },
		{ href: '/skills', label: 'Skills' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<nav class="bg-white shadow-md h-[5vh]">
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="text-xl font-bold text-gray-800">Portfolio</a>
			</div>

			<div class="hidden space-x-2 md:flex">
				{#each navItems as { href, label }}
					<a
						{href}
						class={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
							$page.url.pathname === href
								? 'bg-blue-100 text-blue-700'
								: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
						}`}
					>
						{label}
					</a>
				{/each}
			</div>

			<button class="md:hidden">
				<MenuIcon className="h-6 w-6 text-gray-600" />
			</button>
		</div>
	</div>

	<!-- Mobile menu -->
	<div class="md:hidden">
		{#each navItems as { href, label }}
			<a
				{href}
				class={`block px-4 py-2 text-sm ${
					$page.url.pathname === href ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
				}`}
			>
				{label}
			</a>
		{/each}
	</div>
</nav>
