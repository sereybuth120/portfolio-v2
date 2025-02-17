<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	const experiences = [
		{
			title: 'Senior Developer',
			company: 'Tech Corp',
			period: '2021 - Present',
			description:
				'Led development of multiple full-stack applications, mentored junior developers, and implemented CI/CD pipelines.',
			technologies: ['React', 'Node.js', 'AWS']
		},
		{
			title: 'Full Stack Developer',
			company: 'Digital Solutions Inc',
			period: '2019 - 2021',
			description:
				'Developed and maintained web applications, collaborated with design team, and optimized application performance.',
			technologies: ['Vue.js', 'Python', 'Docker']
		},
		{
			title: 'Junior Developer',
			company: 'StartUp Labs',
			period: '2017 - 2019',
			description:
				'Built responsive web interfaces, implemented RESTful APIs, and participated in agile development processes.',
			technologies: ['JavaScript', 'PHP', 'MySQL']
		}
	];
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-4xl font-bold">Experience</h1>

	<div class="space-y-6">
		{#each experiences as exp, i}
			<div class="relative">
				{#if i !== experiences.length - 1}
					<div class="absolute top-16 left-6 h-full w-0.5 bg-gray-200"></div>
				{/if}
				<Card>
					<div class="flex items-start gap-4">
						<div
							class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"
						>
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width={2}
									d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div class="flex-1">
							<div class="flex items-center justify-between">
								<h3 class="text-xl font-semibold">{exp.title}</h3>
								<span class="text-sm text-gray-500">{exp.period}</span>
							</div>
							<p class="text-lg text-gray-600">{exp.company}</p>
							<p class="mt-2 text-gray-600">{exp.description}</p>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each exp.technologies as tech}
									<span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
										{tech}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</Card>
			</div>
		{/each}
	</div>
</div>
