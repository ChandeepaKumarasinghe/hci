// Room editor functionality
document.addEventListener('DOMContentLoaded', function() {
    let scene, camera, renderer, room, furniture = [];
    let controls, orbitControls;
    let selectedObject = null;
    
    // Initialize Three.js
    function init() {
        const container = document.getElementById('threejs-container');
        
        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xeeeeee);
        
        // Camera setup
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);
        
        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Grid and axes helpers
        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);
        
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
        
        // Orbit controls for camera
        orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.25;
        
        // Load initial room
        loadRoom('living');
        
        // Event listeners
        window.addEventListener('resize', onWindowResize);
        renderer.domElement.addEventListener('click', onCanvasClick);
        
        // Start animation loop
        animate();
    }
    
    // Load room model
    function loadRoom(roomType) {
        // In a real implementation, you would load different room models based on type
        const roomGeometry = new THREE.BoxGeometry(8, 3, 6);
        const roomMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            side: THREE.BackSide
        });
        
        if (room) scene.remove(room);
        room = new THREE.Mesh(roomGeometry, roomMaterial);
        scene.add(room);
    }
    
    // Add furniture to the room
    function addFurniture(modelPath) {
        const loader = new THREE.GLTFLoader();
        
        loader.load(modelPath, function(gltf) {
            const furnitureItem = gltf.scene;
            
            // Position in front of the camera
            const frontPosition = new THREE.Vector3();
            camera.getWorldDirection(frontPosition);
            frontPosition.multiplyScalar(3);
            furnitureItem.position.copy(frontPosition);
            
            // Add to scene and furniture array
            scene.add(furnitureItem);
            furniture.push({
                mesh: furnitureItem,
                modelPath: modelPath
            });
            
            // Update items list
            updateItemsList();
            
        }, undefined, function(error) {
            console.error('Error loading furniture model:', error);
        });
    }
    
    // Handle window resize
    function onWindowResize() {
        const container = document.getElementById('threejs-container');
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    
    // Handle canvas click for object selection
    function onCanvasClick(event) {
        const mouse = new THREE.Vector2();
        const rect = renderer.domElement.getBoundingClientRect();
        
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        if (intersects.length > 0) {
            // Find the first intersect that's not the room itself
            const selected = intersects.find(item => item.object !== room);
            if (selected) {
                selectObject(selected.object);
            } else {
                selectObject(null);
            }
        } else {
            selectObject(null);
        }
    }
    
    // Select an object and show its properties
    function selectObject(object) {
        // Deselect previous
        if (selectedObject) {
            selectedObject.material.emissive.setHex(selectedObject.currentHex);
        }
        
        selectedObject = object;
        
        // Update properties panel
        const propertiesPanel = document.getElementById('item-properties');
        if (object) {
            // Highlight selected object
            object.currentHex = object.material.emissive.getHex();
            object.material.emissive.setHex(0xff0000);
            
            // Show properties
            propertiesPanel.innerHTML = `
                <h4>${object.name || 'Furniture Item'}</h4>
                <div class="property-control">
                    <label>Position X</label>
                    <input type="range" min="-4" max="4" step="0.1" value="${object.position.x}" 
                        oninput="updateObjectProperty(this, 'position', 'x')">
                </div>
                <!-- Add more controls for position, rotation, scale -->
            `;
        } else {
            propertiesPanel.innerHTML = '<p>No item selected</p>';
        }
    }
    
    // Update items list panel
    function updateItemsList() {
        const itemsList = document.getElementById('items-list');
        itemsList.innerHTML = '';
        
        furniture.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-list-entry';
            itemElement.textContent = `Item ${index + 1}`;
            itemElement.addEventListener('click', () => {
                selectObject(item.mesh);
            });
            itemsList.appendChild(itemElement);
        });
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        orbitControls.update();
        renderer.render(scene, camera);
    }
    
    // Initialize the editor
    init();
    
    // Expose functions to global scope for HTML event handlers
    window.updateObjectProperty = function(element, property, component) {
        if (selectedObject) {
            selectedObject[property][component] = parseFloat(element.value);
        }
    };
});
// Add to editor.js
function setupTextureSwitching() {
    const textureList = document.getElementById('texture-list');
    if (!textureList) return;
    
    fetch('data/items.json')
        .then(response => response.json())
        .then(data => {
            // Get all unique textures
            const textures = new Set();
            data.categories.forEach(category => {
                category.items.forEach(item => {
                    item.textures.forEach(texture => textures.add(texture));
                });
            });
            
            // Populate texture list
            textureList.innerHTML = '';
            textures.forEach(texture => {
                const img = document.createElement('img');
                img.src = texture;
                img.addEventListener('click', () => {
                    if (selectedObject) {
                        const textureLoader = new THREE.TextureLoader();
                        textureLoader.load(texture, tex => {
                            selectedObject.material.map = tex;
                            selectedObject.material.needsUpdate = true;
                        });
                    }
                });
                textureList.appendChild(img);
            });
        });
}
// Add to editor.js
function setupSaveLoad() {
    const saveBtn = document.getElementById('save-room');
    const loadBtn = document.getElementById('load-room');
    
    saveBtn.addEventListener('click', function() {
        const roomData = {
            roomType: localStorage.getItem('currentRoom'),
            furniture: furniture.map(item => ({
                modelPath: item.modelPath,
                position: item.mesh.position.toArray(),
                rotation: item.mesh.rotation.toArray(),
                scale: item.mesh.scale.toArray()
            })),
            wallColor: room.material.color.getHex(),
            wallTexture: document.getElementById('wall-texture').value
        };
        
        localStorage.setItem('savedRoom', JSON.stringify(roomData));
        alert('Room saved successfully!');
    });
    
    if (loadBtn) {
        loadBtn.addEventListener('click', function() {
            const savedRoom = JSON.parse(localStorage.getItem('savedRoom'));
            if (savedRoom) {
                // Clear existing furniture
                furniture.forEach(item => scene.remove(item.mesh));
                furniture = [];
                
                // Load furniture
                savedRoom.furniture.forEach(itemData => {
                    const loader = new THREE.GLTFLoader();
                    loader.load(itemData.modelPath, gltf => {
                        const item = gltf.scene;
                        item.position.fromArray(itemData.position);
                        item.rotation.fromArray(itemData.rotation);
                        item.scale.fromArray(itemData.scale);
                        scene.add(item);
                        furniture.push({
                            mesh: item,
                            modelPath: itemData.modelPath
                        });
                    });
                });
                
                // Apply wall settings
                room.material.color.setHex(savedRoom.wallColor);
                document.getElementById('wall-color').value = `#${savedRoom.wallColor.toString(16).padStart(6, '0')}`;
                document.getElementById('wall-texture').value = savedRoom.wallTexture;
                
                alert('Room loaded successfully!');
            } else {
                alert('No saved room found');
            }
        });
    }
}