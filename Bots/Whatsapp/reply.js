const axios = require('axios');
const permaToken = `EAAMZAwASS9x4BO5OnNYtCHpK5MxDdEnnFZCpuZCHC0tuZCyvpSh7n0YakMuP2UA9ISltF46BrpOaiQd01SlmLNZCKZCNaIX2K8Nvj6zZA68lZBmn0mXLQNNemvki2NrIYiWoF3G07V4cbogiJIeEOs8j3jrnUwZCmN6uuDgPsZAdAaTyDvq3nokdIy2TR9OvW2v9RunRw6cTTSIuWaZA9Bd580m41VgjKYZD`
async function sendReply(phoneReceiver, messageBody) {
    console.log("sending-reply------");
    try {
        const response = await axios.post('https://graph.facebook.com/v18.0/252567547942507/messages', {
            "messaging_product": "whatsapp",
            "to": phoneReceiver,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": messageBody
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${permaToken}`
            }
        });

        console.log(response.data);

        console.log("---------[LOG] DONE---------");
    } catch (error) {
        console.error(error);
    }
}
exports.sendReply = sendReply;
