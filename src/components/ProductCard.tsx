// components/ProductCard.tsx
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onShowNotification: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onShowNotification }) => {
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((item: Product) => item.id === product.id);

    if (existingProduct) {
      cart = cart.map((item: Product) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    onAddToCart(product);
    onShowNotification(); // Show notification when item is added
  };

  return (
    <div className="border p-4">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-700">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
