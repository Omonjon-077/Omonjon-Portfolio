import projects from './projects.js';

const initSwiperProjects = () => {
    let listProductHtml = document.querySelector('#projects .swiper-wrapper');

    projects.forEach(swiper => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('projects__content', 'swiper-slide');
        newProduct.innerHTML = `
 <!--==================== PROJECT ====================-->
                        <img src="${swiper.img}" alt="${swiper.title}" class="projects__img">
                        <div class="">
                            <span class="projects__subtitle">${swiper.subtitle}</span>
                            <h2 class="projects__title">${swiper.title}</h2>
                            <a target="_blank" href="${swiper.link}"
                               class="projects__button">
                                Saytni koʻrish <i class="ri-arrow-right-line"></i>
                            </a>
                        </div>
`;
        listProductHtml.appendChild(newProduct);
    });
};

initSwiperProjects();