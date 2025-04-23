import React from 'react';
import { Link } from 'react-router-dom';

const featuredCategories = [
  {
    id: 1,
    name: 'Living Room',
    image: '/images/categories/living-room.jpg',
    link: '/products?category=living'
  },
  {
    id: 2,
    name: 'Bedroom',
    image: '/images/categories/bedroom.jpg',
    link: '/products?category=bedroom'
  },
  {
    id: 3,
    name: 'Dining',
    image: '/images/categories/dining.jpg',
    link: '/products?category=dining'
  },
  {
    id: 4,
    name: 'Office',
    image: '/images/categories/office.jpg',
    link: '/products?category=office'
  }
];

const featuredProducts = [
  {
    id: 101,
    name: 'Modern Sofa Set',
    price: 1299,
    image: '/images/products/sofa-set.jpg',
    views: ['front', 'side', 'perspective']
  },
  {
    id: 102,
    name: 'King Size Bed',
    price: 899,
    image: '/images/products/king-bed.jpg',
    views: ['front', 'side']
  },
  {
    id: 103,
    name: 'Dining Table',
    price: 599,
    image: '/images/products/dining-table.jpg',
    views: ['top', 'side']
  }
];

function Home() {
  return React.createElement("div", { style: styles.container },
    /* Hero Section */
    React.createElement("section", { style: styles.hero },
      React.createElement("div", { style: styles.heroContent },
        React.createElement("h1", { style: styles.heroTitle }, "Design Your Dream Space in 3D"),
        React.createElement("p", { style: styles.heroText }, "Visualize furniture in your room before buying"),
        React.createElement("div", { style: styles.heroButtons },
          React.createElement(Link, {
            to: "/designer",
            style: styles.primaryButton
          }, "Start Room Designer"),
          React.createElement(Link, {
            to: "/products",
            style: styles.secondaryButton
          }, "Browse Products")
        )
      )
    ),

    /* Categories Section */
    React.createElement("section", { style: styles.section },
      React.createElement("h2", { style: styles.sectionTitle }, "Shop by Category"),
      React.createElement("div", { style: styles.categoryGrid },
        featuredCategories.map(category =>
          React.createElement(Link, {
            key: category.id,
            to: category.link,
            style: styles.categoryCard
          },
            React.createElement("img", {
              src: category.image,
              alt: category.name,
              style: styles.categoryImage,
              onError: (e) => {
                e.target.src = '/images/placeholder.jpg';
              }
            }),
            React.createElement("h3", { style: styles.categoryName }, category.name)
          )
        )
      )
    ),

    /* Featured Products */
    React.createElement("section", { style: styles.section },
      React.createElement("h2", { style: styles.sectionTitle }, "Featured Products"),
      React.createElement("div", { style: styles.productGrid },
        featuredProducts.map(product =>
          React.createElement("div", { key: product.id, style: styles.productCard },
            React.createElement(Link, { to: `/product/${product.id}`, style: styles.productLink },
              React.createElement("img", {
                src: product.image,
                alt: product.name,
                style: styles.productImage,
                onError: (e) => {
                  e.target.src = '/images/placeholder.jpg';
                }
              })
            ),
            React.createElement("div", { style: styles.productInfo },
              React.createElement("h3", { style: styles.productName }, product.name),
              React.createElement("p", { style: styles.productPrice }, `$${product.price}`),
              React.createElement("div", { style: styles.productButtons },
                React.createElement(Link, {
                  to: `/designer=/${product.id}`,
                  style: styles.viewIn3DButton
                }, "View in 3D"),
                React.createElement(Link, {
                  to: `/product/${product.id}`,
                  style: styles.detailsButton
                }, "Details")
              )
            )
          )
        )
      )
    ),

    /* Room Designer CTA */
    React.createElement("section", { style: styles.ctaSection },
      React.createElement("div", { style: styles.ctaContent },
        React.createElement("h2", { style: { color: 'black' } }, "Try Our 3D Room Designer"),
        React.createElement("p", { style: { color: 'black' } }, "Drag and drop furniture into your room to see how it looks"),
        React.createElement(Link, {
          to: "/designer",
          style: styles.ctaButton
        }, "Launch Designer Now")
      )
    )
  );
}

// Styles
const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  },
  hero: {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/imagetop.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    //color: 'black',
    color: 'white',
    padding: '100px 20px',
    textAlign: 'center',
    borderRadius: '10px',
    marginBottom: '50px'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '48px',
    marginBottom: '20px'
  },
  heroText: {
    fontSize: '20px',
    marginBottom: '30px'
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  },
  primaryButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    border: '2px solid white',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  section: {
    marginBottom: '60px'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '36px',
    marginBottom: '40px',
    //color: '#2c3e50'
    color: 'white'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px'
  },
  categoryCard: {
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-10px)'
    }
  },
  categoryImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '15px'
  },
  categoryName: {
    textAlign: 'center',
    fontSize: '22px',
    color: '#2c3e50'
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px'
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
    }
  },
  productLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover'
  },
  productInfo: {
    padding: '20px'
  },
  productName: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#2c3e50'
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: '15px'
  },
  productButtons: {
    display: 'flex',
    gap: '10px'
  },
  viewIn3DButton: {
    flex: 1,
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#1a252f'
    }
  },
  ctaSection: {
    backgroundColor: '#f8f9fa',
    padding: '60px 20px',
    borderRadius: '10px',
    textAlign: 'center',
    marginBottom: '50px'
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '15px 40px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    marginTop: '20px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  }
};

export default Home;