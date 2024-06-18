"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import OrderSummary from '../components/OrderSummary';

const products = [
  { name: 'Acoustic Bloc Screens', price: 351050, img: '/images/screen.jpg' },
  { name: 'Cabinet with Doors', price: 166600, img: '/images/cabinet.jpg' },
  { name: 'Conference Chair (Aluminium)', price: 46886, img: '/images/chair_aluminium.jpg' },
  { name: 'Conference Chair (Steel)', price: 39270, img: '/images/chair_steel.jpg' },
  { name: 'Corner Desk Left Sit', price: 101150, img: '/images/desk_left.jpg' },
  { name: 'Corner Desk Right Sit', price: 174930, img: '/images/desk_right.jpg' },
  { name: 'Customizable Desk (Aluminium)', price: 952476, img: '/images/desk_aluminium.jpg' },
  { name: 'Customizable Desk (Steel, Black)', price: 892500, img: '/images/desk_black.jpg' },
  { name: 'Desk Combination', price: 535500, img: '/images/desk_combination.jpg' },
];

export default function Home() {
  const [orderItems, setOrderItems] = useState<{ name: string; price: number; img: string; quantity: number }[]>([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const addToCart = (product: { name: string; price: number; img: string }) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(item => item.name === product.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    setTotal((prevTotal) => prevTotal + product.price);
  };

  const removeFromCart = (productName: string) => {
    setOrderItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.name === productName);
      if (!itemToRemove) return prevItems;

      if (itemToRemove.quantity === 1) {
        return prevItems.filter(item => item.name !== productName);
      } else {
        return prevItems.map(item =>
          item.name === productName ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });

    setTotal((prevTotal) => {
      const itemToRemove = orderItems.find(item => item.name === productName);
      return itemToRemove ? prevTotal - itemToRemove.price : prevTotal;
    });
  };

  const clearCart = () => {
    setOrderItems([]);
    setTotal(0);
  };

  const checkout = () => {
    const params = new URLSearchParams({ total: total.toFixed(3) });
    router.push(`/payment?${params.toString()}`);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main>
        <ProductList products={filteredProducts} addToCart={addToCart} />
        <OrderSummary
          orderItems={orderItems}
          total={total}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          checkout={checkout}
        />
      </main>
    </>
  );
}
