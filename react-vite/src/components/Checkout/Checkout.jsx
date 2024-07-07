import { useSelector, useDispatch } from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  restCartItems,
} from '../../redux/shopping-cart';
import styles from './Checkout.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = Object.values(cart.cart || {});
  const dispatch = useDispatch();

  // Get session user
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionUser) navigate('/');
  }, [sessionUser, navigate]);

  const totalPrice = (quantity, price) => {
    const total = quantity * price;
    return total.toFixed(2);
  };

  const checkout = () => {
    dispatch(restCartItems());
    alert('Order Set!, Shipping soon');
  };

  if (!cartItems.length)
    return (
      <div className={styles.shoppingCartBag}>
        <h1>Your bag is empty.</h1>
      </div>
    );

  return (
    <section id={styles.shoppingCart}>
      <h2>My Bag ({cartItems.length} Items)</h2>
      <div className={styles.shoppingCart}>
        <div>
          {cartItems.map((item) => (
            <div className={styles.cart} key={item.id}>
              <div className={styles.img}>
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
              </div>
              <div className={styles.itemDetails}>
                <div>
                  <h2>Item Price</h2>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div>
                  <h2>Quantity</h2>

                  <div className={styles.itemQuantity}>
                    <button
                      className="btn"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className="btn"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <h2>Total Price</h2>
                  <p>${totalPrice(item.quantity, item.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totalPrice}>
          <h2>Order Summary</h2>
          <div className={styles.orderSummary}>
            <p>Subtotal</p>
            <p>
              <strong>${cart.totalPrice.toFixed(2)}</strong>
            </p>
          </div>
          <div className={styles.orderSummary}>
            <p>Shipping</p>
            <p>
              <strong>FREE</strong>
            </p>
          </div>
          <button className="btn" onClick={() => checkout()}>
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
