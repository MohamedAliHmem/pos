import React from 'react';
import '../public/styles/OrderSummary.css'; // Import the CSS file

interface OrderSummaryProps {
  orderItems: {
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  removeFromCart: (productName: string) => void;
  clearCart: () => void;
  checkout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems, total, removeFromCart, clearCart, checkout }) => {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="order-items-wrapper">
        <ul className="order-items">
          {orderItems.map((item, index) => (
            <li key={index} className="order-item">
              <span>{item.name} (x{item.quantity})</span>
              <span>{item.price * item.quantity} DT</span>
              <button onClick={() => removeFromCart(item.name)} className="remove-button">Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="order-total">
        <div className="total">
          <span>Total: </span><span>{total} DT</span>
        </div>
        <button onClick={checkout}>Checkout</button>
        <button onClick={clearCart} className="clear-button">Clear Cart</button>
      </div>
    </div>
  );
};

export default OrderSummary;
