import React, { useState } from 'react';
import SEO from '../components/SEO';
import { useApp } from '../AppContext';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ChevronDown, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const { showToast } = useApp();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Custom Design Consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been dispatched to our Gemological Concierge.', 'success');
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Lux Grown - Lab Diamond Concierge",
    "url": `${origin}/contact`,
    "description": "Get in touch with Lux Grown certified gemologists for diamond inquiries, custom jewelry design, order status, or boutique appointments.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Lux Grown Lab Diamonds",
      "telephone": "+1-800-589-4769",
      "email": "concierge@luxgrown.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "580 Fifth Avenue, Suite 2400",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10036",
        "addressCountry": "US"
      }
    }
  };

  const faqs = [
    {
      question: "Are your lab-grown diamonds certified by official gemological laboratories?",
      answer: "Yes, every solitaire diamond above 0.5 carats includes a physical and digital grading certificate from independent labs such as IGI (International Gemological Institute) or GIA (Gemological Institute of America). The report verifies cut, clarity, color, and carat weight."
    },
    {
      question: "How long does custom jewelry design or bespoke ring creation take?",
      answer: "Bespoke design consultations begin within 24 hours. Once 3D CAD CAD renders and diamond selection are approved, master bench jewelers craft your piece in 10-14 business days."
    },
    {
      question: "Is insured shipping included with my order?",
      answer: "All domestic and international orders exceeding $2,000 receive complimentary armored courier dispatch (FedEx Priority / Malca-Amit) with full insurance coverage and adult signature required upon arrival."
    },
    {
      question: "What is your return and resize policy?",
      answer: "We offer 30-day complimentary returns on standard catalog jewelry and timepieces in unworn condition. Ring resizings are complimentary within the first 60 days of purchase."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900" id="contact_page">
      <SEO 
        title="Contact Us - Certified Gemologist Concierge"
        description="Contact Lux Grown for personalized diamond consultations, custom engagement ring design, or order assistance. Speak with certified gemologists."
        keywords="contact lux grown, diamond consultation, custom ring appointment, lab diamond concierge, jewelry contact"
        canonicalUrl={`${origin}/contact`}
        schemaJson={contactSchema}
      />

      {/* Hero Banner Section */}
      <section className="bg-[#0f2c59] text-white py-20 md:py-28 text-center relative border-b border-[#c8a35f]/20">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="font-sans text-xs tracking-[0.3em] text-[#c8a35f] uppercase font-bold">
            CLIENT CONCIERGE & ADVISORY
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-3 mb-4">
            At Your Service
          </h1>
          <p className="font-sans text-gray-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed tracking-wide">
            Whether inquiring about custom CAD designs, matching diamond specifications, or scheduling a private showroom appointment, our team is at your disposal.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Details + Interactive Form */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-8 bg-gray-50 p-8 md:p-10 rounded-sm border border-gray-100">
          <div>
            <span className="font-sans text-xs tracking-[0.25em] text-[#c8a35f] uppercase font-bold">
              DIRECT REACH
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#0f2c59] mt-1 mb-4">
              Connect With Our Advisory
            </h2>
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              Our gemological specialists respond to all digital inquiries within 4 business hours.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-gray-200/60">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0f2c59] text-[#c8a35f] rounded-full flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="font-sans text-[10px] tracking-widest text-gray-400 uppercase font-mono">CONCIERGE HOTLINE</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-0.5">+1 (800) 589-4769</p>
                <p className="font-sans text-[11px] text-gray-500">Mon–Fri: 9:00 AM – 7:00 PM EST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0f2c59] text-[#c8a35f] rounded-full flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <span className="font-sans text-[10px] tracking-widest text-gray-400 uppercase font-mono">CLIENT EMAIL</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-0.5">concierge@luxgrown.com</p>
                <p className="font-sans text-[11px] text-gray-500">24/7 Digital Inquiry Inbox</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0f2c59] text-[#c8a35f] rounded-full flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="font-sans text-[10px] tracking-widest text-gray-400 uppercase font-mono">FLAGSHIP SHOWROOM</span>
                <p className="font-sans text-sm font-semibold text-[#0f2c59] mt-0.5">580 Fifth Avenue, Suite 2400</p>
                <p className="font-sans text-[11px] text-gray-500">Diamond District, New York, NY 10036</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0f2c59] text-[#c8a35f] rounded-full flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <span className="font-sans text-[10px] tracking-widest text-gray-400 uppercase font-mono">PRIVATE APPOINTMENTS</span>
                <p className="font-sans text-xs text-gray-600 mt-0.5">By Appointment Only for Private Diamond Viewing</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f2c59] text-white p-5 rounded-sm flex items-center gap-3 text-xs">
            <ShieldCheck size={20} className="text-[#c8a35f] shrink-0" />
            <span>Strict Client Confidentiality & Secure Data Handling Assured</span>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-sm border border-gray-100 shadow-sm">
          <span className="font-sans text-xs tracking-[0.25em] text-[#c8a35f] uppercase font-bold">
            ELECTRONIC DISPATCH
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#0f2c59] mt-1 mb-6">
            Send an Inquiry
          </h2>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-900 p-8 rounded-sm text-center space-y-4">
              <CheckCircle2 size={48} className="text-green-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold">Inquiry Successfully Dispatched</h3>
              <p className="font-sans text-xs text-green-800 max-w-md mx-auto">
                Thank you for reaching out to Lux Grown. A senior gemological advisor has been assigned to your request and will reach out shortly.
              </p>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', inquiryType: 'Custom Design Consultation', message: '' });
                }}
                className="bg-[#0f2c59] text-white px-6 py-2.5 rounded-sm font-sans text-xs tracking-widest uppercase hover:bg-[#c8a35f] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-500 uppercase font-mono mb-2">
                    FULL NAME <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 text-xs font-sans focus:outline-none focus:border-[#0f2c59] bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest text-gray-500 uppercase font-mono mb-2">
                    EMAIL ADDRESS <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="e.g. eleanor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 text-xs font-sans focus:outline-none focus:border-[#0f2c59] bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-500 uppercase font-mono mb-2">
                    PHONE NUMBER
                  </label>
                  <input 
                    type="tel"
                    placeholder="e.g. +1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 text-xs font-sans focus:outline-none focus:border-[#0f2c59] bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest text-gray-500 uppercase font-mono mb-2">
                    INQUIRY CATEGORY
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 text-xs font-sans focus:outline-none focus:border-[#0f2c59] bg-gray-50/50 uppercase"
                  >
                    <option value="Custom Design Consultation">Custom Design Consultation</option>
                    <option value="Diamond & Gemstone Specification">Diamond & Gemstone Specification</option>
                    <option value="Showroom Appointment">Showroom Appointment</option>
                    <option value="Existing Order Assistance">Existing Order Assistance</option>
                    <option value="General Concierge">General Concierge</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest text-gray-500 uppercase font-mono mb-2">
                  YOUR MESSAGE <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Detail your diamond preferences, carat goals, custom ring ideas, or specific questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-200 p-4 text-xs font-sans focus:outline-none focus:border-[#0f2c59] bg-gray-50/50 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0f2c59] text-white py-4 rounded-sm font-sans text-xs tracking-[0.2em] font-semibold uppercase hover:bg-[#c8a35f] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send size={14} /> Dispatch Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="font-sans text-xs tracking-[0.25em] text-[#c8a35f] uppercase font-bold">
              CLIENT ASSISTANCE
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0f2c59] mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200/80 rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left font-serif text-sm font-semibold text-[#0f2c59] flex items-center justify-between focus:outline-none hover:text-[#c8a35f] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-200 text-gray-400 ${activeFaq === index ? 'rotate-180 text-[#c8a35f]' : ''}`} 
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-5 font-sans text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
