// Enhanced UpperCuts Website Animations & Interactions
// Premium 150/100 quality features

// Generate floating particles for premium effect
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}

// Add smooth scroll reveal animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .barber-card, .testimonial-card, .gallery-tile').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(el);
  });
}

// Premium card hover effects with mouse tracking
function initCardHoverEffects() {
  document.querySelectorAll('.service-card, .barber-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });
}

// Enhanced testimonial rotator with more content
function initTestimonialRotator() {
  const testimonials = [
    {
      quote: "\"Best fade I've ever had. The blend is flawless, the beard is on point, and I walked out feeling like a new person.\"",
      name: "Marcus L.",
      meta: "Client for 3 years • Weekly cuts",
      rating: "★★★★★"
    },
    {
      quote: "\"They actually listen. I showed one photo, explained my job, and they gave me a cut that works everywhere.\"",
      name: "Jordan P.",
      meta: "First‑time client • Executive cut",
      rating: "★★★★★"
    },
    {
      quote: "\"Brought my son for his first real fade—he walked out grinning ear to ear. We're locked in.\"",
      name: "Tasha & Eli",
      meta: "Mom & son • Kids fade",
      rating: "★★★★★"
    },
    {
      quote: "\"The attention to detail is insane. Every line is perfect, every blend is seamless. True artistry.\"",
      name: "Devon R.",
      meta: "Regular client • 2 years",
      rating: "★★★★★"
    },
    {
      quote: "\"Finally found a barbershop that gets it. Clean vibes, professional service, and cuts that last.\"",
      name: "Alex M.",
      meta: "Monthly client • Precision fade",
      rating: "★★★★★"
    },
    {
      quote: "\"This is where I bring all my groomsmen. They made sure every angle was perfect for the wedding photos.\"",
      name: "Christopher W.",
      meta: "Groom • Wedding package",
      rating: "★★★★★"
    }
  ];

  let index = 0;
  const quote = document.getElementById("testimonialQuote");
  const name = document.getElementById("testimonialName");
  const meta = document.getElementById("testimonialMeta");
  const rating = document.getElementById("testimonialRating");
  const card = document.getElementById("testimonialCard");

  if (!card) return;

  setInterval(() => {
    index = (index + 1) % testimonials.length;
    const t = testimonials[index];
    
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    
    setTimeout(() => {
      if (quote) quote.textContent = t.quote;
      if (name) name.textContent = t.name;
      if (meta) meta.textContent = t.meta;
      if (rating) rating.textContent = t.rating;
      
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 400);
  }, 8000);
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initScrollAnimations();
  initCardHoverEffects();
  initTestimonialRotator();
});
