import React from 'react'; // Import React
import './App.css'
import herokuva from "/src/photos/herokuva.png"
import nuoli from "/src/photos/arrow.png"

// Header component with navigation and header picture + info

class HeaderComponent extends React.Component {
  render() {
    return (
        <header>
        <nav>
          <div id="navi">
            <p id="logo">
              <a href="index.html">a.</a>
            </p>
            <p id="aaltolinkki">
              <a href="https://www.aalto.fi/fi/muut-opinnot/vaihto-opinnot" target="_blank">aalto.fi</a>
            </p>

            
          </div>

          <div id="navLine"></div>
        </nav>

        <div id="mainHeaderContent" className="clearfix">
          <div id="titleDiv">
            <h1>avara aalto</h1>
            <h2 id="h2_aalto">Aalto University School of Business</h2>
            <p>
              Here you can search for the exchange destinations of The School of Business.
              Main exchange application period is yearly in January, second round application in August.
              After the internal selection at Aalto, selected students are nominated to the exchange universities.
              After that students will yet go through the application process of the exchange university.
            </p>
            <div id="headerButtonPosition">
              <button id="headerButton"><a href="https://www.aalto.fi/fi/muut-opinnot/vaihto-opinnot" target="_blank">Read more</a></button>
            </div>
          </div>

          <div id="herokuva">
            <img
              src={herokuva}
              alt="a hand holding a world globe" id="hero"
              
            />
          </div>

          <div id="arrow">
            <a href="#filterBox"> 
            <img src={nuoli}alt="an arrow" height="120" />
            </a>
           
          </div>
        
        </div>
      </header>
    );
  }
}

export default HeaderComponent;