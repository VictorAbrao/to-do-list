import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/components/NavBar.css';
const Navbar = ({ user, handleSignOut }) => {
  const firstName = user?.displayName?.split(' ')[0];

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='navbar-nav ml-auto'>
        <span className='navbar-text'>Welcome, {firstName}!</span>
        <button onClick={handleSignOut} className='btn btn-dark btn-logout'>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
