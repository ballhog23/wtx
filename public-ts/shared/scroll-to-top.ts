export function initScrollToTop(): void {
    const scrollToTopButton = document.querySelector<HTMLElement>('.scroll-to-top');
    const heroElement = document.querySelector<HTMLElement>('.hero');
    const navbar = document.querySelector<HTMLElement>('.navbar');

    if (!scrollToTopButton || !heroElement || !navbar) return;

    const navbarHeight = navbar.offsetHeight;

    scrollToTopButton.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        scrollTo({ top: 0, behavior: 'smooth' });
    });

    const options: IntersectionObserverInit = {
        root: null,
        rootMargin: `-${navbarHeight}px`,
        threshold: 0,
    };

    const buttonVisibility: IntersectionObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) scrollToTopButton.classList.remove('hidden');
            else scrollToTopButton.classList.add('hidden');
        });
    };

    const observer = new IntersectionObserver(buttonVisibility, options);
    observer.observe(heroElement);
}

initScrollToTop();
