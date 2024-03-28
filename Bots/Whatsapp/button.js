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
    const API_KEY = "EAAGAiJBrWXABO4lhIZAFqnOk1ATWZBHpZCoBJofB79J2Fabe8Q4eG4xBVL3Gd1XcbamDxrWZB32nZADJodLhgDFxSd22UX302VwZBCcgBTwc3ZBfng5SLikmuvaunMaUzSYTsv2iBQctg7UE1JjxvSJKlX8a4XFcZAnD5Fm7C0DtqMXciddZA0zEMOeeKDboF8RpRBKYIq4cHjg6JcsLYo7mdD9q403kZD";
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