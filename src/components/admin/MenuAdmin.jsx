import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UtensilsCrossed, Plus, Star, ToggleLeft, ToggleRight, Check, X } from 'lucide-react';

export const MenuAdmin = () => {
  const { menuItems, toggleDishAvailability, addDish } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [dishName, setDishName] = useState('');
  const [category, setCategory] = useState('Main Course');
  const [price, setPrice] = useState('19.99');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80');
  const [prepTime, setPrepTime] = useState('15 min');
  const [dietary, setDietary] = useState('Veg');

  const handleCreateDish = (e) => {
    e.preventDefault();
    addDish({
      name: dishName,
      category,
      price: parseFloat(price),
      description,
      image: imageUrl,
      prepTime,
      calories: '550 kcal',
      dietary: [dietary],
      isPopular: true
    });
    setIsAddModalOpen(false);
    setDishName('');
    setDescription('');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'white' }}>Digital Menu Stock & Catalog Admin</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Instantly mark dishes In-Stock or Out-of-Stock for customer menus</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setIsAddModalOpen(true)}
          style={{ background: '#f59e0b' }}
        >
          <Plus size={18} /> Add New Dish Item
        </button>
      </div>

      <div style={{ background: '#1e293b', borderRadius: 'var(--radius-md)', border: '1px solid #334155', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'white', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '1rem' }}>Dish</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Price</th>
              <th style={{ padding: '1rem' }}>Prep Time</th>
              <th style={{ padding: '1rem' }}>Live Stock Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(dish => (
              <tr key={dish.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src={dish.image} alt={dish.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>{dish.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{dish.dietary.join(', ')}</div>
                  </div>
                </td>
                <td style={{ padding: '1rem', color: '#60a5fa', fontWeight: 600 }}>{dish.category}</td>
                <td style={{ padding: '1rem', fontWeight: 800, color: '#f59e0b' }}>${dish.price.toFixed(2)}</td>
                <td style={{ padding: '1rem', color: '#cbd5e1' }}>{dish.prepTime}</td>
                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      background: dish.isAvailable ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                      color: dish.isAvailable ? '#6ee7b7' : '#fca5a5'
                    }}
                  >
                    {dish.isAvailable ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button
                    onClick={() => toggleDishAvailability(dish.id)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: dish.isAvailable ? '#dc2626' : '#059669',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    {dish.isAvailable ? 'Mark Out of Stock' : 'Mark In Stock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Dish Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" style={{ background: '#1e293b', color: 'white' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ borderBottomColor: '#334155' }}>
              <h3>Add New Menu Dish</h3>
              <button className="icon-close-btn" style={{ color: 'white' }} onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateDish}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Dish Name</label>
                  <input
                    type="text"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
                    >
                      {['Starters', 'Main Course', 'Gourmet Pizzas', 'Desserts', 'Drinks', 'Chef Specials'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
                  ></textarea>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Unsplash Image URL</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
                  />
                </div>
              </div>

              <div className="modal-footer" style={{ background: '#0f172a', borderTopColor: '#334155' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save to Menu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
