<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';

	type WorkItem = {
		id: number;
		company: string;
		position: string;
		description: string;
		technologies: string[];
		startDate: string;
		endDate: string;
		achievements: string[];
		learnings: string[];
	};

	let isLoaded = false;
	let showDetails = false;
	let selectedWork: WorkItem | null = null;

	onMount(() => {
		setTimeout(() => {
			isLoaded = true;
		}, 100);
	});

	const works: WorkItem[] = [
		{
			id: 1,
			company: 'TechCorp Inc.',
			position: 'Senior Frontend Developer',
			description: 'Led development of customer-facing applications using modern web technologies.',
			technologies: ['React', 'TypeScript', 'GraphQL', 'Tailwind CSS'],
			startDate: 'Jan 2022',
			endDate: 'Present',
			achievements: [
				'Increased application performance by 40% through code optimization',
				'Mentored 5 junior developers in best practices'
			],
			learnings: [
				'Deepened expertise in React performance optimization',
				'Gained leadership experience in a tech team environment'
			]
		},
		{
			id: 2,
			company: 'InnovateX',
			position: 'Full Stack Developer',
			description: 'Developed and maintained multiple web applications for enterprise clients.',
			technologies: ['Svelte', 'Node.js', 'MongoDB', 'Docker'],
			startDate: 'Mar 2020',
			endDate: 'Dec 2021',
			achievements: [
				'Built a real-time analytics dashboard serving 10k+ daily users',
				'Reduced server response time by 30% through database optimization'
			],
			learnings: [
				'Mastered full-stack development with Node.js and Svelte',
				'Learned containerization with Docker for deployment'
			]
		},
		{
			id: 3,
			company: 'WebSolutions Ltd',
			position: 'Frontend Developer',
			description: 'Created responsive and accessible web interfaces for various clients.',
			technologies: ['JavaScript', 'CSS', 'HTML', 'Vue.js'],
			startDate: 'Jun 2018',
			endDate: 'Feb 2020',
			achievements: [
				'Developed 15+ client websites with improved accessibility scores',
				'Implemented design system used across all company projects'
			],
			learnings: [
				'Strengthened CSS and responsive design skills',
				'Learned Vue.js framework and component architecture'
			]
		},
		{
			id: 4,
			company: 'DigitalAgency',
			position: 'Web Developer',
			description: 'Built marketing websites and landing pages for various campaigns.',
			technologies: ['WordPress', 'PHP', 'JavaScript', 'SCSS'],
			startDate: 'Sep 2016',
			endDate: 'May 2018',
			achievements: [
				'Created 30+ high-converting landing pages',
				'Improved site performance by implementing lazy loading'
			],
			learnings: [
				'Gained experience with content management systems',
				'Learned SEO best practices for web development'
			]
		}
	];

	function handleViewDetails(work: WorkItem) {
		selectedWork = work;
		showDetails = true;
	}

	function handleCloseDetails() {
		showDetails = false;
		setTimeout(() => {
			selectedWork = null;
		}, 300);
	}
</script>

<div
	class="relative mx-auto min-h-screen w-full overflow-hidden bg-black text-white transition-opacity duration-500"
	class:opacity-0={!isLoaded}
>
	<!-- Deep space background -->
	<div class="fixed inset-0 z-0">
		<!-- Base background -->
		<div class="absolute inset-0 bg-black"></div>
		
		<!-- Stars -->
		<div class="absolute inset-0">
			{#each Array(200) as _, i}
				<div
					class="absolute h-1 w-1 rounded-full bg-white"
					style="top: {Math.random() * 100}%; left: {Math.random() * 100}%; opacity: {0.1 + Math.random() * 0.4};"
				></div>
			{/each}
		</div>
		
		<!-- Bright stars -->
		<div class="absolute inset-0">
			{#each Array(30) as _, i}
				<div
					class="absolute h-1.5 w-1.5 rounded-full bg-white"
					style="top: {Math.random() * 100}%; left: {Math.random() * 100}%; opacity: {0.5 + Math.random() * 0.5};"
				></div>
			{/each}
		</div>
	</div>

	<!-- Main content -->
	<div class="relative z-10 mx-auto max-w-4xl px-4 py-16">
		<!-- Header -->
		<div class="mb-16 text-center">
			<h1 class="mb-4 text-4xl font-bold tracking-wider md:text-5xl">WORK EXPERIENCE</h1>
			<div class="mx-auto h-0.5 w-32 bg-white"></div>
			<p class="mt-6 font-[Exo2] text-lg text-gray-400">
				A timeline of my professional journey
			</p>
		</div>

		<!-- Timeline -->
		<div class="relative">
			<!-- Timeline line -->
			<div class="absolute left-4 top-0 h-full w-0.5 bg-gray-800 md:left-1/2 md:-ml-0.5"></div>
			
			<!-- Work items -->
			<div class="space-y-12">
				{#each works as work, i}
					<div class="relative">
						<!-- Timeline dot -->
						<div class="absolute left-2 top-2 h-5 w-5 rounded-full border-4 border-white bg-black md:left-1/2 md:-ml-2.5">
							<div class="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></div>
						</div>
						
						<!-- Content -->
						<div class={`ml-12 md:ml-0 ${i % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2'}`}>
							<!-- Company and dates -->
							<div class="mb-2 flex flex-wrap items-center justify-between gap-2">
								<h3 class="text-xl font-bold tracking-wide">{work.company}</h3>
								<span class="text-sm text-gray-400">
									{work.startDate} - {work.endDate}
								</span>
							</div>
							
							<!-- Position -->
							<h4 class="mb-3 font-[Exo2] text-lg font-semibold text-gray-300">{work.position}</h4>
							
							<!-- Description -->
							<p class="mb-4 font-[Exo2] text-gray-300 leading-relaxed">{work.description}</p>
							
							<!-- Technologies -->
							<div class="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
								{#each work.technologies as tech}
									<span class="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-400">
										{tech}
									</span>
								{/each}
							</div>
							
							<!-- Action button -->
							<div class="flex justify-center md:justify-start">
								<Button size="sm" on:click={() => handleViewDetails(work)}>View Details</Button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Work Details Modal -->
	{#if showDetails && selectedWork}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg transition-opacity duration-300"
			class:opacity-0={!showDetails}
		>
			<div
				class="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-gray-800 bg-black/90 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 md:p-8"
				class:opacity-0={!showDetails}
				class:scale-95={!showDetails}
			>
				<!-- Close button -->
				<button
					class="absolute right-4 top-4 text-gray-400 hover:text-white"
					on:click={handleCloseDetails}
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				<div class="space-y-6">
					<!-- Header -->
					<div class="text-center">
						<h2 class="text-3xl font-bold tracking-wide">{selectedWork.company}</h2>
						<h3 class="font-[Exo2] text-xl font-semibold text-gray-300">{selectedWork.position}</h3>
						<p class="font-[Exo2] text-gray-400">
							{selectedWork.startDate} - {selectedWork.endDate}
						</p>
					</div>

					<!-- Description -->
					<div>
						<h4 class="mb-3 text-lg font-semibold tracking-wide">About the Role</h4>
						<p class="font-[Exo2] text-gray-300 leading-relaxed">{selectedWork.description}</p>
					</div>

					<!-- Technologies -->
					<div>
						<h4 class="mb-3 text-lg font-semibold tracking-wide">Technologies Used</h4>
						<div class="flex flex-wrap gap-2">
							{#each selectedWork.technologies as tech}
								<span class="rounded-full border border-gray-700 px-3 py-1 text-sm text-gray-300">
									{tech}
								</span>
							{/each}
						</div>
					</div>

					<!-- Achievements -->
					<div>
						<h4 class="mb-3 text-lg font-semibold tracking-wide">Key Achievements</h4>
						<ul class="ml-5 list-disc space-y-2 font-[Exo2] text-gray-300">
							{#each selectedWork.achievements as achievement}
								<li>{achievement}</li>
							{/each}
						</ul>
					</div>

					<!-- Learnings -->
					<div>
						<h4 class="mb-3 text-lg font-semibold tracking-wide">Key Learnings</h4>
						<ul class="ml-5 list-disc space-y-2 font-[Exo2] text-gray-300">
							{#each selectedWork.learnings as learning}
								<li>{learning}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<style>
		/* Ping animation for timeline dots */
		@keyframes ping {
			0% {
				transform: scale(1);
				opacity: 1;
			}
			75%, 100% {
				transform: scale(2);
				opacity: 0;
			}
		}
		
		.animate-ping {
			animation: ping 2s cubic-bezier(0,0,0.2,1) infinite;
		}
		
		/* Scrollbar styling */
		div::-webkit-scrollbar {
			width: 6px;
		}
		
		div::-webkit-scrollbar-track {
			background: rgba(0, 0, 0, 0.1);
		}
		
		div::-webkit-scrollbar-thumb {
			background: #4b5563;
			border-radius: 3px;
		}
		
		div::-webkit-scrollbar-thumb:hover {
			background: #6b7280;
		}
	</style>
</div>

<div
	class="relative mx-auto h-screen w-full overflow-hidden bg-black transition-opacity duration-500"
	class:opacity-0={!isLoaded}
>
	<!-- Deep space background with stars -->
	<div class="absolute inset-0 z-0">
		<div class="stars"></div>
		<div class="twinkling"></div>
	</div>

	<!-- Header -->
	<div class="relative z-10 py-8 text-center">
		<h1 class="mb-2 text-4xl font-bold text-white">My Works</h1>
		<p class="font-[Exo2] text-lg text-gray-300">
			Journey through my professional galaxy
		</p>
	</div>

	<!-- Solar System Visualization -->
	<div class="relative z-10 flex h-full w-full items-center justify-center">
		<!-- Central Planet (Work Hub) -->
		<div class="planet-container absolute z-20">
			<div class="relative">
				<!-- Planet glow -->
				<div class="absolute h-full w-full animate-pulse rounded-full bg-white/5 blur-2xl"></div>
				<!-- Planet core -->
				<div class="planet-core relative h-40 w-40 rounded-full border-2 border-white/20 bg-gradient-to-br from-gray-900 to-black">
					<div class="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
					<div class="flex h-full w-full items-center justify-center">
						<div class="text-center">
							<div class="text-xl font-bold text-white">WORK</div>
							<div class="font-[Exo2] text-sm text-gray-300">HUB</div>
						</div>
					</div>
				</div>
				<!-- Planet rings -->
				<div class="ring ring-1"></div>
				<div class="ring ring-2"></div>
			</div>
		</div>

		<!-- Orbiting Work Cards -->
		{#each works as work, i}
			<div
				class="orbit-{i+1} orbit absolute top-1/2 left-1/2 h-4 w-4"
				on:click={() => handleViewDetails(work)}
			>
				<div class="work-card absolute -ml-20 -mt-24 w-40 cursor-pointer rounded-lg border border-white/10 bg-black/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:shadow-xl">
					<div class="space-y-2">
						<h3 class="truncate text-sm font-bold text-white">{work.company}</h3>
						<p class="truncate text-xs font-[Exo2] text-gray-300">{work.position}</p>
						<div class="flex flex-wrap gap-1">
							{#each work.technologies.slice(0, 2) as tech}
								<span class="rounded-full bg-white/5 px-2 py-0.5 text-[8px] text-gray-300">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Work Details Modal -->
	{#if showDetails && selectedWork}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg transition-opacity duration-300"
			class:opacity-0={!showDetails}
		>
			<div
				class="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/10 bg-black/90 p-8 shadow-2xl backdrop-blur-md transition-all duration-300"
				class:opacity-0={!showDetails}
				class:scale-95={!showDetails}
			>
				<button
					class="absolute right-4 top-4 text-gray-400 hover:text-white"
					on:click={handleCloseDetails}
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				<div class="space-y-6">
					<div>
						<h2 class="text-3xl font-bold text-white">{selectedWork.company}</h2>
						<h3 class="font-[Exo2] text-xl font-semibold text-gray-300">{selectedWork.position}</h3>
						<p class="font-[Exo2] text-gray-400">
							{selectedWork.startDate} - {selectedWork.endDate}
						</p>
					</div>

					<div>
						<h4 class="mb-2 text-lg font-semibold text-white">About</h4>
						<p class="font-[Exo2] text-gray-300">{selectedWork.description}</p>
					</div>

					<div>
						<h4 class="mb-2 text-lg font-semibold text-white">Technologies</h4>
						<div class="flex flex-wrap gap-2">
							{#each selectedWork.technologies as tech}
								<span class="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300">
									{tech}
								</span>
							{/each}
						</div>
					</div>

					<div>
						<h4 class="mb-2 text-lg font-semibold text-white">Key Achievements</h4>
						<ul class="ml-5 list-disc space-y-1 font-[Exo2] text-gray-300">
							{#each selectedWork.achievements as achievement}
								<li>{achievement}</li>
							{/each}
						</ul>
					</div>

					<div>
						<h4 class="mb-2 text-lg font-semibold text-white">Learnings</h4>
						<ul class="ml-5 list-disc space-y-1 font-[Exo2] text-gray-300">
							{#each selectedWork.learnings as learning}
								<li>{learning}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<style>
		/* Deep space background */
		.stars {
			background: #000;
			background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
			height: 100%;
			width: 100%;
		}

		.twinkling {
			width: 100%;
			height: 100%;
			background: transparent url('/images/twinkling.png') repeat top center;
			animation: move-twink-back 200s linear infinite;
		}

		@keyframes move-twink-back {
			from {
				background-position: 0 0;
			}
			to {
				background-position: -10000px 5000px;
			}
		}

		/* Planet styling */
		.planet-container {
			transform: translate(-50%, -50%);
		}

		.planet-core {
			box-shadow: 0 0 60px rgba(255, 255, 255, 0.1);
		}

		.ring {
			position: absolute;
			top: 50%;
			left: 50%;
			border-radius: 50%;
			border: 1px solid rgba(255, 255, 255, 0.1);
			transform: translate(-50%, -50%) rotateX(75deg);
		}

		.ring-1 {
			width: 250px;
			height: 250px;
		}

		.ring-2 {
			width: 350px;
			height: 350px;
		}

		/* Orbit animations */
		.orbit {
			transform-style: preserve-3d;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}

		.orbit-1 {
			width: 300px;
			height: 300px;
			margin-left: -150px;
			margin-top: -150px;
			animation: orbit-1 25s infinite linear;
		}

		.orbit-2 {
			width: 450px;
			height: 450px;
			margin-left: -225px;
			margin-top: -225px;
			animation: orbit-2 35s infinite linear;
		}

		.orbit-3 {
			width: 600px;
			height: 600px;
			margin-left: -300px;
			margin-top: -300px;
			animation: orbit-3 45s infinite linear;
		}

		.orbit-4 {
			width: 750px;
			height: 750px;
			margin-left: -375px;
			margin-top: -375px;
			animation: orbit-4 55s infinite linear;
		}

		@keyframes orbit-1 {
			0% {
				transform: rotateZ(0deg);
			}
			100% {
				transform: rotateZ(360deg);
			}
		}

		@keyframes orbit-2 {
			0% {
				transform: rotateZ(90deg);
			}
			100% {
				transform: rotateZ(450deg);
			}
		}

		@keyframes orbit-3 {
			0% {
				transform: rotateZ(180deg);
			}
			100% {
				transform: rotateZ(540deg);
			}
		}

		@keyframes orbit-4 {
			0% {
				transform: rotateZ(270deg);
			}
			100% {
				transform: rotateZ(630deg);
			}
		}

		/* Work card hover effect */
		.work-card:hover {
			transform: scale(1.05) translateY(-5px);
		}
	</style>
</div>
