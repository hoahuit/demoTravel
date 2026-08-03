/* ============================================
   LET'S TRAVEL - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Page loader
  const loader = document.querySelector('.page-loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader?.classList.add('loaded');
    }, 500);
  });

  // ==========================================
  // HERO SLIDER
  // ==========================================
  const heroSlider = (() => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let current = 0;
    let interval;
    const INTERVAL_MS = 6000;

    function goTo(index) {
      slides[current]?.classList.remove('active');
      dots[current]?.classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current]?.classList.add('active');
      dots[current]?.classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoPlay() {
      stopAutoPlay();
      interval = setInterval(next, INTERVAL_MS);
    }

    function stopAutoPlay() {
      clearInterval(interval);
    }

    // Init
    if (slides.length > 0) {
      goTo(0);
      startAutoPlay();

      prevBtn?.addEventListener('click', () => { prev(); startAutoPlay(); });
      nextBtn?.addEventListener('click', () => { next(); startAutoPlay(); });

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { goTo(i); startAutoPlay(); });
      });

      // Touch/swipe support
      let touchStartX = 0;
      let touchEndX = 0;
      const sliderEl = document.querySelector('.hero-slider');

      sliderEl?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
      }, { passive: true });

      sliderEl?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? next() : prev();
        }
        startAutoPlay();
      }, { passive: true });
    }

    return { next, prev, goTo };
  })();

  // ==========================================
  // STICKY HEADER
  // ==========================================
  const header = document.querySelector('#site-header');
  const scrollThreshold = 100;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 500) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ==========================================
  // MOBILE MENU
  // ==========================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMain = document.querySelector('.nav-main');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function toggleMobileMenu() {
    mobileToggle?.classList.toggle('active');
    navMain?.classList.toggle('active');
    mobileOverlay?.classList.toggle('active');
    document.body.style.overflow = navMain?.classList.contains('active') ? 'hidden' : '';
  }

  mobileToggle?.addEventListener('click', toggleMobileMenu);
  mobileOverlay?.addEventListener('click', toggleMobileMenu);

  // Mobile dropdown toggles
  document.querySelectorAll('.has-mega > a, .has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 849) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // ==========================================
  // SEARCH TABS
  // ==========================================
  const searchTabs = document.querySelectorAll('.search-tab');
  const searchPanels = document.querySelectorAll('.search-panel');

  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      searchTabs.forEach(t => t.classList.remove('active'));
      searchPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // ==========================================
  // TESTIMONIALS CAROUSEL
  // ==========================================
  const testimonialSlider = (() => {
    const track = document.querySelector('.testimonial-track');
    const items = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dot');
    let current = 0;
    let interval;

    function goTo(index) {
      current = (index + items.length) % items.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1); }

    function startAutoPlay() {
      stopAutoPlay();
      interval = setInterval(next, 5000);
    }

    function stopAutoPlay() {
      clearInterval(interval);
    }

    if (track && items.length > 0) {
      goTo(0);
      startAutoPlay();

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { goTo(i); startAutoPlay(); });
      });
    }

    return { goTo, next };
  })();

  // ==========================================
  // SCROLL ANIMATIONS (IntersectionObserver)
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const suffix = counter.dataset.suffix || '';
      const duration = 2000;
      const start = 0;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = Math.round(start + (target - start) * eased);

        counter.textContent = value.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  // Observe stats section for counter animation
  const statsSection = document.querySelector('.why-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // SMOOTH SCROLL
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // BACK TO TOP
  // ==========================================
  document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // PARALLAX EFFECT (subtle on hero)
  // ==========================================
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      document.querySelectorAll('.hero-slide-bg').forEach(bg => {
        bg.style.transform = `scale(${1 + scrolled * 0.0001}) translateY(${scrolled * 0.3}px)`;
      });
    }
  }, { passive: true });
});
