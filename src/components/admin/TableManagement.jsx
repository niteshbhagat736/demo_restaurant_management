import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutGrid, User, CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';

export const TableManagement = () => {
  const { tables, updateTableStatus } = useApp();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'status-available';
      case 'Occupied': return 'status-occupied';
      case 'Reserved': return 'status-reserved';
      default: return '';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'white' }}>Live Restaurant Floor Layout & Table Map</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Real-time seating statuses across Main Dining, Patio, and VIP areas</p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', background: '#1e293b', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #334155', fontSize: '0.85rem' }}>
          <span style={{ color: '#6ee7b7', fontWeight: 700 }}>Available</span>
          <span style={{ color: '#fca5a5', fontWeight: 700 }}>Occupied</span>
          <span style={{ color: '#fde047', fontWeight: 700 }}>Reserved</span>
        </div>
      </div>

      <div className="tables-grid">
        {tables.map(table => (
          <div key={table.id} className={`table-node ${getStatusColor(table.status)}`}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
              {table.section}
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'white', margin: '0.2rem 0' }}>{table.name}</h3>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
              Capacity: {table.capacity} Guests
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  background: table.status === 'Available' ? 'rgba(16,185,129,0.2)' : table.status === 'Occupied' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                  color: table.status === 'Available' ? '#6ee7b7' : table.status === 'Occupied' ? '#fca5a5' : '#fde047'
                }}
              >
                {table.status}
              </span>
            </div>

            {table.reservedBy && (
              <div style={{ fontSize: '0.78rem', color: '#fde047', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                <Calendar size={12} /> {table.reservedBy}
              </div>
            )}

            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Assigned Waiter: <strong style={{ color: 'white' }}>{table.waiter}</strong>
            </div>

            {/* Quick Status Toggle buttons */}
            <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center' }}>
              <button
                onClick={() => updateTableStatus(table.id, 'Available')}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderRadius: '4px', border: 'none', background: '#059669', color: 'white', fontWeight: 700, cursor: 'pointer' }}
              >
                Available
              </button>
              <button
                onClick={() => updateTableStatus(table.id, 'Occupied')}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderRadius: '4px', border: 'none', background: '#dc2626', color: 'white', fontWeight: 700, cursor: 'pointer' }}
              >
                Seat Guest
              </button>
              <button
                onClick={() => updateTableStatus(table.id, 'Reserved')}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderRadius: '4px', border: 'none', background: '#d97706', color: 'white', fontWeight: 700, cursor: 'pointer' }}
              >
                Reserve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
