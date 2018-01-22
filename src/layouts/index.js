import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import github from '../img/github-icon.svg';
import logo from '../img/logo.png';
import './all.sass';

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <figure className="image">
            <img src={logo} alt="NED Stories" style={{ height: '35px',width:'200px' }} />
          </figure>
        </Link>
      </div>
      <div className="navbar-end">

      </div>
    </div>
  </nav>
);

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | NED Learning Stories of Success" />
    <Navbar />
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
