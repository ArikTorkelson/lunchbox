import * as React from 'react';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';
import leftArrow from '../../images/leftArrow.svg';
import rightArrow from '../../images/rightArrow.svg';

import './assetSwiper.scss';

const AssetSwiper = ({ data }) => {
  const [swipeInstance, setSwipeInstance] = useState(null);
  return (
    <>
      <div className='custom-swiper-navigation'>
        <div
          className='custom-swiper-navigation__control'
          onClick={() => swipeInstance?.slidePrev()}
        >
          <img src={leftArrow} />
        </div>
        <hr />
        <p>Drag to view</p>
        <hr />
        <div
          className='custom-swiper-navigation__control'
          onClick={() => swipeInstance?.slideNext()}
        >
          <img src={rightArrow} />
        </div>
      </div>

      <Swiper
        grabCursor={true}
        loop={true}
        freeMode={true}
        modules={[FreeMode]}
        slidesPerView={'auto'}
        spaceBetween={30}
        onBeforeInit={(swipper) => setSwipeInstance(swipper)}
        containerModifierClass={'asset-gallery-'}
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide className='swiper-slide-container' key={index}>
              <img src={item.node.img.file.url} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default AssetSwiper;
