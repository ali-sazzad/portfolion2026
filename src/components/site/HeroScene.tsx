"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { types } from "@theatre/core";
import { createHeroSheet, SEQUENCE_LENGTH, type BlobValues } from "@/lib/heroSequence";

gsap.registerPlugin(ScrollTrigger);

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  uniform vec2 uPointer;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;

  // Simplex noise by Ian McEwan, Ashima Arts (MIT)
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
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
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 p = position;
    float n = snoise(p * 1.25 + vec3(uTime * 0.35, uTime * 0.2, uPointer.x * 0.6));
    float swell = 0.18 + 0.12 * length(uPointer);
    float d = n * uDistort * swell;
    vec3 displaced = p + normal * d;
    vNoise = n;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform float uGlow;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 L = normalize(vec3(-0.55, 0.75, 0.65));
    float diff = dot(n, L);
    float fres = pow(1.0 - max(dot(n, vView), 0.0), 4.0);
    vec3 H = normalize(L + vView);
    float spec = pow(max(dot(n, H), 0.0), 60.0);

    vec3 deep = vec3(0.02, 0.03, 0.22);
    vec3 mid = vec3(0.16, 0.21, 0.95);
    vec3 butter = vec3(1.0, 0.85, 0.30);

    vec3 col = mix(deep, mid, smoothstep(-0.5, 0.35, diff));
    col = mix(col, butter, smoothstep(0.35, 0.85, diff) * (0.5 + 0.5 * uGlow));
    // Topographic contour lines read as a deliberate surface, not a blur.
    float contour = smoothstep(0.42, 0.5, abs(fract(vNoise * 5.0) - 0.5));
    col = mix(col, col * 0.55, contour * 0.5);
    col += fres * vec3(1.0, 0.96, 0.85) * 0.9;
    col += spec * 0.8;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/** Hero WebGL: a shader blob timed by Theatre.js and nudged by pointer and scroll (GSAP). */
export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the cobalt hero still works without the blob.
    }

    const small = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.z = 6;

    const uniforms = {
      uTime: { value: 0 },
      uDistort: { value: 1 },
      uGlow: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
    };
    const geo = new THREE.IcosahedronGeometry(1.5, small ? 48 : 96);
    const mat = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms });
    const blob = new THREE.Mesh(geo, mat);
    scene.add(blob);

    // Theatre drives these; the render loop reads them.
    const timeline: BlobValues = { scale: 1, distort: 0.38, spin: 0.6, x: 0.5, y: 0, glow: 0.7 };
    const scroll = { p: 0 };
    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // On narrow screens move the blob down behind the text instead of beside it.
      camera.position.z = w < 768 ? 8 : 6;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    if (!reduce) window.addEventListener("pointermove", onMove);

    // GSAP ScrollTrigger: the blob rises, grows and spins as the hero leaves.
    const st = ScrollTrigger.create({
      trigger: el.parentElement,
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => (scroll.p = self.progress),
    });

    // Theatre.js timeline.
    let disposed = false;
    let unsubscribe: (() => void) | undefined;
    createHeroSheet().then(({ project, sheet }) => {
      if (disposed) return;
      const obj = sheet.object("Blob", {
        scale: types.number(timeline.scale, { range: [0, 2] }),
        distort: types.number(timeline.distort, { range: [0, 2] }),
        spin: types.number(timeline.spin, { range: [-6, 6] }),
        x: types.number(timeline.x, { range: [-2, 2] }),
        y: types.number(timeline.y, { range: [-2, 2] }),
        glow: types.number(timeline.glow, { range: [0, 1] }),
      });
      unsubscribe = obj.onValuesChange((v) => Object.assign(timeline, v));
      project.ready.then(() => {
        if (disposed) return;
        if (reduce) sheet.sequence.position = SEQUENCE_LENGTH;
        else sheet.sequence.play({ iterationCount: 1, range: [0, SEQUENCE_LENGTH], rate: 1 });
      });
    });

    const t0 = performance.now();
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = (performance.now() - t0) / 1000;

      pointer.sx += (pointer.x - pointer.sx) * 0.06;
      pointer.sy += (pointer.y - pointer.sy) * 0.06;

      const narrow = el.clientWidth < 768;
      uniforms.uTime.value = reduce ? 2 : t;
      uniforms.uDistort.value = timeline.distort;
      uniforms.uGlow.value = timeline.glow;
      uniforms.uPointer.value.set(pointer.sx, pointer.sy);

      const s = timeline.scale * (1 + scroll.p * 0.5) * (narrow ? 0.62 : 1);
      blob.scale.setScalar(s);
      blob.position.set(
        (narrow ? 1.0 : timeline.x * 2.2) + pointer.sx * 0.25,
        (narrow ? 1.0 : timeline.y) + scroll.p * 2.2 + pointer.sy * 0.2,
        0,
      );
      blob.rotation.y = timeline.spin + pointer.sx * 0.5 + scroll.p * 2;
      blob.rotation.x = pointer.sy * -0.3 + scroll.p * 0.8;

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      unsubscribe?.();
      st.kill();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="absolute inset-0" />;
}
