'use client';

import Link from 'next/link';

export default function Navbar({ cartCount }: { cartCount: number }) {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg">
          E-Commerce
        </Link>
        <Link href="/cart" className="text-white">
          Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
}
