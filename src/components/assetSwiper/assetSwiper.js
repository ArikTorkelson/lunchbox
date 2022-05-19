import * as React from 'react';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';
import { LeftArrow } from '../../images/leftArrow.js';
import { RightArrow } from '../../images/rightArrow.js';

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
          <LeftArrow />
        </div>
        <hr />
        <p>Drag to view</p>
        <hr />
        <div
          className='custom-swiper-navigation__control'
          onClick={() => swipeInstance?.slideNext()}
        >
          <RightArrow />
        </div>
      </div>

      <Swiper
        grabCursor={true}
        loop={true}
        freeMode={true}
        modules={[FreeMode]}
        slidesPerView={'auto'}
        spaceBetween={96}
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
