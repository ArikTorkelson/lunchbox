import * as React from 'react';
import './layout.scss';
import Footer from '../footer/footer';
import { Link } from 'gatsby';
import CtaButton from '../cta-button/cta-button';
import siroccoLogo from '../../images/sirocco-logo.svg';
import { StaticImage } from 'gatsby-plugin-image';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <div className='layout--content-container'>
        <nav className='layout--navbar'>
          <Link className='layout--navbar__title' to='/'>
            <img src={siroccoLogo} />
          </Link>
          <div className='layout--navbar__cta-container'>
            <div className='layout--navbar__roadmap-cta'>
              <Link to='/roadmap'>Roadmap</Link>
            </div>
            <CtaButton size='small' />
          </div>
        </nav>
      </div>
      <div className='layout--background-image'>
        <StaticImage
          src='../../images/siroco-hero.png'
          alt='Background Image'
          loading='eager'
          placeholder='none'
        />
      </div>
      <main className='layout--content-container layout--content-container__top-spacing'>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
