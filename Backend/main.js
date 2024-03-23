const express = require('express');
import('node-fetch');
const bodyParser = require('body-parser'); // Import bodyParser for parsing request bodies

const { findAvailablePort, startContainer } = require('./container.js');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

async function query(data) {
    try {
        const response = await fetch(
            "http://127.0.0.1:5000/checkSpam",
            {
                method: "POST",
                body: JSON.stringify(data), // Ensure data is stringified
                headers: {
                    'Content-Type': 'application/json' // Specify content type
                }
            }
        );
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error querying model:", error);
        throw error;
    }
}

// Route handler for /checkSpam endpoint
app.post('/checkSpam', async (req, res) => {
    try {
        const response = await query({ input_text: req.body.input_text });
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: `Internal Server Error, ${error}` });
    }
});

app.get('/startContainer', async (req, res) => {
    const port = await findAvailablePort(6800, 6900);
    const url = req.query.url || 'https://www.google.co.in';
    const pass = 'pass'
    
    try {
        const containerId = await startContainer(port, url, pass);
        res.send(`Container started with ID: ${containerId}. You can access it at https://localhost:${port}`);
    } catch (error) {
        res.status(500).send('Error starting container: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});