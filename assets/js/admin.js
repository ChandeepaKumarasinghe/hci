// Admin-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    let scene, camera, renderer, model;
    
    // Initialize Three.js for model preview
    function initThreeJS(containerId) {
        const container = document.getElementById(containerId);
        
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
        
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Add grid helper
        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            if (model) {
                model.rotation.y += 0.005;
            }
            renderer.render(scene, camera);
        }
        animate();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
    
    // Load a 3D model
    function loadModel(modelPath) {
        const loader = new THREE.GLTFLoader();
        
        // Remove previous model if exists
        if (model) {
            scene.remove(model);
        }
        
        loader.load(modelPath, function(gltf) {
            model = gltf.scene;
            scene.add(model);
            
            // Center the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            // Scale if needed
            const size = box.getSize(new THREE.Vector3()).length();
            const scale = 2.0 / size;
            model.scale.set(scale, scale, scale);
            
        }, undefined, function(error) {
            console.error('Error loading model:', error);
            alert('Error loading model. Please check console for details.');
        });
    }
    
    // Initialize the appropriate Three.js container based on current section
    function initViewer() {
        const activeSection = document.querySelector('.admin-section.active').id;
        const containerId = activeSection.includes('upload') ? 'model-preview' : 'room-preview';
        
        if (!renderer) {
            initThreeJS(containerId);
        }
        
        // For room preview, load a basic room model
        if (activeSection.includes('preview')) {
            loadModel('assets/models/default/room.glb');
        }
    }
    
    // Section switching and initialization
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => {
        section.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Update active nav item
            sections.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected section
            document.querySelectorAll('.admin-section').forEach(sec => {
                sec.classList.add('hidden');
            });
            document.getElementById(`${sectionId}-section`).classList.remove('hidden');
            
            // Initialize viewer for the new section
            initViewer();
        });
    });
    
    // Model upload form
    const uploadForm = document.getElementById('model-upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const modelName = document.getElementById('model-name').value;
            const modelFile = document.getElementById('model-file').files[0];
            
            if (!modelName || !modelFile) {
                alert('Please provide a model name and select a .glb file');
                return;
            }
            
            // Create a mock path (in real implementation, files would be uploaded)
            const modelPath = `assets/models/uploaded/${modelFile.name}`;
            
            // Create model data object
            const newModel = {
                id: Date.now().toString(),
                name: modelName,
                modelPath: modelPath,
                dateAdded: new Date().toISOString()
            };
            
            // Save to localStorage
            const models = JSON.parse(localStorage.getItem('furnitureModels') || '[]');
            models.push(newModel);
            localStorage.setItem('furnitureModels', JSON.stringify(models));
            
            // Show preview
            document.getElementById('model-preview-container').classList.remove('hidden');
            loadModel(URL.createObjectURL(modelFile));
            
            alert('Model added successfully! Note: In this frontend-only version, you need to manually add the .glb file to the specified folder.');
        });
    }
    
    // Initialize the first section
    if (sections.length > 0) {
        initViewer();
    }
});