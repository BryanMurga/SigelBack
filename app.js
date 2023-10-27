const express = require('express');
const db = require('./db'); // Importa la conexión a la base de datos

const app = express();
const port = 3307; // Puerto en el que escuchará tu servidor

// Ruta de ejemplo
app.get('/leads', (req, res) => {
  // Aquí puedes escribir consultas SQL para interactuar con la base de datos y responder con los resultados
  db.query('SELECT * FROM Leads', (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(results); // Responde con los resultados en formato JSON
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});