import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  QrCode,
  Smartphone,
  Banknote,
  CheckCircle,
  Loader2,
  ShieldCheck,
  Receipt,
  ArrowRight,
  X
} from 'lucide-react';

export const PaymentModal = () => {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    cart,
    placeOrder,
    setCurrentView
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'applepay' | 'cash'
  const [customerName, setCustomerName] = useState('Alex Vance');
  const [tableNo, setTableNo] = useState('Table 02');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('742');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderReceipt, setCompletedOrderReceipt] = useState(null);

  if (!isPaymentModalOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalAmount = +(subtotal * 1.1).toFixed(2);

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const order = placeOrder({
        customerName,
        tableNo,
        orderType: 'Dine-In',
        method: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'upi' ? 'UPI QR' : paymentMethod === 'applepay' ? 'Apple Pay' : 'Cash at Table'
      });
      setCompletedOrderReceipt(order);
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={() => !isProcessing && setIsPaymentModalOpen(false)}>
      <div className="modal-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Receipt View after successful simulated payment */}
        {completedOrderReceipt ? (
          <div>
            <div style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', padding: '2rem', textAlign: 'center' }}>
              <CheckCircle size={56} style={{ margin: '0 auto 0.75rem' }} />
              <h2 style={{ fontSize: '1.75rem' }}>Payment Successful!</h2>
              <p style={{ opacity: 0.9, fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Order #{completedOrderReceipt.id} Transmitted to Kitchen
              </p>
            </div>

            <div className="modal-body" style={{ background: '#faf9f6' }}>
              <div style={{ background: 'white', border: '1px dashed var(--border-light)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem', marginBottom: '0.75rem', fontWeight: 700, fontSize: '0.9rem' }}>
                  <span>RECEIPT DETAILS</span>
                  <span style={{ color: 'var(--color-primary-hover)' }}>{completedOrderReceipt.paymentStatus}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  <span>Customer:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{completedOrderReceipt.customerName}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  <span>Table / Order Type:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{completedOrderReceipt.tableNo}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Time Placed:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{completedOrderReceipt.createdAt}</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {completedOrderReceipt.items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span>{item.quantity}x {item.name}</span>
                      <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                    <span>Total Amount Paid</span>
                    <span>${completedOrderReceipt.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.85rem', borderRadius: 'var(--radius-sm)', color: '#065f46', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Receipt size={20} />
                <span>You can track your order status live in the Order Tracker tab.</span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setCompletedOrderReceipt(null);
                  setIsPaymentModalOpen(false);
                  setCurrentView('order-tracker');
                }}
              >
                Track Live Order Status <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Normal Payment Method Form */
          <div>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck size={22} color="var(--color-success)" />
                <h3 style={{ fontSize: '1.25rem' }}>Simulated Integrated Checkout</h3>
              </div>
              <button className="icon-close-btn" onClick={() => setIsPaymentModalOpen(false)}><X size={18} /></button>
            </div>

            <div className="modal-body">
              {/* Total Display Banner */}
              <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total Payable Amount</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b' }}>${totalAmount.toFixed(2)}</div>
                </div>
                <div style={{ fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>
                  Pitch Demo Gateway
                </div>
              </div>

              {/* Customer Info Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none', fontWeight: 600 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>Table Number</label>
                  <input
                    type="text"
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', outline: 'none', fontWeight: 600 }}
                  />
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Select Payment Gateway</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {[
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI / QR', icon: QrCode },
                    { id: 'applepay', label: 'Pay', icon: Smartphone },
                    { id: 'cash', label: 'Cash', icon: Banknote }
                  ].map(method => {
                    const IconComp = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        style={{
                          padding: '0.6rem 0.2rem',
                          borderRadius: 'var(--radius-md)',
                          border: paymentMethod === method.id ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                          background: paymentMethod === method.id ? '#fffbeb' : 'white',
                          color: paymentMethod === method.id ? '#92400e' : 'var(--text-muted)',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <IconComp size={18} />
                        {method.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content 1: Card */}
              {paymentMethod === 'card' && (
                <div style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid var(--border-light)', outline: 'none', fontWeight: 600 }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid var(--border-light)', outline: 'none', fontWeight: 600 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>CVC / CVV</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid var(--border-light)', outline: 'none', fontWeight: 600 }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content 2: UPI QR */}
              {paymentMethod === 'upi' && (
                <div style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '0.75rem' }}>
                    <QrCode size={120} color="#0f172a" />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Scan QR with Google Pay, PhonePe or Paytm</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    UPI ID: <code style={{ background: '#e2e8f0', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>gourmetpulse@merchant</code>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Apple / Google Pay */}
              {paymentMethod === 'applepay' && (
                <div style={{ background: 'black', color: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <Smartphone size={32} style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Express Wallet Payment</div>
                  <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.25rem' }}>
                    Touch ID / Face ID verification simulation ready.
                  </p>
                </div>
              )}

              {/* Tab Content 4: Cash */}
              {paymentMethod === 'cash' && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.25rem', borderRadius: 'var(--radius-md)', color: '#166534' }}>
                  <Banknote size={28} style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontWeight: 700 }}>Pay via Cash or Card Swiper at Table</div>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    Your table waiter will bring the physical terminal or print your invoice upon food delivery.
                  </p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn-secondary"
                style={{ color: 'var(--text-main)', borderColor: 'var(--border-light)' }}
                onClick={() => setIsPaymentModalOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </button>

              <button
                className="btn-primary"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} /> Pay ${totalAmount.toFixed(2)} & Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
