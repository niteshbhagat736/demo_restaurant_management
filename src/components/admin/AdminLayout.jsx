import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Kanban,
  ChefHat,
  LayoutGrid,
  Users,
  UtensilsCrossed,
  BarChart3,
  Sparkles,
  ArrowLeft,
  Menu,
  X,
  TrendingUp,
  Bell
} from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const { adminTab, setAdminTab, setCurrentView, orders } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const newOrdersCount = orders.filter(o => o.status === 'New').length;
  const todayRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const INR = (v) => `₹${v.toFixed(2)}`;

  const navItems = [
    { id: 'pos',             label: 'Live POS Orders',       icon: Kanban,        badge: newOrdersCount || null },
    { id: 'kds',             label: 'Chef KDS',              icon: ChefHat,       badge: null },
    { id: 'tables',          label: 'Table Floor Plan',      icon: LayoutGrid,    badge: null },
    { id: 'staff',           label: 'Staff & Shift Roster',  icon: Users,         badge: null },
    { id: 'menu-management', label: 'Menu & Stock Admin',    icon: UtensilsCrossed, badge: null },
    { id: 'analytics',       label: 'Analytics & Revenue',  icon: BarChart3,     badge: null },
  ];

  const SidebarContent = () => (
    <aside style={{
      width: '260px',
      minWidth: '260px',
      background: '#0a1120',
      borderRight: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto'
    }}>
      {/* Brand Header */}
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <div style={{
            width: '38px', height: '38px',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <UtensilsCrossed size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'white', fontFamily: 'var(--font-heading)' }}>
              GourmetPulse
            </div>
            <div style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: 600 }}>
              Management System
            </div>
          </div>
        </div>

        {/* Daily Revenue Quick Stat */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.10))',
          border: '1px solid rgba(245,158,11,0.25)',
          borderRadius: '10px',
          padding: '0.85rem 1rem',
        }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Today's Revenue
          </div>
          <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-heading)', lineHeight: 1.2, marginTop: '0.2rem' }}>
            ₹{todayRevenue.toFixed(2)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#6ee7b7', marginTop: '0.3rem', fontWeight: 600 }}>
            <TrendingUp size={13} /> +18.4% vs yesterday
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.4rem 0.6rem', marginBottom: '0.25rem' }}>
          Operations
        </div>
        {navItems.slice(0, 3).map(item => {
          const Icon = item.icon;
          const isActive = adminTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setAdminTab(item.id); setMobileSidebarOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 0.85rem',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? 'rgba(96,165,250,0.15)' : 'transparent',
                color: isActive ? '#93c5fd' : '#94a3b8',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.93rem',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                position: 'relative'
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#e2e8f0'; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}
            >
              <Icon size={19} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{
                  background: '#ef4444',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.15rem 0.45rem',
                  borderRadius: '9999px',
                  minWidth: '20px',
                  textAlign: 'center'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.4rem 0.6rem', margin: '0.5rem 0 0.25rem' }}>
          Administration
        </div>
        {navItems.slice(3).map(item => {
          const Icon = item.icon;
          const isActive = adminTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setAdminTab(item.id); setMobileSidebarOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 0.85rem',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? 'rgba(96,165,250,0.15)' : 'transparent',
                color: isActive ? '#93c5fd' : '#94a3b8',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.93rem',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#e2e8f0'; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer: Back to Customer View */}
      <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid #1e293b' }}>
        <button
          onClick={() => setCurrentView('home')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            padding: '0.75rem 1rem', borderRadius: '10px', width: '100%',
            border: '1px solid rgba(239,68,68,0.35)',
            background: 'rgba(239,68,68,0.08)',
            color: '#fca5a5', fontSize: '0.88rem', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.18s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)'; }}
        >
          <ArrowLeft size={16} /> Back to Customer View
        </button>
      </div>
    </aside>
  );

  return (
    <div style={{
      background: '#0f172a',
      color: '#f8fafc',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>

      {/* ── Top Bar ─────────────────────────────────────────── */}
      <div style={{
        background: '#060d1a',
        borderBottom: '1px solid #1e293b',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexShrink: 0,
        zIndex: 100
      }}>
        {/* Left: back button + hamburger (mobile) + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Back arrow — always visible in top bar */}
          <button
            onClick={() => setCurrentView('home')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.35)',
              borderRadius: '8px', color: '#fca5a5',
              padding: '0.42rem 0.85rem', cursor: 'pointer',
              fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap'
            }}
            title="Back to Customer View"
          >
            <ArrowLeft size={15} /> Customer View
          </button>

          {/* Hamburger — only visible on mobile */}
          <button
            className="admin-hamburger-btn"
            onClick={() => setMobileSidebarOpen(true)}
            style={{
              background: 'transparent', border: '1px solid #334155',
              borderRadius: '8px', color: '#94a3b8',
              padding: '0.45rem', cursor: 'pointer',
              display: 'none'
            }}
          >
            <Menu size={20} />
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Sparkles size={12} /> Restaurant Operations & Management System
            </div>
            <h1 style={{ fontSize: '1.15rem', color: 'white', fontWeight: 800 }}>
              {navItems.find(n => n.id === adminTab)?.label || 'Dashboard'}
            </h1>
          </div>
        </div>

        {/* Right: live indicator + bell */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)',
            color: '#fca5a5', padding: '0.35rem 0.85rem',
            borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
            Live Feed Active
          </div>

          {newOrdersCount > 0 && (
            <div style={{ position: 'relative' }}>
              <Bell size={20} color="#94a3b8" />
              <span style={{
                position: 'absolute', top: '-6px', right: '-6px',
                background: '#ef4444', color: 'white',
                fontSize: '0.65rem', fontWeight: 800,
                width: '16px', height: '16px',
                borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '2px solid #0a1120'
              }}>
                {newOrdersCount}
              </span>
            </div>
          )}

          <div style={{
            width: '34px', height: '34px',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', fontWeight: 800, color: 'white'
          }}>
            GM
          </div>
        </div>
      </div>

      {/* ── Body: Sidebar + Content ─────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

        {/* Desktop Sidebar */}
        <div className="admin-sidebar-desktop">
          <SidebarContent />
        </div>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 500,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div
              style={{ width: '280px', height: '100%', position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.75rem', background: '#0a1120', borderBottom: '1px solid #1e293b' }}>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.4rem' }}
                >
                  <X size={22} />
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <SidebarContent />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem', minWidth: 0, background: '#0f172a' }}>
          {children}
        </main>
      </div>
    </div>
  );
};
