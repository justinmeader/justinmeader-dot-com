export function clonesFromTo(elements, clonesFromTo, count = 1) {
	[...Array(count).keys()].forEach(() => {
		elements.forEach((child) => {
			const clone = child.cloneNode(true);
			clone.querySelectorAll('a').forEach((link) => {
				link.setAttribute('tabindex', '-1');
			});
			clone.setAttribute('aria-hidden', 'true');
			clonesFromTo.appendChild(clone);
		});
	});
}
