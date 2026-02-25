import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export function initCollectionsSlider(): void {
	const section = document.querySelector<HTMLElement>('.collections');
	if (!section) return;

	const slider = section.querySelector<HTMLElement>('.slider');
	if (!slider) return;

	const el = slider.querySelector<HTMLElement>('.swiper');
	if (!el) return;

	const pills = Array.from(section.querySelectorAll<HTMLElement>('.collections__pills .pill'));

	const swiper = new Swiper(el, {
		modules: [Navigation, Pagination, Autoplay],
		loop: true,
		slidesPerView: 1,
		spaceBetween: 32,
		pagination: {
			el: slider.querySelector<HTMLElement>('.swiper-pagination') ?? '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: el.querySelector<HTMLElement>('.swiper-button-next') ?? '.swiper-button-next',
			prevEl: el.querySelector<HTMLElement>('.swiper-button-prev') ?? '.swiper-button-prev',
		},
		lazyPreloadPrevNext: 1,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
	});

	function updateActivePill(index: number): void {
		pills.forEach((pill, i) => {
			pill.classList.toggle('pill--active', i === index);
		});
	}

	pills.forEach((pill, i) => {
		pill.addEventListener('click', (e) => {
			e.preventDefault();
			swiper.slideToLoop(i);
			swiper.autoplay.stop();
			swiper.autoplay.start();
		});
	});

	swiper.on('slideChange', () => {
		updateActivePill(swiper.realIndex);
	});

	updateActivePill(swiper.realIndex);
}
