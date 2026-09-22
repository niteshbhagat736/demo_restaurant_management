import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Star, Clock, ShieldCheck } from 'lucide-react';

export const StaffRoster = () => {
  const { staff, updateStaffStatus } = useApp();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'white' }}>Kitchen & Service Staff Shift Roster</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Manage active chefs, floor waitstaff, and shift statuses</p>
        </div>

        <button style={{ padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-md)', background: '#3b82f6', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
          + Add New Staff Member
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {staff.map(member => (
          <div key={member.id} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', gap: '1rem' }}>
            <img src={member.avatar} alt={member.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #60a5fa' }} />
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'white' }}>{member.name}</h3>
                  <div style={{ fontSize: '0.82rem', color: '#60a5fa', fontWeight: 600 }}>{member.role}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.85rem', color: '#f59e0b', fontWeight: 800 }}>
                  <Star size={14} fill="#f59e0b" /> {member.rating}
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0.5rem 0' }}>
                Department: {member.department}
                {member.assignedTables && <div>Assigned: {member.assignedTables.join(', ')}</div>}
              </div>

              {/* Shift status selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Status:</span>
                {['On Shift', 'On Break', 'Off Shift'].map(st => (
                  <button
                    key={st}
                    onClick={() => updateStaffStatus(member.id, st)}
                    style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: member.status === st ? (st === 'On Shift' ? '#10b981' : st === 'On Break' ? '#f59e0b' : '#64748b') : '#0f172a',
                      color: member.status === st ? 'white' : '#94a3b8'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
