import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import './Hero.css'

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title fade-in">
              {t('heroTitle')}
            </h1>
            <p className="hero-subtitle slide-up">
              {t('heroSubtitle')}
            </p>
            <div className="hero-buttons slide-up">
              <Link to="/products" className="btn btn-primary">
                {t('shopNow')}
              </Link>
              <Link to="/about" className="btn btn-secondary">
                {t('learnMore')}
              </Link>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="hero-plant">
              <div className="plant-pot"></div>
              <div className="plant-stem"></div>
              <div className="plant-leaf plant-leaf-1"></div>
              <div className="plant-leaf plant-leaf-2"></div>
              <div className="plant-leaf plant-leaf-3"></div>
              <div className="plant-leaf plant-leaf-4"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>
    </section>
  )
}

export default Hero