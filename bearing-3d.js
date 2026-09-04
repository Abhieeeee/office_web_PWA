/**
 * Shree Anjani Belt & Bearing Store — Ultra-Premium Multi-Type 3D Bearing WebGL Engine
 * Supports:
 * 1. Deep Groove Ball Bearing (6200/6300 Series)
 * 2. Spherical Roller Bearing (22200 Series with W33 Lube Groove)
 * 3. Tapered Roller Bearing (30200 Series Conical Cup & Cone)
 * 4. Pillow Block Unit (UCP 200 Series Cast Iron Housing & Insert)
 */

(function () {
  'use strict';

  let scene, camera, renderer, currentBearingGroup;
  let activeBearingType = 'deep_groove'; // 'deep_groove', 'spherical_roller', 'taper_roller', 'pillow_block'
  let isExploded = false;
  let isWireframe = false;
  let isAutoRotating = true;
  let targetExplosion = 0;
  let currentExplosion = 0;

  // Active Parts references for animation
  let animatedParts = {
    outer: null,
    inner: null,
    cage: null,
    elements: [],
    seals: [],
    housing: null
  };

  // Interaction State
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  // Materials Cache
  let materials = {};

  function initMaterials() {
    materials.chrome = new THREE.MeshStandardMaterial({
      color: 0xecf0f1,
      metalness: 0.96,
      roughness: 0.12,
      envMapIntensity: 1.5
    });

    materials.innerChrome = new THREE.MeshStandardMaterial({
      color: 0xd5dbdb,
      metalness: 0.94,
      roughness: 0.18
    });

    materials.steelBall = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.04
    });

    materials.brassCage = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Polished golden brass
      metalness: 0.88,
      roughness: 0.25
    });

    materials.steelCage = new THREE.MeshStandardMaterial({
      color: 0x95a5a6,
      metalness: 0.85,
      roughness: 0.35
    });

    materials.rubberSeal = new THREE.MeshStandardMaterial({
      color: 0x1a252f, // 2RS Nitrile Rubber
      metalness: 0.05,
      roughness: 0.9
    });

    materials.sealLip = new THREE.MeshStandardMaterial({
      color: 0xff5500, // Electric Orange accent seal lip
      metalness: 0.2,
      roughness: 0.7
    });

    materials.castIronHousing = new THREE.MeshStandardMaterial({
      color: 0x1f3a52, // Industrial Hammertone Teal / Blue
      metalness: 0.45,
      roughness: 0.65
    });

    materials.greaseNipple = new THREE.MeshStandardMaterial({
      color: 0xf1c40f, // Brass Zerk fitting
      metalness: 0.9,
      roughness: 0.2
    });
  }

  function init3DBearing() {
    const container = document.getElementById('bearing3DCanvasContainer');
    if (!container || typeof THREE === 'undefined') return;

    initMaterials();

    // 1. Scene Setup
    scene = new THREE.Scene();

    // 2. Camera Setup
    const width = container.clientWidth || 540;
    const height = container.clientHeight || 340;
    camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 30, 110);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer with Anti-Aliasing & ACES Tone Mapping
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0f243a, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.6);
    dirLight1.position.set(50, 60, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0); // Cyan Rim
    dirLight2.position.set(-60, -30, -50);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xff5500, 1.8); // Orange Accent
    dirLight3.position.set(0, -60, 45);
    scene.add(dirLight3);

    const pointLight = new THREE.PointLight(0xffffff, 1.8, 180);
    pointLight.position.set(0, 20, 50);
    scene.add(pointLight);

    // 5. Build Initial 3D Bearing Model
    buildBearingModel(activeBearingType);

    // 6. Interaction Controls
    setupInteractionControls(container);

    // 7. Render Loop
    animate();

    // 8. Resize Listener
    window.addEventListener('resize', onWindowResize);
  }

  // ================= 3D MODEL BUILDERS FOR 4 BEARING TYPES =================
  function buildBearingModel(type) {
    if (currentBearingGroup) {
      scene.remove(currentBearingGroup);
      currentBearingGroup.traverse(child => {
        if (child.geometry) child.geometry.dispose();
      });
    }

    currentBearingGroup = new THREE.Group();
    animatedParts = { outer: null, inner: null, cage: null, elements: [], seals: [], housing: null };
    currentExplosion = 0;
    targetExplosion = isExploded ? 1.0 : 0.0;

    if (type === 'deep_groove') {
      buildDeepGrooveModel();
    } else if (type === 'spherical_roller') {
      buildSphericalRollerModel();
    } else if (type === 'taper_roller') {
      buildTaperRollerModel();
    } else if (type === 'pillow_block') {
      buildPillowBlockModel();
    }

    // Default angle tilt for optimal 3D perspective
    currentBearingGroup.rotation.x = 0.55;
    currentBearingGroup.rotation.y = 0.45;

    // Apply wireframe if active
    if (isWireframe) {
      currentBearingGroup.traverse(obj => {
        if (obj.isMesh && obj.material) obj.material.wireframe = true;
      });
    }

    scene.add(currentBearingGroup);
  }

  // 1. Deep Groove Ball Bearing (6200/6300 Series)
  function buildDeepGrooveModel() {
    // Outer Ring
    const outerGeo = new THREE.CylinderGeometry(28, 28, 14, 48, 1, true);
    const outerMesh = new THREE.Mesh(outerGeo, materials.chrome);
    const outerCapGeo = new THREE.RingGeometry(22, 28, 48);
    const capTop = new THREE.Mesh(outerCapGeo, materials.chrome);
    capTop.position.y = 7; capTop.rotation.x = -Math.PI / 2;
    const capBot = new THREE.Mesh(outerCapGeo, materials.chrome);
    capBot.position.y = -7; capBot.rotation.x = Math.PI / 2;
    outerMesh.add(capTop); outerMesh.add(capBot);
    animatedParts.outer = outerMesh;
    currentBearingGroup.add(outerMesh);

    // Inner Ring
    const innerGeo = new THREE.CylinderGeometry(14, 14, 14, 48, 1, true);
    const innerMesh = new THREE.Mesh(innerGeo, materials.innerChrome);
    const innerCapGeo = new THREE.RingGeometry(14, 19, 48);
    const inCapTop = new THREE.Mesh(innerCapGeo, materials.innerChrome);
    inCapTop.position.y = 7; inCapTop.rotation.x = -Math.PI / 2;
    const inCapBot = new THREE.Mesh(innerCapGeo, materials.innerChrome);
    inCapBot.position.y = -7; inCapBot.rotation.x = Math.PI / 2;
    innerMesh.add(inCapTop); innerMesh.add(inCapBot);
    animatedParts.inner = innerMesh;
    currentBearingGroup.add(innerMesh);

    // 8 Chrome Balls
    const pitchRadius = 20.5;
    const ballGeo = new THREE.SphereGeometry(4.2, 32, 32);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const ball = new THREE.Mesh(ballGeo, materials.steelBall);
      ball.position.set(Math.cos(angle) * pitchRadius, 0, Math.sin(angle) * pitchRadius);
      ball.userData = { initialAngle: angle, pitchRadius: pitchRadius, type: 'ball' };
      animatedParts.elements.push(ball);
      currentBearingGroup.add(ball);
    }

    // Brass Retainer Cage
    const cageGeo = new THREE.TorusGeometry(pitchRadius, 1.4, 16, 48);
    const cageMesh = new THREE.Mesh(cageGeo, materials.brassCage);
    cageMesh.rotation.x = Math.PI / 2;
    animatedParts.cage = cageMesh;
    currentBearingGroup.add(cageMesh);

    // Dual 2RS Nitrile Rubber Seals
    const sealGeo = new THREE.RingGeometry(18.5, 23, 48);
    const frontSeal = new THREE.Mesh(sealGeo, materials.rubberSeal);
    frontSeal.position.y = 6.2; frontSeal.rotation.x = -Math.PI / 2;
    const backSeal = new THREE.Mesh(sealGeo, materials.rubberSeal);
    backSeal.position.y = -6.2; backSeal.rotation.x = Math.PI / 2;
    animatedParts.seals = [frontSeal, backSeal];
    currentBearingGroup.add(frontSeal);
    currentBearingGroup.add(backSeal);
  }

  // 2. Spherical Roller Bearing (22200 Series) - Self-Aligning Double Row Barrels
  function buildSphericalRollerModel() {
    // Outer Ring with Spherical Concave Raceway & W33 Lubrication Groove
    const outerGeo = new THREE.CylinderGeometry(30, 30, 18, 48, 1, true);
    const outerMesh = new THREE.Mesh(outerGeo, materials.chrome);
    const outerCapGeo = new THREE.RingGeometry(24, 30, 48);
    const capTop = new THREE.Mesh(outerCapGeo, materials.chrome);
    capTop.position.y = 9; capTop.rotation.x = -Math.PI / 2;
    const capBot = new THREE.Mesh(outerCapGeo, materials.chrome);
    capBot.position.y = -9; capBot.rotation.x = Math.PI / 2;
    
    // W33 Center Oil Ring Groove
    const w33Geo = new THREE.TorusGeometry(30.2, 0.6, 8, 48);
    const w33Mesh = new THREE.Mesh(w33Geo, materials.sealLip);
    outerMesh.add(w33Mesh); outerMesh.add(capTop); outerMesh.add(capBot);
    animatedParts.outer = outerMesh;
    currentBearingGroup.add(outerMesh);

    // Inner Ring with Double Raceway Guides
    const innerGeo = new THREE.CylinderGeometry(15, 15, 18, 48, 1, true);
    const innerMesh = new THREE.Mesh(innerGeo, materials.innerChrome);
    const innerCapGeo = new THREE.RingGeometry(15, 20, 48);
    const inCapTop = new THREE.Mesh(innerCapGeo, materials.innerChrome);
    inCapTop.position.y = 9; inCapTop.rotation.x = -Math.PI / 2;
    const inCapBot = new THREE.Mesh(innerCapGeo, materials.innerChrome);
    inCapBot.position.y = -9; inCapBot.rotation.x = Math.PI / 2;
    innerMesh.add(inCapTop); innerMesh.add(inCapBot);
    animatedParts.inner = innerMesh;
    currentBearingGroup.add(innerMesh);

    // Double Row of Barrel Rollers (16 Total: 8 Top Row + 8 Bottom Row, tilted at 12°)
    const pitchRadius = 22;
    const rollerGeo = new THREE.CylinderGeometry(3.2, 3.2, 6.5, 24);
    
    for (let row = -1; row <= 1; row += 2) {
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + (row === 1 ? 0.35 : 0);
        const roller = new THREE.Mesh(rollerGeo, materials.steelBall);
        const yOffset = row * 4.2;
        roller.position.set(Math.cos(angle) * pitchRadius, yOffset, Math.sin(angle) * pitchRadius);
        // Tilt roller along self-aligning spherical angle
        roller.rotation.z = row * 0.22;
        roller.rotation.y = angle;
        roller.userData = { initialAngle: angle, pitchRadius: pitchRadius, yOffset: yOffset, row: row, type: 'spherical' };
        animatedParts.elements.push(roller);
        currentBearingGroup.add(roller);
      }
    }

    // Heavy-Duty Machined Brass Guide Ring & Cage
    const cageGeo = new THREE.TorusGeometry(pitchRadius, 1.8, 16, 48);
    const cageMesh = new THREE.Mesh(cageGeo, materials.brassCage);
    cageMesh.rotation.x = Math.PI / 2;
    animatedParts.cage = cageMesh;
    currentBearingGroup.add(cageMesh);
  }

  // 3. Tapered Roller Bearing (30200 Series) - Conical Cup & Cone
  function buildTaperRollerModel() {
    // Outer Cup (Tapered Inner Bore)
    const cupGeo = new THREE.CylinderGeometry(29, 25, 14, 48, 1, true);
    const cupMesh = new THREE.Mesh(cupGeo, materials.chrome);
    const cupCapGeo = new THREE.RingGeometry(22, 29, 48);
    const capTop = new THREE.Mesh(cupCapGeo, materials.chrome);
    capTop.position.y = 7; capTop.rotation.x = -Math.PI / 2;
    const capBot = new THREE.Mesh(new THREE.RingGeometry(18, 25, 48), materials.chrome);
    capBot.position.y = -7; capBot.rotation.x = Math.PI / 2;
    cupMesh.add(capTop); cupMesh.add(capBot);
    animatedParts.outer = cupMesh;
    currentBearingGroup.add(cupMesh);

    // Inner Cone (Tapered Outer Track with Back Rib)
    const coneGeo = new THREE.CylinderGeometry(18, 14, 14, 48, 1, true);
    const coneMesh = new THREE.Mesh(coneGeo, materials.innerChrome);
    const inCapTop = new THREE.Mesh(new THREE.RingGeometry(14, 18, 48), materials.innerChrome);
    inCapTop.position.y = 7; inCapTop.rotation.x = -Math.PI / 2;
    const inCapBot = new THREE.Mesh(new THREE.RingGeometry(12, 16, 48), materials.innerChrome);
    inCapBot.position.y = -7; inCapBot.rotation.x = Math.PI / 2;
    coneMesh.add(inCapTop); coneMesh.add(inCapBot);
    animatedParts.inner = coneMesh;
    currentBearingGroup.add(coneMesh);

    // 10 Conical Tapered Rollers
    const pitchRadius = 20;
    const taperGeo = new THREE.CylinderGeometry(2.4, 3.6, 9.5, 24);
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const roller = new THREE.Mesh(taperGeo, materials.steelBall);
      roller.position.set(Math.cos(angle) * pitchRadius, 0, Math.sin(angle) * pitchRadius);
      roller.rotation.z = 0.28; // Taper Contact Angle
      roller.rotation.y = angle;
      roller.userData = { initialAngle: angle, pitchRadius: pitchRadius, type: 'taper' };
      animatedParts.elements.push(roller);
      currentBearingGroup.add(roller);
    }

    // Pressed Steel Window Cage
    const cageGeo = new THREE.TorusGeometry(pitchRadius, 1.2, 16, 48);
    const cageMesh = new THREE.Mesh(cageGeo, materials.steelCage);
    cageMesh.rotation.x = Math.PI / 2;
    animatedParts.cage = cageMesh;
    currentBearingGroup.add(cageMesh);
  }

  // 4. Pillow Block Unit (UCP 200 Series) - Cast Iron Housing + Spherical Ball Insert
  function buildPillowBlockModel() {
    // Pillow Block Cast Iron Housing (P208 Style Base & Foot Pad)
    const housingGroup = new THREE.Group();

    // Solid Base Block
    const baseGeo = new THREE.BoxGeometry(64, 8, 22);
    const baseMesh = new THREE.Mesh(baseGeo, materials.castIronHousing);
    baseMesh.position.y = -22;
    housingGroup.add(baseMesh);

    // Dual Mounting Bolt Holes
    const holeGeo = new THREE.CylinderGeometry(3.5, 3.5, 9, 24);
    const bolt1 = new THREE.Mesh(holeGeo, materials.chrome);
    bolt1.position.set(-24, -22, 0);
    const bolt2 = new THREE.Mesh(holeGeo, materials.chrome);
    bolt2.position.set(24, -22, 0);
    housingGroup.add(bolt1);
    housingGroup.add(bolt2);

    // Arch Center Arch & Spherical Seat
    const archGeo = new THREE.CylinderGeometry(26, 28, 20, 48, 1, false, 0, Math.PI);
    const archMesh = new THREE.Mesh(archGeo, materials.castIronHousing);
    archMesh.position.y = -8;
    archMesh.rotation.z = Math.PI / 2;
    housingGroup.add(archMesh);

    // Brass Grease Zerk Fitting Nipple on top
    const greaseGeo = new THREE.CylinderGeometry(1.5, 2.5, 7, 16);
    const greaseMesh = new THREE.Mesh(greaseGeo, materials.greaseNipple);
    greaseMesh.position.set(0, 18, 0);
    housingGroup.add(greaseMesh);

    animatedParts.housing = housingGroup;
    currentBearingGroup.add(housingGroup);

    // Spherical Outer Ring Insert (UC208)
    const outerGeo = new THREE.SphereGeometry(22, 32, 16);
    const outerMesh = new THREE.Mesh(outerGeo, materials.chrome);
    outerMesh.scale.set(1, 0.55, 1);
    animatedParts.outer = outerMesh;
    currentBearingGroup.add(outerMesh);

    // Inner Ring with Extended Collar & Set Screws
    const innerGeo = new THREE.CylinderGeometry(14, 14, 22, 48);
    const innerMesh = new THREE.Mesh(innerGeo, materials.innerChrome);
    
    // 2x Grub Set Screws on Collar
    const grubGeo = new THREE.CylinderGeometry(1.2, 1.2, 4, 12);
    const grub1 = new THREE.Mesh(grubGeo, materials.greaseNipple);
    grub1.position.set(0, 9, 14); grub1.rotation.x = Math.PI / 2;
    const grub2 = new THREE.Mesh(grubGeo, materials.greaseNipple);
    grub2.position.set(14, 9, 0); grub2.rotation.z = Math.PI / 2;
    innerMesh.add(grub1); innerMesh.add(grub2);

    animatedParts.inner = innerMesh;
    currentBearingGroup.add(innerMesh);

    // 8 Chrome Balls
    const pitchRadius = 18;
    const ballGeo = new THREE.SphereGeometry(3.6, 24, 24);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const ball = new THREE.Mesh(ballGeo, materials.steelBall);
      ball.position.set(Math.cos(angle) * pitchRadius, 0, Math.sin(angle) * pitchRadius);
      ball.userData = { initialAngle: angle, pitchRadius: pitchRadius, type: 'ball' };
      animatedParts.elements.push(ball);
      currentBearingGroup.add(ball);
    }

    // Steel Cage
    const cageGeo = new THREE.TorusGeometry(pitchRadius, 1.2, 16, 48);
    const cageMesh = new THREE.Mesh(cageGeo, materials.steelCage);
    cageMesh.rotation.x = Math.PI / 2;
    animatedParts.cage = cageMesh;
    currentBearingGroup.add(cageMesh);
  }

  // ================= INTERACTION CONTROLS =================
  function setupInteractionControls(container) {
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      isAutoRotating = false;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging || !currentBearingGroup) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      currentBearingGroup.rotation.y += deltaX * 0.008;
      currentBearingGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        isAutoRotating = false;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !currentBearingGroup || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      currentBearingGroup.rotation.y += deltaX * 0.008;
      currentBearingGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });
  }

  function onWindowResize() {
    const container = document.getElementById('bearing3DCanvasContainer');
    if (!container || !camera || !renderer) return;
    const width = container.clientWidth;
    const height = container.clientHeight || 340;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    requestAnimationFrame(animate);

    // Auto-spin
    if (isAutoRotating && !isDragging && currentBearingGroup) {
      currentBearingGroup.rotation.y += 0.007;
      currentBearingGroup.rotation.x = 0.55 + Math.sin(Date.now() * 0.001) * 0.08;
    }

    // Exploded View Lerp Animation
    currentExplosion += (targetExplosion - currentExplosion) * 0.08;

    if (animatedParts.outer && animatedParts.inner) {
      if (activeBearingType === 'pillow_block') {
        if (animatedParts.housing) animatedParts.housing.position.y = -currentExplosion * 30;
        animatedParts.outer.position.y = currentExplosion * 15;
        animatedParts.inner.position.y = -currentExplosion * 15;
      } else {
        animatedParts.outer.position.y = currentExplosion * 22;
        animatedParts.inner.position.y = -currentExplosion * 22;
        if (animatedParts.cage) animatedParts.cage.position.y = currentExplosion * 6;
      }

      if (animatedParts.seals.length === 2) {
        animatedParts.seals[0].position.y = 6.2 + (currentExplosion * 32);
        animatedParts.seals[1].position.y = -6.2 - (currentExplosion * 32);
      }

      // Rotate rolling elements
      const speed = Date.now() * 0.002;
      animatedParts.elements.forEach(elem => {
        const angle = elem.userData.initialAngle + (isAutoRotating ? speed : 0);
        const radius = elem.userData.pitchRadius + (currentExplosion * 5);
        elem.position.x = Math.cos(angle) * radius;
        elem.position.z = Math.sin(angle) * radius;
        
        if (elem.userData.type === 'spherical') {
          elem.position.y = (elem.userData.yOffset || 0) + (elem.userData.row * currentExplosion * 8);
        } else if (elem.userData.type === 'taper') {
          elem.position.y = currentExplosion * 4;
        } else {
          elem.position.y = Math.sin(angle * 2) * currentExplosion * 3;
        }
      });
    }

    renderer.render(scene, camera);
  }

  // ================= USER ACTIONS & BEARING TYPE SWITCHER =================
  window.switch3DBearingType = function (type) {
    activeBearingType = type;

    // Update active tab styling
    document.querySelectorAll('.bearing-type-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });

    buildBearingModel(type);

    // Update Specs Card for Selected Bearing Type
    const typeInfo = {
      deep_groove: {
        badge: 'ISO 6205-2RS Deep Groove Ball Bearing',
        title: 'DEEP GROOVE BALL BEARING (6200 / 6300 SERIES)',
        specs: 'Bore: 25mm • OD: 52mm • Width: 15mm • Dynamic Load: 14.8 kN • Speed: 14,000 RPM • Dual 2RS Nitrile Rubber Seals'
      },
      spherical_roller: {
        badge: 'ISO 22218 EK Spherical Roller Bearing',
        title: 'SPHERICAL ROLLER BEARING (22200 SERIES WITH W33)',
        specs: 'Bore: 90mm • OD: 160mm • Width: 40mm • Dynamic Load: 345 kN • Heavy Shock Vibration Self-Aligning Barrel Rollers'
      },
      taper_roller: {
        badge: 'ISO 30206 Tapered Roller Bearing',
        title: 'TAPERED ROLLER BEARING (30200 CUP & CONE)',
        specs: 'Bore: 30mm • OD: 62mm • Width: 17.25mm • Combined Heavy Radial & Axial Thrust Capacity for Axles and Reducers'
      },
      pillow_block: {
        badge: 'UCP 208-24 Cast Iron Pillow Block Unit',
        title: 'PILLOW BLOCK BEARING UNIT (UCP / UCF SERIES)',
        specs: 'Shaft: 40mm (1-1/2") • Cast Iron Rigid Housing • Grease Zerk Nipple • Dual Grub Locking Screws • Self-Aligning Insert'
      }
    };

    const info = typeInfo[type] || typeInfo.deep_groove;
    const badgeEl = document.getElementById('active3DBearingBadge');
    const specEl = document.getElementById('active3DPartInfo');
    if (badgeEl) badgeEl.textContent = info.badge;
    if (specEl) {
      specEl.innerHTML = `
        <div style="color: var(--cyan-accent); font-weight: 700; font-size: 0.85rem; font-family: var(--font-display);">${info.title}</div>
        <div style="color: #E2E8F0; font-size: 0.775rem; margin-top: 0.2rem; line-height: 1.4;">${info.specs}</div>
      `;
    }
  };

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
    if (currentBearingGroup) {
      currentBearingGroup.traverse(obj => {
        if (obj.isMesh && obj.material) obj.material.wireframe = isWireframe;
      });
    }
    const btn = document.getElementById('btnToggleWireframe');
    if (btn) {
      btn.innerHTML = isWireframe 
        ? '<i class="fa-solid fa-cube text-cyan"></i> Solid Metal' 
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
        specs: 'Precision ground circular raceway • Hardness: HRC 60-64 • Superfinished curvature (<0.02μm roughness)'
      },
      inner: {
        title: 'INNER RACEWAY & SHAFT BORE',
        specs: 'Precision ground inner raceway • Shaft interference fit h6/k5 • Withstands heavy rotational centrifugal force'
      },
      balls: {
        title: 'GRADE 10 CHROME STEEL ROLLING ELEMENTS',
        specs: 'ISO 3290 Grade 10 sphericity (≤0.05μm runout) • Mirror polish specular finish for friction-free rotation'
      },
      cage: {
        title: 'RIVETED SOLID BRASS / STEEL CAGE',
        specs: 'Even rolling element spacing • Prevents ball-to-ball contact at high speeds up to 14,000 RPM'
      },
      seals: {
        title: '2RS DUAL NITRILE RUBBER CONTACT SEALS',
        specs: 'Slurry, dust & moisture barrier • Pre-filled with premium factory lithium complex high-temp grease'
      }
    };

    const target = partSpecs[partName] || partSpecs.outer;
    infoCard.innerHTML = `
      <div style="color: var(--cyan-accent); font-weight: 700; font-size: 0.85rem; font-family: var(--font-display);">${target.title}</div>
      <div style="color: #E2E8F0; font-size: 0.775rem; margin-top: 0.2rem; line-height: 1.4;">${target.specs}</div>
    `;
  };

  // Initialize on Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DBearing);
  } else {
    init3DBearing();
  }

})();
