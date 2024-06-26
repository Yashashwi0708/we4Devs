from flask import Flask, request, jsonify
from docker import DockerClient
from dotenv import load_dotenv

import socket
import os
# import requests

load_dotenv()
start_port = int(os.getenv("START_PORT"))
end_port = int(os.getenv("END_PORT"))
default_url = os.getenv("DEFAULT_URL")
default_password = os.getenv("DEFAULT_PASSWORD")
docker_url = os.getenv("DOCKER_URL")
docker_version = os.getenv("DOCKER_VERSION")

API_URL = "https://api-inference.huggingface.co/models/Titeiiko/OTIS-Official-Spam-Model"
HEADERS = {"Authorization": "Bearer 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"}

app = Flask(__name__)

def find_available_port(start_port, end_port):
    for port in range(start_port, end_port + 1):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            sock.bind(('127.0.0.1', port))
            return port
        except socket.error as e:
            if e.errno == socket.errno.EADDRINUSE:
                continue
            else:
                raise
        finally:
            sock.close()

    raise ValueError("No available ports in the specified range")


client = DockerClient(base_url=docker_url , version=docker_version)

@app.route('/startContainer', methods=['GET'])
def start_container():
    
    url = request.args.get('url')
    password = request.args.get('password')
    if password is None:
        password = default_password
    if url is None:
        url = default_url

    environment = {
        "VNC_PW": password,
        "LAUNCH_URL": url
    }


    port_bindings = {6901: find_available_port(start_port, end_port)}

    try:
        
        container = client.containers.run(
            "kasmweb/chrome:1.14.0",
            detach=True,
            ports=port_bindings,
            environment=environment,
            shm_size='256m',
            auto_remove=True
        )
        return jsonify({'status': 'Container started successfully', 'container_id': container.id})
    except Exception as e:
        return jsonify({'status': 'Error', 'error_message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
