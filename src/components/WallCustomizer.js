import React from 'react';
import './App.css';
import './m.css';

const wallTextures = [
  { name: 'Brick', url: './assets/textures/brick.jpg' },
  { name: 'Concrete', url: './assets/textures/concrete.jpg' },
  { name: 'Plaster', url: './assets/textures/plaster.jpg' },
  { name: 'Wood Panel', url: './assets/textures/wood_panel.jpg' },
  { name: 'Marble', url: './assets/textures/marble.jpg' }
];

class WallCustomizer extends React.Component {
  state = {
    selectedWall: 'all',
    customTexture: null
  };

  handleWallSelect = (wall) => {
    this.setState({ selectedWall: wall });
  };

  handleTextureSelect = (textureUrl) => {
    this.props.onApplyTexture(textureUrl);
  };

  handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      this.setState({ customTexture: event.target.result });
      this.handleTextureSelect(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  render() {
    return (
      <div className="ui-section dark-theme">
        <h3>Wall Customization</h3>
        
        <div className="subsection">
          <h4>Select Wall</h4>
          <div className="wall-selector">
            {['all', 'north', 'south', 'east', 'west'].map((wall) => (
              <button
                key={wall}
                className={`modern-button ${this.state.selectedWall === wall ? 'active' : ''}`}
                onClick={() => this.handleWallSelect(wall)}
              >
                {wall.charAt(0).toUpperCase() + wall.slice(1)} Wall
              </button>
            ))}
          </div>
        </div>
        
        <div className="subsection">
          <h4>Apply Texture</h4>
          
          <div className="predefined-textures">
            <h5>Texture Presets</h5>
            <div className="texture-grid">
              {wallTextures.map((texture) => (
                <div 
                  key={texture.name}
                  className={`texture-swatch ${this.props.currentTexture === texture.url ? 'selected' : ''}`}
                  onClick={() => this.handleTextureSelect(texture.url)}
                >
                  <img src={texture.url} alt={texture.name} />
                  <span>{texture.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="custom-texture">
            <h5>Custom Texture</h5>
            <label className="file-upload modern-button">
              <input 
                type="file" 
                accept="image/*"
                onChange={this.handleFileUpload}
                style={{ display: 'none' }}
              />
              Upload Custom Texture
            </label>
            {this.state.customTexture && (
              <img 
                src={this.state.customTexture} 
                alt="Custom texture preview" 
                className="texture-preview"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default WallCustomizer;