import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Product } from '../types';
import SEO from '../components/SEO';
import { SlidersHorizontal, Search, X, Heart, Eye } from 'lucide-react';

export default function Shop() {
  const { products, fetchProducts, addToCart, toggleWishlist, wishlist } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // States for filter selections
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedShape, setSelectedShape] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedClarity, setSelectedClarity] = useState('');
  const [priceRange, setPriceRange] = useState<number>(30000);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('newest');

  // Sync params from URL
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const q = searchParams.get('search') || '';
    if (cat) setSelectedCategory(cat);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Fetch products on query state changes or load
  useEffect(() => {
    fetchProducts({
      category: selectedCategory || undefined,
      search: searchQuery || undefined
    });
  }, [selectedCategory, searchQuery]);

  // Filter products client-side for ultra-detailed criteria (Metal, Shape, Color, Clarity, Price)
  const filteredProducts = products.filter(p => {
    if (selectedMetal && !p.metal.toLowerCase().includes(selectedMetal.toLowerCase())) return false;
    if (selectedShape && !p.shape.toLowerCase().includes(selectedShape.toLowerCase())) return false;
    if (selectedColor && p.color !== selectedColor) return false;
    if (selectedClarity && p.clarity !== selectedClarity) return false;
    if (p.price > priceRange) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'bestseller') return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
    return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime(); // default: newest
  });

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedMetal('');
    setSelectedShape('');
    setSelectedColor('');
    setSelectedClarity('');
    setPriceRange(30000);
    setSearchQuery('');
    setSearchParams({});
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  // Static options
  const categories = ['Jewelry', 'Watches'];
  const metals = ['Platinum', 'Yellow Gold', 'White Gold', 'Rose Gold'];
  const shapes = ['Round', 'Oval', 'Emerald', 'Pear', 'Cushion', 'Princess'];
  const colors = ['D', 'E', 'F', 'G', 'H'];
  const clarities = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2'];

  return (
    <div className="w-full bg-white py-12 px-6 md:px-12 max-w-7xl mx-auto font-sans" id="shop_page_root">
      <SEO 
        title={selectedCategory ? `Shop ${selectedCategory} - Lab-Grown Diamonds` : "Shop Fine Lab-Grown Diamond Jewelry & Watches"}
        description="Browse our curated collection of certified lab-grown diamond engagement rings, solitaires, pendants, earrings, and luxury watches."
        keywords="lab grown diamond shop, diamond rings, solitaire engagement rings, luxury watches, certified diamonds"
      />
      {/* Banner Title */}
      <div className="text-center mb-12" id="shop_title_banner">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0f2c59] font-bold tracking-tight">
          {selectedCategory ? `${selectedCategory.toUpperCase()} COLLECTION` : "THE FULL DIAMOND BOUTIQUE"}
        </h1>
        <p className="text-xs text-gray-500 mt-3 uppercase tracking-[0.25em]">
          Master-crafted GIA and IGS certified Lab Grown Diamonds
        </p>
      </div>

      {/* Top Filter and Search Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-y border-gray-100 py-4 mb-8">
        {/* Toggle Filters Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 border border-gray-200 hover:border-[#0f2c59] text-xs font-semibold tracking-wider px-5 py-2.5 rounded-sm uppercase transition-colors text-[#0f2c59] shrink-0"
          id="toggle_filters_btn"
        >
          <SlidersHorizontal size={14} />
          {isFilterOpen ? "HIDE DETAILED FILTERS" : "SHOW DETAILED FILTERS"}
        </button>

        {/* Live Search Form */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="SEARCH SOLITAIRES, CARATS, SHAPES..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 px-4 py-2.5 pl-10 text-xs tracking-widest focus:outline-none focus:border-[#0f2c59] uppercase text-gray-700"
          />
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          {searchQuery && (
            <button type="button" onClick={() => { setSearchQuery(''); setSearchParams({}); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
              <X size={14} />
            </button>
          )}
        </form>

        {/* Sort Menu */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] tracking-wider text-gray-400 uppercase">SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 px-3 py-2 text-xs tracking-wider uppercase text-gray-700 focus:outline-none focus:border-[#0f2c59] bg-transparent"
            id="shop_sort_select"
          >
            <option value="newest">NEW ARRIVALS</option>
            <option value="price-asc">PRICE: LOW TO HIGH</option>
            <option value="price-desc">PRICE: HIGH TO LOW</option>
          </select>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Filter Drawer Sidebar */}
        {isFilterOpen && (
          <div className="w-full lg:w-64 shrink-0 bg-[#fdfbf7] p-6 rounded-sm border border-[#c8a35f]/15" id="shop_filters_sidebar">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
              <h3 className="font-serif text-sm font-bold text-[#0f2c59] tracking-wide">GEM FILTERS</h3>
              <button onClick={resetFilters} className="text-[10px] text-[#c8a35f] hover:text-[#0f2c59] font-semibold tracking-wider uppercase focus:outline-none">
                RESET ALL
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-[10px] font-semibold tracking-wider uppercase text-gray-400 mb-2.5">Category</h4>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => { setSelectedCategory(''); setSearchParams({}); }}
                  className={`text-left text-xs tracking-wider py-1 hover:text-[#0f2c59] uppercase ${!selectedCategory ? 'text-[#c8a35f] font-bold' : 'text-gray-600'}`}
                >
                  All Jewelry
                </button>
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => { setSelectedCategory(c); setSearchParams({ category: c }); }}
                    className={`text-left text-xs tracking-wider py-1 hover:text-[#0f2c59] uppercase ${selectedCategory === c ? 'text-[#c8a35f] font-bold' : 'text-gray-600'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Metal Filter */}
            <div className="mb-6 border-t border-gray-100 pt-5">
              <h4 className="text-[10px] font-semibold tracking-wider uppercase text-gray-400 mb-2.5">Metal Setting</h4>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setSelectedMetal('')}
                  className={`text-left text-xs tracking-wider py-1 hover:text-[#0f2c59] uppercase ${!selectedMetal ? 'text-[#c8a35f] font-bold' : 'text-gray-600'}`}
                >
                  All Metals
                </button>
                {metals.map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedMetal(m)}
                    className={`text-left text-xs tracking-wider py-1 hover:text-[#0f2c59] uppercase ${selectedMetal === m ? 'text-[#c8a35f] font-bold' : 'text-gray-600'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Filter */}
            <div className="mb-6 border-t border-gray-100 pt-5">
              <h4 className="text-[10px] font-semibold tracking-wider uppercase text-gray-400 mb-2.5">Diamond Shape</h4>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedShape(selectedShape === s ? '' : s)}
                    className={`border px-2 py-1.5 text-[10px] tracking-widest text-center uppercase rounded-xs transition-colors ${selectedShape === s ? 'border-[#0f2c59] bg-[#0f2c59] text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Grade Filter */}
            <div className="mb-6 border-t border-gray-100 pt-5">
              <h4 className="text-[10px] font-semibold tracking-wider uppercase text-gray-400 mb-2.5">Color Grade (D - H)</h4>
              <div className="grid grid-cols-5 gap-1.5">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(selectedColor === c ? '' : c)}
                    className={`border py-2 text-[10px] font-mono text-center rounded-xs transition-colors ${selectedColor === c ? 'border-[#0f2c59] bg-[#0f2c59] text-white font-bold' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Clarity Grade Filter */}
            <div className="mb-6 border-t border-gray-100 pt-5">
              <h4 className="text-[10px] font-semibold tracking-wider uppercase text-gray-400 mb-2.5">Clarity Grade</h4>
              <div className="grid grid-cols-3 gap-1.5">
                {clarities.map(cl => (
                  <button
                    key={cl}
                    onClick={() => setSelectedClarity(selectedClarity === cl ? '' : cl)}
                    className={`border py-1.5 text-[9px] font-mono text-center rounded-xs transition-colors ${selectedClarity === cl ? 'border-[#0f2c59] bg-[#0f2c59] text-white font-bold' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'}`}
                  >
                    {cl}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[10px] font-semibold tracking-wider uppercase text-gray-400">Max Budget</h4>
                <span className="font-mono text-xs font-semibold text-[#0f2c59]">${priceRange.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0f2c59]"
              />
              <div className="flex justify-between text-[8px] text-gray-400 font-mono mt-1">
                <span>$1,000</span>
                <span>$30,000+</span>
              </div>
            </div>

          </div>
        )}

        {/* Right Dynamic Products Catalog Grid */}
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-gray-50 border border-dashed border-gray-200 rounded-sm" id="shop_empty_state">
              <p className="font-serif text-lg text-gray-500">No diamond creations match your search parameters.</p>
              <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Try adjusting filters or searching a different carat weight.</p>
              <button
                onClick={resetFilters}
                className="bg-[#0f2c59] text-white font-sans text-[10px] tracking-widest uppercase px-6 py-3 mt-6 hover:bg-[#c8a35f] transition-all rounded-sm"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div>
              {/* Product Counter */}
              <div className="text-xs text-gray-400 tracking-wider mb-6 uppercase flex items-center justify-between">
                <span>EXHIBITING {sortedProducts.length} LUXURY PIECES</span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="shop_products_grid">
                {sortedProducts.map((p) => {
                  const isStarred = wishlist.includes(p._id || p.id || '');
                  return (
                    <div 
                      key={p._id || p.id} 
                      className="group flex flex-col bg-white border border-gray-100 rounded-sm p-4 hover:shadow-2xl transition-all duration-500 relative"
                      id={`prod_card_${p._id || p.id}`}
                    >
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleWishlist(p._id || p.id || '')}
                        className={`absolute top-6 right-6 z-10 p-2 rounded-full border shadow-sm transition-all duration-300 focus:outline-none ${isStarred ? 'bg-[#0f2c59]/5 border-[#0f2c59]/20 text-[#c8a35f]' : 'bg-white border-gray-100 text-gray-400 hover:text-red-500'}`}
                        id={`wishlist_toggle_${p._id}`}
                        aria-label="Wishlist Toggle"
                      >
                        <Heart size={14} fill={isStarred ? "#c8a35f" : "none"} />
                      </button>

                      {/* Cover Photo */}
                      <Link to={`/shop/${p._id || p.id}`} className="relative h-64 overflow-hidden bg-gray-50 rounded-sm block">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {p.bestseller && (
                          <span className="absolute top-3 left-3 bg-[#0f2c59] text-[#c8a35f] text-[8px] tracking-widest font-semibold px-2 py-1 uppercase rounded-xs">
                            NEW ARRIVAL
                          </span>
                        )}
                      </Link>

                      {/* Meta Details */}
                      <div className="mt-5 flex flex-col flex-grow">
                        <span className="text-[9px] tracking-widest text-[#c8a35f] font-mono uppercase font-semibold">{p.category}</span>
                        <Link to={`/shop/${p._id || p.id}`} className="font-serif text-sm font-semibold text-[#0f2c59] hover:text-[#c8a35f] transition-colors mt-1 line-clamp-1">
                          {p.name}
                        </Link>
                        
                        <span className="text-xs text-gray-500 font-sans mt-2 line-clamp-2 leading-relaxed flex-grow">
                          {p.description}
                        </span>

                        {/* Specs row */}
                        <div className="flex gap-2.5 mt-3 pt-3 border-t border-gray-50 text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                          <span>{p.shape}</span>
                          <span>•</span>
                          <span>{p.color} COLOR</span>
                          <span>•</span>
                          <span>{p.clarity}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <span className="font-mono text-xs font-semibold text-[#1a1a1a]">${p.price.toLocaleString()}</span>
                          <div className="flex gap-2">
                            <Link 
                              to={`/shop/${p._id || p.id}`}
                              className="border border-gray-200 hover:border-[#0f2c59] text-[#0f2c59] p-1.5 rounded-sm transition-colors"
                              title="Quick View"
                            >
                              <Eye size={12} />
                            </Link>
                            <button
                              onClick={() => addToCart(p, 1, p.metal)}
                              className="bg-[#0f2c59] hover:bg-[#c8a35f] text-white px-3 py-1.5 rounded-sm font-sans text-[10px] tracking-widest uppercase transition-colors"
                              id={`add_to_cart_shop_${p._id}`}
                            >
                              ADD TO BAG
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
