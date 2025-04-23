import React from 'react';
import './m.css';

const predefinedTextures = [
  { name: 'Wood', url: './assets/textures/wood.jpg' },
  { name: 'Fabric', url: './assets/textures/fabric.jpg' },
  { name: 'Metal', url: './assets/textures/metal.jpg' },
  { name: 'Leather', url: './assets/textures/leather.jpg' },
  { name: 'Marble', url: './assets/textures/marble.jpg' }
];

class TextureApplier extends React.Component {
  state = {
    selectedItem: null,
    customTexture: null
  };

  handleItemSelect = (id) => {
    this.setState({ selectedItem: id });
  };

  handleTextureSelect = (textureUrl) => {
    if (!this.state.selectedItem) return;
    this.props.onApplyTexture(textureUrl, this.state.selectedItem);
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
      <div className="ui-section">
        <h3>Texture Application</h3>
        
        <div className="subsection">
          <h4>Select Furniture</h4>
          <select 
            value={this.state.selectedItem || ''}
            onChange={(e) => this.handleItemSelect(parseInt(e.target.value))}
          >
            <option value="">-- Select Furniture --</option>
            {this.props.furnitureItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.type} (ID: {item.id})
              </option>
            ))}
          </select>
        </div>
        
        {this.state.selectedItem && (
          <div className="subsection">
            <h4>Apply Texture</h4>
            
            <div className="predefined-textures">
              <h5>Predefined Textures</h5>
              <div className="texture-grid">
                {predefinedTextures.map((texture) => (
                  <div 
                    key={texture.name}
                    className="texture-swatch"
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
              <input 
                type="file" 
                accept="image/*"
                onChange={this.handleFileUpload}
              />
              {this.state.customTexture && (
                <img 
                  src={this.state.customTexture} 
                  alt="Custom texture preview" 
                  className="texture-preview"
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TextureApplier;