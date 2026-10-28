import React, { useState, useEffect, useCallback } from 'react';
import { useApp, formatINR } from '../../context/AppContext';
import {
  Search, Filter, Star, Plus, Clock,
  ShoppingBag, X
} from 'lucide-react';

// ── Helpers ──────────────────────────────────────────────────────────────────
const VALID_CATEGORIES  = new Set(['All', 'Starters', 'Main Course', 'Gourmet Pizzas', 'Desserts', 'Drinks', 'Chef Specials']);
const VALID_DIETARY     = new Set(['All', 'Veg', 'Non-Veg', 'Gluten-Free', 'Spicy']);

const readParams = () => {
  const p = new URLSearchParams(window.location.search);
  return {
    category: VALID_CATEGORIES.has(p.get('cat'))  ? p.get('cat')    : 'All',
    search:   (p.get('q') || '').slice(0, 120),
    dietary:  VALID_DIETARY.has(p.get('diet'))     ? p.get('diet')   : 'All',
  };
};

const writeParams = ({ category, search, dietary }) => {
  const url = new URL(window.location.href);
  url.searchParams.set('view', 'menu');
  if (category !== 'All') {
    url.searchParams.set('cat', category);
  } else {
    url.searchParams.delete('cat');
  }
  if (search) {
    url.searchParams.set('q', search);
  } else {
    url.searchParams.delete('q');
  }
  if (dietary !== 'All') {
    url.searchParams.set('diet', dietary);
  } else {
    url.searchParams.delete('diet');
  }
  window.history.replaceState({}, '', url.toString());
};

export const DigitalMenu = () => {
  const { menuItems, addToCart, setIsCartOpen } = useApp();

  // Initialise filters from URL params (supports reload / direct link)
  const [selectedCategory, setSelectedCategory] = useState(() => readParams().category);
  const [searchQuery,      setSearchQuery]       = useState(() => readParams().search);
  const [dietaryFilter,    setDietaryFilter]     = useState(() => readParams().dietary);
  const [selectedDishModal, setSelectedDishModal] = useState(null);

  const [customNotes,    setCustomNotes]    = useState('');
  const [customQty,      setCustomQty]      = useState(1);
  const [extraTopping,   setExtraTopping]   = useState(false);

  const categories = ['All', 'Starters', 'Main Course', 'Gourmet Pizzas', 'Desserts', 'Drinks', 'Chef Specials'];

  // Sync filters → URL (without page reload)
  useEffect(() => {
    writeParams({ category: selectedCategory, search: searchQuery, dietary: dietaryFilter });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  const filteredDishes = menuItems.filter(dish => {
    const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
    const matchesSearch   = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDietary  = dietaryFilter === 'All' || dish.dietary.includes(dietaryFilter);
    return matchesCategory && matchesSearch && matchesDietary;
  });

  const handleOpenDishModal = useCallback((dish) => {
    setSelectedDishModal(dish);
    setCustomNotes('');
    setCustomQty(1);
    setExtraTopping(false);
  }, []);

  const handleAddCustomizedDish = () => {
    if (!selectedDishModal) return;
    const topping  = extraTopping ? 150 : 0; // ₹150 add-on
    const finalPrice = selectedDishModal.price + topping;
    addToCart({ ...selectedDishModal, price: finalPrice }, customQty, { extraTopping }, customNotes);
    setSelectedDishModal(null);
    setIsCartOpen(true);
  };

  // Close modal on Escape
  useEffect(() => {
    if (!selectedDishModal) return;
    const handler = (e) => { if (e.key === 'Escape') setSelectedDishModal(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedDishModal]);

  return (
    <div>
      {/* Header Banner */}
      <div className="menu-banner-inner" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(245, 158, 11, 0.2)', color: '#fde047', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Star size={14} /> LIVE DIGITAL MENU &amp; CONTACTLESS ORDERING
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>Explore Our Gourmet Creations</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.4rem' }}>
            Freshly prepared to order. Select your favorites to add to your table bill or digital takeaway order.
          </p>
        </div>

        {/* Search Input */}
        <div className="menu-banner-search" style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            id="menu-search"
            type="text"
            placeholder="Search dish or ingredient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 2.75rem 0.85rem 2.75rem', borderRadius: 'var(--radius-full)', border: '1px solid #334155', background: '#1e293b', color: 'white', fontSize: '0.95rem', outline: 'none' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs & Dietary Filter Toolbar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div className="category-tabs" role="tablist" aria-label="Menu categories">
          {categories.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`cat-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Filter size={14} /> DIETARY:
          </span>
          {['All', 'Veg', 'Non-Veg', 'Gluten-Free', 'Spicy'].map(tag => (
            <button
              key={tag}
              onClick={() => setDietaryFilter(tag)}
              aria-pressed={dietaryFilter === tag}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: dietaryFilter === tag ? '1.5px solid var(--color-primary)' : '1px solid var(--border-light)',
                background: dietaryFilter === tag ? '#fffbeb' : 'white',
                color: dietaryFilter === tag ? '#92400e' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(searchQuery || selectedCategory !== 'All' || dietaryFilter !== 'All') && (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Showing <strong>{filteredDishes.length}</strong> {filteredDishes.length === 1 ? 'dish' : 'dishes'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      )}

      {/* Dish Grid */}
      {filteredDishes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
          <h3>No dishes found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try adjusting your search query or dietary filters.</p>
        </div>
      ) : (
        <div className="dish-grid">
          {filteredDishes.map(dish => (
            <div key={dish.id} className="dish-card" style={{ opacity: dish.isAvailable ? 1 : 0.65 }}>
              <div className="dish-image-wrap" onClick={() => handleOpenDishModal(dish)} style={{ cursor: 'pointer' }}>
                <img src={dish.image} alt={dish.name} className="dish-img" loading="lazy" />
                <div className="dish-badge">
                  <Star size={13} color="#f59e0b" fill="#f59e0b" /> {dish.rating}
                </div>
                <div className={`dietary-tag ${dish.dietary.includes('Veg') ? 'dietary-veg' : 'dietary-nonveg'}`}>
                  {dish.dietary.join(', ')}
                </div>
                {!dish.isAvailable && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.75)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.05em' }}>
                    OUT OF STOCK
                  </div>
                )}
              </div>

              <div className="dish-body">
                <div className="dish-title-row">
                  <h3 className="dish-title" onClick={() => handleOpenDishModal(dish)} style={{ cursor: 'pointer' }}>{dish.name}</h3>
                </div>
                <p className="dish-desc">{dish.description}</p>
                
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Clock size={12} /> {dish.prepTime}
                  </span>
                  <span>• {dish.calories}</span>
                </div>

                <div className="dish-footer">
                  <div className="dish-price">{formatINR(dish.price)}</div>
                  <button
                    className="add-btn"
                    disabled={!dish.isAvailable}
                    onClick={() => handleOpenDishModal(dish)}
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dish Customization Modal */}
      {selectedDishModal && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedDishModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Customise ${selectedDishModal.name}`}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
            <div style={{ position: 'relative', height: '220px' }}>
              <img src={selectedDishModal.image} alt={selectedDishModal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                style={{ position: 'absolute', top: '12px', right: '12px', background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}
                onClick={() => setSelectedDishModal(null)}
                aria-label="Close"
              >
                <X size={18} color="var(--text-main)" />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h2 style={{ fontSize: '1.4rem' }}>{selectedDishModal.name}</h2>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{formatINR(selectedDishModal.price)}</div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                {selectedDishModal.description}
              </p>

              {/* Add-on options */}
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>Custom Options &amp; Add-ons</h4>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={extraTopping}
                      onChange={(e) => setExtraTopping(e.target.checked)}
                    />
                    Extra Chef Truffle Oil &amp; Aged Parmesan
                  </span>
                  <span style={{ fontWeight: 700 }}>+₹150</span>
                </label>
              </div>

              {/* Special Instructions */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Special Preparation Notes</h4>
                <input
                  type="text"
                  placeholder="e.g. Less spicy, dressing on the side, no cutlery..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none' }}
                />
              </div>

              {/* Quantity Selector */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>Quantity</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button className="qty-btn" onClick={() => setCustomQty(Math.max(1, customQty - 1))} aria-label="Decrease quantity">-</button>
                  <span style={{ fontWeight: 800, width: '24px', textAlign: 'center' }}>{customQty}</span>
                  <button className="qty-btn" onClick={() => setCustomQty(customQty + 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" style={{ color: 'var(--text-main)', borderColor: 'var(--border-light)' }} onClick={() => setSelectedDishModal(null)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddCustomizedDish}>
                <ShoppingBag size={16} /> Add to Order &bull; {formatINR((selectedDishModal.price + (extraTopping ? 150 : 0)) * customQty)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
