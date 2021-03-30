// Dependencies
const express = require("express");
const mongoose = require("mongoose");

// Express server setup
const PORT = process.env.PORT || 3000; // Heroku setup

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define public folder
app.use(express.static("public"));


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Define routes folder
app.use(require("./routes/apiRoutes"));
app.use(require("./routes/htmlRoutes"));

// Start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});