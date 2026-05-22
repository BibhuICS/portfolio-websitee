document.addEventListener('DOMContentLoaded', () => {
    /*=============== NAVIGATION MOBILE MENU ===============*/
    const navToggle = document.getElementById('nav-toggle'),
          navMenu = document.getElementById('nav-menu'),
          navClose = document.getElementById('nav-close');

    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }
    if(navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    /*=============== REMOVE MENU ON MOBILE CLICK ===============*/
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    /*=============== SCROLL ACTIVE LINKS HIGHLIGHT ===============*/
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                  sectionTop = current.offsetTop - 60,
                  sectionId = current.getAttribute('id'),
                  sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
            
            if(sectionClass) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    sectionClass.classList.add('active-link');
                } else {
                    sectionClass.classList.remove('active-link');
                }
            }
        });
    });

    /*=============== MIXITUP FILTER PORTFOLIO ===============*/
    if(document.querySelector('.projects__container')) {
        mixitup('.projects__container', {
            selectors: { target: '.projects__card' },
            animation: { duration: 300 }
        });
    }

    const filterItems = document.querySelectorAll('.projects__item');
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.active-project')?.classList.remove('active-project');
            this.classList.add('active-project');
        });
    });

    /*=============== CONTACT FORM SUBMISSION ===============*/
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);
            const userName = document.getElementById('name').value;
            
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    alert(`Thanks for reaching out, ${userName}! Your message has been sent successfully.`);
                    contactForm.reset();
                } else {
                    alert("Oops! Something went wrong. Please try sending your message again.");
                }
            } catch (error) {
                alert("Network error. Please check your connection and try again.");
            }
        });
    }
});