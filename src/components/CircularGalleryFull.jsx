/**
 * Full Circular Gallery Implementation
 * Based on ReactBits CircularGallery with OGL
 */

import React, { useEffect, useRef } from 'react';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function createTextTexture(gl, text, font = 'bold 30px Inter', color = '#ffffff') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 40;
  canvas.height = textHeight + 40;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  
  const { Texture } = window.OGL;
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Media {
  constructor({ gl, geometry, image, text, index, length, scene, viewport, screen, renderer, bend = 3, textColor = '#ffffff', borderRadius = 0.05 }) {
    this.gl = gl;
    this.geometry = geometry;
    this.image = image;
    this.text = text;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.viewport = viewport;
    this.screen = screen;
    this.renderer = renderer;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.extra = 0;
    
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  
  createShader() {
    const { Texture, Program } = window.OGL;
    const texture = new Texture(this.gl, { generateMipmaps: true });
    
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }
  
  createMesh() {
    const { Mesh } = window.OGL;
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }
  
  createTitle() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, 'bold 24px Inter', this.textColor);
    const { Plane, Program, Mesh } = window.OGL;
    
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    
    this.titleMesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.2;
    const textWidth = textHeight * aspect;
    this.titleMesh.scale.set(textWidth, textHeight, 1);
    this.titleMesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.1;
    this.titleMesh.setParent(this.plane);
  }
  
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }
    
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (700 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (600 * this.scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    
    this.padding = 1.5;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class CircularGalleryApp {
  constructor(container, { items, bend = 3, textColor = '#ffffff', borderRadius = 0.05, scrollSpeed = 2, scrollEase = 0.05, onItemClick }) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.onItemClick = onItemClick;
    
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius);
    this.update();
    this.addEventListeners();
  }
  
  createRenderer() {
    const { Renderer } = window.OGL;
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  
  createCamera() {
    const { Camera } = window.OGL;
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  
  createScene() {
    const { Transform } = window.OGL;
    this.scene = new Transform();
  }
  
  createGeometry() {
    const { Plane } = window.OGL;
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }
  
  createMedias(items, bend, textColor, borderRadius) {
    const galleryItems = items.concat(items);
    this.medias = galleryItems.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        text: data.text,
        index,
        length: galleryItems.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius
      });
    });
  }
  
  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }
  
  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }
  
  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }
  
  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }
  
  onClick(e) {
    if (this.onItemClick && this.medias && this.medias.length > 0) {
      const width = this.medias[0].width;
      const itemIndex = Math.round(Math.abs(this.scroll.current) / width) % (this.medias.length / 2);
      if (this.onItemClick) {
        this.onItemClick(itemIndex);
      }
    }
  }
  
  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }
  
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnClick = this.onClick.bind(this);
    
    window.addEventListener('resize', this.boundOnResize);
    this.container.addEventListener('wheel', this.boundOnWheel);
    this.container.addEventListener('mousedown', this.boundOnTouchDown);
    this.container.addEventListener('click', this.boundOnClick);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    this.container.addEventListener('touchstart', this.boundOnTouchDown);
    this.container.addEventListener('touchmove', this.boundOnTouchMove);
    this.container.addEventListener('touchend', this.boundOnTouchUp);
  }
  
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    this.container.removeEventListener('wheel', this.boundOnWheel);
    this.container.removeEventListener('mousedown', this.boundOnTouchDown);
    this.container.removeEventListener('click', this.boundOnClick);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    this.container.removeEventListener('touchstart', this.boundOnTouchDown);
    this.container.removeEventListener('touchmove', this.boundOnTouchMove);
    this.container.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGalleryFull({ items, bend = 3, textColor = '#ffffff', borderRadius = 0.05, scrollSpeed = 2, scrollEase = 0.05, onItemClick }) {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !window.OGL) return;
    
    appRef.current = new CircularGalleryApp(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      scrollSpeed,
      scrollEase,
      onItemClick
    });
    
    return () => {
      if (appRef.current) {
        appRef.current.destroy();
      }
    };
  }, [items, bend, textColor, borderRadius, scrollSpeed, scrollEase, onItemClick]);

  return <div className="circular-gallery" ref={containerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />;
}

// Make it available globally
if (typeof window !== 'undefined') {
  window.CircularGalleryFull = CircularGalleryFull;
  window.CircularGalleryApp = CircularGalleryApp;
}

