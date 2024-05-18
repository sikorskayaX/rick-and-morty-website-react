import React from 'react';
import { Link } from 'react-router-dom';
import logoBlack from './images/logo-black.png';

const Navigation = () => {
  return (
    <nav className='navigation'>
      <Link to="/"><img src={logoBlack} alt="logo"/></Link>
      <ul className='navigation__list'>
        <li><Link className='navigation__link' to="/">Characters</Link></li>
        <li><Link className='navigation__link' to="/locations">Locations</Link></li>
        <li><Link className='navigation__link' to="/episodes">Episodes</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
