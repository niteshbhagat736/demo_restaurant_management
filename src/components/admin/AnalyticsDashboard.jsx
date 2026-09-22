import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp, DollarSign, Utensils, Users, Zap,
  ShoppingBag, Clock, Star, ChefHat, BarChart3,
  PieChart, Activity, QrCode, MapPin, CheckCircle2,
  AlertCircle, Loader, Package
} from 'lucide-react';

/* ── Rupee formatter ─────────────────────────────────────── */
const INR = (v) => `₹${Number(v).toFixed(2)}`;

/* ── Mock hourly/weekly data ─────────────────────────────── */
const hourlyData = [
  { hour: '9AM',  today: 9200,  yesterday: 7500  },
  { hour: '10AM', today: 16000, yesterday: 13500 },
  { hour: '11AM', today: 29500, yesterday: 24000 },
  { hour: '12PM', today: 68000, yesterday: 55500 },
  { hour: '1PM',  today: 95000, yesterday: 75500 },
  { hour: '2PM',  today: 58500, yesterday: 49000 },
  { hour: '3PM',  today: 32000, yesterday: 27000 },
  { hour: '4PM',  today: 22500, yesterday: 18500 },
  { hour: '5PM',  today: 42000, yesterday: 37000 },
  { hour: '6PM',  today: 75500, yesterday: 62500 },
  { hour: '7PM',  today: 114000, yesterday: 96000 },
  { hour: '8PM',  today: 124500, yesterday: 106000 },
  { hour: '9PM',  today: 84500, yesterday: 73000 },
  { hour: '10PM', today: 52000, yesterday: 45000 },
];

const weekData = [
  { day: 'Mon', sales: 320000 },
  { day: 'Tue', sales: 445000 },
  { day: 'Wed', sales: 398000 },
  { day: 'Thu', sales: 515000 },
  { day: 'Fri', sales: 682000 },
  { day: 'Sat', sales: 860000 },
  { day: 'Sun', sales: 752000 },
];

const categoryData = [
  { label: 'Mains',     value: 38, color: '#f59e0b' },
  { label: 'Starters',  value: 22, color: '#3b82f6' },
  { label: 'Desserts',  value: 16, color: '#ec4899' },
  { label: 'Beverages', value: 14, color: '#10b981' },
  { label: 'Sides',     value: 10, color: '#8b5cf6' },
];

/* ── Status helpers ──────────────────────────────────────── */
const STATUS_META = {
  'New':       { color: '#ef4444', bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.4)',   icon: AlertCircle, label: 'New Order' },
  'Preparing': { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.4)',  icon: Loader,      label: 'In Kitchen' },
  'Ready':     { color: '#10b981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.4)',  icon: Package,     label: 'Ready to Serve' },
  'Completed': { color: '#3b82f6', bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.4)',  icon: CheckCircle2, label: 'Completed' },
};

/* ── SVG Line Chart ──────────────────────────────────────── */
const LineChart = ({ data }) => {
  const [tip, setTip] = useState(null);
  const W = 760, H = 185, pad = { t: 16, r: 12, b: 36, l: 60 };
  const iW = W - pad.l - pad.r, iH = H - pad.t - pad.b;
  const max = Math.max(...data.flatMap(d => [d.today, d.yesterday])) * 1.1;
  const x = i => (i / (data.length - 1)) * iW;
  const y = v => iH - (v / max) * iH;
  const line = key => data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(' ');
  const area = key => `${line(key)} L${x(data.length - 1)},${iH} L0,${iH} Z`;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g transform={`translate(${pad.l},${pad.t})`}>
          {[0,.25,.5,.75,1].map((t, i) => (
            <g key={i}>
              <line x1={0} y1={iH * t} x2={iW} y2={iH * t} stroke="#1e293b" strokeWidth="1" />
              <text x="-8" y={iH * t + 4} textAnchor="end" fontSize="10" fill="#475569">
                ₹{((max * (1 - t)) / 1000).toFixed(0)}k
              </text>
            </g>
          ))}
          <path d={area('yesterday')} fill="url(#lg2)" />
          <path d={area('today')} fill="url(#lg1)" />
          <path d={line('yesterday')} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 3" />
          <path d={line('today')} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          {data.map((d, i) => (
            <circle key={i} cx={x(i)} cy={y(d.today)} r="4" fill="#f59e0b" stroke="#0a1120" strokeWidth="2" style={{ cursor: 'pointer' }}
              onMouseEnter={() => setTip({ i, d, xPos: x(i), yPos: y(d.today) })}
              onMouseLeave={() => setTip(null)}
            />
          ))}
          {data.map((d, i) => (i % 2 === 0) && (
            <text key={i} x={x(i)} y={iH + 20} textAnchor="middle" fontSize="10" fill="#475569">{d.hour}</text>
          ))}
          {tip && (
            <g>
              <line x1={tip.xPos} y1={0} x2={tip.xPos} y2={iH} stroke="#334155" strokeWidth="1" strokeDasharray="3 2" />
              <rect x={tip.xPos - 58} y={tip.yPos - 50} width="116" height="46" rx="6" fill="#1e293b" stroke="#334155" />
              <text x={tip.xPos} y={tip.yPos - 32} textAnchor="middle" fontSize="11" fill="#f59e0b" fontWeight="700">
                Today: ₹{(tip.d.today / 1000).toFixed(1)}k
              </text>
              <text x={tip.xPos} y={tip.yPos - 14} textAnchor="middle" fontSize="10" fill="#3b82f6">
                Yesterday: ₹{(tip.d.yesterday / 1000).toFixed(1)}k
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

/* ── SVG Bar Chart ───────────────────────────────────────── */
const BarChart = ({ data }) => {
  const W = 560, H = 160, pad = { t: 16, r: 12, b: 32, l: 52 };
  const iW = W - pad.l - pad.r, iH = H - pad.t - pad.b;
  const max = Math.max(...data.map(d => d.sales)) * 1.1;
  const bW = (iW / data.length) * 0.52, gap = iW / data.length;
  const dayMap = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = dayMap[new Date().getDay()];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g transform={`translate(${pad.l},${pad.t})`}>
        {[0,.5,1].map((t, i) => (
          <g key={i}>
            <line x1={0} y1={iH * t} x2={iW} y2={iH * t} stroke="#1e293b" strokeWidth="1" />
            <text x="-6" y={iH * t + 4} textAnchor="end" fontSize="10" fill="#475569">
              ₹{((max * (1 - t)) / 1000).toFixed(0)}k
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const bH = (d.sales / max) * iH;
          const bX = i * gap + (gap - bW) / 2;
          const isTd = d.day === today;
          return (
            <g key={d.day}>
              <rect x={bX} y={iH - bH} width={bW} height={bH} rx="4" fill={isTd ? 'url(#bg1)' : 'url(#bg2)'} />
              {isTd && (
                <text x={bX + bW / 2} y={iH - bH - 6} textAnchor="middle" fontSize="9" fill="#f59e0b" fontWeight="700">
                  ₹{(d.sales / 1000).toFixed(0)}k
                </text>
              )}
              <text x={bX + bW / 2} y={iH + 18} textAnchor="middle" fontSize="10"
                fill={isTd ? '#f59e0b' : '#475569'} fontWeight={isTd ? '700' : '400'}>
                {d.day}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

/* ── Donut Chart ─────────────────────────────────────────── */
const DonutChart = ({ data }) => {
  const R = 70, r = 44, cx = 90, cy = 90;
  let cum = -Math.PI / 2;
  const slices = data.map(d => {
    const a = (d.value / 100) * 2 * Math.PI;
    const x1 = cx + R * Math.cos(cum), y1 = cy + R * Math.sin(cum);
    cum += a;
    const x2 = cx + R * Math.cos(cum), y2 = cy + R * Math.sin(cum);
    const xi1 = cx + r * Math.cos(cum - a), yi1 = cy + r * Math.sin(cum - a);
    const xi2 = cx + r * Math.cos(cum), yi2 = cy + r * Math.sin(cum);
    const lg = a > Math.PI ? 1 : 0;
    return { ...d, path: `M${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R},0,${lg},1,${x2.toFixed(2)},${y2.toFixed(2)} L${xi2.toFixed(2)},${yi2.toFixed(2)} A${r},${r},0,${lg},0,${xi1.toFixed(2)},${yi1.toFixed(2)} Z` };
  });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
      <svg width="180" height="180" viewBox="0 0 180 180" style={{ flexShrink: 0 }}>
        {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} opacity="0.9" />)}
        <circle cx={cx} cy={cy} r={r - 5} fill="#0f172a" />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="#94a3b8">Sales</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="19" fill="white" fontWeight="800">Mix</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
        {data.map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: d.color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1', flex: 1 }}>{d.label}</span>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'white' }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── KPI Card ────────────────────────────────────────────── */
const KPICard = ({ icon: Icon, iconColor, iconBg, label, value, sub, subColor, badge }) => (
  <div style={{
    background: '#111827', border: '1px solid #1e293b',
    borderRadius: '14px', padding: '1.25rem 1.4rem',
    display: 'flex', flexDirection: 'column', gap: '0.4rem',
    position: 'relative', overflow: 'hidden'
  }}>
    <div style={{ position: 'absolute', top: 0, right: 0, width: '70px', height: '70px', background: `radial-gradient(circle, ${iconBg} 0%, transparent 70%)`, borderRadius: '0 14px 0 70px', opacity: 0.5 }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ background: iconBg, padding: '0.55rem', borderRadius: '10px', display: 'flex' }}>
        <Icon size={18} color={iconColor} />
      </div>
      {badge && (
        <span style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '9999px', border: '1px solid rgba(16,185,129,0.3)' }}>
          {badge}
        </span>
      )}
    </div>
    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginTop: '0.4rem' }}>{label}</div>
    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', lineHeight: 1, fontFamily: 'var(--font-heading)' }}>{value}</div>
    {sub && <div style={{ fontSize: '0.76rem', color: subColor || '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>{sub}</div>}
  </div>
);

/* ── Section Header ──────────────────────────────────────── */
const SH = ({ icon, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem' }}>
    {icon} {label}
  </div>
);

/* ── Main Dashboard ──────────────────────────────────────── */
export const AnalyticsDashboard = () => {
  const { orders, tables, reservations } = useApp();
  const [chart, setChart] = useState('hourly');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const liveRevenue = orders.reduce((a, o) => a + o.totalAmount, 0) * 76.5 + 820950;
  const totalOrders = orders.length + 94;
  const avgOrder    = liveRevenue / Math.max(1, totalOrders);
  const occupiedTables = tables.filter(t => t.status === 'Occupied').length;
  const occupancy   = Math.round((occupiedTables / tables.length) * 100);

  /* All dine-in orders (real + mock extras) */
  const tableOrders = [
    ...orders.filter(o => o.type === 'Dine-In'),
    {
      id: 'ORD-104', tableNo: 'Table 03', customerName: 'Ravi Sharma',
      type: 'Dine-In', qrScanned: true,
      items: [
        { name: 'Charred Tomahawk Ribeye Steak', quantity: 1, price: 3696 },
        { name: 'Artisanal Wood-Fired Margherita', quantity: 2, price: 1463.23 },
      ],
      totalAmount: 5159.23, status: 'Preparing',
      createdAt: '12:15 PM', paymentStatus: 'Pending', chefAssigned: 'Chef Antoine Laurent'
    },
    {
      id: 'ORD-105', tableNo: 'Table 07', customerName: 'Priya Iyer',
      type: 'Dine-In', qrScanned: true,
      items: [
        { name: 'Truffle & Wild Mushroom Tagliatelle', quantity: 2, price: 1922.35 },
        { name: 'Smoked Hibiscus Fizz', quantity: 2, price: 766.23 },
      ],
      totalAmount: 2688.58, status: 'Ready',
      createdAt: '12:44 PM', paymentStatus: 'Paid (UPI QR)', chefAssigned: 'Chef Maria Santos'
    },
    {
      id: 'ORD-106', tableNo: 'Table 11', customerName: 'Arjun Mehta',
      type: 'Dine-In', qrScanned: true,
      items: [
        { name: 'Prime Wagyu Gourmet Burger', quantity: 3, price: 5197.5 },
      ],
      totalAmount: 5197.5, status: 'Completed',
      createdAt: '11:30 AM', paymentStatus: 'Paid (Card)', chefAssigned: 'Chef Antoine Laurent'
    },
  ];

  const topDishes = [
    { name: 'Truffle & Wild Mushroom Tagliatelle', pct: 32, rev: 28836.45, color: '#f59e0b', sold: 28 },
    { name: 'Charred Tomahawk Ribeye Steak',       pct: 28, rev: 25832.40, color: '#ef4444', sold: 21 },
    { name: 'Prime Wagyu Gourmet Burger',           pct: 22, rev: 20745.00, color: '#3b82f6', sold: 34 },
    { name: 'Artisanal Wood-Fired Margherita',      pct: 18, rev: 16083.45, color: '#10b981', sold: 19 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Page Heading */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'white', fontWeight: 800 }}>Analytics & Revenue</h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Real-time performance — {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['hourly', 'weekly'].map(t => (
            <button key={t} onClick={() => setChart(t)} style={{
              padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700,
              border: '1px solid', cursor: 'pointer',
              borderColor: chart === t ? '#f59e0b' : '#334155',
              background: chart === t ? 'rgba(245,158,11,0.15)' : 'transparent',
              color: chart === t ? '#f59e0b' : '#64748b',
            }}>{t.charAt(0).toUpperCase() + t.slice(1)} View</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: '1rem' }}>
        <KPICard icon={DollarSign} iconColor="#f59e0b" iconBg="rgba(245,158,11,0.15)"
          label="Today's Gross Revenue" value={`₹${(liveRevenue / 1000).toFixed(1)}k`}
          sub={<><TrendingUp size={12} /> +18.4% vs yesterday</>} subColor="#6ee7b7" badge="Live" />
        <KPICard icon={ShoppingBag} iconColor="#3b82f6" iconBg="rgba(59,130,246,0.15)"
          label="Orders Completed" value={totalOrders}
          sub={`Avg: ₹${(avgOrder).toFixed(0)} per order`} subColor="#93c5fd" />
        <KPICard icon={Users} iconColor="#10b981" iconBg="rgba(16,185,129,0.15)"
          label="Table Occupancy" value={`${occupancy}%`}
          sub={`${occupiedTables}/${tables.length} tables active`} subColor="#6ee7b7" />
        <KPICard icon={Clock} iconColor="#ec4899" iconBg="rgba(236,72,153,0.15)"
          label="Avg Service Time" value="18 min"
          sub="↓ 3 min faster vs last week" subColor="#f9a8d4" />
        <KPICard icon={Star} iconColor="#a78bfa" iconBg="rgba(167,139,250,0.15)"
          label="Guest Rating" value="4.9 / 5"
          sub="From 312 reviews today" subColor="#c4b5fd" />
        <KPICard icon={Zap} iconColor="#fb923c" iconBg="rgba(251,146,60,0.15)"
          label="Kitchen Accuracy" value="99.4%"
          sub="Instant KDS ticket sync" subColor="#fdba74" />
      </div>

      {/* Sales Chart */}
      <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <SH icon={<Activity size={18} color="#f59e0b" />}
            label={chart === 'hourly' ? "Today's Hourly Revenue (₹)" : "This Week's Daily Revenue (₹)"} />
          <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b' }}>
              <div style={{ width: '20px', height: '3px', background: '#f59e0b', borderRadius: '2px' }} /> Today
            </div>
            {chart === 'hourly' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3b82f6' }}>
                <div style={{ width: '20px', height: '2px', background: '#3b82f6', borderRadius: '2px' }} /> Yesterday
              </div>
            )}
          </div>
        </div>
        {chart === 'hourly' ? <LineChart data={hourlyData} /> : <BarChart data={weekData} />}
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Peak Hour', val: '8 PM', color: '#f59e0b' },
            { label: 'Peak Revenue', val: '₹1.24L', color: '#f59e0b' },
            { label: 'Avg Hourly', val: '₹60k', color: '#94a3b8' },
            { label: 'vs Yesterday', val: '+18.4%', color: '#6ee7b7' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TABLE ORDERS SECTION ──────────────────────────── */}
      <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <SH icon={<MapPin size={18} color="#f59e0b" />} label="Live Table Orders" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#94a3b8' }}>
            <QrCode size={15} color="#a78bfa" />
            <span>QR scan = instant table booking • reservation = pre-arrival</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {tableOrders.map(order => {
            const sm = STATUS_META[order.status] || STATUS_META['New'];
            const StatusIcon = sm.icon;
            return (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                style={{
                  background: '#0f172a', border: `1.5px solid ${sm.border}`,
                  borderRadius: '12px', padding: '1.1rem 1.25rem',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  boxShadow: selectedOrder?.id === order.id ? `0 0 0 2px ${sm.color}` : 'none'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 18px ${sm.color}22`; }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = selectedOrder?.id === order.id ? `0 0 0 2px ${sm.color}` : 'none';
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      background: 'linear-gradient(135deg,#f59e0b,#ef4444)',
                      borderRadius: '8px', padding: '0.4rem 0.7rem',
                      fontSize: '0.85rem', fontWeight: 800, color: 'white', whiteSpace: 'nowrap'
                    }}>
                      {order.tableNo}
                    </div>
                    {order.qrScanned && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.35)', borderRadius: '6px', padding: '0.2rem 0.5rem', fontSize: '0.7rem', fontWeight: 700, color: '#c4b5fd' }}>
                        <QrCode size={10} /> QR Scan
                      </div>
                    )}
                  </div>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '0.25rem',
                    background: sm.bg, border: `1px solid ${sm.border}`,
                    color: sm.color, fontSize: '0.72rem', fontWeight: 700,
                    padding: '0.2rem 0.55rem', borderRadius: '9999px'
                  }}>
                    <StatusIcon size={10} /> {sm.label}
                  </span>
                </div>

                {/* Customer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.7rem' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: `${sm.color}20`, border: `1.5px solid ${sm.color}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 800, color: sm.color
                  }}>
                    {order.customerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{order.customerName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={10} /> {order.createdAt}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.75rem' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem' }}>
                      <span style={{ color: '#cbd5e1' }}>
                        <span style={{ color: '#f59e0b', fontWeight: 700 }}>×{item.quantity}</span> {item.name}
                        {item.notes && <span style={{ color: '#64748b', fontSize: '0.72rem' }}> · {item.notes}</span>}
                      </span>
                      <span style={{ color: '#94a3b8', fontWeight: 600 }}>₹{(item.price * (item.priceIsTotal ? 1 : item.quantity)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1e293b', paddingTop: '0.65rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Total</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#f59e0b', fontFamily: 'var(--font-heading)' }}>
                      ₹{order.totalAmount.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Payment</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: order.paymentStatus === 'Pending' ? '#f59e0b' : '#6ee7b7' }}>
                      {order.paymentStatus}
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {selectedOrder?.id === order.id && (
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed #334155' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: '0.35rem' }}>Chef Assigned</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.83rem', color: '#e2e8f0', fontWeight: 600 }}>
                      <ChefHat size={14} color="#f59e0b" /> {order.chefAssigned}
                    </div>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#475569' }}>
                      Order ID: <span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{order.id}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* QR legend */}
        <div style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', background: '#0f172a', borderRadius: '10px', border: '1px solid #1e293b', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            <QrCode size={14} color="#a78bfa" />
            <span><strong style={{ color: '#c4b5fd' }}>QR Scan at Table</strong> — Guest scans table QR → books & orders during their presence</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            <MapPin size={14} color="#3b82f6" />
            <span><strong style={{ color: '#93c5fd' }}>Pre-Arrival Reservation</strong> — Guest reserves a specific table zone before arriving</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Dishes + Category Donut */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>

        {/* Top Dishes */}
        <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
          <SH icon={<ChefHat size={18} color="#f59e0b" />} label="Top Revenue Dishes" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {topDishes.map((dish, i) => (
              <div key={dish.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: dish.color, background: `${dish.color}20`, padding: '0.1rem 0.38rem', borderRadius: '4px' }}>#{i+1}</span>
                    <span style={{ fontSize: '0.87rem', color: '#e2e8f0', fontWeight: 600 }}>{dish.name}</span>
                  </div>
                  <span style={{ fontSize: '0.87rem', fontWeight: 800, color: dish.color, flexShrink: 0 }}>₹{dish.rev.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ flex: 1, height: '7px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${dish.pct}%`, height: '100%', background: dish.color, borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', minWidth: '55px', fontWeight: 600 }}>{dish.pct}% · {dish.sold} sold</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Mix */}
        <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
          <SH icon={<PieChart size={18} color="#f59e0b" />} label="Sales by Category" />
          <DonutChart data={categoryData} />
          <div style={{ marginTop: '1.25rem', padding: '0.8rem', background: '#0f172a', borderRadius: '10px', border: '1px solid #1e293b' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: '0.3rem' }}>Best Category</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '2px' }} />
              <span style={{ color: '#f59e0b', fontWeight: 800 }}>Mains</span>
              <span style={{ color: '#94a3b8', fontSize: '0.83rem' }}>— 38% of total revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Performance */}
      <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
        <SH icon={<Users size={18} color="#f59e0b" />} label="Shift Performance" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '0.85rem' }}>
          {[
            { name: 'Marco Romano',   role: 'Head Chef',     orders: 48, rating: 4.9, color: '#f59e0b' },
            { name: 'Priya Sharma',   role: 'Sous Chef',     orders: 42, rating: 4.8, color: '#3b82f6' },
            { name: 'James Wei',      role: 'Floor Manager', orders: 67, rating: 4.7, color: '#10b981' },
            { name: 'Sofia Martinez', role: 'Head Server',   orders: 55, rating: 4.9, color: '#ec4899' },
          ].map(s => (
            <div key={s.name} style={{ background: '#0f172a', borderRadius: '10px', padding: '1rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.6rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${s.color}20`, border: `2px solid ${s.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: s.color }}>
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: '0.83rem', fontWeight: 700, color: 'white' }}>{s.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{s.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <div>
                  <div style={{ color: '#64748b' }}>Orders</div>
                  <div style={{ fontWeight: 800, color: 'white' }}>{s.orders}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#64748b' }}>Rating</div>
                  <div style={{ fontWeight: 800, color: s.color, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Star size={11} fill={s.color} color={s.color} /> {s.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
