import React from 'react';
import '../public/styles/ProductList.css';

interface Product {
  name: string;
  price: number;
  img: string;
}

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div key={index} className="product-card" onClick={() => addToCart(product)}>
          <img src={product.img} alt={product.name} className="product-image" />
          <div className="product-details">
            <span className="product-name">{product.name}</span>
            <span className="product-price">{product.price} DT</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
