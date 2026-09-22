import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  Clock,
  LayoutDashboard,
  ChefHat,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export const Header = () => {
  const {
    currentView,
    setCurrentView,
    cart,
    setIsCartOpen
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isCustomerMode = currentView !== 'admin';

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header-wrapper glass-header">
      <div className="nav-container">
        {/* Brand Logo */}
        <div className="logo-brand" onClick={() => handleNavClick('home')}>
          <div className="logo-icon">
            <UtensilsCrossed size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Gourmet<span style={{ color: 'var(--color-accent)' }}>Pulse</span></span>
              <Sparkles size={16} color="var(--color-primary)" />
            </div>
            <div className="logo-subtitle">
              Boutique Dining & Operations Suite
            </div>
          </div>
        </div>

        {/* Customer Navigation Links (Only in customer view) */}
        {isCustomerMode && (
          <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <button
              className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button
              className={`nav-link-btn ${currentView === 'menu' ? 'active' : ''}`}
              onClick={() => handleNavClick('menu')}
            >
              <UtensilsCrossed size={16} />
              Digital Menu
            </button>
            <button
              className={`nav-link-btn ${currentView === 'reservation' ? 'active' : ''}`}
              onClick={() => handleNavClick('reservation')}
            >
              <Calendar size={16} />
              Book Table
            </button>
            <button
              className={`nav-link-btn ${currentView === 'order-tracker' ? 'active' : ''}`}
              onClick={() => handleNavClick('order-tracker')}
            >
              <Clock size={16} />
              Order Tracker
            </button>
            <button
              className="nav-link-btn mobile-portal-menu-link"
              onClick={() => handleNavClick('admin')}
              style={{ color: '#f59e0b', fontWeight: 700 }}
            >
              <ChefHat size={16} color="#f59e0b" />
              Management Portal
            </button>
          </nav>
        )}

        {/* Actions & Portal Switcher */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Pitch Demo Portal Toggle */}
          <button
            className={`portal-switch-btn ${!isCustomerMode ? 'admin-mode' : ''}`}
            onClick={() => handleNavClick(isCustomerMode ? 'admin' : 'home')}
            title="Toggle between Customer Front-end and Management System Dashboard"
          >
            {isCustomerMode ? (
              <>
                <ChefHat size={18} color="#d97706" />
                <span className="hide-on-mobile">Management Portal</span>
              </>
            ) : (
              <>
                <UtensilsCrossed size={18} color="#60a5fa" />
                <span className="hide-on-mobile">Customer View</span>
              </>
            )}
          </button>

          {/* Cart Icon (Customer View) */}
          {isCustomerMode && (
            <button className="cart-icon-btn" onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}>
              <ShoppingBag size={20} />
              {totalCartCount > 0 && (
                <span className="cart-badge">{totalCartCount}</span>
              )}
            </button>
          )}

          {/* Mobile Hamburger Button */}
          {isCustomerMode && (
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
