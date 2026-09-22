import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  ChefHat,
  CheckCircle,
  Utensils,
  Sparkles,
  ArrowRight,
  Flame,
  ShoppingBag
} from 'lucide-react';

export const OrderTracker = () => {
  const { orders, latestPlacedOrder, setCurrentView } = useApp();

  const activeOrder = latestPlacedOrder || orders[0];

  const getStepIndex = (status) => {
    switch (status) {
      case 'New': return 1;
      case 'Preparing': return 2;
      case 'Ready': return 3;
      case 'Completed': return 4;
      default: return 1;
    }
  };

  const currentStep = activeOrder ? getStepIndex(activeOrder.status) : 1;

  return (
    <div>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <Sparkles size={14} /> LIVE KITCHEN STATUS TRACKER
        </div>
        <h1 style={{ fontSize: '2.5rem' }}>Track Your Order Progress</h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.4rem' }}>
          Real-time transmission between your table menu and Chef's Kitchen Display System.
        </p>
      </div>

      {!activeOrder ? (
        <div style={{ background: 'white', padding: '4rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
          <ShoppingBag size={56} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h2>No Active Orders</h2>
          <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>Place your first meal order via the Digital Menu!</p>
          <button className="btn-primary" onClick={() => setCurrentView('menu')}>
            Open Digital Menu <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {/* Main Status Tracker */}
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Order Reference</span>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary-hover)' }}>#{activeOrder.id}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Assigned Location</span>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{activeOrder.tableNo}</div>
              </div>
            </div>

            {/* Visual Timeline Bar */}
            <div style={{ marginBottom: '3rem', position: 'relative', padding: '0 0.5rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2, minWidth: '550px', gap: '1rem' }}>
                {[
                  { step: 1, title: 'Order Placed', desc: 'Received at POS' },
                  { step: 2, title: 'Kitchen Cooking', desc: activeOrder.chefAssigned },
                  { step: 3, title: 'Plated & Ready', desc: 'Quality checked' },
                  { step: 4, title: 'Served at Table', desc: 'Enjoy your meal!' }
                ].map((item) => {
                  const isDone = currentStep >= item.step;
                  const isCurrent = currentStep === item.step;
                  return (
                    <div key={item.step} style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: isDone ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' : '#f1f5f9',
                          color: isDone ? 'white' : '#94a3b8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 0.75rem',
                          fontWeight: 800,
                          boxShadow: isCurrent ? 'var(--shadow-glow)' : 'none',
                          border: isCurrent ? '3px solid #f59e0b' : 'none'
                        }}
                      >
                        {isDone ? <CheckCircle size={24} /> : item.step}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isDone ? 'var(--text-main)' : 'var(--text-muted)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {item.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preparation Details Card */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde047', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ChefHat size={36} color="#d97706" />
              <div>
                <h4 style={{ color: '#92400e', fontSize: '1.05rem' }}>Estimated Serving Time: ~12-15 Minutes</h4>
                <p style={{ color: '#b45309', fontSize: '0.88rem', marginTop: '0.2rem' }}>
                  {activeOrder.chefAssigned} is currently preparing your meal using oak-fired cooking techniques.
                </p>
              </div>
            </div>
          </div>

          {/* Items Summary Card */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
              Order Items Breakdown
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {activeOrder.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.quantity}x {item.name}</div>
                    {item.notes && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Note: {item.notes}</div>}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px dashed var(--border-light)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem' }}>
              <span>Total Paid</span>
              <span>${activeOrder.totalAmount.toFixed(2)}</span>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', color: 'var(--text-main)', borderColor: 'var(--border-light)' }} onClick={() => setCurrentView('menu')}>
                Add More Items to Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
