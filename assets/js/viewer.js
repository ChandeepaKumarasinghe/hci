// assets/js/viewer.js
document.addEventListener('DOMContentLoaded', function() {
    let scene, camera, renderer, model;
    
    // Get model ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const modelId = urlParams.get('id');
    
    // Initialize Three.js
    init();
    loadModel(modelId);
    
    function init() {
        const container = document.getElementById('model-viewer-container');
        
        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
        
        // Camera
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
        
        // Handle resize
        window.addEventListener('resize', function() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
    
    function loadModel(modelId) {
        // Fetch model data from items.json
        fetch('data/items.json')
            .then(response => response.json())
            .then(data => {
                let modelData;
                
                // Find the model in categories
                for (const category of data.categories) {
                    modelData = category.items.find(item => item.id === modelId);
                    if (modelData) break;
                }
                
                if (!modelData) {
                    throw new Error('Model not found');
                }
                
                // Update UI
                document.getElementById('model-name').textContent = modelData.name;
                
                // Display properties
                const propertiesHTML = `
                    <p><strong>Dimensions:</strong> 
                    ${modelData.dimensions.width}m (W) × 
                    ${modelData.dimensions.height}m (H) × 
                    ${modelData.dimensions.depth}m (D)</p>
                    <p><strong>Price:</strong> $${modelData.price.toFixed(2)}</p>
                `;
                document.getElementById('model-properties').innerHTML = propertiesHTML;
                
                // Load 3D model
                const loader = new THREE.GLTFLoader();
                loader.load(modelData.modelPath, function(gltf) {
                    model = gltf.scene;
                    scene.add(model);
                    
                    // Center and scale model
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);
                    
                    const size = box.getSize(new THREE.Vector3()).length();
                    const scale = 2.0 / size;
                    model.scale.set(scale, scale, scale);
                    
                }, undefined, function(error) {
                    console.error('Error loading model:', error);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('model-viewer-container').innerHTML = `
                    <div class="error-message">
                        <p>Error loading model: ${error.message}</p>
                    </div>
                `;
            });
    }
});