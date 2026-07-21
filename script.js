/* ============================================
   RESTANO BACKFLOW TESTING - SCRIPTS
   ============================================ */

(function() {
  'use strict';

  /* Mobile Menu Toggle */
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function() {
      const isOpen = mainNav.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isOpen);
      // Change icon
      const svg = menuBtn.querySelector('svg');
      if (svg) {
        svg.innerHTML = isOpen
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
      }
    });

    // Close menu when clicking a nav link
    mainNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mainNav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        const svg = menuBtn.querySelector('svg');
        if (svg) {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  /* Scroll Animations */
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    fadeElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    fadeElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  /* Header shadow on scroll */
  const header = document.querySelector('.header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
          } else {
            header.style.boxShadow = '';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* Form Validation & Handling */
  const apptForm = document.getElementById('appointmentForm');
  if (apptForm) {
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    apptForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const name = apptForm.querySelector('#name');
      const phone = apptForm.querySelector('#phone');
      let valid = true;

      // Reset messages
      if (formSuccess) formSuccess.classList.remove('visible');
      if (formError) formError.classList.remove('visible');

      // Validate required fields
      if (!name || !name.value.trim()) {
        valid = false;
        name.focus();
      }

      // Simple phone validation (at least 10 digits)
      const phoneDigits = phone ? phone.value.replace(/\D/g, '') : '';
      if (phoneDigits.length < 10) {
        valid = false;
        if (phone && document.activeElement !== phone) {
          phone.focus();
        }
      }

      if (!valid) {
        if (formError) formError.classList.add('visible');
        return;
      }

      // Show success message (form service not yet connected)
      if (formSuccess) {
        formSuccess.classList.add('visible');
        apptForm.reset();
      }

      // Scroll to success message
      if (formSuccess) {
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    // Real-time validation feedback
    apptForm.querySelectorAll('input, textarea, select').forEach(function(field) {
      field.addEventListener('blur', function() {
        this.checkValidity();
      });
    });
  }

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* Active nav link highlighting based on scroll position */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0) {
    let scrollTicking = false;
    window.addEventListener('scroll', function() {
      if (!scrollTicking) {
        window.requestAnimationFrame(function() {
          let current = '';
          sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
              current = section.getAttribute('id');
            }
          });
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
              link.classList.add('active');
            }
          });
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });
  }
})();
