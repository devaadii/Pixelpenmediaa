import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Buttery smooth delay (1s follow time)
        const xTo = gsap.quickTo(cursor, "x", { duration: 1, ease: "power4.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 1, ease: "power4.out" });

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            xTo(clientX);
            yTo(clientY);

            const target = e.target;
            const isHoverable = target.closest('a, button, h1, h2, h3, h4, h5, h6, p, span, li, .hover-target, .nav-links');

            if (isHoverable) {
                gsap.to(cursor, {
                    scale: 1, // 1:1 with base size (80px)
                    duration: 0.5,
                    ease: "power3.out"
                });
            } else {
                gsap.to(cursor, {
                    scale: 0.25, // Dots becomes 20px (80 * 0.25)
                    duration: 0.5,
                    ease: "power3.out"
                });
            }
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
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
                transform: 'translate(-50%, -50%) scale(0.25)', // Initial scale for 20px
            }}
        >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" fill="white" />
            </svg>
        </div>
    );
};

export default CustomCursor;
