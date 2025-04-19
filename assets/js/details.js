document.addEventListener('DOMContentLoaded', function() {
    let scene, camera, renderer, model;
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    
    // Initialize the page with item data
    if (itemId) {
        loadItemDetails(itemId);
        initThreeJS();
    } else {
        // Redirect if no ID is provided
        window.location.href = 'category.html';
    }
    
    // Initialize Three.js viewer
    function initThreeJS() {
        const container = document.getElementById('model-viewer');
        
        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf5f5f5);
        
        // Camera
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 3;
        
        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
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
    
    // Load item details from items.json
    function loadItemDetails(itemId) {
        fetch('data/items.json')
            .then(response => response.json())
            .then(data => {
                let itemData = null;
                let categoryName = '';
                
                // Find the item in categories
                for (const category of data.categories) {
                    const foundItem = category.items.find(item => item.id === itemId);
                    if (foundItem) {
                        itemData = foundItem;
                        categoryName = category.name;
                        break;
                    }
                }
                
                if (!itemData) {
                    throw new Error('Item not found');
                }
                
                // Update the page with item details
                updateItemDetails(itemData, categoryName);
                
                // Load the 3D model
                loadModel(itemData.modelPath);
                
                // Load texture options
                loadTextureOptions(itemData.textures);
                
                // Load similar items
                loadSimilarItems(itemId, categoryName, data);
            })
            .catch(error => {
                console.error('Error loading item details:', error);
                document.querySelector('.details-container').innerHTML = `
                    <div class="error-message">
                        <p>Error loading item details: ${error.message}</p>
                        <a href="category.html" class="btn">Back to Categories</a>
                    </div>
                `;
            });
    }
    
    // Update the page with item details
    function updateItemDetails(item, category) {
        document.getElementById('item-name').textContent = item.name;
        document.getElementById('item-category').querySelector('span').textContent = category;
        document.getElementById('item-price').querySelector('span').textContent = `$${item.price.toFixed(2)}`;
        document.getElementById('item-width').textContent = `${item.dimensions.width}m`;
        document.getElementById('item-height').textContent = `${item.dimensions.height}m`;
        document.getElementById('item-depth').textContent = `${item.dimensions.depth}m`;
        
        // Set up "Add to Room" button
        document.getElementById('add-to-room').addEventListener('click', function() {
            addToCurrentRoom(item);
        });
        
        // Set up "View in 3D" button
        document.getElementById('view-3d').addEventListener('click', function() {
            window.location.href = `viewer.html?id=${item.id}`;
        });
    }
    
    // Load the 3D model
    function loadModel(modelPath) {
        const loader = new THREE.GLTFLoader();
        
        loader.load(modelPath, function(gltf) {
            // Remove previous model if exists
            if (model) {
                scene.remove(model);
            }
            
            model = gltf.scene;
            scene.add(model);
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            const size = box.getSize(new THREE.Vector3()).length();
            const scale = 2.0 / size;
            model.scale.set(scale, scale, scale);
            
        }, undefined, function(error) {
            console.error('Error loading model:', error);
            document.getElementById('model-viewer').innerHTML = `
                <div class="model-error">
                    <p>Could not load 3D preview</p>
                </div>
            `;
        });
    }
    
    // Load texture options
    function loadTextureOptions(textures) {
        const container = document.getElementById('texture-options');
        
        if (textures.length === 0) {
            container.innerHTML = '<p>No texture options available for this item.</p>';
            return;
        }
        
        container.innerHTML = '';
        textures.forEach(texture => {
            const textureOption = document.createElement('div');
            textureOption.className = 'texture-option';
            
            const img = document.createElement('img');
            img.src = texture;
            img.alt = "Texture option";
            
            const label = document.createElement('span');
            label.textContent = texture.split('/').pop().replace('.jpg', '');
            
            textureOption.appendChild(img);
            textureOption.appendChild(label);
            container.appendChild(textureOption);
            
            // Add click handler to change model texture
            img.addEventListener('click', function() {
                changeModelTexture(texture);
            });
        });
    }
    
    // Change model texture
    function changeModelTexture(texturePath) {
        if (!model) return;
        
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(texturePath, function(texture) {
            // Apply texture to all materials in the model
            model.traverse(function(child) {
                if (child.isMesh) {
                    child.material.map = texture;
                    child.material.needsUpdate = true;
                }
            });
        });
    }
    
    // Load similar items from the same category
    function loadSimilarItems(currentItemId, categoryName, data) {
        const container = document.getElementById('similar-items-list');
        const category = data.categories.find(cat => cat.name === categoryName);
        
        if (!category || category.items.length <= 1) {
            container.innerHTML = '<p>No similar items found.</p>';
            return;
        }
        
        // Filter out the current item
        const similarItems = category.items.filter(item => item.id !== currentItemId).slice(0, 4);
        
        if (similarItems.length === 0) {
            container.innerHTML = '<p>No similar items found.</p>';
            return;
        }
        
        container.innerHTML = '';
        similarItems.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'similar-item-card';
            itemCard.innerHTML = `
                <img src="${getThumbnailForItem(item)}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            `;
            
            itemCard.addEventListener('click', function() {
                window.location.href = `details.html?id=${item.id}`;
            });
            
            container.appendChild(itemCard);
        });
    }
    
    // Helper function to get thumbnail for item
    function getThumbnailForItem(item) {
        // In a real app, you would have thumbnails for each item
        // For this demo, we'll use the first texture or a placeholder
        return item.textures.length > 0 ? item.textures[0] : 'assets/images/placeholder.jpg';
    }
    
    // Add item to current room (stores in localStorage)
    function addToCurrentRoom(item) {
        const currentRoom = localStorage.getItem('currentRoom') || 'living';
        const roomData = JSON.parse(localStorage.getItem(`room_${currentRoom}`) || JSON.stringify({
            items: [],
            roomType: currentRoom
        }));
        
        // Add the item to the room
        roomData.items.push({
            id: item.id,
            modelPath: item.modelPath,
            position: [0, 0, 0], // Default position
            rotation: [0, 0, 0], // Default rotation
            scale: [1, 1, 1]     // Default scale
        });
        
        // Save back to localStorage
        localStorage.setItem(`room_${currentRoom}`, JSON.stringify(roomData));
        
        alert(`${item.name} has been added to your ${currentRoom} room!`);
    }
});