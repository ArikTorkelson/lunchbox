import * as React from 'react';
import './footer.scss';
import lunchboxLogo from '../../images/lunchbox-logo.svg';

const Footer = () => (
  <div className='footer'>
    <div className='footer__content'>
      <div className='footer__left-container'>
        <img src={lunchboxLogo} />
      </div>

      <div className='footer__right-container'>
        <p>All Rights Reserved</p>
      </div>
    </div>
  </div>
);

export default Footer;
