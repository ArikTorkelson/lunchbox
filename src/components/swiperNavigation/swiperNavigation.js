import * as React from 'react';
import { useSwiper } from 'swiper/react';

import './swiperNavigation.scss';

const SwiperNavigation = () => {
  const swiper = useSwiper();
  console.log('hi etan');
  return (
    <div className='swiper-navigation'>
      <div onClick={() => swiper.slidePrev()}>LEFT</div>
      <hr />
      <p>Drag to view</p>
      <hr />
      <div onClick={() => swiper.slideNext()}>RIGHT</div>
    </div>
  );
};

export default SwiperNavigation;
