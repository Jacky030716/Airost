// ImageDots.js
import React from 'react';

const ImageDots = ({ slides, currentSlide }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-220px' }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: index === currentSlide ? '#000' : '#ccc',
            margin: '0 5px',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
};

export default ImageDots;