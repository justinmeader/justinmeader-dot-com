import { throttleScroll } from './utils/throttle-scroll';

const { documentElement } = document;

const progress = document.querySelector('.scroll-progress');

if (progress) {
	// Show or hide.
	throttleScroll((type, scroll) => {
		const maxHeight =
			documentElement.scrollHeight - documentElement.clientHeight;

		if (maxHeight < 500) {
			progress.classList.remove('scroll-progress-show');
		}

		if (scroll > 100 && maxHeight > 500) {
			progress.classList.add('scroll-progress-show');
		} else {
			progress.classList.remove('scroll-progress-show');
		}
	});
}
