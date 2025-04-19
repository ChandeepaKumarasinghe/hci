document.addEventListener('DOMContentLoaded', function() {
    // Category tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items by category
            const category = this.dataset.category;
            filterFurnitureItems(category);
        });
    });
    
    // Load furniture items
    loadFurnitureItems();
    
    // Handle item selection
    document.querySelector('.furniture-items').addEventListener('click', function(e) {
        if (e.target.closest('.item')) {
            const itemId = e.target.closest('.item').dataset.id;
            selectFurnitureItem(itemId);
        }
    });
    
    // Handle property changes
    document.getElementById('itemSize').addEventListener('change', updateSelectedItem);
    document.getElementById('itemColor').addEventListener('change', updateSelectedItem);
    document.getElementById('itemRotation').addEventListener('input', updateSelectedItem);
    
    // Remove item
    document.getElementById('removeItem').addEventListener('click', function() {
        // In a real implementation, this would remove the selected item from the scene
        console.log('Remove selected item');
    });
    
    // Save design
    document.getElementById('saveDesign').addEventListener('click', function() {
        alert('Design saved! (In a real app, this would save to your account)');
    });
});

// Load furniture items from "database"
function loadFurnitureItems() {
    const itemsContainer = document.querySelector('.furniture-items');
    itemsContainer.innerHTML = '';
    
    // In a real app, this would come from an API or database
    // For demo, we'll use a mix of hardcoded and localStorage items
    const hardcodedItems = [
        { id: 'sofa1', name: 'Modern Sofa', category: 'sofa', image: 'assets/images/sofa1.jpg' },
        { id: 'chair1', name: 'Dining Chair', category: 'chair', image: 'assets/images/chair1.jpg' },
        { id: 'table1', name: 'Coffee Table', category: 'table', image: 'assets/images/table1.jpg' },
        { id: 'bed1', name: 'Queen Bed', category: 'bed', image: 'assets/images/bed1.jpg' }
    ];
    
    // Get items from localStorage (added by admin)
    const savedModels = JSON.parse(localStorage.getItem('furnitureModels') || []);
    const savedItems = savedModels.map(model => ({
        id: model.id,
        name: model.name,
        category: model.category,
        image: model.textures[0] || 'assets/images/default-model.jpg'
    }));
    
    const allItems = [...hardcodedItems, ...savedItems];
    
    allItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.dataset.id = item.id;
        itemElement.dataset.category = item.category;
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>${item.name}</div>
        `;
        itemsContainer.appendChild(itemElement);
    });
}

// Filter items by category
function filterFurnitureItems(category) {
    const items = document.querySelectorAll('.furniture-items .item');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Select a furniture item to place in the room
function selectFurnitureItem(itemId) {
    console.log(`Selected item ${itemId} - in a real app, this would enable placement in the 3D scene`);
    
    // In a real implementation:
    // 1. Get model data based on itemId
    // 2. Enable placement mode in Three.js scene
    // 3. On click in the scene, place the model at that position
}

// Update selected item properties
function updateSelectedItem() {
    const size = document.getElementById('itemSize').value;
    const color = document.getElementById('itemColor').value;
    const rotation = document.getElementById('itemRotation').value;
    
    console.log(`Updating item - Size: ${size}, Color: ${color}, Rotation: ${rotation}°`);
    
    // In a real implementation, this would update the selected item in the Three.js scene
}