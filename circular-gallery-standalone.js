// Standalone Circular Gallery for Orbit
// Wait for OGL to be loaded before initializing

(function() {
  // Wait for OGL to be available
  function initCircularGallery() {
    if (typeof window.OGL === 'undefined' || !window.OGLReady) {
      console.log('Waiting for OGL to load...');
      setTimeout(initCircularGallery, 100);
      return;
    }
    
    console.log('✅ OGL loaded, initializing CircularGalleryApp');

window.CircularGalleryApp = class {
  constructor(container, config) {
    this.container = container;
    this.config = {
      items: config.items || [],
      bend: config.bend || 3,
      textColor: config.textColor || '#ffffff',
      borderRadius: config.borderRadius || 0.05,
      scrollSpeed: config.scrollSpeed || 2,
      scrollEase: config.scrollEase || 0.05,
      onItemClick: config.onItemClick || null
    };
    
    this.scroll = { ease: this.config.scrollEase, current: 0, target: 0, last: 0 };
    this.init();
  }
  
  init() {
    if (!window.OGL) {
      console.error('OGL library not loaded!');
      return;
    }
    
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.addEventListeners();
    this.update();
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
  
  createMedias() {
    const items = this.config.items.concat(this.config.items);
    this.medias = items.map((item, index) => this.createMedia(item, index, items.length));
  }
  
  createMedia(item, index, length) {
    const { Texture, Program, Mesh } = window.OGL;
    
    // Create texture
    const texture = new Texture(this.gl, { generateMipmaps: true });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = item.image;
    
    // Create program
    const program = new Program(this.gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = sin(p.x * 2.0 + uTime) * 0.3;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(tMap, vUv);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uTime: { value: 0 }
      }
    });
    
    img.onload = () => {
      texture.image = img;
    };
    
    // Create mesh
    const mesh = new Mesh(this.gl, {
      geometry: this.planeGeometry,
      program: program
    });
    mesh.setParent(this.scene);
    
    return { mesh, program, index, length, item };
  }
  
  update() {
    const lerp = (a, b, t) => a + (b - a) * t;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    
    if (this.medias) {
      this.medias.forEach((media, i) => {
        const scale = 4;
        const x = (i - this.scroll.current * 0.1) * scale;
        media.mesh.position.x = x;
        media.mesh.scale.set(3, 3, 1);
        media.program.uniforms.uTime.value += 0.01;
        
        // Circular arrangement
        const angle = (i / this.medias.length) * Math.PI * 2;
        const radius = 5;
        media.mesh.position.y = Math.sin(angle + this.scroll.current * 0.01) * radius * 0.5;
      });
    }
    
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = requestAnimationFrame(() => this.update());
  }
  
  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.perspective({ aspect: width / height });
  }
  
  addEventListeners() {
    this.boundOnResize = () => this.onResize();
    this.boundOnWheel = (e) => {
      this.scroll.target += e.deltaY * 0.001;
    };
    
    window.addEventListener('resize', this.boundOnResize);
    this.container.addEventListener('wheel', this.boundOnWheel);
  }
  
  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    this.container.removeEventListener('wheel', this.boundOnWheel);
    if (this.gl.canvas.parentNode) {
      this.gl.canvas.parentNode.removeChild(this.gl.canvas);
    }
  }
};

  } // End initCircularGallery
  
  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCircularGallery);
  } else {
    initCircularGallery();
  }
})();
