/**
 * Shree Anjani Belt & Bearing Store — Interactive 3D Precision Bearing Visualizer
 * High-performance WebGL 3D model using Three.js.
 * Features: 360° Orbit Drag, Exploded 3D Disassembly View, Wireframe CAD Mode, and Dynamic Spec Callouts.
 */

(function () {
  'use strict';

  let scene, camera, renderer, bearingGroup;
  let outerRing, innerRing, cage, balls = [], seals = [];
  let isExploded = false;
  let isWireframe = false;
  let isAutoRotating = true;
  let targetExplosion = 0;
  let currentExplosion = 0;

  // Interaction State
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  function init3DBearing() {
    const container = document.getElementById('bearing3DCanvasContainer');
    if (!container || typeof THREE === 'undefined') return;

    // 1. Scene Setup
    scene = new THREE.Scene();

    // 2. Camera Setup
    const width = container.clientWidth || 540;
    const height = container.clientHeight || 360;
    camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 32, 105);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer with Anti-Aliasing
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // Clear existing children
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0f233b, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight1.position.set(50, 60, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.8); // Cyan Rim Light
    dirLight2.position.set(-50, -30, -50);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xff5500, 1.5); // Electric Orange Accent
    dirLight3.position.set(0, -60, 40);
    scene.add(dirLight3);

    const pointLight = new THREE.PointLight(0xffffff, 1.8, 200);
    pointLight.position.set(0, 20, 45);
    scene.add(pointLight);

    // 5. Build 3D Precision Bearing Geometry
    bearingGroup = new THREE.Group();
    scene.add(bearingGroup);

    // Materials
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.15
    });

    const innerChromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      metalness: 0.92,
      roughness: 0.2
    });

    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.05
    });

    const brassCageMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Polished Industrial Brass
      metalness: 0.85,
      roughness: 0.3
    });

    const rubberSealMaterial = new THREE.MeshStandardMaterial({
      color: 0x182430, // 2RS Nitrile Rubber
      metalness: 0.1,
      roughness: 0.85
    });

    // A. Outer Ring (OD = 52mm relative, Height = 14mm)
    const outerRingGeo = new THREE.CylinderGeometry(28, 28, 14, 48, 1, true);
    outerRing = new THREE.Mesh(outerRingGeo, chromeMaterial);
    
    // Outer Ring Thickness Cap & Flange
    const outerRingBevelGeo = new THREE.RingGeometry(22, 28, 48);
    const outerCapTop = new THREE.Mesh(outerRingBevelGeo, chromeMaterial);
    outerCapTop.position.y = 7;
    outerCapTop.rotation.x = -Math.PI / 2;
    const outerCapBot = new THREE.Mesh(outerRingBevelGeo, chromeMaterial);
    outerCapBot.position.y = -7;
    outerCapBot.rotation.x = Math.PI / 2;
    outerRing.add(outerCapTop);
    outerRing.add(outerCapBot);
    bearingGroup.add(outerRing);

    // B. Inner Ring (Bore = 25mm relative, OD = 34mm)
    const innerRingGeo = new THREE.CylinderGeometry(14, 14, 14, 48, 1, true);
    innerRing = new THREE.Mesh(innerRingGeo, innerChromeMaterial);
    
    const innerRingBevelGeo = new THREE.RingGeometry(14, 19, 48);
    const innerCapTop = new THREE.Mesh(innerRingBevelGeo, innerChromeMaterial);
    innerCapTop.position.y = 7;
    innerCapTop.rotation.x = -Math.PI / 2;
    const innerCapBot = new THREE.Mesh(innerRingBevelGeo, innerChromeMaterial);
    innerCapBot.position.y = -7;
    innerCapBot.rotation.x = Math.PI / 2;
    innerRing.add(innerCapTop);
    innerRing.add(innerCapBot);
    bearingGroup.add(innerRing);

    // C. 8x Grade 10 Chrome Steel Balls
    const ballRadius = 4.2;
    const pitchRadius = 20.5;
    const ballGeo = new THREE.SphereGeometry(ballRadius, 32, 32);

    balls = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const ball = new THREE.Mesh(ballGeo, ballMaterial);
      ball.position.x = Math.cos(angle) * pitchRadius;
      ball.position.z = Math.sin(angle) * pitchRadius;
      ball.position.y = 0;
      ball.userData = { initialAngle: angle, pitchRadius: pitchRadius };
      balls.push(ball);
      bearingGroup.add(ball);
    }

    // D. Brass / Steel Retainer Cage
    const cageGeo = new THREE.TorusGeometry(pitchRadius, 1.4, 16, 48);
    cage = new THREE.Mesh(cageGeo, brassCageMaterial);
    cage.rotation.x = Math.PI / 2;
    bearingGroup.add(cage);

    // E. Dual 2RS Nitrile Rubber Seals (Front & Back)
    const sealGeo = new THREE.RingGeometry(18.5, 23, 48);
    const frontSeal = new THREE.Mesh(sealGeo, rubberSealMaterial);
    frontSeal.position.y = 6.2;
    frontSeal.rotation.x = -Math.PI / 2;
    
    const backSeal = new THREE.Mesh(sealGeo, rubberSealMaterial);
    backSeal.position.y = -6.2;
    backSeal.rotation.x = Math.PI / 2;

    seals = [frontSeal, backSeal];
    bearingGroup.add(frontSeal);
    bearingGroup.add(backSeal);

    // Initial Angle tilt for dynamic blueprint perspective
    bearingGroup.rotation.x = 0.55;
    bearingGroup.rotation.y = 0.45;

    // 6. Interactive Mouse / Touch Orbit Controls
    setupInteractionControls(container);

    // 7. Animation Loop
    animate();

    // 8. Responsive Resize Listener
    window.addEventListener('resize', onWindowResize);
  }

  function setupInteractionControls(container) {
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      isAutoRotating = false;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging || !bearingGroup) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      bearingGroup.rotation.y += deltaX * 0.008;
      bearingGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch Support for Mobile
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        isAutoRotating = false;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !bearingGroup || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      bearingGroup.rotation.y += deltaX * 0.008;
      bearingGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });
  }

  function onWindowResize() {
    const container = document.getElementById('bearing3DCanvasContainer');
    if (!container || !camera || !renderer) return;
    const width = container.clientWidth;
    const height = container.clientHeight || 360;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    requestAnimationFrame(animate);

    // Auto Rotation when not dragging
    if (isAutoRotating && !isDragging && bearingGroup) {
      bearingGroup.rotation.y += 0.007;
      bearingGroup.rotation.x = 0.55 + Math.sin(Date.now() * 0.001) * 0.08;
    }

    // Smooth Lerp for 3D Exploded View Disassembly
    currentExplosion += (targetExplosion - currentExplosion) * 0.08;

    if (outerRing && innerRing && cage) {
      outerRing.position.y = currentExplosion * 22;
      innerRing.position.y = -currentExplosion * 22;
      cage.position.y = currentExplosion * 6;

      if (seals[0]) seals[0].position.y = 6.2 + (currentExplosion * 32);
      if (seals[1]) seals[1].position.y = -6.2 - (currentExplosion * 32);

      // Rotate individual balls around axis
      const speed = Date.now() * 0.002;
      balls.forEach((ball) => {
        const angle = ball.userData.initialAngle + (isAutoRotating ? speed : 0);
        ball.position.x = Math.cos(angle) * (ball.userData.pitchRadius + (currentExplosion * 4));
        ball.position.z = Math.sin(angle) * (ball.userData.pitchRadius + (currentExplosion * 4));
        ball.position.y = Math.sin(angle * 2) * currentExplosion * 3;
      });
    }

    renderer.render(scene, camera);
  }

  // ================= EXPOSED 3D CONTROLLER FUNCTIONS =================
  window.toggle3DExplodedView = function () {
    isExploded = !isExploded;
    targetExplosion = isExploded ? 1.0 : 0.0;
    const btn = document.getElementById('btnToggleExplode');
    if (btn) {
      btn.innerHTML = isExploded 
        ? '<i class="fa-solid fa-compress text-orange"></i> Assemble 3D' 
        : '<i class="fa-solid fa-arrows-split-up-and-left text-orange"></i> 3D Exploded View';
      btn.classList.toggle('active', isExploded);
    }
  };

  window.toggle3DWireframe = function () {
    isWireframe = !isWireframe;
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.material.wireframe = isWireframe;
      }
    });
    const btn = document.getElementById('btnToggleWireframe');
    if (btn) {
      btn.innerHTML = isWireframe 
        ? '<i class="fa-solid fa-cube text-cyan"></i> Solid Chrome' 
        : '<i class="fa-solid fa-border-none text-cyan"></i> CAD Wireframe';
      btn.classList.toggle('active', isWireframe);
    }
  };

  window.toggle3DAutoRotate = function () {
    isAutoRotating = !isAutoRotating;
    const btn = document.getElementById('btnToggleAutoRotate');
    if (btn) {
      btn.innerHTML = isAutoRotating 
        ? '<i class="fa-solid fa-pause text-emerald"></i> Pause Spin' 
        : '<i class="fa-solid fa-play text-emerald"></i> 360° Spin';
      btn.classList.toggle('active', isAutoRotating);
    }
  };

  window.highlight3DPart = function (partName) {
    const infoCard = document.getElementById('active3DPartInfo');
    if (!infoCard) return;

    const partSpecs = {
      outer: {
        title: 'OUTER RACEWAY (GCr15 ALLOY STEEL)',
        specs: 'OD: 52mm • Hardness: HRC 60-64 • Superfinished raceway curvature (<0.02μm roughness)'
      },
      inner: {
        title: 'INNER RACEWAY & SHAFT BORE',
        specs: 'Bore: 25mm • Interference fit h6/k5 • Precision ground inner raceway'
      },
      balls: {
        title: 'GRADE 10 CHROME STEEL BALLS',
        specs: '8x Spheres • ISO 3290 Sphericity ≤0.05μm • Mirror polish specular finish'
      },
      cage: {
        title: 'RIVETED SOLID BRASS / STEEL CAGE',
        specs: 'Even ball spacing • Pocket design reduces centrifugal friction at 12,000 RPM'
      },
      seals: {
        title: '2RS DUAL NITRILE RUBBER SEALS',
        specs: 'Double-lip contact seal • Factory filled with lithium complex high-temp grease'
      }
    };

    const target = partSpecs[partName] || partSpecs.outer;
    infoCard.innerHTML = `
      <div style="color: var(--cyan-accent); font-weight: 700; font-size: 0.85rem; font-family: var(--font-display);">${target.title}</div>
      <div style="color: #E2E8F0; font-size: 0.775rem; margin-top: 0.2rem;">${target.specs}</div>
    `;
  };

  // Initialize on Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DBearing);
  } else {
    init3DBearing();
  }

})();
