// ImageSlider.js
import React, { useState, useEffect } from 'react';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import ImageDots from './ImageDots';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setSlideDirection('right');
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setSlideDirection('left');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds (adjust as needed)

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
            style={{ transform: `translateX(0)`}}
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
