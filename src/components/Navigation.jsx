import React from 'react';
import { Link } from 'react-router-dom';
import logoBlack from './images/logo-black.png';

const Navigation = () => {
  return (
    <nav className='navigation'>
      <Link to="/"><img src={logoBlack} alt="logo" className="navigation__logo"/></Link>
      <ul className='navigation__list'>
        <li className='navigation__link'><Link to="/">Characters</Link></li>
        <li className='navigation__link'><Link to="/locations">Locations</Link></li>
        <li className='navigation__link'><Link to="/episodes">Episodes</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
