// Mongoose setup
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Workout collection ("workouts" in mongoDB)
const WorkoutSchema = new Schema({

    day: { type: Date, default: Date.now},
    exercises: [{
        type: { type: String },
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
    }]

});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;