import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  Calendar,
  CreditCard,
  ChefHat,
  Star,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  TrendingUp,
  Clock,
  DollarSign,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Layers,
  Award,
  Wine,
  Leaf,
  Users,
  MapPin,
  PlayCircle
} from 'lucide-react';

// Parallax hook
const useParallax = (speed = 0.4) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = (rect.top + scrolled) * speed;
      el.style.backgroundPositionY = `${-offset * 0.3}px`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  return ref;
};

// Intersection Observer for reveal animations
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
};

const RevealSection = ({ children, delay = 0, style = {} }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export const LandingPage = () => {
  const { setCurrentView, menuItems, addToCart, setIsCartOpen } = useApp();
  const heroParallaxRef = useParallax(0.3);
  const chefParallaxRef = useParallax(0.25);
  const ctaParallaxRef = useParallax(0.2);

  const featuredDishes = menuItems.filter(item => item.isPopular).slice(0, 4);

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ─── HERO: Full-bleed parallax (no side padding) ──── */}
      <div className="hero-fullbleed">
      <section
        ref={heroParallaxRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '0',
          backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,10,20,0.82) 0%, rgba(10,10,20,0.5) 50%, rgba(10,10,20,0.65) 100%)',
        }} />
        {/* Warm amber glow bottom-left */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '40%', height: '40%',
          background: 'radial-gradient(ellipse at bottom left, rgba(245,158,11,0.18), transparent 70%)',
          pointerEvents: 'none'
        }} />
        {/* Crimson glow top-right */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '35%', height: '45%',
          background: 'radial-gradient(ellipse at top right, rgba(239,68,68,0.14), transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: '6rem 2.5rem 5rem', width: '100%' }}>
          <div style={{ maxWidth: '700px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.45rem 1.1rem',
              background: 'rgba(245,158,11,0.18)',
              border: '1px solid rgba(245,158,11,0.5)',
              color: '#fde047',
              borderRadius: '9999px',
              fontSize: '0.85rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.07em',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(8px)'
            }}>
              <Sparkles size={14} /> Michelin-Crafted Dining Platform
            </div>

            <h1 style={{
              fontSize: 'clamp(2.8rem,6vw,4.8rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: 'white',
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em'
            }}>
              Where Every Dish{' '}
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Tells a Story.
              </span>
            </h1>

            <p style={{
              fontSize: '1.2rem', color: '#cbd5e1', lineHeight: 1.7,
              marginBottom: '2.5rem', maxWidth: '560px'
            }}>
              GourmetPulse merges artisanal cuisine with seamless digital operations — instant QR ordering, contactless payments, and real-time kitchen tracking, all in one platform.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => setCurrentView('menu')} style={{ fontSize: '1.05rem', padding: '1rem 2rem' }}>
                <UtensilsCrossed size={20} /> Explore Our Menu
              </button>
              <button className="btn-secondary" onClick={() => setCurrentView('reservation')} style={{ fontSize: '1.05rem', padding: '1rem 2rem' }}>
                <Calendar size={20} /> Book a Table
              </button>
            </div>
          </div>

          {/* Floating stat chips */}
          <div style={{
            position: 'absolute', bottom: '3rem', right: '2.5rem',
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
            alignItems: 'flex-end'
          }}>
            {[
              { icon: Star, value: '4.9★', label: 'Guest Rating' },
              { icon: Award, value: 'Michelin 2026', label: 'Certified' },
              { icon: Users, value: '12k+', label: 'Monthly Diners' }
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 1.1rem',
                display: 'flex', alignItems: 'center', gap: '0.65rem',
                color: 'white', minWidth: '170px'
              }}>
                <Icon size={18} color="#f59e0b" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>{/* end hero-fullbleed */}

      {/* ─── METRICS STRIP ─────────────────────────────────── */}
      <RevealSection style={{ marginBottom: '5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          marginTop: '2.5rem',
        }}>
          {[
            {
              icon: TrendingUp, value: '+35%', label: 'Faster Table Service',
              sub: 'vs. traditional ordering', color: '#f59e0b',
              bg: 'linear-gradient(135deg,#fef3c7,#fffbeb)', border: '#fcd34d'
            },
            {
              icon: DollarSign, value: '0% Fees', label: 'No 3rd-Party Cut',
              sub: '100% margins retained', color: '#10b981',
              bg: 'linear-gradient(135deg,#d1fae5,#ecfdf5)', border: '#6ee7b7'
            },
            {
              icon: Zap, value: '99.8%', label: 'Kitchen Accuracy',
              sub: 'Instant KDS sync', color: '#3b82f6',
              bg: 'linear-gradient(135deg,#dbeafe,#eff6ff)', border: '#93c5fd'
            },
            {
              icon: Clock, value: '<45s', label: 'Avg Checkout Time',
              sub: 'Contactless payment', color: '#ef4444',
              bg: 'linear-gradient(135deg,#fee2e2,#fff1f2)', border: '#fca5a5'
            },
            {
              icon: Users, value: '12k+', label: 'Monthly Diners',
              sub: 'Across all locations', color: '#8b5cf6',
              bg: 'linear-gradient(135deg,#ede9fe,#f5f3ff)', border: '#c4b5fd'
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={{
                background: stat.bg,
                border: `1.5px solid ${stat.border}40`,
                borderRadius: '16px',
                padding: '1.5rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxShadow: `0 4px 20px ${stat.color}15`,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'default'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${stat.color}30`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 20px ${stat.color}15`; }}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: `${stat.color}20`,
                  border: `1.5px solid ${stat.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={20} color={stat.color} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: stat.color, fontFamily: 'var(--font-heading)', lineHeight: 1, marginTop: '0.25rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{stat.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </RevealSection>

      {/* ─── GALLERY BENTO GRID ────────────────────────────── */}
      <RevealSection style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--color-primary-hover)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            The GourmetPulse Experience
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', marginTop: '0.4rem', color: 'var(--text-main)' }}>
            Every Visit, An Unforgettable Journey
          </h2>
        </div>

        {/* Bento-style image grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gridTemplateRows: '280px 280px', gap: '1rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {/* Large left tile */}
          <div style={{
            gridRow: 'span 2',
            position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)', cursor: 'pointer'
          }} className="bento-img-tile">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=85"
              alt="Signature Plating"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)' }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', color: 'white' }}>
              <div style={{ fontSize: '0.78rem', color: '#fde047', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Chef's Artistry</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.2 }}>Michelin-Grade Plating</div>
            </div>
          </div>

          {/* Top-right tiles */}
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)' }} className="bento-img-tile">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
              alt="Fine Dining Atmosphere"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Fine Dining Hall</div>
            </div>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)' }} className="bento-img-tile">
            <img
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80"
              alt="Wine Selection"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Curated Wine Cellar</div>
            </div>
          </div>

          {/* Bottom-right tiles */}
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)' }} className="bento-img-tile">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80"
              alt="Romantic Booth"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Romantic Booths</div>
            </div>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)' }} className="bento-img-tile">
            <img
              src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=600&q=80"
              alt="Garden Patio"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Garden Patio Terrace</div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ─── BUSINESS SOLUTION CARDS ──────────────────────── */}
      <RevealSection style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: 'var(--color-primary-hover)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Core Business Solutions
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', marginTop: '0.4rem', color: 'var(--text-main)' }}>
            Empowering Modern Restaurant Operations
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.6rem auto 0', fontSize: '1rem', lineHeight: 1.65 }}>
            Built for hospitality leaders seeking higher profit margins, faster table service, and unforgettable guest experiences.
          </p>
        </div>

        <div className="features-grid">
          {[
            {
              icon: UtensilsCrossed, bgGrad: 'linear-gradient(135deg,#fef3c7,#fffbeb)', iconColor: '#d97706',
              pill: 'metric-pill-warning', pillIcon: TrendingUp, pillLabel: '+35% Table Turnover',
              title: 'Interactive Digital Ordering',
              desc: 'Guests browse HD dish visuals, customize dietary options, and place orders directly from the table — no server delays.',
              img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80',
              action: () => setCurrentView('menu'), actionLabel: 'Try Digital Menu'
            },
            {
              icon: CreditCard, bgGrad: 'linear-gradient(135deg,#fee2e2,#fff1f2)', iconColor: '#dc2626',
              pill: 'metric-pill-success', pillIcon: ShieldCheck, pillLabel: '100% Margin Retention',
              title: 'Integrated Payment Gateway',
              desc: 'Eliminate delivery commissions. Accept Credit Cards, UPI QR, Apple Pay, or Cash — all tracked in one dashboard.',
              img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&q=80',
              action: () => setCurrentView('menu'), actionLabel: 'Test Payment Flow'
            },
            {
              icon: Calendar, bgGrad: 'linear-gradient(135deg,#dbeafe,#eff6ff)', iconColor: '#2563eb',
              pill: 'metric-pill-info', pillIcon: Layers, pillLabel: 'Seating Zone Control',
              title: 'Smart Table Reservations',
              desc: 'Let patrons reserve specific zones — Main Hall, Patio Terrace, VIP Booth — with instant QR digital passes.',
              img: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=500&q=80',
              action: () => setCurrentView('reservation'), actionLabel: 'Reserve a Table'
            },
            {
              icon: ChefHat, bgGrad: 'linear-gradient(135deg,#dcfce7,#f0fdf4)', iconColor: '#166534',
              pill: 'metric-pill-purple', pillIcon: Zap, pillLabel: 'Zero Kitchen Delay',
              title: 'Kitchen Display System',
              desc: 'Orders transmit directly to chef KDS screens with preparation checklists, urgency flags, and live timers.',
              img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80',
              action: () => setCurrentView('admin'), actionLabel: 'Open KDS Portal'
            }
          ].map((card, i) => {
            const Icon = card.icon;
            const PillIcon = card.pillIcon;
            return (
              <RevealSection delay={i * 100} key={i}>
                <div className="vibrant-card" style={{ height: '100%', cursor: 'default' }}>
                  {/* Card image */}
                  <div style={{ height: '160px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.25rem' }}>
                    <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div>
                    <div className="vibrant-icon-badge" style={{ background: card.bgGrad, color: card.iconColor }}>
                      <Icon size={26} />
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span className={`metric-pill ${card.pill}`}>
                        <PillIcon size={13} /> {card.pillLabel}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', color: 'var(--text-main)' }}>{card.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.4rem' }}>{card.desc}</p>
                  </div>
                  <button className="btn-secondary" style={{ color: 'var(--text-main)', borderColor: 'var(--border-light)', width: '100%', justifyContent: 'center' }} onClick={card.action}>
                    {card.actionLabel} <ArrowRight size={16} />
                  </button>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </RevealSection>

      {/* ─── CHEF PARALLAX SECTION ────────────────────────── */}
      <section
        ref={chefParallaxRef}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          minHeight: '520px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '5rem',
          backgroundImage: `url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '4rem 3rem', maxWidth: '580px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.5)', color: '#fde047', padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <ChefHat size={14} /> Our Master Kitchen Team
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', color: 'white', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Crafted by World-Class Chefs. Served with Pride.
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Our executive culinary team brings 30+ years of combined Michelin-starred kitchen experience — delivering every dish with precision, creativity, and soul.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { icon: Award, label: 'Michelin Star 2026' },
              { icon: Leaf, label: 'Organic Ingredients' },
              { icon: Wine, label: 'Sommelier Curated' }
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontSize: '0.9rem', fontWeight: 700 }}>
                <Icon size={18} color="#f59e0b" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SIGNATURE DISHES ─────────────────────────────── */}
      <RevealSection style={{ marginBottom: '5rem' }}>
        <div className="section-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
              <Flame size={18} /> CULINARY SELECTION
            </div>
            <h2 className="section-title">Popular Signature Dishes</h2>
          </div>
          <button className="btn-secondary" style={{ color: 'var(--text-main)', borderColor: 'var(--border-light)' }} onClick={() => setCurrentView('menu')}>
            Full Menu <ArrowRight size={16} />
          </button>
        </div>

        <div className="dish-grid">
          {featuredDishes.map((dish, i) => (
            <RevealSection delay={i * 80} key={dish.id}>
              <div className="dish-card">
                <div className="dish-image-wrap">
                  <img src={dish.image} alt={dish.name} className="dish-img" />
                  <div className="dish-badge">
                    <Star size={13} color="#f59e0b" fill="#f59e0b" /> {dish.rating}
                  </div>
                  <div className={`dietary-tag ${dish.dietary.includes('Veg') ? 'dietary-veg' : 'dietary-nonveg'}`}>
                    {dish.dietary.join(', ')}
                  </div>
                </div>
                <div className="dish-body">
                  <div className="dish-title-row">
                    <h3 className="dish-title">{dish.name}</h3>
                  </div>
                  <p className="dish-desc">{dish.description}</p>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Clock size={12} /> {dish.prepTime}</span>
                    <span>• {dish.calories}</span>
                  </div>
                  <div className="dish-footer">
                    <div className="dish-price">${dish.price.toFixed(2)}</div>
                    <button className="add-btn" onClick={() => { addToCart(dish); setIsCartOpen(true); }}>
                      <ShoppingBag size={15} /> Add to Order
                    </button>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </RevealSection>

      {/* ─── DINING ZONES HORIZONTAL SCROLL ──────────────── */}
      <RevealSection style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--color-primary-hover)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Our Dining Spaces
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', marginTop: '0.4rem', color: 'var(--text-main)' }}>
            Choose Your Perfect Ambiance
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'thin' }}>
          {[
            {
              zone: 'Main Dining Hall', cap: 'Up to 8 guests', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
              tag: 'Most Popular', tagColor: '#f59e0b'
            },
            {
              zone: 'Garden Patio Terrace', cap: 'Outdoor • 2–6 guests', img: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=700&q=80',
              tag: 'Romantic', tagColor: '#ec4899'
            },
            {
              zone: 'Romantic Velvet Booth', cap: 'Intimate • 2 guests', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=700&q=80',
              tag: 'Couples Choice', tagColor: '#ef4444'
            },
            {
              zone: 'VIP Private Lounge', cap: 'Exclusive • Up to 15', img: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=700&q=80',
              tag: 'VIP Access', tagColor: '#8b5cf6'
            },
            {
              zone: 'Sommelier Wine Bar', cap: 'Bar seating • Open', img: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=700&q=80',
              tag: 'Daily 5 PM–11 PM', tagColor: '#3b82f6'
            }
          ].map((zone, i) => (
            <div
              key={i}
              onClick={() => setCurrentView('reservation')}
              style={{
                minWidth: '280px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            >
              <img src={zone.img} alt={zone.zone} style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.78) 100%)' }} />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <span style={{ background: zone.tagColor, color: 'white', fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
                  {zone.tag}
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', color: 'white' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.2 }}>{zone.zone}</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Users size={13} /> {zone.cap}
                </div>
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#fde047' }}>
                  <Calendar size={14} /> Reserve This Zone <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ─── FULL-BLEED CTA PARALLAX ──────────────────────── */}
      <section
        ref={ctaParallaxRef}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          minHeight: '420px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '5rem',
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,20,0.72)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.15), transparent 65%)' }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '4rem 2rem', maxWidth: '680px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.5)', color: '#fde047', padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase' }}>
            <Sparkles size={14} /> Now Accepting Digital Reservations
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'white', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Your Perfect Dining Experience Awaits.
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Reserve your table online in under 30 seconds — or order directly from our digital menu for seamless contactless dining.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => setCurrentView('reservation')} style={{ fontSize: '1.05rem', padding: '1rem 2.25rem', boxShadow: '0 6px 24px rgba(239,68,68,0.45)' }}>
              <Calendar size={20} /> Book Your Table Now
            </button>
            <button className="btn-secondary" onClick={() => setCurrentView('menu')} style={{ fontSize: '1.05rem', padding: '1rem 2.25rem' }}>
              <UtensilsCrossed size={20} /> Browse Digital Menu
            </button>
          </div>
        </div>
      </section>

      {/* ─── AMBIANCE SPLIT SECTION ──────────────────────── */}
      <RevealSection style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '4rem 3rem', border: '1px solid var(--border-light)', marginBottom: '4rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'var(--color-primary-hover)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Why Choose GourmetPulse
            </div>
            <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', lineHeight: 1.2, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              Where Gastronomy Meets Seamless Hospitality
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.75rem', fontSize: '0.98rem' }}>
              From intimate anniversary dinners to large corporate gatherings, GourmetPulse delivers extraordinary cuisine with effortless digital convenience at every touchpoint.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2.25rem' }}>
              {[
                'Dedicated Sommelier & Custom Wine Pairings',
                'Organic & Farm-to-Table Fresh Ingredients',
                'Private VIP Dining with Dedicated Chef Service',
                'Live Order Tracking from Kitchen to Table'
              ].map(feature => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontWeight: 600, color: 'var(--text-main)', fontSize: '0.96rem' }}>
                  <CheckCircle2 size={20} color="var(--color-success)" style={{ flexShrink: 0 }} /> {feature}
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setCurrentView('reservation')}>
              <Calendar size={18} /> Book Your Table Experience
            </button>
          </div>

          {/* Asymmetric image mosaic */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '200px 200px', gap: '0.85rem' }}>
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80"
              alt="Chef Plating"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)', gridRow: 'span 2' }}
            />
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
              alt="Gourmet Salad"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
            />
            <img
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80"
              alt="Wine Service"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
            />
          </div>
        </div>
      </RevealSection>

    </div>
  );
};
