import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { useEffect, useRef, useState, useMemo } from 'react';
import './homepage.scss';

import 'swiper/css';

import AssetSwiper from '../assetSwiper/assetSwiper';
import TeamSwiper from '../teamSwiper/teamSwiper';

import instagramLogo from '../../images/insta.svg';
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

    switch (true) {
      case windowOffset < sectionOne.current.offsetTop + window.innerHeight / 4:
        setActiveSidebar(0);
        break;
      case windowOffset < sectionTwo.current.offsetTop:
        setActiveSidebar(1);
        break;
      case windowOffset < sectionThree.current.offsetTop:
        setActiveSidebar(2);
        break;
      case windowOffset < sectionFour.current.offsetTop:
        setActiveSidebar(3);
        break;
      case windowOffset < sectionFive.current.offsetTop:
        setActiveSidebar(4);
        break;
      case windowOffset - 50 < sectionSix.current.offsetTop:
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
    <div className='homepage' onScroll={handleScroll}>
      <div className='homepage-container'>
        <div className='sidebar'>
          <div className='sidebar__logo-container'>
            <img src={lunchboxLogo} />
          </div>
          <div className='sidebar__section'>
            {activeSidebar === 0 && (
              <div>
                <p>01</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Our mission</p>
                </div>
              </div>
            )}
            {activeSidebar === 1 && (
              <div>
                <p>02</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Screenshots</p>
                </div>
              </div>
            )}
            {activeSidebar === 2 && (
              <div>
                <p>03</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Newsletter</p>
                </div>
              </div>
            )}
            {activeSidebar === 3 && (
              <div>
                <p>04</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Our Team</p>
                </div>
              </div>
            )}
            {activeSidebar === 4 && (
              <div>
                <p>05</p>
                <div className='sidebar__name'>
                  <hr />
                  <p>Partners</p>
                </div>
              </div>
            )}
            {activeSidebar === 5 && (
              <div>
                <p>06</p>
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
                    <div className='partners__logo-container'>
                      <img key={index} src={item.img.file.url} />
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
                <div key={index} className='jobs__card'>
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
                    <div
                      onClick={() => window.open(item.applyUrl, '_blank')}
                      className='jobs__card-apply'
                    >
                      Apply
                    </div>
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
              <p>1234 Street Dr, Los Angeles, CA 55565</p>
              <p>
                Copyright <span className='footer__trademark'>®</span> 2022
              </p>
            </div>
            <div>
              <a href='https://discord.gg/7Yt5RfP787'>
                <img src={discordLogo} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
