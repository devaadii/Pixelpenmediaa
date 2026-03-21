import { useEffect } from 'react';
import {
  WebGLRenderer,
  WebGLRenderTarget,
  Scene,
  OrthographicCamera,
  PerspectiveCamera,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  ShaderMaterial,
  Mesh,
  PlaneGeometry,
  AdditiveBlending,
  LinearFilter,
  RGBAFormat,
} from 'three';

/* ------------------------------------------------------------------ */
/*  Background fragment shader — 6-octave FBM nebula                  */
/* ------------------------------------------------------------------ */
const bgVert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const bgFrag = `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p = p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 p  = uv * 2.5 - 1.25;
    p.x    *= uResolution.x / uResolution.y;

    float f  = fbm(p * 1.2 + uTime * 0.025);
    float f2 = fbm(p * 0.9 + f * 0.8 + uTime * 0.015);
    float f3 = fbm(p * 2.0 - f2 + uTime * 0.018);

    vec3 col = vec3(0.02, 0.01, 0.04);
    col = mix(col, vec3(0.06, 0.02, 0.14), smoothstep(0.3, 0.7, f2));
    col = mix(col, vec3(0.12, 0.03, 0.22), smoothstep(0.5, 0.85, f3));
    col = mix(col, vec3(0.02, 0.01, 0.06), smoothstep(0.0, 0.3, uv.y));

    float stars = smoothstep(0.995, 1.0, hash(uv * 600.0 + uTime * 0.001));
    col += stars * 0.9;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ------------------------------------------------------------------ */
/*  Particle vertex shader — simplex noise + antigravity motion       */
/* ------------------------------------------------------------------ */
const particleVert = `
  precision highp float;

  attribute float aRandom;
  attribute float aSize;
  attribute float aOffset;
  attribute vec3  aColor;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uMouseForce;
  uniform float uMouseForceScale;
  uniform float uPixelRatio;

  varying vec3 vColor;

  /* ---- Stefan Gustavson simplex noise (vec3) ---- */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v   - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  /* ---- end simplex noise ---- */

  void main() {
    float t = uTime;
    vec3 pos = position;

    // Antigravity drift
    pos.y += sin(t * 0.65 + aRandom * 6.283) * 0.45;
    pos.x += sin(t * 0.48 + aRandom * 3.14)  * 0.35;
    pos.z += cos(t * 0.38 + aRandom * 2.1)   * 0.28;

    // Curl-like simplex turbulence
    float ns = 0.6;
    pos.x += snoise(vec3(pos.x * ns, pos.y * ns + uTime * 0.09, aRandom)) * 0.45;
    pos.y += snoise(vec3(pos.y * ns + 100.0, pos.z * ns, uTime * 0.07))   * 0.45;
    pos.z += snoise(vec3(pos.z * ns + 200.0, pos.x * ns, uTime * 0.11))   * 0.35;

    // Mouse repulsion
    vec2 mouseWorld = uMouse * 5.5;
    float dist = length(pos.xy - mouseWorld);
    float repulse = smoothstep(2.2, 0.0, dist) * uMouseForce * uMouseForceScale;
    vec2 repelDir = normalize(pos.xy - mouseWorld + 0.001);
    pos.xy += repelDir * repulse;

    vColor = aColor;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (280.0 / -mvPosition.z);
    gl_Position  = projectionMatrix * mvPosition;
  }
`;

const particleFrag = `
  precision highp float;
  varying vec3 vColor;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float glow = exp(-dist * 7.0);
    gl_FragColor = vec4(vColor * glow, glow);
  }
`;

/* ------------------------------------------------------------------ */
/*  Post-processing shaders — bright pass, blur, composite            */
/* ------------------------------------------------------------------ */
const postVert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const brightFrag = `
  precision highp float;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;

  void main() {
    vec4 c = texture2D(tDiffuse, vUv);
    float lum = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
    float threshold = 0.45;
    float b = smoothstep(threshold, threshold + 0.3, lum);
    gl_FragColor = vec4(c.rgb * b, 1.0);
  }
`;

const blurFrag = `
  precision highp float;
  uniform sampler2D tDiffuse;
  uniform vec2 uDir;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 texel = 1.0 / uResolution;
    vec4 sum = vec4(0.0);
    float weights[5];
    weights[0] = 0.227027027;
    weights[1] = 0.1945945946;
    weights[2] = 0.1216216216;
    weights[3] = 0.0540540541;
    weights[4] = 0.0162162162;

    sum += texture2D(tDiffuse, vUv) * weights[0];
    for (int i = 1; i < 5; i++) {
      vec2 off = uDir * texel * float(i) * 2.0;
      sum += texture2D(tDiffuse, vUv + off) * weights[i];
      sum += texture2D(tDiffuse, vUv - off) * weights[i];
    }
    gl_FragColor = sum;
  }
`;

const compositeFrag = `
  precision highp float;
  uniform sampler2D tScene;
  uniform sampler2D tBloom;
  uniform float     uBloomStrength;
  varying vec2 vUv;

  void main() {
    vec4 sceneColor = texture2D(tScene, vUv);
    vec4 bloomColor = texture2D(tBloom, vUv);
    gl_FragColor = vec4(sceneColor.rgb + bloomColor.rgb * uBloomStrength, 1.0);
  }
`;

/* ------------------------------------------------------------------ */
/*  Helper — fullscreen quad                                          */
/* ------------------------------------------------------------------ */
function makePass(fragShader, uniforms) {
  const mat = new ShaderMaterial({
    vertexShader: postVert,
    fragmentShader: fragShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });
  const mesh = new Mesh(new PlaneGeometry(2, 2), mat);
  const scene = new Scene();
  scene.add(mesh);
  return { scene, mesh, material: mat };
}

/* ------------------------------------------------------------------ */
/*  Hook                                                              */
/* ------------------------------------------------------------------ */
export default function useAntigravity(canvasRef, options = {}) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const {
      particleCount: baseCount = 5000,
      bloomStrength = 0.8,
      mouseForceScale = 0.8,
    } = options;

    const isMobile = navigator.maxTouchPoints > 0;
    const particleCount = isMobile ? Math.min(baseCount, 2500) : baseCount;

    /* ---------- renderer ---------- */
    const renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x060606, 1);

    let W = canvas.clientWidth;
    let H = canvas.clientHeight;
    renderer.setSize(W, H, false);

    /* ---------- render targets ---------- */
    function createRT(scale) {
      return new WebGLRenderTarget(Math.floor(W * dpr * scale), Math.floor(H * dpr * scale), {
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        format: RGBAFormat,
      });
    }
    let rtScene     = createRT(1);
    let rtBrightPass = createRT(0.5);
    let rtBlurH     = createRT(0.5);
    let rtBlurV     = createRT(0.5);

    /* ---------- cameras ---------- */
    const ortho = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    ortho.position.z = 1;

    const camera = new PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 6);

    /* ---------- background ---------- */
    const bgScene = new Scene();
    const bgMat = new ShaderMaterial({
      vertexShader: bgVert,
      fragmentShader: bgFrag,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [W * dpr, H * dpr] },
      },
      depthTest: false,
      depthWrite: false,
    });
    const bgMesh = new Mesh(new PlaneGeometry(2, 2), bgMat);
    bgScene.add(bgMesh);

    /* ---------- particles ---------- */
    const particleScene = new Scene();
    const positions = new Float32Array(particleCount * 3);
    const randoms   = new Float32Array(particleCount);
    const sizes     = new Float32Array(particleCount);
    const offsets   = new Float32Array(particleCount);
    const colors    = new Float32Array(particleCount * 3);

    const palette = [
      { w: 0.35, c: [0.5, 0.75, 1.0] },
      { w: 0.25, c: [0.72, 0.42, 1.0] },
      { w: 0.20, c: [0.42, 0.72, 1.0] },
      { w: 0.12, c: [1.0, 0.86, 0.52] },
      { w: 0.08, c: [1.0, 1.0, 1.0] },
    ];

    function pickColor() {
      let r = Math.random();
      for (const entry of palette) {
        r -= entry.w;
        if (r <= 0) return entry.c;
      }
      return palette[0].c;
    }

    for (let i = 0; i < particleCount; i++) {
      // random sphere distribution radius 3.5–6
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const rad   = 3.5 + Math.random() * 2.5;
      positions[i * 3]     = rad * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = rad * Math.cos(phi);
      randoms[i]  = Math.random();
      sizes[i]    = 0.6 + Math.random() * 2.2;
      offsets[i]  = Math.random() * Math.PI * 2;
      const col   = pickColor();
      colors[i * 3]     = col[0];
      colors[i * 3 + 1] = col[1];
      colors[i * 3 + 2] = col[2];
    }

    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geo.setAttribute('aRandom',  new Float32BufferAttribute(randoms, 1));
    geo.setAttribute('aSize',    new Float32BufferAttribute(sizes, 1));
    geo.setAttribute('aOffset',  new Float32BufferAttribute(offsets, 1));
    geo.setAttribute('aColor',   new Float32BufferAttribute(colors, 3));

    const particleMat = new ShaderMaterial({
      vertexShader: particleVert,
      fragmentShader: particleFrag,
      uniforms: {
        uTime:            { value: 0 },
        uMouse:           { value: [0, 0] },
        uMouseForce:      { value: 0 },
        uMouseForceScale: { value: mouseForceScale },
        uPixelRatio:      { value: dpr },
      },
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const points = new Points(geo, particleMat);
    particleScene.add(points);

    /* ---------- post passes ---------- */
    const brightPass = makePass(brightFrag, {
      tDiffuse: { value: null },
    });
    const blurHPass = makePass(blurFrag, {
      tDiffuse:    { value: null },
      uDir:        { value: [1, 0] },
      uResolution: { value: [rtBlurH.width, rtBlurH.height] },
    });
    const blurVPass = makePass(blurFrag, {
      tDiffuse:    { value: null },
      uDir:        { value: [0, 1] },
      uResolution: { value: [rtBlurV.width, rtBlurV.height] },
    });
    const compositePass = makePass(compositeFrag, {
      tScene:         { value: null },
      tBloom:         { value: null },
      uBloomStrength: { value: bloomStrength },
    });

    /* ---------- mouse ---------- */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, force: 0 };
    const parentEl = canvas.parentElement;

    function onMouseMove(e) {
      const rect = parentEl.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.ty = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.force = 1.0;
    }
    parentEl.addEventListener('mousemove', onMouseMove);

    /* ---------- resize ---------- */
    function onResize() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();

      const rW = Math.floor(W * dpr);
      const rH = Math.floor(H * dpr);
      rtScene.setSize(rW, rH);
      rtBrightPass.setSize(Math.floor(rW * 0.5), Math.floor(rH * 0.5));
      rtBlurH.setSize(Math.floor(rW * 0.5), Math.floor(rH * 0.5));
      rtBlurV.setSize(Math.floor(rW * 0.5), Math.floor(rH * 0.5));

      bgMat.uniforms.uResolution.value = [rW, rH];
      blurHPass.material.uniforms.uResolution.value = [rtBlurH.width, rtBlurH.height];
      blurVPass.material.uniforms.uResolution.value = [rtBlurV.width, rtBlurV.height];
    }
    window.addEventListener('resize', onResize);

    /* ---------- visibility ---------- */
    let isVisible = true;
    let rafId = null;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(parentEl);

    function onVisibility() {
      if (document.hidden) isVisible = false;
    }
    document.addEventListener('visibilitychange', onVisibility);

    /* ---------- render loop ---------- */
    function animate() {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // mouse lerp
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.force *= 0.94;

      // update uniforms
      bgMat.uniforms.uTime.value += 0.01;
      particleMat.uniforms.uTime.value += 0.01;
      particleMat.uniforms.uMouse.value = [mouse.x, mouse.y];
      particleMat.uniforms.uMouseForce.value = mouse.force;

      // camera parallax
      camera.position.x += (mouse.x * 0.28 - camera.position.x) * 0.025;
      camera.position.y += (mouse.y * 0.14 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      // 1. Render background to rtScene
      renderer.setRenderTarget(rtScene);
      renderer.render(bgScene, ortho);

      // 2. Render particles on top (no clear, additive)
      renderer.autoClear = false;
      renderer.render(particleScene, camera);
      renderer.autoClear = true;

      // 3. Bright pass
      brightPass.material.uniforms.tDiffuse.value = rtScene.texture;
      renderer.setRenderTarget(rtBrightPass);
      renderer.clear();
      renderer.render(brightPass.scene, ortho);

      // 4. Horizontal blur
      blurHPass.material.uniforms.tDiffuse.value = rtBrightPass.texture;
      renderer.setRenderTarget(rtBlurH);
      renderer.clear();
      renderer.render(blurHPass.scene, ortho);

      // 5. Vertical blur
      blurVPass.material.uniforms.tDiffuse.value = rtBlurH.texture;
      renderer.setRenderTarget(rtBlurV);
      renderer.clear();
      renderer.render(blurVPass.scene, ortho);

      // 6. Composite to screen
      compositePass.material.uniforms.tScene.value = rtScene.texture;
      compositePass.material.uniforms.tBloom.value = rtBlurV.texture;
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(compositePass.scene, ortho);
    }
    animate();

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      parentEl.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
      [rtScene, rtBrightPass, rtBlurH, rtBlurV].forEach((rt) => rt.dispose());
      geo.dispose();
      particleMat.dispose();
      bgMat.dispose();
      brightPass.material.dispose();
      blurHPass.material.dispose();
      blurVPass.material.dispose();
      compositePass.material.dispose();
    };
  }, [canvasRef]);
}
