import React, { Component } from "react";
import axios from "axios";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = { track: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/track/graph")
      .then((response) => {
        this.setState({ track: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Progress Graph</h3>
        <form onSubmit={this.onSubmit}>
          <div id="chart"></div>
          <iframe
            src="https://charts.mongodb.com/charts-project-0-jzjqu/embed/charts?id=32fec3a6-d2c8-4a6a-b1db-25e1108849bf&autoRefresh=60&theme=light"
            frameBorder="5"
            height="500"
            width="100%"
          ></iframe>
        </form>
      </div>
    );
  }
}
