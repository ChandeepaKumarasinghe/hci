// assets/js/user.js
document.addEventListener('DOMContentLoaded', function() {
    // Room selection functionality
    if (document.querySelector('.room-card')) {
        document.querySelectorAll('.room-card').forEach(card => {
            card.addEventListener('click', function() {
                const roomType = this.getAttribute('data-room');
                localStorage.setItem('currentRoom', roomType);
                window.location.href = 'category.html';
            });
        });
    }

    // Category page functionality
    if (document.getElementById('category-list')) {
        const currentRoom = localStorage.getItem('currentRoom') || 'living';
        document.getElementById('current-room').textContent = 
            currentRoom.charAt(0).toUpperCase() + currentRoom.slice(1) + ' Room';

        fetch('data/items.json')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('category-list');
                data.categories.forEach(category => {
                    container.innerHTML += `
                        <div class="category-card" data-category="${category.id}">
                            <h3>${category.name}</h3>
                            <p>${category.items.length} items available</p>
                        </div>
                    `;
                });

                // Add click handlers
                document.querySelectorAll('.category-card').forEach(card => {
                    card.addEventListener('click', function() {
                        const categoryId = this.getAttribute('data-category');
                        localStorage.setItem('currentCategory', categoryId);
                        window.location.href = 'editor.html';
                    });
                });
            });
    }
});