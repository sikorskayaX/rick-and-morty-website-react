import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='navigation'>
      <ul className='navigation__list'>
        <li className='navigation__link'><Link to="/">Characters</Link></li>
        <li className='navigation__link'><Link to="/locations">Locations</Link></li>
        <li className='navigation__link'><Link to="/episodes">Episodes</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
