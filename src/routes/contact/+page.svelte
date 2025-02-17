<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	function handleSubmit() {
		console.log('Form submitted:', formData);
		// Add your form submission logic here
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-4xl font-bold">Contact Me</h1>

	<div class="grid gap-8 lg:grid-cols-2">
		<Card>
			<h2 class="mb-6 text-2xl font-semibold">Get in Touch</h2>
			<form on:submit|preventDefault={handleSubmit} class="space-y-4">
				<div>
					<label for="name" class="mb-1 block text-sm font-medium text-gray-700">Name</label>
					<input
						type="text"
						id="name"
						bind:value={formData.name}
						class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						required
					/>
				</div>

				<div>
					<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						id="email"
						bind:value={formData.email}
						class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						required
					/>
				</div>

				<div>
					<label for="subject" class="mb-1 block text-sm font-medium text-gray-700">Subject</label>
					<input
						type="text"
						id="subject"
						bind:value={formData.subject}
						class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						required
					/>
				</div>

				<div>
					<label for="message" class="mb-1 block text-sm font-medium text-gray-700">Message</label>
					<textarea
						id="message"
						bind:value={formData.message}
						rows="4"
						class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						required
					></textarea>
				</div>

				<Button variant="primary" type="submit">Send Message</Button>
			</form>
		</Card>

		<Card>
			<h2 class="mb-6 text-2xl font-semibold">Contact Information</h2>
			<div class="space-y-4">
				<div class="flex items-start gap-4">
					<div
						class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="font-medium">Email</h3>
						<p class="text-gray-600">your.email@example.com</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div
						class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="font-medium">Location</h3>
						<p class="text-gray-600">City, Country</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div
						class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="font-medium">Social Media</h3>
						<div class="mt-1 space-y-1">
							<a href="https://linkedin.com" class="block text-blue-600 hover:underline">LinkedIn</a
							>
							<a href="https://github.com" class="block text-blue-600 hover:underline">GitHub</a>
							<a href="https://twitter.com" class="block text-blue-600 hover:underline">Twitter</a>
						</div>
					</div>
				</div>
			</div>
		</Card>
	</div>
</div>
