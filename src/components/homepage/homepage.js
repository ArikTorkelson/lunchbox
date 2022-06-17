import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import './homepage.scss';

import 'swiper/css';

import AssetSwiper from '../assetSwiper/assetSwiper';
import TeamSwiper from '../teamSwiper/teamSwiper';

import twitterLogo from '../../images/Icon-Twitter.svg';
import discordLogo from '../../images/discord.svg';
import lunchboxLogo from '../../images/lunchbox-logo.svg';
import lunchboxFooterLogo from '../../images/lunchbox-logo-footer.svg';
import heroVideo from '../../images/hero-vid.mp4';
import heroPosterImg from '../../images/poster-image.jpg';
import heroStaticImgMobile from '../../images/static-hero-mobile.jpg';
import lunchboxMobileLogo from '../../images/logo-lunchbox-horizontal-mobile.svg';

const Homepage = () => {
  const dataProductImageCarousel = useStaticQuery(graphql`
    {
      allContentfulFeaturettes(sort: { order: ASC, fields: order }) {
        nodes {
          icon {
            file {
              url
            }
          }
          subtitle {
            subtitle
          }
          title
        }
      }
      allContentfulProductImageCarousel(sort: { order: ASC, fields: order }) {
        edges {
          node {
            id
            children {
              id
            }
            img {
              file {
                url
              }
            }
          }
        }
      }
      allContentfulTeamMember(sort: { order: ASC, fields: order }) {
        nodes {
          photo {
            file {
              url
            }
          }
          name
          order
          title
          bio {
            bio
          }
        }
      }
      allContentfulPartner(sort: { order: ASC, fields: order }) {
        nodes {
          img {
            file {
              url
            }
          }
          order
        }
      }
    }
  `);
  const homepageData = dataProductImageCarousel;

  const homepageProductImageCarousel =
    homepageData.allContentfulProductImageCarousel.edges;
  const homepageFeaturettes = homepageData.allContentfulFeaturettes.nodes;
  const homepageTeamMembers = homepageData.allContentfulTeamMember.nodes;
  const homepagePartners = homepageData.allContentfulPartner.nodes;
  const [submitButton, setSubmitButton] = useState('Submit');
  const [jobListings, setJobListings] = useState([]);
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [showNewsletterLink, setShowNewsletterLink] = useState(false);
  const sectionOne = useRef(null);
  const sectionTwo = useRef(null);
  const sectionThree = useRef(null);
  const sectionFour = useRef(null);
  const sectionFive = useRef(null);
  const sectionSix = useRef(null);
  const sectionSeven = useRef(null);
  const homepageRef = useRef(null);

  useEffect(() => {
    fetch('https://api.lever.co/v0/postings/LunchboxEntertainment?mode=json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setJobListings(data);
      });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const windowOffset = window.pageYOffset + window.innerHeight / 4;
    const elemOffset = 0.5;

    switch (true) {
      case windowOffset < sectionOne.current.offsetTop + window.innerHeight / 2:
        setActiveSidebar(0);
        break;
      case windowOffset <
        sectionTwo.current.offsetTop +
          sectionTwo.current.clientHeight * elemOffset:
        setActiveSidebar(1);
        break;
      case windowOffset <
        sectionThree.current.offsetTop +
          sectionThree.current.clientHeight * elemOffset:
        setActiveSidebar(2);
        break;
      case windowOffset <
        sectionFour.current.offsetTop +
          sectionFour.current.clientHeight * elemOffset:
        setActiveSidebar(3);
        break;
      case windowOffset <
        sectionFive.current.offsetTop +
          sectionFive.current.clientHeight * elemOffset:
        setActiveSidebar(4);
        break;
      case windowOffset - 50 <
        sectionSix.current.offsetTop +
          sectionSix.current.clientHeight * elemOffset &&
        sectionSix.current.clientHeight + windowOffset <
          sectionSeven.current.offsetTop:
        setActiveSidebar(5);
        break;
      case windowOffset < sectionSeven.current.offsetTop:
        setActiveSidebar(6);
        break;
    }

    if (window.pageYOffset > 500) {
      setShowNewsletterLink(true);
    } else {
      setShowNewsletterLink(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setSubmitButton('Submitted!');
        setTimeout(() => {
          setSubmitButton('Submit');
        }, 1400);
      })
      .catch((error) => alert(error));
  };

  return (
    <div className='homepage' onScroll={handleScroll} ref={homepageRef}>
      <Helmet>
        <title>Lunchbox Entertainment</title>
        <meta name='title' content='Lunchbox Entertainment' />
        <meta
          name='description'
          content='We are shaping the future of competitive gaming.'
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://metatags.io/' />
        <meta property='og:title' content='Lunchbox Entertainment' />
        <meta
          property='og:description'
          content='We are shaping the future of competitive gaming.'
        />
        <meta
          property='og:image'
          content='https://images.ctfassets.net/5ywyur77omkg/350kVpMKxm8FpSUgXbWtg/fdd44c522593d946ea250148bea99bf3/lunchbox-meta.jpgg'
        />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://metatags.io/' />
        <meta property='twitter:title' content='Lunchbox Entertainment' />
        <meta
          property='twitter:description'
          content='We are shaping the future of competitive gaming.'
        />
        <meta
          property='twitter:image'
          content='https://images.ctfassets.net/5ywyur77omkg/350kVpMKxm8FpSUgXbWtg/fdd44c522593d946ea250148bea99bf3/lunchbox-meta.jpg'
        />
        <link rel='icon' href='../../images/favicon.ico' type='image/x-icon' />

        <link
          rel='apple-touch-icon'
          href='../../images/android-chrome-512x512.png'
        />
      </Helmet>
      <div className='homepage-container'>
        <div className='sidebar'>
          <div className='sidebar__logo-container'>
            <img src={lunchboxLogo} />
          </div>
          <div className='sidebar__section'>
            {activeSidebar === 0 && (
              <div>
                <p className='sidebar__number'>01</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Our mission</p>
                </div>
              </div>
            )}
            {activeSidebar === 1 && (
              <div>
                <p className='sidebar__number'>02</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Screenshots</p>
                </div>
              </div>
            )}
            {activeSidebar === 2 && (
              <div>
                <p className='sidebar__number'>03</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Newsletter</p>
                </div>
              </div>
            )}
            {activeSidebar === 3 && (
              <div>
                <p className='sidebar__number'>04</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Our Team</p>
                </div>
              </div>
            )}
            {activeSidebar === 4 && (
              <div>
                <p className='sidebar__number'>05</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Partners</p>
                </div>
              </div>
            )}
            {activeSidebar === 5 && (
              <div>
                <p className='sidebar__number'>06</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Careers</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='content'>
          <header className='navbar'>
            <div className='navbar__left'>
              <a href='#our-team'>Our team</a>
              <a href='#partners'>Partners</a>
              <a href='#careers'>Careers</a>
            </div>
            <div className='navbar__left'>
              <a href='#newsletter'>Join the newsletter</a>
            </div>
          </header>
          <header
            className={`navbar__right ${
              showNewsletterLink && 'navbar__right--show'
            }`}
          >
            <a href='#newsletter'>Join the newsletter</a>
          </header>
          <section className='hero--mobile'>
            <img className='hero--mobile-padding' src={lunchboxMobileLogo} />
            <div className='hero__text-container--mobile hero--mobile-padding'>
              <h1>We are shaping the future</h1>
              <h1>of competitive gaming</h1>
              <h1>with a revolutionary</h1>
              <h1>new MOBA.</h1>
            </div>
            <img className='hero--mobile-hero' src={heroStaticImgMobile} />
          </section>
          <section ref={sectionOne} className='hero'>
            <div className='hero__video'>
              <video autoPlay muted poster={heroPosterImg}>
                <source src={heroVideo} type='video/webm' />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className='hero__text-container'>
              <h1>We are shaping the future</h1>
              <h1>of competitive gaming</h1>
              <h1>with a revolutionary</h1>
              <h1>new MOBA.</h1>
            </div>
          </section>
          <section
            ref={sectionTwo}
            className='section section--no-right-padding'
          >
            <AssetSwiper data={homepageProductImageCarousel} />
          </section>
          <section id='newsletter' ref={sectionThree} className='section'>
            <div className='featurettes'>
              {homepageFeaturettes.map((item, index) => {
                return (
                  <div className='featurettes__item' key={index}>
                    <img
                      className='featurettes__icon'
                      src={item.icon.file.url}
                    />
                    <h3 className='featurettes__title'>{item.title}</h3>
                    <p className='featurettes__subtitle'>
                      {item.subtitle.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
            <form
              data-netlify='true'
              className='newsletter__form'
              name='newsletter'
              onSubmit={handleSubmit}
            >
              <input type='hidden' name='form-name' value='newsletter' />
              <p className='newsletter__form-submit-container'>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  className='newsletter__form-submit-container-input'
                />
              </p>
              <p>
                {' '}
                <button
                  disabled={submitButton !== 'Submit'}
                  className={
                    submitButton === 'Submit'
                      ? ''
                      : 'newsletter__form--submitted'
                  }
                  type='submit'
                >
                  {submitButton}
                </button>
              </p>
            </form>
          </section>

          <section
            ref={sectionFour}
            className='section section--no-right-padding'
            id='our-team'
          >
            <TeamSwiper data={homepageTeamMembers} />
          </section>
          <section
            ref={sectionFive}
            className='section section--no-right-padding'
            id='partners'
          >
            <div className='partners'>
              <h2 className='partners__title'>
                A big hug to our amazing partners
              </h2>
              <div className='partners__partner-logos'>
                {homepagePartners.map((item, index) => {
                  return (
                    <div key={index} className='partners__logo-container'>
                      <img src={item.img.file.url} />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section id='careers' ref={sectionSix} className='section'>
            <h2 className='jobs__headline'>
              Check out our <br />
              open positions
            </h2>
            {jobListings.map((item, index) => {
              return (
                <div
                  key={index}
                  className='jobs__card'
                  onClick={() => window.open(item.hostedUrl, '_blank')}
                >
                  <div className='jobs__card-text-container'>
                    <p className='jobs__card-title'>Title</p>
                    <h3 className='jobs__card-body'>{item.text}</h3>
                  </div>
                  <div className='jobs__card-text-container'>
                    <p className='jobs__card-title'>Location</p>
                    <h3 className='jobs__card-body'>
                      {item.categories.location}
                    </h3>
                  </div>
                  <div className='jobs__card-text-container'>
                    <p className='jobs__card-title'>Type</p>
                    <h3 className='jobs__card-body'>
                      {item.categories.commitment}
                    </h3>
                  </div>
                  <div className='jobs__card-apply-container'>
                    <div className='jobs__card-apply'>Apply</div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <footer ref={sectionSeven} className='footer'>
        <div className='footer__content'>
          <div>
            <img src={lunchboxFooterLogo} />
          </div>
          <div className='footer__details'>
            <div>
              <p>U.S. based gaming studio </p>
              <p>
                Copyright <span className='footer__trademark'>®</span> 2022
              </p>
            </div>
            <div className='footer__social'>
              <a href='https://discord.gg/7Yt5RfP787'>
                <img src={discordLogo} />
              </a>
              <a href='https://twitter.com/Lunchbox_Games'>
                <img src={twitterLogo} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
