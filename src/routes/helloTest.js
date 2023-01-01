//  Simple endpoint to test connection. They connect to /api/hello and we respond with a simple hello object

export const helloTestRoute = {
    method: 'GET',
    path: '/api/hello',
    handler: async (req, h) => {
        return {response: "Hello from Web-to-Sky Relay"};
    }
}
