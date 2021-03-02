const router = require("express").Router();
// const { Workout } = require("../models");
const Workout = require('../models/Workouts.js');

router.get("/api/workouts", (req, res) => {

  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ]).then((workouts) => {

    res.json(workouts);

  }).catch((err) => {

    res.status(400).json(err);

  });
});

router.post("/api/workouts", (req, res) => {

  let newWorkout = {

    day: Date.now(),

    excercises: [req.body]
  };

  console.log("Adding new workout...");

  Workout.create({}).then((workouts) => {

    res.json(workouts);

  }).catch((err) => {

    res.status(400).json(err);

  });
});

router.put("/api/workouts/:id", (req, res) => {

  console.log(req.body)

  Workout.findByIdAndUpdate(req.params.id, { 
    
    $push: { 
    exercises: req.body 
  
  }}).then(workouts => {

    res.json(workouts);

  }).catch((err) => {

    res.status(400).json(err);

  });
});


router.get("/api/workouts/range", (req, res) => {

  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ]).sort({ day: -1 }).limit(7).then((workouts) => {

      res.json(workouts);

    }).catch((err) => {

      res.status(400).json(err);

    });

});

module.exports = router;