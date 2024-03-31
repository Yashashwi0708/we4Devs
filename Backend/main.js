const express = require('express');
import('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const { replyHandler } = require('./Whatsapp/index.js');
const crypto = require('crypto');

const axios = require('axios');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000

app.use(cors());
app.use(bodyParser.json());


const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

function query(payload) {
    return axios.post(process.env.API_URL, payload, { headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`, 
        'Content-Type': 'application/json'
    }})
        .then(response => response.data)
        .catch(error => {
            console.error('Error querying API:', error.message);
        });
}


app.post('/checkSpam', async (req, res) => {
    try {
        const data = req.body;
        const inputs = data.inputs;
        if (!inputs) {
            return res.status(400).json({ error: 'Missing input text' });
        }

        const result = await query({ inputs });

        if (result && result.length >= 1) {
            const firstResult = result[0][0];
            if (firstResult.label === "LABEL_0") {
                return res.json({ is_Spam: false, probability: firstResult.score, res: result });
            } else {
                return res.json({ is_Spam: true, probability: firstResult.score, res: result });
            }
        } else {
            return res.status(500).json({ error: 'Unable to determine spam or not' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/webhooks', (req, res) => {
    const payload = req.body;
    replyHandler(payload);
    res.sendStatus(200);
});

app.get('/webhooks', (req, res) => {
    const mode = req.query['hub.mode'];
    const challenge = req.query['hub.challenge'];
    const verifyToken = req.query['hub.verify_token'];

    if (mode === 'subscribe' && verifyToken === VERIFY_TOKEN) {
        console.log('[LOG] Verification successful');
        res.status(200).send(challenge);
    } else {
        console.log('[LOG] Verification failed');
        res.sendStatus(403);
    }
});
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

const { getInfoObj } = require('./truecaller_service/index.js');
const { patch } = require('request');
const path = require('path');

app.get('/getInfo/:phoneNumber', async (req, res) => {
    return res.send(await getInfoObj(req.params.phoneNumber));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});