import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import './homepage.scss';

import 'swiper/css';

import AssetSwiper from '../assetSwiper/assetSwiper';
import TeamSwiper from '../teamSwiper/teamSwiper';

import instagramLogo from '../../images/insta.svg';
import discordLogo from '../../images/discord.svg';
import lunchboxLogo from '../../images/lunchbox-logo.svg';
import lunchboxFooterLogo from '../../images/lunchbox-logo-footer.svg';

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
  const [lastScrollPos, setLastScrollPos] = useState(500);
  const sectionOne = useRef(null);
  const sectionTwo = useRef(null);
  const sectionThree = useRef(null);
  const sectionFour = useRef(null);
  const sectionFive = useRef(null);
  const sectionSix = useRef(null);
  const sectionSeven = useRef(null);
  const scrollOffset = 0;

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
  }, [lastScrollPos]);

  const handleScroll = () => {
    const windowOffset =
      scrollOffset + window.pageYOffset + window.innerHeight / 2;

    switch (true) {
      case windowOffset < sectionOne.current.offsetTop + window.innerHeight / 2:
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

    if (window.pageYOffset > 500 && window.pageYOffset > lastScrollPos) {
      setShowNewsletterLink(true);
    } else {
      setShowNewsletterLink(false);
    }

    if (
      window.pageYOffset - 50 > lastScrollPos ||
      window.pageYOffset + 50 < lastScrollPos
    ) {
      setLastScrollPos(window.pageYOffset);
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
          <img src={lunchboxLogo} />
          <div className='sidebar__section'>
            {activeSidebar === 0 && (
              <div>
                <p>01</p>
                <hr />
                <p>Our mission</p>
              </div>
            )}
            {activeSidebar === 1 && (
              <div>
                <p>02</p>
                <hr />
                <p>Screenshots</p>
              </div>
            )}
            {activeSidebar === 2 && (
              <div>
                <p>03</p>
                <hr />
                <p>Newsletter</p>
              </div>
            )}
            {activeSidebar === 3 && (
              <div>
                <p>04</p>
                <hr />
                <p>Our Team</p>
              </div>
            )}
            {activeSidebar === 4 && (
              <div>
                <p>05</p>
                <hr />
                <p>Partners</p>
              </div>
            )}
            {activeSidebar === 5 && (
              <div>
                <p>06</p>
                <hr />
                <p>Careers</p>
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
          </header>
          <header
            className={`navbar__right ${
              showNewsletterLink && 'navbar__right--show'
            }`}
          >
            <a href='#newsletter'>Join the newsletter</a>
          </header>
          <section ref={sectionOne} className='section hero'>
            <h1>
              We are shaping the future of competitive gaming with a
              revolutionary *new* MOBA.
            </h1>
          </section>
          <section
            ref={sectionTwo}
            className='section section--no-right-padding'
          >
            <AssetSwiper data={homepageProductImageCarousel} />
          </section>
          <section className='section'>
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
          </section>
          <section id='newsletter' ref={sectionThree} className='section'>
            <h1 className='newsletter__title'>Join the newsletter here:</h1>
            <form
              data-netlify='true'
              className='newsletter__form'
              name='newsletter'
              onSubmit={handleSubmit}
            >
              <input type='hidden' name='form-name' value='newsletter' />
              <p>
                <input type='email' name='email' placeholder='E-mail' />
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
              <p className='partners__title'>
                A big hug to our amazing partners
              </p>
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
            <h1 className='jobs__headline'>
              Check out our <br />
              open positions
            </h1>
            {jobListings.map((item, index) => {
              return (
                <div key={index} className='jobs__card'>
                  <div className='jobs__card-text-container'>
                    <p className='jobs__card-title'>Title</p>
                    <p className='jobs__card-body'>{item.text}</p>
                  </div>
                  <div className='jobs__card-text-container'>
                    <p className='jobs__card-title'>Location</p>
                    <p className='jobs__card-body'>
                      {item.categories.location}
                    </p>
                  </div>
                  <div className='jobs__card-text-container'>
                    <p className='jobs__card-title'>Type</p>
                    <p className='jobs__card-body'>
                      {item.categories.commitment}
                    </p>
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
              <p>Copyright ® 2022</p>
              <p>Say something here.</p>
            </div>
            <div>
              <a>
                <img src={instagramLogo} />
              </a>
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
