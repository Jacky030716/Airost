import React from 'react';
import './Banner.css'
import { SliderData } from './SliderData';
import ImageSlider from './ImageSlider';

function Banner() {
    return <ImageSlider slides={SliderData} />;
};

export default Banner;