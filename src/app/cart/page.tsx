'use client';

import { useState, useEffect } from 'react';
import CartItem from '../../components/CartItem';
import Navbar from '../../components/NavBar';
import { Product } from '../../types';

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [fixedDiscount, setFixedDiscount] = useState<number>(0);
  const [percentageDiscount, setPercentageDiscount] = useState<number>(0);

  useEffect(() => {
    // Load cart from localStorage or a backend if available
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Persist updated cart
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Persist updated cart
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const applyDiscounts = (subtotal: number) => {
    let discountedPrice = subtotal;
    if (fixedDiscount > 0) {
      discountedPrice -= fixedDiscount;
    }
    if (percentageDiscount > 0) {
      discountedPrice -= (discountedPrice * percentageDiscount) / 100;
    }
    return Math.max(0, discountedPrice).toFixed(2); // Ensure total is not negative
  };

  const subtotal = parseFloat(getSubtotal());
  const totalPrice = applyDiscounts(subtotal);

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <div className="container mx-auto mt-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))
        )}
        <div className="text-right mt-4">
          <h3 className="text-xl font-semibold">Subtotal: ${subtotal}</h3>

          {/* Discount Input Fields */}
          <div className="flex justify-end mt-2">
            <div className="mr-4">
              <label className="block text-sm font-medium">Fixed Discount ($)</label>
              <input
                type="number"
                value={fixedDiscount}
                onChange={(e) => setFixedDiscount(parseFloat(e.target.value) || 0)}
                className="border p-1 w-20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Percentage Discount (%)</label>
              <input
                type="number"
                value={percentageDiscount}
                onChange={(e) => setPercentageDiscount(parseFloat(e.target.value) || 0)}
                className="border p-1 w-20"
              />
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-2">Total: ${totalPrice}</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Checkout</button>
        </div>
      </div>
    </div>
  );
}

