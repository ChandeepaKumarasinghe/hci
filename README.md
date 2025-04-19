# 3D Furniture Shop (Frontend Only)

A frontend-only furniture shop website with 3D model viewing and room editing capabilities.

## Features

- Admin panel for uploading and managing 3D furniture models (.glb files)
- User interface for selecting rooms and arranging furniture
- Interactive 3D editor with Three.js
- No backend required - uses localStorage for data persistence

## Setup

1. Clone this repository
2. Place your .glb models in `assets/models/default/`
3. Place your texture images in `assets/textures/default/`
4. Update `data/items.json` with your furniture catalog
5. Open `index.html` in a web browser

## Usage

### Admin
- Log in as admin to upload new 3D models
- Preview models before making them available
- View all uploaded models

### User
- Select a room type (living room, bedroom, etc.)
- Browse furniture categories
- Add items to your room and arrange them in 3D space
- Save your room layout

## Technologies Used

- HTML5, CSS3, JavaScript
- Three.js for 3D rendering
- GLTFLoader for loading .glb models
- localStorage for data persistence