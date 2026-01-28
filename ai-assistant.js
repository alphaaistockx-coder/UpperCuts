// AI Business Assistant for UpperCuts
class UpperCutsAI {
  constructor() {
    this.isOpen = false;
    this.conversationHistory = [];
    this.knowledgeBase = {
      services: {
        'precision-fade': { name: 'UCB Precision Fade', price: 45, duration: 45, description: 'Skin-tight fade with seamless gradients' },
        'executive-cut': { name: 'Executive Cut & Style', price: 40, duration: 40, description: 'Scissor-focused cut with soft texture' },
        'beard-sculpt': { name: 'Beard Sculpt & Hot Towel', price: 30, duration: 30, description: 'Full beard shape-up with hot towel' },
        'combo': { name: 'Cut + Beard Package', price: 65, duration: 70, description: 'Full precision cut + beard sculpt' },
        'kids': { name: 'Kids & Teens Fade', price: 30, duration: 35, description: 'Age-appropriate fades for youth' },
        'wedding': { name: 'Wedding & Event Grooming', price: 'Custom', duration: 'By consultation', description: 'Special event packages' }
      },
      barbers: [
        { name: 'Jay "Upper" Collins', role: 'Owner • Master Barber', specialties: ['Skin fades', 'Razor work', 'Transformations'] },
        { name: 'Mia "Blend Queen" Rivera', role: 'Senior Barber', specialties: ['Texture', 'Tapers', 'Photo-ready'] },
        { name: 'Dre "Detail" Harris', role: 'Fade Specialist', specialties: ['Beards', 'Line-ups', 'Detail work'] }
      ],
      hours: {
        'Monday': '10:00 AM – 7:00 PM',
        'Tuesday': '10:00 AM – 7:00 PM',
        'Wednesday': '10:00 AM – 7:00 PM',
        'Thursday': '10:00 AM – 7:00 PM',
        'Friday': '10:00 AM – 8:00 PM',
        'Saturday': '9:00 AM – 6:00 PM',
        'Sunday': 'Closed'
      },
      location: 'New Smyrna Beach, FL',
      phone: '(555) 123-UPPER',
      walkIns: 'Welcome before 4 PM',
      faqs: [
        { q: 'Do you take walk-ins?', a: 'Yes! Walk-ins are welcome before 4 PM. After 4 PM, we recommend booking in advance.' },
        { q: 'How long does a typical cut take?', a: 'Most cuts take 40-45 minutes. Our combo packages run about 70 minutes.' },
        { q: 'Do you offer student discounts?', a: 'Yes! Show your student ID for 10% off regular services (excludes packages).' },
        { q: 'Can I request a specific barber?', a: 'Absolutely! When booking, you can select your preferred barber or choose "first available".' },
        { q: 'What payment methods do you accept?', a: 'We accept cash, all major credit cards, Apple Pay, Google Pay, and Venmo.' },
        { q: 'Do I need to bring reference photos?', a: 'Photos are helpful but not required. Our barbers can consult with you to find your perfect style.' }
      ]
    };
    this.init();
  }

  init() {
    this.createChatWidget();
    this.attachEventListeners();
  }

  createChatWidget() {
    const chatHTML = `
      <div class="ai-chat-widget" id="aiChatWidget">
        <button class="ai-chat-toggle" id="aiChatToggle" aria-label="Open AI Assistant">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="ai-pulse"></span>
        </button>
        <div class="ai-chat-panel" id="aiChatPanel">
          <div class="ai-chat-header">
            <div class="ai-chat-header-info">
              <h3>UpperCuts AI Assistant</h3>
              <p>24/7 Expert Help</p>
            </div>
            <button class="ai-chat-close" id="aiChatClose" aria-label="Close chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="ai-chat-quick-actions">
            <button class="ai-quick-btn" data-action="book">📅 Book Appointment</button>
            <button class="ai-quick-btn" data-action="services">💈 View Services</button>
            <button class="ai-quick-btn" data-action="hours">🕐 Hours & Location</button>
            <button class="ai-quick-btn" data-action="pricing">💵 Pricing Info</button>
          </div>
          <div class="ai-chat-messages" id="aiChatMessages">
            <div class="ai-message ai-assistant">
              <div class="ai-avatar">🤖</div>
              <div class="ai-message-content">
                <p>Hey! I'm your UpperCuts AI assistant. I can help you:</p>
                <ul>
                  <li>Book appointments instantly</li>
                  <li>Answer questions about services & pricing</li>
                  <li>Recommend the perfect cut for your style</li>
                  <li>Check barber availability</li>
                  <li>Provide grooming tips</li>
                </ul>
                <p>What can I help you with today?</p>
              </div>
            </div>
          </div>
          <form class="ai-chat-input-form" id="aiChatForm">
            <input 
              type="text" 
              class="ai-chat-input" 
              id="aiChatInput" 
              placeholder="Ask me anything about UpperCuts..."
              autocomplete="off"
            />
            <button type="submit" class="ai-chat-send" aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  attachEventListeners() {
    const toggle = document.getElementById('aiChatToggle');
    const close = document.getElementById('aiChatClose');
    const form = document.getElementById('aiChatForm');
    const panel = document.getElementById('aiChatPanel');

    toggle?.addEventListener('click', () => this.toggleChat());
    close?.addEventListener('click', () => this.toggleChat());
    form?.addEventListener('submit', (e) => this.handleSubmit(e));

    // Quick action buttons
    document.querySelectorAll('.ai-quick-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.handleQuickAction(action);
      });
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('aiChatPanel');
    const toggle = document.getElementById('aiChatToggle');
    
    if (this.isOpen) {
      panel?.classList.add('open');
      toggle?.classList.add('active');
      document.getElementById('aiChatInput')?.focus();
    } else {
      panel?.classList.remove('open');
      toggle?.classList.remove('active');
    }
  }

  handleQuickAction(action) {
    const actions = {
      book: 'I want to book an appointment',
      services: 'What services do you offer?',
      hours: 'What are your hours?',
      pricing: 'How much do your services cost?'
    };
    
    const message = actions[action];
    if (message) {
      document.getElementById('aiChatInput').value = message;
      this.handleSubmit({ preventDefault: () => {}, target: document.getElementById('aiChatForm') });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('aiChatInput');
    const message = input.value.trim();
    
    if (!message) return;

    this.addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    this.showTyping();

    // Simulate AI processing
    setTimeout(() => {
      const response = this.generateResponse(message);
      this.hideTyping();
      this.addMessage(response, 'assistant');
    }, 800 + Math.random() * 1200);
  }

  addMessage(content, type) {
    const messagesContainer = document.getElementById('aiChatMessages');
    const avatar = type === 'user' ? '👤' : '🤖';
    
    const messageHTML = `
      <div class="ai-message ai-${type}">
        <div class="ai-avatar">${avatar}</div>
        <div class="ai-message-content">
          ${content}
        </div>
      </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    this.conversationHistory.push({ role: type, content });
  }

  showTyping() {
    const messagesContainer = document.getElementById('aiChatMessages');
    const typingHTML = `
      <div class="ai-message ai-assistant ai-typing" id="aiTyping">
        <div class="ai-avatar">🤖</div>
        <div class="ai-message-content">
          <span class="ai-typing-dot"></span>
          <span class="ai-typing-dot"></span>
          <span class="ai-typing-dot"></span>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTyping() {
    document.getElementById('aiTyping')?.remove();
  }

  generateResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Booking intent
    if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
      return `<p>I'd love to help you book! Here's how:</p>
        <ol>
          <li>Scroll to our <a href="#booking" style="color: var(--accent-blue); text-decoration: underline;">booking section</a></li>
          <li>Pick your preferred date, time, and barber</li>
          <li>Select your service</li>
          <li>Submit and we'll confirm via text in 15 minutes</li>
        </ol>
        <p><strong>Pro tip:</strong> Walk-ins welcome before 4 PM! Call ${this.knowledgeBase.phone} to check availability.</p>`;
    }

    // Services inquiry
    if (lowerMessage.includes('service') || lowerMessage.includes('cut') || lowerMessage.includes('fade') || lowerMessage.includes('offer')) {
      const servicesList = Object.values(this.knowledgeBase.services)
        .map(s => `<li><strong>${s.name}</strong> – $${s.price} (${s.duration} min)</li>`)
        .join('');
      return `<p>We offer premium grooming services:</p><ul>${servicesList}</ul>
        <p>Our most popular is the <strong>Cut + Beard Package</strong> – full precision cut + beard sculpt for $65 (70 min). Want details on a specific service?</p>`;
    }

    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('much') || lowerMessage.includes('$')) {
      return `<p><strong>UpperCuts Pricing:</strong></p>
        <ul>
          <li>UCB Precision Fade: <strong>$45</strong></li>
          <li>Executive Cut: <strong>$40</strong></li>
          <li>Beard Sculpt: <strong>$30</strong></li>
          <li>Cut + Beard Combo: <strong>$65</strong></li>
          <li>Kids Fade: <strong>$30</strong></li>
        </ul>
        <p>💡 Student discount: 10% off with valid ID!</p>`;
    }

    // Hours
    if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('close') || lowerMessage.includes('time')) {
      const hoursList = Object.entries(this.knowledgeBase.hours)
        .map(([day, hours]) => `<li><strong>${day}:</strong> ${hours}</li>`)
        .join('');
      return `<p><strong>UpperCuts Hours:</strong></p><ul>${hoursList}</ul>
        <p>📍 Located in ${this.knowledgeBase.location}<br>
        📞 ${this.knowledgeBase.phone}<br>
        ✅ Walk-ins welcome before 4 PM</p>`;
    }

    // Barber info
    if (lowerMessage.includes('barber') || lowerMessage.includes('who') || lowerMessage.includes('stylist')) {
      const barbersList = this.knowledgeBase.barbers
        .map(b => `<li><strong>${b.name}</strong> (${b.role}) – Specializes in: ${b.specialties.join(', ')}</li>`)
        .join('');
      return `<p><strong>Meet our master barbers:</strong></p><ul>${barbersList}</ul>
        <p>All our barbers are hand-picked for skill, consistency, and that calm vibe. You can request any barber when booking!</p>`;
    }

    // Walk-in
    if (lowerMessage.includes('walk') || lowerMessage.includes('wait')) {
      return `<p>✅ <strong>Walk-ins welcome before 4 PM!</strong></p>
        <p>After 4 PM, we're usually fully booked, so appointments are recommended. Current wait times vary – call ${this.knowledgeBase.phone} for real-time availability.</p>
        <p>Want to skip the wait? <a href="#booking" style="color: var(--accent-blue); text-decoration: underline;">Book online now</a>!</p>`;
    }

    // Location / directions
    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where') || lowerMessage.includes('direction')) {
      return `<p><strong>📍 UpperCuts Barbershop</strong><br>
        ${this.knowledgeBase.location}</p>
        <p>Parking available on-site. Look for the UCB logo glowing in the window!</p>
        <p>📞 Call us: ${this.knowledgeBase.phone}</p>`;
    }

    // Style recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('style') || lowerMessage.includes('should i get') || lowerMessage.includes('look good')) {
      return `<p>Great question! Here's my take:</p>
        <ul>
          <li><strong>Low maintenance?</strong> Go for a mid-fade or taper – clean, professional, grows out nicely.</li>
          <li><strong>Bold & edgy?</strong> Try a high skin fade or burst fade – statement look that turns heads.</li>
          <li><strong>Classic & timeless?</strong> Executive scissor cut with a side part – works anywhere.</li>
          <li><strong>Textured/curly hair?</strong> Curly top fade with natural texture – embraces your hair type.</li>
        </ul>
        <p>Not sure? Our barbers do free consultations before every cut. Bring a reference photo or just describe your vibe – we'll nail it.</p>`;
    }

    // Payment
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('card') || lowerMessage.includes('cash')) {
      return `<p><strong>We accept:</strong></p>
        <ul>
          <li>💵 Cash</li>
          <li>💳 All major credit/debit cards</li>
          <li>📱 Apple Pay & Google Pay</li>
          <li>💸 Venmo</li>
        </ul>
        <p>Tips appreciated but never expected! Most clients tip 15-20% for exceptional service.</p>`;
    }

    // Reviews / ratings
    if (lowerMessage.includes('review') || lowerMessage.includes('rating') || lowerMessage.includes('good')) {
      return `<p><strong>⭐ 4.9/5 stars</strong> across 500+ reviews!</p>
        <p>What clients love:</p>
        <ul>
          <li>"Best fade I've ever had" – Marcus L.</li>
          <li>"They actually listen" – Jordan P.</li>
          <li>"Detail-obsessed, on-time, relaxed vibe"</li>
        </ul>
        <p>Check out our <a href="#testimonials" style="color: var(--accent-blue); text-decoration: underline;">full reviews section</a> to see what the UpperCuts family is saying!</p>`;
    }

    // FAQ handling
    const faqMatch = this.knowledgeBase.faqs.find(faq => 
      lowerMessage.includes(faq.q.toLowerCase().substring(0, 15))
    );
    if (faqMatch) {
      return `<p><strong>Q: ${faqMatch.q}</strong></p><p>${faqMatch.a}</p>`;
    }

    // Default response
    return `<p>I'm here to help! I can assist with:</p>
      <ul>
        <li>📅 <strong>Booking</strong> appointments</li>
        <li>💈 <strong>Service details</strong> & pricing</li>
        <li>🕐 <strong>Hours</strong> & location info</li>
        <li>✂️ <strong>Style recommendations</strong></li>
        <li>👨‍🦰 <strong>Barber specialties</strong></li>
        <li>💡 <strong>Grooming tips</strong></li>
      </ul>
      <p>Try asking: "What services do you offer?" or "How do I book an appointment?"</p>
      <p>Or call us directly: ${this.knowledgeBase.phone}</p>`;
  }
}

// Initialize AI assistant when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.upperCutsAI = new UpperCutsAI();
  });
} else {
  window.upperCutsAI = new UpperCutsAI();
}
