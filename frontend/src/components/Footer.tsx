import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, ShieldCheck, Mail, ArrowRight, Truck, Award } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#0f2c59] text-white pt-20 pb-10 border-t border-[#c8a35f]/20 font-sans" id="main_footer">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand & Mission Statement */}
        <div className="flex flex-col space-y-6">
          <Link to="/" className="flex flex-col items-start group">
            <span className="font-serif text-2xl tracking-[0.15em] text-[#c8a35f] font-bold">
              LUX GROWN
            </span>
            <span className="text-[8px] tracking-[0.3em] text-gray-300 uppercase mt-0.5">
              LAB DIAMONDS
            </span>
          </Link>
          <p className="text-gray-300 text-xs leading-relaxed max-w-sm tracking-wide">
            Lux Grown represents the pinnacle of ethical luxury. We curate and craft master-grade lab grown diamond jewelry that combines architectural modernism with age-old bench jewelry techniques.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#c8a35f] transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#c8a35f] transition-colors" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#c8a35f] transition-colors" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Collections Quick Links */}
        <div className="flex flex-col space-y-5">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c8a35f]">
            COLLECTIONS
          </h4>
          <ul className="space-y-3 text-xs text-gray-300">
            <li><Link to="/shop?category=Jewelry" className="hover:text-white transition-colors tracking-wider">Exquisite Fine Jewelry</Link></li>
            <li><Link to="/shop?category=Watches" className="hover:text-white transition-colors tracking-wider">Luxury Timepieces</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors tracking-wider">Bestselling Diamonds</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors tracking-wider">Bespoke Custom Jewelry</Link></li>
          </ul>
        </div>

        {/* Client Services & Polices */}
        <div className="flex flex-col space-y-5">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c8a35f]">
            CLIENT CONCIERGE
          </h4>
          <ul className="space-y-3 text-xs text-gray-300">
            <li><Link to="/about" className="hover:text-white transition-colors tracking-wider">Our Ethical Diamond Promise & Story</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors tracking-wider">Lifetime Quality Warranty</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors tracking-wider">Shipping & Secured Delivery</Link></li>
            <li><Link to="/account" className="hover:text-white transition-colors tracking-wider">Easy Returns & Resize Policy</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors tracking-wider">Contact Certified Gemologist</Link></li>
          </ul>
        </div>

        {/* High-end Newsletter Subscription */}
        <div className="flex flex-col space-y-5">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c8a35f]">
            THE LUXE CLUB
          </h4>
          <p className="text-gray-300 text-xs leading-relaxed tracking-wide">
            Subscribe to receive private collection launches, insights into gemological trends, and exclusive private access to limited releases.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2 pt-2">
            <div className="flex items-center border-b border-[#c8a35f]/30 focus-within:border-[#c8a35f] transition-colors py-2">
              <Mail size={16} className="text-[#c8a35f]/60 mr-2" />
              <input
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-none text-xs text-white placeholder-gray-400 focus:outline-none w-full uppercase tracking-widest"
              />
              <button type="submit" className="text-[#c8a35f] hover:text-white transition-colors focus:outline-none" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </div>
            {subscribed && (
              <span className="text-[10px] text-green-300 uppercase tracking-widest animate-pulse mt-1">
                ✓ Subscription approved. Welcome to Lux Grown.
              </span>
            )}
          </form>
        </div>

      </div>

      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-6 border-y border-white/5 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs tracking-wider text-gray-300 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <Award size={18} className="text-[#c8a35f]" />
          <span>IGS & GIA CERTIFIED DIAMONDS</span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0">
          <Truck size={18} className="text-[#c8a35f]" />
          <span>FREE INSURED DISPATCH OVER $2,000</span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <ShieldCheck size={18} className="text-[#c8a35f]" />
          <span>100% TRANSACTION SECURITY GUARANTEED</span>
        </div>
      </div>

      {/* Footer copyright and meta */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-400 tracking-widest uppercase">
        <span>© 2026 LUX GROWN LAB GROWN JEWELRY. ALL RIGHTS RESERVED.</span>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-[#c8a35f] transition-colors">PRIVACY POLICY</Link>
          <Link to="/" className="hover:text-[#c8a35f] transition-colors">TERMS OF SERVICE</Link>
          <Link to="/" className="hover:text-[#c8a35f] transition-colors">SITEMAP</Link>
        </div>
      </div>
    </footer>
  );
}
