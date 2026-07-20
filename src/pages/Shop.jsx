import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";

// Import GIFs from existing assets
import computerGif from "../assets/videos/computer.gif";
import exchangeGif from "../assets/videos/exchange.gif";

// Use existing images as placeholders until real merch images are added
import hoodie2 from "../assets/images/hoodie2.jpg";
import mug from "../assets/images/cup.jpg";
import bottle1 from "../assets/images/bottle1.jpg";
import bottle2 from "../assets/images/bottle2.png";
import shirt from "../assets/images/T-Shirt.jpg";
import stickerPlaceholder from "../assets/images/AI&Cyber.png";
import notebookPlaceholder from "../assets/images/data1.jpg";
import hoodie from "../assets/images/bgremover2.png"


// Product data
const productsData = [
  {
    id: 1,
    slug: "cyber-secure-t-shirt",
    name: "Cyber Secure T-Shirt",
    description: "Show your commitment to cybersecurity with this premium cotton tee. Features the KRAFO shield logo.",
    price: 29.99,
    originalPrice: 39.99,
    category: "apparel",
    tags: ["best seller", "new"],
    image: shirt,
    inStock: true,
    rating: 4.8,
    reviewCount: 47,
    details: [
      "100% Premium Cotton",
      "Screen-printed design",
      "Machine washable",
      "Unisex sizing",
      "Made in Ghana"
    ],
    // colors: ["Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 2,
    slug: "encrypted-data-mug",
    name: "Encrypted Data Mug",
    description: "Sip your coffee in style with this binary-encoded ceramic mug. Dishwasher safe.",
    price: 19.99,
    category: "accessories",
    tags: ["gift favorite"],
    image: mug,
    inStock: true,
    rating: 4.9,
    reviewCount: 32,
    details: [
      "15oz ceramic mug",
      "Dishwasher & microwave safe",
      "Full-wrap design",
      "Comfort grip handle",
      "Lead-free"
    ]
  },
  {
    id: 3,
    slug: "hacker-hoodie",
    name: "Ethical Hacker Hoodie",
    description: "Stay warm and secure in this heavyweight hoodie with hidden pockets for your gear.",
    price: 59.99,
    originalPrice: 79.99,
    category: "apparel",
    tags: ["limited edition"],
    image: hoodie,
    inStock: true,
    rating: 4.7,
    reviewCount: 18,
    details: [
      "80% Cotton, 20% Polyester",
      "Kangaroo pocket",
      "Hidden inner pocket",
      "Adjustable drawstring",
      "Made in Ghana"
    ],
    // colors: ["Charcoal", "Black", "Navy"],
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: 4,
    slug: "cyber-defense-cap",
    name: "Cyber Defense Cap",
    description: "Embroidered cap featuring the KRAFO emblem. Perfect for range days or casual wear.",
    price: 24.99,
    category: "accessories",
    tags: ["new"],
    image: hoodie2,
    inStock: false,
    rating: 4.6,
    reviewCount: 21,
    details: [
      "100% Cotton twill",
      "Embroidered logo",
      "Adjustable strap",
      "Curved visor",
      "Unisex design"
    ],
    // colors: ["Black", "Olive"]
  },
  {
    id: 5,
    slug: "secure-bottle-pack",
    name: "Secure Bottle Pack",
    description: "Collection of 15 high-quality vinyl stickers for laptops, water bottles, and gear.",
    price: 12.99,
    category: "accessories",
    tags: ["bundle"],
    image: bottle1,
    inStock: true,
    rating: 4.9,
    reviewCount: 56,
    details: [
      "15 unique designs",
      "Waterproof vinyl",
      "UV resistant",
      "Easy to apply & remove",
      "Made in Ghana"
    ]
  },
  {
    id: 6,
    slug: "tactical-field-notebook",
    name: "Tactical Field Notebook",
    description: "Water-resistant notebook for field operations with cybersecurity cheat sheets.",
    price: 22.99,
    category: "accessories",
    tags: ["utility"],
    image: bottle2,
    inStock: true,
    rating: 4.8,
    reviewCount: 29,
    details: [
      "Water-resistant pages",
      "100 dotted pages",
      "Pen holder",
      "Cybersecurity reference",
      "Pocket-sized"
    ]
  }
];

// Categories for filtering
const categories = [
  { id: "all", name: "All Products" },
  { id: "apparel", name: "Apparel" },
  { id: "accessories", name: "Accessories" },
  { id: "new", name: "New Arrivals" },
  { id: "best", name: "Best Sellers" }
];

export default function Shop() {
  const [products, setProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState({ color: null, size: null });
  const [sortBy, setSortBy] = useState("featured");

  // Filter products based on category
  useEffect(() => {
    if (selectedCategory === "all") {
      setProducts(productsData);
    } else if (selectedCategory === "new") {
      setProducts(productsData.filter(product => product.tags?.includes("new")));
    } else if (selectedCategory === "best") {
      setProducts(productsData.filter(product => product.tags?.includes("best seller")));
    } else {
      setProducts(productsData.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Sort products
  useEffect(() => {
    const sorted = [...products];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order
        break;
    }
    setProducts(sorted);
  }, [sortBy]);

  const addToCart = (product, variant = {}) => {
    const cartItem = {
      ...product,
      selectedColor: variant.color,
      selectedSize: variant.size,
      quantity: 1
    };
    
    setCart(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && 
        item.selectedColor === variant.color && 
        item.selectedSize === variant.size
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && 
          item.selectedColor === variant.color && 
          item.selectedSize === variant.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, cartItem];
    });
    
    // Show feedback
    setSelectedProduct(product);
    setTimeout(() => setSelectedProduct(null), 2000);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, change) => {
    setCart(prev => {
      const newCart = [...prev];
      const newQuantity = newCart[index].quantity + change;
      
      if (newQuantity < 1) {
        return prev.filter((_, i) => i !== index);
      }
      
      newCart[index].quantity = newQuantity;
      return newCart;
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setSelectedVariant({ color: null, size: null });
    setQuickViewOpen(true);
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Section - Updated for Shop */}
      <section className="relative text-center py-28 px-4 pt-40 overflow-hidden backdrop-blur-3xl text-white">
        {/* Background Animation */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0d0d0d] to-[#1a0a00]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(242,96,11,0.15),transparent_50%)]"></div>
        </div>

        {/* Floating Icons */}
        {/* <div className="absolute left-[10%] top-16 animate-float-slow z-10 hidden sm:block">
          <img
            src={computerGif}
            alt="Computer Icon"
            className="w-12 sm:w-16 h-12 sm:h-16 opacity-60 rounded-lg animate-rotate-slow"
          />
        </div>
        <div className="absolute left-[80%] bottom-16 animate-float-medium z-10 hidden sm:block">
          <img
            src={exchangeGif}
            alt="Data Exchange Icon"
            className="w-12 sm:w-16 h-12 sm:h-16 opacity-60 rounded-lg animate-antirotate-slow"
          />
        </div> */}

        {/* Main Content */}
        <div className="relative z-20 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            KRAFO <span className="text-orange-600">Merch Store</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Gear up with official KRAFO merchandise. Wear your commitment to cybersecurity with pride.
          </p>
          {/* <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setSelectedCategory("apparel")}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-orange-600/40"
            >
              Shop Apparel
            </button>
            <button 
              onClick={() => setSelectedCategory("accessories")}
              className="bg-black/50 hover:bg-black/70 text-white font-bold py-3 px-8 rounded-full transition duration-300 border border-orange-600/30 hover:border-orange-600 ease-in-out transform hover:scale-105"
            >
              Shop Accessories
            </button>
          </div> */}
        </div>

        {/* Animated Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-8 text-sm text-gray-400">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">100%</div>
            <div>Official Merch</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">$5</div>
            <div>Shipping Ghana</div>
          </div>
          {/* <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">30</div>
            <div>Day Returns</div>
          </div> */}
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-black border-l border-orange-600/20 z-50 shadow-2xl shadow-orange-500/10"
          >
            <div className="h-full flex flex-col">
              {/* Cart Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Your Cart
                    <span className="text-sm text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                      {cart.length}
                    </span>
                  </h2>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                    <p className="text-gray-400 mb-6">Add some merch to get started!</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{item.name}</h4>
                          <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                          {(item.selectedColor || item.selectedSize) && (
                            <div className="flex gap-2 mt-1">
                              {item.selectedColor && (
                                <span className="text-xs px-2 py-1 bg-orange-500/10 text-orange-400 rounded">
                                  {item.selectedColor}
                                </span>
                              )}
                              {item.selectedSize && (
                                <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 rounded">
                                  {item.selectedSize}
                                </span>
                              )}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(index, -1)}
                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                              >
                                <span className="text-lg">−</span>
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(index, 1)}
                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                              >
                                <span className="text-lg">+</span>
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-red-400 hover:text-red-300 p-1 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-400">Total</span>
                    <span className="font-bold text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Notification */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-40"
          >
            <div className="bg-gradient-to-r from-black to-gray-900 border border-orange-600/30 rounded-xl p-4 shadow-xl shadow-orange-500/10 max-w-sm">
              <div className="flex items-center gap-3">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-12 h-12 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="text-white font-medium">Added to cart!</p>
                  <p className="text-sm text-gray-400">{selectedProduct.name}</p>
                </div>
                <button
                  onClick={() => setCartOpen(true)}
                  className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-lg transition-colors"
                >
                  View Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shop Controls */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/20'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort & Cart */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black/50 border border-white/10 text-white rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-orange-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors text-orange-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="group relative bg-gradient-to-br from-black/50 to-black/20 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-600/30 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-black-900/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover p-1 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.tags?.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-orange-600 to-orange-500 text-black rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quick View Button */}
                  <button
                    onClick={() => openQuickView(product)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>

                  {/* Out of Stock */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white">{product.rating}</span>
                      <span className="text-gray-400">({product.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                        product.inStock
                          ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white transform hover:scale-105'
                          : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>

                  {/* Color & Size Options */}
                  {(product.colors || product.sizes) && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex gap-2">
                        {product.colors?.map(color => (
                          <button
                            key={color}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, { color, size: selectedVariant.size });
                            }}
                            className="w-6 h-6 rounded-full border-2 border-white/20 hover:border-orange-500 transition-colors"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setQuickViewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-orange-600/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white">Product Details</h2>
                  <button
                    onClick={() => setQuickViewOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full rounded-xl border border-white/10"
                    />
                    {!selectedProduct.inStock && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl bg-black/70 px-6 py-3 rounded-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{selectedProduct.name}</h1>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(selectedProduct.rating)
                                  ? 'text-orange-500'
                                  : 'text-gray-700'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-white">{selectedProduct.rating}</span>
                          <span className="text-gray-400 ml-1">({selectedProduct.reviewCount} reviews)</span>
                        </div>
                      </div>
                      <p className="text-gray-300">{selectedProduct.description}</p>
                    </div>

                    <div>
                      <div className="text-3xl font-bold text-white mb-2">
                        ${selectedProduct.price.toFixed(2)}
                        {selectedProduct.originalPrice && (
                          <span className="text-gray-500 line-through text-xl ml-2">
                            ${selectedProduct.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    {selectedProduct.details && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Product Details</h3>
                        <ul className="space-y-2">
                          {selectedProduct.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                              <span className="text-orange-500 mt-1">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Variant Selection */}
                    <div className="space-y-4">
                      {selectedProduct.colors && (
                        <div>
                          <h4 className="font-medium text-white mb-2">Color</h4>
                          <div className="flex gap-3">
                            {selectedProduct.colors.map(color => (
                              <button
                                key={color}
                                onClick={() => setSelectedVariant(prev => ({ ...prev, color }))}
                                className={`w-10 h-10 rounded-full border-2 ${
                                  selectedVariant.color === color
                                    ? 'border-orange-500'
                                    : 'border-white/20'
                                }`}
                                style={{ backgroundColor: color.toLowerCase() }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProduct.sizes && (
                        <div>
                          <h4 className="font-medium text-white mb-2">Size</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.sizes.map(size => (
                              <button
                                key={size}
                                onClick={() => setSelectedVariant(prev => ({ ...prev, size }))}
                                className={`px-4 py-2 rounded-lg border ${
                                  selectedVariant.size === size
                                    ? 'bg-orange-600 border-orange-500 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => {
                        addToCart(selectedProduct, selectedVariant);
                        setQuickViewOpen(false);
                      }}
                      disabled={!selectedProduct.inStock}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                        selectedProduct.inStock
                          ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/30'
                          : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Shop With <span className="text-orange-600">KRAFO</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Premium quality merchandise for cybersecurity professionals and enthusiasts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-black/50 to-black/20 border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Quality</h3>
              <p className="text-gray-400">High-quality materials and professional printing</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-black/50 to-black/20 border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Shipping</h3>
              <p className="text-gray-400">Priority shipping with tracking for all orders</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-black/50 to-black/20 border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>
              <p className="text-gray-400">Encrypted payments with multiple secure options</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}