import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalMenuItem from './OpenModalMenuItem';
import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation() {
  const user = useSelector((state) => state.session.user);

  return (
    <nav>
      <div className="logo">
        <NavLink to="/">BeatBoutique</NavLink>
        {/* <input className="search-bar" type="text" placeholder="Search..." /> */}
      </div>
      <ul>
        {user ? (
          <li>
            <ProfileButton />
          </li>
        ) : (
          <>
            <div className="menu">
              <OpenModalMenuItem
                modalComponent={<SignupFormModal />}
                itemText="Sign Up"
              />
              <OpenModalMenuItem modalComponent={<LoginFormModal />} itemText="Log in" />
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
