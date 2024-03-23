from flask import Flask, request, jsonify
from transformers import pipeline
import subprocess
import random
app = Flask(__name__)

@app.route('/checkSpam', methods=['POST'])
def check_spam():
    data = request.get_json()
    if 'input_text' not in data:
        return jsonify({'error': 'Input text not provided'}), 400
    
    input_text = data['input_text']
    pipe = pipeline("text-classification", model="Titeiiko/OTIS-Official-Spam-Model")
    res = pipe(input_text)
    result = res[0]
    print(res)
    if result["label"] == "LABEL_0":
        return jsonify({'is_Spam': False, 'probability': 1-result['score']-random.randint(1,5)*0.01})
    else:
        return jsonify({'is_Spam': True, 'probability': result['score']-random.randint(1,5)*0.01})


@app.route('/startContainer', methods=['GET'])
def start_container():
    # Get parameters from the request
    port = request.args.get('port')
    url = request.args.get('url')
    password = request.args.get('password')

    # Define the Docker command
    docker_command = [
        "timeout", "5m",
        "docker", "run", "--rm", "-it", "-d",
        "--shm-size=512m", f"-p", f"{port}:6901",
        "-e", f"VNC_PW={password}",
        "-e", f"LAUNCH_URL={url}",
        "kasmweb/chrome:1.14.0"
    ]

    process = subprocess.Popen(docker_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    # Check if there was any error
    if process.returncode != 0:
        return jsonify({'status': 'Error', 'error_message': stderr.decode('utf-8')}), 500

    return jsonify({'status': 'Container started successfully', 'output': stdout.decode('utf-8')})


if __name__ == '__main__':
    app.run(debug=True)
