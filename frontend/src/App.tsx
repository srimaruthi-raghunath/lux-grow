import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { toast, showToast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900" id="lux_app_content">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Premium Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white border border-[#c8a35f]/20 shadow-2xl p-4 rounded-sm flex items-start gap-3"
            id="global_toast_banner"
          >
            {/* Type Icons */}
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 size={16} className="text-green-600" />}
              {toast.type === 'error' && <AlertCircle size={16} className="text-red-500" />}
              {toast.type === 'info' && <Info size={16} className="text-[#c8a35f]" />}
            </div>

            {/* Message Body */}
            <div className="flex-grow text-xs font-sans tracking-wide uppercase text-gray-800 font-semibold leading-normal">
              {toast.message}
            </div>

            {/* Close trigger */}
            <button 
              onClick={() => showToast('', 'info')} 
              className="shrink-0 text-gray-400 hover:text-black focus:outline-none"
              aria-label="Dismiss Toast"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
