//ScrollComponent: the "Back to Filters" button which pops up when scrolling down

import React, { useEffect, useState } from 'react';
import './App.css'

const ScrollComponent = () => {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const myScrollFunc = () => {
      const y = window.scrollY;
      if (y >= 1400) {
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
    <div id="scrollWrap">
      <div id="customID" className={showCTA ? 'cta show' : 'cta hide'}>
       <div className="container">
          <a href="#filterBox"> <div className="sticky-div">Back to filters</div> </a>
        </div>
      </div>
    </div>
  );
};

export default ScrollComponent;