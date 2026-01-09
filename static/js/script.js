document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + "%";
   
    const nav = document.getElementById('navbar');
    if (scrollTop > 50) {
      nav.classList.add('nav-scrolled');
      nav.classList.remove('py-6');
      nav.classList.add('py-4');
    } else {
      nav.classList.remove('nav-scrolled');
      nav.classList.add('py-6');
      nav.classList.remove('py-4');
    }

    const heroBg = document.getElementById('hero-bg');
    const heroText = document.getElementById('hero-text');
    const heroSub = document.getElementById('hero-sub');
   
    if (heroBg && scrollTop < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollTop * 0.4}px) scale(1.1)`;
      heroText.style.transform = `translateY(${scrollTop * -0.3}px)`;
      heroSub.style.transform = `translateY(${scrollTop * -0.2}px)`;
      heroSub.style.opacity = 1 - (scrollTop / 500);
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
       
       
        if (entry.target.classList.contains('stat-card')) {
          const counter = entry.target.querySelector('.counter');
          if (counter && !counter.classList.contains('counted')) {
            animateCounter(counter);
            counter.classList.add('counted');
          }
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stat-card').forEach(el => {
    observer.observe(el);
  });

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000; 
    const step = 20; 
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target + (el.getAttribute('data-suffix') || "");
        clearInterval(timer);
      } else {
        el.innerText = Math.floor(current) + (el.getAttribute('data-suffix') || "");
      }
    }, step);
  }

  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenuBtn = document.getElementById('close-menu-btn');

  if (menuBtn && mobileMenu && closeMenuBtn) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => mobileMenu.classList.add('opacity-100'), 10);
    });

    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('opacity-100');
      setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('opacity-100');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
      });
    });
  }
});
