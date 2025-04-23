import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Bed',
    price: 899,
    image: '/images/bed-front.jpg',
    views: ['bed-front', 'bed-side', 'bed-top']
  },
  {
    id: 2,
    name: 'Bookshelf',
    price: 299,
    image: '/images/bookshelf-front.jpg',
    views: ['bookshelf-front', 'bookshelf-side', 'bookshelf-top']
  },
  {
    id: 3,
    name: 'Chair',
    price: 149,
    image: '/images/chair-front.jpg',
    views: ['chair-front', 'chair-side', 'chair-top']
  },
  {
    id: 4,
    name: 'Classic Chair',
    price: 249,
    image: '/images/classic-chair-front.jpg',
    views: ['classic-chair-front', 'classic-chair-side', 'classic-chair-top']
  },
  {
    id: 5,
    name: 'Cupboard',
    price: 599,
    image: '/images/cupboard-front.jpg',
    views: ['cupboard-front', 'cupboard-side', 'cupboard-top']
  },
  {
    id: 6,
    name: 'Sofa',
    price: 899,
    image: '/images/sofa-front.jpg',
    views: ['sofa-front', 'sofa-side', 'sofa-top']
  },
  {
    id: 7,
    name: 'Table',
    price: 399,
    image: '/images/table-front.jpg',
    views: ['table-front', 'table-side', 'table-top']
  },
  {
    id: 8,
    name: 'Wardrobe',
    price: 799,
    image: '/images/wardrobe-front.jpg',
    views: ['wardrobe-front', 'wardrobe-side', 'wardrobe-top']
  }
];

function Products() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Our Furniture Collection</h1>
      
      <div style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <Link to={`/product/${product.id}`} style={styles.link}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={styles.image}
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
              <div style={styles.info}>
                <h3 style={styles.name}>{product.name}</h3>
                <p style={styles.price}>${product.price}</p>
                <div style={styles.views}>
                  {product.views.map(view => (
                    <span key={view} style={styles.viewTag}>{view}</span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
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
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#2c3e50'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  info: {
    padding: '20px'
  },
  name: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#2c3e50'
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: '15px'
  },
  views: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  viewTag: {
    backgroundColor: '#f0f0f0',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#555'
  }
};

export default Products;