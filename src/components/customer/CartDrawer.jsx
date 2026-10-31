import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Trash2, ArrowRight, Table, UtensilsCrossed, X } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    setIsCartOpen,
    setIsPaymentModalOpen,
    formatINR
  } = useApp();

  const [tableNo, setTableNo] = useState('Table 02');
  const [orderType, setOrderType] = useState('Dine-In'); // 'Dine-In' | 'Takeaway'
  const [selectedTipPercent, setSelectedTipPercent] = useState(15);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10; // 10% VAT/tax
  const tipAmount = subtotal * (selectedTipPercent / 100);
  const grandTotal = subtotal + tax + tipAmount;

  return (
    <div
      className="fixed inset-0 z-[1600] flex justify-end bg-slate-900/50 backdrop-blur-sm overflow-hidden"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="w-full max-w-md h-full bg-white flex flex-col shadow-2xl animate-[slideLeft_0.3s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-amber-500" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Your Digital Order</h3>
          </div>
          <button className="icon-close-btn cursor-pointer" onClick={() => setIsCartOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Cart Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Order Type & Table Selection */}
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOrderType('Dine-In')}
                className={`flex-1 py-2 px-3 rounded-lg border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  orderType === 'Dine-In'
                    ? 'border-amber-500 bg-white text-amber-900 shadow-xs'
                    : 'border-slate-200 bg-transparent text-slate-500 hover:bg-slate-100'
                }`}
              >
                <UtensilsCrossed size={15} className={orderType === 'Dine-In' ? 'text-amber-600' : 'text-slate-400'} />
                <span>Dine-In Table</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('Takeaway')}
                className={`flex-1 py-2 px-3 rounded-lg border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  orderType === 'Takeaway'
                    ? 'border-amber-500 bg-white text-amber-900 shadow-xs'
                    : 'border-slate-200 bg-transparent text-slate-500 hover:bg-slate-100'
                }`}
              >
                <ShoppingBag size={15} className={orderType === 'Takeaway' ? 'text-amber-600' : 'text-slate-400'} />
                <span>Takeaway / Pickup</span>
              </button>
            </div>

            {orderType === 'Dine-In' && (
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Table size={16} className="text-slate-400" />
                <span className="font-semibold text-xs sm:text-sm">Table Number:</span>
                <select
                  value={tableNo}
                  onChange={(e) => setTableNo(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-amber-500 cursor-pointer"
                >
                  {['Table 01', 'Table 02', 'Table 03', 'Table 04', 'Table 05', 'Table 06', 'Table 07', 'Table 08'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Items List */}
          {cart.length === 0 ? (
            <div className="text-center py-12 px-4 text-slate-400 space-y-2">
              <ShoppingBag size={48} strokeWidth={1} className="mx-auto text-slate-300" />
              <h4 className="text-base font-semibold text-slate-700">Your order cart is empty</h4>
              <p className="text-xs sm:text-sm text-slate-400">Select delicious dishes from our digital menu!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                    <div className="text-sm font-extrabold text-amber-600">
                      {formatINR(item.price * item.quantity)}
                    </div>
                    {item.notes && (
                      <div className="text-xs text-slate-400 italic truncate">
                        Note: {item.notes}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 cursor-pointer active:scale-95"
                      onClick={() => updateCartQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="font-bold text-xs text-slate-800 w-4 text-center">{item.quantity}</span>
                    <button
                      className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 cursor-pointer active:scale-95"
                      onClick={() => updateCartQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Tip Selection */}
              <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-xl space-y-2">
                <div className="text-xs font-bold text-amber-900">
                  Add Chef &amp; Service Tip
                </div>
                <div className="flex gap-2">
                  {[0, 10, 15, 20].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setSelectedTipPercent(pct)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        selectedTipPercent === pct
                          ? 'border-amber-500 bg-amber-500 text-white shadow-xs'
                          : 'border-amber-200 bg-white text-amber-900 hover:bg-amber-100/50'
                      }`}
                    >
                      {pct === 0 ? 'None' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] border-t border-slate-200 bg-white flex flex-col gap-3 shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-700">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Tax &amp; Service Charge (10%)</span>
                <span className="font-semibold text-slate-700">{formatINR(tax)}</span>
              </div>
              {selectedTipPercent > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Staff Tip ({selectedTipPercent}%)</span>
                  <span className="font-semibold text-slate-700">{formatINR(tipAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base sm:text-lg font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Grand Total</span>
                <span className="text-amber-600">{formatINR(grandTotal)}</span>
              </div>
            </div>

            <button
              className="btn-primary w-full justify-center py-3 text-sm sm:text-base cursor-pointer"
              onClick={() => {
                setIsCartOpen(false);
                setIsPaymentModalOpen(true);
              }}
            >
              Proceed to Integrated Payment ({formatINR(grandTotal)}) <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
      </div>
    </div>
  );
};
