/* ==================== MOBILE MENU TOGGLE ==================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    const warnBanner = document.querySelector(".warn");
    if (warnBanner) {
        if (menuOpen) {
            warnBanner.classList.add('hidden');
        } else if (window.scrollY <= 20) {
            warnBanner.classList.remove('hidden');
        }
    }

    if (menuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

document.addEventListener('click', (e) => {
    if (menuOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        menuOpen = false;
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        const warnBanner = document.querySelector(".warn");
        if (warnBanner && window.scrollY <= 20) {
            warnBanner.classList.remove('hidden');
        }
    }
});

const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        const warnBanner = document.querySelector(".warn");
        if (warnBanner && window.scrollY <= 20) {
            warnBanner.classList.remove('hidden');
        }
    });
});

/* ==================== HERO SLIDER ==================== */
const heroIndicators = document.querySelectorAll('.hero .indicator');
const heroThumbnails = document.querySelectorAll('.hero .thumbnail');
let currentSlide = 0;
const totalSlides = heroIndicators.length;
let autoplayInterval;

const heroSlides = [
    {
        title: 'Mejores vapers desechables',
        badge: 'Oferta',
        rating: '4.8',
        detail: '5000+ caladas',
        description: 'Vaper con nicotina listo para usar: muchas caladas, sabores vaper intensos y envío gratis a España.',
        image: 'images/VapSolo-hero-Vaper-Desechable-Cigarrillo-Electronico-Muchas-Caladas-twins-pro.png',
        link: 'https://elvapero.es/collections/vapsolo-vapes-desechables'
    },
    {
        title: 'Novedades puff',
        badge: 'Nuevo',
        rating: '4.9',
        detail: '6000+ caladas',
        description: 'Descubre los vapers desechables más recientes con puff suave y sabores vaper frutales.',
        image: 'images/VapSolo-hero-Vaper-Desechable-Cigarrillo-Electronico-Muchas-Caladas-twins.png',
        link: 'https://elvapero.es/collections/vapsolo-vapes-desechables'
    },
    {
        title: 'Top colecciones',
        badge: 'Promoción',
        rating: '5.0',
        detail: '7000+ caladas',
        description: 'Cigarrillos electrónicos desechables de larga duración con muchas caladas y sabores premium.',
        image: 'images/VapSolo-hero-Vaper-Desechable-Cigarrillo-Electronico-Muchas-Caladas.png',
        link: 'https://elvapero.es/collections/vapsolo-vapes-desechables'
    }
];

function changeSlide(index) {
    const slide = heroSlides[index];
    const mainImage = document.getElementById('heroMainImage');
    const heroCta = document.querySelector('.hero-actions .cta-btn.primary');

    heroIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });

    heroThumbnails.forEach((thumbnail, i) => {
        thumbnail.classList.toggle('active', i === index);
    });

    if (mainImage) mainImage.src = slide.image;
    if (heroCta) heroCta.href = slide.link;

    currentSlide = index;
}

heroIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        changeSlide(index);
        resetAutoplay();
    });
});

heroThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        changeSlide(index);
        resetAutoplay();
    });
});

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % totalSlides;
        changeSlide(nextSlide);
    }, 5000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

startAutoplay();

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    heroSection.addEventListener('mouseleave', () => startAutoplay());
}

/* ==================== NAVBAR SCROLL EFFECT ==================== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.8) 100%)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
});

/* ==================== SHOW MORE DESCRIPTIONS ==================== */
const showMoreDescBtn = document.getElementById('showMoreDesc');
const hiddenDescriptions = document.querySelectorAll('.description-item.hidden');
let descExpanded = false;

if (showMoreDescBtn) {
    showMoreDescBtn.addEventListener('click', function () {
        descExpanded = !descExpanded;
        hiddenDescriptions.forEach(item => {
            item.style.display = descExpanded ? 'block' : 'none';
        });
        this.textContent = descExpanded ? 'Ver menos' : 'Ver más';
    });
}

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

/* ==================== AGE VERIFICATION ==================== */
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
    if (localStorage.getItem("ageConfirmed") !== "true") {
        if (ageModal) ageModal.style.display = "flex";
    } else {
        if (ageModal) ageModal.style.display = "none";
    }
});

if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        localStorage.setItem("ageConfirmed", "true");
        if (ageModal) ageModal.style.display = "none";
    });
}

if (noBtn) {
    noBtn.addEventListener("click", () => {
        alert("DostÄ™p zabroniony. Strona tylko dla osÃ³b 18+");
        window.location.href = "https://www.google.pl";
    });
}

/* ==================== WARNING BANNER ==================== */
const warnBanner = document.querySelector(".warn");
if (warnBanner) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            warnBanner.classList.add("hidden");
            document.body.classList.add("scrolled");
        } else {
            warnBanner.classList.remove("hidden");
            document.body.classList.remove("scrolled");
        }
    });
}

/* ==================== FOOTER CITIES ==================== */
const city = document.getElementById("city");
const cities = document.querySelectorAll(".foot-cont-three a");
if (city) {
    city.addEventListener("click", () => {
        city.classList.toggle("active");
        cities.forEach((el) => {
            el.style.display = el.style.display === "block" ? "none" : "block";
        });
    });
}

/* ==================== FOOTER YEAR ==================== */
const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}

