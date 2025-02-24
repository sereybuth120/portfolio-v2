<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import { onMount } from 'svelte';

	let isLoaded = false;

	onMount(() => {
		setTimeout(() => {
			isLoaded = true;
		}, 100);
	});

	const works = [
		{
			title: 'Work 1',
			description: 'A brief description of work 1 and its key features.',
			tags: ['React', 'TypeScript', 'Tailwind']
		},
		{
			title: 'Work 2',
			description: 'A brief description of work 2 and its key features.',
			tags: ['Svelte', 'Node.js', 'MongoDB']
		},
		{
			title: 'Work 3',
			description: 'A brief description of work 3 and its key features.',
			tags: ['Python', 'Django', 'PostgreSQL']
		}
	];
</script>

<div
	class="mx-auto h-screen w-full px-4 py-8 transition-opacity duration-500"
	class:opacity-0={!isLoaded}
	style="background-color: black"
>
	<h1 class="mb-8 text-4xl font-bold">My Works</h1>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each works as work}
			<Card>
				<div class="space-y-4">
					<h2 class="text-2xl font-semibold">{work.title}</h2>
					<p class="text-gray-600">{work.description}</p>
					<div class="flex flex-wrap gap-2">
						{#each work.tags as tag}
							<span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
								{tag}
							</span>
						{/each}
					</div>
					<Button variant="outline" size="sm">Learn More</Button>
				</div>
			</Card>
		{/each}
	</div>
</div>
