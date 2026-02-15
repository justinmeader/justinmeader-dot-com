import Swiper from 'swiper';
import { Navigation, EffectCards, FreeMode, A11y } from 'swiper/modules';
import { clonesFromTo } from './utils/clones-from-to';

document.querySelectorAll('.section:has(> .swiper)').forEach((section) => {
	const conf = {};
	const slider = section.querySelector('.swiper');
	const wrapper = section.querySelector('.swiper-wrapper');
	const buttonNext = section.querySelector('.slider-button-next');
	const buttonPrev = section.querySelector('.slider-button-prev');
	let slides = section.querySelectorAll('.swiper-slide');

	// Create slides.
	if (!slides.length) {
		slides = [];
		wrapper.querySelectorAll(':scope > *').forEach((child) => {
			const slide = document.createElement('div');
			slide.classList.add('swiper-slide');
			slide.append(child);
			slides.push(slide);
			wrapper.append(slide);
		});
	}

	if (slides.length === 1) {
		return;
	}

	// Add support a11y.
	conf.modules = [A11y];

	// Set navigation.
	if (buttonNext && buttonPrev) {
		conf.modules.push(Navigation);
		conf.navigation = {
			nextEl: buttonNext,
			prevEl: buttonPrev,
		};
	}

	// For card effect.
	if (slider.dataset.effect === 'cards') {
		conf.modules.push(EffectCards);

		// Disable shadow for card effect.
		conf.cardsEffect = {
			slideShadows: false,
		};

		// For center.
		if (slider.dataset.centeredSlides === 'true') {
			conf.cardsEffect.rotate = 0;
			conf.cardsEffect.perSlideRotate = 0;

			if (slides.length === 2) {
				clonesFromTo(slides, wrapper, 3);
			} else if (slides.length === 3) {
				clonesFromTo(slides, wrapper, 2);
			} else if (slides.length < 8) {
				clonesFromTo(slides, wrapper, 1);
			}
		}
	}

	// For free mode.
	if (slider.dataset.freeMode === 'true') {
		conf.modules.push(FreeMode);
	}

	// Set initial slide.
	const initIndex = Array.from(slides).findIndex((slide) =>
		slide.querySelector('.current'),
	);
	conf.initialSlide = initIndex === -1 ? 0 : initIndex;

	// Data set.
	const { dataset } = slider;
	Object.keys(dataset).map((key) => {
		let value = dataset[key];

		// Transform to boolean and number.
		if (value === 'true') {
			value = true;
		} else if (value === 'false') {
			value = false;
		} else if (!isNaN(value) && !isNaN(parseFloat(value))) {
			value = Number(value);
		}

		conf[key] = value;
	});

	// Init.
	const swiper = new Swiper(slider, conf);
});
