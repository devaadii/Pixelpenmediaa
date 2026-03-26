import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PARTICLE_COUNT = 220; // Increased back for better coverage on tall mobile screens
const REPEL_RADIUS = 180;
const REPEL_STRENGTH = 2.5;
const SHOOTING_STAR_INTERVAL = 140; // More frequent shooting stars

function DustParticles() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -9999, y: -9999 };

    // Smooth slow fade-in on site load
    gsap.fromTo(canvas, 
      { opacity: 0 }, 
      { opacity: 1, duration: 3.5, ease: "power2.inOut" }
    );

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // Create particles with even grid-based distribution + random jitter
    const particles = [];
    
    const initParticles = () => {
      const isMobile = window.innerWidth < 768;
      const currentCount = isMobile ? 300 : PARTICLE_COUNT; // Increased to 300 for mobile to fill screen
      const w = canvas.width || window.innerWidth;
      const h = canvas.height || window.innerHeight;
      
      const cols = Math.ceil(Math.sqrt(currentCount * (w / (h || 1))));
      const rows = Math.ceil(currentCount / (cols || 1));
      const cellW = w / (cols || 1);
      const cellH = h / (rows || 1);

      particles.length = 0;
      for (let i = 0; i < currentCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const z = Math.random();
        particles.push({
          x: (col + Math.random()) * cellW,
          y: (row + Math.random()) * cellH,
          z,
          baseRadius: 0.25 + z * 0.8, 
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          flickerPhase: Math.random() * Math.PI * 2,
          flickerSpeed: 0.005 + Math.random() * 0.015,
          baseOpacity: 0.2 + z * 0.4,
          offsetX: 0,
          offsetY: 0,
        });
      }
    };
    initParticles();

    // Shooting stars pool
    const shootingStars = [];
    let shootingTimer = 0;

    function spawnShootingStar() {
      const isMobile = window.innerWidth < 768;
      // Spawn more spread out horizontally across the full width
      const startX = Math.random() * canvas.width;
      // Spawn more broadly across the vertical range on mobile to fill the tall viewport
      const startY = isMobile 
        ? Math.random() * canvas.height * 0.7 // Top 70% of screen
        : Math.random() * canvas.height * 0.25; // Desktop mostly top-focused

      const angle = 45 * (Math.PI / 180);
      const speed = isMobile 
        ? 1.5 + Math.random() * 2.0 // Softer range for mobile
        : 2.5 + Math.random() * 1.5;

      shootingStars.push({
        x: startX,
        y: startY,
        angle,
        speed,
        length: isMobile ? 30 + Math.random() * 40 : 50 + Math.random() * 60,
        opacity: 0,
        phase: 'fadeIn',
        life: 0,
        maxLife: isMobile ? 80 + Math.random() * 60 : 120 + Math.random() * 80,
        size: isMobile ? 0.6 + Math.random() * 0.5 : 0.8 + Math.random() * 0.6,
      });
    }

    const SHOOTING_STAR_SPAWN_CHECK = 60; // Check every 60 frames
    let time = 0;

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const opacity = 0.7; // Increased for better visibility
      const isMobile = window.innerWidth < 768;
      const repelRadius = isMobile ? 100 : REPEL_RADIUS;
      const repelRadiusSq = repelRadius * repelRadius;

      // Batch small particles (fillRect) for performance
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      
      for (const p of particles) {
        const speedMult = 0.5 + p.z * 0.5;
        p.x += p.vx * speedMult;
        p.y += p.vy * speedMult;

        if (p.x < -20) p.x = canvas.width + 20;
        else if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        else if (p.y > canvas.height + 20) p.y = -20;

        const dx = (p.x + p.offsetX) - mouse.x;
        const dy = (p.y + p.offsetY) - mouse.y;
        const distSq = dx * dx + dy * dy;
        const pRepelRadiusSq = repelRadiusSq * (0.6 + p.z * 0.4);

        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (distSq < pRepelRadiusSq && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / Math.sqrt(pRepelRadiusSq)) * REPEL_STRENGTH * (0.5 + p.z * 0.5);
          const mag = force * Math.sqrt(pRepelRadiusSq) * 0.3;
          targetOffsetX = (dx / dist) * mag;
          targetOffsetY = (dy / dist) * mag;
        }

        p.offsetX += (targetOffsetX - p.offsetX) * 0.06;
        p.offsetY += (targetOffsetY - p.offsetY) * 0.06;

        const drawX = p.x + p.offsetX;
        const drawY = p.y + p.offsetY;
        const r = p.baseRadius;

        if (r < 0.5) {
          ctx.fillRect(drawX - r, drawY - r, r * 2, r * 2);
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, r, 0, Math.PI * 2);
          ctx.fill();

          if (p.z > 0.7) {
            ctx.beginPath();
            ctx.arc(drawX, drawY, r * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 240, 220, 0.2)`;
            ctx.fill();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; // Reset for next iteration
          }
        }
      }

      // ── Shooting stars ──
      shootingTimer++;
      // Much more frequent on mobile (every ~60-80 frames instead of 140)
      const currentInterval = isMobile ? 60 : SHOOTING_STAR_INTERVAL;
      if (shootingTimer >= currentInterval * (0.6 + Math.random() * 0.8)) {
        spawnShootingStar();
        shootingTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;

        // Move along angle
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        // Smooth fade in/out lifecycle
        const progress = s.life / s.maxLife;
        const maxOpacity = 0.7;
        if (progress < 0.15) {
          s.opacity = (progress / 0.15) * maxOpacity; // fade in
        } else if (progress > 0.7) {
          s.opacity = ((1 - progress) / 0.3) * maxOpacity; // fade out
        } else {
          s.opacity = maxOpacity;
        }

        // Remove if dead or off screen
        if (s.life >= s.maxLife || s.x > canvas.width + 100 || s.y > canvas.height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw shooting star with tail
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(246, 130, 24, 0)`);
        grad.addColorStop(0.7, `rgba(246, 130, 24, ${(s.opacity * 0.3).toFixed(3)})`);
        grad.addColorStop(1, `rgba(255, 89, 0, ${(s.opacity * 0.7).toFixed(3)})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Small bright head
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 89, 0, ${(s.opacity * 0.8).toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);


  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

export default DustParticles;
