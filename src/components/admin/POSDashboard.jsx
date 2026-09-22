import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  ChefHat,
  ArrowRight,
  Bell,
  Utensils,
  MapPin
} from 'lucide-react';

export const POSDashboard = () => {
  const { orders, updateOrderStatus } = useApp();

  const columns = [
    { id: 'New', title: 'New Orders', badgeClass: 'status-new' },
    { id: 'Preparing', title: 'In Kitchen (Cooking)', badgeClass: 'status-prep' },
    { id: 'Ready', title: 'Ready to Serve', badgeClass: 'status-ready' },
    { id: 'Completed', title: 'Completed / Paid', badgeClass: 'status-completed' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '1rem', color: '#94a3b8' }}>
          Live Transmission Feed • Real-time synchronization active
        </div>
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Bell size={14} className="animate-pulse" /> Live Order Listener Active
        </div>
      </div>

      <div className="pos-kanban-grid">
        {columns.map(col => {
          const colOrders = orders.filter(o => o.status === col.id);
          return (
            <div key={col.id} className="pos-column">
              <div className="pos-col-header">
                <h3 style={{ fontSize: '1.1rem', color: 'white' }}>{col.title}</h3>
                <span className={`status-badge ${col.badgeClass}`}>{colOrders.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                {colOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b', fontSize: '0.88rem' }}>
                    No orders in {col.title.toLowerCase()}
                  </div>
                ) : (
                  colOrders.map(order => (
                    <div key={order.id} className="order-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{order.type}</span>
                          <h4 style={{ fontSize: '1.1rem', color: '#60a5fa' }}>#{order.id}</h4>
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#f59e0b' }}>
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={14} color="#60a5fa" />
                          <strong>{order.tableNo}</strong> ({order.customerName})
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                          <Clock size={12} color="#94a3b8" /> Placed at {order.createdAt} • {order.paymentStatus}
                        </div>
                      </div>

                      <div style={{ borderTop: '1px dashed var(--border-dark)', paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        {order.items.map(item => (
                          <div key={item.id} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', color: '#e2e8f0' }}>
                            <span>{item.quantity}x {item.name}</span>
                            {item.notes && <span style={{ fontSize: '0.75rem', color: '#fde047' }}>[{item.notes}]</span>}
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons based on state */}
                      <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-dark)' }}>
                        {order.status === 'New' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Preparing')}
                            style={{
                              width: '100%',
                              padding: '0.5rem',
                              borderRadius: '6px',
                              background: '#f59e0b',
                              color: '#0f172a',
                              border: 'none',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.4rem'
                            }}
                          >
                            <ChefHat size={16} /> Accept & Send to KDS
                          </button>
                        )}

                        {order.status === 'Preparing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Ready')}
                            style={{
                              width: '100%',
                              padding: '0.5rem',
                              borderRadius: '6px',
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.4rem'
                            }}
                          >
                            <CheckCircle size={16} /> Mark Plated & Ready
                          </button>
                        )}

                        {order.status === 'Ready' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Completed')}
                            style={{
                              width: '100%',
                              padding: '0.5rem',
                              borderRadius: '6px',
                              background: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.4rem'
                            }}
                          >
                            <Utensils size={16} /> Mark Served / Completed
                          </button>
                        )}

                        {order.status === 'Completed' && (
                          <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                            <CheckCircle size={14} color="#10b981" /> Order Fulfilled
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
