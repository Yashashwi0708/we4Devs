// const axios = require('axios');
// const permaToken = `EAAMZAwASS9x4BO5OnNYtCHpK5MxDdEnnFZCpuZCHC0tuZCyvpSh7n0YakMuP2UA9ISltF46BrpOaiQd01SlmLNZCKZCNaIX2K8Nvj6zZA68lZBmn0mXLQNNemvki2NrIYiWoF3G07V4cbogiJIeEOs8j3jrnUwZCmN6uuDgPsZAdAaTyDvq3nokdIy2TR9OvW2v9RunRw6cTTSIuWaZA9Bd580m41VgjKYZD`
// async function sendReply(phoneReceiver, messageBody) {
//     console.log("sending-reply------");
//     try {
//         const response = await axios.post('https://graph.facebook.com/v18.0/252567547942507/messages', {
//             "messaging_product": "whatsapp",
//             "to": phoneReceiver,
//             "type": "text",
//             "text": {
//                 "preview_url": false,
//                 "body": messageBody
//             }
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${permaToken}`
//             }
//         });

//         console.log(response.data);

//         console.log("---------[LOG] DONE---------");
//     } catch (error) {
//         console.error(error);
//     }
// }
// exports.sendReply = sendReply;



// const axios = require('axios');

// const sendSpamTemplate = (phoneNumber, spamScore, detected = "Spam Content") => {
//     return {
//         "messaging_product": "whatsapp",
//         "to": phoneNumber,
//         "type": "template",
//         "template": {
//             "name": "alert_no_url",
//             "language": {
//                 "code": "EN"
//             },
//             "components": [
//                 {
//                     "type": "body",
//                     "parameters": [
//                         {
//                             "type": "text",
//                             "text": spamScore
//                         },
//                         {
//                             "type": "text",
//                             "text": detected
//                         }
//                     ]
//                 }
//             ]
//         }
//     };
// }
// // Function to send messages via WhatsApp API
// function sendSpamResponse(phoneNumber, spamScore) {
//     const API_KEY = process.env.WA_API_KEY
//     const BASE_URL = process.env.WA_BASE_URL

//     // 1505f40aa3103beb3cc68eaaecd26055
//     axios.post(BASE_URL, sendSpamTemplate(
//         phoneNumber,
//         spamScore,
//     ), {
//         headers: {
//             Authorization: `Bearer ${API_KEY}`,
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => {
//             console.log('Message sent:', response.data);
//         })
//         .catch(error => {
//             console.error('Error sending message:', error);
//         });
// }
