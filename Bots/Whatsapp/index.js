const axios = require('axios');
const { sendSpamResponse, sendNoSpamResponse, sendWelcomeResponse } = require('./button.js');

const API_URL = process.env.WA_BASE_URL;
const HEADERS = {
    'Authorization': `Bearer ${process.env.WA_API_KEY}`,
    'Content-Type': 'application/json'
};

const API_URL2 = process.env.API_URL;
const HEADERS2 = {
    'Authorization': `Bearer ${process.env.API_KEY}`, 
    'Content-Type': 'application/json'
};


function query(payload) {
    console.log("[Payload] ", payload)
    return axios.post(API_URL2, payload, { headers: HEADERS2 })
        .then(response => {
            const firstResult = response.data[0][0];
            if (firstResult.label === "LABEL_0") {
                return { is_Spam: false, probability: firstResult.score, res: response };
            } else {
                return { is_Spam: true, probability: firstResult.score, res: response };
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 503) {
                console.log("Loading...")
            }
             else console.error('Error querying API:', error.message, error);
        });
}


async function processMessage(message) {
    const response = await query({ inputs: message });
    return response
}
function isValidJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}

async function replyHandler(payload) {

    console.log(JSON.stringify(payload))
    let buttonPayload = null;
    const entry = payload.entry[0];

    if (entry && entry.changes && entry.changes.length > 0) {
        const change = entry.changes[0];
        if (change.field === 'messages' && change.value.messages && change.value.messages.length > 0) {
            const message = change.value.messages[0];
            if (message.type === 'button' && message.button) {
                buttonPayload = message.button.payload;
            }
        }
    }

    const phoneNumber = (payload.entry && payload.entry[0]?.changes && payload.entry[0]?.changes[0]?.value && payload.entry[0]?.changes[0]?.value.messages) ? payload.entry[0]?.changes[0]?.value?.messages[0]?.from : null;

    if (buttonPayload) {
        switch (buttonPayload) {
            case "Report as spam":
                // sendReply(phoneNumber, "Thank you for reporting this message!!")
                console.log("Report as spam")
            default:
                break;
        }

        return;
    }

    const messageBody = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body ?? null;
    console.log("[LOG] JSON message", messageBody)

    if (messageBody) {
        if (messageBody.length < 10) {
            console.log("[LOG] Welcome message")
            sendWelcomeResponse(phoneNumber)
        }
        else {
            await processMessage(messageBody).then(
                (result) => {
                    console.log(result)

                    if (result.is_Spam) {
                        console.log("[LOG] Spam message")
                        sendSpamResponse(phoneNumber, (result.probability * 100).toFixed(2))

                    } else if (!result.is_Spam) {
                        console.log("[LOG] Not Spam message")
                        sendNoSpamResponse(phoneNumber, (result.probability * 100).toFixed(2))
                    }
                    // sendReply(phoneNumber, msgreply)
                    else {
                        console.log("[LOG] Empty message")
                    }
                }
            );
        }
    }
}

module.exports = {
    processMessage,
    replyHandler
};