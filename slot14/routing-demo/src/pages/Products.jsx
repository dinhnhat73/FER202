import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

function Products() {
  const productList = [
    { id: 101, name: "Sản phẩm A", price: "250.000đ", img: "https://picsum.photos/200?random=1" },
    { id: 102, name: "Sản phẩm B", price: "300.000đ", img: "https://picsum.photos/200?random=2" },
    { id: 103, name: "Sản phẩm C", price: "150.000đ", img: "https://picsum.photos/200?random=3" },
  ];

  return (
    <div className="products-container">
      <h2>🛍️ Danh sách sản phẩm</h2>

      <div className="product-grid">
        {productList.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">{p.price}</p>
            <Link to={`/san-pham/${p.id}`} className="detail-btn">
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
