// controls navigation bar and overlay navigation functionality
const htmlElement = document.documentElement;
const hamburgerButton = htmlElement.querySelector<HTMLButtonElement>('.hamburger')!;
const navOverlayElement = htmlElement.querySelector<HTMLElement>('.nav-overlay')!;

window.addEventListener('resize', closeOverlayNavWithResize);
document.addEventListener('keydown', closeOverlayNavWithEscape);
hamburgerButton.addEventListener('click', navOverlayFunctionality);

// controls active state on navigation bar/overlay nav
const navLinksCollection = htmlElement.getElementsByClassName('nav-link');
const navLinksArray = Array.from(navLinksCollection) as HTMLAnchorElement[];
const currentPath = window.location.pathname;

navLinksArray.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath)
        link.classList.add('current-page');
});

function navOverlayFunctionality(): void {
    isNavOverlayHidden() ? openOverlayNav() : closeOverlayNav();
}

function isNavOverlayHidden(): boolean {
    return navOverlayElement.classList.contains('hidden');
}

function closeOverlayNav(): void {
    htmlElement.classList.remove('overlay-nav-open');
    hamburgerButton.classList.remove('open');
    navOverlayElement.classList.add('hidden');
}

function closeOverlayNavWithEscape(event: KeyboardEvent): void {
    if (isNavOverlayHidden() === false && event.key === 'Escape')
        closeOverlayNav();
}

function closeOverlayNavWithResize(): void {
    if (isNavOverlayHidden() === false && window.innerWidth > 768)
        closeOverlayNav();
}

function openOverlayNav(): void {
    htmlElement.classList.add('overlay-nav-open');
    hamburgerButton.classList.add('open');
    navOverlayElement.classList.remove('hidden');
}
