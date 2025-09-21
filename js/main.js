(function () {

  // Mobile Navigation Functionality
  const initMobileNav = () => {
    const hamburgerButtons = [
      'hamburger',
      'hamburger-2',
      'hamburger-3',
      'hamburger-4',
      'hamburger-5'
    ];

    hamburgerButtons.forEach(id => {
      const hb = document.getElementById(id);
      const mobileNav = document.getElementById('mobile-nav');
      const closeBtn = document.getElementById('close-mobile-nav');

      if (hb && mobileNav) {
        hb.addEventListener('click', (e) => {
          e.preventDefault();
          mobileNav.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      }

      if (closeBtn && mobileNav) {
        closeBtn.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
        });
      }

      // Close mobile nav when clicking on links
      if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
          });
        });

        // Close mobile nav when clicking outside
        mobileNav.addEventListener('click', (e) => {
          if (e.target === mobileNav) {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
          }
        });
      }
    });
  };

  document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('will-animate'));
  
  const io = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }); }, { threshold: 0.12 });
  document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => { entries.forEach(en => { if (en.isIntersecting) { const el = en.target; const val = el.getAttribute('data-fill') || '80'; el.style.width = val + '%'; } }); }, { threshold: 0.25 });
  bars.forEach(b => barObserver.observe(b));

  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('cname'), email = document.getElementById('cemail'), msg = document.getElementById('cmsg'), btn = document.getElementById('submitBtn');
      if (!name.value || name.value.length < 2) { showToast('Please enter your name (2+ chars)'); name.focus(); return; }
      if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) { showToast('Please enter valid email'); email.focus(); return; }
      if (!msg.value || msg.value.length < 10) { showToast('Message must be at least 10 chars'); msg.focus(); return; }
      btn.disabled = true; const old = btn.textContent; btn.textContent = 'Sending...';
      setTimeout(() => { btn.disabled = false; btn.textContent = old; form.reset(); document.getElementById('contactSuccess') && (document.getElementById('contactSuccess').style.display = 'block'); showToast('Message sent (demo)'); }, 1100);
    });
  }
  function showToast(txt, ms = 3000) { if (!toast) return; toast.textContent = txt; toast.style.display = 'block'; setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => { toast.style.display = 'none'; toast.style.opacity = '1'; }, 300); }, ms); }

  // set years
  for (let i = 1; i <= 5; i++) { const y = document.getElementById('year' + (i === 1 ? '' : ('-' + i))); if (y) y.textContent = new Date().getFullYear(); }
  // fallback for id 'year' etc.
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
  for (const id of ['year-2', 'year-3', 'year-4', 'year-5']) if (document.getElementById(id)) document.getElementById(id).textContent = new Date().getFullYear();

  // Initialize mobile navigation
  initMobileNav();

  // Navbar scroll effect
  const initNavbarScroll = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          header.classList.remove('scrolled');
        } else {
          header.classList.add('scrolled');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-100px 0px 0px 0px'
    });

    // Observe the hero section or first section
    const heroSection = document.querySelector('.hero') || document.querySelector('main > section:first-child');
    if (heroSection) {
      observer.observe(heroSection);
    }
  };

  // Active navigation link highlighting
  const initActiveNavLinks = () => {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id], main > section');

    if (navLinks.length === 0 || sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  };

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 88;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add smooth scroll behavior to html
  document.documentElement.style.scrollBehavior = 'smooth';

  // Initialize navbar scroll effect
  initNavbarScroll();

  // Initialize active navigation links
  initActiveNavLinks();
})();
