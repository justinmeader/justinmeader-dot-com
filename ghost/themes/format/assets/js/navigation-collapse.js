const { on } = window.ivent;

// Hide collapse when show popup.
on(document, 'pvs.popup.show', ({ data, relatedTarget }) => {
	if (data.id === 'popup-navigation') {
		relatedTarget
			.querySelectorAll('[aria-expanded="true"]')
			.forEach((toggle) => {
				// Toggle.
				toggle.style.transition = 'none';
				toggle.setAttribute('aria-expanded', 'false');
				toggle.offsetHeight;
				toggle.style.transition = '';

				// Collapse.
				const collapse = toggle.nextElementSibling;
				collapse.style.transition = 'none';
				collapse.offsetHeight;
				collapse.style.transition = '';
			});
	}
});
