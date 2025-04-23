import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const productDatabase = {
    1: {
        name: 'Bed',
        price: 899,
        description: 'Premium quality bed with solid wood frame and comfortable mattress support.',
        images: [
          '/images/bed-front.jpg',
          '/images/bed-side.jpg',
          '/images/bed-top.jpg'
        ],
        details: [
          'Dimensions: 80"W x 60"D x 40"H',
          'Material: Solid Wood',
          'Color: Walnut',
          'Weight Capacity: 500 lbs',
          'Assembly Required: Yes',
          'Warranty: 2 years'
        ]
      },
      2: {
        name: 'Bookshelf',
        price: 299,
        description: 'Modern bookshelf with adjustable shelves and sturdy construction.',
        images: [
          '/images/bookshelf-front.jpg',
          '/images/bookshelf-side.jpg',
          '/images/bookshelf-top.jpg'
        ],
        details: [
          'Dimensions: 60"W x 12"D x 72"H',
          'Material: Engineered Wood',
          'Color: White',
          'Number of Shelves: 5',
          'Adjustable Shelves: Yes',
          'Assembly Required: Yes'
        ]
      },
      3: {
        name: 'Chair',
        price: 149,
        description: 'Ergonomic chair with comfortable seating and back support.',
        images: [
          '/images/chair-front.jpg',
          '/images/chair-side.jpg',
          '/images/chair-top.jpg'
        ],
        details: [
          'Dimensions: 20"W x 22"D x 32"H',
          'Material: Plastic and Fabric',
          'Color: Black',
          'Weight Capacity: 250 lbs',
          'Swivel Base: Yes',
          'Assembly Required: No'
        ]
      },
      4: {
        name: 'Classic Chair',
        price: 249,
        description: 'Vintage style chair with elegant design and comfortable cushion.',
        images: [
          '/images/classic-chair-front.jpg',
          '/images/classic-chair-side.jpg',
          '/images/classic-chair-top.jpg'
        ],
        details: [
          'Dimensions: 22"W x 24"D x 34"H',
          'Material: Solid Wood and Upholstery',
          'Color: Mahogany',
          'Weight Capacity: 300 lbs',
          'Cushion Included: Yes',
          'Assembly Required: Partial'
        ]
      },
      5: {
        name: 'Cupboard',
        price: 599,
        description: 'Spacious cupboard with multiple shelves and drawers for organized storage.',
        images: [
          '/images/cupboard-front.jpg',
          '/images/cupboard-side.jpg',
          '/images/cupboard-top.jpg'
        ],
        details: [
          'Dimensions: 48"W x 18"D x 72"H',
          'Material: Solid Wood',
          'Color: Oak',
          'Shelves: 4 fixed, 2 adjustable',
          'Drawers: 2 large',
          'Assembly Required: Yes'
        ]
      },
      6: {
        name: 'Sofa',
        price: 899,
        description: 'Luxurious sofa with premium fabric and comfortable cushions.',
        images: [
          '/images/sofa-front.jpg',
          '/images/sofa-side.jpg',
          '/images/sofa-top.jpg'
        ],
        details: [
          'Dimensions: 85"W x 38"D x 34"H',
          'Material: 100% Polyester',
          'Color: Charcoal Gray',
          'Seating Capacity: 3 people',
          'Cushion Type: High-density foam',
          'Assembly Required: No'
        ]
      },
      7: {
        name: 'Table',
        price: 399,
        description: 'Sturdy table with smooth surface and durable construction.',
        images: [
          '/images/table-front.jpg',
          '/images/table-side.jpg',
          '/images/table-top.jpg'
        ],
        details: [
          'Dimensions: 60"W x 30"D x 30"H',
          'Material: Glass and Metal',
          'Color: Silver',
          'Weight Capacity: 150 lbs',
          'Edge Type: Rounded safety edges',
          'Assembly Required: Yes'
        ]
      },
      8: {
        name: 'Wardrobe',
        price: 799,
        description: 'Large wardrobe with multiple compartments and hanging space.',
        images: [
          '/images/wardrobe-front.jpg',
          '/images/wardrobe-side.jpg',
          '/images/wardrobe-top.jpg'
        ],
        details: [
          'Dimensions: 72"W x 24"D x 84"H',
          'Material: Engineered Wood',
          'Color: Espresso',
          'Hanging Rods: 2',
          'Shelves: 4',
          'Drawers: 3',
          'Assembly Required: Yes'
        ]
      }
};

function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = productDatabase[id];
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    navigate('/products');
    return null;
  }

  return (
    <div style={styles.container}>
      <Link to="/products" style={styles.backLink}>← Back to Products</Link>
      
      <div style={styles.productContainer}>
        <div style={styles.gallery}>
          <img
            src={product.images[currentImage]}
            alt={`${product.name} ${['front', 'side', 'top'][currentImage]} view`}
            style={styles.mainImage}
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
          <div style={styles.thumbnails}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${['front', 'side', 'top'][index]} view`}
                style={index === currentImage ? 
                  { ...styles.thumbnail, ...styles.activeThumbnail } : 
                  styles.thumbnail}
                onClick={() => setCurrentImage(index)}
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
            ))}
          </div>
        </div>
        
        <div style={styles.details}>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.price}>${product.price}</p>
          <p style={styles.description}>{product.description}</p>
          
          <div style={styles.quantitySelector}>
            <button 
              style={styles.quantityButton}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span style={styles.quantityDisplay}>{quantity}</span>
            <button 
              style={styles.quantityButton}
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          <button 
            style={styles.buyButton}
            onClick={() => addToCart(product, quantity)}
          >
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </button>
          
          <div style={styles.productDetails}>
            <h3 style={styles.detailsHeader}>Product Details</h3>
            <ul style={styles.detailsList}>
              {product.details.map((detail, i) => (
                <li key={i} style={styles.detailItem}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    backLink: {
      display: 'inline-block',
      marginBottom: '20px',
      color: '#2c3e50',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      ':hover': {
        textDecoration: 'underline'
      }
    },
    productContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr'
      }
    },
    gallery: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    mainImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    thumbnails: {
      display: 'flex',
      gap: '10px',
      overflowX: 'auto',
      paddingBottom: '10px'
    },
    thumbnail: {
      width: '80px',
      height: '80px',
      objectFit: 'cover',
      borderRadius: '4px',
      cursor: 'pointer',
      border: '1px solid #ddd',
      transition: 'border 0.2s',
      ':hover': {
        border: '1px solid #2c3e50'
      }
    },
    activeThumbnail: {
      border: '2px solid #e74c3c'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    name: {
      fontSize: '32px',
      color: '#2c3e50',
      margin: '0'
    },
    price: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#e74c3c',
      margin: '0'
    },
    description: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#555'
    },
    quantitySelector: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      margin: '20px 0'
    },
    quantityButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '1px solid #ddd',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ':hover': {
        backgroundColor: '#f5f5f5'
      }
    },
    quantityDisplay: {
      fontSize: '18px',
      fontWeight: 'bold',
      minWidth: '30px',
      textAlign: 'center'
    },
    buyButton: {
      padding: '15px',
      backgroundColor: '#2c3e50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      ':hover': {
        backgroundColor: '#1a252f'
      }
    },
    productDetails: {
      marginTop: '30px',
      paddingTop: '20px',
      borderTop: '1px solid #eee'
    },
    detailsHeader: {
      fontSize: '20px',
      color: '#2c3e50',
      marginBottom: '15px'
    },
    detailsList: {
      paddingLeft: '20px',
      margin: '0'
    },
    detailItem: {
      marginBottom: '10px',
      color: '#555',
      lineHeight: '1.5'
    }
  };
  
  export default ProductView;