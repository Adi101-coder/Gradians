import React, { useState } from 'react'

// Mock contexts for demonstration
const useCart = () => ({
  addToCart: (product) => console.log('Added to cart:', product)
})

const useLanguage = () => ({
  t: (key) => {
    const translations = {
      viewDetails: 'View Details',
      addToCart: 'Add to Cart'
    }
    return translations[key] || key
  }
})

// Sample product for demonstration
const sampleProduct = {
  id: 1,
  name: "Premium Wireless Headphones",
  category: "Electronics",
  price: 199.99,
  rating: 4.5,
  description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
}

const ProductCard = ({ product = sampleProduct }) => {
  const { addToCart } = useCart()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addToCart(product)
    setIsLoading(false)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={styles.starFilled}>⭐</span>)
    }

    if (hasHalfStar) {
      stars.push(<span key="half" style={styles.starHalf}>⭐</span>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={styles.starEmpty}>☆</span>)
    }

    return stars
  }

  const styles = {
    productCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid #e5e7eb',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '320px',
      margin: '0 auto'
    },
    productLink: {
      textDecoration: 'none',
      color: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      cursor: 'pointer'
    },
    productImageWrapper: {
      position: 'relative',
      width: '100%',
      height: '240px',
      overflow: 'hidden',
      backgroundColor: '#f9fafb'
    },
    productImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    productOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.3s ease'
    },
    viewDetails: {
      color: 'white',
      fontSize: '14px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    productInfo: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    productCategory: {
      fontSize: '12px',
      fontWeight: '500',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '8px'
    },
    productName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    productRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px'
    },
    starFilled: {
      color: '#fbbf24',
      fontSize: '14px'
    },
    starHalf: {
      color: '#fbbf24',
      fontSize: '14px',
      opacity: 0.5
    },
    starEmpty: {
      color: '#d1d5db',
      fontSize: '14px'
    },
    ratingNumber: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '500'
    },
    productDescription: {
      fontSize: '14px',
      color: '#6b7280',
      lineHeight: '1.5',
      marginBottom: '16px',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      flexGrow: 1
    },
    productFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto'
    },
    productPrice: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#059669'
    },
    addToCartBtn: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s ease',
      minWidth: '120px',
      justifyContent: 'center'
    },
    addToCartBtnLoading: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    },
    cartIcon: {
      fontSize: '16px'
    },
    loadingSpinner: {
      width: '16px',
      height: '16px',
      border: '2px solid #ffffff',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div 
        style={{
          ...styles.productCard,
          ...(isHovered ? {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)'
          } : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.productLink}>
          <div 
            style={styles.productImageWrapper}
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <img 
              src={product.image} 
              alt={product.name}
              style={{
                ...styles.productImage,
                ...(isImageHovered ? { transform: 'scale(1.05)' } : {})
              }}
              loading="lazy"
            />
            <div style={{
              ...styles.productOverlay,
              opacity: isImageHovered ? 1 : 0
            }}>
              <span style={styles.viewDetails}>{t('viewDetails')}</span>
            </div>
          </div>
          
          <div style={styles.productInfo}>
            <div style={styles.productCategory}>{product.category}</div>
            <h3 style={styles.productName}>{product.name}</h3>
            <div style={styles.productRating}>
              {renderStars(product.rating)}
              <span style={styles.ratingNumber}>({product.rating})</span>
            </div>
            <p style={styles.productDescription}>{product.description}</p>
            <div style={styles.productFooter}>
              <span style={styles.productPrice}>${product.price}</span>
              <button 
                style={{
                  ...styles.addToCartBtn,
                  ...(isLoading ? styles.addToCartBtnLoading : {})
                }}
                onClick={handleAddToCart}
                disabled={isLoading}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#2563eb'
                    e.target.style.transform = 'scale(1.02)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#3b82f6'
                    e.target.style.transform = 'scale(1)'
                  }
                }}
              >
                {isLoading ? (
                  <span style={styles.loadingSpinner}></span>
                ) : (
                  <>
                    <span style={styles.cartIcon}>🛒</span>
                    {t('addToCart')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard