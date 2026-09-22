import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChefHat, Clock, CheckSquare, Square, AlertTriangle, Flame } from 'lucide-react';

export const ChefKDS = () => {
  const { orders, updateOrderStatus } = useApp();
  const [checkedItems, setCheckedItems] = useState({});

  const activeKitchenOrders = orders.filter(o => o.status === 'Preparing' || o.status === 'New');

  const toggleItemCheck = (orderId, itemId) => {
    const key = `${orderId}-${itemId}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: '#1e293b', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ChefHat size={28} color="#f59e0b" />
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'white' }}>Chef Line Kitchen Display (KDS)</h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>High-visibility thermal ticket layout for kitchen staff</p>
          </div>
        </div>
        <div style={{ color: '#fde047', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Flame size={18} color="#f59e0b" /> Active Tickets: {activeKitchenOrders.length}
        </div>
      </div>

      {activeKitchenOrders.length === 0 ? (
        <div style={{ background: '#1e293b', borderRadius: 'var(--radius-md)', padding: '4rem', textAlign: 'center', color: '#64748b' }}>
          <ChefHat size={48} style={{ opacity: 0.4, margin: '0 auto 1rem' }} />
          <h3>All Kitchen Tickets Cleared!</h3>
          <p style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>Waiting for incoming orders from table menus...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {activeKitchenOrders.map((order, idx) => (
            <div
              key={order.id}
              style={{
                background: '#1e293b',
                borderRadius: 'var(--radius-md)',
                border: order.status === 'New' ? '2px solid #ef4444' : '2px solid #f59e0b',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Ticket Header */}
              <div style={{ background: order.status === 'New' ? '#991b1b' : '#b45309', color: 'white', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                  #{order.id} • {order.tableNo}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 700 }}>
                  <Clock size={14} /> {order.createdAt}
                </div>
              </div>

              {/* Items List Checklist */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                  Order Prep Checklist:
                </div>

                {order.items.map(item => {
                  const isChecked = !!checkedItems[`${order.id}-${item.id}`];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItemCheck(order.id, item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        padding: '0.6rem',
                        borderRadius: '6px',
                        background: isChecked ? 'rgba(16, 185, 129, 0.15)' : '#0f172a',
                        border: isChecked ? '1px solid #10b981' : '1px solid #334155'
                      }}
                    >
                      {isChecked ? <CheckSquare size={20} color="#10b981" /> : <Square size={20} color="#94a3b8" />}
                      <div style={{ flex: 1, textDecoration: isChecked ? 'line-through' : 'none', opacity: isChecked ? 0.7 : 1 }}>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: 'white' }}>
                          {item.quantity}x {item.name}
                        </div>
                        {item.notes && (
                          <div style={{ fontSize: '0.8rem', color: '#fde047', fontWeight: 700, marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <AlertTriangle size={14} /> Special: {item.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ticket Footer Action */}
              <div style={{ padding: '1rem', background: '#0f172a', borderTop: '1px solid #334155' }}>
                <button
                  onClick={() => updateOrderStatus(order.id, 'Ready')}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Flame size={18} /> Finish Plating & Notify Waiter
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
