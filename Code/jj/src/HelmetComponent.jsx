//HelmetComponent.jsx

import React from 'react';
import { Helmet } from 'react-helmet';

function HelmetComponent() {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      
      {/* Add other global metadata here */}
    </Helmet>
  );
}

export default HelmetComponent;