import React, { Component } from 'react';
import '../cssFile/good.css';

class Good extends Component {
  constructor() {
    super();
    this.state = {
      goodTop: [],
      goodTessco: []
    };
  }

  componentDidMount() {
    fetch('/getFormatTop')
      .then(res => res.json())
      .then(goodTop => this.setState({goodTop}, () => console.log('goodTop fetched...', goodTop)));
    fetch('./getFormatTessco')
      .then(res => res.json())
      .then(goodTessco => this.setState({goodTessco}, () => console.log('goodTessco fetched...', goodTessco)));
  }

  render() {
    return (
      <div>
        <h2>good</h2>
        <ul>
        {this.state.goodTop.map(goodTop => 
          <li key={goodTop.id}>name  :  {goodTop.name} , ex :  {goodTop.ex} , weight :  {goodTop.weight}</li>
        )}
        </ul>
        <ul>
        {this.state.goodTessco.map(goodTessco => 
          <li key={goodTessco.id}>name  :  {goodTessco.name} , ex :  {goodTessco.ex} , weight :  {goodTessco.weight}</li>
        )}
        </ul>

      </div>
    );
  }
}

export default Good;