//  Low-level communication object with TheSky X

import * as net from "net";

//  Note: TheSkyX is a very simple server.  One way this shows up is that it doesn't follow any kind
//  of protocol to return results as a stream with an end indicator.  It just sends the response to a
//  command as a single send, then it's done. It doesn't send a FIN indicator.

const portNumber = process.env.TSXPORT ? process.env.TSXPORT : 3040;
const tsxHost = process.env.TSXHOST ? process.env.TSXHOST : 'fart';

//  So, when we send a command, we just read what response comes back, once, and we're done. There is no
//  buffering and assembling of a response while we wait for some kind of "end transmission" signal

class TSXServerObject {

    socket;

    constructor() {
        // console.log('TSXServer constructor');
        this.socket = net.connect(portNumber, tsxHost, () => {
            // console.log('Connection created');
        })
    }

    //  Sends data to server.  Returns a promise that, when resolved, gives the response from the server.
    //  Use as:   const result = await sendAndReceive(message)
    sendAndReceive(textToSend) {
        // console.log(`TSXServer sendAndReceive entered`);
        return new Promise((resolve, reject) => {

            //  Listen for data coming back from the server. This will resolve the promise
            this.socket.on('data', (dataBuffer) => {
                const responseString = dataBuffer.toString();
                // console.log('data event received: ', responseString);
                resolve(responseString);
            });

            //  If we get an error back from the server we'll reject the promise
            this.socket.on('error', (error) => {
                // console.log('server error received: ', error);
                reject(error);
            })

            //  Send the message to the server
            this.socket.write(textToSend, () => {
                // console.log('SendAndReceive write callback: write is complete.')
            });
        })
    }

}

export const TSXServer = new TSXServerObject();
