const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Serve static files
app.use(express.static(path.resolve('frontend')));

// Load index.html file
app.get('/', (req, res) => {
    res.sendFile(path.resolve('frontend/index.html'));
});

// Set up the middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Read the existing data from the file
let data = [];

if (fs.existsSync('./backend/data.json')) {
    data = JSON.parse(fs.readFileSync('./backend/data.json'));
}

// Define the route for the form
app.post('/submit-form', (req, res) => {
    // Add the new object to the array
    data.push({
        name: req.body.name,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
    });

    // Write the updated data back to the file
    fs.writeFileSync('./backend/data.json', JSON.stringify(data));

    // Send a response to the client
    res.send('Data received');
});

app.get('/data', (req, res) => {
    // Read the data.json file and send the data as a JSON response
    const fs = require('fs');
    fs.readFile('./backend/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Start server
app.listen(3002, () => {
    console.log('Server started on port 3002');
});