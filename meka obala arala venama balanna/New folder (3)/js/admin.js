document.addEventListener('DOMContentLoaded', function() {
    // Show model form when Add Model card is clicked
    if (document.getElementById('addModelCard')) {
        document.getElementById('addModelCard').addEventListener('click', function() {
            document.getElementById('modelForm').classList.remove('hidden');
            document.getElementById('roomsPreview').classList.add('hidden');
        });
    }

    // Show rooms preview when View Rooms card is clicked
    if (document.getElementById('viewRoomsCard')) {
        document.getElementById('viewRoomsCard').addEventListener('click', function() {
            document.getElementById('roomsPreview').classList.remove('hidden');
            document.getElementById('modelForm').classList.add('hidden');
        });
    }

    // Handle model upload form
    if (document.getElementById('uploadForm')) {
        document.getElementById('uploadForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const modelName = document.getElementById('modelName').value;
            const modelCategory = document.getElementById('modelCategory').value;
            const modelFile = document.getElementById('modelFile').files[0];
            const textureFiles = Array.from(document.querySelectorAll('.texture-file')).map(el => el.files[0]);
            
            // Validate
            if (!modelName || !modelCategory || !modelFile || textureFiles.some(file => !file)) {
                alert('Please fill all fields and upload all required files');
                return;
            }
            
            // In a real app, this would upload to a server
            // For frontend-only, we'll simulate saving to localStorage
            const newModel = {
                id: Date.now(),
                name: modelName,
                category: modelCategory,
                modelPath: URL.createObjectURL(modelFile),
                textures: textureFiles.map(file => URL.createObjectURL(file))
            };
            
            // Save to simulated database
            let models = JSON.parse(localStorage.getItem('furnitureModels') || '[]');
            models.push(newModel);
            localStorage.setItem('furnitureModels', JSON.stringify(models));
            
            alert('Model uploaded successfully!');
            this.reset();
        });
    }

    // Load room in viewer
    if (document.getElementById('loadRoomBtn')) {
        document.getElementById('loadRoomBtn').addEventListener('click', function() {
            const roomType = document.getElementById('roomSelect').value;
            loadRoomInViewer(roomType);
        });
    }
});

function loadRoomInViewer(roomType) {
    // This would be implemented in three-app.js
    console.log(`Loading ${roomType} room in viewer`);
    // In a real implementation, this would initialize Three.js scene with the selected room
}