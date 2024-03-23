from flask import Flask, request, jsonify
from transformers import pipeline

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
        return jsonify({'is_Spam': False, 'probability': 1-result['score']})
    else:
        return jsonify({'is_Spam': True, 'probability': result['score']})

if __name__ == '__main__':
    app.run(debug=True)
