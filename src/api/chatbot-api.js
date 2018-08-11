
import { getChatbotClient } from 'config/api-config.js';
async function doSendMessage (message, token) {
    let ret = null;
    try {
        if (token !== null) {
            const client = getChatbotClient(token);
            const response = await client.textRequest(message);
            ret = response.result.fulfillment;
        } else throw new Error("invalid token");
    } catch (err) {
        console.log("ERROR on chatbot call",err);
    }
    return ret;
}

module.exports = { "doSendMessage": doSendMessage };