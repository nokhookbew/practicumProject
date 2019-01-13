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
    }
    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    }
    render() {
      const { selectedOption } = this.state;
  
      return (
        <Select
          className="select"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      );
    }
  }

  export default ChoiceBox;