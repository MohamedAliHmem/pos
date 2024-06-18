import React from 'react';

interface ProductProps {
  product: {
    name: string;
    price: number;
    img: string;
  };
  addToCart: (product: { name: string; price: number; img: string }) => void;
}
const Product: React.FC<ProductProps> = ({ product, addToCart }) => {
  return (
    <div className="product">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} DT</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;
