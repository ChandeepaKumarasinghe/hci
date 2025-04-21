import React from 'react';

const predefinedColors = [
  '#ffffff', '#f5f5f5', '#e0e0e0', 
  '#a1887f', '#8d6e63', '#6d4c41',
  '#e1f5fe', '#b3e5fc', '#81d4fa',
  '#e8f5e9', '#c8e6c9', '#a5d6a7'
];

class WallCustomizer extends React.Component {
  handleColorChange = (color) => {
    this.props.onChangeColor(color);
  };

  render() {
    return (
      <div className="ui-section">
        <h3>Wall Customization</h3>
        
        <div className="color-picker">
          <label>
            Select Color:
            <input 
              type="color" 
              value={this.props.currentColor}
              onChange={(e) => this.handleColorChange(e.target.value)}
            />
          </label>
        </div>
        
        <div className="predefined-colors">
          <h4>Predefined Colors</h4>
          <div className="color-grid">
            {predefinedColors.map((color) => (
              <div 
                key={color}
                className="color-swatch"
                style={{ backgroundColor: color }}
                onClick={() => this.handleColorChange(color)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default WallCustomizer;