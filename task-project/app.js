document.addEventListener("DOMContentLoaded", () => {
    // Enhanced Typewriter Effect with Blinking Cursor
    const typewriterText = "Ayush Pandey";
    let index = 0;
    const typewriterElement = document.getElementById("typewriter");
    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    typewriterElement.appendChild(cursorSpan);

    function typeEffect() {
        if (index < typewriterText.length) {
            typewriterElement.textContent = typewriterText.slice(0, index + 1);
            index++;
            setTimeout(typeEffect, 100);
        }
        // Toggle cursor visibility for blinking effect
        if (!cursorSpan.classList.contains("cursor-blink")) {
            setInterval(() => cursorSpan.classList.toggle("cursor-blink"), 500);
        }
    }
    typeEffect();

    // 3D Skills Visualization with Rotating Icosahedron
    const canvas = document.getElementById("skill-canvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.position.z = 5;

    // Icosahedron Geometry and Material
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffcc });
    const icosahedronEdges = new THREE.LineSegments(edges, lineMaterial);

    // Dynamic gradient material for the faces
    const faceMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x3b82f6,
        metalness: 0.7,
        roughness: 0.2,
        wireframe: false,
        side: THREE.DoubleSide,
    });
    const icosahedron = new THREE.Mesh(geometry, faceMaterial);
    scene.add(icosahedron);
    scene.add(icosahedronEdges);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight);
    scene.add(pointLight);

    function animate() {
        requestAnimationFrame(animate);
        icosahedron.rotation.x += 0.01;
        icosahedron.rotation.y += 0.01;
        icosahedronEdges.rotation.x += 0.01;
        icosahedronEdges.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Smooth Light/Dark Mode Toggle with Transitions
    const toggleButton = document.getElementById("mode-toggle");

    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLightMode = document.body.classList.contains("light-mode");
            const sunIcon = toggleButton.querySelector(".fa-sun");
            const moonIcon = toggleButton.querySelector(".fa-moon");

            if (sunIcon && moonIcon) {
                sunIcon.style.opacity = isLightMode ? '0' : '1';
                moonIcon.style.opacity = isLightMode ? '1' : '0';
            }
            document.body.style.transition = "background 0.4s ease, color 0.4s ease";
        });
    }

    // Adjust canvas size on window resize
    window.addEventListener("resize", () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
});
