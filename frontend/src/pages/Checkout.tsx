import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Order } from '../types';
import SEO from '../components/SEO';
import { ShieldCheck, ArrowRight, CreditCard, DollarSign, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { cart, placeOrder, user, showToast } = useApp();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState<'Stripe' | 'Razorpay' | 'COD'>('Stripe');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  // Success states
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');

  // Sync user details if they load late
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCost = subtotal >= 2000 ? 0 : 150;
  const grandTotal = subtotal + deliveryCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.postalCode) {
      showToast('Please fill out all address details', 'error');
      return;
    }

    if (paymentMethod === 'Stripe' && (!cardNumber || !cardExpiry || !cardCVC)) {
      showToast('Please enter your credit card information', 'error');
      return;
    }

    const orderObj = await placeOrder({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country
    }, paymentMethod);

    if (orderObj) {
      setPlacedOrder(orderObj);
      setCheckoutStep('success');
      showToast('Order registered successfully!', 'success');
    }
  };

  // If we just completed checkout
  if (checkoutStep === 'success' && placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 font-sans text-center" id="checkout_success_panel">
        <div className="inline-flex h-20 w-20 items-center justify-center bg-green-50 text-[#0f2c59] rounded-full border border-green-200 mb-6 animate-bounce">
          <CheckCircle2 size={44} />
        </div>
        
        <span className="text-[#c8a35f] text-xs font-semibold tracking-[0.3em] uppercase block">TRANSACTION APPROVED</span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#0f2c59] font-bold tracking-tight mt-1">THANK YOU FOR YOUR PATRONAGE</h1>
        
        <div className="bg-[#fdfbf7] border border-[#c8a35f]/15 max-w-lg mx-auto p-6 rounded-sm mt-8 text-left space-y-4">
          <h2 className="font-serif text-sm font-semibold text-[#0f2c59] border-b border-gray-100 pb-2 uppercase">SECURE DESPATCH RECEIPT</h2>
          
          <div className="grid grid-cols-2 text-xs font-mono text-gray-600 gap-y-2">
            <span>ORDER NUMBER:</span>
            <span className="font-bold text-gray-900 text-right">{placedOrder.orderId}</span>
            
            <span>ESTIMATED DELIVERY:</span>
            <span className="font-bold text-gray-900 text-right">3-4 BUSINESS DAYS</span>
            
            <span>TOTAL VALUE:</span>
            <span className="font-bold text-gray-900 text-right">${placedOrder.amount.toLocaleString()}</span>
            
            <span>METHOD:</span>
            <span className="font-bold text-gray-900 text-right">{placedOrder.paymentMethod}</span>
            
            <span>SHIPPED TO:</span>
            <span className="font-semibold text-gray-900 text-right truncate max-w-[200px]">{placedOrder.customer.address}</span>
          </div>
          
          <p className="text-[10px] text-gray-500 leading-relaxed text-center pt-2 border-t border-gray-100 uppercase tracking-wider">
            An email receipt and private armored tracking ID have been dispatched to <span className="font-bold text-gray-800">{placedOrder.customer.email}</span>.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/shop"
            className="bg-[#0f2c59] hover:bg-[#c8a35f] text-white py-3.5 px-8 text-xs font-semibold tracking-widest uppercase rounded-sm transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
          <Link
            to="/account?tab=orders"
            className="border border-[#0f2c59] text-[#0f2c59] hover:bg-[#0f2c59]/5 py-3.5 px-8 text-xs font-semibold tracking-widest uppercase rounded-sm transition-colors"
          >
            VIEW ORDER VAULT
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty and not checked out, direct back to shop
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 text-center font-sans">
        <p className="font-serif text-lg text-gray-500">Your shopping bag is empty.</p>
        <Link to="/shop" className="bg-[#0f2c59] text-white font-sans text-xs uppercase tracking-widest px-6 py-3 mt-4 inline-block">
          GO TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-12 px-6 md:px-12 max-w-7xl mx-auto font-sans" id="checkout_page_root">
      <SEO 
        title="Secure Checkout - Encrypted Dispatch"
        description="Encrypted payment and insured armored shipment checkout for Lux Grown lab grown diamond jewelry."
      />
      <h1 className="font-serif text-2xl md:text-4xl text-[#0f2c59] font-bold tracking-tight mb-10 text-center uppercase">SECURE DESPATCH CHECKOUT</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Address & Credit Card forms (Columns 1-7) */}
        <div className="lg:col-span-7 space-y-8" id="checkout_details_section">
          
          {/* Shipping Address */}
          <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-xs space-y-4">
            <h2 className="font-serif text-base font-bold text-[#0f2c59] tracking-wide uppercase border-b border-gray-100 pb-3">DESPATCH SHIPMENT COORDINATES</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1.5">FULL NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Charlotte Montgomery"
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1.5">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. charlotte@domain.com"
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1.5">PHONE NUMBER</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +1 (555) 019-2834"
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1.5">DELIVERY ADDRESS</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="STREET NAME, APARTMENT SUITE..."
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800 uppercase"
                />
              </div>

              <div>
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1.5">CITY</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. New York"
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1.5">POSTAL / ZIP CODE</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="e.g. 10019"
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Secure Payment Gateway choices */}
          <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-xs space-y-4">
            <h2 className="font-serif text-base font-bold text-[#0f2c59] tracking-wide uppercase border-b border-gray-100 pb-3">SECURED PAYMENT TRANSMISSION</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('Stripe')}
                className={`border p-4 rounded-sm flex flex-col items-center justify-center gap-2 transition-all focus:outline-none ${paymentMethod === 'Stripe' ? 'border-[#0f2c59] bg-[#0f2c59]/5 text-[#0f2c59] font-bold' : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}
                id="pay_method_stripe"
              >
                <CreditCard size={18} />
                <span className="text-[10px] tracking-widest uppercase font-semibold">STRIPE CREDIT</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Razorpay')}
                className={`border p-4 rounded-sm flex flex-col items-center justify-center gap-2 transition-all focus:outline-none ${paymentMethod === 'Razorpay' ? 'border-[#0f2c59] bg-[#0f2c59]/5 text-[#0f2c59] font-bold' : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}
                id="pay_method_razorpay"
              >
                <CreditCard size={18} />
                <span className="text-[10px] tracking-widest uppercase font-semibold">RAZORPAY API</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`border p-4 rounded-sm flex flex-col items-center justify-center gap-2 transition-all focus:outline-none ${paymentMethod === 'COD' ? 'border-[#0f2c59] bg-[#0f2c59]/5 text-[#0f2c59] font-bold' : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}
                id="pay_method_cod"
              >
                <DollarSign size={18} />
                <span className="text-[10px] tracking-widest uppercase font-semibold">HAND DISPATCH</span>
              </button>
            </div>

            {/* Credit Card Details if Stripe / Razorpay */}
            {paymentMethod !== 'COD' && (
              <div className="bg-[#fcfbf9] border border-gray-150 rounded-sm p-5 space-y-4 mt-4">
                <p className="text-[9px] font-semibold text-[#0f2c59] tracking-[0.15em] uppercase flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-green-600" /> SECURE SSL ENCRYPTED GATEWAY ACTIVE
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3">
                    <label className="block text-[8px] tracking-widest text-gray-400 uppercase font-mono mb-1">CARDHOLDER NAME</label>
                    <input
                      type="text"
                      required={paymentMethod !== 'COD'}
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="e.g. Charlotte Montgomery"
                      className="w-full bg-white border border-gray-200 px-3 py-2 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                    />
                  </div>

                  <div className="col-span-3">
                    <label className="block text-[8px] tracking-widest text-gray-400 uppercase font-mono mb-1">CARD NUMBER</label>
                    <input
                      type="text"
                      required={paymentMethod !== 'COD'}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength={19}
                      className="w-full bg-white border border-gray-200 px-3 py-2 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[8px] tracking-widest text-gray-400 uppercase font-mono mb-1">EXPIRY DATE</label>
                    <input
                      type="text"
                      required={paymentMethod !== 'COD'}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM / YY"
                      maxLength={5}
                      className="w-full bg-white border border-gray-200 px-3 py-2 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] tracking-widest text-gray-400 uppercase font-mono mb-1">SECURITY CODE</label>
                    <input
                      type="password"
                      required={paymentMethod !== 'COD'}
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value)}
                      placeholder="CVC"
                      maxLength={4}
                      className="w-full bg-white border border-gray-200 px-3 py-2 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Order summary (Columns 8-12) */}
        <div className="lg:col-span-5 bg-[#fdfbf7] border border-[#c8a35f]/15 p-6 rounded-sm space-y-6 shadow-sm" id="checkout_summary_panel">
          <h2 className="font-serif text-base font-bold text-[#0f2c59] tracking-wide uppercase border-b border-gray-100 pb-3">SPECIMEN QUANTITY AUDIT</h2>

          {/* Items checklist */}
          <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 border-b border-gray-100 pb-4">
            {cart.map((item, index) => (
              <div key={index} className="flex gap-3 justify-between items-center text-xs">
                <div className="flex gap-3 items-center">
                  <div className="h-12 w-12 rounded-sm overflow-hidden border border-gray-100 bg-white shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#0f2c59] line-clamp-1">{item.product.name}</h4>
                    <span className="text-[10px] text-gray-400 font-mono uppercase">{item.quantity} × {item.selectedMetal}</span>
                  </div>
                </div>
                <span className="font-mono font-semibold text-gray-800">${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Pricing totals */}
          <div className="space-y-3 text-xs text-gray-600 border-b border-gray-100 pb-4">
            <div className="flex justify-between">
              <span>Selection Subtotal</span>
              <span className="font-mono text-gray-900">${subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Armored Delivery Courier</span>
              <span className="font-mono text-gray-900">{deliveryCost === 0 ? "FREE" : `$${deliveryCost}`}</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline pt-2">
            <span className="text-xs font-bold text-[#0f2c59] uppercase tracking-wider">TOTAL SECURE VAULT VALUE</span>
            <span className="font-mono text-xl font-bold text-gray-900">${grandTotal.toLocaleString()}</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#0f2c59] hover:bg-[#c8a35f] text-white py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
            id="checkout_submit_order_btn"
          >
            AUTHORIZE SECURE TRANSACTION <ArrowRight size={14} />
          </button>

          <div className="bg-[#0f2c59]/5 p-4 rounded-sm border border-[#0f2c59]/10 text-[9px] tracking-wide text-gray-500 leading-relaxed text-center font-sans uppercase">
            <span>By authorizing, you confirm selection audits and delivery insurance directives. All diamond transactions are logged under federal banking regulations.</span>
          </div>

        </div>

      </form>
    </div>
  );
}
