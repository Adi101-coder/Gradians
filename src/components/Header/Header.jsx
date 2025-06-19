// ========== SRC/COMPONENTS/HEADER/HEADER.JSX ==========
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { useCart } from '../../context/CartContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import LanguageSelector from '../LanguageSelector/LanguageSelector'
import Cart from '../Cart/Cart'
import './Header.css'

const Header = () => {
  const { t } = useLanguage()
  const { getTotalItems, setIsCartOpen } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const openCart = () => {
    setIsCartOpen(true)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🌱</span>
            <span className="logo-text">PlantShop</span>
          </Link>

          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><Link to="/" className="nav-link">{t('home')}</Link></li>
              <li><Link to="/products" className="nav-link">{t('products')}</Link></li>
              <li><Link to="/about" className="nav-link">{t('about')}</Link></li>
              <li><Link to="/contact" className="nav-link">{t('contact')}</Link></li>
            </ul>
          </nav>

          <div className="header-actions">
            <LanguageSelector />
            <ThemeToggle />
            
            <button className="cart-button" onClick={openCart}>
              <span className="cart-icon">🛒</span>
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </button>

            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
      <Cart />
    </header>
  )
}

export default Header
