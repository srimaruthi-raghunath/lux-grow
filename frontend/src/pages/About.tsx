import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Award, ShieldCheck, Gem, Sparkles, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function About() {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Lux Grown - Ethical Lab-Grown Diamonds",
    "url": `${origin}/about`,
    "description": "Learn about Lux Grown's mission to craft ethical, conflict-free, master-grade lab grown diamond jewelry with certified gemological precision.",
    "publisher": {
      "@type": "Organization",
      "name": "Lux Grown Lab Diamonds",
      "logo": `${origin}/logo.png`
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900" id="about_page">
      <SEO 
        title="About Us - Ethical Luxury Lab-Grown Diamonds"
        description="Discover the story of Lux Grown. We engineer and handcraft sustainable, conflict-free lab grown diamond jewelry with IGI and GIA certified perfection."
        keywords="about lux grown, lab grown diamond science, ethical diamonds, conflict free engagement rings, sustainable jewelry brand"
        canonicalUrl={`${origin}/about`}
        schemaJson={aboutSchema}
      />

      {/* Hero Banner Section */}
      <section className="relative bg-[#0f2c59] text-white py-24 md:py-32 overflow-hidden border-b border-[#c8a35f]/20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c8a35f_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="font-sans text-xs tracking-[0.3em] text-[#c8a35f] uppercase font-semibold">
            THE REVOLUTION OF ETHICAL LUXURY
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-4 mb-6 leading-tight">
            Crafting Tomorrow’s Legacy Today
          </h1>
          <p className="font-sans text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed tracking-wide">
            Lux Grown was founded on a singular conviction: luxury should never cost the Earth. We fuse advanced gemological plasma science with heritage bench craftsmanship to produce diamonds indistinguishable from mined stones.
          </p>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="font-sans text-xs tracking-[0.25em] text-[#c8a35f] uppercase font-bold">
            OUR GENESIS & PHILOSOPHY
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#0f2c59] leading-snug">
            Zero Compromise. Pure Perfection.
          </h2>
          <p className="font-sans text-gray-600 text-sm leading-relaxed">
            Traditional diamond mining has long cast a shadow over human rights and delicate ecosystems. At Lux Grown, our lab-grown diamonds are grown using state-of-the-art Chemical Vapor Deposition (CVD) and High-Pressure High-Temperature (HPHT) techniques that replicate the thermal pressure beneath Earth's mantle.
          </p>
          <p className="font-sans text-gray-600 text-sm leading-relaxed">
            The result? Chemically, physically, and optically identical carbon crystals with superior clarity, purer crystal lattice structures, and a 100% conflict-free origin guarantee.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-gray-100">
            <div>
              <span className="font-serif text-3xl font-bold text-[#0f2c59]">100%</span>
              <p className="font-sans text-xs text-gray-500 uppercase tracking-wider mt-1">Conflict-Free & Sustainable</p>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-[#0f2c59]">Type IIa</span>
              <p className="font-sans text-xs text-gray-500 uppercase tracking-wider mt-1">Pures Carbon Composition</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-sm overflow-hidden bg-gray-100 shadow-xl border border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80" 
              alt="Lux Grown Master Gemologist Crafting Jewelry" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[#0f2c59] text-white p-6 shadow-2xl rounded-sm max-w-xs hidden sm:block border-l-4 border-[#c8a35f]">
            <p className="font-serif text-sm italic text-gray-200">
              "We don't just sell diamonds; we curate moments of eternal love without leaving a footprint."
            </p>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#c8a35f] mt-3 block">
              — Lux Grown Master Bench Artisan
            </span>
          </div>
        </div>
      </section>

      {/* Science vs Mining Comparison */}
      <section className="bg-gray-50 py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans text-xs tracking-[0.25em] text-[#c8a35f] uppercase font-bold">
              GEMOLOGICAL AUTHENTICITY
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0f2c59] mt-2 mb-4">
              Mined Diamonds vs. Lux Grown Lab Diamonds
            </h2>
            <p className="font-sans text-xs md:text-sm text-gray-600 tracking-wide">
              Even seasoned gemologists cannot distinguish a Lux Grown diamond without specialized spectroscopic equipment. Every piece possesses identical hardness (10 on Mohs scale), sparkle, refractive index, and dispersion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#0f2c59]/5 text-[#0f2c59] rounded-full flex items-center justify-center mb-6">
                <Gem size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0f2c59] mb-3">100% Real Carbon</h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                Made of pure crystallized carbon atoms arranged in a cubic lattice, matching exact chemical formula (C) as Earth-mined stones.
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#0f2c59]/5 text-[#0f2c59] rounded-full flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0f2c59] mb-3">IGI & GIA Certified</h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                Every solitaire diamond above 0.5 carats is individually laser inscribed and graded by international independent gem labs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#0f2c59]/5 text-[#0f2c59] rounded-full flex items-center justify-center mb-6">
                <RefreshCw size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0f2c59] mb-3">Eco-Conscious Value</h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                Receive up to 40% more carat size for your budget while preserving pristine ecosystems and water resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Pillars / Quality Guarantees */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-sans text-xs tracking-[0.25em] text-[#c8a35f] uppercase font-bold">
              THE LUX GROWN STANDARDS
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0f2c59] mt-2 mb-6">
              Our Unwavering Promises to You
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 size={20} className="text-[#c8a35f] shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#0f2c59]">Lifetime Warranty & Free Maintenance</h4>
                  <p className="font-sans text-xs text-gray-600 mt-0.5">Free annual inspections, prong tightening, steam cleaning, and rhodium replating for life.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 size={20} className="text-[#c8a35f] shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#0f2c59]">30-Day Hassle-Free Returns & Exchanges</h4>
                  <p className="font-sans text-xs text-gray-600 mt-0.5">Order with full peace of mind with insured complimentary return shipping and full refund policy.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 size={20} className="text-[#c8a35f] shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#0f2c59]">Complimentary Insured Dispatch</h4>
                  <p className="font-sans text-xs text-gray-600 mt-0.5">All orders above $2,000 are shipped via armored transit with full signature requirement insurance.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f2c59] text-white p-10 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles size={160} className="text-[#c8a35f]" />
            </div>
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#c8a35f] uppercase font-semibold">
              BESPOKE GEMOLOGY CONCIERGE
            </span>
            <h3 className="font-serif text-2xl font-bold mt-2 mb-4">
              Need Personal Guidance Choosing a Diamond?
            </h3>
            <p className="font-sans text-xs text-gray-300 leading-relaxed mb-8">
              Speak directly with our certified diamond specialists. Whether selecting an engagement ring setting or matching cut proportions, we provide 1-on-1 consultations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="bg-[#c8a35f] text-white px-6 py-3 rounded-sm font-sans text-xs tracking-widest font-semibold uppercase hover:bg-white hover:text-[#0f2c59] transition-colors flex items-center gap-2"
              >
                Contact Concierge <ArrowRight size={14} />
              </Link>
              <Link 
                to="/shop" 
                className="border border-white/30 text-white px-6 py-3 rounded-sm font-sans text-xs tracking-widest uppercase hover:bg-white/10 transition-colors"
              >
                Explore Shop
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
