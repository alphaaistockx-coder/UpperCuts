/**
 * 🏆 UPPERCUTS - 3D INTERACTIVE ACHIEVEMENTS SHOWCASE
 * Award-Winning Component - Mind-Blowing Visual Experience
 * Features: 3D transforms, particle effects, holographic shine, interactive cards
 */

class WOWShowcase {
    constructor() {
        this.achievements = [
            {
                id: 1,
                icon: '🏆',
                title: 'Best Barbers',
                subtitle: 'In DeLand',
                stat: '2024',
                color: '#f5c76b'
            },
            {
                id: 2,
                icon: '⭐',
                title: 'Perfect Rating',
                subtitle: 'Google Reviews',
                stat: '4.9/5.0',
                color: '#ff3333'
            },
            {
                id: 3,
                icon: '✂️',
                title: 'Cuts Mastered',
                subtitle: 'Total Styles',
                stat: '15,000+',
                color: '#0066ff'
            },
            {
                id: 4,
                icon: '👨‍🦲',
                title: 'Happy Clients',
                subtitle: 'Monthly',
                stat: '2,500+',
                color: '#00ff88'
            },
            {
                id: 5,
                icon: '🎓',
                title: 'Expert Team',
                subtitle: 'Master Barbers',
                stat: '12 Years',
                color: '#ff6b35'
            },
            {
                id: 6,
                icon: '💎',
                title: 'Premium Service',
                subtitle: 'Luxury Experience',
                stat: '100%',
                color: '#8b5cf6'
            }
        ];
        
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createShowcaseHTML();
        this.createCanvas();
        this.initializeCards();
        this.initializeParticles();
        this.attachEventListeners();
        this.startAnimation();
        this.createFloatingOrbs();
    }

    createShowcaseHTML() {
        const section = document.createElement('section');
        section.id = 'wow-showcase';
        section.className = 'wow-showcase';
        section.innerHTML = `
            <div class="wow-container">
                <canvas id="wow-canvas" class="wow-canvas"></canvas>
                
                <div class="wow-header">
                    <h2 class="wow-title">
                        <span class="wow-title-main">Excellence Recognized</span>
                        <span class="wow-title-sub">Award-Winning Service Since 2012</span>
                    </h2>
                    <div class="wow-shine-effect"></div>
                </div>

                <div class="wow-grid" id="wow-grid">
                    ${this.achievements.map(achievement => `
                        <div class="wow-card" 
                             data-id="${achievement.id}"
                             data-color="${achievement.color}"
                             style="--card-color: ${achievement.color}">
                            <div class="wow-card-inner">
                                <div class="wow-card-front">
                                    <div class="wow-card-glow"></div>
                                    <div class="wow-card-icon">${achievement.icon}</div>
                                    <div class="wow-card-stat" data-stat="${achievement.stat}">0</div>
                                    <div class="wow-card-title">${achievement.title}</div>
                                    <div class="wow-card-subtitle">${achievement.subtitle}</div>
                                    <div class="wow-card-shine"></div>
                                </div>
                                <div class="wow-card-back">
                                    <div class="wow-card-detail">
                                        <p class="wow-detail-text">Recognized for outstanding excellence in barbering services, customer satisfaction, and professional mastery.</p>
                                        <div class="wow-verify-badge">✓ Verified</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="wow-footer">
                    <div class="wow-trophy-showcase">
                        <div class="wow-trophy">🏆</div>
                        <div class="wow-trophy-text">
                            <span class="wow-trophy-title">2024 Excellence Award</span>
                            <span class="wow-trophy-subtitle">Voted Best in DeLand, FL</span>
                        </div>
                    </div>
                </div>

                <div class="wow-orbs-container" id="wow-orbs"></div>
            </div>
        `;

        // Insert before footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.parentNode.insertBefore(section, footer);
        } else {
            document.body.appendChild(section);
        }
    }

    createCanvas() {
        this.canvas = document.getElementById('wow-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const container = document.querySelector('.wow-showcase');
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    }

    initializeCards() {
        const cards = document.querySelectorAll('.wow-card');
        
        cards.forEach((card, index) => {
            // Staggered entrance animation
            setTimeout(() => {
                card.classList.add('wow-card-visible');
                this.animateCardStat(card);
            }, index * 150);

            // 3D hover effect
            card.addEventListener('mouseenter', (e) => this.handleCardHover(e, card));
            card.addEventListener('mousemove', (e) => this.handleCardMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleCardLeave(e, card));
            
            // Click to flip
            card.addEventListener('click', () => this.flipCard(card));

            // Periodic pulse
            setInterval(() => {
                if (!card.classList.contains('wow-card-flipped')) {
                    card.classList.add('wow-card-pulse');
                    setTimeout(() => card.classList.remove('wow-card-pulse'), 1000);
                }
            }, 5000 + index * 1000);
        });
    }

    animateCardStat(card) {
        const statEl = card.querySelector('.wow-card-stat');
        const targetStat = statEl.getAttribute('data-stat');
        
        // Extract number from stat
        const match = targetStat.match(/[\d,]+/);
        if (!match) {
            statEl.textContent = targetStat;
            return;
        }

        const targetNum = parseInt(match[0].replace(/,/g, ''));
        const duration = 2000;
        const startTime = Date.now();
        const suffix = targetStat.replace(/[\d,]+/, '');
        const prefix = targetStat.split(/[\d,]+/)[0] || '';

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(targetNum * easeOut);
            
            statEl.textContent = prefix + current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                statEl.textContent = targetStat;
            }
        };

        animate();
    }

    handleCardHover(e, card) {
        card.style.transform = 'translateY(-15px) scale(1.05)';
        this.createBurstEffect(card);
    }

    handleCardMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `
            translateY(-15px) 
            scale(1.05)
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

        // Update shine position
        const shine = card.querySelector('.wow-card-shine');
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3), transparent 50%)`;
    }

    handleCardLeave(e, card) {
        card.style.transform = '';
    }

    flipCard(card) {
        card.classList.toggle('wow-card-flipped');
        this.createFlipEffect(card);
    }

    createBurstEffect(card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const color = card.getAttribute('data-color');

        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            const velocity = {
                x: Math.cos(angle) * 3,
                y: Math.sin(angle) * 3
            };

            this.particles.push({
                x: centerX,
                y: centerY,
                vx: velocity.x,
                vy: velocity.y,
                life: 1,
                color: color,
                size: Math.random() * 4 + 2
            });
        }
    }

    createFlipEffect(card) {
        const rect = card.getBoundingClientRect();
        const color = card.getAttribute('data-color');

        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: rect.left + Math.random() * rect.width,
                y: rect.top + Math.random() * rect.height,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 1,
                color: color,
                size: Math.random() * 3 + 1
            });
        }
    }

    initializeParticles() {
        // Create ambient floating particles
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                life: 1,
                color: ['#f5c76b', '#ff3333', '#0066ff', '#00ff88'][Math.floor(Math.random() * 4)],
                size: Math.random() * 2 + 1,
                ambient: true
            });
        }
    }

    createFloatingOrbs() {
        const container = document.getElementById('wow-orbs');
        const colors = ['#f5c76b', '#ff3333', '#0066ff', '#00ff88', '#ff6b35', '#8b5cf6'];

        for (let i = 0; i < 8; i++) {
            const orb = document.createElement('div');
            orb.className = 'wow-floating-orb';
            orb.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                background: ${colors[i % colors.length]};
                animation-delay: ${Math.random() * 5}s;
                animation-duration: ${8 + Math.random() * 4}s;
            `;
            container.appendChild(orb);
        }
    }

    updateParticles() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.ambient ? 0.001 : 0.02;

            // Ambient particles bounce at edges
            if (p.ambient) {
                if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
                
                if (p.life <= 0) p.life = 1; // Respawn
            }

            return p.life > 0;
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Glow effect
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
            gradient.addColorStop(0, p.color + '80');
            gradient.addColorStop(1, 'transparent');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
    }

    attachEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    startAnimation() {
        const animate = () => {
            this.updateParticles();
            this.drawParticles();
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.wowShowcase = new WOWShowcase();
    });
} else {
    window.wowShowcase = new WOWShowcase();
}
