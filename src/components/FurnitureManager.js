import React from 'react';
import './App.css';

const furnitureTypes = [
  'Bed', 'Bookshelf', 'Chair', 'Classic Chair', 
  'Desk', 'Sofa', 'Table', 'Wardrobe'
];

class FurnitureManager extends React.Component {
  handleAddFurniture = (type) => {
    this.props.onAddFurniture(type);
  };

  handleRemove = (id) => {
    this.props.onRemoveFurniture(id);
  };

  handleMove = (id, axis, value) => {
    const item = this.props.furnitureItems.find(item => item.id === id);
    if (!item) return;
    
    const newPosition = { ...item.model.position };
    newPosition[axis] = parseFloat(value);
    this.props.onMoveFurniture(id, newPosition);
  };

  handleRotate = (id, axis, value) => {
    const item = this.props.furnitureItems.find(item => item.id === id);
    if (!item) return;
    
    const newRotation = { ...item.model.rotation };
    newRotation[axis] = parseFloat(value) * (Math.PI / 180); // Convert degrees to radians
    this.props.onRotateFurniture(id, newRotation);
  };

  handleResize = (id, size) => {
    this.props.onResizeFurniture(id, size);
  };

  handleSizeAdjustment = (id, increment) => {
    const item = this.props.furnitureItems.find(item => item.id === id);
    if (!item) return;
    
    const sizes = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(item.size);
    let newIndex = currentIndex + increment;
    
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= sizes.length) newIndex = sizes.length - 1;
    
    if (newIndex !== currentIndex) {
      this.props.onResizeFurniture(id, sizes[newIndex]);
    }
  };

  render() {
    return (
      <div className="ui-section dark-theme">
        <h3>Furniture Manager</h3>
        
        <div className="subsection">
          <h4>Add Furniture</h4>
          <div className="button-grid">
            {furnitureTypes.map((type) => (
              <button 
                key={type} 
                className="modern-button"
                onClick={() => this.handleAddFurniture(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="subsection">
          <h4>Manage Furniture</h4>
          {this.props.furnitureItems.length > 0 ? (
            this.props.furnitureItems.map((item) => (
              <div key={item.id} className="furniture-item dark-card">
                <div className="item-header">
                  <span>{item.type}</span>
                  <button 
                    className="modern-button danger"
                    onClick={() => this.handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="item-controls">
                  <div className="control-group">
                    <h5>Position</h5>
                    <div className="input-group">
                      <label>X:</label>
                      <input
                        type="number"
                        value={item.model.position.x}
                        onChange={(e) => this.handleMove(item.id, 'x', e.target.value)}
                        step="0.1"
                      />
                    </div>
                    <div className="input-group">
                      <label>Z:</label>
                      <input
                        type="number"
                        value={item.model.position.z}
                        onChange={(e) => this.handleMove(item.id, 'z', e.target.value)}
                        step="0.1"
                      />
                    </div>
                  </div>
                  
                  <div className="control-group">
                    <h5>Rotation</h5>
                    <div className="input-group">
                      <label>Y:</label>
                      <input
                        type="number"
                        value={(item.model.rotation.y * (180 / Math.PI)).toFixed(1)}
                        onChange={(e) => this.handleRotate(item.id, 'y', e.target.value)}
                        step="5"
                      />
                    </div>
                  </div>
                  
                  <div className="control-group">
                    <h5>Size</h5>
                    <div className="size-controls">
                      <button 
                        className="modern-button icon"
                        onClick={() => this.handleSizeAdjustment(item.id, -1)}
                        disabled={item.size === 'small'}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <select
                        value={item.size}
                        onChange={(e) => this.handleResize(item.id, e.target.value)}
                        className="modern-select"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                      <button 
                        className="modern-button icon"
                        onClick={() => this.handleSizeAdjustment(item.id, 1)}
                        disabled={item.size === 'large'}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items">No furniture items added yet</p>
          )}
        </div>
      </div>
    );
  }
}

export default FurnitureManager;