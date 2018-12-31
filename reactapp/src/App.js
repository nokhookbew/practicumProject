import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// import TodoApp from './TodoApp';

class App extends Component {
  state = {
    user: "",
  };

  componentDidMount(){
    axios.get('http://127.0.0.1:8081/api/youtube')
      .then(res => {
        var data = res.json

        console.log(data)
      })    
  }

  render() {
    return (
      <div className="App">
      <table>
        <tbody>
          <tr>
            <td>
              <img src={logo} width="50"/>
            </td>
            <td>
              <div>web service</div>
            </td>
          </tr>
        </tbody>
      </table>
        <header className="App-header">
        <div>
            service
        </div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <input type = "file"></input>
      
        </header>
      </div>
    );
  }

}

export default App;
