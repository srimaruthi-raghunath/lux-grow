export interface Product {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  images: string[];
  category: string; // e.g., Jewelry, Watches
  shape: string;    // e.g., Round, Oval, Emerald, Pear
  setting: string;  // e.g., Prong, Bezel, Pavé, Halo
  orientation: string; // e.g., Diamond Carats (e.g., 0.5-.75, 1.0-1.25)
  color: string;    // e.g., D, E, F (Colorless), G, H (Near Colorless)
  clarity: string;  // e.g., FL, IF, VVS1, VVS2, VS1, VS2
  metal: string;    // e.g., 18K Yellow Gold, 18K White Gold, Platinum, Rose Gold
  stoneDetails: string; // e.g., 2.5 Carat Lab Grown Diamond
  brand?: string;
  gender?: string;
  condition?: string;
  caseSize?: string;
  movement?: string;
  bandMaterial?: string;
  style?: string;
  price: number;
  bestseller: boolean;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMetal?: string;
}

export interface Order {
  id?: string;
  _id?: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  products: {
    product: Product;
    quantity: number;
    price: number;
    selectedMetal?: string;
  }[];
  amount: number;
  paymentMethod: 'Stripe' | 'Razorpay' | 'COD';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
}

export interface Review {
  id?: string;
  _id?: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  isAdmin: boolean;
  wishlist: string[]; // array of product IDs
  savedAddresses?: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }[];
}
