const { on } = window.ivent;
const { getComputedStyle } = window;

const selectorLinks = '.popup-content > .navigation > ul > li > .nav-link';

// Get visible links.
// Tracks the navigation display due to being shown on a mobile screen.
function getVisibleLinks(popupEl) {
	return Array.from(popupEl.querySelectorAll(selectorLinks)).filter(
		(link) => getComputedStyle(link.closest('.navigation')).display !== 'none',
	);
}

let links = getVisibleLinks(document.querySelector('.popup-navigation'));
let init = false;
let index = 0;

on(document, 'pvs.popup.show', ({ data, relatedTarget: popup }) => {
	if (data.id !== 'popup-navigation') {
		return;
	}

	// Fix scroll top when show announcement-bar.
	const scrollTop =
		document.querySelector('.gh-announcement-bar')?.getBoundingClientRect()
			.height || 0;

	window.scrollTo({ top: scrollTop, behavior: 'smooth' });

	// Add variable index for links and footer.
	const newLinks = getVisibleLinks(popup);

	if (init && links.length === newLinks.length) {
		return;
	}

	index = 0;

	// Add variable index for links.
	newLinks.forEach((link) => {
		index += 1;

		link.style.setProperty('--navigation--item-index', index);
	});

	// Add variable index for footer.
	popup
		.querySelector('.popup-footer')
		.style.setProperty('--navigation--item-index', Math.min(index + 1, 10));

	links = newLinks;
	init = true;
});
