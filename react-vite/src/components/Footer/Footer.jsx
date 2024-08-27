import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`flex ${styles.footer}`}>
      <div className={`${styles.displayInfo}`}>
        <h1>Developed by</h1>
        <div className={styles.DevelopedBy}>
          <div>
            <h2>Oscar</h2>
            <ul>
              <li>
                <NavLink id={styles.links} to="https://github.com/oscarrsvp">
                  Github
                </NavLink>
              </li>
              <li>
                <NavLink
                  id={styles.links}
                  to="https://www.linkedin.com/in/oscar-r-4562b0312/"
                >
                  LinkedIn
                </NavLink>
              </li>
              <li></li>
            </ul>
          </div>

          <div>
            <h2>Victor</h2>
            <ul>
              <li>
                <NavLink id={styles.links} to="https://github.com/Gitpiff">
                  Github
                </NavLink>
              </li>
              <li>
                <NavLink
                  id={styles.links}
                  to="https://www.linkedin.com/in/navarrohvictor/"
                >
                  LinkedIn
                </NavLink>
              </li>
              <li></li>
            </ul>
          </div>

          <div>
            <h2>Sydney</h2>
            <ul>
              <li>
                <NavLink id={styles.links} to="https://github.com/sydneybg">
                  Github
                </NavLink>
              </li>
              <li>
                <NavLink
                  id={styles.links}
                  to="https://www.linkedin.com/in/sydney-barnes-grant-980377130/"
                >
                  LinkedIn
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <span>&#169; Beat Boutique Inc, All rights reserved</span>
    </footer>
  );
};

export default Footer;
