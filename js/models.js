// Global variables
let scene, camera, renderer, controls, model;
const modelContainers = {};

// Initialize Three.js scene
function initThreeJS(containerId) {
    const container = document.getElementById(containerId);
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1, 5);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Clear previous container content and add renderer
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    
    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.enablePan = false;
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Add grid helper for better visualization
    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x888888);
    scene.add(gridHelper);
    
    // Store the scene in our modelContainers object
    modelContainers[containerId] = {
        scene: scene,
        camera: camera,
        renderer: renderer,
        controls: controls
    };
    
    // Start animation loop
    animate(containerId);
}

// Animation loop
function animate(containerId) {
    const container = modelContainers[containerId];
    requestAnimationFrame(() => animate(containerId));
    container.controls.update();
    container.renderer.render(container.scene, container.camera);
}

// Load 3D model
function loadModel(containerId, modelPath, isLarge = false) {
    if (!modelContainers[containerId]) {
        initThreeJS(containerId);
    }
    
    const container = modelContainers[containerId];
    const loader = new THREE.GLTFLoader();
    
    // Remove previous model if exists
    if (container.model) {
        container.scene.remove(container.model);
    }
    
    // Load new model
    loader.load(
        modelPath,
        function(gltf) {
            const model = gltf.scene;
            container.model = model;
            
            // Scale and position the model
            if (isLarge) {
                model.scale.set(1.2, 1.2, 1.2);
            } else {
                model.scale.set(0.8, 0.8, 0.8);
            }
            
            model.position.y = -0.5;
            
            // Enable shadows if model has meshes
            model.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
            container.scene.add(model);
            
            // Adjust camera target based on model size
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            container.controls.target.copy(center);
            
            // Reset camera position
            container.camera.position.set(0, 1, 5);
            container.controls.update();
        },
        undefined,
        function(error) {
            console.error('Error loading model:', error);
        }
    );
}