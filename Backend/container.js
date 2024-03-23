
const { exec } = require('child_process');

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
    const endpoint = `http://127.0.0.1:5000/startContainer?port=${port}&url=${encodeURIComponent(url)}&password=${pass}`;

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return { status: 'Error', error_message: error.message };
    }
}


module.exports = {
    findAvailablePort,
    startContainer
};