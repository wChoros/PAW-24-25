import React, { useState, useEffect } from 'react';
import './style.sass';

interface Image {
    id: number;
    alt: string;
    width: number;
    height: number;
}

const BasicImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Image data with placeholders
  const images = [
    { id: 1, alt: "Image 1", width: 800, height: 400, },
    { id: 2, alt: "Image 2", width: 800, height: 400 },
    { id: 3, alt: "Image 3", width: 800, height: 400 },
    { id: 4, alt: "Image 4", width: 800, height: 400 },
    { id: 5, alt: "Image 5", width: 800, height: 400 },
    { id: 6, alt: "Image 6", width: 800, height: 400 },
    { id: 7, alt: "Image 7", width: 800, height: 400 },
  ];

  // Handle navigation
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };


const goToSlide = (index: number): void => {
    setCurrentIndex(index);
};

  // Auto advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <h1 className="slider-title">Basic Image Slider</h1>
      
      <div className="slider-main">
        <img 
          src={`https://via.assets.so/game.png?id=${currentIndex}&q=95&w=${images[currentIndex].width}&h=${images[currentIndex].height}&fit=fill`} 
          alt={images[currentIndex].alt}
          className="slider-image"
        />
        
        <div className="slider-caption">
          {images[currentIndex].alt}
        </div>
        
        <button className="slider-nav prev-button" onClick={goToPrev}>
          &lt;
        </button>
        
        <button className="slider-nav next-button" onClick={goToNext}>
          &gt;
        </button>
      </div>
      
      <div className="slider-dots">
        {images.map((image, index) => (
          <button 
            key={image.id}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BasicImageSlider;