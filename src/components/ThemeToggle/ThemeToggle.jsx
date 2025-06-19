import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div className="theme-toggle-inner">
        <span className={`theme-icon sun ${theme === 'light' ? 'active' : ''}`}>
          ☀️
        </span>
        <span className={`theme-icon moon ${theme === 'dark' ? 'active' : ''}`}>
          🌙
        </span>
      </div>
    </button>
  )
}

export default ThemeToggle