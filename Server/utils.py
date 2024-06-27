import requests
import socket
import os
import time


API_URL = os.getenv("API_URL")
API_KEY = os.getenv("API_KEY")
TC_KEY = os.getenv('TC_KEY')


def find_available_port(start_port, end_port):
    for port in range(start_port, end_port + 1):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("", port))
                return port
            except OSError:
                continue
    raise Exception(f"No available ports found in range {start_port}-{end_port}")



def query(payload):
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    try:
        response = requests.post(API_URL, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as error:
        print('Error querying API:', error)
        return None



def get_info(number):
    if len(number) != 10:
        print('Please enter a valid 10 digit number')
        return False

    search_data = {
        'number': number,
        'countryCode': 'IN',
        'installationId': TC_KEY,
    }

    try:
        response = requests.post('https://api.truecaller.com/search', json=search_data)
        response.raise_for_status()
        data = response.json().get('data', [])[0]
        
        person_data = {
            'name': data.get('name', ''),
            'altName': data.get('altName', ''),
            'access': data.get('access', ''),
            'city': data.get('addresses', [{}])[0].get('city', ''),
            'country': data.get('addresses', [{}])[0].get('countryCode', ''),
            'email': data.get('internetAddresses', [{}])[0].get('id', ''),
            'carrier': data.get('phones', [{}])[0].get('carrier', ''),
            'badges': data.get('badges', ''),
            'score': data.get('score', ''),
            'ruleName': data.get('searchWarnings', [{}])[0].get('ruleName', '')
        }

        return person_data
    except requests.RequestException as error:
        print('Error querying Truecaller API:', error)
        return None
