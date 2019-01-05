import React, { Component } from 'react';

class Goods extends Component {
  constructor(){
    super();
    this.state = {
      good : []
    }
  }

  componentDidMount(){
    fetch('/getFormat')
      .then(res => res.json)
      .then(good => this.setState({good}, () => console.log('fetch.....', good)));
  }

  render() {
    return (
      <div>
         <h2>goodsasdfasdfasdf</h2>
      </div>
    );
  }

}

export default Goods;
