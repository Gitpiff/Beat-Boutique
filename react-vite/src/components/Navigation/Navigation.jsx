import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav>
      <div className="logo">
        <NavLink to="/">BeatBoutique</NavLink>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <ul>
        {user ? (
          <li>
            <ProfileButton />
          </li>
        ) : (
          <>
            <li>
              <button className="fabars" onClick={toggleMenu}>
                <FaBars />
              </button>
            </li>
            {showMenu && (
              <div className="menu">
                <li>
                  <NavLink to="/signup">Sign Up</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Log In</NavLink>
                </li>
              </div>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
