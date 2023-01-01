
//  If a human connects to the server at root level, we'll return an html file explaining what to do

export const rootHtmlFileRoute = {
    method: 'GET',
    path: '/',
    // handler: async (req, h) => {
    //     return "I'd return an html file here if I could figure out how";
    // }
    handler: {
        file: 'documentation.html'
    }
}
