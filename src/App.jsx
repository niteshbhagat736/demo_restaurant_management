import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
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

const MainAppContent = () => {
  const { currentView, adminTab, notification } = useApp();
  const isAdmin = currentView === 'admin';

  return (
    <div className="app-container">
      {/* Header only in customer views */}
      {!isAdmin && <Header />}

      {/* Customer Views */}
      {!isAdmin && (
        <main className="main-content">
          {currentView === 'home' && <LandingPage />}
          {currentView === 'menu' && <DigitalMenu />}
          {currentView === 'reservation' && <TableBooking />}
          {currentView === 'order-tracker' && <OrderTracker />}
        </main>
      )}

      {/* Admin — Full Viewport Takeover */}
      {isAdmin && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9000, overflowY: 'auto', background: '#0f172a' }}>
          <AdminLayout>
            {adminTab === 'pos'              && <POSDashboard />}
            {adminTab === 'kds'              && <ChefKDS />}
            {adminTab === 'tables'           && <TableManagement />}
            {adminTab === 'staff'            && <StaffRoster />}
            {adminTab === 'menu-management'  && <MenuAdmin />}
            {adminTab === 'analytics'        && <AnalyticsDashboard />}
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
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
