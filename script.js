// ==========================================================================
// EXAMPLE - FUTURE TECHNOLOGY TODAY
// Interactive JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Navbar Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 2. Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- 3. Flash Deals Countdown Timer ---
  let hours = 7;
  let minutes = 45;
  let seconds = 32;

  const countHoursEl = document.getElementById('countHours');
  const countMinutesEl = document.getElementById('countMinutes');
  const countSecondsEl = document.getElementById('countSeconds');

  function updateCountdown() {
    if (seconds > 0) {
      seconds--;
    } else {
      seconds = 59;
      if (minutes > 0) {
        minutes--;
      } else {
        minutes = 59;
        if (hours > 0) {
          hours--;
        } else {
          hours = 24; // reset cycle
        }
      }
    }

    if (countHoursEl) countHoursEl.textContent = String(hours).padStart(2, '0');
    if (countMinutesEl) countMinutesEl.textContent = String(minutes).padStart(2, '0');
    if (countSecondsEl) countSecondsEl.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);

  // --- 4. Hero Slider / Progress Indicator ---
  const heroProgressFill = document.getElementById('heroProgressFill');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');
  let currentHeroSlide = 1;
  const totalHeroSlides = 3;

  function updateHeroProgress() {
    if (heroProgressFill) {
      const percentage = (currentHeroSlide / totalHeroSlides) * 100;
      heroProgressFill.style.width = `${percentage}%`;
    }
  }

  if (heroNext) {
    heroNext.addEventListener('click', () => {
      currentHeroSlide = currentHeroSlide >= totalHeroSlides ? 1 : currentHeroSlide + 1;
      updateHeroProgress();
    });
  }

  if (heroPrev) {
    heroPrev.addEventListener('click', () => {
      currentHeroSlide = currentHeroSlide <= 1 ? totalHeroSlides : currentHeroSlide - 1;
      updateHeroProgress();
    });
  }

  // --- 5. Cart Management & Toast Notification ---
  let cartCount = 0;
  const cartCountEl = document.querySelector('.cart-count');

  function showToast(message) {
    let toast = document.getElementById('customToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'customToast';
      toast.style.position = 'fixed';
      toast.style.bottom = '30px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.background = '#0f172a';
      toast.style.color = '#ffffff';
      toast.style.padding = '12px 24px';
      toast.style.borderRadius = '30px';
      toast.style.fontSize = '0.9rem';
      toast.style.fontWeight = '600';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
      toast.style.border = '1px solid rgba(255,255,255,0.1)';
      toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      toast.style.zIndex = '10000';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.gap = '8px';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> ${message}`;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';
    }, 2800);
  }

  // Add click listener to all cards to allow quick add
  document.querySelectorAll('.product-card, .arrival-card, .bestseller-card').forEach(card => {
    const cardTitle = card.querySelector('.product-name')?.textContent || 'Item';
    
    // Add cart button if clicked
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.product-wishlist')) {
        cartCount++;
        if (cartCountEl) cartCountEl.textContent = cartCount;
        showToast(`Added "${cardTitle}" to your cart!`);
      }
    });
  });

  // --- 6. Wishlist Toggle ---
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        showToast('Saved item to your Wishlist!');
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        showToast('Removed item from Wishlist.');
      }
    });
  });

  // --- 7. Newsletter Subscription ---
  const subscribeBtn = document.getElementById('subscribeBtn');
  const newsletterEmail = document.getElementById('newsletterEmail');

  if (subscribeBtn && newsletterEmail) {
    subscribeBtn.addEventListener('click', () => {
      const email = newsletterEmail.value.trim();
      if (email && email.includes('@')) {
        showToast(`🎉 Thank you for subscribing, ${email}!`);
        newsletterEmail.value = '';
      } else {
        showToast('⚠️ Please enter a valid email address.');
      }
    });
  }

  // --- 8. Search Bar Quick Filter / Trigger ---
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
      showToast(`Searching for "${query}"...`);
    }
  }

  if (searchBtn) searchBtn.addEventListener('click', handleSearch);
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }
});
