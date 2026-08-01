import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Product, Review } from '../types';
import SEO from '../components/SEO';
import { Heart, ShoppingBag, Star, Sparkles, Plus, Minus } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, addToCart, toggleWishlist, wishlist, products, user, fetchReviews, addReview } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState('');
  const [selectedMetal, setSelectedMetal] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  // Interactive zoom states
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [zoomed, setZoomed] = useState(false);

  // Review submission state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Load product, reviews, and related items
  useEffect(() => {
    if (id) {
      const loadData = async () => {
        const prod = await fetchProductById(id);
        if (prod) {
          setProduct(prod);
          setActiveImage(prod.images[0]);
          setSelectedMetal(prod.metal);
          
          // Load reviews
          const revs = await fetchReviews(id);
          setReviews(revs);

          // Related items (same category, different id)
          if (products && products.length > 0) {
            const rel = products.filter(p => p.category === prod.category && (p._id !== prod._id && p.id !== prod.id));
            setRelatedProducts(rel.slice(0, 4));
          }
        }
      };
      loadData();
    }
  }, [id, products]);

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to submit a review.");
      return;
    }
    if (id && newComment.trim()) {
      const ok = await addReview(id, newRating, newComment.trim());
      if (ok) {
        setReviewSubmitted(true);
        setNewComment('');
        setNewRating(5);
        // refresh reviews
        const revs = await fetchReviews(id);
        setReviews(revs);
        setTimeout(() => setReviewSubmitted(false), 4000);
      }
    }
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center font-sans">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0f2c59] border-r-transparent align-[-0.125em]" />
        <p className="mt-4 text-xs text-gray-500 uppercase tracking-widest">TRANSMITTING SECURE FACET DETAILS...</p>
      </div>
    );
  }

  const isStarred = wishlist.includes(product._id || product.id || '');
  const metals = ["Platinum", "18K Yellow Gold", "18K White Gold", "Rose Gold"];
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images || [activeImage],
    "description": product.description || `Exquisite ${product.name} crafted in certified lab grown diamonds.`,
    "sku": product._id || product.id,
    "brand": {
      "@type": "Brand",
      "name": "Lux Grown"
    },
    "offers": {
      "@type": "Offer",
      "url": `${origin}/shop/${product._id || product.id}`,
      "priceCurrency": "USD",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <div className="w-full bg-white py-12 px-6 md:px-12 max-w-7xl mx-auto font-sans" id="product_detail_root">
      <SEO 
        title={`${product.name} - Certified Lab Diamond`}
        description={`Buy ${product.name} at Lux Grown. ${product.description || 'Master-crafted lab grown diamond jewelry with IGI/GIA certificate.'}`}
        keywords={`${product.name}, ${product.shape || ''} diamond, ${product.category}, lab grown diamond`}
        canonicalUrl={`${origin}/shop/${product._id || product.id}`}
        ogImage={activeImage || (product.images && product.images[0])}
        schemaJson={productSchema}
      />
      
      {/* Breadcrumb & Go Back */}
      <div className="flex items-center gap-2 text-[10px] text-gray-400 tracking-widest uppercase mb-10">
        <Link to="/" className="hover:text-black">HOME</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-black">SHOP</Link>
        <span>/</span>
        <span className="text-[#0f2c59] font-semibold">{product.category}</span>
        <span>/</span>
        <span className="text-gray-600 truncate max-w-[150px]">{product.name}</span>
      </div>

      {/* Main Grid: Images & Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-gray-100">
        
        {/* Left Side: Thumbnail List & Main Canvas Zoom (Columns 1-7) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Thumbnails list (md:col-span-2) */}
          <div className="md:col-span-2 order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`h-20 w-20 md:w-full shrink-0 border rounded-sm overflow-hidden bg-gray-50 transition-all ${activeImage === img ? 'border-[#0f2c59] p-0.5' : 'border-gray-100 opacity-75 hover:opacity-100'}`}
                id={`thumb_btn_${idx}`}
              >
                <img src={img} alt={`${product.name} detail ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>

          {/* Main Zoom Canvas (md:col-span-10) */}
          <div className="md:col-span-10 order-1 md:order-2">
            <div 
              onMouseMove={handleZoomMove}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              className="relative h-[480px] md:h-[550px] w-full border border-gray-100 bg-[#fdfbf7] rounded-sm overflow-hidden cursor-crosshair group"
              id="main_product_zoom_frame"
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-200"
                style={zoomed ? {
                  transform: 'scale(1.85)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                } : {}}
                referrerPolicy="no-referrer"
              />
              
              {/* Cover Pill */}
              <span className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md border border-gray-200 text-[8px] font-semibold text-[#0f2c59] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm select-none pointer-events-none">
                {zoomed ? "FACET ZOOM ACTIVE" : "HOVER TO INSPECT FACETS"}
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: Configuration & Add to Bag (Columns 8-12) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div>
            <span className="text-[10px] tracking-widest text-[#c8a35f] font-mono uppercase font-semibold">{product.category} COLLECTION</span>
            <h1 className="font-serif text-2xl md:text-3xl text-[#0f2c59] font-bold tracking-tight mt-1">{product.name}</h1>
            
            {/* Reviews aggregate count */}
            <div className="flex items-center gap-1.5 mt-3">
              <div className="flex text-[#c8a35f]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 5 ? "#c8a35f" : "none"} />)}
              </div>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">({reviews.length || 2} SIGNED REVIEWS)</span>
            </div>
          </div>

          {/* Price Tag */}
          <div className="border-y border-gray-100 py-4 flex items-baseline justify-between">
            <span className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">COMPLIMENTARY VALUE</span>
            <span className="font-mono text-2xl font-bold text-[#1a1a1a]">${product.price.toLocaleString()}</span>
          </div>

          {/* Narrative description */}
          <p className="text-xs text-gray-500 leading-relaxed tracking-wide">
            {product.description}
          </p>

          {/* Metal setting selection options */}
          <div>
            <span className="text-[10px] tracking-widest text-gray-400 uppercase font-mono font-semibold block mb-2.5">
              PRECIOUS METAL SETTING: <span className="text-[#0f2c59] font-bold font-sans">{selectedMetal}</span>
            </span>
            <div className="flex gap-2 flex-wrap">
              {metals.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMetal(m)}
                  className={`border px-3 py-2 text-[10px] tracking-widest font-sans uppercase rounded-xs transition-colors ${selectedMetal === m ? 'border-[#0f2c59] bg-[#0f2c59] text-white font-bold' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                  id={`metal_btn_${m.replace(/ /g, '_')}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Action row */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            {/* Qty count control */}
            <div className="flex items-center border border-gray-200 rounded-sm">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="p-3 text-gray-500 hover:text-black hover:bg-gray-50 focus:outline-none"
                id="qty_minus_btn"
              >
                <Minus size={12} />
              </button>
              <span className="px-4 text-xs font-mono font-semibold text-[#0f2c59]">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="p-3 text-gray-500 hover:text-black hover:bg-gray-50 focus:outline-none"
                id="qty_plus_btn"
              >
                <Plus size={12} />
              </button>
            </div>

            {/* Main Checkout button */}
            <button
              onClick={() => addToCart(product, quantity, selectedMetal)}
              className="flex-grow bg-[#0f2c59] hover:bg-[#c8a35f] text-white py-4 px-6 rounded-sm font-sans text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-3 shadow-md"
              id="add_to_bag_detail_btn"
            >
              <ShoppingBag size={14} /> ADD TO SECURE BAG
            </button>

            {/* Star wishlist button */}
            <button
              onClick={() => toggleWishlist(product._id || product.id || '')}
              className={`p-3.5 border rounded-sm transition-all focus:outline-none ${isStarred ? 'bg-[#0f2c59]/5 border-[#0f2c59]/25 text-[#c8a35f]' : 'border-gray-200 text-gray-400 hover:text-[#0f2c59]'}`}
              id="wishlist_toggle_detail_btn"
            >
              <Heart size={16} fill={isStarred ? "#c8a35f" : "none"} />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="bg-[#fdfbf7] p-4 rounded-sm border border-[#c8a35f]/10 text-[10px] tracking-wide text-gray-500 space-y-2 font-sans">
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-[#c8a35f]" />
              <span>INCLUDES GIA/IGS SPECIFICATION AUDIT CERTIFICATE</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-[#c8a35f]" />
              <span>FREE ARMORED BRINKS DELIVERY WITH SIGNATURE REQUIRED</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-[#c8a35f]" />
              <span>30-DAY COMPLIMENTARY SIZE EXCHANGE & RETURN PLAN</span>
            </div>
          </div>

        </div>

      </div>

      {/* Section 2: Comprehensive specifications details table */}
      <section className="py-16 border-b border-gray-100" id="specifications_section">
        <h3 className="font-serif text-lg font-bold text-[#0f2c59] tracking-wide mb-8 uppercase">
          {product.category === 'Watches' ? 'HOROLOGICAL SPECIFICATIONS' : 'GEMOLOGICAL CLASSIFICATIONS'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {product.category === 'Watches' ? (
            <>
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Manufacturer / Brand</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.brand || 'Rolex'}</p>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Design Audience / Gender</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.gender || 'Men’s'}</p>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Specimen Condition</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.condition || 'New'}</p>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Case Dimension</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.caseSize || '40–42mm'}</p>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Caliber Movement</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.movement || 'Automatic'}</p>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Strap / Band Material</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.bandMaterial || 'Stainless Steel'}</p>
              </div>

              <div className="border-b border-gray-100 pb-4 col-span-1 md:col-span-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Aesthetic Classification / Style</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.style || 'Dress'}</p>
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Carbon Cut Shape</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.shape}</p>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Prong Setting Geometry</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.setting}</p>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Facet Clarity Grade</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.clarity}</p>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Color Spectrum Grade</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.color} (COLORLESS)</p>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Diamond Carats</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{product.orientation}</p>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Solid Setting Material</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1 uppercase">{selectedMetal}</p>
              </div>

              <div className="border-b border-gray-100 pb-4 col-span-1 md:col-span-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Detailed Laser Inscription Specifications</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-1">{product.stoneDetails}</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section 3: Customer Reviews */}
      <section className="py-16 border-b border-gray-100" id="reviews_section">
        <h3 className="font-serif text-lg font-bold text-[#0f2c59] tracking-wide mb-8 uppercase">CLIENT RATINGS & REVIEWS</h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Reviews list (Columns 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            {reviews.length === 0 ? (
              <div className="text-gray-400 text-xs uppercase tracking-widest py-6">
                No verified reviews found. Be the first to review this creation.
              </div>
            ) : (
              reviews.map((rev) => (
                <div key={rev._id || rev.id} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0f2c59] uppercase tracking-wider">{rev.userName}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                  </div>
                  <div className="flex text-[#c8a35f] mt-1.5 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < rev.rating ? "#c8a35f" : "none"} />)}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed tracking-wide italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form (Columns 8-12) */}
          <div className="lg:col-span-5 bg-[#fcfbf9] border border-gray-100 p-6 rounded-sm">
            <h4 className="font-serif text-sm font-bold text-[#0f2c59] mb-4 uppercase">AUTHOR A REVIEW</h4>
            
            {user ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1">Star Assessment</label>
                  <div className="flex gap-1 text-[#c8a35f]">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        type="button"
                        key={stars}
                        onClick={() => setNewRating(stars)}
                        className="p-0.5 focus:outline-none"
                      >
                        <Star size={16} fill={stars <= newRating ? "#c8a35f" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-widest text-gray-400 uppercase font-mono mb-1.5">GEM COMMENTS</label>
                  <textarea
                    required
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="DESCRIBE BRILLIANCE, SETTING COMFORT, OR SHIPPING TIMING..."
                    className="w-full bg-white border border-gray-200 p-3 text-xs tracking-wider focus:outline-none focus:border-[#0f2c59] placeholder-gray-400 text-gray-800 uppercase"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0f2c59] hover:bg-[#c8a35f] text-white py-2.5 text-xs tracking-widest uppercase rounded-sm font-semibold transition-colors"
                  id="submit_review_btn"
                >
                  TRANSMIT REVIEW
                </button>

                {reviewSubmitted && (
                  <div className="text-green-700 text-[10px] text-center mt-2 uppercase tracking-widest animate-pulse font-medium">
                    ✓ Thank you! Review submitted for specification verification.
                  </div>
                )}
              </form>
            ) : (
              <div className="text-center py-6 text-gray-500 text-xs">
                <p className="uppercase tracking-widest">Login required to write a review.</p>
                <Link to="/account" className="mt-4 inline-block bg-[#0f2c59] hover:bg-[#c8a35f] text-white px-5 py-2 uppercase tracking-widest text-[10px] rounded-sm transition-colors">
                  SIGN IN SECURELY
                </Link>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Section 4: Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-16">
          <h3 className="font-serif text-lg font-bold text-[#0f2c59] tracking-wide mb-8 uppercase text-center">COMPLEMENTARY SPECIMENS</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <div key={p._id || p.id} className="group flex flex-col bg-white border border-gray-50 rounded-sm p-3 hover:shadow-xl transition-all duration-300">
                <Link to={`/shop/${p._id || p.id}`} className="relative h-48 overflow-hidden bg-gray-50 rounded-sm block">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                </Link>
                <div className="mt-4 flex flex-col flex-grow">
                  <span className="text-[8px] tracking-widest text-[#c8a35f] font-mono uppercase font-semibold">{p.category}</span>
                  <Link to={`/shop/${p._id || p.id}`} className="font-serif text-xs font-semibold text-[#0f2c59] hover:text-[#c8a35f] transition-colors mt-0.5 line-clamp-1">
                    {p.name}
                  </Link>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <span className="font-mono text-xs font-semibold">${p.price.toLocaleString()}</span>
                    <Link to={`/shop/${p._id || p.id}`} className="text-[#0f2c59] hover:text-[#c8a35f] text-[9px] tracking-widest uppercase font-semibold">EXPLORE</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
