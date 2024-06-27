from flask import Flask, request, jsonify
from flask_cors import CORS

from docker import DockerClient
from dotenv import load_dotenv
from threading import Timer

import os

from utils import get_info, query, find_available_port
from collections import deque

load_dotenv()

start_port = int(os.getenv("START_PORT"))
end_port = int(os.getenv("END_PORT"))
default_url = os.getenv("DEFAULT_URL")
default_password = os.getenv("DEFAULT_PASSWORD")
docker_url = os.getenv("DOCKER_URL")
docker_version = os.getenv("DOCKER_VERSION")
SERVER_URL = os.getenv("SERVER_URL")

app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Docker client
client = DockerClient(base_url=docker_url, version=docker_version)
container_queue = deque(maxlen=10)


def remove_container(container):
    try:
        container.stop()
        container.remove()
    except Exception as e:
        print(f"Error removing container: {str(e)}")
    finally:
        if container in container_queue:
            container_queue.remove(container)


# when server starts, remove all containers if present that start with "chrome-container"
def remove_all_containers():
    for container in client.containers.list(all=True):
        if container.name.startswith("chrome-container"):
            remove_container(container)

            
@app.route('/startContainer', methods=['GET'])
def start_container():
    if len(container_queue) >= 10:
        return jsonify({'status': 'Quota full'}), 429
    
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
    print("[LOG] Ports: ", port_bindings)
    try:
        container = client.containers.run(
            "kasmweb/chrome:1.14.0",
            detach=True,
            ports=port_bindings,
            environment=environment,
            shm_size='256m',
            auto_remove=True,
            name = "chrome-container-"+str(port_bindings[6901])
        )
        container_queue.append(container)
        
        # Set timer to remove the container after 10 minutes (600 seconds)
        Timer(600, remove_container, [container]).start()

        return jsonify({'status': 'Container started successfully', 'container_id': container.id, 'url': SERVER_URL+':'+str(port_bindings[6901])})
    except Exception as e:
        return jsonify({'status': 'Error', 'error_message': str(e)}), 500


@app.route('/checkSpam', methods=['POST'])
def check_spam():
    try:
        data = request.get_json()
        inputs = data.get('inputs')
        if not inputs:
            return jsonify({'error': 'Missing input text'}), 400

        result = query({'inputs': inputs})

        if result and len(result) >= 1:
            first_result = result[0][0]
            if first_result['label'] == "LABEL_0":
                return jsonify({'is_Spam': False, 'probability': first_result['score'], 'res': result})
            else:
                return jsonify({'is_Spam': True, 'probability': first_result['score'], 'res': result})
        else:
            return jsonify({'error': 'Unable to determine spam or not'}), 500
    except Exception as error:
        print('Error processing request:', error)
        return jsonify({'error': 'Internal server error'}), 500



@app.route('/getInfo/<phoneNumber>', methods=['GET'])
def get_info_route(phoneNumber):
    try:
        person_data = get_info(phoneNumber)
        if person_data:
            return jsonify({'statusCode': 200, 'body': person_data})
        else:
            return jsonify({'statusCode': 400, 'body': 'Invalid phone number'}), 400
    except Exception as error:
        print('Error getting phone number information:', error)
        return jsonify({'statusCode': 500, 'body': {'error': 'Failed to get phone number information'}}), 500
    

@app.route('/', methods=['GET'])
def home():
    return jsonify({'status': 'Server is running'})


if __name__ == '__main__':
    remove_all_containers()
    app.run(debug=True)
