import React from 'react';
import Map from './component/map';
import './App.css';
import 'simple-line-icons/css/simple-line-icons.css';

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Map />
        <div className='footer'>
          @2019 Made by <span onClick={()=> window.open("https://www.linkedin.com/in/zachchang/", "_blank")} className='author'>Zach</span>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
