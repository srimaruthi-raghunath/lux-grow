import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import SEO from '../components/SEO';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { cart, updateCartQty, removeFromCart, showToast } = useApp();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number } | null>(null);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'LUXGROWN10') {
      setActiveDiscount({ code: 'LUXGROWN10', percent: 10 });
      showToast('Promo applied: 10% Luxury discount applied!', 'success');
      setCouponCode('');
    } else if (cleanCode === 'WELCOME5') {
      setActiveDiscount({ code: 'WELCOME5', percent: 5 });
      showToast('Promo applied: 5% Welcome discount applied!', 'success');
      setCouponCode('');
    } else {
      showToast('Invalid promotional code', 'error');
    }
  };

  const removeCoupon = () => {
    setActiveDiscount(null);
    showToast('Promo code removed', 'info');
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = activeDiscount ? (subtotal * activeDiscount.percent) / 100 : 0;
  const deliveryThreshold = 2000;
  const deliveryCost = subtotal === 0 ? 0 : subtotal >= deliveryThreshold ? 0 : 150;
  const grandTotal = subtotal - discountAmount + deliveryCost;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center font-sans" id="cart_empty_state">
        <div className="h-16 w-16 bg-[#0f2c59]/5 rounded-full flex items-center justify-center text-[#0f2c59] mx-auto mb-6">
          <ShoppingBag size={28} />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl text-[#0f2c59] font-bold tracking-tight">YOUR SECURED BAG IS EMPTY</h1>
        <p className="text-xs text-gray-400 uppercase tracking-widest mt-2 max-w-sm mx-auto leading-relaxed">
          You have not selected any lab-grown diamond creations. Your private vault is currently empty.
        </p>
        <Link 
          to="/shop" 
          className="bg-[#0f2c59] hover:bg-[#c8a35f] text-white py-3.5 px-8 text-xs font-semibold tracking-widest uppercase rounded-sm inline-block mt-8 transition-colors"
        >
          EXPLORE THE SALON
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-12 px-6 md:px-12 max-w-7xl mx-auto font-sans" id="cart_page_root">
      <SEO 
        title="Shopping Cart - Secured Vault"
        description="Review your selected lab grown diamond jewelry and luxury timepieces before proceeding to encrypted checkout."
      />
      {/* Title */}
      <h1 className="font-serif text-2xl md:text-4xl text-[#0f2c59] font-bold tracking-tight mb-10 text-center uppercase">YOUR VAULT SELECTION</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Items List (Columns 1-8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border-b border-gray-100 pb-3 hidden md:flex text-[9px] font-mono uppercase tracking-widest text-gray-400 font-semibold">
            <span className="w-1/2">SPECIMEN DETAILS</span>
            <span className="w-1/6 text-center">METAL</span>
            <span className="w-1/6 text-center">QUANTITY</span>
            <span className="w-1/6 text-right">VALUE</span>
          </div>

          {cart.map((item, idx) => (
            <div 
              key={`${item.product._id || item.product.id}_${item.selectedMetal}`}
              className="flex flex-col md:flex-row items-center justify-between border-b border-gray-100 pb-6 gap-4 md:gap-0"
              id={`cart_item_${idx}`}
            >
              {/* Product Info & Photo */}
              <div className="w-full md:w-1/2 flex gap-4">
                <Link to={`/shop/${item.product._id || item.product.id}`} className="h-24 w-24 overflow-hidden rounded-sm bg-gray-50 shrink-0 border border-gray-100">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </Link>
                <div className="flex flex-col justify-center">
                  <span className="text-[8px] tracking-widest font-mono text-[#c8a35f] uppercase font-bold">{item.product.category}</span>
                  <Link to={`/shop/${item.product._id || item.product.id}`} className="font-serif text-sm font-bold text-[#0f2c59] hover:text-[#c8a35f] transition-colors mt-0.5 line-clamp-1">
                    {item.product.name}
                  </Link>
                  <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase">{item.product.shape} • {item.product.clarity} • {item.product.color} Color</span>
                  <button
                    onClick={() => removeFromCart(item.product.id || item.product._id || '', item.selectedMetal)}
                    className="flex items-center text-red-500 hover:text-red-700 text-[10px] uppercase font-semibold tracking-wider gap-1.5 mt-3 self-start focus:outline-none"
                    id={`cart_delete_btn_${idx}`}
                  >
                    <Trash2 size={12} /> REMOVE
                  </button>
                </div>
              </div>

              {/* Selected Metal (Desktop) */}
              <div className="w-full md:w-1/6 text-center">
                <span className="md:hidden text-[9px] font-mono text-gray-400 uppercase tracking-widest mr-2">METAL:</span>
                <span className="text-xs font-semibold text-[#0f2c59] uppercase">{item.selectedMetal}</span>
              </div>

              {/* Qty Controls */}
              <div className="w-full md:w-1/6 flex justify-center items-center">
                <span className="md:hidden text-[9px] font-mono text-gray-400 uppercase tracking-widest mr-2">QTY:</span>
                <div className="flex items-center border border-gray-200 rounded-sm bg-white shrink-0">
                  <button
                    onClick={() => updateCartQty(item.product.id || item.product._id || '', item.quantity - 1, item.selectedMetal)}
                    className="p-1.5 hover:bg-gray-50 hover:text-black text-gray-400 focus:outline-none"
                    aria-label="Decrease Quantity"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="px-3 text-xs font-mono font-semibold text-[#0f2c59]">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQty(item.product.id || item.product._id || '', item.quantity + 1, item.selectedMetal)}
                    className="p-1.5 hover:bg-gray-50 hover:text-black text-gray-400 focus:outline-none"
                    aria-label="Increase Quantity"
                  >
                    <Plus size={10} />
                  </button>
                </div>
              </div>

              {/* Final price cell */}
              <div className="w-full md:w-1/6 text-right flex md:block justify-between items-center">
                <span className="md:hidden text-[9px] font-mono text-gray-400 uppercase tracking-widest">SUBTOTAL:</span>
                <span className="font-mono text-sm font-semibold text-[#1a1a1a]">${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>

            </div>
          ))}

          {/* Continual shopping anchor */}
          <div className="pt-4">
            <Link to="/shop" className="text-xs text-[#0f2c59] hover:text-[#c8a35f] font-semibold tracking-wider uppercase inline-flex items-center gap-2">
              ← ACQUIRE MORE CREATIONS
            </Link>
          </div>
        </div>

        {/* Right Side: Order Summary Card (Columns 9-12) */}
        <div className="lg:col-span-4 bg-[#fdfbf7] border border-[#c8a35f]/15 p-6 rounded-sm space-y-6 shadow-sm" id="cart_summary_panel">
          <h2 className="font-serif text-base font-bold text-[#0f2c59] tracking-wide uppercase border-b border-gray-100 pb-3">SUMMARY DETAILS</h2>

          {/* Itemized math */}
          <div className="space-y-3.5 text-xs text-gray-600 border-b border-gray-100 pb-5">
            <div className="flex justify-between">
              <span className="tracking-wide">Selection Subtotal</span>
              <span className="font-mono font-semibold text-gray-900">${subtotal.toLocaleString()}</span>
            </div>

            {activeDiscount && (
              <div className="flex justify-between text-green-700 font-medium">
                <span className="tracking-wide flex items-center gap-1">
                  <Tag size={12} /> Discount ({activeDiscount.code})
                </span>
                <span className="font-mono font-semibold">-${discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="tracking-wide">Secured Armored Delivery</span>
              <span className="font-mono font-semibold text-gray-900">
                {deliveryCost === 0 ? "FREE" : `$${deliveryCost.toLocaleString()}`}
              </span>
            </div>

            {deliveryCost > 0 && (
              <p className="text-[9px] text-[#c8a35f] leading-relaxed tracking-wide uppercase font-medium mt-1">
                ADD ${(deliveryThreshold - subtotal).toLocaleString()} MORE FOR COMPLIMENTARY INSURED COURIER DISPATCH.
              </p>
            )}
          </div>

          {/* Coupon Code fields */}
          <div className="border-b border-gray-100 pb-5">
            {activeDiscount ? (
              <div className="flex items-center justify-between bg-green-50 text-green-800 p-2.5 rounded-sm border border-green-200 text-xs">
                <span className="font-mono font-bold">{activeDiscount.code} ACTIVE (-{activeDiscount.percent}%)</span>
                <button onClick={removeCoupon} className="text-red-500 font-bold hover:text-red-700 uppercase tracking-widest text-[9px] focus:outline-none">REMOVE</button>
              </div>
            ) : (
              <form onSubmit={applyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="PROMO CODE (e.g. LUXGROWN10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3 py-2 text-xs font-sans tracking-widest focus:outline-none focus:border-[#0f2c59] uppercase text-gray-700"
                />
                <button
                  type="submit"
                  className="bg-[#0f2c59] hover:bg-[#c8a35f] text-white px-4 py-2 text-[10px] tracking-widest uppercase font-semibold transition-colors"
                  id="coupon_apply_btn"
                >
                  APPLY
                </button>
              </form>
            )}
            <p className="text-[8px] text-gray-400 uppercase tracking-widest mt-1.5">Use code <span className="font-bold">LUXGROWN10</span> for 10% off your order.</p>
          </div>

          {/* Grand Total */}
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-[#0f2c59] uppercase tracking-wider">Estimated Total</span>
            <span className="font-mono text-xl font-bold text-gray-900">${grandTotal.toLocaleString()}</span>
          </div>

          {/* Checkout triggers */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-[#0f2c59] hover:bg-[#c8a35f] text-white py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-sm transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
            id="proceed_checkout_btn"
          >
            PROCEED TO SECURE CHECKOUT <ArrowRight size={14} />
          </button>

          {/* Security stamp */}
          <div className="flex items-center justify-center gap-2 text-[9px] tracking-widest uppercase text-gray-400 font-semibold pt-2">
            <ShieldCheck size={14} className="text-green-600" />
            <span>256-BIT ENCRYPTED INSURED DISPATCH GATEWAY</span>
          </div>

        </div>

      </div>
    </div>
  );
}
