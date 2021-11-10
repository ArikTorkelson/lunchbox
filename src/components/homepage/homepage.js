import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import Cta from '../cta/cta';
import './homepage.scss';

const Homepage = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulHomepageAbout(sort: { fields: order, order: ASC }) {
        edges {
          node {
            img {
              file {
                url
              }
            }
            imgCaption {
              imgCaption
            }
            title
            body {
              body
            }
          }
        }
      }
      contentfulHomepageHero {
        body {
          body
        }
        title
        heroImg {
          file {
            url
          }
        }
      }
    }
  `);
  const allHomepageAboutItems = data.allContentfulHomepageAbout.edges;
  const homepageHeroItem = data.contentfulHomepageHero;
  return (
    <div className='homepage'>
      <div className='homepage__hero'>
        <h1 className='homepage__hero-title'>{homepageHeroItem.title}</h1>
        <p className='homepage__hero-body'>{homepageHeroItem.body.body}</p>
        <img
          className='homepage__hero-img'
          src={homepageHeroItem.heroImg.file.url}
        />
      </div>
      {allHomepageAboutItems.map((item, index) => {
        return (
          <>
            {index % 2 === 0 ? (
              <div className='homepage__about-item homepage__about-item--left'>
                <div>
                  <h1 className='homepage__about-item-title'>
                    {item.node.title}
                  </h1>
                  <p className='homepage__about-item-body'>
                    {item.node.body.body}
                  </p>
                </div>
                <div></div>
                <div className='homepage__about-item-content'>
                  <img
                    className='homepage__about-item-image'
                    src={item.node.img.file.url}
                  />
                  <p className='homepage__about-item-caption'>
                    {item.node.imgCaption.imgCaption}
                  </p>
                </div>
              </div>
            ) : (
              <div className='homepage__about-item homepage__about-item--right'>
                <div className='homepage__about-item-content'>
                  <img
                    className='homepage__about-item-image'
                    src={item.node.img.file.url}
                  />
                  <p className='homepage__about-item-caption'>
                    {item.node.imgCaption.imgCaption}
                  </p>
                </div>
                <div></div>
                <div>
                  <h1 className='homepage__about-item-title'>
                    {item.node.title}
                  </h1>
                  <p className='homepage__about-item-body'>
                    {item.node.body.body}
                  </p>
                </div>
              </div>
            )}
          </>
        );
      })}
      <Cta roadmap />
      <Cta size='big' />
    </div>
  );
};

export default Homepage;
