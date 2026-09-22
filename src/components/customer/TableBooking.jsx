import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  QrCode,
  MapPin,
  UtensilsCrossed
} from 'lucide-react';

export const TableBooking = () => {
  const { addReservation, setCurrentView } = useApp();

  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('2026-09-22');
  const [selectedTime, setSelectedTime] = useState('07:30 PM');
  const [selectedZone, setSelectedZone] = useState('Main Dining Hall');
  const [guestName, setGuestName] = useState('John Doe');
  const [guestEmail, setGuestEmail] = useState('john.doe@example.com');
  const [guestPhone, setGuestPhone] = useState('+1 (555) 345-6789');
  const [specialRequest, setSpecialRequest] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const timeSlots = [
    '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM',
    '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'
  ];

  const zones = [
    { name: 'Main Dining Hall', desc: 'Vibrant atmosphere near live open kitchen', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80' },
    { name: 'Garden Patio Terrace', desc: 'Outdoor romantic candlelit seating with fountain', image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80' },
    { name: 'Romantic Booth', desc: 'Cozy plush velvet booth for intimate dining', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80' },
    { name: 'VIP Lounge', desc: 'Private lounge with personal sommelier service', image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const newRes = addReservation({
      name: guestName,
      email: guestEmail,
      phone: guestPhone,
      guests: guestCount,
      date: selectedDate,
      time: selectedTime,
      zone: selectedZone,
      specialRequest
    });
    setConfirmedReservation(newRes);
  };

  return (
    <div>
      {/* Page Title Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(245, 158, 11, 0.2)', color: '#fde047', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <Sparkles size={14} /> INSTANT ONLINE TABLE RESERVATION
        </div>
        <h1 style={{ fontSize: '2.5rem' }}>Reserve Your Table Experience</h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.4rem' }}>
          Instant confirmation with zero booking fees. Select your preferred seating zone & time slot.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        {/* Booking Form */}
        <form onSubmit={handleSubmitBooking} style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarIcon color="var(--color-primary-hover)" size={22} /> Reservation Details
          </h3>

          {/* Guest Count Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Number of Guests
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setGuestCount(num)}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-sm)',
                    border: guestCount === num ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                    background: guestCount === num ? '#fffbeb' : 'white',
                    color: guestCount === num ? '#92400e' : 'var(--text-main)',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none', fontWeight: 600 }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Time Slot
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none', fontWeight: 600 }}
              >
                {timeSlots.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Seating Zone Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
              Seating Zone Preference
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {zones.map(z => (
                <div
                  key={z.name}
                  onClick={() => setSelectedZone(z.name)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedZone === z.name ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                    background: selectedZone === z.name ? '#fffbeb' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: selectedZone === z.name ? '#92400e' : 'var(--text-main)' }}>{z.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{z.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>Full Name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>Email Address</label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>Phone Number</label>
                <input
                  type="text"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>Special Requests / Occasion</label>
              <input
                type="text"
                placeholder="e.g. Birthday surprise setup, window table..."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none' }}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Confirm & Reserve Table
          </button>
        </form>

        {/* Right Side Preview & Policy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'white', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Dining Guarantee & Policy</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-success)" /> 15-minute Grace Period for arrival.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-success)" /> Free cancellation up to 2 hours prior.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-success)" /> Instant SMS & Email ticket with QR code.
              </div>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <UtensilsCrossed size={36} style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.4rem' }}>Planning a Large Event or Wedding?</h3>
            <p style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.4rem', marginBottom: '1.25rem' }}>
              We offer full restaurant buyouts, custom menus, and dedicated sommeliers for private parties of 15+ guests.
            </p>
            <button className="btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(0,0,0,0.2)' }}>
              Contact Events Manager
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedReservation && (
        <div className="modal-overlay" onClick={() => setConfirmedReservation(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '2rem', textAlign: 'center' }}>
              <CheckCircle2 size={54} color="#10b981" style={{ margin: '0 auto 0.75rem' }} />
              <h2 style={{ fontSize: '1.6rem' }}>Table Reservation Confirmed!</h2>
              <p style={{ color: '#fde047', fontWeight: 700, marginTop: '0.25rem' }}>
                Pass ID: {confirmedReservation.id}
              </p>
            </div>

            <div className="modal-body" style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', border: '1px solid var(--border-light)', padding: '1rem', display: 'inline-block', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                <QrCode size={130} color="#0f172a" />
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Guest Name:</span>
                  <span style={{ fontWeight: 700 }}>{confirmedReservation.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date & Time:</span>
                  <span style={{ fontWeight: 700 }}>{confirmedReservation.date} at {confirmedReservation.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Guests & Zone:</span>
                  <span style={{ fontWeight: 700 }}>{confirmedReservation.guests} Guests • {confirmedReservation.zone}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setConfirmedReservation(null)}>
                Done & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
