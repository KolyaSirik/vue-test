const express = require("express");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'dist')));

const port = 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));
