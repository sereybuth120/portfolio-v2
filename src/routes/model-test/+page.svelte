<script lang="ts">
	import ModelViewer from '$lib/components/ModelViewer.svelte';
</script>

<div class="container">
	<h1>3D Model Integration Testing</h1>

	<section>
		<h2>Standalone Model Viewer</h2>
		<p>Testing the ModelViewer component with various 3D models:</p>

		<div class="models-grid">
			<div class="model-wrapper">
				<ModelViewer modelPath="/icons-3d/react.glb" />
			</div>

			<div class="model-wrapper">
				<ModelViewer modelPath="/icons-3d/svelte.glb" />
			</div>

			<div class="model-wrapper">
				<ModelViewer modelPath="/icons-3d/svelte.glb" />
				/>
			</div>
		</div>
	</section>

	<section>
		<h2>OrbitalTech Component</h2>
		<p>The original OrbitalTech component (unmodified):</p>

		<div class="orbital-container">
			<!-- <OrbitalTech /> -->
		</div>
	</section>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}
	.model-wrapper {
		height: 200px;
		width: 100%;
	}
	h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		color: #333;
		text-align: center;
	}

	h2 {
		font-size: 1.8rem;
		margin: 2rem 0 1rem;
		color: #2563eb;
		border-bottom: 2px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	section {
		margin-bottom: 3rem;
	}

	.models-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.orbital-container {
		height: 600px;
		width: 100%;
		background-color: #111827;
		border-radius: 8px;
		margin-top: 1.5rem;
		overflow: hidden;
	}
</style>
