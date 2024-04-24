import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation() {
  const user = useSelector((state) => state.session.user);

  return (
    <nav>
      <div className="logo">
        <NavLink to="/">BeatBoutique</NavLink>
        <input className="search-bar" type="text" placeholder="Search..." />
      </div>
      <ul>
        {user ? (
          <li>
            <ProfileButton />
          </li>
        ) : (
          <>
            <div className="menu">
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Log In</NavLink>
              </li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
