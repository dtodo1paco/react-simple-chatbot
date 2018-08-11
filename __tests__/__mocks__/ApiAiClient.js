/**
 * Delay for a number of milliseconds
 */
function sleep(delay) {
    var start = new Date().getTime();
    console.log("sleeping for ["+delay+"] ms...")
    while (new Date().getTime() < start + delay);
    console.log("waking up after ["+delay+"] ms!!!")
}

export default class ApiAiClient {
    constructor (token) {
        //console.log("Creating Mock AI client:");// "+JSON.stringify(token)+"}");
        console.log("Creating Mock AI client: "+JSON.stringify(token)+"}");
    }

    textRequest(message) {
        sleep(100);
        let response = {
            "result": {
                "fulfillment": {
                    "speech": "¿Decías?, es que no estoy conectado :( ... ",
                    "messages": [
                        {
                            "type": 0,
                            "speech": "¿Podrías repetirlo, por favor?. No estoy conectadoooo"
                        }
                    ]
                }
            }
        }
        return response;
    }
}

