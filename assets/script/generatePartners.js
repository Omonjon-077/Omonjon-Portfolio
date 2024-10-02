import partners from './partners.js';

const initSwiperPartners = () => {
    let listProductHtml = document.querySelector('#partners .swiper-wrapper');

    partners.forEach(swiper => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('swiper-slide');
        newProduct.innerHTML = `
 <!--==================== PARTNER ====================-->
                <div class="partners__content">
                     <div class="">
                         <img style="${swiper.style}" src="${swiper.img}" alt="Partners">
                     </div>
                </div>
`;
        listProductHtml.appendChild(newProduct);
    });
};

initSwiperPartners();