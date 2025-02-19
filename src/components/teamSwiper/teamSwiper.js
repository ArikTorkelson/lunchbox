import * as React from 'react'
import { useState } from 'react'
import Markdown from 'marked-react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FreeMode } from 'swiper'
import { LeftArrow } from '../../images/leftArrow.js'
import { RightArrow } from '../../images/rightArrow.js'

import './teamSwiper.scss'

const TeamSwiper = ({ data }) => {
  const [swipeInstance, setSwipeInstance] = useState(null)
  return (
    <div className="team-swiper-container">
      <div className="custom-swiper-navigation">
        <h2 className="teammember__header">The Lunchbox Team</h2>
        <div
          className="custom-swiper-navigation__control"
          onClick={() => swipeInstance?.slidePrev()}
        >
          <LeftArrow />
        </div>
        <hr className="custom-swiper-navigation--hide-mobile" />
        <p className="custom-swiper-navigation--hide-mobile">Drag to view</p>
        <hr className="custom-swiper-navigation--hide-mobile" />
        <div
          className="custom-swiper-navigation__control"
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
        spaceBetween={32}
        onBeforeInit={(swipper) => setSwipeInstance(swipper)}
        slidesOffsetBefore={24}
        breakpoints={{
          980: {
            slidesOffsetBefore: 0,
          },
        }}
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="teammember__card">
                <div className="teammember__card-img-container">
                  <img src={item.photo.file.url} />
                </div>
                <p className="teammember__title">{item.title}</p>
                <h3 className="teammember__name">{item.name}</h3>
                {/* <div
                  className='teammember__bio'
                  style={{ whiteSpace: 'pre-line' }}
                >
                  <Markdown value={item.bio.bio} />
                </div> */}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default TeamSwiper
