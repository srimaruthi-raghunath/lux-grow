import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import SEO from '../components/SEO';
import { User, Heart, ShoppingBag, MapPin, ShieldCheck, LogOut, Loader2, Plus, Trash2 } from 'lucide-react';

export default function Account() {
  const { 
    user, 
    login, 
    register, 
    logout, 
    orders, 
    fetchUserOrders, 
    wishlist, 
    products, 
    addToCart, 
    toggleWishlist,
    updateSavedAddresses,
    showToast 
  } = useApp();
  
  const [searchParams, setSearchParams] = useSearchParams();

  // Navigation tab from URL query params
  const activeTab = searchParams.get('tab') || 'profile';

  // Auth form states
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);

  // Address form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ address: '', city: '', postalCode: '', country: 'United States' });

  // Load user orders if logged in
  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoadingAction(true);
    const ok = await login(email, password);
    setLoadingAction(false);
    if (ok) {
      setSearchParams({ tab: 'profile' });
    }
  };

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setLoadingAction(true);
    const ok = await register(name, email, password);
    setLoadingAction(false);
    if (ok) {
      setSearchParams({ tab: 'profile' });
    }
  };

  // Handle Forgot Password (Simulated)
  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(`Despatching security reset link to ${email}...`, 'success');
    setAuthMode('login');
  };

  // Handle Add Address
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.address || !newAddress.city || !newAddress.postalCode) return;
    
    const existing = user?.savedAddresses || [];
    const updated = [...existing, newAddress];
    const ok = await updateSavedAddresses(updated);
    if (ok) {
      setNewAddress({ address: '', city: '', postalCode: '', country: 'United States' });
      setShowAddressForm(false);
    }
  };

  // Handle Delete Address
  const handleDeleteAddress = async (idx: number) => {
    const existing = user?.savedAddresses || [];
    const updated = existing.filter((_, i) => i !== idx);
    await updateSavedAddresses(updated);
  };

  // Get Wishlisted Products details
  const wishlistedProducts = products.filter(p => wishlist.includes(p._id || p.id || ''));

  // Render Authentication Forms (Non-logged in)
  if (!user) {
    return (
      <div className="w-full bg-white py-20 px-6 md:px-12 max-w-7xl mx-auto font-sans flex justify-center" id="auth_portal_wrapper">
        <div className="w-full max-w-md border border-gray-100 p-8 rounded-sm bg-[#fcfbf9] shadow-sm">
          
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl md:text-3xl text-[#0f2c59] font-bold tracking-tight uppercase">
              {authMode === 'login' ? "SECURE CLIENT PORTAL" : authMode === 'register' ? "CREATE PRIVATE VAULT" : "RESET SECURITY VAULT"}
            </h1>
            <p className="text-[9px] text-gray-400 mt-1.5 uppercase tracking-[0.25em]">
              Lux Grown Secure Insured Jewelry Salon
            </p>
          </div>

          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. charlotte@domain.com"
                  className="w-full bg-white border border-gray-200 px-4 py-2.5 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59]"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono">SECURITY PIN / PASSWORD</label>
                  <button 
                    type="button" 
                    onClick={() => setAuthMode('forgot')}
                    className="text-[9px] text-[#c8a35f] font-mono tracking-wider hover:text-[#0f2c59] uppercase"
                  >
                    FORGOT?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 px-4 py-2.5 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59]"
                />
              </div>

              <button
                type="submit"
                disabled={loadingAction}
                className="w-full bg-[#0f2c59] hover:bg-[#c8a35f] text-white py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition-colors flex items-center justify-center gap-2"
                id="login_submit_btn"
              >
                {loadingAction ? <Loader2 size={14} className="animate-spin" /> : "SECURE LOGIN"}
              </button>

              <div className="text-center pt-4 border-t border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest">
                NEW CONNOISSEUR?{" "}
                <button 
                  type="button" 
                  onClick={() => setAuthMode('register')}
                  className="text-[#c8a35f] font-bold hover:text-[#0f2c59]"
                >
                  CREATE VAULT
                </button>
              </div>

              {/* Demo accounts cheat-sheet */}
              <div className="bg-[#0f2c59]/5 p-4 rounded-sm border border-[#0f2c59]/10 text-[9px] font-mono text-gray-500 leading-normal space-y-1">
                <span className="font-sans font-semibold text-[#0f2c59] block uppercase mb-1">Demo Credentials:</span>
                <div>Guest User: <span className="font-bold text-gray-700">guest@luxgrown.com</span> / pass: <span className="font-bold text-gray-700">any</span></div>
                <div>Admin Account: <span className="font-bold text-gray-700">raghu@gmail.com</span> / pass: <span className="font-bold text-gray-700">raghu123</span></div>
              </div>
            </form>
          )}

          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1">FULL NAME</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Charlotte Montgomery"
                  className="w-full bg-white border border-gray-200 px-4 py-2.5 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59]"
                />
              </div>

              <div>
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="charlotte@domain.com"
                  className="w-full bg-white border border-gray-200 px-4 py-2.5 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59]"
                />
              </div>

              <div>
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1">SECURITY PASSWORD</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 px-4 py-2.5 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59]"
                />
              </div>

              <button
                type="submit"
                disabled={loadingAction}
                className="w-full bg-[#0f2c59] hover:bg-[#c8a35f] text-white py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition-colors flex items-center justify-center gap-2"
                id="register_submit_btn"
              >
                {loadingAction ? <Loader2 size={14} className="animate-spin" /> : "ESTABLISH SECURE VAULT"}
              </button>

              <div className="text-center pt-4 border-t border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest">
                ALREADY MEMBER?{" "}
                <button 
                  type="button" 
                  onClick={() => setAuthMode('login')}
                  className="text-[#c8a35f] font-bold hover:text-[#0f2c59]"
                >
                  SECURE LOGIN
                </button>
              </div>
            </form>
          )}

          {authMode === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-5">
              <p className="text-[11px] text-gray-500 text-center leading-relaxed mb-4">
                Provide your registered vault email. We will dispatch encrypted credentials containing reset tokens.
              </p>
              <div>
                <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="charlotte@domain.com"
                  className="w-full bg-white border border-gray-200 px-4 py-2.5 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0f2c59] hover:bg-[#c8a35f] text-white py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition-colors"
                id="forgot_submit_btn"
              >
                DISPATCH RESET LINK
              </button>

              <div className="text-center pt-2 text-[10px] uppercase tracking-widest">
                <button 
                  type="button" 
                  onClick={() => setAuthMode('login')}
                  className="text-gray-400 font-bold hover:text-[#0f2c59]"
                >
                  BACK TO LOGIN
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  // Render Authenticated Account Dashboard
  return (
    <div className="w-full bg-white py-12 px-6 md:px-12 max-w-7xl mx-auto font-sans" id="auth_vault_root">
      <SEO 
        title="Client Vault & Portfolio - Lux Grown"
        description="Access your personal diamond vault, tracked order dispatches, saved wishlist, and account security details."
      />
      
      {/* User Hello Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-100 pb-8 mb-10 gap-4 md:gap-0">
        <div>
          <span className="text-[#c8a35f] text-[10px] tracking-[0.25em] uppercase font-semibold flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-green-600" /> SECURE MEMBERS VAULT ACTIVE
          </span>
          <h1 className="font-serif text-2xl md:text-4xl text-[#0f2c59] font-bold tracking-tight mt-1">WELCOME, {user.name.toUpperCase()}</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Account Vault Status: {user.isAdmin ? "Executive Admin Portfolio" : "Certified Patron Portfolio"}</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 text-[10px] font-sans font-bold tracking-widest uppercase rounded-sm border border-red-200 transition-colors flex items-center gap-2 focus:outline-none"
          id="logout_btn"
        >
          <LogOut size={12} /> SECURE LOGOUT
        </button>
      </div>

      {/* Grid: Left Navigation / Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Tab navigation (Columns 1-3) */}
        <div className="lg:col-span-3 flex flex-col space-y-1" id="account_tabs_navigation">
          <button
            onClick={() => setSearchParams({ tab: 'profile' })}
            className={`w-full text-left px-5 py-4 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all flex items-center gap-3 ${activeTab === 'profile' ? 'bg-[#0f2c59] text-white shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <User size={14} /> Profile Portfolio
          </button>

          <button
            onClick={() => setSearchParams({ tab: 'wishlist' })}
            className={`w-full text-left px-5 py-4 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all flex items-center gap-3 ${activeTab === 'wishlist' ? 'bg-[#0f2c59] text-white shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <Heart size={14} /> Wishlist Vault
          </button>

          <button
            onClick={() => setSearchParams({ tab: 'orders' })}
            className={`w-full text-left px-5 py-4 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all flex items-center gap-3 ${activeTab === 'orders' ? 'bg-[#0f2c59] text-white shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <ShoppingBag size={14} /> Order Vault ({orders.length})
          </button>

          <button
            onClick={() => setSearchParams({ tab: 'addresses' })}
            className={`w-full text-left px-5 py-4 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all flex items-center gap-3 ${activeTab === 'addresses' ? 'bg-[#0f2c59] text-white shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <MapPin size={14} /> Saved Addresses
          </button>
        </div>

        {/* Right Content Panels (Columns 4-12) */}
        <div className="lg:col-span-9" id="account_tab_content_panel">
          
          {/* PROFILE PORTFOLIO */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-xs space-y-6">
              <h2 className="font-serif text-lg font-bold text-[#0f2c59] border-b border-gray-100 pb-3 uppercase">CLIENT DETAILS</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs tracking-wide">
                <div className="space-y-1">
                  <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest block">Client Name</span>
                  <span className="font-bold text-[#0f2c59] text-sm uppercase">{user.name}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest block">Email Address</span>
                  <span className="font-bold text-[#0f2c59] text-sm">{user.email}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest block">Authorization Status</span>
                  <span className="text-[#c8a35f] font-bold uppercase">{user.isAdmin ? "Salon administrator portfolio" : "Standard client portfolio"}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest block">Registered Since</span>
                  <span className="font-bold text-gray-700 font-mono">JUNE 2026</span>
                </div>
              </div>
            </div>
          )}

          {/* WISHLIST VAULT */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="font-serif text-lg font-bold text-[#0f2c59] border-b border-gray-100 pb-3 uppercase">YOUR WISHLISTED SPECIMENS</h2>
              
              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 border border-dashed rounded-sm border-gray-200">
                  <p className="font-serif text-sm text-gray-500">You have no favorited items in your wishlist vault.</p>
                  <Link to="/shop" className="bg-[#0f2c59] text-white px-5 py-2 text-[10px] tracking-widest uppercase rounded-sm mt-4 inline-block hover:bg-[#c8a35f] transition-colors">EXPLORE SHOP</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlistedProducts.map((p) => (
                    <div key={p._id || p.id} className="border border-gray-100 rounded-sm p-4 relative group hover:shadow-xl transition-all duration-300">
                      
                      {/* Delete */}
                      <button 
                        onClick={() => toggleWishlist(p._id || p.id || '')}
                        className="absolute top-4 right-4 text-red-400 hover:text-red-600 focus:outline-none"
                      >
                        <Trash2 size={14} />
                      </button>

                      <Link to={`/shop/${p._id || p.id}`} className="block h-48 overflow-hidden rounded-sm bg-gray-50">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </Link>

                      <div className="mt-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[8px] tracking-widest font-mono text-[#c8a35f] uppercase font-semibold">{p.category}</span>
                          <Link to={`/shop/${p._id || p.id}`} className="font-serif text-xs font-bold text-[#0f2c59] block mt-0.5 hover:text-[#c8a35f] truncate">
                            {p.name}
                          </Link>
                          <span className="font-mono text-xs font-bold block mt-1.5">${p.price.toLocaleString()}</span>
                        </div>

                        <button
                          onClick={() => addToCart(p, 1, p.metal)}
                          className="bg-[#0f2c59] hover:bg-[#c8a35f] text-white w-full py-2 text-[9px] tracking-widest uppercase rounded-sm mt-4 transition-colors font-semibold"
                        >
                          ADD TO BAG
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ORDER VAULT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-serif text-lg font-bold text-[#0f2c59] border-b border-gray-100 pb-3 uppercase">SECURE ORDER ARCHIVE</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 border border-dashed rounded-sm border-gray-200">
                  <p className="font-serif text-sm text-gray-500">You have not finalized any diamond orders yet.</p>
                  <Link to="/shop" className="bg-[#0f2c59] text-white px-5 py-2 text-[10px] tracking-widest uppercase rounded-sm mt-4 inline-block hover:bg-[#c8a35f] transition-colors">EXPLORE SHOP</Link>
                </div>
              ) : (
                <div className="space-y-6" id="account_orders_list">
                  {orders.map((o) => (
                    <div key={o._id || o.id} className="border border-gray-200 p-5 rounded-sm space-y-4 shadow-xs" id={`order_card_${o.orderId}`}>
                      
                      {/* Title block */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-3 gap-2 sm:gap-0">
                        <div>
                          <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest block">ORDER CODE</span>
                          <span className="font-mono text-xs font-bold text-[#0f2c59]">{o.orderId}</span>
                        </div>

                        <div>
                          <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest block text-left sm:text-right">DATE DISPATCHED</span>
                          <span className="font-mono text-xs font-semibold text-gray-700 block text-left sm:text-right">{new Date(o.date).toLocaleDateString()}</span>
                        </div>

                        <div className="flex flex-col items-start sm:items-end">
                           <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest block">STATUS</span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wider font-sans ${o.orderStatus === 'Delivered' ? 'bg-green-50 text-green-700 border border-green-200' : o.orderStatus === 'Cancelled' ? 'bg-red-50 text-red-700' : 'bg-[#c8a35f]/10 text-[#0f2c59] border border-[#c8a35f]/20'}`}>
                            {o.orderStatus}
                          </span>
                        </div>
                      </div>

                      {/* Products items inside order */}
                      <div className="space-y-3.5">
                        {o.products.map((item, keyIdx) => (
                          <div key={keyIdx} className="flex justify-between items-center text-xs">
                            <div className="flex gap-3 items-center">
                              <div className="h-10 w-10 rounded-sm overflow-hidden border border-gray-100 bg-gray-50">
                                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h4 className="font-serif font-bold text-[#0f2c59]">{item.product.name}</h4>
                                <span className="text-[9px] text-gray-400 font-mono uppercase">{item.quantity} × {item.selectedMetal} setting</span>
                              </div>
                            </div>
                            <span className="font-mono font-semibold text-gray-800">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Details sum */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
                        <div className="flex gap-3 text-[10px] text-gray-400 uppercase tracking-widest">
                          <span>PAYMENT: <span className="font-bold text-gray-700">{o.paymentMethod}</span></span>
                          <span>•</span>
                          <span>STATUS: <span className="font-bold text-gray-700">{o.paymentStatus}</span></span>
                        </div>
                        <span className="font-mono font-bold text-sm text-[#0f2c59]">GRAND TOTAL: ${o.amount.toLocaleString()}</span>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="font-serif text-lg font-bold text-[#0f2c59] uppercase">SAVED DESPATCH ADDRESSES</h2>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="bg-[#0f2c59] hover:bg-[#c8a35f] text-white px-3 py-1.5 text-[9px] font-sans font-semibold tracking-widest uppercase rounded-sm flex items-center gap-1 focus:outline-none"
                  id="add_address_btn"
                >
                  <Plus size={10} /> ADD ADDRESS
                </button>
              </div>

              {/* Address Form */}
              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="bg-[#fcfbf9] border border-gray-150 p-5 rounded-sm space-y-4">
                  <h3 className="font-serif text-xs font-bold text-[#0f2c59] uppercase">Add New Delivery Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[8px] tracking-widest text-gray-400 uppercase font-mono mb-1">STREET ADDRESS</label>
                      <input
                        type="text"
                        required
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        placeholder="123 Fifth Ave, Suite 10"
                        className="w-full bg-white border border-gray-200 px-3 py-2 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59] uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] tracking-widest text-gray-400 uppercase font-mono mb-1">CITY</label>
                      <input
                        type="text"
                        required
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        placeholder="New York"
                        className="w-full bg-white border border-gray-200 px-3 py-2 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59]"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] tracking-widest text-gray-400 uppercase font-mono mb-1">POSTAL / ZIP CODE</label>
                      <input
                        type="text"
                        required
                        value={newAddress.postalCode}
                        onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                        placeholder="10019"
                        className="w-full bg-white border border-gray-200 px-3 py-2 text-xs font-sans tracking-wide focus:outline-none focus:border-[#0f2c59]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button type="submit" className="bg-[#0f2c59] hover:bg-[#c8a35f] text-white px-4 py-2 text-[9px] tracking-widest uppercase font-semibold">SAVE ADDRESS</button>
                    <button type="button" onClick={() => setShowAddressForm(false)} className="border border-gray-200 text-gray-400 px-4 py-2 text-[9px] tracking-widest uppercase hover:text-black">CANCEL</button>
                  </div>
                </form>
              )}

              {/* Addresses List */}
              {(!user.savedAddresses || user.savedAddresses.length === 0) ? (
                <p className="text-gray-400 text-xs uppercase tracking-widest">No delivery locations saved yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.savedAddresses.map((addr, idx) => (
                    <div key={idx} className="border border-gray-200 p-4 rounded-sm flex items-start justify-between bg-white relative">
                      <div className="space-y-1.5 text-xs text-gray-600">
                        <span className="text-[8px] font-mono font-bold text-[#c8a35f] uppercase block">LOCATION {idx + 1}</span>
                        <p className="font-semibold text-gray-800 uppercase">{addr.address}</p>
                        <p>{addr.city}, {addr.postalCode}</p>
                        <p className="text-[10px] text-gray-400 font-mono uppercase">{addr.country}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteAddress(idx)}
                        className="text-red-400 hover:text-red-600 focus:outline-none"
                        aria-label="Delete Address"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
