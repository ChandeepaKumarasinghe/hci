let scene, camera, renderer, controls;
let loadedModels = {};
let currentRoom = null;

// Initialize Three.js scene
function initThreeJS(containerId) {
    const container = document.getElementById(containerId);
    
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
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
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Start animation loop
    animate();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Load GLTF model
function loadModel(modelPath, textures, callback) {
    if (loadedModels[modelPath]) {
        if (callback) callback(loadedModels[modelPath].clone());
        return;
    }
    
    const loader = new THREE.GLTFLoader();
    
    loader.load(modelPath, function(gltf) {
        const model = gltf.scene;
        
        // Apply textures if available
        if (textures && textures.length > 0) {
            model.traverse(function(child) {
                if (child.isMesh) {
                    // Simple texture application - in real app you'd map textures properly
                    if (textures[0]) {
                        const texture = new THREE.TextureLoader().load(textures[0]);
                        child.material.map = texture;
                        child.material.needsUpdate = true;
                    }
                }
            });
        }
        
        loadedModels[modelPath] = model;
        if (callback) callback(model.clone());
    }, undefined, function(error) {
        console.error('Error loading model:', error);
    });
}

// Load room
function loadRoom(roomType) {
    // Clear current room
    if (currentRoom) {
        scene.remove(currentRoom);
    }
    
    // In a real app, you'd load the room model based on roomType
    // For demo, we'll just create a simple room representation
    const room = new THREE.Group();
    
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    room.add(floor);
    
    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
    
    // Back wall
    const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 3),
        wallMaterial
    );
    backWall.position.z = -5;
    backWall.position.y = 1.5;
    room.add(backWall);
    
    // Side walls
    const leftWall = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 3),
        wallMaterial
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -5;
    leftWall.position.y = 1.5;
    room.add(leftWall);
    
    currentRoom = room;
    scene.add(room);
}

// Initialize based on page
if (document.getElementById('modelViewer')) {
    // Editor page
    document.addEventListener('DOMContentLoaded', function() {
        initThreeJS('modelViewer');
        loadRoom('living'); // Default room
        
        // Load furniture items from localStorage
        const models = JSON.parse(localStorage.getItem('furnitureModels') || '[]');
        // You would populate the furniture items panel with these models
    });
} else if (document.getElementById('roomViewer')) {
    // Admin room viewer
    document.addEventListener('DOMContentLoaded', function() {
        initThreeJS('roomViewer');
    });
}