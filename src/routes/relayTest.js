import Boom from "@hapi/boom";

//  Simple test of whether the relay to TheSkyX is working
//  We send a trivial command to TheSkyX and return its response.

import {sendToServer, parseServerResponse} from "../services/TsxServerService";

const trivialCommand =
    'var Out;\n' +
    'Out="TheSky Build=" + Application.build\n';

export const relayTestRoute = {
    method: 'GET',
    path: '/api/relaytest',
    handler:  async (req, h) => {
        const response = await sendToServer(trivialCommand);
        const {message, errorSuffix, errorCode} = parseServerResponse(response);
        if (errorCode === 0) {
            return {response: message};
        } else {
            Boom.badRequest(errorSuffix);
        }
    }
}
