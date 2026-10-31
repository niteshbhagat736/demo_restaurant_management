import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  User,
  CheckCircle2,
  Sparkles,
  QrCode,
  UtensilsCrossed,
  Wine,
  Gift,
  Briefcase,
  Heart,
  Mail,
  Phone,
  ShieldCheck,
  Check,
  PartyPopper
} from 'lucide-react';

const VALID_ZONES = new Set([
  'Main Dining Hall',
  'Garden Patio Terrace',
  'Romantic Velvet Booth',
  'VIP Private Lounge'
]);

const readReservationParams = () => {
  const p = new URLSearchParams(window.location.search);
  const guests = parseInt(p.get('guests'), 10);
  const zone = p.get('zone');
  return {
    guests: (guests >= 1 && guests <= 8) ? guests : 2,
    zone: VALID_ZONES.has(zone) ? zone : 'Main Dining Hall',
  };
};

export const TableBooking = () => {
  const { addReservation, setCurrentView } = useApp();

  const [guestCount, setGuestCount] = useState(() => readReservationParams().guests);
  const [dateType, setDateType] = useState('today');
  const [selectedDate, setSelectedDate] = useState('2026-09-22');
  const [selectedTime, setSelectedTime] = useState('07:30 PM');
  const [selectedZone, setSelectedZone] = useState(() => readReservationParams().zone);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [selectedOccasions, setSelectedOccasions] = useState([]);

  const [confirmedReservation, setConfirmedReservation] = useState(null);

  // Sync state to URL params for shareable booking links
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'reservation');
    if (guestCount !== 2) url.searchParams.set('guests', guestCount);
    else url.searchParams.delete('guests');
    if (selectedZone !== 'Main Dining Hall') url.searchParams.set('zone', selectedZone);
    else url.searchParams.delete('zone');
    window.history.replaceState({}, '', url.toString());
  }, [guestCount, selectedZone]);

  const timeSlots = [
    '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM',
    '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM',
    '09:30 PM', '10:00 PM'
  ];

  const zones = [
    {
      name: 'Main Dining Hall',
      desc: 'Vibrant atmosphere near live open chef kitchen',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      tag: 'Most Popular',
      vibe: 'Lively & Energetic',
      tagColor: '#f59e0b'
    },
    {
      name: 'Garden Patio Terrace',
      desc: 'Outdoor romantic candlelit seating under stars',
      image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=600&q=80',
      tag: 'Al Fresco',
      vibe: 'Fresh & Romantic',
      tagColor: '#10b981'
    },
    {
      name: 'Romantic Velvet Booth',
      desc: 'Plush velvet booth for cozy, intimate dining',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80',
      tag: 'Couples',
      vibe: 'Intimate & Quiet',
      tagColor: '#ef4444'
    },
    {
      name: 'VIP Private Lounge',
      desc: 'Exclusive room with dedicated personal sommelier',
      image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=600&q=80',
      tag: 'Exclusive VIP',
      vibe: 'Private & Luxurious',
      tagColor: '#8b5cf6'
    }
  ];

  const occasionsList = [
    { label: 'Birthday', icon: Gift, color: '#f59e0b' },
    { label: 'Anniversary', icon: Heart, color: '#ef4444' },
    { label: 'Date Night', icon: Wine, color: '#ec4899' },
    { label: 'Business Dinner', icon: Briefcase, color: '#3b82f6' },
    { label: 'Celebration', icon: PartyPopper, color: '#10b981' }
  ];

  const toggleOccasion = (label) => {
    setSelectedOccasions(prev => {
      const exists = prev.includes(label);
      const updated = exists ? prev.filter(item => item !== label) : [...prev, label];
      
      // Sync with special request string
      if (!exists) {
        setSpecialRequest(curr => curr ? `${curr}, ${label}` : label);
      }
      return updated;
    });
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const newRes = addReservation({
      name: guestName.trim() || 'Guest Customer',
      email: guestEmail.trim(),
      phone: guestPhone.trim(),
      guests: guestCount,
      date: selectedDate,
      time: selectedTime,
      zone: selectedZone,
      specialRequest: specialRequest.trim() || (selectedOccasions.length > 0 ? selectedOccasions.join(', ') : 'None')
    });
    setConfirmedReservation(newRes);
  };

  const getSelectedZoneData = () => {
    return zones.find(z => z.name === selectedZone) || zones[0];
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-10 py-2 sm:py-6 pb-20">
      {/* Page Title Banner - Panoramic wide on Desktop */}
      <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 mb-8 shadow-2xl text-center relative overflow-hidden border border-white/10">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 sm:mb-4">
          <Sparkles size={14} className="text-amber-400" /> INSTANT ONLINE TABLE RESERVATION
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 sm:mb-3 text-white">
          Reserve Your Table Experience
        </h1>
        <p className="text-slate-300 text-xs sm:text-base lg:text-lg max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-6">
          Pick your party size, date, time slot, and preferred ambiance with ₹0 booking fees &amp; instant digital pass.
        </p>

        {/* Quick feature strip */}
        <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap pt-4 sm:pt-5 border-t border-white/10 text-xs sm:text-sm text-slate-200">
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Instant Table Confirmation
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Free Cancellation
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Scannable QR Pass
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] xl:grid-cols-[1fr_430px] 2xl:grid-cols-[1fr_460px] gap-6 lg:gap-8 xl:gap-10 items-start">
        {/* Left Column: Interactive Booking Form */}
        <form onSubmit={handleSubmitBooking} className="space-y-6 lg:space-y-8 min-w-0">
          
          {/* Step 1: Guests & Date */}
          <div className="booking-card">
            <div className="booking-card-header">
              <span className="booking-step-num">1</span>
              <div>
                <h3 className="booking-step-title">Party Size & Timing</h3>
                <p className="booking-step-sub">Select how many guests and when you would like to join us</p>
              </div>
            </div>

            {/* Guest Count */}
            <div className="booking-field-group">
              <label className="booking-label">
                <Users size={16} color="var(--color-primary)" />
                Number of Guests
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap gap-2 sm:gap-2.5">
                {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setGuestCount(num)}
                    className={`guest-pill-btn justify-center ${guestCount === num ? 'active' : ''}`}
                  >
                    {num === 1 ? <User size={15} /> : <Users size={15} />}
                    <span>{num}{num === 10 ? '+' : ''} {num === 1 ? 'Guest' : 'Guests'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="booking-field-group">
              <label className="booking-label">
                <CalendarIcon size={16} color="var(--color-primary)" />
                Select Date
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center">
                <button
                  type="button"
                  onClick={() => { setDateType('today'); setSelectedDate('2026-09-22'); }}
                  className={`date-pill-btn ${dateType === 'today' ? 'active' : ''}`}
                >
                  Today (22 Sep)
                </button>
                <button
                  type="button"
                  onClick={() => { setDateType('tomorrow'); setSelectedDate('2026-09-23'); }}
                  className={`date-pill-btn ${dateType === 'tomorrow' ? 'active' : ''}`}
                >
                  Tomorrow (23 Sep)
                </button>
                <div className={`date-custom-picker ${dateType === 'custom' ? 'active' : ''}`}>
                  <CalendarIcon size={16} color={dateType === 'custom' ? '#d97706' : '#94a3b8'} />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => { setDateType('custom'); setSelectedDate(e.target.value); }}
                    className="date-input-field"
                  />
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="booking-field-group" style={{ marginBottom: 0 }}>
              <label className="booking-label">
                <Clock size={16} color="var(--color-primary)" />
                Available Time Slots
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-2.5">
                {timeSlots.map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`time-slot-btn ${selectedTime === t ? 'active' : ''}`}
                  >
                    <Clock size={13} />
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Seating Zone */}
          <div className="booking-card">
            <div className="booking-card-header">
              <span className="booking-step-num">2</span>
              <div>
                <h3 className="booking-step-title">Atmosphere & Dining Zone</h3>
                <p className="booking-step-sub">Choose your preferred ambiance or seating area</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {zones.map(z => {
                const isSelected = selectedZone === z.name;
                return (
                  <div
                    key={z.name}
                    onClick={() => setSelectedZone(z.name)}
                    className={`zone-card ${isSelected ? 'active' : ''}`}
                  >
                    <div className="zone-img-wrap">
                      <img src={z.image} alt={z.name} className="zone-img" />
                      <div className="zone-img-overlay" />
                      <div className="zone-tag-chip" style={{ background: z.tagColor }}>
                        {z.tag}
                      </div>
                      {isSelected && (
                        <div className="zone-check-badge">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <div className="zone-info">
                      <div className="zone-name">{z.name}</div>
                      <div className="zone-desc">{z.desc}</div>
                      <div className="zone-vibe-tag">
                        <Sparkles size={12} color="var(--color-primary)" /> {z.vibe}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Guest Details & Occasion */}
          <div className="booking-card">
            <div className="booking-card-header">
              <span className="booking-step-num">3</span>
              <div>
                <h3 className="booking-step-title">Guest Details & Personalization</h3>
                <p className="booking-step-sub">We will send your instant reservation pass and SMS updates</p>
              </div>
            </div>

            <div className="guest-inputs-stack">
              <div>
                <label className="booking-label">
                  <User size={15} color="var(--color-primary)" />
                  Full Name
                </label>
                <div className="input-with-icon-wrap">
                  <input
                    type="text"
                    placeholder="e.g. Eleanor Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="booking-form-input"
                  />
                </div>
              </div>

              <div className="guest-two-col-grid">
                <div>
                  <label className="booking-label">
                    <Mail size={15} color="var(--color-primary)" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                    className="booking-form-input"
                  />
                </div>
                <div>
                  <label className="booking-label">
                    <Phone size={15} color="var(--color-primary)" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    required
                    className="booking-form-input"
                  />
                </div>
              </div>

              {/* Special Occasion Chips */}
              <div>
                <label className="booking-label">
                  <Heart size={15} color="var(--color-primary)" />
                  Special Occasion (Optional)
                </label>
                <div className="occasions-chips-wrap">
                  {occasionsList.map(occ => {
                    const isSelected = selectedOccasions.includes(occ.label);
                    const IconComponent = occ.icon;
                    return (
                      <button
                        type="button"
                        key={occ.label}
                        onClick={() => toggleOccasion(occ.label)}
                        className={`occasion-pill-btn ${isSelected ? 'active' : ''}`}
                      >
                        <IconComponent size={14} color={isSelected ? 'white' : occ.color} />
                        <span>{occ.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="booking-label">
                  <UtensilsCrossed size={15} color="var(--color-primary)" />
                  Dietary Requirements & Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Vegetarian/Vegan menu preferred, quiet table near window, high chair needed..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="booking-form-textarea"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary booking-submit-btn">
              <Sparkles size={18} /> Confirm & Reserve Table
            </button>
          </div>
        </form>

        {/* Right Column: Live Digital Boarding Pass Preview & Policies */}
        <div className="lg:sticky lg:top-24 space-y-6 min-w-0">
          
          {/* Live Interactive Digital Pass */}
          <div className="booking-pass-card">
            <div className="pass-hero-img-wrap">
              <img src={getSelectedZoneData().image} alt="Zone" className="pass-hero-img" />
              <div className="pass-hero-overlay" />
              <div className="pass-live-chip">
                <span className="pass-pulse-dot" /> Live Preview
              </div>
              <div className="pass-hero-text">
                <div className="pass-res-label">GourmetPulse Reservation</div>
                <div className="pass-zone-title">{selectedZone}</div>
              </div>
            </div>

            <div className="pass-body">
              <div className="pass-details-grid">
                <div className="pass-item">
                  <div className="pass-item-label">Date</div>
                  <div className="pass-item-val">{selectedDate || 'Today'}</div>
                </div>
                <div className="pass-item">
                  <div className="pass-item-label">Time</div>
                  <div className="pass-item-val">{selectedTime}</div>
                </div>
                <div className="pass-item">
                  <div className="pass-item-label">Party Size</div>
                  <div className="pass-item-val">{guestCount} Guests</div>
                </div>
                <div className="pass-item">
                  <div className="pass-item-label">Primary Guest</div>
                  <div className="pass-item-val pass-guest-truncate">
                    {guestName || 'Pending Name...'}
                  </div>
                </div>
              </div>

              <div className="pass-qr-box">
                <QrCode size={48} color="#0f172a" style={{ opacity: 0.65 }} />
                <div className="pass-qr-text">
                  <strong>Digital Pass Generated Instantly</strong>
                  <span>Scan upon arrival at Host Stand</span>
                </div>
              </div>

              <div className="pass-fee-badge">
                <ShieldCheck size={16} color="#10b981" />
                <span>₹0 Booking Fee • Free Cancellation</span>
              </div>
            </div>
          </div>

          {/* Dining Guarantee Card */}
          <div className="booking-guarantee-card">
            <h3 className="guarantee-title">
              <ShieldCheck size={18} color="var(--color-primary)" />
              Dining Policy & Guarantee
            </h3>
            <div className="guarantee-list">
              <div className="guarantee-item">
                <CheckCircle2 size={16} color="var(--color-success)" className="guarantee-icon" /> 
                <span><strong>15-Minute Grace Period</strong> for arrival before table is released.</span>
              </div>
              <div className="guarantee-item">
                <CheckCircle2 size={16} color="var(--color-success)" className="guarantee-icon" /> 
                <span><strong>Free Cancellation</strong> up to 2 hours prior with one tap.</span>
              </div>
              <div className="guarantee-item">
                <CheckCircle2 size={16} color="var(--color-success)" className="guarantee-icon" /> 
                <span><strong>Instant SMS & Email</strong> confirmation pass with live host syncing.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedReservation && (
        <div
          className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/65 backdrop-blur-sm overflow-hidden"
          onClick={() => setConfirmedReservation(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white w-full max-w-full sm:max-w-lg max-h-[92dvh] sm:max-h-[88dvh] rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-[modalPop_0.25s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirm-modal-header shrink-0">
              <div className="confirm-sparkle-bg"><Sparkles size={120} /></div>
              <div className="confirm-check-circle">
                <CheckCircle2 size={36} color="#10b981" />
              </div>
              <h2 className="confirm-title">Reservation Confirmed!</h2>
              <p className="confirm-subtitle">
                We're delighted to host you, {confirmedReservation.name.split(' ')[0]}.
              </p>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="confirm-qr-wrap">
                <QrCode size={140} color="#0f172a" />
                <div className="confirm-ticket-id">
                  PASS CODE: <strong>{confirmedReservation.id}</strong>
                </div>
              </div>

              <div className="confirm-summary-box">
                <div className="confirm-summary-row border-b">
                  <span className="summary-lbl">Booking Reference</span>
                  <span className="summary-val highlight">{confirmedReservation.id}</span>
                </div>
                <div className="confirm-summary-row">
                  <span className="summary-lbl">Date & Time</span>
                  <span className="summary-val">{confirmedReservation.date} • {confirmedReservation.time}</span>
                </div>
                <div className="confirm-summary-row">
                  <span className="summary-lbl">Party & Atmosphere</span>
                  <span className="summary-val">{confirmedReservation.guests} Guests • {confirmedReservation.zone}</span>
                </div>
                {confirmedReservation.specialRequest && confirmedReservation.specialRequest !== 'None' && (
                  <div className="confirm-summary-row">
                    <span className="summary-lbl">Occasion / Notes</span>
                    <span className="summary-val">{confirmedReservation.specialRequest}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 pb-[calc(0.85rem+env(safe-area-inset-bottom,0px))] sm:pb-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-end gap-2.5 sm:gap-3 shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
              <button
                className="btn-primary w-full sm:flex-1 justify-center py-3 text-sm cursor-pointer"
                onClick={() => {
                  setConfirmedReservation(null);
                  setCurrentView('menu');
                }}
              >
                <UtensilsCrossed size={18} /> Pre-Order Food from Menu
              </button>
              <button
                className="btn-secondary w-full sm:w-auto justify-center py-3 text-sm cursor-pointer text-slate-700"
                onClick={() => {
                  setConfirmedReservation(null);
                  setCurrentView('home');
                }}
              >
                Return to Restaurant Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
