import * as React from 'react';
import './cta-button.scss';
import discordImg from '../../images/discord.png';
import arrowImg from '../../images/arrow.png';
import { Link } from 'gatsby';

const CtaButton = ({ size, roadmap }) => (
  <>
    {roadmap ? (
      <Link
        to='/roadmap'
        className={`cta-button cta-button--${size} cta-button--background-variation`}
      >
        <div className='cta-button__text'>ROADMAP</div>
        <img className='cta-button__arrow' src={arrowImg} />
      </Link>
    ) : (
      <a
        href='https://discord.gg/2Y88VyMCff'
        target='_blank'
        className={`cta-button cta-button--${size}`}
      >
        <img className='cta-button__logo' src={discordImg} />
        <div className='cta-button__text'>JOIN DISCORD</div>
        <img className='cta-button__arrow' src={arrowImg} />
      </a>
    )}
  </>
);

export default CtaButton;
