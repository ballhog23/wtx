export function initNavbarTransparency(): void {
    const navbar = document.querySelector<HTMLElement>('.navbar');
    const hero = document.querySelector<HTMLElement>('.hero');

    if (!navbar || !hero) return;

    const navbarHeight = navbar.offsetHeight;
    console.log('navB height', navbarHeight);
    let isScrolled = false;

    const onScroll = () => {
        if (!isScrolled && window.scrollY >= navbarHeight) {
            navbar.classList.add('navbar--scrolled');
            isScrolled = true;
        } else if (isScrolled && window.scrollY < navbarHeight) {
            navbar.classList.remove('navbar--scrolled');
            isScrolled = false;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();
}