// Particle System for Glowing Effects
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        document.body.appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 2000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 0.8 + 0.2,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.3 + 0.1,
                color: this.getRandomColor(),
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.01 + 0.005
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(208, 65, 68, ',    // Red
            'rgba(255, 100, 120, ',  // Pink
            'rgba(255, 80, 100, ',   // Light red
            'rgba(200, 50, 80, ',    // Dark red
            'rgba(255, 120, 140, '   // Light pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Update pulse
            particle.pulse += particle.pulseSpeed;
            const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.3;

            // Draw particle with glow effect
            this.ctx.save();
            this.ctx.globalCompositeOperation = 'screen';
            
            // Outer glow
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + (pulseOpacity * 0.1) + ')';
            this.ctx.fill();

            // Middle glow
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 1.2, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + (pulseOpacity * 0.3) + ')';
            this.ctx.fill();

            // Core particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + pulseOpacity + ')';
            this.ctx.fill();

            this.ctx.restore();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});