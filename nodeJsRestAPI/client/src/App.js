
import React, { Component } from 'react';
import logo from './logo.svg';
import './cssFile/App.css';
import Good from './components/good';
import UploadPic from './components/uploadPic';
import ChoiceBox from './components/choiceBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Food Labal Service </h2>
        </header>
        <ChoiceBox/>
        <UploadPic/>
        {/* <Good /> */}
        
      </div>
    );
  }
}

export default App;