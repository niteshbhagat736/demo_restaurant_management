import React from 'react';
import { UtensilsCrossed, MapPin, Phone, Mail, Clock, ShieldCheck, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div>
          <div className="logo-brand" style={{ color: 'white', marginBottom: '1rem' }}>
            <div className="logo-icon">
              <UtensilsCrossed size={22} />
            </div>
            <span>GourmetPulse</span>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            Next-generation dining experience combining Michelin-grade culinary craftsmanship with instant digital table ordering, contactless payments, and real-time smart restaurant operations.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ background: '#1e293b', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={14} color="#f59e0b" /> Michelin Guide 2026
            </span>
            <span style={{ background: '#1e293b', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={14} color="#10b981" /> 100% Hygienic Certified
            </span>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Quick Navigation</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <li><button onClick={() => setCurrentView('home')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Restaurant Home</button></li>
            <li><button onClick={() => setCurrentView('menu')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Digital Menu & Instant Order</button></li>
            <li><button onClick={() => setCurrentView('reservation')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Online Table Booking</button></li>
            <li><button onClick={() => setCurrentView('order-tracker')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Live Order Status Tracker</button></li>
            <li><button onClick={() => setCurrentView('admin')} style={{ background: 'none', border: 'none', color: '#60a5fa', fontWeight: 'bold', cursor: 'pointer' }}>Staff & Management Portal</button></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Opening Hours</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="#f59e0b" /> Mon - Thu: 11:30 AM - 10:30 PM
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="#f59e0b" /> Fri - Sun: 11:00 AM - 11:30 PM
            </li>
            <li style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>
              ● Kitchen open for live digital orders
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Contact & Location</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={16} color="#ef4444" /> 742 Gourmet Boulevard, Culinary District
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} color="#3b82f6" /> +1 (800) GOURMET-PULSE
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} color="#8b5cf6" /> reservations@gourmetpulse.demo
            </li>
          </ul>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingTop: '1.5rem', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem' }}>
        <div>© 2026 GourmetPulse Systems. All rights reserved. Pitch Presentation Demo.</div>
        <div style={{ color: '#f59e0b', fontWeight: 600 }}>Built for Interactive Pitch Showcase</div>
      </div>
    </footer>
  );
};
