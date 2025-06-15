import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve('./data_store.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = req.body || {};
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: "Corps invalide" });
      }
    }

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error: "Aucune donnée fournie" });
    }

    const entry = {
      timestamp: new Date().toISOString(),
      data: body
    };

    const line = JSON.stringify(entry) + "\n";
    try {
      fs.appendFileSync(dataFilePath, line, { encoding: 'utf-8' });
    } catch {
      return res.status(500).json({ error: "Erreur d'écriture dans le fichier." });
    }

    return res.status(200).json({ message: "Données reçues", entry });
  }

  if (req.method === 'GET') {
    try {
      const content = fs.readFileSync(dataFilePath, 'utf-8');
      const lines = content.trim().split('\n');
      const data = lines.map(line => JSON.parse(line));
      return res.status(200).json(data);
    } catch {
      return res.status(200).json([]);  // Si fichier vide
    }
  }

  res.status(405).json({ error: 'Méthode non autorisée' });
}
