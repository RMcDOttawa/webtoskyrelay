
import {TSXServer} from './TSXServer.js';


//  Service to encapsulate dealing with the TSX server.
//  Aside from handling data wrapping, it returns a promise of the response from the server

//  Send the given commands to the server, surrounding them with the special javascript comments
//  that theSkyX requires.  Return the theSkyX response to the user.

export function sendToServer(textToSend) {
    const wrappedMessage = encapsulateJsForTheSky(textToSend);
    const promiseFromServer = TSXServer.sendAndReceive(wrappedMessage);
    return promiseFromServer;
}

const TSXPrefix =
    '/* Java Script */\n' +
    '/* Socket Start Packet */\n';

const TSXSuffix = '/* Socket End Packet */\n';



function encapsulateJsForTheSky(textToSend) {
    return TSXPrefix + textToSend + TSXSuffix;
}

//  Parse the given TSX server response, which is usually in the form: Message|error info
//  example: TheSky Build=12978|No error. Error = 0.
//  and return the message and error info separately.
//  Returns an object with attributes:
//      message            The message before the |
//      error suffix       The error info after the |
//      error code         The error number, if present.

export function parseServerResponse(stringFromServer) {
    const parts = stringFromServer.split('|');
    let message = '';
    let errorSuffix = '';
    let errorCode = 0;
    if (parts.length > 0) message = parts[0];
    if (parts.length > 1) errorSuffix = parts[1];
    const errorParts = errorSuffix.split('Error =');
    if (errorParts.length > 1) {
        errorCode = Number(errorParts[1]);
    }
    return {message: message, errorSuffix: errorSuffix, errorCode: errorCode};
}
