const header = document.querySelector('.header');
const navigation = document.querySelector('.navigation');
const sectionAbout = document.querySelector('.section-about');
const sectionProjects = document.querySelector('.section-projects');
const sectionContact = document.querySelector('.section-contact');
const projects = document.querySelectorAll('.project');
const mainBtn = document.querySelector('[data-href]');
const navItems = document.querySelectorAll('.navigation__item');

//NAVBAR

function alternateNavbar([headerEntry]) {
    if(headerEntry.isIntersecting) navigation.classList.remove('navigation--active');
    if(!headerEntry.isIntersecting) navigation.classList.add('navigation--active');
}

const navbarObserverOptions = {
    rootMargin: '-50% 0% -50% 0%'
}

const navbarObserver = new IntersectionObserver(alternateNavbar, navbarObserverOptions);
navbarObserver.observe(header);

//ITEMS

function alternateActiveItem(entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            document.querySelector(`[data-section="${entry.target.className}"`).classList.add('navigation__item--active')
        }
        else {
            document.querySelector(`[data-section="${entry.target.className}"`).classList.remove('navigation__item--active')
        }
    });
}

const activeItemObserverOptions = {
    rootMargin: '-50% 0% -50% 0%'
}

const activeItemObserver = new IntersectionObserver(alternateActiveItem, activeItemObserverOptions);
activeItemObserver.observe(sectionAbout);
activeItemObserver.observe(sectionProjects);
activeItemObserver.observe(sectionContact);

//PROJECTS

function showProject(entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            document.querySelector(`[data-project-id="${entry.target.dataset.projectId}"] .hidden-right`).classList.remove('hidden-right');
            document.querySelector(`[data-project-id="${entry.target.dataset.projectId}"] .hidden-left`).classList.remove('hidden-left');
            projectObserver.unobserve(entry.target);
        }
    });
}

let projectObserverOptions = {
    rootMargin: '-40% 0% -40% 0%'
};

let projectObserver = new IntersectionObserver(showProject, projectObserverOptions);

projects.forEach(project => {
    projectObserver.observe(project);
});

//LINKS

mainBtn.addEventListener('click', () => {
    let targetTop = document.querySelector(mainBtn.dataset.href).getBoundingClientRect().top;
    let navigationHeight = navigation.getBoundingClientRect().height;
    scrollTo(0, (scrollY + targetTop) - navigationHeight);
});

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        let targetTop = document.querySelector(`#${item.dataset.section}`).getBoundingClientRect().top;
        let navigationHeight = navigation.getBoundingClientRect().height;
        scrollTo(0, (scrollY + targetTop) - navigationHeight);
    });
});