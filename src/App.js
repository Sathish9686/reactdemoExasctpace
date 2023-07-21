import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    textValue: "",
    postResponse: null,
    getResponse: null,
    error: null
  };

  handleChange = (event) => {
    this.setState({ textValue: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { textValue } = this.state;
    const postUrl = "http://localhost:3000/addtext";
    const getUrl = "http://localhost:3000/gettext";
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: textValue })
    };
    const getOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      // Send POST request
      const postResponse = await fetch(postUrl, postOptions);
      const postData = await postResponse.json();

      if (postResponse.ok) {
        this.setState({ postResponse: postData, error: null });

        // Send GET request
        const getResponse = await fetch(getUrl, getOptions);
        const getData = await getResponse.json();

        if (getResponse.ok) {
          this.setState({ getResponse: getData, error: null });
        } else {
          this.setState({ getResponse: null, error: getData.error });
        }
      } else {
        this.setState({ postResponse: null, error: postData.error });
      }
    } catch (error) {
      this.setState({ postResponse: null, error: error.message });
    }
  };

  render() {
    const { textValue,  getResponse, error } = this.state;
    console.log(getResponse)

    return (
      <div className="App-container">
        <form onSubmit={this.handleSubmit} className="form-container">
          <h1>Textarea</h1>
          <textarea
            placeholder="Enter your text here"
            rows={10}
            cols={50}
            value={textValue}
            onChange={this.handleChange}
          ></textarea>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        {getResponse && (
          <div className="response-container">
            <h2>GET Response:</h2>
            <p>{JSON.stringify(getResponse[getResponse.length - 1], null, 2)}</p>
          </div>
        )}
        {error && (
          <div className="error-container">
            <h2>Error:</h2>
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
