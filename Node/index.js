// Importing the Express.js framework to create a web server
import express from "express";

// Importing the 'fs' module for working with files
import fs from "fs";

// Importing the 'path' module to handle file paths
import path from "path";

// Creating the main app
const app = express();

//* Adding middleware to serve static files from the 'public' directory
app.use(express.static("public"));

//* Adding middleware to parse JSON data in requests
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("/index.html");//when we start server it use lie 14 an when he dont find files he come to this line and change url from "/" to "/index.html"
});

// Handling GET requests to fetch todos from a JSON file
app.get("/todos", (req, res) => {
    // Reading the contents of "data.json" file and sending it as the response
    fs.promises.readFile(path.resolve("data.json"), "utf8").then((todos) => {
        res.send(todos);
    });
});

// Handling POST requests to update todos in the JSON file
app.post("/todos", (req, res) => {
    // Writing the updated todos to the "data.json" file
    fs.promises.writeFile(path.resolve("data.json"), JSON.stringify(req.body, undefined, 2))
    .then(() => {
        res.send("Todos received");
    });
});

// Starting the server and listening on port 3001
app.listen(3001);
