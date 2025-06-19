import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { LanguageContext } from '../../context/LanguageContext'
import { ThemeContext } from '../../context/ThemeContext'
import './Cart.css'

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useContext(CartContext)
  const { language } = useContext(LanguageContext)
  const { theme } = useContext(ThemeContext)

  const translations = {
    en: {
      cart: 'Shopping Cart',
      empty: 'Your cart is empty',
      remove: 'Remove',
      quantity: 'Qty',
      total: 'Total',
      checkout: 'Proceed to Checkout',
      clear: 'Clear Cart',
      close: 'Close'
    },
    es: {
      cart: 'Carrito de Compras',
      empty: 'Tu carrito está vacío',
      remove: 'Eliminar',
      quantity: 'Cant',
      total: 'Total',
      checkout: 'Proceder al Pago',
      clear: 'Vaciar Carrito',
      close: 'Cerrar'
    },
    fr: {
      cart: 'Panier',
      empty: 'Votre panier est vide',
      remove: 'Supprimer',
      quantity: 'Qté',
      total: 'Total',
      checkout: 'Procéder au Paiement',
      clear: 'Vider le Panier',
      close: 'Fermer'
    }
  }

  const t = translations[language] || translations.en

  if (!isOpen) return null

  return (
    <div className={`cart-overlay ${theme}`} onClick={onClose}>
      <div className={`cart-sidebar ${theme}`} onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>{t.cart}</h2>
          <button className="close-btn" onClick={onClose}>
            {t.close}
          </button>
        </div>
        
        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>{t.empty}</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">${item.price}</p>
                      <div className="quantity-controls">
                        <label>{t.quantity}:</label>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        {t.remove}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <h3>{t.total}: ${getTotalPrice().toFixed(2)}</h3>
                </div>
                <div className="cart-actions">
                  <button className="clear-btn" onClick={clearCart}>
                    {t.clear}
                  </button>
                  <button className="checkout-btn">
                    {t.checkout}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart