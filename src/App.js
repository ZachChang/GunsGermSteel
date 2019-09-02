import React from 'react';
import Map from './component/map';
import HumanFateSankey from './component/chart/index'
import './App.css';

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Map />
        <HumanFateSankey />
      </React.Fragment>
    );
  }
}

export default App;
