// Shared functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Handle login page
    if (document.getElementById('login-form')) {
        const loginForm = document.getElementById('login-form');
        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role');
        
        if (role) {
            document.getElementById('login-title').textContent = 
                role === 'admin' ? 'Admin Login' : 'User Login';
        }
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (username && password) {
                if (role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'rooms.html';
                }
            } else {
                alert('Please enter both username and password');
            }
        });
    }
    
    // Load featured items on home page
    if (document.getElementById('featured-models')) {
        fetch('data/items.json')
            .then(response => response.json())
            .then(data => {
                const featuredContainer = document.getElementById('featured-models');
                data.categories.forEach(category => {
                    category.items.slice(0, 2).forEach(item => {
                        featuredContainer.innerHTML += `
                            <div class="model-card">
                                <h3>${item.name}</h3>
                                <p>Category: ${category.name}</p>
                                <button class="btn" onclick="location.href='details.html?id=${item.id}'">View Details</button>
                            </div>
                        `;
                    });
                });
            });
    }
});