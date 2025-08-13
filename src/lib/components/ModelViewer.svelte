<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

	// Props
	export let modelPath: string = '/icons-3d/react.glb';
	export let backgroundColor: string = 'transparent';
	export let autoRotate: boolean = true;
	export let width: number = 50;
	export let height: number = 50;

	// Event dispatcher
	const dispatch = createEventDispatcher();

	// Event handlers
	function handleMouseEnter(event: MouseEvent) {
		dispatch('mouseenter', event);
	}

	function handleMouseLeave(event: MouseEvent) {
		dispatch('mouseleave', event);
	}

	// Internal state
	let containerElement: HTMLDivElement;

	onMount(() => {
		if (!containerElement) return;

		// Create scene, camera, renderer
		const scene = new THREE.Scene();

		// Handle background color
		if (backgroundColor === 'transparent') {
			scene.background = null;
		} else {
			scene.background = new THREE.Color(backgroundColor);
		}

		// Set up camera
		const camera = new THREE.PerspectiveCamera(
			75,
			containerElement.clientWidth / containerElement.clientHeight,
			0.1,
			1000
		);
		camera.position.z = 10;

		// Set up renderer
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: backgroundColor === 'transparent'
		});
		renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		if (backgroundColor === 'transparent') {
			renderer.setClearColor(0x000000, 0);
		}

		containerElement.appendChild(renderer.domElement);

		// Add lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		// Add back light
		const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
		backLight.position.set(-5, -5, -5);
		scene.add(backLight);

		// Add controls
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.25;
		controls.enablePan = false;
		controls.autoRotate = autoRotate;
		controls.autoRotateSpeed = 3.0;

		// Add a placeholder sphere while loading
		const geometry = new THREE.SphereGeometry(1, 32, 32);
		const material = new THREE.MeshStandardMaterial({
			color: 0x61dafb, // Default placeholder color
			metalness: 0.5,
			roughness: 0.3
		});
		const sphere = new THREE.Mesh(geometry, material);
		scene.add(sphere);

		// Load model - Simplified Path Logic
		const loader = new GLTFLoader();
		const path = modelPath; // Use the prop directly

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

				// Enable shadows
				model.traverse((node) => {
					if (node instanceof THREE.Mesh) {
						node.castShadow = true;
						node.receiveShadow = true;
					}
				});

				// Center and scale (with Z-axis stretching)
				const box = new THREE.Box3().setFromObject(model);
				const center = box.getCenter(new THREE.Vector3());
				model.position.sub(center); // Center the model

				const size = box.getSize(new THREE.Vector3());
				const maxDim = Math.max(size.x, size.y, size.z); // Find the largest dimension
				const baseScaleFactor = 4 / maxDim; // Keep the overall size similar to before

				// Apply non-uniform scaling for thickness
				const thicknessMultiplier = 3; // <-- Increase this value to make it 'thicker' (more stretched in Z)
				model.scale.set(
					baseScaleFactor,
					baseScaleFactor,
					baseScaleFactor * thicknessMultiplier // Scale Z more
				);

				scene.add(model);
			},
			(progress) => {
				// Progress
				if (progress.total > 0) {
					const percent = ((progress.loaded / progress.total) * 100).toFixed(2);
					console.log(`Loading: ${percent}%`);
				}
			},
			(error) => {
				// Error
				console.error(`Failed to load from ${path}:`, error);
				// Keep showing the placeholder sphere on error
			}
		);

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

<div
	bind:this={containerElement}
	class="renderer-container"
	style={`width: ${width}px; height: ${height}px;`}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	role="img"
	aria-label="3D Model"
></div>

<style>
	.renderer-container {
		overflow: hidden;
		margin: 0;
		padding: 0;
		position: relative;
		cursor: pointer;
	}
</style>
