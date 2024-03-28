const axios = require('axios');
require('dotenv').config('/media/drive/dev-linux/we4Devs/Backend/.env');

const API_KEY = process.env.WA_API_KEY
const BASE_URL = process.env.WA_BASE_URL

const sendSpamTemplate = (phoneNumber, spamScore, detected) => {
    return {
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "type": "template",
        "template": {
            "name": "affirmative",
            "language": {
                "code": "EN"
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": spamScore
                        },
                        {
                            "type": "text",
                            "text": detected
                        }
                    ]
                }
            ]
        }
    };
}

const sendNoSpamTemplate = (phoneNumber, spamScore) => {
    return {
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "type": "template",
        "template": {
            "name": "negative",
            "language": {
                "code": "EN"
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": spamScore
                        },
                    ]
                }
            ]
        }
    };
}


// Function to send messages via WhatsApp API
function sendSpamResponse(phoneNumber, spamScore, detected = "Spam Content") {

    axios.post(BASE_URL, sendSpamTemplate(
        phoneNumber,
        spamScore,
        detected
    ), {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('Message sent:', response.data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
}

function sendNoSpamResponse(phoneNumber, spamScore) {

    axios.post(BASE_URL, sendNoSpamTemplate(
        phoneNumber,
        spamScore,
    ), {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('Message sent:', response.data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
}

function sendWelcomeResponse(phoneNumber) {
    axios.post(BASE_URL, {
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "type": "template",
        "template": {
            "name": "hello",
            "language": {
                "code": "EN"
            },
        }
    }, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('Message sent:', response.data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });

}

module.exports = {
    sendSpamResponse,
    sendNoSpamResponse,
    sendWelcomeResponse
};