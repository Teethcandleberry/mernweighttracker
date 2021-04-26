import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Track = (props) => (
  <tr>
    <td className={props.track.track_completed ? "completed" : ""}>
      {props.track.track_user}
    </td>
    <td className={props.track.track_completed ? "completed" : ""}>
      {props.track.track_weight}
    </td>
    <td className={props.track.track_completed ? "completed" : ""}>
      {props.track.track_fat}
    </td>
    <td>
      <Link to={"/edit/" + props.track._id}>Edit</Link>
    </td>
  </tr>
);

export default class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = { track: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/track/")
      .then((response) => {
        this.setState({ track: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  trackList() {
    return this.state.track.map(function (currentTrack, i) {
      return <Track track={currentTrack} key={i} />;
    });
  }

  render() {
    return (
      <TableContainer component={Paper} elevation={3}>
        <Table className={TableContainer} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="inherit">User</TableCell>
              <TableCell align="inherit">Weight</TableCell>
              <TableCell align="inherit">Fat</TableCell>
              <TableCell align="inherit">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody align="justify">{this.trackList()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}
