let scene, camera, renderer, controls, model;
let currentTextureIndex = 0;
let textures = [];

// Initialize Three.js scene
function init() {
    const container = document.getElementById('singleModelViewer');
    
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    
    // Load model from URL parameters
    loadModelFromURL();
    
    // Set up controls
    setupControls();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Load model based on URL parameters
function loadModelFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const modelPath = urlParams.get('model');
    const textureParam = urlParams.get('textures');
    
    if (textureParam) {
        textures = textureParam.split(',');
        populateTextureSelector();
    }
    
    if (modelPath) {
        const loader = new THREE.GLTFLoader();
        loader.load(modelPath, function(gltf) {
            // Remove previous model if exists
            if (model) scene.remove(model);
            
            model = gltf.scene;
            
            // Center and scale model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            model.position.x += (model.position.x - center.x);
            model.position.y += (model.position.y - center.y);
            model.position.z += (model.position.z - center.z);
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            model.scale.set(scale, scale, scale);
            
            scene.add(model);
            
            // Apply first texture if available
            if (textures.length > 0) {
                applyTexture(textures[0]);
            }
        }, undefined, function(error) {
            console.error('Error loading model:', error);
        });
    }
}

// Populate texture selector dropdown
function populateTextureSelector() {
    const selector = document.getElementById('viewerTexture');
    selector.innerHTML = '';
    
    textures.forEach((texture, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Texture ${index + 1}`;
        selector.appendChild(option);
    });
    
    selector.addEventListener('change', function() {
        currentTextureIndex = parseInt(this.value);
        applyTexture(textures[currentTextureIndex]);
    });
}

// Apply texture to model
function applyTexture(texturePath) {
    if (!model) return;
    
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(texturePath, function(texture) {
        model.traverse(function(child) {
            if (child.isMesh) {
                child.material.map = texture;
                child.material.needsUpdate = true;
            }
        });
    });
}

// Set up UI controls
function setupControls() {
    document.getElementById('viewerRotation').addEventListener('input', function() {
        if (model) {
            model.rotation.y = THREE.MathUtils.degToRad(this.value);
        }
    });
    
    document.getElementById('viewerZoom').addEventListener('input', function() {
        const zoomValue = parseFloat(this.value);
        camera.position.z = 5 * (1 / zoomValue);
    });
    
    document.getElementById('closeViewer').addEventListener('click', function() {
        window.history.back();
    });
}

// Handle window resize
function onWindowResize() {
    const container = document.getElementById('singleModelViewer');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);