<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	// ============================================
	// CINEMATIC SPACE - Above the clouds
	// Black & white, atmospheric, epic scale
	// ============================================

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let animationId: number;
	let time = 0;
	let width = 0;
	let height = 0;

	// Parallax
	let mouseX = 0.5;
	let mouseY = 0.5;
	let targetMouseX = 0.5;
	let targetMouseY = 0.5;

	// Stars - sparse, subtle
	let stars: { x: number; y: number; size: number; brightness: number }[] = [];

	// Cloud noise seeds
	let cloudSeeds: number[] = [];

	// Terrain seeds for organic mountain shapes
	let terrainSeeds: number[] = [];

	// Milky way stars
	let milkyWayStars: { x: number; y: number; size: number; brightness: number }[] = [];


	function generateStars() {
		stars = [];
		// Very sparse stars - only in upper void, avoid globe area (upper right)
		for (let i = 0; i < 60; i++) {
			let x = Math.random();
			let y = Math.random() * 0.55;

			// Avoid the globe area (upper right quadrant)
			if (x > 0.55 && y < 0.45) {
				x = Math.random() * 0.5; // Push to left side
			}

			stars.push({
				x,
				y,
				size: 0.3 + Math.random() * 0.8,
				brightness: 0.1 + Math.random() * 0.3
			});
		}
	}

	function generateCloudSeeds() {
		cloudSeeds = [];
		for (let i = 0; i < 20; i++) {
			cloudSeeds.push(Math.random() * 1000);
		}
	}

	function generateTerrainSeeds() {
		terrainSeeds = [];
		for (let i = 0; i < 10; i++) {
			terrainSeeds.push(Math.random() * 1000);
		}
	}

	function generateMilkyWay() {
		milkyWayStars = [];
		// The milky way stretches diagonally across the upper portion
		// From upper left to middle right, avoiding the globe area
		for (let i = 0; i < 800; i++) {
			// Create a diagonal band
			const t = Math.random();
			const bandCenterX = 0.1 + t * 0.5; // Goes from 10% to 60% horizontally
			const bandCenterY = 0.05 + t * 0.35; // Goes from 5% to 40% vertically

			// Scatter around the band center with gaussian-like distribution
			const spreadX = (Math.random() - 0.5) * 0.15 + (Math.random() - 0.5) * 0.1;
			const spreadY = (Math.random() - 0.5) * 0.08 + (Math.random() - 0.5) * 0.05;

			const x = bandCenterX + spreadX;
			const y = bandCenterY + spreadY;

			// Skip if outside bounds or in globe area
			if (x < 0 || x > 0.7 || y < 0 || y > 0.5) continue;
			if (x > 0.5 && y < 0.4) continue; // Avoid globe area

			// Denser toward center of band
			const distFromCenter = Math.abs(spreadX) + Math.abs(spreadY);
			const densityFactor = Math.max(0, 1 - distFromCenter * 5);

			milkyWayStars.push({
				x,
				y,
				size: 0.2 + Math.random() * 0.5 * densityFactor,
				brightness: 0.05 + Math.random() * 0.2 * densityFactor
			});
		}
	}


	// Smooth noise function
	function noise(x: number, seed: number): number {
		const s = Math.sin(x * 0.5 + seed) * 0.5 +
		          Math.sin(x * 1.3 + seed * 1.7) * 0.25 +
		          Math.sin(x * 3.1 + seed * 2.3) * 0.125 +
		          Math.sin(x * 7.7 + seed * 3.1) * 0.0625;
		return s * 0.5 + 0.5;
	}

	// More jagged noise for mountains
	function terrainNoise(x: number, seed: number): number {
		const s = Math.sin(x * 2 + seed) * 0.4 +
		          Math.sin(x * 5 + seed * 1.3) * 0.3 +
		          Math.sin(x * 11 + seed * 2.1) * 0.2 +
		          Math.sin(x * 23 + seed * 3.7) * 0.1;
		return s * 0.5 + 0.5;
	}

	// ============================================
	// DRAWING FUNCTIONS
	// ============================================

	function drawBackground() {
		if (!ctx) return;

		// Deep space gradient
		const gradient = ctx.createLinearGradient(0, 0, 0, height);
		gradient.addColorStop(0, '#000000');
		gradient.addColorStop(0.35, '#030305');
		gradient.addColorStop(0.55, '#070709');
		gradient.addColorStop(1, '#0c0c0f');

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, width, height);
	}

	function drawLightSource() {
		if (!ctx) return;

		// Light source behind/beside the globe (upper right)
		// Globe is at 72% left, 28% top - light source slightly offset
		const lx = width * 0.78;
		const ly = height * 0.22;
		const radius = Math.min(width, height) * 0.4;

		// Large soft glow
		const gradient = ctx.createRadialGradient(lx, ly, 0, lx, ly, radius);
		gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
		gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.04)');
		gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(lx, ly, radius, 0, Math.PI * 2);
		ctx.fill();

		// Secondary smaller, brighter core
		const coreGradient = ctx.createRadialGradient(lx, ly, 0, lx, ly, radius * 0.3);
		coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
		coreGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
		coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.fillStyle = coreGradient;
		ctx.beginPath();
		ctx.arc(lx, ly, radius * 0.3, 0, Math.PI * 2);
		ctx.fill();
	}

	function drawMilkyWay() {
		if (!ctx) return;

		const px = (mouseX - 0.5) * 0.003 * width;
		const py = (mouseY - 0.5) * 0.003 * height;

		// First draw a subtle nebulous glow along the band
		ctx.save();
		ctx.globalAlpha = 0.03;

		// Create elongated glow patches along the milky way
		const glowPoints = [
			{ x: 0.15, y: 0.12, rx: 80, ry: 40 },
			{ x: 0.28, y: 0.18, rx: 100, ry: 50 },
			{ x: 0.4, y: 0.25, rx: 90, ry: 45 },
			{ x: 0.52, y: 0.32, rx: 70, ry: 35 },
		];

		glowPoints.forEach(glow => {
			const gx = glow.x * width + px;
			const gy = glow.y * height + py;

			const gradient = ctx!.createRadialGradient(gx, gy, 0, gx, gy, Math.max(glow.rx, glow.ry));
			gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
			gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
			gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

			ctx!.fillStyle = gradient;
			ctx!.beginPath();
			ctx!.ellipse(gx, gy, glow.rx, glow.ry, -0.5, 0, Math.PI * 2);
			ctx!.fill();
		});

		ctx.restore();

		// Draw the dense star field
		milkyWayStars.forEach(star => {
			const x = star.x * width + px;
			const y = star.y * height + py;

			// Very subtle twinkle
			const twinkle = 0.8 + Math.sin(time * 0.001 + star.x * 200 + star.y * 200) * 0.2;
			const alpha = star.brightness * twinkle;

			ctx!.beginPath();
			ctx!.arc(x, y, star.size, 0, Math.PI * 2);
			ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
			ctx!.fill();
		});
	}

	function drawEllipticalGalaxy(
		cx: number,
		cy: number,
		size: number,
		stretch: number,
		rotation: number,
		brightness: number
	) {
		if (!ctx) return;

		ctx.save();
		ctx.translate(cx, cy);
		ctx.rotate(rotation);

		// Soft fuzzy ellipse - just a gentle glow
		const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
		gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * 0.12})`);
		gradient.addColorStop(0.2, `rgba(255, 255, 255, ${brightness * 0.06})`);
		gradient.addColorStop(0.5, `rgba(255, 255, 255, ${brightness * 0.02})`);
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.ellipse(0, 0, size, size * stretch, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore();
	}

	function drawEdgeOnGalaxy(
		cx: number,
		cy: number,
		length: number,
		rotation: number,
		brightness: number
	) {
		if (!ctx) return;

		ctx.save();
		ctx.translate(cx, cy);
		ctx.rotate(rotation);

		// Thin disk seen from the side
		const thickness = length * 0.08;

		// Central bulge
		const bulgeGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, thickness * 2);
		bulgeGradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * 0.15})`);
		bulgeGradient.addColorStop(0.5, `rgba(255, 255, 255, ${brightness * 0.05})`);
		bulgeGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
		ctx.fillStyle = bulgeGradient;
		ctx.beginPath();
		ctx.ellipse(0, 0, thickness * 2, thickness * 1.5, 0, 0, Math.PI * 2);
		ctx.fill();

		// Disk line
		const diskGradient = ctx.createLinearGradient(-length / 2, 0, length / 2, 0);
		diskGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
		diskGradient.addColorStop(0.2, `rgba(255, 255, 255, ${brightness * 0.04})`);
		diskGradient.addColorStop(0.5, `rgba(255, 255, 255, ${brightness * 0.08})`);
		diskGradient.addColorStop(0.8, `rgba(255, 255, 255, ${brightness * 0.04})`);
		diskGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.fillStyle = diskGradient;
		ctx.beginPath();
		ctx.ellipse(0, 0, length / 2, thickness, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore();
	}

	function drawDistantGalaxies() {
		if (!ctx) return;

		const px = (mouseX - 0.5) * 0.002 * width;
		const py = (mouseY - 0.5) * 0.002 * height;

		// Elliptical galaxy - soft fuzzy blob, upper left
		drawEllipticalGalaxy(
			width * 0.12 + px,
			height * 0.25 + py,
			35,
			0.6, // slightly oval
			0.3,
			0.4
		);

		// Edge-on galaxy - thin line with bulge, different area
		drawEdgeOnGalaxy(
			width * 0.06 + px * 0.7,
			height * 0.42 + py * 0.7,
			50,
			-0.2,
			0.35
		);

		// Tiny distant elliptical - barely visible
		drawEllipticalGalaxy(
			width * 0.35 + px * 0.5,
			height * 0.1 + py * 0.5,
			15,
			0.8,
			0.8,
			0.25
		);

		// Another small one near horizon
		drawEllipticalGalaxy(
			width * 0.55 + px * 0.3,
			height * 0.35 + py * 0.3,
			12,
			0.5,
			-0.4,
			0.2
		);
	}

	function drawLensFlare() {
		if (!ctx) return;

		// Lens flare from the light source behind the globe
		// Long streaks that communicate "this is a STAR, not a lamp"

		const sourceX = width * 0.78;
		const sourceY = height * 0.22;

		// Anamorphic flare streaks (horizontal dominant, like cinema)
		const flareLength = width * 0.6;
		const pulse = 0.9 + Math.sin(time * 0.001) * 0.1;

		ctx.save();

		// Main horizontal streak
		const hGradient = ctx.createLinearGradient(
			sourceX - flareLength, sourceY,
			sourceX + flareLength * 0.3, sourceY
		);
		hGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
		hGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.015 * pulse})`);
		hGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.04 * pulse})`);
		hGradient.addColorStop(0.7, `rgba(255, 255, 255, ${0.015 * pulse})`);
		hGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.strokeStyle = hGradient;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(sourceX - flareLength, sourceY);
		ctx.lineTo(sourceX + flareLength * 0.3, sourceY);
		ctx.stroke();

		// Thinner bright core streak
		ctx.lineWidth = 1;
		ctx.globalAlpha = 0.5 * pulse;
		ctx.beginPath();
		ctx.moveTo(sourceX - flareLength * 0.7, sourceY);
		ctx.lineTo(sourceX + flareLength * 0.2, sourceY);
		ctx.stroke();

		// Diagonal streak (top-left to bottom-right through source)
		ctx.globalAlpha = 1;
		const diagLength = width * 0.3;
		const dGradient = ctx.createLinearGradient(
			sourceX - diagLength * 0.7, sourceY - diagLength * 0.4,
			sourceX + diagLength * 0.3, sourceY + diagLength * 0.15
		);
		dGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
		dGradient.addColorStop(0.4, `rgba(255, 255, 255, ${0.02 * pulse})`);
		dGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.035 * pulse})`);
		dGradient.addColorStop(0.6, `rgba(255, 255, 255, ${0.02 * pulse})`);
		dGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.strokeStyle = dGradient;
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(sourceX - diagLength * 0.7, sourceY - diagLength * 0.4);
		ctx.lineTo(sourceX + diagLength * 0.3, sourceY + diagLength * 0.15);
		ctx.stroke();

		// Small flare artifacts (hexagonal ghosts - subtle)
		const artifacts = [
			{ dist: -0.25, size: 15, opacity: 0.015 },
			{ dist: -0.4, size: 25, opacity: 0.01 },
			{ dist: -0.55, size: 12, opacity: 0.012 },
		];

		artifacts.forEach(art => {
			const ax = sourceX + (width * 0.5 - sourceX) * art.dist;
			const ay = sourceY + (height * 0.5 - sourceY) * art.dist;

			const artGradient = ctx!.createRadialGradient(ax, ay, 0, ax, ay, art.size);
			artGradient.addColorStop(0, `rgba(255, 255, 255, ${art.opacity * pulse})`);
			artGradient.addColorStop(0.5, `rgba(255, 255, 255, ${art.opacity * 0.5 * pulse})`);
			artGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

			ctx!.fillStyle = artGradient;
			ctx!.beginPath();
			ctx!.arc(ax, ay, art.size, 0, Math.PI * 2);
			ctx!.fill();
		});

		ctx.restore();
	}

	function drawDistantMoon() {
		if (!ctx) return;

		// A small moon far away - shows scale through size comparison
		// Big enough to clearly read as a moon, small enough to feel distant
		const px = (mouseX - 0.5) * 0.005 * width;
		const py = (mouseY - 0.5) * 0.005 * height;

		const x = width * 0.38 + px;
		const y = height * 0.12 + py;
		const radius = 8; // Small but recognizable

		ctx.save();

		// Atmospheric glow
		const glow = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius * 3);
		glow.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
		glow.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
		glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
		ctx.fillStyle = glow;
		ctx.beginPath();
		ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
		ctx.fill();

		// Dark body
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fillStyle = '#08080a';
		ctx.fill();

		// Lit crescent - same lighting direction as main globe
		ctx.save();
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.clip();

		const crescentGradient = ctx.createRadialGradient(
			x - radius * 1.5, y - radius * 0.8, 0,
			x, y, radius * 2.5
		);
		crescentGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
		crescentGradient.addColorStop(0.2, 'rgba(220, 220, 225, 0.6)');
		crescentGradient.addColorStop(0.4, 'rgba(150, 150, 160, 0.25)');
		crescentGradient.addColorStop(0.6, 'rgba(80, 80, 90, 0.08)');
		crescentGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

		ctx.fillStyle = crescentGradient;
		ctx.fillRect(x - radius * 2, y - radius * 2, radius * 4, radius * 4);
		ctx.restore();

		// Subtle rim
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
		ctx.lineWidth = 0.5;
		ctx.stroke();

		ctx.restore();
	}

	function drawStars() {
		if (!ctx) return;

		const px = (mouseX - 0.5) * 0.008 * width;
		const py = (mouseY - 0.5) * 0.008 * height;

		stars.forEach(star => {
			const x = star.x * width + px;
			const y = star.y * height + py;

			// Subtle twinkle
			const twinkle = 0.7 + Math.sin(time * 0.0008 + star.x * 100) * 0.3;
			const alpha = star.brightness * twinkle;

			// Soft glow for larger stars
			if (star.size > 0.6) {
				const glowGradient = ctx!.createRadialGradient(x, y, 0, x, y, star.size * 3);
				glowGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.25})`);
				glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
				ctx!.fillStyle = glowGradient;
				ctx!.beginPath();
				ctx!.arc(x, y, star.size * 3, 0, Math.PI * 2);
				ctx!.fill();
			}

			ctx!.beginPath();
			ctx!.arc(x, y, star.size, 0, Math.PI * 2);
			ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
			ctx!.fill();
		});
	}

	function drawBrightStar() {
		if (!ctx) return;

		const px = (mouseX - 0.5) * 0.015 * width;
		const py = (mouseY - 0.5) * 0.015 * height;

		// Position on left side to balance globe on right
		const x = width * 0.15 + px;
		const y = height * 0.35 + py;

		// Pulse animation
		const pulse = 0.85 + Math.sin(time * 0.0015) * 0.15;
		const size = 2.5 * pulse;

		// Large outer glow
		const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, 60 * pulse);
		outerGlow.addColorStop(0, `rgba(255, 255, 255, ${0.15 * pulse})`);
		outerGlow.addColorStop(0.3, `rgba(255, 255, 255, ${0.05 * pulse})`);
		outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
		ctx.fillStyle = outerGlow;
		ctx.beginPath();
		ctx.arc(x, y, 60 * pulse, 0, Math.PI * 2);
		ctx.fill();

		// Medium glow
		const midGlow = ctx.createRadialGradient(x, y, 0, x, y, 25 * pulse);
		midGlow.addColorStop(0, `rgba(255, 255, 255, ${0.3 * pulse})`);
		midGlow.addColorStop(0.5, `rgba(255, 255, 255, ${0.1 * pulse})`);
		midGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
		ctx.fillStyle = midGlow;
		ctx.beginPath();
		ctx.arc(x, y, 25 * pulse, 0, Math.PI * 2);
		ctx.fill();

		// Cross flare - 4 pointed
		ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * pulse})`;
		ctx.lineWidth = 1;
		ctx.lineCap = 'round';

		// Horizontal flare
		const flareLength = 35 * pulse;
		const gradient1 = ctx.createLinearGradient(x - flareLength, y, x + flareLength, y);
		gradient1.addColorStop(0, 'rgba(255, 255, 255, 0)');
		gradient1.addColorStop(0.4, `rgba(255, 255, 255, ${0.2 * pulse})`);
		gradient1.addColorStop(0.5, `rgba(255, 255, 255, ${0.5 * pulse})`);
		gradient1.addColorStop(0.6, `rgba(255, 255, 255, ${0.2 * pulse})`);
		gradient1.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.strokeStyle = gradient1;
		ctx.beginPath();
		ctx.moveTo(x - flareLength, y);
		ctx.lineTo(x + flareLength, y);
		ctx.stroke();

		// Vertical flare
		const gradient2 = ctx.createLinearGradient(x, y - flareLength, x, y + flareLength);
		gradient2.addColorStop(0, 'rgba(255, 255, 255, 0)');
		gradient2.addColorStop(0.4, `rgba(255, 255, 255, ${0.2 * pulse})`);
		gradient2.addColorStop(0.5, `rgba(255, 255, 255, ${0.5 * pulse})`);
		gradient2.addColorStop(0.6, `rgba(255, 255, 255, ${0.2 * pulse})`);
		gradient2.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.strokeStyle = gradient2;
		ctx.beginPath();
		ctx.moveTo(x, y - flareLength);
		ctx.lineTo(x, y + flareLength);
		ctx.stroke();

		// Bright core
		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * pulse})`;
		ctx.fill();
	}

	function drawHorizonGlow() {
		if (!ctx) return;

		const horizonY = height * 0.58;

		// Main horizon glow band
		const glowHeight = height * 0.12;
		const horizonGradient = ctx.createLinearGradient(0, horizonY - glowHeight, 0, horizonY + glowHeight);
		horizonGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
		horizonGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
		horizonGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
		horizonGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.02)');
		horizonGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.fillStyle = horizonGradient;
		ctx.fillRect(0, horizonY - glowHeight, width, glowHeight * 2);

		// Subtle warm tint at the very horizon (atmospheric scattering)
		const warmGlow = ctx.createLinearGradient(0, horizonY - 20, 0, horizonY + 30);
		warmGlow.addColorStop(0, 'rgba(255, 250, 245, 0)');
		warmGlow.addColorStop(0.5, 'rgba(255, 250, 245, 0.015)');
		warmGlow.addColorStop(1, 'rgba(255, 250, 245, 0)');

		ctx.fillStyle = warmGlow;
		ctx.fillRect(0, horizonY - 20, width, 50);
	}

	function drawTerrainSilhouette() {
		if (!ctx) return;

		const px = (mouseX - 0.5) * 0.02 * width;
		const horizonY = height * 0.6;

		// Multiple terrain layers for depth
		const layers = [
			{ y: horizonY - 15, opacity: 0.15, scale: 0.8, height: 40, parallax: 0.3 },  // Furthest - faint
			{ y: horizonY - 5, opacity: 0.25, scale: 1.2, height: 55, parallax: 0.5 },   // Mid
			{ y: horizonY + 5, opacity: 0.4, scale: 1.5, height: 70, parallax: 0.7 },    // Closer
		];

		layers.forEach((layer, layerIndex) => {
			const layerPx = px * layer.parallax;
			const seed = terrainSeeds[layerIndex] || layerIndex * 100;

			ctx!.beginPath();
			ctx!.moveTo(-10, height);

			// Generate mountain ridge
			for (let x = -10; x <= width + 10; x += 3) {
				const worldX = (x - layerPx) / width;
				const n = terrainNoise(worldX * 8 * layer.scale, seed);
				const peakHeight = layer.height * n;
				const y = layer.y - peakHeight;

				if (x === -10) {
					ctx!.moveTo(x, y);
				} else {
					ctx!.lineTo(x, y);
				}
			}

			// Close the path
			ctx!.lineTo(width + 10, height);
			ctx!.lineTo(-10, height);
			ctx!.closePath();

			// Fill with gradient for atmospheric perspective
			const gradient = ctx!.createLinearGradient(0, layer.y - layer.height, 0, layer.y + 20);
			gradient.addColorStop(0, `rgba(20, 20, 25, ${layer.opacity})`);
			gradient.addColorStop(1, `rgba(15, 15, 18, ${layer.opacity * 0.7})`);

			ctx!.fillStyle = gradient;
			ctx!.fill();
		});
	}

	function drawClouds() {
		if (!ctx) return;

		const cloudBaseY = height * 0.64;
		const cloudHeight = height * 0.42;

		const px = (mouseX - 0.5) * 0.03 * width;
		const slowTime = time * 0.00002;

		// Cloud layers
		const layers = [
			{ y: 0.0, opacity: 0.025, scale: 0.3, speed: 0.2 },
			{ y: 0.12, opacity: 0.04, scale: 0.5, speed: 0.35 },
			{ y: 0.25, opacity: 0.06, scale: 0.7, speed: 0.5 },
			{ y: 0.4, opacity: 0.09, scale: 0.9, speed: 0.7 },
			{ y: 0.55, opacity: 0.12, scale: 1.1, speed: 0.85 },
			{ y: 0.7, opacity: 0.15, scale: 1.3, speed: 1.0 },
		];

		layers.forEach((layer, layerIndex) => {
			const layerY = cloudBaseY + layer.y * cloudHeight;
			const parallaxOffset = px * (1 - layer.y * 0.8);

			for (let x = -50; x < width + 50; x += 2) {
				const worldX = (x - parallaxOffset) / width;
				const noiseVal = noise(worldX * 6 * layer.scale + slowTime * layer.speed, cloudSeeds[layerIndex] || 0);
				const noiseVal2 = noise(worldX * 12 * layer.scale + slowTime * layer.speed * 1.2, cloudSeeds[layerIndex + 6] || 50);

				const cloudY = layerY + (noiseVal - 0.5) * cloudHeight * 0.35 * layer.scale;
				const cloudThickness = (noiseVal2 * 0.5 + 0.5) * cloudHeight * 0.25 * layer.scale;

				const colGradient = ctx!.createLinearGradient(x, cloudY - cloudThickness, x, cloudY + cloudThickness * 1.8);

				const brightness = layer.opacity * (0.7 + noiseVal * 0.5);
				colGradient.addColorStop(0, `rgba(255, 255, 255, ${brightness})`);
				colGradient.addColorStop(0.25, `rgba(220, 220, 225, ${brightness * 0.65})`);
				colGradient.addColorStop(0.5, `rgba(140, 140, 150, ${brightness * 0.35})`);
				colGradient.addColorStop(0.75, `rgba(60, 60, 70, ${brightness * 0.15})`);
				colGradient.addColorStop(1, 'rgba(20, 20, 25, 0)');

				ctx!.fillStyle = colGradient;
				ctx!.fillRect(x, cloudY - cloudThickness, 3, cloudThickness * 2.8);
			}
		});

		// Bottom fade to deep black
		const bottomFade = ctx.createLinearGradient(0, height * 0.88, 0, height);
		bottomFade.addColorStop(0, 'rgba(0, 0, 0, 0)');
		bottomFade.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
		bottomFade.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
		ctx.fillStyle = bottomFade;
		ctx.fillRect(0, height * 0.88, width, height * 0.12);
	}

	// ============================================
	// ANIMATION LOOP
	// ============================================

	function animate() {
		if (!ctx || !canvas) return;

		time = performance.now();

		// Smooth parallax
		mouseX += (targetMouseX - mouseX) * 0.02;
		mouseY += (targetMouseY - mouseY) * 0.02;

		// Draw layers back to front
		drawBackground();
		drawDistantGalaxies();
		drawLightSource();
		drawLensFlare();
		drawMilkyWay();
		drawDistantMoon();
		drawStars();
		drawBrightStar();
		drawHorizonGlow();
		drawTerrainSilhouette();
		drawClouds();

		animationId = requestAnimationFrame(animate);
	}

	// ============================================
	// EVENT HANDLERS
	// ============================================

	function handleResize() {
		if (!canvas) return;
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;
	}

	function handleMouseMove(e: MouseEvent) {
		targetMouseX = e.clientX / window.innerWidth;
		targetMouseY = e.clientY / window.innerHeight;
	}

	// ============================================
	// LIFECYCLE
	// ============================================

	onMount(() => {
		if (!browser) return;

		ctx = canvas.getContext('2d');
		handleResize();

		generateStars();
		generateCloudSeeds();
		generateTerrainSeeds();
		generateMilkyWay();

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);

		animate();

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			if (animationId) cancelAnimationFrame(animationId);
		};
	});

	onDestroy(() => {
		if (animationId) cancelAnimationFrame(animationId);
	});
</script>

<canvas bind:this={canvas} class="cosmic-void"></canvas>

<style>
	.cosmic-void {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		pointer-events: none;
		background: #000000;
	}
</style>
