'use client';

import { Product } from '../types';

interface CartItemProps {
  item: Product;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-cover"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm">${item.price}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="px-2"
        >
          -
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) =>
            onUpdateQuantity(item.id, parseInt(e.target.value))
          }
          className="w-12 text-center mx-2"
        />
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="px-2"
        >
          +
        </button>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="ml-4 bg-red-500 text-white px-2 py-1 rounded-md"
      >
        Remove
      </button>
    </div>
  );
}
