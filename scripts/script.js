// JavaScript Document

//ik schrijf bij sommige stukjes op wat het doet, om beter te begrijpen wat er gebeurt op de website
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

// Animatie header hulp van ChatGPT

window.addEventListener('scroll', () => { //bij scroll uitvoeren
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const diff = currentScrollY - lastScrollY; //positie van scrollen

            if (Math.abs(diff) > scrollThreshold) { //voorkomt dat de header heen en weer beweegt
                const header = document.querySelector('header'); 

                if (diff > 0 && currentScrollY > 50) {
                    header.classList.add('hide');
                } else if (diff < 0) {
                    header.classList.remove('hide'); //verbergt en toont de header met het scrollen
                }

                lastScrollY = currentScrollY;
            }

            ticking = false;
        });

        ticking = true;
    }
});

// HAMBURGERMENU Opzet hulp van ChatGPT

if (menuBtn && navMenu && overlay) {
    menuBtn.addEventListener("click", () => {
        overlay.classList.add('active'); 
        setTimeout(() => {
            navMenu.classList.add('open');  //bij klik opent het menu (hij voegt hier funtie open toe)
        }, 200); 
    });
}

if (menuClose && navMenu && overlay) {
    menuClose.addEventListener("click", () => {
        navMenu.classList.remove("open"); 
        overlay.classList.remove('active'); //bij klik sluit het menu (hij removed hier funtie open)
    });
}

// DROPDOWN Opzet hulp van ChatGPT

if (toggle && list) {
    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true'; //geeft aan dat de dropdown open is (toegankelijk voor screenreader)

        toggle.setAttribute('aria-expanded', String(!open)); //als die dicht was en dan klik -> open. als die open was en dan klik -> dicht
        list.hidden = open; //word verborgen of komt in beeld
        list.classList.toggle('show', !open); //laat de 2 extra delen zien bij openen en haalt deze weg bij sluiten
    });
} 

// SLIDER Hulp van ChatGPT

(function () {
	function setupCarousel(selector) {
		const carousel = document.querySelector(selector);
		if (!carousel) return;

		const track = carousel.querySelector('ul'); //zoekt de elementen in de CSS
		const slides = [...track.children];
		const bulletNav = carousel.querySelector(`${selector}-bullets`);

		if (!bulletNav) return;

		
        bulletNav.innerHTML = ""; //zorgt ervoor dat er geen dubbele bullets komen

		slides.forEach((slide, i) => {
			const btn = document.createElement('button'); //er wordt een button aangemaakt
			btn.type = "button";
			btn.setAttribute("aria-label", `Ga naar slide ${i+1}`); //dit helpt de screenreader met lezen wat er gebeurt voor de gebruiker
			bulletNav.appendChild(btn);

			btn.addEventListener('click', () => {
				slide.scrollIntoView({ behavior: 'smooth' }); //smoothe transitie
			});
		});

		const bullets = [...bulletNav.children]; //voor het inkleuren van de bullet waar de foto op staat

		
		const observer = new IntersectionObserver((entries) => {
			let visible = entries
				.filter(e => e.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; //dit kijkt naar welke foto er in beeld is zodat de goede bullet word ingekleurd

			if (!visible) return;

			let index = slides.indexOf(visible.target);

			bullets.forEach((b, i) =>
				i === index ? b.setAttribute("aria-current", "true")
				            : b.removeAttribute("aria-current") //kleurt de juiste bullet in
			);
		}, {
			root: track,
			threshold: 0.55
		});

		slides.forEach(slide => observer.observe(slide));

		
		if (bullets[0]) bullets[0].setAttribute("aria-current", "true"); //de eerse bullet word gelijk geactiveerd omdat dat de eerste foto is die je ziet
	}

	
	setupCarousel(".carousel1");
	setupCarousel(".carousel2slider"); //ik heb 2 carousellen dus deze functie telt voor beide carousellen
})();