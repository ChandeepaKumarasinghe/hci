import React from 'react';

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

  handleResize = (id, size) => {
    this.props.onResizeFurniture(id, size);
  };

  render() {
    return (
      <div className="ui-section">
        <h3>Furniture Manager</h3>

        <a
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            margin: '10px 0'
          }}
          href="/login"
        >
          Login
        </a>


        <div className="subsection">
          <h4>Add Furniture</h4>
          <div className="button-group">
            {furnitureTypes.map((type) => (
              <button key={type} onClick={() => this.handleAddFurniture(type)}>
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="subsection">
          <h4>Manage Furniture</h4>
          {this.props.furnitureItems.map((item) => (
            <div key={item.id} className="furniture-item">
              <div className="item-header">
                <span>{item.type}</span>
                <button onClick={() => this.handleRemove(item.id)}>Remove</button>
              </div>

              <div className="item-controls">
                <div className="position-controls">
                  <label>X:
                    <input
                      type="number"
                      value={item.model.position.x}
                      onChange={(e) => this.handleMove(item.id, 'x', e.target.value)}
                      step="0.1"
                    />
                  </label>
                  <label>Z:
                    <input
                      type="number"
                      value={item.model.position.z}
                      onChange={(e) => this.handleMove(item.id, 'z', e.target.value)}
                      step="0.1"
                    />
                  </label>
                </div>

                <div className="size-controls">
                  <label>Size:</label>
                  <select
                    value={item.size}
                    onChange={(e) => this.handleResize(item.id, e.target.value)}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FurnitureManager;