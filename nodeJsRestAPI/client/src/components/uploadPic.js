import React, { Component } from 'react';

class UploadPic extends Component {
    state = {
        selectedFile: null
    }
    fileSelectedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
        
    }
    fileUploadHandler = () => {
        console.log(this.selectedFile)
    }
  render() {
    return (
      <div>
          <input type="file" onChange={this.fileSelectedHandler}/>
          <button onClick={this.fileUploadHandler}> Upload </button>
      </div>
    );
  }
}

export default UploadPic;