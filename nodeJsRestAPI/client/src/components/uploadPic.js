import React, { Component } from 'react';

class UploadPic extends Component {
    state = {
        selectedFile: null
    }
    fileSelectedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    }
    fileUploadHandler = () => {
        console.log(this.state.selectedFile)
    }
  render() {
    return (
      <div>
          <form action="/uploadPic" method="post">
            <input type="file" onChange={this.fileSelectedHandler}/>
            <button onClick={this.fileUploadHandler}> Upload </button>
          </form>

      </div>
    );
  }
}

export default UploadPic;