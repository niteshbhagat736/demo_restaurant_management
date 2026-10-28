import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LenisProvider } from './components/LenisProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/customer/LandingPage';
import { DigitalMenu } from './components/customer/DigitalMenu';
import { TableBooking } from './components/customer/TableBooking';
import { OrderTracker } from './components/customer/OrderTracker';
import { CartDrawer } from './components/customer/CartDrawer';
import { PaymentModal } from './components/customer/PaymentModal';

import { AdminLayout } from './components/admin/AdminLayout';
import { POSDashboard } from './components/admin/POSDashboard';
import { ChefKDS } from './components/admin/ChefKDS';
import { TableManagement } from './components/admin/TableManagement';
import { StaffRoster } from './components/admin/StaffRoster';
import { MenuAdmin } from './components/admin/MenuAdmin';
import { AnalyticsDashboard } from './components/admin/AnalyticsDashboard';

import { CheckCircle } from 'lucide-react';

// Valid customer views and admin tabs for URL param validation
const VALID_VIEWS = new Set(['home', 'menu', 'reservation', 'order-tracker', 'admin']);
const VALID_ADMIN_TABS = new Set(['pos', 'kds', 'tables', 'staff', 'menu-management', 'analytics']);

const MainAppContent = () => {
  const { currentView, setCurrentView, adminTab, setAdminTab, notification } = useApp();
  const isAdmin = currentView === 'admin';

  // ── Task 4: Sync view & adminTab to/from URL query params ──────────────
  // On mount: read params → set state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    const tab  = params.get('tab');

    if (view && VALID_VIEWS.has(view)) {
      setCurrentView(view);
    }
    if (tab && VALID_ADMIN_TABS.has(tab)) {
      setAdminTab(tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount only

  // On state change: push params to URL (without navigation/page reload)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('view', currentView);
    if (currentView === 'admin') {
      params.set('tab', adminTab);
    } else {
      params.delete('tab');
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [currentView, adminTab]);

  return (
    <LenisProvider isAdmin={isAdmin}>
      <div className="app-container">
        {/* Header only in customer views */}
        {!isAdmin && <Header />}

        {/* Customer Views */}
        {!isAdmin && (
          <main className={currentView === 'home' ? 'main-content-home' : 'main-content'}>
            {currentView === 'home'          && <LandingPage />}
            {currentView === 'menu'          && <DigitalMenu />}
            {currentView === 'reservation'   && <TableBooking />}
            {currentView === 'order-tracker' && <OrderTracker />}
          </main>
        )}

        {/* Admin — Full Viewport Takeover */}
        {isAdmin && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9000, overflowY: 'auto', background: '#0f172a' }}>
            <AdminLayout>
              {adminTab === 'pos'             && <POSDashboard />}
              {adminTab === 'kds'             && <ChefKDS />}
              {adminTab === 'tables'          && <TableManagement />}
              {adminTab === 'staff'           && <StaffRoster />}
              {adminTab === 'menu-management' && <MenuAdmin />}
              {adminTab === 'analytics'       && <AnalyticsDashboard />}
            </AdminLayout>
          </div>
        )}

        {/* Global Overlays */}
        <CartDrawer />
        <PaymentModal />

        {/* Global Toast Notification */}
        {notification && (
          <div className="toast-container">
            <div className="toast-box">
              <CheckCircle size={20} color="var(--color-primary)" />
              <span>{notification.message}</span>
            </div>
          </div>
        )}

        {!isAdmin && <Footer />}
      </div>
    </LenisProvider>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
