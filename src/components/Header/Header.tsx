import { NavLink } from "react-router-dom";
import './Header.css';

export const Header = () => { 
  return (
    <>
      <header className="header">
        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink className="nav__link" to={'/'}>Home</NavLink>
            </li>
            <li className="nav__item">
              <NavLink className="nav__link" to={'/variables'}>Variables</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
