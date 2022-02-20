// Setup empty JS object to act as endpoint for all routes
const dotenv = require('dotenv');
dotenv.config();

projectData = {};

// Express to run server and routes
// Require Express to run server and routes
const express = require('express');
const port = 4000;
// Start up an instance of app
const app = express();
app.locals.title = 'Motaz Server';
app.locals.appname = 'Weather Jornal App - Udacity';
/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { nextTick } = require('process');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));




// Post Route
// Run the Server
app.listen(port, listening);
// Callback to debug
function listening() {
    console.log(app.locals.title);
    console.log(app.locals.appname);
    console.log(`Server listening on http://localhost:${port}`);
}

// Initialize all route with a callback function

// Callback function to complete GET '/all'

app.get('/getWeatherData', function(req, res) {
    res.send(projectData).status(200).end();
});

// Routs for POST requests
app.post('/saveWeatherData', function(req, res) {
    let data = req.body;
    projectData = {
        country: data.country,
        city: data.city,
        temp: data.temp,
        icon: data.icon,
        date: data.date,
        content: data.content
    };
    console.log(projectData);
    res.send(projectData).status(200).end();
});