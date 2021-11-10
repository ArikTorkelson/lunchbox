import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import './roadmap.scss';
import timelineImgOne from '../../images/sirocco-roadmap-1.jpg';
import timelineImgTwo from '../../images/sirocco-roadmap-2.jpg';
import timelineImgThree from '../../images/sirocco-roadmap-3.jpg';
import timelineImgFour from '../../images/sirocco-roadmap-4.jpg';
import answerClosed from '../../images/answerClosed.svg';
import answerOpen from '../../images/answerOpen.svg';
import Cta from '../cta/cta';
import { useState } from 'react';

const Roadmap = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulTimeline(sort: { fields: order, order: ASC }) {
        edges {
          node {
            title
            order
            body {
              body
            }
            completed
          }
        }
      }
      allContentfulFaq(sort: { order: ASC, fields: order }) {
        edges {
          node {
            question
            answer {
              answer
            }
          }
        }
      }
    }
  `);
  const allRoadmapItems = data.allContentfulTimeline.edges;
  const allFAQItems = data.allContentfulFaq.edges;
  const FaqItem = (question, answer) => {
    const [showAnswer, setShowAnswer] = useState(false);
    return (
      <div className='roadmap__faq-container'>
        <p
          className={`roadmap__faq-question ${
            showAnswer ? 'roadmap__faq-question--remove-border' : ''
          }`}
          onClick={() => {
            setShowAnswer(showAnswer ? false : true);
          }}
        >
          {question} <img src={showAnswer ? answerOpen : answerClosed} />
        </p>
        {showAnswer && <p className='roadmap__faq-answer'>{answer}</p>}
      </div>
    );
  };
  return (
    <div className='roadmap'>
      <div className='roadmap__content-container'>
        <div>
          <h1 className='roadmap__headline'>Roadmap</h1>
          {allRoadmapItems.map((item) => {
            return (
              <div className='roadmap__roadmap-item'>
                <div className='roadmap__label'>
                  <div
                    className={`roadmap__label-number ${
                      item.node.completed && 'roadmap__label-number--completed'
                    }`}
                  >
                    <p className='roadmap__label-number-text'>
                      {item.node.order}
                    </p>
                  </div>
                </div>
                <div className='roadmap__roadmap-content'>
                  <p className='roadmap__title'>
                    {item.node.completed
                      ? `${item.node.title} (completed)`
                      : item.node.title}
                  </p>
                  <p className='roadmap__body'>{item.node.body.body}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
        <div className='roadmap__image-container'>
          <img className='roadmap__image' src={timelineImgOne} />
          <img className='roadmap__image' src={timelineImgTwo} />
          <img className='roadmap__image' src={timelineImgThree} />
          <img className='roadmap__image' src={timelineImgFour} />
        </div>
      </div>
      <Cta size='small' />
      <div className='roadmap__faq'>
        <h1 className='roadmap__faq-title'>FAQ</h1>
        <>
          {allFAQItems.map((item) =>
            FaqItem(item.node.question, item.node.answer.answer)
          )}
        </>
      </div>
    </div>
  );
};

export default Roadmap;
