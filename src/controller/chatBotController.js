require('dotenv').config();
import request from "request";

let postWebHook = (req, res) => {
    let body = req.body;
    // checks to see if its an event from page subscription 
    if (body.object === 'page') {
        body.entry.forEach((entry) => {
            // get the message since entry.messaging is an array
            // we get the first index since it would only ever have one message
            let webhoook_event = entry.messaging[0];
            console.log(webhoook_event);
        });
        // returns a 200 ok status to all request
        res.status(200).send({ data: "EVENT_RECEIVED" });
    } else {
        res.sendStatus({ statusCode: 404 });
    }
}

let getWebhook = (req, res) => {
    // verify token
    let VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
    // parse query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    //
    if (mode && token) {
        // checks mode and token
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEB_HOOK VERIFIED');
            res.status(200).send(challenge);
        } else {
            // responds with access forbidden if access doesnt match
            res.sendStatus({ statusCode: 403 });
        }
    }
}

function handleMessage(sender_psid, received_message) {
    let response;
    // check if the message contains text
    if (received_message.text) {
        response = {
            "text": `You sent a message: "${received_message.text}". Now send an image`
        }
    }
}
// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": { "text": response }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v7.0/me/messages",
        "qs": { "access_token": process.env.FB_PAGE_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!');
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}
module.exports = {
    postWebhook: postWebhook,
    getWebhook: getWebhook
}