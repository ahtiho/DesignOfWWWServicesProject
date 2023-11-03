import React from 'react'; // Import React
import './App.css'
import herokuva from "/src/photos/herokuva.png"
import nuoli from "/src/photos/arrow.png"
class HeaderComponent extends React.Component {
  render() {
    return (
        <header>
        <nav>
          <div id="navi">
            <p id="logo">
              <a href="index.html">a.</a>
            </p>
            <p>
              <a href="https://www.aalto.fi/fi/muut-opinnot/vaihto-opinnot">aalto.fi</a>
            </p>

            
          </div>

          <div id="navLine"></div>
        </nav>

        <div id="mainHeaderContent" className="clearfix">
          <div id="titleDiv">
            <h1>avara aalto</h1>
            <h2>Aalto University School of Business</h2>
            <p>
              Here you can search for the exchange destinations of The School of Business.
              Main exchange application period is yearly in January, second round application in August.
              After the internal selection at Aalto, selected students are nominated to the exchange universities.
              After that students will yet go through the application process of the exchange university.
            </p>
            <div id="headerButtonPosition">
              <button id="headerButton"><a href="https://www.aalto.fi/fi/muut-opinnot/vaihto-opinnot">Read more</a></button>
            </div>
          </div>

          <div>
            <img
              src={herokuva}
              alt="a hand holding a world globe"
              height="397px"
              width="397px"
            />
          </div>

          <div id="arrow">
            <img src={nuoli}alt="an arrow" height="120" />
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderComponent;