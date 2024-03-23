const sendReportAsSpamResponse = async (phoneNumber) => {
    const response = await query({ input_text: phoneNumber });
    return response
}


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

module.exports = {
    sendSpamResponse,
    sendReportAsSpamResponse
};