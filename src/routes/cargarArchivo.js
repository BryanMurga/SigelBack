const express = require('express');
const router = express.Router();
const multer = require('multer');
const csvParser = require('csv-parser');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'APIS4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint para subir archivos CSV de leads
router.post('/upload-leads', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No se ha proporcionado ningún archivo.' });
    }

    const csvData = await parseCSV(file.buffer.toString());
    await insertDataToDatabase('Leads', csvData);

    res.json({ success: true, message: 'Archivo subido y procesado correctamente.' });
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
});

async function parseCSV(csvString) {
  return new Promise((resolve, reject) => {
    const results = [];

    require('stream')
      .Readable.from(csvString)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function insertDataToDatabase(tableName, data) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    for (const row of data) {
      const columns = Object.keys(row).join(', ');
      const values = Object.values(row);

      const placeholders = values.map(() => '?').join(', ');
      const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

      await connection.query(query, values);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = router;
