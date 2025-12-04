// JavaScript Document
console.log("hi");

const menuBtn = document.getElementById("menuKnop");
const navMenu = document.getElementById("mainNav");
const menuClose = document.getElementById("menuSluiten");
const overlay = document.querySelector('.menu-overlay');


const toggle = document.querySelector('.dropdownmenu-toggle');
const list = document.querySelector('.dropdownmenu-list');

let lastScrollY = window.scrollY;
let ticking = false;
const scrollThreshold = 100; 

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const diff = currentScrollY - lastScrollY;

            if (Math.abs(diff) > scrollThreshold) {
                const header = document.querySelector('header');

                if (diff > 0 && currentScrollY > 50) {
                    header.classList.add('hide');
                } else if (diff < 0) {
                    header.classList.remove('hide');
                }

                lastScrollY = currentScrollY;
            }

            ticking = false;
        });

        ticking = true;
    }
});

// HAMBURGERMENU

if (menuBtn && navMenu && overlay) {
    menuBtn.addEventListener("click", () => {
        overlay.classList.add('active'); 
        setTimeout(() => {
            navMenu.classList.add('open');
        }, 200); 
    });
}

if (menuClose && navMenu && overlay) {
    menuClose.addEventListener("click", () => {
        navMenu.classList.remove("open"); 
        overlay.classList.remove('active');
    });
}

// DROPDOWN

if (toggle && list) {
    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', String(!open));
        list.hidden = open;
        list.classList.toggle('show', !open);
    });
} 

(function () {
	function setupCarousel(selector) {
		const carousel = document.querySelector(selector);
		if (!carousel) return;

		const track = carousel.querySelector('ul');
		const slides = [...track.children];
		const bulletNav = carousel.querySelector(`${selector}-bullets`);

		if (!bulletNav) return;

		
        bulletNav.innerHTML = ""; 

		slides.forEach((slide, i) => {
			const btn = document.createElement('button');
			btn.type = "button";
			btn.setAttribute("aria-label", `Ga naar slide ${i+1}`);
			bulletNav.appendChild(btn);

			btn.addEventListener('click', () => {
				slide.scrollIntoView({ behavior: 'smooth' });
			});
		});

		const bullets = [...bulletNav.children];

		
		const observer = new IntersectionObserver((entries) => {
			let visible = entries
				.filter(e => e.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

			if (!visible) return;

			let index = slides.indexOf(visible.target);

			bullets.forEach((b, i) =>
				i === index ? b.setAttribute("aria-current", "true")
				            : b.removeAttribute("aria-current")
			);
		}, {
			root: track,
			threshold: 0.55
		});

		slides.forEach(slide => observer.observe(slide));

		
		if (bullets[0]) bullets[0].setAttribute("aria-current", "true");
	}

	
	setupCarousel(".carousel1");
	setupCarousel(".carousel2slider");
})();