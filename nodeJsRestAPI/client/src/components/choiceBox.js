import React from 'react';
import Select from 'react-select';
import '../cssFile/choiceBox.css';

// virable of options
const options = [
    { label: 'Top supermarket', value: 'Top'  },
    { label: 'Tessco market', value: 'Tessco'  },
  ];
   
  class ChoiceBox extends React.Component {
    state = {
      selectedOption: null,
      goodTop: [],
      goodTessco: [],
      errorPromt: ""
    }

    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption.value);
    }
    
    handleButton = () => {
      if (this.state.selectedOption === null){
        this.setState({errorPromt: "Please select market !!!"})
        return;
      } 
      const value = this.state.selectedOption.value
      if (value === 'Tessco'){
        this.setState({errorPromt: ""})
        fetch('./tesscoProcessFormat')
          .then(res => res.json())
          .then(goodTessco => this.setState({goodTessco}, () => console.log('good Tessco fetched...', goodTessco)));
      }
      if (value === 'Top'){
        this.setState({errorPromt: ""})
        fetch('./topProcessFormat')
          .then(res => res.json())
          .then(goodTop => this.setState({goodTop}, () => console.log('good Top fetched...', goodTop)));  
      }
    }

    render() {
      const { selectedOption } = this.state;
      return (
        <div>

          <div>{this.state.errorPromt}</div>
            <Select className="select" value={selectedOption} onChange={this.handleChange} options={options}/>
            <button onClick = {this.handleButton} className = "selectionButton"> PROCESS </button>
          
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

  export default ChoiceBox;