import React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import RoomSelector from './RoomSelector';
import FurnitureManager from './FurnitureManager';
import WallCustomizer from './WallCustomizer';
import TextureApplier from './TextureApplier';

class RoomDesigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoom: null,
      furnitureItems: [],
      wallColor: '#ffffff',
      selectedTexture: null
    };
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = null;
    this.roomModel = null;
    this.furnitureModels = {};
  }

  componentDidMount() {
    this.initThreeJS();
    this.setupLights();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  initThreeJS = () => {
    this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    this.renderer.shadowMap.enabled = true;
    this.mount.appendChild(this.renderer.domElement);

    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;

    this.animate();
  };

  setupLights = () => {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    this.scene.add(directionalLight);
  };

  handleWindowResize = () => {
    this.camera.aspect = (window.innerWidth * 0.8) / (window.innerHeight * 0.8);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  loadRoomModel = (roomType) => {
    // Clear existing room if any
    if (this.roomModel) {
      this.scene.remove(this.roomModel);
    }

    const loader = new GLTFLoader();
    loader.load(
      `./assets/models/${roomType}.glb`,
      (gltf) => {
        this.roomModel = gltf.scene;
        this.roomModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        this.scene.add(this.roomModel);
        this.setState({ currentRoom: roomType });
      },
      undefined,
      (error) => {
        console.error('Error loading room model:', error);
      }
    );
  };

  addFurniture = (furnitureType) => {
    const loader = new GLTFLoader();
    loader.load(
      `./assets/models/${furnitureType}.glb`,
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Position the furniture in front of the camera
        const position = new THREE.Vector3();
        this.camera.getWorldDirection(position);
        position.multiplyScalar(3);
        position.y = 0; // Place on floor
        model.position.copy(position);

        const newItem = {
          id: Date.now(),
          type: furnitureType,
          model: model,
          size: 'medium'
        };

        this.scene.add(model);
        this.setState(prevState => ({
          furnitureItems: [...prevState.furnitureItems, newItem]
        }));
      },
      undefined,
      (error) => {
        console.error('Error loading furniture model:', error);
      }
    );
  };

  removeFurniture = (id) => {
    this.setState(prevState => {
      const itemToRemove = prevState.furnitureItems.find(item => item.id === id);
      if (itemToRemove) {
        this.scene.remove(itemToRemove.model);
        return {
          furnitureItems: prevState.furnitureItems.filter(item => item.id !== id)
        };
      }
      return prevState;
    });
  };

  moveFurniture = (id, newPosition) => {
    this.setState(prevState => {
      const items = [...prevState.furnitureItems];
      const itemIndex = items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        items[itemIndex].model.position.set(newPosition.x, 0, newPosition.z);
        return { furnitureItems: items };
      }
      return prevState;
    });
  };

  resizeFurniture = (id, size) => {
    const scaleFactors = {
      small: 0.75,
      medium: 1.0,
      large: 1.25
    };

    this.setState(prevState => {
      const items = [...prevState.furnitureItems];
      const itemIndex = items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        const scale = scaleFactors[size];
        items[itemIndex].model.scale.set(scale, scale, scale);
        items[itemIndex].size = size;
        return { furnitureItems: items };
      }
      return prevState;
    });
  };

  changeWallColor = (color) => {
    if (!this.roomModel) return;
    
    this.roomModel.traverse((child) => {
      if (child.isMesh && child.name.includes('wall')) {
        child.material.color.setHex(color.replace('#', '0x'));
      }
    });

    this.setState({ wallColor: color });
  };

  applyTexture = (textureUrl, itemId) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      textureUrl,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);

        this.setState(prevState => {
          const items = [...prevState.furnitureItems];
          const itemIndex = items.findIndex(item => item.id === itemId);
          if (itemIndex !== -1) {
            items[itemIndex].model.traverse((child) => {
              if (child.isMesh) {
                child.material.map = texture;
                child.material.needsUpdate = true;
              }
            });
            return { furnitureItems: items };
          }
          return prevState;
        });
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );
  };

  render() {
    return (
      <div className="room-designer-container">
        <div ref={ref => (this.mount = ref)} className="threejs-container" />
        
        <div className="ui-panel">
          <RoomSelector 
            currentRoom={this.state.currentRoom} 
            onSelectRoom={this.loadRoomModel} 
          />
          
          <FurnitureManager
            furnitureItems={this.state.furnitureItems}
            onAddFurniture={this.addFurniture}
            onRemoveFurniture={this.removeFurniture}
            onMoveFurniture={this.moveFurniture}
            onResizeFurniture={this.resizeFurniture}
          />
          
          <WallCustomizer
            currentColor={this.state.wallColor}
            onChangeColor={this.changeWallColor}
          />
          
          <TextureApplier
            furnitureItems={this.state.furnitureItems}
            onApplyTexture={this.applyTexture}
          />
        </div>
      </div>
    );
  }
}

export default RoomDesigner;