/**
 * Init features from our PVS framework.
 */

const { pvs } = window;

if (pvs) {
	pvs.initClipboard();
	pvs.initDarkMode();
	pvs.initLightbox();
	pvs.initPopup();
	pvs.initScrollProgress();
	pvs.initScrollbarWidth();
	pvs.initPagination();
	pvs.initCollapse();
	pvs.initDropdown();
	pvs.initPricingDiscount();
	pvs.initPricingUrlSync();
	pvs.registerFeaturedVideo();
	pvs.registerTOC();
}
