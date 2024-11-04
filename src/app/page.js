"use client";
import React, { useRef } from 'react';
import WelcomeInterface from './components/WelcomeInterface';
import SliderCards from './components/Slidecards';

export default function Home() {
  const sliderRef = useRef(null);
  const welcomeRef = useRef(null);

  const scrollToSlider = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (welcomeRef.current) {
      welcomeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <div ref={welcomeRef}>
        <WelcomeInterface scrollToSlider={scrollToSlider} />
      </div>
      <div ref={sliderRef}>
        <SliderCards scrollToTop={scrollToTop} />
      </div>
    </main>
  );
}
