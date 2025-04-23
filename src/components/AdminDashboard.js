import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for demonstration
  const sampleModels = [
    { id: 1, name: 'sofa', category: 'sofa', price: 899.99, status: 'active', date: '2023-05-15' },
    { id: 2, name: 'Chair', category: 'office-chair', price: 249.99, status: 'active', date: '2023-06-02' },
    { id: 3, name: 'Table', category: 'table', price: 599.99, status: 'inactive', date: '2023-04-20' },
    { id: 4, name: 'bed', category: 'bed', price: 1299.99, status: 'active', date: '2023-07-10' },
    { id: 5, name: 'Bookshelf', category: 'cabinet', price: 349.99, status: 'active', date: '2023-03-28' },
  ];

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setModels(sampleModels);
      setIsLoading(false);
    }, 500);
  }, []);

  const formatCategory = (category) => {
    const words = category.split('-');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const showNotification = (message, type) => {
    // In a real app, you would implement a proper notification system
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const previewModel = (modelId) => {
    showNotification(`Previewing model #${modelId}`, 'success');
  };

  const editModel = (modelId) => {
    setActiveSection('add-model');
    showNotification(`Editing model #${modelId}`, 'success');
  };

  const deleteModel = (modelId) => {
    if (window.confirm(`Are you sure you want to delete model #${modelId}?`)) {
      showNotification(`Model #${modelId} deleted`, 'success');
      setModels(models.filter(model => model.id !== parseInt(modelId)));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showNotification('Model uploaded successfully!', 'success');
    setActiveSection('dashboard');
  };

  return (
    <div className="admin-container">
      <header>
        <div className="logo">
          <i className="fas fa-couch"></i>
          <span>FurniCraft Admin</span>
        </div>
        <nav>
          <ul>
            <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
            <li>
              <Link 
                to="/admin" 
                className={activeSection === 'dashboard' ? 'active' : ''}
                onClick={() => setActiveSection('dashboard')}
              >
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </li>
            <li><Link to="/logout" id="logout"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
          </ul>
        </nav>
      </header>

      <main className="admin-main">
        {activeSection === 'dashboard' && (
          <section className="admin-actions">
            <h2><i className="fas fa-tasks"></i> Admin Dashboard</h2>
            <div className="action-cards">
              <div className="card" onClick={() => setActiveSection('add-model')}>
                <h3><i className="fas fa-plus-circle"></i> Add New Model</h3>
                <p>Upload new 3D furniture models to the catalog</p>
                <button className="btn"><i className="fas fa-upload"></i> Add Model</button>
              </div>
              <div className="card" onClick={() => setActiveSection('models-list')}>
                <h3><i className="fas fa-boxes"></i> Manage Models</h3>
                <p>View, edit or delete existing furniture models</p>
                <button className="btn"><i className="fas fa-list"></i> View Models</button>
              </div>
              <div className="card" onClick={() => setActiveSection('rooms-preview')}>
                <h3><i className="fas fa-door-open"></i> View Rooms</h3>
                <p>Preview furniture arrangements in different room types</p>
                <button className="btn"><i className="fas fa-eye"></i> View Rooms</button>
              </div>
              <div className="card" onClick={() => setActiveSection('analytics')}>
                <h3><i className="fas fa-chart-line"></i> Analytics</h3>
                <p>View usage statistics and model popularity</p>
                <button className="btn"><i className="fas fa-chart-pie"></i> View Analytics</button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'add-model' && (
          <section className="model-form">
            <h2><i className="fas fa-cube"></i> Add New Furniture Model</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="modelName">Model Name</label>
                <input type="text" id="modelName" placeholder="Enter model name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="modelDescription">Description</label>
                <textarea id="modelDescription" rows="3" placeholder="Enter model description"></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="modelCategory">Category</label>
                <select id="modelCategory" required>
                  <option value="">Select a category</option>
                  <option value="sofa">Sofa</option>
                  <option value="chair">Chair</option>
                  <option value="table">Table</option>
                  <option value="bed">Bed</option>
                  <option value="outdoor">Outdoor Sofa</option>
                  <option value="desk">Desk</option>
                  <option value="cabinet">Cabinet</option>
                  <option value="office-chair">Office Chair</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="modelPrice">Price (USD)</label>
                <input type="number" id="modelPrice" placeholder="Enter price" min="0" step="0.01" />
              </div>
              
              <div className="form-group">
                <label htmlFor="modelDimensions">Dimensions (L x W x H in cm)</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input type="number" id="modelLength" placeholder="Length" min="0" style={{ flex: 1 }} />
                  <input type="number" id="modelWidth" placeholder="Width" min="0" style={{ flex: 1 }} />
                  <input type="number" id="modelHeight" placeholder="Height" min="0" style={{ flex: 1 }} />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="modelFile">GLTF Model File</label>
                <input type="file" id="modelFile" accept=".gltf,.glb" required />
              </div>
              
              <div className="form-group">
                <label>Textures (3 required)</label>
                <div className="texture-files">
                  <div className="texture-file-container">
                    <i className="fas fa-image"></i>
                    <p>Base Color</p>
                    <input type="file" className="texture-file" accept=".jpg,.png,.jpeg" required />
                  </div>
                  <div className="texture-file-container">
                    <i className="fas fa-image"></i>
                    <p>Normal Map</p>
                    <input type="file" className="texture-file" accept=".jpg,.png,.jpeg" required />
                  </div>
                  <div className="texture-file-container">
                    <i className="fas fa-image"></i>
                    <p>Roughness/Metalness</p>
                    <input type="file" className="texture-file" accept=".jpg,.png,.jpeg" required />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="modelThumbnail">Thumbnail Image</label>
                <input type="file" id="modelThumbnail" accept=".jpg,.png,.jpeg" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="modelStatus">Status</label>
                <select id="modelStatus">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-success"><i className="fas fa-save"></i> Save Model</button>
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  onClick={() => setActiveSection('dashboard')}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {activeSection === 'models-list' && (
          <section className="models-list">
            <h2><i className="fas fa-box-open"></i> Furniture Models</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Date Added</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                        Loading models...
                      </td>
                    </tr>
                  ) : (
                    models.map(model => (
                      <tr key={model.id}>
                        <td>{model.id}</td>
                        <td>{model.name}</td>
                        <td>{formatCategory(model.category)}</td>
                        <td>${model.price.toFixed(2)}</td>
                        <td>
                          <span className={`status-badge status-${model.status}`}>
                            {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                          </span>
                        </td>
                        <td>{model.date}</td>
                        <td>
                          <div className="action-btns">
                            <button 
                              className="action-btn preview-btn" 
                              title="Preview" 
                              onClick={() => previewModel(model.id)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button 
                              className="action-btn edit-btn" 
                              title="Edit" 
                              onClick={() => editModel(model.id)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="action-btn delete-btn" 
                              title="Delete" 
                              onClick={() => deleteModel(model.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <div>
                <button 
                  className="btn" 
                  onClick={() => setActiveSection('add-model')}
                >
                  <i className="fas fa-plus"></i> Add New Model
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-outline"><i className="fas fa-download"></i> Export</button>
                <button className="btn btn-outline"><i className="fas fa-filter"></i> Filter</button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'rooms-preview' && (
          <section className="rooms-preview">
            <h2><i className="fas fa-camera"></i> Rooms Preview</h2>
            <div className="room-selector">
              <select id="roomSelect">
                <option value="">Select a room type</option>
                <option value="kids">Kids Room</option>
                <option value="kitchen">Kitchen</option>
                <option value="living">Living Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="dining">Dining Room</option>
                <option value="office">Office</option>
                <option value="bathroom">Bathroom</option>
              </select>
              <button className="btn"><i className="fas fa-sync-alt"></i> Load Room</button>
            </div>
            <div className="threejs-container" id="roomViewer">
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
                <p>Loading room...</p>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <h3>Available Furniture in This Room</h3>
              <div className="action-cards">
                {models.slice(0, 4).map(item => (
                  <div className="card" key={item.id}>
                    <h3>{item.name}</h3>
                    <p>Category: {formatCategory(item.category)}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <button 
                      className="btn btn-outline" 
                      style={{ marginTop: '0.5rem' }}
                      onClick={() => previewModel(item.id)}
                    >
                      <i className="fas fa-search"></i> Preview
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'analytics' && (
          <section className="analytics">
            <h2><i className="fas fa-chart-bar"></i> Analytics Dashboard</h2>
            <div className="action-cards">
              <div className="card">
                <h3><i className="fas fa-cubes"></i> Total Models</h3>
                <p>{models.length}</p>
              </div>
              <div className="card">
                <h3><i className="fas fa-eye"></i> Monthly Views</h3>
                <p>1,245 views</p>
              </div>
              <div className="card">
                <h3><i className="fas fa-star"></i> Most Popular</h3>
                <p>Modern Sofa (328 views)</p>
              </div>
              <div className="card">
                <h3><i className="fas fa-users"></i> Active Users</h3>
                <p>142 active users</p>
              </div>
            </div>
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: 'var(--border-radius)', 
              boxShadow: 'var(--box-shadow)', 
              padding: '2rem', 
              marginTop: '2rem' 
            }}>
              <h3>Model Usage Statistics</h3>
              <div id="chartContainer" style={{ height: '400px', width: '100%' }}>
                {/* Chart would be rendered here */}
                <p style={{ textAlign: 'center', padding: '4rem' }}>
                  Chart visualization would appear here in a real application
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} FurniCraft Admin. All rights reserved.</p>
      </footer>

      <style jsx global>{`
        :root {
          --primary-color: #4361ee;
          --secondary-color: #3f37c9;
          --accent-color: #4895ef;
          --dark-color: #2b2d42;
          --light-color: #f8f9fa;
          --success-color: #4cc9f0;
          --warning-color: #f8961e;
          --danger-color: #f72585;
          --gray-color: #adb5bd;
          --border-radius: 8px;
          --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s ease;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          background-color: #f5f7fb;
          color: var(--dark-color);
          line-height: 1.6;
        }

        header {
          background-color: white;
          box-shadow: var(--box-shadow);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo i {
          font-size: 1.8rem;
        }

        nav ul {
          display: flex;
          list-style: none;
          gap: 1.5rem;
        }

        nav a {
          text-decoration: none;
          color: var(--dark-color);
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        nav a:hover {
          background-color: #f0f2f5;
        }

        nav a.active {
          background-color: var(--primary-color);
          color: white;
        }

        nav a i {
          font-size: 1.1rem;
        }

        .admin-main {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        h2 {
          color: var(--dark-color);
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 4px;
          background-color: var(--accent-color);
          border-radius: 2px;
        }

        .action-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .card {
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 1.5rem;
          transition: var(--transition);
          cursor: pointer;
          border-left: 4px solid var(--primary-color);
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .card h3 {
          color: var(--dark-color);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card h3 i {
          color: var(--primary-color);
        }

        .card p {
          color: var(--gray-color);
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .btn {
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: var(--border-radius);
          cursor: pointer;
          font-weight: 500;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn:hover {
          background-color: var(--secondary-color);
          transform: translateY(-2px);
        }

        .btn-outline {
          background-color: transparent;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
        }

        .btn-outline:hover {
          background-color: var(--primary-color);
          color: white;
        }

        .btn-danger {
          background-color: var(--danger-color);
        }

        .btn-danger:hover {
          background-color: #d1145a;
        }

        .btn-success {
          background-color: var(--success-color);
        }

        .btn-success:hover {
          background-color: #3aa8d8;
        }

        .model-form, .rooms-preview {
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 2rem;
          margin-top: 2rem;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--dark-color);
        }

        input[type="text"],
        input[type="file"],
        select,
        textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid var(--gray-color);
          border-radius: var(--border-radius);
          font-size: 1rem;
          transition: var(--transition);
        }

        input[type="text"]:focus,
        input[type="file"]:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
        }

        .texture-files {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .texture-file-container {
          border: 1px dashed var(--gray-color);
          border-radius: var(--border-radius);
          padding: 1rem;
          text-align: center;
          transition: var(--transition);
        }

        .texture-file-container:hover {
          border-color: var(--primary-color);
        }

        .texture-file-container i {
          font-size: 2rem;
          color: var(--gray-color);
          margin-bottom: 0.5rem;
        }

        .texture-file-container p {
          font-size: 0.8rem;
          color: var(--gray-color);
        }

        .room-selector {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .room-selector select {
          flex: 1;
        }

        .threejs-container {
          width: 100%;
          height: 500px;
          background-color: #e9ecef;
          border-radius: var(--border-radius);
          position: relative;
          overflow: hidden;
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          z-index: 10;
        }

        .loading-spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid white;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .models-list {
          margin-top: 2rem;
        }

        .table-container {
          overflow-x: auto;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 1rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: var(--dark-color);
        }

        tr:hover {
          background-color: #f8f9fa;
        }

        .status-badge {
          display: inline-block;
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .status-active {
          background-color: #e3fafc;
          color: #1098ad;
        }

        .status-inactive {
          background-color: #fff3bf;
          color: #f59f00;
        }

        .action-btns {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 0.3rem;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .action-btn:hover {
          background-color: #f1f3f5;
        }

        .edit-btn {
          color: var(--accent-color);
        }

        .delete-btn {
          color: var(--danger-color);
        }

        .preview-btn {
          color: var(--success-color);
        }

        footer {
          text-align: center;
          padding: 1.5rem;
          margin-top: 2rem;
          background-color: white;
          color: var(--gray-color);
          font-size: 0.9rem;
        }

        .hidden {
          display: none;
        }

        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 1.5rem;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          color: white;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 1000;
          animation: slideIn 0.3s ease, fadeOut 0.5s ease 3s forwards;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .notification.success {
          background-color: var(--success-color);
        }

        .notification.error {
          background-color: var(--danger-color);
        }

        .notification.warning {
          background-color: var(--warning-color);
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          header {
            flex-direction: column;
            padding: 1rem;
          }

          nav ul {
            margin-top: 1rem;
            flex-wrap: wrap;
            justify-content: center;
          }

          .action-cards {
            grid-template-columns: 1fr;
          }

          .room-selector {
            flex-direction: column;
          }

          .threejs-container {
            height: 350px;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;