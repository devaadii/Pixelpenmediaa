import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const mouse = useRef({ x: 0, y: 0 });
    const speed = useRef(0);
    const hoverScale = useRef(0.25); // Initial state: 20px (80 * 0.25)
    const isHovered = useRef(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Optimized quickSetters for high-performance updates
        const xSet = gsap.quickSetter(cursor, "x", "px");
        const ySet = gsap.quickSetter(cursor, "y", "px");
        const rotateSet = gsap.quickSetter(cursor, "rotation", "deg");
        const scaleXSet = gsap.quickSetter(cursor, "scaleX");
        const scaleYSet = gsap.quickSetter(cursor, "scaleY");

        const onMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            const target = e.target;
            // Added input and textarea to the hoverable list
            const isHoverable = !!target.closest('a, button, h1, h2, h3, h4, h5, h6, p, span, li, input, textarea, .hover-target, .nav-links');

            // Only trigger animation when the hover state actually changes
            if (isHoverable !== isHovered.current) {
                isHovered.current = isHoverable;
                
                gsap.to(hoverScale, {
                    current: isHoverable ? 1.0 : 0.25,
                    duration: 0.4, // Slightly faster for responsiveness
                    ease: "power3.out", // Faster start for immediate response
                    overwrite: "auto"
                });
            }
        };

        const updateCursor = () => {
            // Increased "time offset" (lag) by reducing dt from 0.15 to 0.08
            const dt = 0.08;
            pos.current.x += (mouse.current.x - pos.current.x) * dt;
            pos.current.y += (mouse.current.y - pos.current.y) * dt;

            // Calculate velocity and angle for stretch effect
            const dx = mouse.current.x - pos.current.x;
            const dy = mouse.current.y - pos.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Map distance to a tasteful stretch factor (max 1.5x length)
            // Tuning distance * 0.015 for better response with the new lag
            const stretch = Math.min(distance * 0.015, 0.5); 
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Apply updates with -40px centering offset
            xSet(pos.current.x - 40);
            ySet(pos.current.y - 40);
            rotateSet(angle);
            
            // Combine hover scale with stretch/squish
            scaleXSet(hoverScale.current * (1 + stretch));
            scaleYSet(hoverScale.current * (1 - stretch * 0.6)); // Squish slightly less than stretch for volume feel
        };

        window.addEventListener("mousemove", onMouseMove);
        gsap.ticker.add(updateCursor);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            gsap.ticker.remove(updateCursor);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'difference',
                willChange: 'transform',
                // Center the svg inside the div or ensure the div starts at 0,0
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" fill="white" />
            </svg>
        </div>
    );
};

export default CustomCursor;
