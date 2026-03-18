import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomScrollbar = () => {
    const thumbRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const thumb = thumbRef.current;
        const track = trackRef.current;
        if (!thumb || !track) return;

        let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        let velocity = 0;
        let scrollTimeout;
        let contentHeight = document.documentElement.scrollHeight;
        let lastHeightUpdate = 0;

        const updateScrollbar = () => {
            const now = Date.now();
            const viewportHeight = window.innerHeight;

            // Throttle height calculation to once every 500ms for performance
            if (now - lastHeightUpdate > 500) {
                contentHeight = Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.documentElement.clientHeight
                );
                lastHeightUpdate = now;
            }

            const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            // Calculate scroll percentage
            const scrollPercent = scrollY / Math.max(contentHeight - viewportHeight, 1);

            // Calculate thumb position
            const trackHeight = track.offsetHeight;
            const baseThumbHeight = Math.max((viewportHeight / contentHeight) * trackHeight, 60);
            const maxTravel = trackHeight - baseThumbHeight;
            const thumbY = scrollPercent * maxTravel;

            // Apply position and height (removed stretching)
            gsap.set(thumb, {
                y: thumbY,
                height: baseThumbHeight,
                scaleY: 1, // Reset stretching to 1
                transformOrigin: "center center",
                force3D: true
            });

            // Show tracking feedback on scroll
            if (currentVelocity > 0.3) {
                gsap.to(track, { autoAlpha: 1, duration: 0.2 });
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    gsap.to(track, { autoAlpha: 0, duration: 0.6 });
                }, 1500);
            }
        };

        gsap.ticker.add(updateScrollbar);

        return () => {
            gsap.ticker.remove(updateScrollbar);
            clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <div
            ref={trackRef}
            style={{
                position: 'fixed',
                right: '4px',
                top: '0',
                bottom: '0',
                width: '8px',
                zIndex: 10000,
                backgroundColor: 'transparent', // Hide the track
                opacity: 0,
                pointerEvents: 'none'
            }}
        >
            <div
                ref={thumbRef}
                style={{
                    width: '100%',
                    backgroundColor: '#F07000', // Brand color
                    borderRadius: '10px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    willChange: 'transform' // Optimization for GPU
                }}
            />
        </div>
    );
};

export default CustomScrollbar;
