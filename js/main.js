/* =====================================================
   MEL SHIELDS PORTFOLIO — MAIN JS
   ===================================================== */

// ─── THEME ──────────────────────────────────────────
const html = document.documentElement;

function getSavedTheme() {
  return localStorage.getItem('ms-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('ms-theme', theme);
}

// Apply on load (before paint, avoids flicker)
applyTheme(getSavedTheme());

document.addEventListener('DOMContentLoaded', () => {

  // ─── THEME TOGGLE ────────────────────────────────
  const toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ─── ACTIVE NAV LINK ─────────────────────────────
  const path = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const abs  = new URL(href, window.location.href).pathname;
    if (abs === path || (path.endsWith('/') && abs.endsWith('index.html'))) {
      link.classList.add('active');
    }
  });

  // ─── SCROLL REVEAL ───────────────────────────────
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => io.observe(el));
  } else {
    // Fallback — just show everything
    reveals.forEach(el => el.classList.add('visible'));
  }

  // ─── PAGE TRANSITIONS ────────────────────────────
  // Fade-out on internal link clicks
  const wrapper = document.querySelector('.page-wrapper');

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href') || '';

    // Skip: external, mail, tel, anchor-only
    if (
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel') ||
      href.startsWith('#') ||
      link.hasAttribute('download') ||
      link.target === '_blank'
    ) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      const dest = link.href;

      if (wrapper) {
        wrapper.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
        wrapper.style.opacity    = '0';
        wrapper.style.transform  = 'translateY(-8px)';
      }

      setTimeout(() => { window.location.href = dest; }, 230);
    });
  });

  // ─── NAV SCROLL SHADOW ───────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 8) {
        nav.style.boxShadow = '0 1px 0 var(--border)';
      } else {
        nav.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // ─── STAGGER VISIBLE REVEALS on load ────────────
  setTimeout(() => {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('visible');
      }
    });
  }, 60);

  // ─── IMAGE LIGHTBOX (case study pages) ──────────
  const csImages = document.querySelectorAll('.cs-hero-img img, .cs-img-grid img');
  if (csImages.length) {
    // Inject lightbox overlay once
    const imgLightbox = document.createElement('div');
    imgLightbox.className = 'img-lightbox';
    imgLightbox.innerHTML = `
      <button class="img-lightbox__close" aria-label="Close">✕</button>
      <img class="img-lightbox__img" src="" alt="">
    `;
    document.body.appendChild(imgLightbox);

    const lbImg    = imgLightbox.querySelector('.img-lightbox__img');
    const lbClose  = imgLightbox.querySelector('.img-lightbox__close');

    const openImgLightbox = (src, alt) => {
      lbImg.src = src;
      lbImg.alt = alt || '';
      imgLightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeImgLightbox = () => {
      imgLightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    csImages.forEach(img => {
      img.addEventListener('click', () => openImgLightbox(img.src, img.alt));
    });

    lbClose.addEventListener('click', closeImgLightbox);
    imgLightbox.addEventListener('click', e => { if (e.target === imgLightbox) closeImgLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeImgLightbox(); });
  }

  // ─── CRAFTS GALLERY (scrollable full-screen view) ──
  const gallery = document.getElementById('gallery');
  if (gallery) {
    const craftItems   = Array.from(document.querySelectorAll('.craft-item'));
    const scrollEl     = document.getElementById('galleryScroll');
    const closeBtn     = gallery.querySelector('.gallery__close');

    // Build gallery once from the grid so image order matches
    craftItems.forEach((item, i) => {
      const srcImg = item.querySelector('img');
      if (!srcImg) return;
      const img = document.createElement('img');
      img.className = 'gallery__img';
      img.src = srcImg.getAttribute('src');
      img.alt = srcImg.getAttribute('alt') || '';
      img.loading = 'lazy';
      img.dataset.index = i;
      scrollEl.appendChild(img);
    });

    const openGallery = (index) => {
      gallery.classList.add('open');
      document.body.style.overflow = 'hidden';
      // Jump to the clicked image without animating (so it feels instant)
      const target = scrollEl.querySelector(`.gallery__img[data-index="${index}"]`);
      if (target) {
        // Wait a tick so layout is ready after showing
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'auto', block: 'center' });
        });
      } else {
        scrollEl.scrollTop = 0;
      }
    };

    const closeGallery = () => {
      gallery.classList.remove('open');
      document.body.style.overflow = '';
    };

    craftItems.forEach((item, i) => {
      item.addEventListener('click', () => openGallery(i));
    });

    closeBtn.addEventListener('click', closeGallery);

    // Close when tapping anywhere that isn't a craft image
    gallery.addEventListener('click', e => {
      if (!(e.target instanceof Element)) return;
      if (e.target.closest('.gallery__img')) return; // clicked on an image — keep open
      closeGallery();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && gallery.classList.contains('open')) closeGallery();
    });
  }

});
