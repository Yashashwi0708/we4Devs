const axios = require('axios');
const { sendReply } = require('./reply');
const e = require('express');
const sendSpamTemplate = (phoneNumber, spamScore, detected = "Spam Content") => {
    return {
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "type": "template",
        "template": {
            "name": "alert_no_url",
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
// Function to send messages via WhatsApp API
function sendSpamResponse(phoneNumber, spamScore) {
    // Replace these with your actual API credentials
    const API_KEY = "EAAMZAwASS9x4BO5OnNYtCHpK5MxDdEnnFZCpuZCHC0tuZCyvpSh7n0YakMuP2UA9ISltF46BrpOaiQd01SlmLNZCKZCNaIX2K8Nvj6zZA68lZBmn0mXLQNNemvki2NrIYiWoF3G07V4cbogiJIeEOs8j3jrnUwZCmN6uuDgPsZAdAaTyDvq3nokdIy2TR9OvW2v9RunRw6cTTSIuWaZA9Bd580m41VgjKYZD";
    const BASE_URL = "https://graph.facebook.com/v18.0/252567547942507/messages";

    axios.post(BASE_URL, sendSpamTemplate(
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

async function processMessage(message) {
    console.log(message)
    const response = await query({ input_text: message });
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
                // sendReportAsSpamResponse(phoneNumber)
                sendReply(phoneNumber, "Thank you for reporting this message!!")
            // console.log(phoneNumber, result);
            default:
                break;
        }

        return;
    }

    const messageBody = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body ?? null;

    // Process the message
    if (isValidJson(messageBody)) {
        await processMessage(messageBody).then(
            (result) => {
                let msgreply
                if (messageBody.length < 10) {
                    msgreply = `🔶 I am *SafeGuard*, your personal spam protection assistant.

🔶 Let me help you keep your conversations safe and spam-free.

🔷 Get safety report for a message by *forwarding it* to me.

🔷 *Visit SafeGuard* for:
▫️ _Virtual disposable browser_
▫️ _Phone number checker_
▫️ _Spam detection and highlighting_

🔷 Send *Hi* to see this menu.

🔷 Stay Safe!

🔷 _Visit us at https://safeguard.wcewlug.org_`
                }
                else if ((result.probability * 100).toFixed(2) > 50) {
                    msgreply = `⚠️ *Alert* ⚠️

This message was assessed to be *${(result.probability * 100).toFixed(0)}%* spam.

⛔️ Report it, and help keep others safe.

🔷 _Visit us at https://safeguard.wcewlug.org_`
                } else if ((result.probability * 100).toFixed(2) < 50) {
                    msgreply = `✅ *Safe* ✅

This message was assessed to be *${100 - (result.probability * 100).toFixed(0)}%* safe.

👍 Good to go!

🔷 _Visit us at https://safeguard.wcewlug.org_`
                }
                else {
                    msgreply = `🤔Something went wrong, please try again...`
                }

                sendReply(phoneNumber, msgreply)
                // sendSpamResponse(phoneNumber, (result.probability * 100).toString().slice(0, 5))
                // console.log(phoneNumber, result);
            }
        );
    }
}

module.exports = {
    processMessage,
    replyHandler
};