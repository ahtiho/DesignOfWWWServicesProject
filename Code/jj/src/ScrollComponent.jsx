//ScrollComponent.jsx

import React, { useEffect, useState } from 'react';
import './App.css'

const ScrollComponent = () => {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const myScrollFunc = () => {
      const y = window.scrollY;
      if (y >= 1500) {
        setShowCTA(true);
      } else {
        setShowCTA(false);
      }
    };

    window.addEventListener('scroll', myScrollFunc);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', myScrollFunc);
    };
  }, []);

  return (
    <div>
      {/* Your other React components */}
      {/* Conditional rendering based on showCTA state */}
      <div id="customID" className={showCTA ? 'cta show' : 'cta hide'}>
        {/* Your CTA content */}moiiiiii
      </div>
    </div>
  );
};

export default ScrollComponent;