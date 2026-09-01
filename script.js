/* ============================================
   MISWAK DENTAL CARE — MAIN SCRIPT
   Hyper-Realistic Reference 3D Tooth Engine (Three.js),
   Exact Replication of reference.jpeg:
   Glossy White Molar, Unified Organic Anatomy,
   Crystal Glass Roots & Glowing Amber Pulp Core
   ============================================ */

'use strict';

/* ---- SMOOTH SCROLL (Native) ---- */
document.documentElement.style.scrollBehavior = 'smooth';

/* ============================================
   HYPER-REALISTIC THREE.JS 3D TOOTH ENGINE
   ============================================ */
(function initTooth3D() {
    const canvas = document.getElementById('tooth-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const wrapper = document.getElementById('hero-3d-wrapper') || canvas.parentElement;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        34,
        wrapper.clientWidth / wrapper.clientHeight,
        0.1,
        100
    );
    camera.position.set(0, 0.0, 7.3);

    // WebGL Renderer with High Precision & Tone Mapping
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Master Tooth Hierarchy Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const toothGroup = new THREE.Group();
    masterGroup.add(toothGroup);

    // Background Depth Teeth Group (Matching reference.jpeg depth of field lineup)
    const bgTeethGroup = new THREE.Group();
    masterGroup.add(bgTeethGroup);

    /* --- GENERATE LUXURY STUDIO HDRI ENVIRONMENT MAP (PMREM) --- */
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x020712);

    // 1. Large Top/Front Softbox (creates the long vertical specular reflection on the tooth)
    const topLightGeo = new THREE.PlaneGeometry(14, 16);
    const topLightMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const topLightMesh = new THREE.Mesh(topLightGeo, topLightMat);
    topLightMesh.position.set(1.5, 7, 3.5);
    topLightMesh.rotation.x = Math.PI / 2.4;
    envScene.add(topLightMesh);

    // 2. Left Softbox (Cool White/Icy Blue)
    const leftLightGeo = new THREE.PlaneGeometry(8, 14);
    const leftLightMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd, side: THREE.DoubleSide });
    const leftLightMesh = new THREE.Mesh(leftLightGeo, leftLightMat);
    leftLightMesh.position.set(-8, 2, 0);
    leftLightMesh.rotation.y = Math.PI / 3;
    envScene.add(leftLightMesh);

    // 3. Right Fill Softbox
    const rightLightGeo = new THREE.PlaneGeometry(8, 14);
    const rightLightMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd, side: THREE.DoubleSide });
    const rightLightMesh = new THREE.Mesh(rightLightGeo, rightLightMat);
    rightLightMesh.position.set(8, 2, 0);
    rightLightMesh.rotation.y = -Math.PI / 3;
    envScene.add(rightLightMesh);

    // 4. Back Cyan Rim Panel (Vivid edge silhouette)
    const backLightGeo = new THREE.PlaneGeometry(16, 10);
    const backLightMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, side: THREE.DoubleSide });
    const backLightMesh = new THREE.Mesh(backLightGeo, backLightMat);
    backLightMesh.position.set(0, -2, -8);
    envScene.add(backLightMesh);

    const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
    scene.environment = envMap;

    /* ============================================
       MISWAK DENTAL CARE — HYPER-REALISTIC TEETH
       Updated Material Configurations for Seamless
       Organic Integration and Enhanced Aesthetics
       ============================================ */

    /* --- 1. MATERIALS CONFIGURATION --- */

    // A. Organic Glossy Enamel Crown (Smooth Translucent Transition)
    const porcelainWhiteMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xfcfdfd),            // Warm ivory porcelain depth
        emissive: new THREE.Color(0x061428),         // Soft interior shadow cavity
        roughness: 0.05,                             // High-end polished enamel reflection
        metalness: 0.0,                              // Pure non-metallic dielectric
        clearcoat: 1.0,                              // Glossy outer saliva envelope
        clearcoatRoughness: 0.02,                    // Ultra-sharp specular glint
        reflectivity: 1.0,                           // Full dielectric reflectivity

        // Translucency & Enamel Optical Depth
        transmission: 0.38,                          // Organic light penetration through cusps
        ior: 1.62,                                   // True tooth enamel refractive index (~1.62)
        thickness: 1.6,                              // Physical enamel wall thickness
        attenuationColor: new THREE.Color(0xe0f2fe),   // Cool natural enamel light absorption
        attenuationDistance: 1.1,

        transparent: true,
        opacity: 0.96,
        specularIntensity: 1.0,                      // Peak specular response
        specularColor: new THREE.Color(0xffffff),    // Brilliant white highlight reflection
        envMapIntensity: 2.8,                        // Vibrant HDRI reflections
    });

    // B. Seamless Bio-Glass Root Structure (Natural Gradient Blending)
    const crystalGlassMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xeff6ff),            // Soft frosted ice tint[cite: 2]
        emissive: new THREE.Color(0x021024),         // Deep ocean studio core glow[cite: 2]
        roughness: 0.04,                             // Polished optical refraction surface[cite: 2]
        metalness: 0.0,                              // Pure translucent dielectric glass[cite: 2]
        clearcoat: 1.0,                              // Smooth outer coat[cite: 2]
        clearcoatRoughness: 0.03,                    // Crisp refraction highlights[cite: 2]

        // High-Grade Glass Optics
        transmission: 0.88,                          // Clear light transmission[cite: 2]
        ior: 1.54,                                   // Root dentin / glass refraction index[cite: 2]
        thickness: 2.4,                              // Thick light scattering path[cite: 2]
        attenuationColor: new THREE.Color(0xbae6fd),   // Soft icy cyan depth absorption
        attenuationDistance: 1.4,

        transparent: true,                           // Translucent overlay[cite: 2]
        opacity: 0.92,                               // Smooth alpha integration[cite: 2]
        specularIntensity: 1.0,                      // Full highlight intensity[cite: 2]
        specularColor: new THREE.Color(0x38bdf8),    // Cyan rim accent reflection[cite: 2]
        envMapIntensity: 2.4,                        // Natural environment mapping[cite: 2]
    });

    // C. Glowing Luminescent Pulp Chamber & Vascular Root Core
    const goldenAmberCoreMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xd97706),            // Rich internal amber gold[cite: 2]
        emissive: new THREE.Color(0xd97706),         // Inner vital pulp warmth[cite: 2]
        emissiveIntensity: 0.95,                     // Vivid glowing internal nerve canal[cite: 2]
        roughness: 0.15,                             // Organic interior texture[cite: 2]
        metalness: 0.45,                             // Metallic satin sheen[cite: 2]
        clearcoat: 0.8,                              // Subsurface specular boundary[cite: 2]
        clearcoatRoughness: 0.08,                    // Softened internal glint[cite: 2]

        // Translucent Subsurface Core Behavior
        transmission: 0.25,                          // Internal scattering translucency[cite: 2]
        ior: 1.50,                                   // Organic tissue refractive index[cite: 2]
        thickness: 1.5,                              // Core volumetric depth[cite: 2]
        attenuationColor: new THREE.Color(0x7c2d12),   // Deep warm blood-amber absorption
        attenuationDistance: 0.6,

        transparent: true,
        opacity: 0.95,
        specularIntensity: 1.0,                      // Vivid highlight accents[cite: 2]
        specularColor: new THREE.Color(0xfef08a),    // Warm golden highlight reflection[cite: 2]
        envMapIntensity: 2.0,                        // Balanced environment lighting[cite: 2]
    });

    /* --- 2. HARMONIC REAL TOOTH: 4 ORGANIC CUSPS & 4 SEAMLESS JOINED ROOTS --- */

    // A. Organic Molar Crown (Exactly 4 Natural Biological Cusps & Seamless Lower Skirt)
    function createHarmonicCrownGeometry() {
        const latBands = 100;
        const lonBands = 144;
        const positions = [];
        const indices = [];

        function smoothstep(min, max, val) {
            const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
            return x * x * (3 - 2 * x);
        }

        for (let i = 0; i <= latBands; i++) {
            const v = i / latBands; // 0 (cervical root join collar) to 1 (top occlusal table)
            const y = -0.48 + v * 1.88; // Y from -0.48 to +1.40

            for (let j = 0; j <= lonBands; j++) {
                const u = j / lonBands;
                const angle = u * Math.PI * 2; // 0 to 2PI

                // 1. Single Continuous Smooth Vertical Profile (No Shelves, No Extra Cap, Even Enamel Wall)
                let baseR = 1.05;
                if (v < 0.30) {
                    // Smooth cervical waist
                    const t = v / 0.30;
                    baseR = 0.86 + 0.24 * Math.sin(t * Math.PI * 0.5);
                } else if (v < 0.78) {
                    // Mid-crown body with natural convex equatorial contour
                    const t = (v - 0.30) / 0.48;
                    baseR = 1.10 + 0.14 * Math.sin(t * Math.PI);
                } else {
                    // Smooth, even inward curvature into the central occlusal table (completely smooth, no ledge/cap)
                    const t = (v - 0.78) / 0.22;
                    baseR = 1.10 * Math.cos(t * Math.PI * 0.5);
                }

                // 2. 4-Lobed Anatomical Modulation (4 prominent corner lobes, soft intercuspal indents)
                const lobeMod = 1.0 + 0.18 * Math.cos(4 * angle) - 0.04 * Math.cos(2 * angle);
                let r = baseR * lobeMod;

                // 3. Anatomical Mesiodistal Aspect Ratio (Trapezoidal taper)
                const trapezoidTaper = 1.0 + 0.06 * Math.sin(angle);
                let posX = Math.cos(angle) * r * 1.14;
                let posZ = Math.sin(angle) * r * 0.98 * trapezoidTaper;

                // 4. Soft Developmental Grooves
                const frontDiff = Math.abs(angle - Math.PI * 0.5);
                const frontGroove = Math.exp(-(frontDiff * frontDiff) / 0.20) * 0.18 * smoothstep(0.15, 0.85, v);
                posZ -= frontGroove * Math.sin(angle);

                const backDiff = Math.abs(angle - Math.PI * 1.5);
                const backGroove = Math.exp(-(backDiff * backDiff) / 0.20) * 0.14 * smoothstep(0.15, 0.85, v);
                posZ -= backGroove * Math.sin(angle);

                let curY = y;

                // 5. 4 Natural Rounded Cusp Peaks (Smooth, integrated elevation without any capping seams)
                if (v > 0.40) {
                    const cuspFactor = smoothstep(0.40, 0.82, v);

                    // 4 Rounded Cusp Elevations
                    const cuspFR = Math.exp(-Math.pow(angle - Math.PI * 0.28, 2) / 0.30) * 0.44;
                    const cuspFL = Math.exp(-Math.pow(angle - Math.PI * 0.72, 2) / 0.30) * 0.42;
                    const cuspBR = Math.exp(-Math.pow(angle - Math.PI * 1.72, 2) / 0.32) * 0.44;
                    const cuspBL = Math.exp(-Math.pow(angle - Math.PI * 1.28, 2) / 0.30) * 0.38;

                    const totalCuspLift = (cuspFR + cuspFL + cuspBR + cuspBL) * cuspFactor;
                    curY += totalCuspLift;
                }

                // 6. Central Occlusal Fossa Dip (Natural Chewing Valley)
                if (v >= 0.80) {
                    const topT = (v - 0.80) / 0.20;
                    curY -= Math.sin(topT * Math.PI * 0.5) * 0.32;
                }

                positions.push(posX, curY, posZ);
            }
        }

        for (let i = 0; i < latBands; i++) {
            for (let j = 0; j < lonBands; j++) {
                const first = i * (lonBands + 1) + j;
                const second = first + lonBands + 1;

                indices.push(first, second, first + 1);
                indices.push(second, second + 1, first + 1);
            }
        }

        const crownGeo = new THREE.BufferGeometry();
        crownGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        crownGeo.setIndex(indices);
        crownGeo.computeVertexNormals();
        return crownGeo;
    }

    // B. Organic Spline Root Generator
    function createHarmonicRootMesh(curvePoints, baseRadius, tipRadius) {
        const curve = new THREE.CatmullRomCurve3(curvePoints);
        const tubeGeo = new THREE.TubeGeometry(curve, 72, baseRadius, 36, false);
        const pos = tubeGeo.attributes.position;
        const v = new THREE.Vector3();

        const topY = curvePoints[0].y;
        const bottomY = curvePoints[curvePoints.length - 1].y;

        for (let i = 0; i < pos.count; i++) {
            v.fromBufferAttribute(pos, i);
            const t = THREE.MathUtils.clamp((topY - v.y) / (topY - bottomY), 0, 1);
            const taper = THREE.MathUtils.lerp(1.0, tipRadius / baseRadius, Math.pow(t, 0.88));
            const centerPt = curve.getPoint(t);

            v.x = centerPt.x + (v.x - centerPt.x) * taper;
            v.z = centerPt.z + (v.z - centerPt.z) * taper;

            pos.setXYZ(i, v.x, v.y, v.z);
        }
        tubeGeo.computeVertexNormals();
        return tubeGeo;
    }

    // Root Apex Smooth Dome Cap
    function createRootApexTip(point, radius) {
        const tipGeo = new THREE.SphereGeometry(radius, 28, 28);
        tipGeo.translate(point.x, point.y, point.z);
        return tipGeo;
    }

    // Furcation Arch Bridge Mesh
    function createFurcationBridgeArch(p1, p2, peakHeight, radius) {
        const midX = (p1.x + p2.x) * 0.5;
        const midY = Math.max(p1.y, p2.y) + peakHeight;
        const midZ = (p1.z + p2.z) * 0.5;

        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(p1.x, p1.y, p1.z),
            new THREE.Vector3(midX, midY, midZ),
            new THREE.Vector3(p2.x, p2.y, p2.z)
        ]);
        const geo = new THREE.TubeGeometry(curve, 36, radius, 24, false);
        return geo;
    }

    /* --- ASSEMBLE REAL TOOTH (ZERO GAP SEAMLESS JOINT) --- */
    // 1. Crown Mesh (Solid Glossy White)
    const crownMesh = new THREE.Mesh(createHarmonicCrownGeometry(), porcelainWhiteMaterial);
    crownMesh.position.y = 0.08;
    crownMesh.castShadow = true;
    crownMesh.receiveShadow = true;
    toothGroup.add(crownMesh);

    // 4 Distinct, Separate Anatomical Roots (Starting inside the crown base for seamless zero-gap union)
    const rootConfigs = [
        // 1. Front-Left (Mesiobuccal) Root
        {
            curve: [
                new THREE.Vector3(0.46, 0.08, 0.32),
                new THREE.Vector3(0.72, -0.65, 0.38),
                new THREE.Vector3(0.62, -1.45, 0.26),
                new THREE.Vector3(0.40, -2.25, 0.14)
            ],
            coreCurve: [
                new THREE.Vector3(0.42, 0.12, 0.28),
                new THREE.Vector3(0.65, -0.60, 0.32),
                new THREE.Vector3(0.56, -1.38, 0.22),
                new THREE.Vector3(0.40, -2.18, 0.14)
            ],
            baseR: 0.38,
            tipR: 0.085
        },
        // 2. Front-Right (Distobuccal) Root
        {
            curve: [
                new THREE.Vector3(-0.46, 0.08, 0.32),
                new THREE.Vector3(-0.72, -0.65, 0.38),
                new THREE.Vector3(-0.62, -1.45, 0.26),
                new THREE.Vector3(-0.40, -2.25, 0.14)
            ],
            coreCurve: [
                new THREE.Vector3(-0.42, 0.12, 0.28),
                new THREE.Vector3(-0.65, -0.60, 0.32),
                new THREE.Vector3(-0.56, -1.38, 0.22),
                new THREE.Vector3(-0.40, -2.18, 0.14)
            ],
            baseR: 0.38,
            tipR: 0.085
        },
        // 3. Back-Left (Mesiolingual) Root
        {
            curve: [
                new THREE.Vector3(0.40, 0.08, -0.36),
                new THREE.Vector3(0.64, -0.68, -0.56),
                new THREE.Vector3(0.54, -1.48, -0.46),
                new THREE.Vector3(0.35, -2.28, -0.28)
            ],
            coreCurve: [
                new THREE.Vector3(0.36, 0.12, -0.32),
                new THREE.Vector3(0.56, -0.62, -0.48),
                new THREE.Vector3(0.46, -1.40, -0.40),
                new THREE.Vector3(0.35, -2.20, -0.28)
            ],
            baseR: 0.35,
            tipR: 0.08
        },
        // 4. Back-Right (Distolingual) Root
        {
            curve: [
                new THREE.Vector3(-0.40, 0.08, -0.36),
                new THREE.Vector3(-0.64, -0.68, -0.56),
                new THREE.Vector3(-0.54, -1.48, -0.46),
                new THREE.Vector3(-0.35, -2.28, -0.28)
            ],
            coreCurve: [
                new THREE.Vector3(-0.36, 0.12, -0.32),
                new THREE.Vector3(-0.56, -0.62, -0.48),
                new THREE.Vector3(-0.46, -1.40, -0.40),
                new THREE.Vector3(-0.35, -2.20, -0.28)
            ],
            baseR: 0.35,
            tipR: 0.08
        }
    ];

    const rootLegGroupList = [];
    const rootDirections = [
        { x: 0.75, y: -0.35, z: 0.55 },   // Front-Left leg breakout direction
        { x: -0.75, y: -0.35, z: 0.55 },  // Front-Right leg breakout direction
        { x: 0.65, y: -0.35, z: -0.65 },  // Back-Left leg breakout direction
        { x: -0.65, y: -0.35, z: -0.65 }  // Back-Right leg breakout direction
    ];

    rootConfigs.forEach((rc, index) => {
        const legGroup = new THREE.Group();

        // 1. Separate Outer Glass Root Shell (crystal glass leg)
        const glassRootGeo = createHarmonicRootMesh(rc.curve, rc.baseR, rc.tipR);
        const glassRootMesh = new THREE.Mesh(glassRootGeo, crystalGlassMaterial);
        glassRootMesh.castShadow = true;
        glassRootMesh.receiveShadow = true;
        legGroup.add(glassRootMesh);

        // Root Apex Tip Droplet
        const tipPt = rc.curve[rc.curve.length - 1];
        const tipGeo = createRootApexTip(tipPt, rc.tipR);
        const tipMesh = new THREE.Mesh(tipGeo, crystalGlassMaterial);
        tipMesh.castShadow = true;
        legGroup.add(tipMesh);

        // 2. Solid White Upper Enamel Shell (Seamless zero-gap lock with crown base)
        const whiteRootGeo = createHarmonicRootMesh(rc.curve, rc.baseR * 0.98, rc.tipR * 0.7);
        const whiteRootMesh = new THREE.Mesh(whiteRootGeo, porcelainWhiteMaterial);
        whiteRootMesh.scale.set(0.96, 0.72, 0.96);
        whiteRootMesh.position.y = 0.04;
        whiteRootMesh.castShadow = true;
        legGroup.add(whiteRootMesh);

        // 3. Internal Golden Amber Root Canal Core
        const coreGeo = createHarmonicRootMesh(rc.coreCurve, rc.baseR * 0.42, rc.tipR * 0.35);
        const coreMesh = new THREE.Mesh(coreGeo, goldenAmberCoreMaterial);
        legGroup.add(coreMesh);

        toothGroup.add(legGroup);

        rootLegGroupList.push({
            group: legGroup,
            direction: rootDirections[index]
        });
    });

    // Furcation Vault Arches between the 4 roots
    const archPairs = [
        { p1: { x: 0.46, y: -0.45, z: 0.32 }, p2: { x: -0.46, y: -0.45, z: 0.32 }, h: 0.42, r: 0.16 },    // Front Arch
        { p1: { x: 0.40, y: -0.45, z: -0.36 }, p2: { x: -0.40, y: -0.45, z: -0.36 }, h: 0.42, r: 0.16 }, // Back Arch
        { p1: { x: 0.46, y: -0.45, z: 0.32 }, p2: { x: 0.40, y: -0.45, z: -0.36 }, h: 0.38, r: 0.14 },   // Left Arch
        { p1: { x: -0.46, y: -0.45, z: 0.32 }, p2: { x: -0.40, y: -0.45, z: -0.36 }, h: 0.38, r: 0.14 }  // Right Arch
    ];

    archPairs.forEach(ap => {
        const archGeo = createFurcationBridgeArch(ap.p1, ap.p2, ap.h, ap.r);
        const archMesh = new THREE.Mesh(archGeo, goldenAmberCoreMaterial);
        toothGroup.add(archMesh);
    });

    // Central Pulp Chamber Core
    const pulpChamberGeo = new THREE.SphereGeometry(0.40, 24, 24);
    pulpChamberGeo.scale(1.2, 0.9, 1.1);
    pulpChamberGeo.translate(0, 0.08, 0);
    const pulpChamberMesh = new THREE.Mesh(pulpChamberGeo, goldenAmberCoreMaterial);
    toothGroup.add(pulpChamberMesh);

    // Position master tooth (centered and scaled smaller for elegant breathing room)
    toothGroup.position.set(0, 0.20, 0);
    toothGroup.scale.set(0.74, 0.74, 0.74);

    /* --- 3. REALISTIC SOFT CONTACT SHADOW & FLOOR REFLECTION --- */
    function createSoftShadowTexture() {
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = 512;
        shadowCanvas.height = 512;
        const ctx = shadowCanvas.getContext('2d');

        const grad = ctx.createRadialGradient(256, 256, 12, 256, 256, 245);
        grad.addColorStop(0, 'rgba(1, 5, 14, 0.96)');
        grad.addColorStop(0.22, 'rgba(3, 10, 26, 0.72)');
        grad.addColorStop(0.50, 'rgba(8, 22, 48, 0.35)');
        grad.addColorStop(0.78, 'rgba(14, 165, 233, 0.09)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        const texture = new THREE.CanvasTexture(shadowCanvas);
        texture.needsUpdate = true;
        return texture;
    }

    const shadowPlaneGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
        map: createSoftShadowTexture(),
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.position.set(0, -2.48, 0);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.receiveShadow = true;
    toothGroup.add(shadowPlane);

    /* --- BACKGROUND STUDIO TEETH (Spacious Depth & Independent Multi-Directional Orbits) --- */
    const bgCrownMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xf1f5f9),
        emissive: new THREE.Color(0x061836),
        roughness: 0.12,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        transparent: true,
        opacity: 0.65,
        envMapIntensity: 1.8,
    });

    const bgRootMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x38bdf8),         // blue root tint matching reference photo background teeth
        emissive: new THREE.Color(0x0284c7),
        emissiveIntensity: 0.4,
        roughness: 0.18,
        metalness: 0.05,
        transmission: 0.45,
        ior: 1.48,
        transparent: true,
        opacity: 0.55,
        envMapIntensity: 1.8,
    });

    // Large-scale ghosted out-of-focus background tooth on the far left
    const bgGhostMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xdbeafe),
        emissive: new THREE.Color(0x0a1e3e),
        roughness: 0.25,
        metalness: 0.0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        transparent: true,
        opacity: 0.32,
        envMapIntensity: 1.5,
    });

    // Array to track individual teeth with unique multi-directional motion physics
    const bgTeethList = [];

    // Configuration with wide spatial separation and independent trajectories
    const bgConfigs = [
        // 1. Far Left Cinematic Ghost Tooth (Deep background, slow orbital drift)
        {
            isGhost: true,
            baseX: -5.4, baseY: 0.30, baseZ: -4.8,
            scale: 1.25, baseRy: 0.45,
            speed: 0.6, phase: 0.0,
            ampX: 0.35, ampY: 0.25, ampZ: 0.20,
            freqX: 0.8, freqY: 0.6, freqZ: 0.5,
            spinDir: -0.4, parallaxX: 0.25, parallaxY: 0.20
        },
        // 2. Left Outer Depth Tooth (Diagonal sway, opposite parallax)
        {
            baseX: -3.8, baseY: 0.25, baseZ: -3.4,
            scale: 0.46, baseRy: 0.38,
            speed: 0.9, phase: 1.2,
            ampX: 0.30, ampY: 0.32, ampZ: 0.25,
            freqX: 1.1, freqY: 0.85, freqZ: 0.7,
            spinDir: 0.6, parallaxX: -0.30, parallaxY: 0.25
        },
        // 3. Left Mid-Inner Tooth (Vertical figure-8 hover)
        {
            baseX: -2.2, baseY: -0.35, baseZ: -2.3,
            scale: 0.52, baseRy: 0.20,
            speed: 1.15, phase: 2.4,
            ampX: 0.22, ampY: 0.28, ampZ: 0.18,
            freqX: 1.4, freqY: 1.0, freqZ: 0.8,
            spinDir: -0.8, parallaxX: 0.40, parallaxY: -0.30
        },
        // 4. Right Mid-Inner Tooth (Counter-phase vertical figure-8 hover)
        {
            baseX: 2.2, baseY: -0.35, baseZ: -2.3,
            scale: 0.52, baseRy: -0.20,
            speed: 1.10, phase: 3.6,
            ampX: 0.22, ampY: 0.28, ampZ: 0.18,
            freqX: 1.3, freqY: 0.95, freqZ: 0.75,
            spinDir: 0.75, parallaxX: 0.40, parallaxY: -0.30
        },
        // 5. Right Outer Depth Tooth (Horizontal elliptical orbit, counter-rotation)
        {
            baseX: 3.8, baseY: 0.25, baseZ: -3.4,
            scale: 0.46, baseRy: -0.38,
            speed: 0.85, phase: 4.8,
            ampX: 0.32, ampY: 0.26, ampZ: 0.28,
            freqX: 0.9, freqY: 1.2, freqZ: 0.65,
            spinDir: -0.6, parallaxX: -0.30, parallaxY: 0.25
        },
        // 6. Far Right Atmospheric Accent Tooth (Gentle circular drift)
        {
            baseX: 5.4, baseY: 0.40, baseZ: -4.8,
            scale: 0.40, baseRy: -0.50,
            speed: 0.55, phase: 0.8,
            ampX: 0.28, ampY: 0.22, ampZ: 0.20,
            freqX: 0.7, freqY: 0.55, freqZ: 0.45,
            spinDir: 0.35, parallaxX: 0.20, parallaxY: 0.15
        }
    ];

    bgConfigs.forEach(cfg => {
        const group = new THREE.Group();
        const crownMat = cfg.isGhost ? bgGhostMaterial : bgCrownMaterial;
        const rootMat = cfg.isGhost ? bgGhostMaterial : bgRootMaterial;

        const crown = new THREE.Mesh(createHarmonicCrownGeometry(), crownMat);
        crown.position.y = 0.08;
        group.add(crown);

        const bgRoots = [];
        rootConfigs.forEach((rc, rIdx) => {
            const legGroup = new THREE.Group();
            const root = new THREE.Mesh(createHarmonicRootMesh(rc.curve, rc.baseR, rc.tipR), rootMat);
            legGroup.add(root);
            group.add(legGroup);
            bgRoots.push({
                group: legGroup,
                direction: rootDirections[rIdx]
            });
        });

        group.position.set(cfg.baseX, cfg.baseY, cfg.baseZ);
        group.scale.set(cfg.scale, cfg.scale, cfg.scale);
        group.rotation.y = cfg.baseRy;
        bgTeethGroup.add(group);

        bgTeethList.push({
            group: group,
            crown: crown,
            roots: bgRoots,
            ...cfg
        });
    });

    /* --- AMBIENT SPACE-BLUE COSMIC STAR PARTICLES --- */
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVel = [];

    for (let i = 0; i < particleCount; i++) {
        particlePos[i * 3] = (Math.random() - 0.5) * 9.5;
        particlePos[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
        particlePos[i * 3 + 2] = (Math.random() - 0.5) * 6.5;
        particleVel.push({
            x: (Math.random() - 0.5) * 0.002,
            y: 0.0015 + Math.random() * 0.0025,
            z: (Math.random() - 0.5) * 0.002,
        });
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
        color: new THREE.Color(0x93c5fd),
        size: 0.045,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* --- STUDIO DIRECTIONAL LIGHTING & DYNAMIC SPOTLIGHT --- */
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0x07152b, 1.4);
    scene.add(ambientLight);

    // Key Directional Light with Dynamic Soft Shadow Casting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3.5, 6.5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.radius = 4;
    scene.add(keyLight);

    // Fill Light (Soft Steel Blue)
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.1);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    // Intense Cyan Rim Light (Back-Bottom catching glass facets and contours)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
    rimLight.position.set(0, -3.5, -6.5);
    scene.add(rimLight);

    // Dynamic Cursor Interactive Spotlight
    const cursorSpotlight = new THREE.PointLight(0x67e8f9, 2.4, 10);
    cursorSpotlight.position.set(0, 0.5, 4);
    scene.add(cursorSpotlight);

    /* --- 4. FAST & SNAPPY CURSOR & MOTION PHYSICS --- */
    let autoSpinAngle = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let targetTiltZ = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let currentTiltZ = 0;

    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    // Brisk & Fast Cursor Movement Handler
    window.addEventListener('mousemove', (e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;   // -1 to +1
        const ny = -(e.clientY / window.innerHeight) * 2 + 1; // -1 to +1

        targetTiltY = nx * 0.95;   // fast yaw rotation
        targetTiltX = -ny * 0.75;  // fast pitch rotation
        targetTiltZ = -nx * 0.22;  // dynamic roll

        targetOffsetX = nx * 0.38;  // brisk parallax drift
        targetOffsetY = ny * 0.25;

        // Move cursor spotlight for real-time specular glints
        cursorSpotlight.position.x = nx * 4.4;
        cursorSpotlight.position.y = ny * 3.4 + 0.5;
    }, { passive: true });

    // Drag-to-Rotate Support with Brisk Velocity
    canvas.addEventListener('pointerdown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        canvas.setPointerCapture(e.pointerId);
    });

    window.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        dragStartX = e.clientX;
        dragStartY = e.clientY;

        dragVelocityX = dx * 0.012;
        dragVelocityY = dy * 0.012;

        autoSpinAngle += dragVelocityX;
    });

    window.addEventListener('pointerup', () => {
        isDragging = false;
    });

    // Explosive Break-Out & Re-Join Animation Physics
    let targetExplodeFactor = 0;
    let currentExplodeFactor = 0;

    // Continuous Site-Wide Scroll-Bound 3D Physics
    let scrollRotationY = 0;
    let scrollRotationX = 0;
    let siteScrollProgress = 0;

    function handleScroll3D() {
        const scrollY = window.scrollY;
        const totalHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        siteScrollProgress = Math.min(Math.max(scrollY / totalHeight, 0), 1.0);

        // Smooth 3D tooth rotation across entire site scroll (3 full elegant turns)
        scrollRotationY = siteScrollProgress * Math.PI * 6.0;
        scrollRotationX = Math.sin(siteScrollProgress * Math.PI * 3.0) * 0.35;

        // Dynamic vertical drift following sections down the page
        const verticalDrift = Math.sin(siteScrollProgress * Math.PI * 2.5) * 0.35;
        toothGroup.position.y = 0.20 + verticalDrift;

        // Scale morphing for section depth transition
        const s = 0.74 - Math.sin(siteScrollProgress * Math.PI * 2.0) * 0.14;
        toothGroup.scale.set(s, s, s);

        // Calculate Break Out & Re-Join Factor:
        // As you scroll, tooth expands/breaks out into 3D exploded view, then re-joins seamlessly!
        const explodeWave = Math.abs(Math.sin(siteScrollProgress * Math.PI * 3.5));
        targetExplodeFactor = Math.pow(explodeWave, 1.5) * 0.92;
    }

    let isScrollTicking = false;
    function onScrollOptimized() {
        if (!isScrollTicking) {
            requestAnimationFrame(() => {
                handleScroll3D();
                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }
    window.addEventListener('scroll', onScrollOptimized, { passive: true });

    // Responsive Resize
    function handleResize() {
        if (!wrapper || !renderer) return;
        const w = wrapper.clientWidth;
        const h = wrapper.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleResize, { passive: true });

    /* --- MAIN ANIMATION LOOP WITH INDEPENDENT MULTI-DIRECTIONAL PHYSICS --- */
    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Default continuous auto-spin turntable rotation
        if (!isDragging) {
            autoSpinAngle += 0.007; // brisk, elegant turntable
        }

        // Drag velocity inertia damping
        if (!isDragging && Math.abs(dragVelocityX) > 0.0001) {
            autoSpinAngle += dragVelocityX;
            dragVelocityX *= 0.94;
        }

        // Snappy Low-Dampening Spring Physics (lerpFactor = 0.12 for fast, immediate reaction)
        const lerpFactor = 0.12;
        currentTiltX += (targetTiltX - currentTiltX) * lerpFactor;
        currentTiltY += (targetTiltY - currentTiltY) * lerpFactor;
        currentTiltZ += (targetTiltZ - currentTiltZ) * lerpFactor;

        currentOffsetX += (targetOffsetX - currentOffsetX) * lerpFactor;
        currentOffsetY += (targetOffsetY - currentOffsetY) * lerpFactor;

        // Smooth lerp for break-out & re-join explosion physics
        currentExplodeFactor += (targetExplodeFactor - currentExplodeFactor) * 0.08;

        // 1. Crown Mesh Amplified Break Out (Lifts high upward revealing glowing internal core)
        crownMesh.position.y = 0.08 + currentExplodeFactor * 1.55;

        // 2. 4 Root Legs Amplified Break Out (Spread radially outward & downward)
        rootLegGroupList.forEach((item) => {
            const d = item.direction;
            item.group.position.x = d.x * currentExplodeFactor * 1.45;
            item.group.position.y = d.y * currentExplodeFactor * 0.95;
            item.group.position.z = d.z * currentExplodeFactor * 1.45;
        });

        // 3. Central Pulp Chamber Core Pulse & Expansion
        const coreScale = 1.0 + currentExplodeFactor * 0.75;
        pulpChamberMesh.scale.set(1.2 * coreScale, 0.9 * coreScale, 1.1 * coreScale);

        // Apply combined rotations to main central tooth
        toothGroup.rotation.y = autoSpinAngle + scrollRotationY + currentTiltY;
        toothGroup.rotation.x = currentTiltX + scrollRotationX;
        toothGroup.rotation.z = currentTiltZ;

        // Subtle breathing / organic floating hover for main tooth
        const floatBob = Math.sin(elapsedTime * 1.6) * 0.04;
        toothGroup.position.x = currentOffsetX;
        toothGroup.position.y = (0.20 + Math.sin(siteScrollProgress * Math.PI * 2.5) * 0.35) + currentOffsetY + floatBob;

        // Independent Multi-Directional Floating & Scene-Wide Break-Out Dispersal for All Background Teeth
        bgTeethList.forEach((item) => {
            const t = elapsedTime * item.speed + item.phase;

            // Break-out for background tooth crown
            item.crown.position.y = 0.08 + currentExplodeFactor * 1.35;

            // Break-out for background tooth 4 root legs
            item.roots.forEach((bgRoot) => {
                const d = bgRoot.direction;
                bgRoot.group.position.x = d.x * currentExplodeFactor * 1.25;
                bgRoot.group.position.y = d.y * currentExplodeFactor * 0.80;
                bgRoot.group.position.z = d.z * currentExplodeFactor * 1.25;
            });

            // Multi-directional independent 3D drift & scene-wide breakout dispersal
            const bgDisperse = 1.0 + currentExplodeFactor * 0.55;
            const offsetX = Math.sin(t * item.freqX) * item.ampX;
            const offsetY = Math.cos(t * item.freqY) * item.ampY;
            const offsetZ = Math.sin(t * item.freqZ) * item.ampZ;

            // Independent 3D rotation in different directions & unique spin rates
            item.group.rotation.y = item.baseRy + (autoSpinAngle * item.spinDir) + (currentTiltY * item.parallaxX);
            item.group.rotation.x = Math.sin(t * 0.7) * 0.12 + (currentTiltX * item.parallaxY);
            item.group.rotation.z = Math.cos(t * 0.5) * 0.08;

            // Spacious multi-directional positioning with scene-wide breakout dispersal
            item.group.position.x = (item.baseX * bgDisperse) + offsetX + (currentOffsetX * item.parallaxX);
            item.group.position.y = (item.baseY * bgDisperse) + offsetY + (currentOffsetY * item.parallaxY);
            item.group.position.z = (item.baseZ * bgDisperse) + offsetZ;
        });

        // Ambient floating lustre particles
        const pPos = particleGeo.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            pPos[i * 3 + 1] += particleVel[i].y;
            pPos[i * 3] += Math.sin(elapsedTime + i) * 0.002;
            if (pPos[i * 3 + 1] > 2.8) {
                pPos[i * 3 + 1] = -2.8;
            }
        }
        particleGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    // WebGL Context Loss Safety & Recovery
    canvas.addEventListener('webglcontextlost', (event) => {
        event.preventDefault();
    }, false);

    canvas.addEventListener('webglcontextrestored', () => {
        renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    }, false);

    animate();
})();

/* ============================================
   UI & WEBSITE LOGIC
   ============================================ */

/* ---- NAVBAR SCROLL HANDLER ---- */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });

    document.querySelectorAll('.mobile-nav-link, .mobile-book').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

/* ---- REVEAL ON SCROLL (IntersectionObserver) ---- */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal-up').forEach((el) => {
    revealObserver.observe(el);
});

/* ---- STAGGERED SERVICE CARDS OBSERVER ---- */
const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.card-stagger').forEach((card) => {
    cardObserver.observe(card);
});

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el, target, duration = 1800) {
    let startTime = null;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(easeOutQuart(progress) * target);

        el.textContent = current >= 1000
            ? (current / 1000).toFixed(1).replace('.0', '') + 'k'
            : current;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target >= 1000
                ? (target / 1000).toFixed(1).replace('.0', '') + 'k'
                : target;
        }
    }
    requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    },
    { threshold: 0.5 }
);
counterEls.forEach((el) => counterObserver.observe(el));

/* ---- SMOOTH ANCHOR SCROLLING ---- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 76;
            const top = target.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ---- ACTIVE NAV LINK HIGHLIGHT ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${id}`
                    );
                });
            }
        });
    },
    { rootMargin: '-50% 0px -50% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ---- CONTACT FORM -> WHATSAPP ---- */
const WA_NUMBER = '917288947192';

function buildWhatsAppURL(name, service) {
    const greeting = name ? `Hello, my name is ${name}.` : 'Hello,';
    const svcPart = service ? ` I am interested in ${service}.` : '';
    const msg = `${greeting}${svcPart} I would like to book an appointment at Miswak Multi Speciality Dental Care. Please confirm my slot. Thank you!`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = (form.querySelector('#f-name')?.value || '').trim();
        const service = (form.querySelector('#f-service')?.value || '').trim();
        const btn = form.querySelector('[type="submit"]');

        btn.disabled = true;
        btn.textContent = 'Opening WhatsApp…';

        setTimeout(() => {
            if (formSuccess) formSuccess.style.display = 'flex';
            window.open(buildWhatsAppURL(name, service), '_blank', 'noopener,noreferrer');

            setTimeout(() => {
                form.reset();
                btn.textContent = 'Confirm Appointment Request';
                btn.disabled = false;
                if (formSuccess) formSuccess.style.display = 'none';
            }, 4000);
        }, 600);
    });
}
