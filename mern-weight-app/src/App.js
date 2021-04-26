import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTrack from "./components/create-track.component";
import EditTrack from "./components/edit-track.component";
import TrackList from "./components/track-list.component";
import Graph from "./components/graph.component";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import React, { useState } from "react";
import Darkmode from "darkmode-js";

const options = {
  bottom: "64px", // default: '32px'
  right: "unset", // default: '32px'
  left: "32px", // default: 'unset'
  time: "1.5s", // default: '0.3s'
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#F22F05", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: true, // default: true,
  label: "🌓", // default: ''
  autoMatchOsTheme: true, // default: true
};

const darkmode = new Darkmode(options);
darkmode.showWidget();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isDarkMode, setIsDarkMode] = useState(() => false);

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              HIT Tracker
            </Typography>

            {auth && (
              <div>
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/" onClick={handleClose}>
                    Overview
                  </MenuItem>
                  <MenuItem component={Link} to="/create" onClick={handleClose}>
                    Add
                  </MenuItem>
                  <MenuItem component={Link} to="/graph" onClick={handleClose}>
                    Graph
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Route path="/" exact component={TrackList} />
        <Route path="/edit/:id" component={EditTrack} />
        <Route path="/create" component={CreateTrack} />
        <Route path="/graph" component={Graph} />
      </div>
    </Router>
  );
}
