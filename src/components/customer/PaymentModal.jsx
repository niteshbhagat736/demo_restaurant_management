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
    setIsCartOpen,
    cart,
    placeOrder,
    setCurrentView,
    formatINR
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'applepay' | 'cash'
  const [customerName, setCustomerName] = useState('Alex Vance');
  const [tableNo, setTableNo] = useState('Table 02');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('742');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderReceipt, setCompletedOrderReceipt] = useState(null);

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    if (!completedOrderReceipt) {
      setIsCartOpen(true);
    }
  };

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
    <div
      className="fixed inset-0 z-[2200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-hidden"
      onClick={() => !isProcessing && handleCloseModal()}
    >
      <div
        className="bg-white w-full max-w-full sm:max-w-xl max-h-[92dvh] sm:max-h-[88dvh] rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-[modalPop_0.25s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Receipt View after successful simulated payment */}
        {completedOrderReceipt ? (
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-6 sm:p-8 text-center shrink-0">
              <CheckCircle size={52} className="mx-auto mb-2.5" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Payment Successful!</h2>
              <p className="text-emerald-100 text-sm mt-1">
                Order #{completedOrderReceipt.id} Transmitted to Kitchen
              </p>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-4">
              <div className="bg-white border border-dashed border-slate-200 p-4 sm:p-5 rounded-xl shadow-xs">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-3 text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-500">Receipt Details</span>
                  <span className="text-amber-600">{completedOrderReceipt.paymentStatus}</span>
                </div>

                <div className="flex justify-between text-sm mb-2 text-slate-500">
                  <span>Customer:</span>
                  <span className="font-semibold text-slate-900">{completedOrderReceipt.customerName}</span>
                </div>

                <div className="flex justify-between text-sm mb-2 text-slate-500">
                  <span>Table / Order Type:</span>
                  <span className="font-semibold text-slate-900">{completedOrderReceipt.tableNo}</span>
                </div>

                <div className="flex justify-between text-sm mb-3 text-slate-500">
                  <span>Time Placed:</span>
                  <span className="font-semibold text-slate-900">{completedOrderReceipt.createdAt}</span>
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-2">
                  {completedOrderReceipt.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-700">{item.quantity}x {item.name}</span>
                      <span className="font-semibold text-slate-900">{formatINR(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-base sm:text-lg font-extrabold pt-2 border-t border-slate-200 text-slate-900">
                    <span>Total Amount Paid</span>
                    <span className="text-emerald-600">{formatINR(completedOrderReceipt.totalAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 sm:p-3.5 rounded-xl text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5">
                <Receipt size={18} className="shrink-0" />
                <span>You can track your order status live in the Order Tracker tab.</span>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 pb-[calc(0.85rem+env(safe-area-inset-bottom,0px))] sm:pb-4 border-t border-slate-200 bg-white shrink-0">
              <button
                className="btn-primary w-full justify-center py-3 text-sm sm:text-base cursor-pointer"
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
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={22} className="text-emerald-500" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Simulated Integrated Checkout</h3>
              </div>
              <button className="icon-close-btn cursor-pointer" onClick={handleCloseModal}><X size={18} /></button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Total Display Banner */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-5 rounded-xl flex justify-between items-center shadow-sm">
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Payable Amount</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{formatINR(totalAmount)}</div>
                </div>
                <div className="text-xs bg-white/10 px-3 py-1.5 rounded-md font-semibold text-slate-200">
                  Pitch Demo Gateway
                </div>
              </div>

              {/* Customer Info Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">Table Number</label>
                  <input
                    type="text"
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm font-semibold text-slate-900"
                  />
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-2">Select Payment Gateway</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI / QR', icon: QrCode },
                    { id: 'applepay', label: 'Pay', icon: Smartphone },
                    { id: 'cash', label: 'Cash', icon: Banknote }
                  ].map(method => {
                    const IconComp = method.icon;
                    const isActive = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`py-2.5 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                          isActive
                            ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-xs'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <IconComp size={18} />
                        <span>{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content 1: Card */}
              {paymentMethod === 'card' && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content 2: UPI QR */}
              {paymentMethod === 'upi' && (
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 text-center space-y-2">
                  <div className="bg-white p-3 inline-block rounded-xl border border-slate-200 shadow-xs">
                    <QrCode size={110} className="text-slate-900" />
                  </div>
                  <div className="text-sm font-bold text-slate-800">Scan QR with Google Pay, PhonePe or Paytm</div>
                  <div className="text-xs text-slate-500">
                    UPI ID: <code className="bg-slate-200 px-2 py-0.5 rounded text-slate-800 font-mono">gourmetpulse@merchant</code>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Apple / Google Pay */}
              {paymentMethod === 'applepay' && (
                <div className="bg-black text-white p-6 rounded-xl text-center space-y-1">
                  <Smartphone size={32} className="mx-auto mb-2 text-white/90" />
                  <div className="font-bold text-base">Express Wallet Payment</div>
                  <p className="text-xs text-slate-400">
                    Touch ID / Face ID verification simulation ready.
                  </p>
                </div>
              )}

              {/* Tab Content 4: Cash */}
              {paymentMethod === 'cash' && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 space-y-1">
                  <Banknote size={26} className="text-emerald-600 mb-1" />
                  <div className="font-bold text-sm">Pay via Cash or Card Swiper at Table</div>
                  <p className="text-xs text-emerald-700">
                    Your table waiter will bring the physical terminal or print your invoice upon food delivery.
                  </p>
                </div>
              )}
            </div>

            <div className="p-3.5 sm:p-4 pb-[calc(0.85rem+env(safe-area-inset-bottom,0px))] sm:pb-4 border-t border-slate-200 bg-white flex items-center justify-end gap-2.5 sm:gap-3 shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
              <button
                type="button"
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                onClick={handleCloseModal}
                disabled={isProcessing}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn-primary flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm sm:text-base cursor-pointer"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} /> Pay {formatINR(totalAmount)} &amp; Place Order
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
