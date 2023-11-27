// ImageSlider.js
import React, { useState, useEffect } from 'react';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import ImageDots from './ImageDots';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [current]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div>
      <section className='slider'>
        <SlArrowLeft className='left-arrow' onClick={prevSlide} />
        <SlArrowRight className='right-arrow' onClick={nextSlide} />
        {slides.map((slide, index) => (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt={`Slide ${index + 1}`} className='image' />
            )}
          </div>
        ))}
      </section>
      <ImageDots slides={slides} currentSlide={current} />
    </div>
  );
};

export default ImageSlider;
