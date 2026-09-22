import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Trash2, ArrowRight, Table, UtensilsCrossed, X } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    setIsCartOpen,
    setIsPaymentModalOpen
  } = useApp();

  const [tableNo, setTableNo] = useState('Table 02');
  const [orderType, setOrderType] = useState('Dine-In'); // 'Dine-In' | 'Takeaway'
  const [selectedTipPercent, setSelectedTipPercent] = useState(15);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10; // 10% VAT/tax
  const tipAmount = subtotal * (selectedTipPercent / 100);
  const grandTotal = subtotal + tax + tipAmount;

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--color-primary-hover)" />
            <h3 style={{ fontSize: '1.25rem' }}>Your Digital Order</h3>
          </div>
          <button className="icon-close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Cart Body */}
        <div className="modal-body" style={{ flex: 1 }}>
          {/* Order Type & Table Selection */}
          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <button
                onClick={() => setOrderType('Dine-In')}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  borderRadius: 'var(--radius-sm)',
                  border: orderType === 'Dine-In' ? '1.5px solid var(--color-primary)' : '1px solid var(--border-light)',
                  background: orderType === 'Dine-In' ? 'white' : 'transparent',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <UtensilsCrossed size={15} color={orderType === 'Dine-In' ? 'var(--color-primary-hover)' : 'var(--text-muted)'} /> Dine-In Table
              </button>
              <button
                onClick={() => setOrderType('Takeaway')}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  borderRadius: 'var(--radius-sm)',
                  border: orderType === 'Takeaway' ? '1.5px solid var(--color-primary)' : '1px solid var(--border-light)',
                  background: orderType === 'Takeaway' ? 'white' : 'transparent',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <ShoppingBag size={15} color={orderType === 'Takeaway' ? 'var(--color-primary-hover)' : 'var(--text-muted)'} /> Takeaway / Pickup
              </button>
            </div>

            {orderType === 'Dine-In' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <Table size={16} color="var(--text-muted)" />
                <span style={{ fontWeight: 600 }}>Table Number:</span>
                <select
                  value={tableNo}
                  onChange={(e) => setTableNo(e.target.value)}
                  style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-light)', outline: 'none', fontWeight: 700 }}
                >
                  {['Table 01', 'Table 02', 'Table 03', 'Table 04', 'Table 05', 'Table 06', 'Table 07', 'Table 08'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Items List */}
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} strokeWidth={1} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h4>Your order cart is empty</h4>
              <p style={{ fontSize: '0.88rem', marginTop: '0.4rem' }}>Select delicious dishes from our digital menu!</p>
            </div>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.id} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.name}</h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-primary-hover)', fontWeight: 800 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    {item.notes && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        Note: {item.notes}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button className="qty-btn" onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem', marginLeft: '0.2rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Tip Selection */}
              <div style={{ marginTop: '1.5rem', background: '#fffbeb', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #fef3c7' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400e', marginBottom: '0.5rem' }}>
                  Add Chef & Service Tip
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[0, 10, 15, 20].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setSelectedTipPercent(pct)}
                      style={{
                        flex: 1,
                        padding: '0.4rem',
                        borderRadius: '6px',
                        border: selectedTipPercent === pct ? '1.5px solid #d97706' : '1px solid #fde047',
                        background: selectedTipPercent === pct ? '#f59e0b' : 'white',
                        color: selectedTipPercent === pct ? 'white' : '#92400e',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {pct === 0 ? 'None' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="modal-footer" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Tax & Service Charge (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {selectedTipPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Staff Tip ({selectedTipPercent}%)</span>
                  <span>${tipAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Proceed to Integrated Payment <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
