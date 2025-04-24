import React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import RoomSelector from './RoomSelector';
import FurnitureManager from './FurnitureManager';
import WallCustomizer from './WallCustomizer';
import TextureApplier from './TextureApplier';
import './App.css';

class RoomDesigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoom: null,
      furnitureItems: [],
      wallTexture: null,
      selectedTexture: null,
      isLoading: false
    };
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = null;
    this.roomModel = null;
    this.wallMaterials = [];
    this.roomScaleFactor = 1.0;
    this.standardFurnitureHeight = 1.0;
  }

  componentDidMount() {
    this.initThreeJS();
    this.setupLights();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    cancelAnimationFrame(this.animationId);
  }

  initThreeJS = () => {
    this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x222222);
    this.mount.appendChild(this.renderer.domElement);

    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;

    const gridHelper = new THREE.GridHelper(20, 20);
    gridHelper.position.y = -0.01;
    this.scene.add(gridHelper);

    this.animate();
  };

  setupLights = () => {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    this.scene.add(directionalLight);
    
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);
  };

  handleWindowResize = () => {
    this.camera.aspect = (window.innerWidth * 0.8) / (window.innerHeight * 0.8);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
  };

  animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  loadRoomModel = (roomType) => {
    this.setState({ isLoading: true });
    
    if (this.roomModel) {
      this.scene.remove(this.roomModel);
    }
    this.wallMaterials = [];
    
    const loader = new GLTFLoader();
    
    loader.load(
      `./assets/models/${roomType}.glb`,
      (gltf) => {
        this.roomModel = gltf.scene;
        this.standardizeRoomSize(roomType, this.roomModel);
        
        this.roomModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            if (child.name.toLowerCase().includes('wall')) {
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material = child.material.map(mat => {
                    const newMat = mat.clone();
                    this.wallMaterials.push(newMat);
                    return newMat;
                  });
                } else {
                  child.material = child.material.clone();
                  this.wallMaterials.push(child.material);
                }
              }
            }
          }
        });
        
        this.scene.add(this.roomModel);
        this.setState({ 
          currentRoom: roomType,
          isLoading: false 
        });
      },
      (xhr) => {
        console.log(`Loading room model: ${Math.floor((xhr.loaded / xhr.total) * 100)}%`);
      },
      (error) => {
        console.error('Error loading room model:', error);
        this.setState({ isLoading: false });
      }
    );
  };

  standardizeRoomSize = (roomType, model) => {
    const roomScales = {
      'Bedroom': 4,
      'Living Room': 0.02,
      'Kitchen': 0.9,
      'Dining Room': 9,
      'Office': 0.0355,
      'Study Room': 0.5
    };
    
    const scaleFactor = roomScales[roomType] || 1.0;
    model.scale.set(scaleFactor, scaleFactor, scaleFactor);
  };

  addFurniture = (furnitureType) => {
    this.setState({ isLoading: true });
    const loader = new GLTFLoader();
    
    loader.load(
      `./assets/models/${furnitureType}.glb`,
      (gltf) => {
        const model = gltf.scene;
        this.standardizeFurnitureSize(model, furnitureType);
        
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        const position = new THREE.Vector3();
        this.camera.getWorldDirection(position);
        position.multiplyScalar(3);
        position.y = 0;
        model.position.copy(position);

        const newItem = {
          id: Date.now(),
          type: furnitureType,
          model: model,
          size: 'medium',
          initialScale: model.scale.clone()
        };

        this.scene.add(model);
        this.setState(prevState => ({
          furnitureItems: [...prevState.furnitureItems, newItem],
          isLoading: false
        }));
      },
      (xhr) => {
        if (xhr.total > 0) {
          console.log(`Loading furniture model: ${Math.floor((xhr.loaded / xhr.total) * 100)}%`);
        }
      },
      (error) => {
        console.error(`Error loading furniture model (${furnitureType}):`, error);
        this.setState({ isLoading: false });
      }
    );
  };

  standardizeFurnitureSize = (model, type) => {
    const bbox = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    
    const maxDim = Math.max(size.x, size.y, size.z);
    
    const standardSizes = {
      'Bed': 3,
      'Bookshelf': 4,
      'Chair': 2,
      'Classic Chair': 20,
      'Desk': 1.2,
      'Sofa': 1.5,
      'Table': 1.2,
      'Wardrobe': 1.3
    };
    
    const targetSize = standardSizes[type] || 1.0;
    const scaleFactor = targetSize / maxDim;
    model.scale.multiplyScalar(scaleFactor);
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

  rotateFurniture = (id, newRotation) => {
    this.setState(prevState => {
      const items = [...prevState.furnitureItems];
      const itemIndex = items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        items[itemIndex].model.rotation.set(
          newRotation.x || 0,
          newRotation.y || 0,
          newRotation.z || 0
        );
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
        const item = items[itemIndex];
        const initialScale = item.initialScale || new THREE.Vector3(1, 1, 1);
        const scaleFactor = scaleFactors[size];
        
        const newScale = initialScale.clone().multiplyScalar(scaleFactor);
        item.model.scale.copy(newScale);
        item.size = size;
        
        return { furnitureItems: items };
      }
      return prevState;
    });
  };

  applyWallTexture = (textureUrl) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      textureUrl,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        
        this.wallMaterials.forEach(material => {
          if (Array.isArray(material)) {
            material.forEach(mat => {
              mat.map = texture;
              mat.needsUpdate = true;
            });
          } else {
            material.map = texture;
            material.needsUpdate = true;
          }
        });
        
        this.setState({ wallTexture: textureUrl });
      },
      undefined,
      (error) => {
        console.error('Error loading wall texture:', error);
      }
    );
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
                if (!child.material._isCloned) {
                  child.material = child.material.clone();
                  child.material._isCloned = true;
                }
                
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
    const { isLoading } = this.state;
    
    return (
      <div className="room-designer-container dark-theme">
        <div ref={ref => (this.mount = ref)} className="threejs-container" />
        
        {isLoading && (
          <div className="loading-overlay dark-overlay">
            <div className="loading-spinner"></div>
            <div className="loading-message">Loading...</div>
          </div>
        )}
        
        <div className="ui-panel dark-panel">
          <RoomSelector 
            currentRoom={this.state.currentRoom} 
            onSelectRoom={this.loadRoomModel} 
          />
          
          <FurnitureManager
            furnitureItems={this.state.furnitureItems}
            onAddFurniture={this.addFurniture}
            onRemoveFurniture={this.removeFurniture}
            onMoveFurniture={this.moveFurniture}
            onRotateFurniture={this.rotateFurniture}
            onResizeFurniture={this.resizeFurniture}
          />
          
          <WallCustomizer
            onApplyTexture={this.applyWallTexture}
            currentTexture={this.state.wallTexture}
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