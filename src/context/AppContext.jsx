import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_STAFF,
  INITIAL_ORDERS,
  INITIAL_RESERVATIONS
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'menu' | 'reservation' | 'order-tracker' | 'admin'
  const [adminTab, setAdminTab] = useState('pos'); // 'pos' | 'kds' | 'tables' | 'staff' | 'menu-management' | 'analytics'
  
  // Data States
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('gourmet_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('gourmet_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('gourmet_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('gourmet_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem('gourmet_tables');
    return saved ? JSON.parse(saved) : INITIAL_TABLES;
  });

  const [staff, setStaff] = useState(() => {
    const saved = localStorage.getItem('gourmet_staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  // UI Modals & Notifications
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedDishForModal, setSelectedDishForModal] = useState(null);
  const [latestPlacedOrder, setLatestPlacedOrder] = useState(null);
  const [notification, setNotification] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('gourmet_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('gourmet_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gourmet_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gourmet_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('gourmet_tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('gourmet_staff', JSON.stringify(staff));
  }, [staff]);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Cart Functions
  const addToCart = (dish, quantity = 1, options = {}, notes = "") => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...dish, quantity, options, notes }];
      }
    });
    showToast(`Added ${dish.name} to your cart!`);
  };

  const removeFromCart = (dishId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== dishId));
  };

  const updateCartQuantity = (dishId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === dishId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order Placement Function
  const placeOrder = (paymentDetails = {}) => {
    if (cart.length === 0) return null;

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newOrder = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      tableNo: paymentDetails.tableNo || "Digital Order / Takeaway",
      customerName: paymentDetails.customerName || "Guest Customer",
      type: paymentDetails.orderType || "Digital Order",
      items: [...cart],
      totalAmount: +(totalAmount * 1.1).toFixed(2), // including 10% tax/service
      status: "New",
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentStatus: `Paid (${paymentDetails.method || 'Digital'})`,
      chefAssigned: "Chef Antoine Laurent"
    };

    setOrders(prev => [newOrder, ...prev]);
    setLatestPlacedOrder(newOrder);
    clearCart();
    setIsPaymentModalOpen(false);
    setIsCartOpen(false);

    showToast(`Order #${newOrder.id} placed successfully! Transmitted to Kitchen POS.`, 'success');
    return newOrder;
  };

  // Admin Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order ${orderId} status changed to ${newStatus}`);
  };

  const toggleDishAvailability = (dishId) => {
    setMenuItems(prev => prev.map(d => d.id === dishId ? { ...d, isAvailable: !d.isAvailable } : d));
    showToast(`Updated menu stock status`);
  };

  const addDish = (newDish) => {
    const dishWithId = {
      ...newDish,
      id: `dish-${Date.now()}`,
      rating: 5.0,
      isAvailable: true
    };
    setMenuItems(prev => [dishWithId, ...prev]);
    showToast(`Added ${newDish.name} to menu!`);
  };

  const addReservation = (reservationData) => {
    const newRes = {
      ...reservationData,
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      status: "Confirmed"
    };
    setReservations(prev => [newRes, ...prev]);
    showToast(`Table reserved for ${reservationData.name}! Confirmation generated.`);
    return newRes;
  };

  const updateTableStatus = (tableId, newStatus) => {
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status: newStatus } : t));
    showToast(`Table ${tableId} is now ${newStatus}`);
  };

  const updateStaffStatus = (staffId, newStatus) => {
    setStaff(prev => prev.map(s => s.id === staffId ? { ...s, status: newStatus } : s));
    showToast(`Staff shift updated to ${newStatus}`);
  };

  const value = {
    currentView,
    setCurrentView,
    adminTab,
    setAdminTab,
    menuItems,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    selectedDishForModal,
    setSelectedDishForModal,
    orders,
    placeOrder,
    updateOrderStatus,
    latestPlacedOrder,
    reservations,
    addReservation,
    tables,
    updateTableStatus,
    staff,
    updateStaffStatus,
    toggleDishAvailability,
    addDish,
    notification
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
