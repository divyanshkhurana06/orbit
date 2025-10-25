import React, { useEffect, useRef } from 'react';

/**
 * CircularGallery Component  
 * WebGL-powered circular gallery for groups
 */
export default function CircularGallery({ items, onItemClick }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !window.OGL) return;

        const { Camera, Renderer, Transform } = window.OGL;

        const renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2)
        });

        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        containerRef.current.appendChild(gl.canvas);

        const camera = new Camera(gl);
        camera.fov = 45;
        camera.position.z = 20;

        const scene = new Transform();

        const onResize = () => {
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            renderer.setSize(width, height);
            camera.perspective({ aspect: width / height });
        };

        onResize();
        window.addEventListener('resize', onResize);

        let scroll = { current: 0, target: 0, last: 0, ease: 0.05 };
        let isDown = false;
        let start = 0;
        let position = 0;

        const onWheel = (e) => {
            const delta = e.deltaY || e.wheelDelta || e.detail;
            scroll.target += (delta > 0 ? 2 : -2) * 0.2;
        };

        const onMouseDown = (e) => {
            isDown = true;
            start = e.clientX;
            position = scroll.current;
        };

        const onMouseMove = (e) => {
            if (!isDown) return;
            const x = e.clientX;
            const distance = (start - x) * 0.05;
            scroll.target = position + distance;
        };

        const onMouseUp = () => {
            isDown = false;
        };

        const onClick = (e) => {
            if (onItemClick && items.length > 0) {
                // Simple click detection - in production would map to actual items
                const index = Math.floor(Math.random() * items.length);
                onItemClick(items[index]);
            }
        };

        containerRef.current.addEventListener('wheel', onWheel);
        containerRef.current.addEventListener('mousedown', onMouseDown);
        containerRef.current.addEventListener('click', onClick);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        function lerp(p1, p2, t) {
            return p1 + (p2 - p1) * t;
        }

        function update() {
            scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
            renderer.render({ scene, camera });
            requestAnimationFrame(update);
        }

        update();

        return () => {
            window.removeEventListener('resize', onResize);
            if (containerRef.current) {
                containerRef.current.removeEventListener('wheel', onWheel);
                containerRef.current.removeEventListener('mousedown', onMouseDown);
                containerRef.current.removeEventListener('click', onClick);
            }
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            if (gl.canvas.parentNode) {
                gl.canvas.parentNode.removeChild(gl.canvas);
            }
        };
    }, [items, onItemClick]);

    return (
        <div className="webgl-gallery-container">
            <div className="circular-gallery" ref={containerRef} />
        </div>
    );
}

