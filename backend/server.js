const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const trackRoutes = express.Router();
const PORT = 4000;

let Track = require("./track.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://dwayne:flyonrye@merntracker.2n8un.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
trackRoutes.route("/").get(function (req, res) {
  Track.find(function (err, track) {
    if (err) {
      console.log(err);
    } else {
      res.json(track);
    }
  });
});

trackRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Track.findById(id, function (err, track) {
    res.json(track);
  });
});

trackRoutes.route("/update/:id").post(function (req, res) {
  Track.findById(req.params.id, function (err, track) {
    if (!track) res.status(404).send("data is not found");
    else track.track_user = req.body.track_user;
    track.track_weight = req.body.track_weight;
    track.track_fat = req.body.track_fat;
    track.track_completed = req.body.track_completed;

    track
      .save()
      .then((track) => {
        res.json("Track updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

trackRoutes.route("/add").post(function (req, res) {
  let track = new Track(req.body);
  track
    .save()
    .then((track) => {
      res.status(200).json({ track: "track added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new track failed");
    });
});

app.use("/track", trackRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
