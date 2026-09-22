import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  User,
  CheckCircle2,
  Sparkles,
  QrCode,
  MapPin,
  UtensilsCrossed,
  Wine,
  Gift,
  Briefcase,
  Heart
} from 'lucide-react';

export const TableBooking = () => {
  const { addReservation, setCurrentView } = useApp();

  const [guestCount, setGuestCount] = useState(2);
  const [dateType, setDateType] = useState('today');
  const [selectedDate, setSelectedDate] = useState('2026-09-22');
  const [selectedTime, setSelectedTime] = useState('07:30 PM');
  const [selectedZone, setSelectedZone] = useState('Main Dining Hall');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const timeSlots = [
    '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM',
    '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'
  ];

  const zones = [
    { name: 'Main Dining Hall', desc: 'Vibrant atmosphere near live open kitchen', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80', tag: 'Most Popular' },
    { name: 'Garden Patio Terrace', desc: 'Outdoor romantic candlelit seating', image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80', tag: 'Outdoor' },
    { name: 'Romantic Booth', desc: 'Cozy plush velvet booth for intimate dining', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80', tag: 'Intimate' },
    { name: 'VIP Lounge', desc: 'Private lounge with personal sommelier', image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=400&q=80', tag: 'Exclusive' }
  ];

  const occasions = [
    { label: 'Birthday', icon: Gift },
    { label: 'Anniversary', icon: Heart },
    { label: 'Date Night', icon: Wine },
    { label: 'Business', icon: Briefcase }
  ];

  const handleOccasionClick = (occ) => {
    if (specialRequest.includes(occ)) return;
    setSpecialRequest(prev => prev ? `${prev}, ${occ}` : occ);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const newRes = addReservation({
      name: guestName || 'Guest',
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

  const getSelectedZoneImage = () => {
    return zones.find(z => z.name === selectedZone)?.image || zones[0].image;
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
      {/* Page Title Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', padding: '3rem 2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2.5rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fde047', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '0.05em' }}>
          <Sparkles size={16} /> INSTANT ONLINE TABLE RESERVATION
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>Reserve Your Table Experience</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.75rem', maxWidth: '600px', margin: '0.75rem auto 0' }}>
          Experience world-class culinary excellence. Pick your party size, date, time slot, and preferred ambiance with zero booking fees.
        </p>
      </div>

      <div className="booking-layout">
        {/* Left Column: Interactive Booking Form */}
        <form onSubmit={handleSubmitBooking} className="booking-form-col">
          
          {/* Step 1: Guests & Date */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)' }}>
              <span style={{ background: 'var(--color-primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>1</span>
              Party Size & Date
            </h3>

            {/* Guest Count */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>Number of Guests</label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setGuestCount(num)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.6rem 1.2rem',
                      borderRadius: 'var(--radius-full)',
                      border: guestCount === num ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                      background: guestCount === num ? '#fffbeb' : 'white',
                      color: guestCount === num ? '#92400e' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {num === 1 ? <User size={16} /> : <Users size={16} />}
                    {num} {num === 10 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>Select Date</label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => { setDateType('today'); setSelectedDate('2026-09-22'); }} style={{ padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-md)', border: dateType === 'today' ? '2px solid var(--color-primary)' : '1px solid var(--border-light)', background: dateType === 'today' ? '#fffbeb' : 'white', color: dateType === 'today' ? '#92400e' : 'var(--text-main)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>Today (22 Sep)</button>
                <button type="button" onClick={() => { setDateType('tomorrow'); setSelectedDate('2026-09-23'); }} style={{ padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-md)', border: dateType === 'tomorrow' ? '2px solid var(--color-primary)' : '1px solid var(--border-light)', background: dateType === 'tomorrow' ? '#fffbeb' : 'white', color: dateType === 'tomorrow' ? '#92400e' : 'var(--text-main)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>Tomorrow (23 Sep)</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: dateType === 'custom' ? '2px solid var(--color-primary)' : '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', background: dateType === 'custom' ? '#fffbeb' : 'white', padding: '0 0.75rem', transition: 'all 0.2s' }}>
                  <CalendarIcon size={18} color={dateType === 'custom' ? '#92400e' : 'var(--text-muted)'} />
                  <input type="date" value={selectedDate} onChange={(e) => { setDateType('custom'); setSelectedDate(e.target.value); }} style={{ border: 'none', background: 'transparent', padding: '0.6rem 0', outline: 'none', fontWeight: 600, color: dateType === 'custom' ? '#92400e' : 'var(--text-main)', cursor: 'pointer' }} />
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>Available Time Slots</label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {timeSlots.map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: selectedTime === t ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                      background: selectedTime === t ? 'var(--color-primary)' : 'white',
                      color: selectedTime === t ? 'white' : 'var(--text-main)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Clock size={14} /> {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Seating Zone */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)' }}>
              <span style={{ background: 'var(--color-primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>2</span>
              Seating Zone Preference
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {zones.map(z => (
                <div
                  key={z.name}
                  onClick={() => setSelectedZone(z.name)}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    border: selectedZone === z.name ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                    background: selectedZone === z.name ? '#fffbeb' : 'white',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.2s',
                    boxShadow: selectedZone === z.name ? '0 4px 12px rgba(245,158,11,0.15)' : 'none'
                  }}
                >
                  <div style={{ position: 'relative', height: '110px' }}>
                    <img src={z.image} alt={z.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
                    <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', backdropFilter: 'blur(4px)', fontWeight: 600 }}>{z.tag}</div>
                    {selectedZone === z.name && (
                      <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', padding: '0.2rem' }}>
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '0.85rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: selectedZone === z.name ? '#92400e' : 'var(--text-main)', marginBottom: '0.2rem' }}>{z.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{z.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Guest Details */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)' }}>
              <span style={{ background: 'var(--color-primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>3</span>
              Guest Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Full Name</label>
                <input type="text" placeholder="Enter your full name" value={guestName} onChange={(e) => setGuestName(e.target.value)} required style={{ width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none', fontSize: '0.95rem' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Email Address</label>
                  <input type="email" placeholder="name@example.com" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required style={{ width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none', fontSize: '0.95rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required style={{ width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none', fontSize: '0.95rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.6rem', display: 'block' }}>Special Occasion (Optional)</label>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {occasions.map(occ => (
                    <button type="button" key={occ.label} onClick={() => handleOccasionClick(occ.label)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer', transition: 'all 0.2s' }}>
                      <occ.icon size={14} color="var(--color-primary)" /> {occ.label}
                    </button>
                  ))}
                </div>
                <input type="text" placeholder="Any other special requests or dietary requirements?" value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} style={{ width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none', fontSize: '0.95rem' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1.1rem', fontSize: '1.1rem', marginTop: '2rem', boxShadow: '0 8px 20px rgba(245,158,11,0.25)' }}>
              Confirm & Reserve Table
            </button>
          </div>
        </form>

        {/* Right Column: Live Pass Preview & Policies */}
        <div className="booking-pass-col">
          
          {/* Live Interactive Digital Pass */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ height: '140px', position: 'relative' }}>
              <img src={getSelectedZoneImage()} alt="Zone" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)' }} />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)', color: 'white', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.3)' }}>
                Live Preview
              </div>
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fde047', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>GourmetPulse Dining</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{selectedZone}</div>
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Date</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{selectedDate || 'Select Date'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Time</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{selectedTime}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Guests</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{guestCount} People</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Guest Name</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{guestName || 'Pending...'}</div>
                </div>
              </div>
              <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px dashed #cbd5e1', textAlign: 'center', marginBottom: '1.25rem' }}>
                <QrCode size={40} color="#94a3b8" style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>QR Pass generated upon confirmation</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 700 }}>
                <CheckCircle2 size={16} /> ₹0 Booking Fee • Free Cancellation
              </div>
            </div>
          </div>

          {/* Dining Guarantee Card */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', fontWeight: 800 }}>Dining Guarantee & Policy</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} /> 
                <span><strong>15-minute Grace Period</strong> for arrival before table is released.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} /> 
                <span><strong>Free cancellation</strong> up to 2 hours prior to reservation time.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} /> 
                <span>Instant SMS & Email digital ticket with scannable QR code.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedReservation && (
        <div className="modal-overlay" onClick={() => setConfirmedReservation(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px', padding: 0, overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '2.5rem 2rem', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}><Sparkles size={120} /></div>
              <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <CheckCircle2 size={36} color="#10b981" />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Reservation Confirmed!</h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>We're excited to host you, {confirmedReservation.name.split(' ')[0]}.</p>
            </div>

            <div className="modal-body" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ background: 'white', border: '1px solid var(--border-light)', padding: '1.25rem', display: 'inline-block', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <QrCode size={150} color="#0f172a" />
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ticket ID</span>
                  <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{confirmedReservation.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date & Time</span>
                  <span style={{ fontWeight: 700 }}>{confirmedReservation.date} • {confirmedReservation.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Guests & Zone</span>
                  <span style={{ fontWeight: 700 }}>{confirmedReservation.guests} People • {confirmedReservation.zone}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0 2rem 2rem' }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.05rem' }} onClick={() => setConfirmedReservation(null)}>
                Download Digital Pass
              </button>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.05rem' }} onClick={() => { setConfirmedReservation(null); setCurrentView('home'); }}>
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

