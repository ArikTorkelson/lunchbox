import * as React from 'react';
import CtaButton from '../cta-button/cta-button';
import './cta.scss';

const Cta = ({ size, roadmap }) => (
  <>
    {roadmap ? (
      <div className='cta-breakpoint'>
        <h1 className='cta-breakpoint__title'>Check out the Roadmap</h1>
        <CtaButton size='medium' roadmap />
      </div>
    ) : (
      <>
        <div className={`cta ${size === 'small' && 'cta--small'}`}>
          {size === 'big' && (
            <>
              <h1 className='cta__title'>
                Stay up to date, join the Sirocco discord community
              </h1>
              <CtaButton size='big' />
            </>
          )}
          {size === 'small' && (
            <>
              <h1 className='cta__title'>
                Stay up to date, join the Sirocco discord community
              </h1>
              <CtaButton size='medium' />
            </>
          )}
        </div>
        <div className='cta-breakpoint'>
          <h1 className='cta-breakpoint__title'>
            Stay up to date, join the Sirocco discord community
          </h1>
          <CtaButton size='medium' />
        </div>
      </>
    )}
  </>
);

export default Cta;
