const Docker = require('dockerode');
const dockerConfig = {
    socketPath: '/var/run/docker.sock', 
    host: 'http://docker.internal',     
    port: 5555,                         
    ca: null,                           
    cert: null,                         
    key: null,                           
    protocol: 'https',                   
    timeout: 5000,                       
};


const docker = new Docker(dockerConfig);
function findAvailablePort(startPort, endPort) {
    return new Promise((resolve, reject) => {
        const net = require('net');
        const server = net.createServer();

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                if (startPort < endPort) {
                    findAvailablePort(startPort + 1, endPort).then(resolve).catch(reject);
                } else {
                    reject(new Error('No available ports in the specified range'));
                }
            } else {
                reject(err);
            }
        });

        server.listen(startPort, () => {
            const port = server.address().port;
            server.close(() => {
                resolve(port);
            });
        });
    });
}

async function startContainer(port, url, pass) {
    const docker = new Docker();

    const image = 'kasmweb/chrome:1.14.0';
    const cmd = null; // No specific command to run since it's defined in the image
    const stream = process.stdout; // Stream output to stdout
    const createOptions = {
        Tty: false,
        OpenStdin: true,
        StdinOnce: true,
        Env: [
            `VNC_PW=${pass}`,
            `LAUNCH_URL=${url}`
        ],
        HostConfig: {
            AutoRemove: false,
            ShmSize: 512 * 1024 * 1024, // 512 MB
            PortBindings: {
                '6901/tcp': [{ HostPort: port.toString() }]
            },
            Privileged: true
        }
    };
    const startOptions = {

    };

    docker.run(image, cmd, stream, createOptions, startOptions, function (err, data, container) {
        if (err) {
            console.error('Error running container:', err);
            return;
        }
        console.log('Container started successfully:', data);
    });

}

// async function startContainer(url, pass) {
//     await findAvailablePort(5000, 6000).then((port) => {
//         docker.run(
//             'kasmweb/chrome:1.14.0',
//             [],
//             [],
//             {
//                 HostConfig: {
//                     PortBindings: {
//                         '6901/tcp': [{ HostPort: port.toString() }],
//                     },
//                     ShmSize: 256000000,
//                     AutoRemove: true,
//                 },
//                 Env: [
//                     `VNC_PW=${pass}`,
//                     `LAUNCH_URL=${url}`
//                 ],
//                 Tty: true,
//                 OpenStdin: true,
//             }
//         );
//         return port;
//     }).then(port => port).catch((err) => {
//         console.error('Error starting container:', err);
//         throw err;
//     });    
// }

module.exports = {
    findAvailablePort,
    startContainer
};