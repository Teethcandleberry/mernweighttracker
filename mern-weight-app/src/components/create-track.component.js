import React, { Component } from "react";
import axios from "axios";

export default class CreateTrack extends Component {
  constructor(props) {
    super(props);

    this.onChangeTrackUser = this.onChangeTrackUser.bind(this);
    this.onChangeTrackWeight = this.onChangeTrackWeight.bind(this);
    this.onChangeTrackFat = this.onChangeTrackFat.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      track_user: "",
      track_weight: "",
      track_fat: "",
      track_completed: false,
    };
  }

  onChangeTrackUser(e) {
    this.setState({
      track_user: e.target.value,
    });
  }

  onChangeTrackWeight(e) {
    this.setState({
      track_weight: e.target.value,
    });
  }

  onChangeTrackFat(e) {
    this.setState({
      track_fat: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Track User: ${this.state.track_user}`);
    console.log(`Track Weight: ${this.state.track_weight}`);
    console.log(`Track Fat: ${this.state.track_fat}`);

    const newTrack = {
      track_user: this.state.track_user,
      track_weight: this.state.track_weight,
      track_fat: this.state.track_fat,
      track_completed: this.state.track_completed,
    };

    axios
      .post("http://localhost:4000/track/add", newTrack)
      .then((res) => console.log(res.data));

    this.setState({
      track_user: "",
      track_weight: "",
      track_fat: "",
      track_completed: false,
    });
  }

  render() {
    return (
      <body>
        <form onSubmit={this.onSubmit} class="mui-form"></form>
        <form onSubmit={this.onSubmit} class="mui-form">
          <legend>Add Weigh In</legend>

          <div class="mui-textfield"></div>

          <input
            type="text"
            placeholder="User"
            className="form-control"
            fullWidth="true"
            value={this.state.track_user}
            onChange={this.onChangeTrackUser}
          ></input>
          <div class="mui-textfield"></div>

          <input
            type="int32"
            placeholder="Weight(kg)"
            className="form-control"
            value={this.state.track_weight}
            onChange={this.onChangeTrackWeight}
          ></input>
          <div class="mui-textfield"></div>

          <input
            type="int32"
            placeholder="Fat(%)"
            className="form-control"
            value={this.state.track_fat}
            onChange={this.onChangeTrackFat}
          ></input>
          <div class="mui-textfield"></div>

          <button type="submit" class="mui-btn mui-btn--raised">
            Submit
          </button>
        </form>
      </body>
    );
  }
}
