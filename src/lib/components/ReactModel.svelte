<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

	let containerElement: HTMLDivElement;

	onMount(() => {
		if (!containerElement) return;

		// Create scene, camera, renderer
		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(
			75,
			containerElement.clientWidth / containerElement.clientHeight,
			0.1,
			1000
		);
		camera.position.z = 5;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		containerElement.appendChild(renderer.domElement);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		// Add controls
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.autoRotate = true;

		// Add a placeholder sphere while loading
		const geometry = new THREE.SphereGeometry(1, 32, 32);
		const material = new THREE.MeshStandardMaterial({
			color: 0x61dafb, // React blue
			metalness: 0.5,
			roughness: 0.3
		});
		const sphere = new THREE.Mesh(geometry, material);
		scene.add(sphere);

		// Try all possible file paths for the model
		const possiblePaths = ['icons-3d/react.glb'];

		// Load model
		const loader = new GLTFLoader();

		// Try each path

		const tryLoadModel = (pathIndex = 0) => {
			if (pathIndex >= possiblePaths.length) {
				// All paths failed
				return;
			}

			const path = possiblePaths[pathIndex];
			console.log(`Attempting to load model from: ${path}`);

			loader.load(
				path,
				(gltf) => {
					// Success
					console.log(`Model successfully loaded from ${path}`);

					// Remove placeholder
					scene.remove(sphere);

					// Add model
					const model = gltf.scene;

					// Center and scale
					const box = new THREE.Box3().setFromObject(model);
					const center = box.getCenter(new THREE.Vector3());
					model.position.sub(center);

					const size = box.getSize(new THREE.Vector3());
					const maxDim = Math.max(size.x, size.y, size.z);
					const scaleFactor = 2 / maxDim;
					model.scale.set(scaleFactor, scaleFactor, scaleFactor);

					scene.add(model);
				},
				(progress) => {
					// Progress
					return progress;
				},
				(error) => {
					// Error - try next path
					console.warn(`Failed to load from ${path}:`, error);
					tryLoadModel(pathIndex + 1);
				}
			);
		};

		// Start trying paths
		tryLoadModel();

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		// Handle resize
		const handleResize = () => {
			if (!containerElement) return;

			camera.aspect = containerElement.clientWidth / containerElement.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
		};
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			if (renderer) renderer.dispose();
			if (controls) controls.dispose();
			containerElement.innerHTML = '';
		};
	});
</script>

<div class="model-container">
	<div bind:this={containerElement} class="renderer-container"></div>
</div>

<style>
	.model-container {
		width: 60px;
		height: 60px;
	}

	.renderer-container {
		width: 100%;
		height: 100%;
	}
</style>
