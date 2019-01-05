import React, { Component } from 'react';
import './good.css';
// import './customers.css';

class Good extends Component {
  constructor() {
    super();
    this.state = {
      good: []
    };
  }

  componentDidMount() {
    fetch('/getformat')
      .then(res => res.json())
      .then(good => this.setState({good}, () => console.log('goood fetched...', good)));
  }

  render() {
    return (
      <div>
        <h2>good</h2>
        <ul>
        {this.state.good.map(good => 
          <li key={good.id}>{good.name} {good.ex} {good.weight}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Good;