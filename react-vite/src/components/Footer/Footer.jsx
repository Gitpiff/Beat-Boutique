import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`flex ${styles.footer}`}>
      <div className={`${styles.displayInfo}`}>
        <div>
          <h2>About Us</h2>
          <ul>
            <li>Products</li>
            <li>Jobs</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h2>Social</h2>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>X</li>
          </ul>
        </div>
      </div>

      <span>&#169; Beat Boutique Inc, All rights reserved</span>
    </footer>
  );
};

export default Footer;
