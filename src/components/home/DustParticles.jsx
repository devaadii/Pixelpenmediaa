import React, { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 120; // Reduced from 260 for performance
const REPEL_RADIUS = 180;
const REPEL_STRENGTH = 2.5;
const SHOOTING_STAR_INTERVAL = 350; // Less frequent to save GPU

function DustParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -9999, y: -9999 };

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
    const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (canvas.width / canvas.height)));
    const rows = Math.ceil(PARTICLE_COUNT / cols);
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const z = Math.random();
      particles.push({
        // Grid position with random jitter for natural look
        x: (col + Math.random()) * cellW,
        y: (row + Math.random()) * cellH,
        z,
        baseRadius: 0.25 + z * 0.7, // medium-small particles
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        flickerPhase: Math.random() * Math.PI * 2,
        flickerSpeed: 0.005 + Math.random() * 0.015,
        baseOpacity: 0.12 + z * 0.35,
        offsetX: 0,
        offsetY: 0,
      });
    }

    // Shooting stars pool
    const shootingStars = [];
    let shootingTimer = 0;

    function spawnShootingStar() {
      // Spawn more spread out horizontally to cross the middle text area
      const startX = canvas.width * 0.1 + Math.random() * canvas.width * 0.6;
      const startY = Math.random() * canvas.height * 0.25;
      // Fixed 45 degree angle
      const angle = 45 * (Math.PI / 180);
      const speed = 2.5 + Math.random() * 1.5;
      shootingStars.push({
        x: startX,
        y: startY,
        angle,
        speed,
        length: 50 + Math.random() * 60,
        opacity: 0,
        phase: 'fadeIn',
        life: 0,
        maxLife: 120 + Math.random() * 80,
        size: 0.8 + Math.random() * 0.6,
      });
    }

    let time = 0;

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Dust particles ──
      for (const p of particles) {
        p.x += p.vx * (0.5 + p.z * 0.5);
        p.y += p.vy * (0.5 + p.z * 0.5);

        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        const dx = (p.x + p.offsetX) - mouse.x;
        const dy = (p.y + p.offsetY) - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = REPEL_RADIUS * (0.6 + p.z * 0.4);

        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (dist < repelRadius && dist > 0.1) {
          const force = (1 - dist / repelRadius) * REPEL_STRENGTH * (0.5 + p.z * 0.5);
          targetOffsetX = (dx / dist) * force * repelRadius * 0.3;
          targetOffsetY = (dy / dist) * force * repelRadius * 0.3;
        }

        p.offsetX += (targetOffsetX - p.offsetX) * 0.06;
        p.offsetY += (targetOffsetY - p.offsetY) * 0.06;

        const flicker = Math.sin(time * p.flickerSpeed + p.flickerPhase);
        const opacity = 0.5; // 50% opacity as requested

        const drawX = p.x + p.offsetX;
        const drawY = p.y + p.offsetY;
        const r = p.baseRadius;

        if (r < 0.5) {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity.toFixed(3)})`;
          ctx.fillRect(drawX - r, drawY - r, r * 2, r * 2);
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity.toFixed(3)})`;
          ctx.fill();

          if (p.z > 0.7) {
            ctx.beginPath();
            ctx.arc(drawX, drawY, r * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 240, 220, ${(opacity * 0.4).toFixed(3)})`;
            ctx.fill();
          }
        }
      }

      // ── Shooting stars ──
      shootingTimer++;
      // Spawn with slight randomness (~4-5 per second)
      if (shootingTimer >= SHOOTING_STAR_INTERVAL * (0.6 + Math.random() * 0.8)) {
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
