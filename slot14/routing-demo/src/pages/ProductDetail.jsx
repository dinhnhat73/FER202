import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail() {
  const { productId } = useParams(); // Lấy productId từ URL
  const navigate = useNavigate(); // Hook để điều hướng

  const handleBack = () => {
    navigate("/san-pham"); // Quay lại trang sản phẩm
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chi tiết sản phẩm</h2>
      <p>Mã sản phẩm hiện tại là: <strong>{productId}</strong></p>
      <button onClick={handleBack}>Quay lại trang sản phẩm</button>
    </div>
  );
}

export default ProductDetail;
