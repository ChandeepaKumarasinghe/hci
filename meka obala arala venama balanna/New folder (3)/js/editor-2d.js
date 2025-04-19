// 2D Editor functionality
let canvas, ctx;
let roomImage = null;
let furnitureItems = [];
let selectedItem = null;
let placedItems = [];

// Initialize the editor
function initEditor() {
    canvas = document.getElementById('roomCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Load furniture items
    loadFurnitureItems();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load default room
    loadRoom('living');
}

// Update canvas size to fit container
function updateCanvasSize() {
    const container = document.getElementById('roomCanvasContainer');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawRoom();
}

// Load furniture items from JSON
function loadFurnitureItems() {
    fetch('data/furniture.json')
        .then(response => response.json())
        .then(data => {
            furnitureItems = data.items;
            renderFurnitureItems();
        });
}

// Render furniture items in the panel
function renderFurnitureItems() {
    const container = document.getElementById('furnitureItems2D');
    container.innerHTML = '';
    
    furnitureItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'furniture-item-2d';
        itemElement.dataset.id = item.id;
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="name">${item.name}</div>
        `;
        container.appendChild(itemElement);
    });
}

// Load room image
function loadRoom(roomType) {
    // In a real app, this would load different room images
    roomImage = new Image();
    roomImage.src = `assets/images/rooms/${roomType}-room.jpg`;
    roomImage.onload = function() {
        drawRoom();
    };
}

// Draw the room and furniture
function drawRoom() {
    if (!roomImage) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw room (scaled to fit canvas)
    const scale = Math.min(canvas.width / roomImage.width, canvas.height / roomImage.height);
    const width = roomImage.width * scale;
    const height = roomImage.height * scale;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;
    
    ctx.drawImage(roomImage, x, y, width, height);
    
    // Draw placed furniture items
    placedItems.forEach(item => {
        const img = new Image();
        img.src = item.image;
        // In a real app, you would properly position and scale the furniture
        ctx.drawImage(img, item.x, item.y, 100, 100);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Room selection
    document.getElementById('loadRoom2D').addEventListener('click', function() {
        const roomType = document.getElementById('roomSelect2D').value;
        loadRoom(roomType);
    });
    
    // Furniture item selection
    document.getElementById('furnitureItems2D').addEventListener('click', function(e) {
        const itemElement = e.target.closest('.furniture-item-2d');
        if (itemElement) {
            const itemId = itemElement.dataset.id;
            selectFurnitureItem(itemId);
        }
    });
    
    // Canvas click for placing items
    canvas.addEventListener('click', function(e) {
        if (selectedItem) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            placedItems.push({
                id: selectedItem.id,
                image: selectedItem.image,
                x: x - 50, // Center on click
                y: y - 50
            });
            
            drawRoom();
        }
    });
    
    // Switch to 3D editor
    document.getElementById('switchTo3D').addEventListener('click', function() {
        window.location.href = 'editor-3d.html';
    });
    
    // Save design
    document.getElementById('saveDesign2D').addEventListener('click', function() {
        alert('Design saved! (In a real app, this would save to your account)');
    });
}

// Select a furniture item
function selectFurnitureItem(itemId) {
    selectedItem = furnitureItems.find(item => item.id == itemId);
    
    if (selectedItem) {
        const propsContainer = document.getElementById('itemProperties2D');
        propsContainer.innerHTML = `
            <h4>${selectedItem.name}</h4>
            <div class="form-group">
                <label for="itemSize2D">Size</label>
                <select id="itemSize2D">
                    ${selectedItem.sizes.map(size => `
                        <option value="${size}">${size.charAt(0).toUpperCase() + size.slice(1)}</option>
                    `).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="itemColor2D">Color</label>
                <select id="itemColor2D">
                    ${selectedItem.colors.map(color => `
                        <option value="${color}">${color.charAt(0).toUpperCase() + color.slice(1)}</option>
                    `).join('')}
                </select>
            </div>
            <button class="btn" id="removeItem2D">Remove Item</button>
        `;
        
        // Set up property change listeners
        document.getElementById('itemSize2D').addEventListener('change', updateSelectedItem);
        document.getElementById('itemColor2D').addEventListener('change', updateSelectedItem);
        document.getElementById('removeItem2D').addEventListener('click', removeSelectedItem);
    }
}

// Update selected item properties
function updateSelectedItem() {
    if (selectedItem) {
        // In a real app, this would update the item's appearance
        console.log('Item properties updated');
    }
}

// Remove selected item
function removeSelectedItem() {
    if (selectedItem) {
        placedItems = placedItems.filter(item => item.id !== selectedItem.id);
        drawRoom();
        document.getElementById('itemProperties2D').innerHTML = '<p>Select an item to edit its properties</p>';
        selectedItem = null;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initEditor);