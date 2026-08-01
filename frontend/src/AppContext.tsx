import React, { createContext, useState, useEffect, useContext } from 'react';
import { Product, CartItem, Order, User, Review } from './types';

const fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const baseUrl = (import.meta as any).env.VITE_API_URL || '';
  const url = typeof input === 'string' && input.startsWith('/api') 
    ? `${baseUrl}${input}` 
    : input;
  return window.fetch(url, init);
};

interface AppContextType {
  user: User | null;
  token: string | null;
  cart: CartItem[];
  wishlist: string[];
  products: Product[];
  orders: Order[];
  systemStatus: { isMongo: boolean; isFallback: boolean };
  loading: boolean;
  error: string | null;
  
  // Auth actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateSavedAddresses: (addresses: any[]) => Promise<boolean>;
  
  // Product actions
  fetchProducts: (filters?: { category?: string; search?: string; bestseller?: boolean }) => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  addProduct: (productData: Partial<Product>) => Promise<boolean>;
  updateProduct: (id: string, productData: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  deleteMultipleProducts: (ids: string[]) => Promise<boolean>;
  uploadImage: (base64Image: string) => Promise<string>;
  
  // Cart & Wishlist actions
  addToCart: (product: Product, quantity: number, metal?: string) => void;
  removeFromCart: (productId: string, metal?: string) => void;
  updateCartQty: (productId: string, quantity: number, metal?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  
  // Order actions
  placeOrder: (customerInfo: Order['customer'], paymentMethod: Order['paymentMethod']) => Promise<Order | null>;
  fetchUserOrders: () => Promise<void>;
  fetchAllOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => Promise<boolean>;
  
  // Review actions
  fetchReviews: (productId: string) => Promise<Review[]>;
  addReview: (productId: string, rating: number, comment: string) => Promise<boolean>;
  
  // Flash notifications helper
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [systemStatus, setSystemStatus] = useState({ isMongo: false, isFallback: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Auto-clear toast after 4s
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  // Check health and local storage auth on boot
  useEffect(() => {
    const checkSystemHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          setSystemStatus({
            isMongo: data.database === 'mongodb',
            isFallback: data.database === 'local-json'
          });
        }
      } catch (err) {
        console.warn("Unable to contact backend health API:", err);
      }
    };
    checkSystemHealth();

    // Recover login state
    const savedToken = localStorage.getItem('lux_token');
    const savedUser = localStorage.getItem('lux_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    // Recover cart & wishlist
    const savedCart = localStorage.getItem('lux_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedWishlist = localStorage.getItem('lux_wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    fetchProducts();
  }, []);

  // Save cart & wishlist changes
  useEffect(() => {
    localStorage.setItem('lux_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lux_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Auth Operations
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || 'Login failed', 'error');
        return false;
      }
      localStorage.setItem('lux_token', data.token);
      localStorage.setItem('lux_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      showToast(`Welcome back, ${data.user.name}!`, 'success');
      return true;
    } catch (err: any) {
      showToast('Network error during authentication', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || 'Registration failed', 'error');
        return false;
      }
      localStorage.setItem('lux_token', data.token);
      localStorage.setItem('lux_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      showToast('Account created successfully!', 'success');
      return true;
    } catch (err: any) {
      showToast('Network error during registration', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('lux_token');
    localStorage.removeItem('lux_user');
    setToken(null);
    setUser(null);
    setOrders([]);
    showToast('Signed out successfully', 'info');
  };

  const updateSavedAddresses = async (addresses: any[]): Promise<boolean> => {
    if (!token) return false;
    try {
      if (user) {
        const updatedUser = { ...user, savedAddresses: addresses };
        setUser(updatedUser);
        localStorage.setItem('lux_user', JSON.stringify(updatedUser));
        showToast('Addresses updated successfully', 'success');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Product Operations
  const fetchProducts = async (filters?: { category?: string; search?: string; bestseller?: boolean }) => {
    setLoading(true);
    try {
      let url = '/api/product/list?';
      if (filters?.category) url += `category=${encodeURIComponent(filters.category)}&`;
      if (filters?.search) url += `search=${encodeURIComponent(filters.search)}&`;
      if (filters?.bestseller !== undefined) url += `bestseller=${filters.bestseller}&`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
      const res = await fetch(`/api/product/${id}`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.error("Failed to fetch product:", id, err);
    }
    return null;
  };

  const addProduct = async (productData: Partial<Product>): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch('/api/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        fetchProducts();
        return true;
      }
      const data = await res.json();
      showToast(data.message || 'Failed to add product', 'error');
      return false;
    } catch (err) {
      showToast('Network error while adding product', 'error');
      return false;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        fetchProducts();
        showToast('Product updated successfully', 'success');
        return true;
      }
      return false;
    } catch (err) {
      showToast('Network error while updating product', 'error');
      return false;
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/product/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProducts();
        showToast('Product deleted successfully', 'success');
        return true;
      }
      return false;
    } catch (err) {
      showToast('Network error while deleting product', 'error');
      return false;
    }
  };

  const deleteMultipleProducts = async (ids: string[]): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch('/api/product/bulk-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids })
      });
      if (res.ok) {
        fetchProducts();
        showToast('Selected products deleted', 'success');
        return true;
      }
      return false;
    } catch (err) {
      showToast('Network error during bulk delete', 'error');
      return false;
    }
  };

  const uploadImage = async (base64Image: string): Promise<string> => {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image })
      });
      if (res.ok) {
        const data = await res.json();
        return data.url;
      }
      throw new Error('Image upload endpoint returned status ' + res.status);
    } catch (err: any) {
      console.error('Image upload failed, using placeholder', err);
      return base64Image; // fallback returning original
    }
  };

  // Cart & Wishlist Operations
  const addToCart = (product: Product, quantity: number, metal: string = 'Platinum') => {
    setCart(prev => {
      const index = prev.findIndex(item => (item.product.id === product.id || item.product._id === product._id) && item.selectedMetal === metal);
      if (index > -1) {
        const updated = [...prev];
        updated[index].quantity += quantity;
        showToast(`Added another ${product.name} to cart`, 'success');
        return updated;
      }
      showToast(`${product.name} added to cart`, 'success');
      return [...prev, { product, quantity, selectedMetal: metal }];
    });
  };

  const removeFromCart = (productId: string, metal?: string) => {
    setCart(prev => prev.filter(item => !((item.product.id === productId || item.product._id === productId) && (!metal || item.selectedMetal === metal))));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQty = (productId: string, quantity: number, metal?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, metal);
      return;
    }
    setCart(prev => prev.map(item => {
      if ((item.product.id === productId || item.product._id === productId) && (!metal || item.selectedMetal === metal)) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isStarred = prev.includes(productId);
      if (isStarred) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  // Order Operations
  const placeOrderAction = async (customerInfo: Order['customer'], paymentMethod: Order['paymentMethod']): Promise<Order | null> => {
    try {
      const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const totalAmount = subtotal + (subtotal > 2000 ? 0 : 150); // free shipping over $2,000

      const orderProducts = cart.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
        selectedMetal: item.selectedMetal
      }));

      const orderPayload: Partial<Order> = {
        customer: customerInfo,
        products: orderProducts,
        amount: totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
        orderStatus: 'Pending',
        date: new Date().toISOString()
      };

      const res = await fetch('/api/order/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        const data = await res.json();
        clearCart();
        showToast('Your order has been placed successfully!', 'success');
        return data.order;
      }
      return null;
    } catch (err) {
      showToast('Failed to connect to checkout api', 'error');
      return null;
    }
  };

  const fetchUserOrders = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/order/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to load user orders", err);
    }
  };

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/order/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to load all orders", err);
    }
  };

  const updateOrderStatusAction = async (orderId: string, status: Order['orderStatus']): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch('/api/order/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderId, status })
      });
      if (res.ok) {
        fetchAllOrders();
        showToast(`Order status updated to ${status}`, 'success');
        return true;
      }
      return false;
    } catch (err) {
      showToast('Network error updating order status', 'error');
      return false;
    }
  };

  // Reviews Operations
  const fetchReviews = async (productId: string): Promise<Review[]> => {
    try {
      const res = await fetch(`/api/review/${productId}`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.error("Failed to load reviews", err);
    }
    return [];
  };

  const addReviewAction = async (productId: string, rating: number, comment: string): Promise<boolean> => {
    if (!token) {
      showToast('Please login to leave a review', 'error');
      return false;
    }
    try {
      const res = await fetch('/api/review/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, rating, comment })
      });
      if (res.ok) {
        showToast('Review submitted. Thank you!', 'success');
        return true;
      }
      return false;
    } catch (err) {
      showToast('Failed to submit review', 'error');
      return false;
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      token,
      cart,
      wishlist,
      products,
      orders,
      systemStatus,
      loading,
      error,
      login,
      register,
      logout,
      updateSavedAddresses,
      fetchProducts,
      fetchProductById,
      addProduct,
      updateProduct,
      deleteProduct,
      deleteMultipleProducts,
      uploadImage,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      toggleWishlist,
      placeOrder: placeOrderAction,
      fetchUserOrders,
      fetchAllOrders,
      updateOrderStatus: updateOrderStatusAction,
      fetchReviews,
      addReview: addReviewAction,
      showToast,
      toast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
