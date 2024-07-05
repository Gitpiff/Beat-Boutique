const ToastContent = ({ imageUrl, productName, price }) => (
  <div className="toast-content">
    <img src={imageUrl} alt={productName} className="toast-img" />
    <span>{productName}</span>
    <small>${price.toFixed(2)} USD</small>
  </div>
);

export default ToastContent;
