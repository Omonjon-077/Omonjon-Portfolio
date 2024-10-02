/*=============== LOADER ===============*/
document.addEventListener('DOMContentLoaded', function (eventObject) {
    $('.load').fadeIn();
})
window.addEventListener("load", function (eventObject) {
    $('.load').fadeOut("slow");

});

/*=============== GET CURRENT YEAR ===============*/
// Hozirgi yilni olish
const currentYear = new Date().getFullYear();

// Yilni HTML elementiga joylash
document.getElementById('current-year').textContent = currentYear;

/*=============== MASK FOR PHONE NUMBER MENU ===============*/
if ($('#contact-phone').length) {
    IMask(document.getElementById('contact-phone'), {
        mask: '+{998}(00)000-00-00'
    });
}


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER PARTNERS ===============*/
let swiperPartners = new Swiper(".partners_swiper", {
    grabCursor: true,
    spaceBetween: 20,
    loop: true,
    autoplay: true,
    breakpoints: {
        // when window width is >= 280px
        280: {
            slidesPerView: 1,
            spaceBetween: 10,
            // slideToClickedSlide: true,
        },
        400: {
            slidesPerView: 2,
            spaceBetween: 10,
            // slideToClickedSlide: true,
        },
        // when window width is >= 575px
        575: {
            slidesPerView: 3,
            spaceBetween: 10,
            // slideToClickedSlide: true,
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 3,
            // spaceBetween: 0,
            // slideToClickedSlide: true,
        },
        // when window width is >= 992px
        992: {
            slidesPerView: 4,
            // spaceBetween: 0,
            // slideToClickedSlide: true,
        },
        // when window width is >= 1200px
        1200: {
            slidesPerView: 4,
            // spaceBetween: 0,
            // slideToClickedSlide: true,
        },
        // when window width is >= 1440px
        1440: {
            slidesPerView: 5,
            // spaceBetween: 0,
            // slideToClickedSlide: true,
        },
    },
    keyboard: true,
});

/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper(".projects__container", {
    grabCursor: true,
    spaceBetween: 24,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        1200: {
            slidesPerView: 2,
            spaceBetween: -56,
        },
    },
    keyboard: true,
});

/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    grabCursor: true,
    effect: 'flip',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    keyboard: true,
});

/*=============== EMAIL JS (this function close) ===============*/
if ($('.email-js').length) {
    const contactForm = document.getElementById('contact-form'),
        contactName = document.getElementById('contact-name'),
        contactPhone = document.getElementById('contact-phone'),
        contactComment = document.getElementById('contact-comment'),
        contactMessage = document.getElementById('contact-message')

    const sendEmail = (e) => {
        e.preventDefault()

        // Check if the field has a value
        if (contactName.value === '' || contactComment.value === '') {
            // Add and remove color
            contactMessage.classList.remove('color-blue')
            contactMessage.classList.add('color-red')

            // Show message
            contactMessage.textContent = 'Siz to\'liq ma\'lumot kiritmadingiz ✍'

            // Remove message three seconds
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 5000)
        } else {
            // serviceID - templateID - #form - publicKey
            emailjs.sendForm('service_16fjhbg', 'template_g193eqe', '#contact-form', '5mBSwoijmne8xYaAB')
                .then(() => {
                    // Show message and add color
                    contactMessage.classList.add('color-blue')
                    contactMessage.classList.remove('color-red')
                    contactMessage.textContent = 'Xabaringiz jo\'natildi ✅'

                    // Remove message after four seconds
                    setTimeout(() => {
                        contactMessage.textContent = ''
                    }, 5000)
                }, () => {
                    // Mail sending error
                    contactMessage.textContent = 'Xabaringiz jo\'natilmadi (Serverda nosozlik) ❌'
                })

            // To clear the input field
            contactComment.value = '';
            contactName.value = '';
            contactPhone.value = '';
        }
    }

    contactForm.addEventListener('submit', sendEmail)
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the bg-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header')
        : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})


sr.reveal(`.home__data, .projects__container, .testimonial__container, .footer__container`)
sr.reveal(`.home__info div`, {delay: 600, origin: 'bottom', interval: 100})
sr.reveal(`.skills__content:nth-child(1), .contact__content:nth-child(1)`, {origin: 'left'})
sr.reveal(`.skills__content:nth-child(2), .contact__content:nth-child(2)`, {origin: 'right'})
sr.reveal(`.qualification__content, .services__card`, {interval: 100})

/*=============== SEND TELEGRAM BOT ===============*/
let form = document.getElementById("contact-form"),
    toast = document.getElementById("contact-message");

// FOR SEND BOT
let bot = {
    TOKEN: "7244017061:AAEKlZM-uhpGl6PvLAvWgAJJEuU848CQ4HA",
    chatID: "1369873117", // Agar botning o'zigagina xabar jo'natilsa ID shunday qoladi agar guruhga bolsa boshiga tire "-" qo'yish kerak
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let userName = document.getElementById("contact-name"),
        userPhone = document.getElementById("contact-phone"),
        userMessage = document.getElementById("contact-comment");

    let sendMessage = `Mijoz: %0A 👤 Ismi: ${userName.value} %0A 📞 Telefon raqami: ${userPhone.value} %0A 💬 Xabari: ${userMessage.value} %0A%0A Manba: omonjon.triger.uz`

    if (userName.value === "") {
        alert("Ismingizni yozmagansiz!");
    } else if (userMessage.value === "") {
        alert("Xabar yozmagansiz!");
    } else {
        fetch(`https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${sendMessage}`, {
            method: "GET"
        })
            .then(success => {
                userName.value = "";
                userPhone.value = "";
                userMessage.value = "";
                toast.style.color = "green";
                toast.textContent = `Xabaringiz jo'natildi, e'tibor uchun rahmat 🤗`
                setTimeout(function () {
                    toast.textContent = ``
                }, 5000);
            }, error => {
                alert("Xabaringiz jo'natilmadi, iltimos keyinroq urunib ko'ring!");
                userName = "";
                userPhone = "";
                userMessage = "";
            })
    }
})