import Hapi from '@hapi/hapi';
import routes from './routes';
import * as inert from '@hapi/inert';
import * as Path from "path";

let thisRelayServer;


const start = async () => {
    thisRelayServer = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'static')
            }
        }
    });

    await thisRelayServer.register(inert);

    routes.forEach(route => thisRelayServer.route(route));

    await thisRelayServer.start();
    console.log(`Web-To-Sky Relay Server is listening on ${thisRelayServer.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT',  async () => {
    console.log('Stopping server');
    await thisRelayServer.stop({timeout: 10000});
    console.log('Server stopped');
    process.exit( 0);
})

start();
