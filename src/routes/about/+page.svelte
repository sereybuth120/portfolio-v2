<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-4xl font-bold">About Me</h1>
	
	<Card padding="large">
		<div class="space-y-4">
			<h2 class="text-2xl font-semibold">Welcome to my portfolio!</h2>
			<p class="text-gray-600">
				I'm a passionate developer who loves creating beautiful and functional web applications.
			</p>
			<div class="flex gap-4">
				<Button variant="primary">Contact Me</Button>
				<Button variant="outline">View Projects</Button>
			</div>
		</div>
	</Card>
</div> 