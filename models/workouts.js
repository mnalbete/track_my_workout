const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const swolSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: true
            },
            name: {
                type: String,
                trim: true,
                required: true
            },
            duration: {
                type: Number,
                required: "Please enter a duration in minutes."
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            },
        }
    ]
}, { toJSON: { virtuals: true } });

swolSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce ((total, exercise) => {
        return total + excercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", swolSchema);

module.exports = Workout;