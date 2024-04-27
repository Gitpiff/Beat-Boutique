import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { thunkLogout } from '../../redux/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const shoppingCart = useSelector((store) => store.cart);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button className="user-profile" onClick={toggleMenu}>
        <FaUserCircle size={18} />
      </button>
      {showMenu && (
        <ul className={'profile-dropdown'} ref={ulRef}>
          {user ? (
            <>
              <li className="user-info">
                Hello, {user.first_name} {user.last_name}
              </li>
              <li>
                <NavLink to={'/products/current'}>My Account</NavLink>
              </li>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li className="shopping">
                <button className="logout-btn" onClick={logout}>
                  Sign Out
                </button>
                <NavLink to={'/checkout'} className="cart">
                  <AiOutlineShoppingCart size={30} cursor={'pointer'} color={'black'} />

                  {shoppingCart.cart && Object.keys(shoppingCart.cart).length > 0 && (
                    <span>{Object.keys(shoppingCart.cart).length}</span>
                  )}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
