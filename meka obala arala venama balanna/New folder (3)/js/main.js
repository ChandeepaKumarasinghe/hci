// Simulated database
let furnitureData = {
    "sofa": [
        { id: 1, name: "Modern Sofa", price: 599, image: "assets/images/sofa1.jpg" },
        { id: 2, name: "Leather Sofa", price: 899, image: "assets/images/sofa2.jpg" }
    ],
    "chair": [
        { id: 3, name: "Dining Chair", price: 129, image: "assets/images/chair1.jpg" },
        { id: 4, name: "Accent Chair", price: 199, image: "assets/images/chair2.jpg" }
    ],
    // Add more categories and items as needed
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load featured items on home page
    if (document.querySelector('.furniture-grid')) {
        loadFeaturedItems();
    }

    // Handle login form submission
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userType = document.getElementById('userType').value;
            
            // Simulated login - in a real app, this would be server-side
            if (username && password) {
                if (userType === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'rooms.html';
                }
            } else {
                alert('Please enter both username and password');
            }
        });
    }

    // Handle logout
    if (document.getElementById('logout')) {
        document.getElementById('logout').addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});

// Load featured items
function loadFeaturedItems() {
    const grid = document.querySelector('.furniture-grid');
    grid.innerHTML = '';
    
    // Get 4 random items from all categories
    let allItems = [];
    for (const category in furnitureData) {
        allItems = allItems.concat(furnitureData[category]);
    }
    
    // Shuffle and get first 4
    const shuffled = allItems.sort(() => 0.5 - Math.random());
    const featured = shuffled.slice(0, 4);
    
    featured.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'furniture-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="info">
                <h3>${item.name}</h3>
                <div class="price">$${item.price}</div>
                <a href="details.html?id=${item.id}" class="btn">View Details</a>
            </div>
        `;
        grid.appendChild(itemElement);
    });
}