window.ivent.on(document, 'click', '.scroll-progress-button', (e) => {
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: 'smooth' });
});
