import { debounce } from 'throttle-debounce';
import { clonesFromTo } from './utils/clones-from-to';

// Map to store all marquee instances and their data.
const marqueeMap = new Map();

// Initialize all marquees.
document.querySelectorAll('.marquee').forEach((marquee) => {
	const settings = {
		speed: parseFloat(marquee.dataset.speed) || 0.5,
		startDuration: parseFloat(marquee.dataset.startDuration) || 1000,
		hoverSpeed: parseFloat(marquee.dataset.hoverSpeed) || 0.2,
		hoverDuration: parseFloat(marquee.dataset.hoverDuration) || 600,
		direction: marquee.dataset.direction || 'left',
	};

	const inner = marquee.querySelector('.marquee-inner');
	const originalChildren = Array.from(
		inner.querySelectorAll(':scope > *:not([aria-hidden="true"])'),
	);

	// Clone child elements.
	const cloneCount = Math.max(
		1,
		Math.ceil(marquee.offsetWidth / inner.offsetWidth),
	);
	clonesFromTo(originalChildren, inner, cloneCount);

	// Calculate content width.
	const gap = parseFloat(getComputedStyle(inner).gap) || 0;
	const contentWidth = (inner.offsetWidth + gap) / (cloneCount + 1);

	// Store marquee data.
	marqueeMap.set(marquee, {
		inner,
		settings,
		contentWidth,
		originalChildren,
		move: 0,
		hoverState: 0,
		isHovered: false,
		hoverStartTime: null,
		hoverEndTime: null,
		startTime: performance.now(),
		cloneCount,
		gap,
	});

	// Set up hover events.
	marquee.addEventListener('mouseenter', () => {
		const data = marqueeMap.get(marquee);
		data.isHovered = true;
		data.hoverStartTime = performance.now();
		data.hoverEndTime = null;
	});

	marquee.addEventListener('mouseleave', () => {
		const data = marqueeMap.get(marquee);
		data.isHovered = false;
		data.hoverEndTime = performance.now();
		data.hoverStartTime = null;
	});
});

// Handle window resize.
window.addEventListener(
	'resize',
	debounce(300, () => {
		marqueeMap.forEach((data, marquee) => {
			const newCloneCount =
				Math.max(1, Math.ceil(marquee.offsetWidth / data.contentWidth)) -
				data.cloneCount;

			// Add more clones if needed.
			if (newCloneCount > 0) {
				clonesFromTo(data.originalChildren, data.inner, newCloneCount);
				data.cloneCount += newCloneCount;
				data.contentWidth =
					(data.inner.offsetWidth + data.gap) / (data.cloneCount + 1);
			}
		});
	}),
);

// Animation loop.
function animate(timestamp) {
	marqueeMap.forEach((data, marquee) => {
		// Calculate elapsed time for start animation.
		const elapsed = timestamp - data.startTime;
		const startProgress = Math.min(elapsed / data.settings.startDuration, 1);

		// Calculate base speed with smooth start.
		const baseSpeed =
			startProgress >= 1
				? data.settings.speed
				: data.settings.speed * (startProgress * (2 - startProgress)); // easeOutQuad.

		// Handle hover state transitions.
		if (data.isHovered && data.hoverStartTime) {
			const hoverProgress = Math.min(
				(timestamp - data.hoverStartTime) / data.settings.hoverDuration,
				1,
			);
			// Smooth transition to hover state.
			const t =
				hoverProgress < 0.5
					? 2 * hoverProgress * hoverProgress
					: 1 - Math.pow(-2 * hoverProgress + 2, 2) / 2;
			data.hoverState = data.hoverState + (1 - data.hoverState) * t;
		} else if (!data.isHovered && data.hoverEndTime) {
			const hoverProgress = Math.min(
				(timestamp - data.hoverEndTime) / data.settings.hoverDuration,
				1,
			);
			// Smooth transition back from hover state.
			const t =
				hoverProgress < 0.5
					? 2 * hoverProgress * hoverProgress
					: 1 - Math.pow(-2 * hoverProgress + 2, 2) / 2;
			data.hoverState = data.hoverState * (1 - t);
		}

		// Calculate final speed.
		const speed =
			baseSpeed -
			(baseSpeed - baseSpeed * data.settings.hoverSpeed) * data.hoverState;

		// Update position.
		data.move += speed;
		if (data.move >= data.contentWidth) {
			data.move = 0;
		}

		// Apply transform.
		const direction = data.settings.direction === 'left' ? -1 : 1;
		data.inner.style.transform = `translateX(${data.move * direction}px)`;
	});

	requestAnimationFrame(animate);
}

// Start animation if there are marquees.
if (marqueeMap.size > 0) {
	requestAnimationFrame(animate);
}
