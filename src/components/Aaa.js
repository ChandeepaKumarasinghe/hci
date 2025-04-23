// admin.js

document.addEventListener('DOMContentLoaded', function () {
    const addModelCard = document.getElementById('addModelCard');
    const viewModelsCard = document.getElementById('viewModelsCard');
    const viewRoomsCard = document.getElementById('viewRoomsCard');
    const analyticsCard = document.getElementById('analyticsCard');

    const modelForm = document.getElementById('modelForm');
    const modelsList = document.getElementById('modelsList');
    const roomsPreview = document.getElementById('roomsPreview');
    const analyticsSection = document.getElementById('analyticsSection');

    const cancelModelBtn = document.getElementById('cancelModelBtn');
    const addNewModelBtn = document.getElementById('addNewModelBtn');
    const loadRoomBtn = document.getElementById('loadRoomBtn');

    const uploadForm = document.getElementById('uploadForm');
    const modelsTableBody = document.getElementById('modelsTableBody');
    const roomSelect = document.getElementById('roomSelect');
    const roomViewer = document.getElementById('roomViewer');
    const roomLoading = document.getElementById('roomLoading');

    const sampleModels = [
        { id: 1, name: 'Modern Sofa', category: 'sofa', price: 899.99, status: 'active', date: '2023-05-15' },
        { id: 2, name: 'Office Chair', category: 'office-chair', price: 249.99, status: 'active', date: '2023-06-02' },
        { id: 3, name: 'Dining Table', category: 'table', price: 599.99, status: 'inactive', date: '2023-04-20' },
        { id: 4, name: 'King Size Bed', category: 'bed', price: 1299.99, status: 'active', date: '2023-07-10' },
        { id: 5, name: 'Bookshelf', category: 'cabinet', price: 349.99, status: 'active', date: '2023-03-28' },
    ];

    function hideAllSections() {
        modelForm.classList.add('hidden');
        modelsList.classList.add('hidden');
        roomsPreview.classList.add('hidden');
        analyticsSection.classList.add('hidden');
    }

    function resetForm() {
        uploadForm.reset();
    }

    function formatCategory(category) {
        return category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = notification ${ type };
        notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        ${message}
      `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3500);
    }

    function loadModelsTable() {
        modelsTableBody.innerHTML = '';
        sampleModels.forEach(model => {
            const row = document.createElement('tr');
            row.innerHTML = `
          <td>${model.id}</td>
          <td>${model.name}</td>
          <td>${formatCategory(model.category)}</td>
          <td>$${model.price.toFixed(2)}</td>
          <td><span class="status-badge status-${model.status}">${model.status.charAt(0).toUpperCase() + model.status.slice(1)}</span></td>
          <td>${model.date}</td>
          <td>
            <div class="action-btns">
              <button class="action-btn preview-btn" title="Preview" data-id="${model.id}"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" title="Edit" data-id="${model.id}"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" title="Delete" data-id="${model.id}"><i class="fas fa-trash"></i></button>
            </div>
          </td>
        `;
            modelsTableBody.appendChild(row);
        });

        document.querySelectorAll('.preview-btn').forEach(btn => {
            btn.addEventListener('click', () => showNotification(Previewing model #${ btn.dataset.id }, 'success'));
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                hideAllSections();
                modelForm.classList.remove('hidden');
                document.getElementById('modelName').value = Editing Model #${ btn.dataset.id };
                showNotification(Editing model #${ btn.dataset.id }, 'success');
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm(Are you sure you want to delete model #${ btn.dataset.id } ?)) {
                    showNotification(Model #${ btn.dataset.id } deleted, 'success');
                    loadModelsTable();
                }
            });
        });
    }

    addModelCard.addEventListener('click', () => {
        hideAllSections();
        modelForm.classList.remove('hidden');
    });

    viewModelsCard.addEventListener('click', () => {
        hideAllSections();
        modelsList.classList.remove('hidden');
        loadModelsTable();
    });

    viewRoomsCard.addEventListener('click', () => {
        hideAllSections();
        roomsPreview.classList.remove('hidden');
    });

    analyticsCard.addEventListener('click', () => {
        hideAllSections();
        analyticsSection.classList.remove('hidden');
    });

    cancelModelBtn.addEventListener('click', hideAllSections);

    addNewModelBtn.addEventListener('click', () => {
        hideAllSections();
        modelForm.classList.remove('hidden');
    });

    loadRoomBtn.addEventListener('click', () => {
        if (roomSelect.value) {
            showNotification(Loading ${ roomSelect.value } preview..., 'success');
        } else {
            showNotification('Please select a room type first', 'error');
        }
    });

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Model uploaded successfully!', 'success');
        resetForm();
        hideAllSections();
    });

    loadModelsTable();
});