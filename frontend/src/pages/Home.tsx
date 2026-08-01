import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Product } from '../types';
import SEO from '../components/SEO';
import { motion } from 'motion/react';
import { ArrowRight, Star, Award, Shield, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export default function Home() {
  const { products, addToCart } = useApp();
  const navigate = useNavigate();
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Filter bestseller and new arrivals
  useEffect(() => {
    if (products && products.length > 0) {
      const best = products.filter(p => p.bestseller);
      setBestsellers(best.slice(0, 4));
      setNewArrivals(products.slice(0, 4));
    }
  }, [products]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setContactSubmitted(false), 5000);
    }
  };

  const reviews = [
    { name: 'Sophia R.', role: 'Elite Client', rating: 5, comment: 'The Elysian Solitaire ring is absolutely stunning. The D-color lab-grown diamond is completely flawless under my gemological loupe. To obtain this caliber of fire and brilliance at this price is a triumph.' },
    { name: 'Matthew K.', role: 'Verified Purchaser', rating: 5, comment: 'I ordered the Aura Tennis Bracelet for our 10-year anniversary. The craftsmanship of the platinum prongs and the perfect consistency of the diamond cuts are exceptional. Insured secure delivery took only 2 days.' },
    { name: 'Olivia H.', role: 'Verified Reviewer', rating: 5, comment: 'The customer care was phenomenal. They paired me with a GIA-certified gemologist who helped me select the perfect pear pendant necklace. Transparent luxury at its absolute finest.' }
  ];

  const collections = [
    { name: 'Exquisite Jewelry', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80', path: '/shop?category=Jewelry' },
    { name: 'Luxury Watches', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80', path: '/shop?category=Watches' }
  ];

  return (
    <div className="w-full bg-white relative font-sans" id="home_page_wrapper">
      <SEO 
        title="Lux Grown | Premium Lab-Grown Diamonds & Fine Jewelry"
        description="Discover ethical, master-crafted lab grown diamond engagement rings, fine jewelry, and luxury timepieces with IGI and GIA certificates."
        keywords="lab grown diamonds, ethical jewelry, lab created engagement rings, luxury watches, certified lab diamonds"
      />
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[90vh] w-full bg-black overflow-hidden flex items-center px-6 md:px-16" id="hero_section">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-65 scale-105 filter contrast-110" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031510]/95 via-[#031510]/50 to-transparent" />

        <div className="relative max-w-4xl text-white flex flex-col items-start space-y-6 z-10">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#c8a35f] text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase block"
          >
            THE NEW ERA OF LUXURY
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-4xl md:text-7xl leading-[1.1] tracking-tight font-light"
          >
            Ethically Sourced.<br />
            <span className="font-semibold text-white">Scientifically Perfect.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-300 text-sm md:text-base max-w-xl font-light leading-relaxed tracking-wide"
          >
            Indulge in master-crafted lab grown diamond jewelry engineered with extreme optical performance. Identical carbon structures, certified by IGS, set in micro-polished Platinum and 18K solid gold.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link 
              to="/shop" 
              className="bg-[#c8a35f] text-white hover:bg-[#b08d4b] px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase rounded-sm text-center transition-colors shadow-lg duration-300 flex items-center justify-center gap-2"
              id="hero_cta_shop"
            >
              EXPLORE BOUTIQUE <ArrowRight size={14} />
            </Link>
            <a 
              href="#about"
              className="border border-white/40 hover:border-white hover:bg-white/10 text-white px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase rounded-sm text-center transition-all duration-300"
              id="hero_cta_about"
            >
              OUR PROMISE
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="collections_section">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#c8a35f] text-xs font-semibold tracking-[0.25em] uppercase">CURATED SELECTIONS</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0f2c59] font-semibold mt-2 tracking-tight">FEATURED COLLECTIONS</h2>
          <div className="w-16 h-[2px] bg-[#c8a35f] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((col, idx) => (
            <Link 
              to={col.path} 
              key={idx} 
              className="group relative h-[450px] overflow-hidden rounded-sm bg-gray-100 flex items-end p-8"
              id={`col_card_${idx}`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
                style={{ backgroundImage: `url(${col.image})` }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              <div className="relative text-white flex flex-col space-y-2 z-10">
                <span className="text-[10px] tracking-[0.3em] text-[#c8a35f] uppercase font-semibold">SHOP THE LINE</span>
                <h3 className="font-serif text-2xl font-light tracking-wide group-hover:text-[#c8a35f] transition-colors">{col.name}</h3>
                <div className="flex items-center text-xs tracking-wider text-gray-300 font-sans gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  EXPLORE <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestseller Section */}
      <section className="bg-[#fdfbf7] py-24 border-y border-[#c8a35f]/10" id="bestsellers_section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-gray-100 pb-6">
            <div className="flex flex-col">
              <span className="text-[#c8a35f] text-xs font-semibold tracking-[0.25em] uppercase">EXQUISITE NEW ARRIVALS</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0f2c59] font-bold mt-2 tracking-tight">NEW ARRIVALS</h2>
            </div>
            <Link to="/shop" className="text-xs text-[#0f2c59] hover:text-[#c8a35f] font-semibold tracking-[0.15em] uppercase mt-4 md:mt-0 flex items-center gap-2">
              VIEW FULL RANGE <ArrowRight size={14} />
            </Link>
          </div>

          {bestsellers.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-sans text-sm">
              Authenticating with database store, loading catalog...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestsellers.map((product) => (
                <div key={product._id || product.id} className="group flex flex-col bg-white border border-gray-50 rounded-sm p-4 hover:shadow-xl transition-all duration-300" id={`best_prod_${product._id}`}>
                  {/* Image Container */}
                  <Link to={`/shop/${product._id || product.id}`} className="relative h-64 overflow-hidden bg-gray-50 block rounded-sm">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {product.bestseller && (
                      <span className="absolute top-3 left-3 bg-[#0f2c59] text-[#c8a35f] text-[8px] tracking-widest font-semibold px-2.5 py-1 uppercase rounded-xs">
                        NEW ARRIVAL
                      </span>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="mt-5 flex flex-col flex-grow">
                    <span className="text-[10px] tracking-widest text-[#c8a35f] font-mono uppercase font-medium">{product.category}</span>
                    <Link to={`/shop/${product._id || product.id}`} className="font-serif text-sm font-semibold text-[#0f2c59] mt-1 line-clamp-1 hover:text-[#c8a35f] transition-colors">
                      {product.name}
                    </Link>
                    <span className="text-xs text-gray-500 font-sans mt-2 line-clamp-2 leading-relaxed flex-grow">
                      {product.description}
                    </span>
                    
                    {/* Specifications badges */}
                    <div className="flex gap-2 mt-3 text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                      <span>{product.shape}</span>
                      <span>•</span>
                      <span>{product.metal}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                      <span className="font-mono text-xs font-semibold text-[#1a1a1a]">${product.price.toLocaleString()}</span>
                      <button 
                        onClick={() => addToCart(product, 1, product.metal)}
                        className="bg-[#0f2c59] hover:bg-[#c8a35f] text-white px-3 py-1.5 rounded-sm font-sans text-[10px] tracking-widest uppercase transition-colors"
                        id={`add_to_cart_best_${product._id}`}
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Value Pillars Section */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="why-choose-us">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[#c8a35f] text-xs font-semibold tracking-[0.25em] uppercase">THE STANDARD OF LUX GROWN</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0f2c59] font-semibold mt-2 tracking-tight">WHY COVET OUR GEMS?</h2>
          <div className="w-16 h-[2px] bg-[#c8a35f] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-16 w-16 bg-[#0f2c59]/5 rounded-full flex items-center justify-center text-[#0f2c59]">
              <Award size={28} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#0f2c59]">Certified Pure Grade</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Every diamond over 0.5 carats is individually inspected and accompanied by an official IGS or GIA Certificate guaranteeing optical and chemical purity.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="h-16 w-16 bg-[#0f2c59]/5 rounded-full flex items-center justify-center text-[#0f2c59]">
              <Sparkles size={28} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#0f2c59]">Elite Craftsmanship</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Hand-fabricated and set under stereomicroscopes by master bench jewelers with generations of combined luxury jewelry heritage.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="h-16 w-16 bg-[#0f2c59]/5 rounded-full flex items-center justify-center text-[#0f2c59]">
              <Shield size={28} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#0f2c59]">Lifetime Guarantee</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              We stand by our work. Every creation is backed by a lifetime warranty covering diamond security, professional cleaning, and annual inspection.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="h-16 w-16 bg-[#0f2c59]/5 rounded-full flex items-center justify-center text-[#0f2c59]">
              <Star size={28} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#0f2c59]">100% Ethical</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Zero earth-displacement. Grown in state-of-the-art solar-powered plasma reactors with entirely ethical, carbon-neutral lab practices.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Heritage Section */}
      <section className="bg-[#0f2c59] text-white py-24" id="about">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[550px] bg-gray-950 rounded-sm overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-70" />
            <div className="absolute inset-0 bg-[#0f2c59]/10" />
          </div>

          <div className="flex flex-col space-y-6">
            <span className="text-[#c8a35f] text-xs font-semibold tracking-[0.3em] uppercase">THE LUX GROWN PROMISE</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight">Masterpieces Born of Light and Science</h2>
            <div className="w-16 h-[2.5px] bg-[#c8a35f]" />
            <p className="text-sm text-gray-300 leading-relaxed font-light tracking-wide">
              Lab-grown diamonds are not synthetic; they are genuine diamonds containing identical crystalline carbon configurations. By mimicking the deep thermodynamic conditions of the mantle inside precision reactors, we crystallize pure diamonds with supreme optical purity.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed font-light tracking-wide">
              By removing traditional mining intermediaries, we offer breathtakingly sized solitaire stones, tennis bands, and halos crafted in solid platinum or 18K gold. This is the luxury of the modern connoisseur: uncompromising visual fire, pristine origin, and exceptional value.
            </p>
            <div className="pt-4">
              <Link to="/shop" className="inline-flex items-center text-xs tracking-[0.2em] uppercase font-semibold text-[#c8a35f] hover:text-white transition-colors gap-2">
                BROWSE EXQUISITE COLLECTIONS <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Review Testimonials Section */}
      <section className="py-24 bg-[#fdfbf7]" id="testimonials_section">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-[#c8a35f] text-xs font-semibold tracking-[0.25em] uppercase">CLIENT EXPERIENCES</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0f2c59] font-semibold mt-2 mb-12 tracking-tight">HEARD FROM THE ELITE</h2>
          
          <div className="min-h-[220px] flex flex-col justify-center items-center">
            <div className="flex justify-center text-[#c8a35f] gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#c8a35f" />)}
            </div>
            
            <p className="font-serif text-lg md:text-xl text-gray-700 italic max-w-3xl leading-relaxed tracking-wide">
              "{reviews[activeReviewIndex].comment}"
            </p>
            
            <div className="mt-8 flex flex-col items-center">
              <span className="text-sm font-semibold text-[#0f2c59] uppercase tracking-widest">{reviews[activeReviewIndex].name}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-mono">{reviews[activeReviewIndex].role}</span>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-10">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReviewIndex(idx)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${activeReviewIndex === idx ? 'bg-[#0f2c59] w-6' : 'bg-[#0f2c59]/25'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Concierge Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-gray-100" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Details */}
          <div className="flex flex-col space-y-8">
            <div>
              <span className="text-[#c8a35f] text-xs font-semibold tracking-[0.25em] uppercase">CLIENT CONCIERGE</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0f2c59] font-bold mt-2 tracking-tight">CONTACT OUR SALON</h2>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed max-w-md tracking-wide">
                Our certified gemologists and bespoke jewelry consultants are standing by to guide your selection, help arrange size consults, or plan custom laser engravings.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-[#0f2c59]/5 rounded-sm flex items-center justify-center text-[#0f2c59] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#0f2c59]">The Flagship Salon</h4>
                  <p className="text-xs text-gray-500 mt-1">720 Fifth Avenue, 14th Floor, New York, NY 10019</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-[#0f2c59]/5 rounded-sm flex items-center justify-center text-[#0f2c59] shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#0f2c59]">Bespoke Consultation Lines</h4>
                  <p className="text-xs text-gray-500 mt-1">+1 (800) 589-4769 (1-800-LUX-GROWN)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-[#0f2c59]/5 rounded-sm flex items-center justify-center text-[#0f2c59] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#0f2c59]">Direct Inquiries</h4>
                  <p className="text-xs text-gray-500 mt-1">concierge@luxgrown.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#fcfbf9] border border-gray-100 rounded-sm p-8 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#0f2c59] mb-6">Inquire Online</h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-sans tracking-wider text-gray-500 uppercase font-medium mb-1.5">FULL NAME</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g. Charlotte Montgomery"
                  className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm text-xs font-sans tracking-wider focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans tracking-wider text-gray-500 uppercase font-medium mb-1.5">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="e.g. charlotte@domain.com"
                  className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm text-xs font-sans tracking-wider focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans tracking-wider text-gray-500 uppercase font-medium mb-1.5">DETAILED INQUIRY</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="PLEASE SPECIFY METAL CHOICES, CARAT PREFERENCES, OR RE-SIZING REQUESTS..."
                  className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm text-xs font-sans tracking-wider focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800 uppercase"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0f2c59] hover:bg-[#c8a35f] text-white py-3.5 rounded-sm font-sans text-xs tracking-widest uppercase transition-all duration-300"
                id="contact_submit_btn"
              >
                SUBMIT SECURE INQUIRY
              </button>

              {contactSubmitted && (
                <div className="p-3 bg-green-50 text-green-700 text-[11px] uppercase tracking-wider font-medium text-center rounded-sm border border-green-200 mt-2 animate-pulse">
                  ✓ Message transmitted securely. A gemologist will contact you shortly.
                </div>
              )}
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
