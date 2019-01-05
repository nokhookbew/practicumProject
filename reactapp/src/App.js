import React, { Component } from 'react';
import './App.css';
import Goods from './components/goods'

class App extends Component {


  componentDidMount(){
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">    
          <input type = "file"></input>
        </header>
        <Goods />   
      </div>
    );
  }

}

export default App;
