// PREMIUM ENHANCEMENTS - WOW FACTOR FEATURES
// Advanced animations, parallax, FOMO elements, and engagement boosters

(function() {
  'use strict';

  // ===== PARALLAX SCROLLING =====
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-parallax') || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    }
    
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
      });
    }
  }

  // ===== LIVE AVAILABILITY COUNTER =====
  function initLiveAvailability() {
    const chips = document.querySelectorAll('.hero-orb-floating-chip, .availability-badge');
    
    function updateAvailability() {
      const hour = new Date().getHours();
      let availableChairs = 0;
      let message = '';
      
      if (hour >= 9 && hour < 12) {
        availableChairs = 3;
        message = 'chairs open • Book now';
      } else if (hour >= 12 && hour < 16) {
        availableChairs = 2;
        message = 'chairs open • Walk-ins welcome';
      } else if (hour >= 16 && hour < 20) {
        availableChairs = 1;
        message = 'chair open • Filling fast';
      } else {
        availableChairs = 0;
        message = 'Closed • Book for tomorrow';
      }
      
      chips.forEach(chip => {
        const countSpan = chip.querySelector('span:last-child');
        if (countSpan) {
          countSpan.textContent = availableChairs > 0 ? 
            `${availableChairs} ${message}` : 
            message;
          
          // Update color based on availability
          if (availableChairs === 1) {
            chip.style.borderColor = 'rgba(255,193,7,0.5)';
            chip.style.background = 'linear-gradient(135deg, rgba(255,193,7,0.95) 0%, rgba(255,152,0,0.95) 100%)';
          } else if (availableChairs === 0) {
            chip.style.borderColor = 'rgba(158,158,158,0.5)';
            chip.style.background = 'linear-gradient(135deg, rgba(100,100,100,0.95) 0%, rgba(60,60,60,0.95) 100%)';
          }
        }
      });
    }
    
    updateAvailability();
    setInterval(updateAvailability, 60000); // Update every minute
  }

  // ===== URGENCY / FOMO ELEMENTS =====
  function initUrgencyElements() {
    // Create floating notification
    const notification = document.createElement('div');
    notification.className = 'fomo-notification';
    notification.innerHTML = `
      <div class="fomo-content">
        <span class="fomo-icon">\ud83d\udd25</span>
        <div class="fomo-text">
          <strong>Someone just booked</strong>
          <span class="fomo-detail">2 chairs left today</span>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Show notification periodically
    function showFOMO() {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
      }, 5000);
    }
    
    // Show first notification after 8 seconds
    setTimeout(showFOMO, 8000);
    // Then show every 45 seconds
    setInterval(showFOMO, 45000);
  }

  // ===== ADVANCED HOVER EFFECTS =====
  function initAdvancedHovers() {
    const cards = document.querySelectorAll('.service-card, .barber-card, .testimonial-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
      });
      
      // Mouse tracking glow effect
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        
        this.style.setProperty('--mouse-x', `${glowX}%`);
        this.style.setProperty('--mouse-y', `${glowY}%`);
      });
    });
  }

  // ===== SCROLL PROGRESS INDICATOR =====
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // ===== SMOOTH NUMBER COUNTERS =====
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const target = parseInt(entry.target.getAttribute('data-count'));
          const duration = 2000;
          const start = 0;
          const increment = target / (duration / 16);
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              entry.target.textContent = target + (entry.target.getAttribute('data-suffix') || '');
              clearInterval(timer);
              entry.target.classList.add('counted');
            } else {
              entry.target.textContent = Math.floor(current) + (entry.target.getAttribute('data-suffix') || '');
            }
          }, 16);
        }
      });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ===== BOOK NOW CTA PULSE =====
  function initCTAPulse() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(btn => {
      // Add pulse animation class periodically
      setInterval(() => {
        btn.classList.add('pulse-animation');
        setTimeout(() => {
          btn.classList.remove('pulse-animation');
        }, 1000);
      }, 15000);
    });
  }

  // ===== SOCIAL PROOF TICKER =====
  function initSocialProof() {
    const testimonialSection = document.querySelector('.testimonials');
    if (!testimonialSection) return;
    
    const proofBanner = document.createElement('div');
    proofBanner.className = 'social-proof-banner';
    proofBanner.innerHTML = `
      <div class="proof-items">
        <div class="proof-item">
          <span class="proof-icon">\u2b50</span>
          <span>4.9/5.0 Rating</span>
        </div>
        <div class="proof-item">
          <span class="proof-icon">\ud83d\udc65</span>
          <span>500+ Happy Clients</span>
        </div>
        <div class="proof-item">
          <span class="proof-icon">\ud83c\udfc6</span>
          <span>Best in DeLand 2024</span>
        </div>
        <div class="proof-item">
          <span class="proof-icon">\u2702\ufe0f</span>
          <span>Expert Barbers</span>
        </div>
        <div class="proof-item">
          <span class="proof-icon">\ud83d\udccd</span>
          <span>Serving DeLand Since 2012</span>
        </div>
      </div>
    `;
    
    testimonialSection.insertBefore(proofBanner, testimonialSection.firstChild);
  }

  // ===== ENHANCED LOADING ANIMATION =====
  function initLoadingAnimation() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // Fade in sections sequentially
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add('section-visible');
        }, 100 * index);
      });
    });
  }

  // ===== BOOKING URGENCY TIMER =====
  function initBookingTimer() {
    const bookingSection = document.querySelector('#booking');
    if (!bookingSection) return;
    
    const timerBadge = document.createElement('div');
    timerBadge.className = 'booking-timer';
    timerBadge.innerHTML = `
      <span class="timer-icon">\u23f0</span>
      <div class="timer-text">
        <strong>Limited slots</strong>
        <span class="timer-countdown">Book within <span class="timer-minutes">24</span>min for today</span>
      </div>
    `;
    
    const sectionHeader = bookingSection.querySelector('.section-header');
    if (sectionHeader) {
      sectionHeader.appendChild(timerBadge);
      
      // Countdown timer
      let minutes = 24;
      setInterval(() => {
        minutes--;
        if (minutes < 0) minutes = 24;
        const minutesSpan = timerBadge.querySelector('.timer-minutes');
        if (minutesSpan) {
          minutesSpan.textContent = minutes;
          if (minutes < 10) {
            timerBadge.classList.add('urgent');
          } else {
            timerBadge.classList.remove('urgent');
          }
        }
      }, 60000);
    }
  }

  // ===== INITIALIZE ALL ENHANCEMENTS =====
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    initParallax();
    initLiveAvailability();
    initUrgencyElements();
    initAdvancedHovers();
    initScrollProgress();
    initCounters();
    initCTAPulse();
    initSocialProof();
    initLoadingAnimation();
    initBookingTimer();
    
    console.log('\u2728 Premium enhancements loaded');
  }
  
  init();
})();
