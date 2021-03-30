const router = require("express").Router();

// MongoDB Model(s)
const Workout = require("../models/workout");

// getLastWorkout()
router.get("/api/workouts", (req, res) => {
    Workout.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// addExercise(data)
router.put("/api/workouts/:id", ({ params: { id }, body }, res) => {

    // Get workout data object
    Workout.findById(id)
        .then(workout => {

            // Add new exercise to workout.exercises property array
            workout.exercises.push(body);

            // Update workout in the database
            Workout.findByIdAndUpdate(id, workout, { new: true })
                .then((data) => {
                    res.json(data);
                })
        })
        .catch((err) => {
            throw err;
        })

});

// createWorkout()
router.post("/api/workouts", ({ body }, res) => {

    Workout.create(body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// getWorkoutsInRange()
router.get("/api/workouts/range", (req, res) => {
    // Create data object sorted by dates
    // Sunday = _id: 1
    Workout.aggregate([
        { $unwind: "$exercises" },
        {
            $group: {
                _id: { $dayOfWeek: "$day" },
                duration: { $sum: "$exercises.duration" },
                weight: { $sum: "$exercises.weight" }

            }
        },
        {
            $sort: { _id: 1 }
        }
    ]).then(dataByDay => {
        Workout.aggregate(
            [
            { $unwind: "$exercises" },
            {
                $group: {
                    _id: "$exercises.name",
                    duration: { $sum: "$exercises.duration" },
                    weight: { $sum: "$exercises.weight" }

                }
            },
            {
                $sort: { _id: 1 }
            }
            ])
            .then((dataByExercise => {

                const data = { dataByDay, dataByExercise }
                res.json(data);

            }))
    })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;