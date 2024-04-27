import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../../redux/shopping-cart';
import styles from './Checkout.module.css';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = Object.values(cart.cart || {});
  const dispatch = useDispatch();

  const totalPrice = (quantity, price) => {
    const total = quantity * price;
    return total;
  };

  if (!cartItems.length) return <h1>No items in cart</h1>;

  return (
    <>
      <h2>My Bag ({cartItems.length} Items)</h2>
      <div className={styles.shoppingCart}>
        <div>
          {cartItems.map((item) => (
            <div className={styles.cart} key={item.id}>
              <div className={styles.img}>
                <img
                  src={item.image}
                  alt=""
                  style={{ height: '200px', width: '200px' }}
                />
                <h4>{item.name}</h4>
              </div>
              <div className={styles.itemDetails}>
                <div>
                  <h2>Item Price</h2>
                  <p>{item.price}</p>
                </div>
                <div>
                  <h2>Quantity</h2>
                  <p>{item.quantity}</p>
                </div>
                <div>
                  <h2>Total Price</h2>
                  <p>{totalPrice(item.quantity, item.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3>Order Summary</h3>
          <div>
            <p>Subtotal</p>
            <p>${cart.totalPrice}</p>
          </div>
          <div>
            <p>Shipping</p>
            <p>FREE</p>
          </div>
          <button className="btn">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
