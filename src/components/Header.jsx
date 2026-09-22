import React from 'react';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  Clock,
  LayoutDashboard,
  ChefHat,
  Sparkles
} from 'lucide-react';

export const Header = () => {
  const {
    currentView,
    setCurrentView,
    cart,
    setIsCartOpen
  } = useApp();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isCustomerMode = currentView !== 'admin';

  return (
    <header className="header-wrapper glass-header">
      <div className="nav-container">
        {/* Brand Logo */}
        <div className="logo-brand" onClick={() => setCurrentView('home')}>
          <div className="logo-icon">
            <UtensilsCrossed size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Gourmet<span style={{ color: 'var(--color-accent)' }}>Pulse</span></span>
              <Sparkles size={16} color="var(--color-primary)" />
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '-3px' }}>
              Boutique Dining & Operations Suite
            </div>
          </div>
        </div>

        {/* Customer Navigation Links (Only in customer view) */}
        {isCustomerMode && (
          <nav className="nav-links">
            <button
              className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              Home
            </button>
            <button
              className={`nav-link-btn ${currentView === 'menu' ? 'active' : ''}`}
              onClick={() => setCurrentView('menu')}
            >
              <UtensilsCrossed size={16} />
              Digital Menu
            </button>
            <button
              className={`nav-link-btn ${currentView === 'reservation' ? 'active' : ''}`}
              onClick={() => setCurrentView('reservation')}
            >
              <Calendar size={16} />
              Book Table
            </button>
            <button
              className={`nav-link-btn ${currentView === 'order-tracker' ? 'active' : ''}`}
              onClick={() => setCurrentView('order-tracker')}
            >
              <Clock size={16} />
              Order Tracker
            </button>
          </nav>
        )}

        {/* Actions & Portal Switcher */}
        <div className="nav-actions">
          {/* Pitch Demo Portal Toggle */}
          <button
            className={`portal-switch-btn ${!isCustomerMode ? 'admin-mode' : ''}`}
            onClick={() => setCurrentView(isCustomerMode ? 'admin' : 'home')}
            title="Toggle between Customer Front-end and Management System Dashboard"
          >
            {isCustomerMode ? (
              <>
                <ChefHat size={18} color="#d97706" />
                <span>Management Portal</span>
              </>
            ) : (
              <>
                <UtensilsCrossed size={18} color="#60a5fa" />
                <span>Customer View</span>
              </>
            )}
          </button>

          {/* Cart Icon (Customer View) */}
          {isCustomerMode && (
            <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
              {totalCartCount > 0 && (
                <span className="cart-badge">{totalCartCount}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
