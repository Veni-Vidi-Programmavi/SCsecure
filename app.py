from flask import Flask, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

# En mémoire : toutes les données reçues
received_data = []

@app.route('/')
def index():
    return "API opérationnelle. POST /data pour envoyer des données."

@app.route('/data', methods=['POST'])
def receive_data():
    data = request.get_json() or request.form.to_dict()
    if not data:
        return jsonify({"error": "Aucune donnée fournie"}), 400

    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "data": data
    }

    received_data.append(entry)

    # Écriture dans un fichier (optionnel)
    with open("data_store.json", "a", encoding='utf-8') as f:
        f.write(json.dumps(entry) + "\n")

    return jsonify({"message": "Données reçues", "entry": entry}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
