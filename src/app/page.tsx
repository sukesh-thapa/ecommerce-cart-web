'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/NavBar';
import Notification from '../components/Notification';
import { Product } from '../types';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((response) => {
      const productsWithQuantity = response.data.map((product: Product) => ({
        ...product,
        quantity: 1,
      }));
      setProducts(productsWithQuantity);
    });
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, product];
    });
    showNotification(); // Show notification when item is added
  };
  
  const showNotification = () => {
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false); // Hide notification after 3 seconds
    }, 3000);
  };

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <Notification
        message="Item added to cart!"
        isVisible={notificationVisible}
      />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} onShowNotification={showNotification} />
        ))}
      </div>
    </div>
  );
}
