const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todas las carreras
router.get('/', async (req, res) => {
  try {
    const carreras = await pool.query('SELECT * FROM Carreras');
    res.json({
      status: 200,
      message: 'Se han listado las carreras correctamente',
      carreras: carreras,
    });
  } catch (error) {
    console.error('Error al obtener las carreras:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener una carrera por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const carrera = await pool.query('SELECT * FROM Carreras WHERE CarreraID = ?', [id]);
    if (carrera.length === 0) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido la carrera correctamente',
      carrera: carrera[0],
    });
  } catch (error) {
    console.error('Error al obtener la carrera:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear una nueva carrera
router.post('/create', async (req, res) => {
  // Desestructurar los campos del cuerpo de la solicitud
  const { Nombre } = req.body;

  // Validar campos obligatorios
  if (!Nombre) {
    return res.status(400).json({ error: 'Nombre es un campo obligatorio' });
  }

  // Construir la consulta SQL y los valores
  const query = 'INSERT INTO Carreras (Nombre) VALUES (?)';
  const values = [Nombre];

  try {
    // Ejecutar la consulta y obtener el resultado
    const result = await pool.query(query, values);

    // Enviar una respuesta JSON con el resultado
    res.json({ status: 200, message: 'Carrera creada exitosamente', insertedId: result.insertId });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al crear la carrera:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de una carrera por su ID
router.put('/update/:id', async (req, res) => {
  // Obtener el ID de la carrera desde los parámetros de la solicitud
  const { id } = req.params;

  // Desestructurar los campos del cuerpo de la solicitud
  const { Nombre } = req.body;

  // Validar campos obligatorios
  if (!Nombre) {
    return res.status(400).json({ error: 'Nombre es un campo obligatorio' });
  }

  // Construir la consulta SQL y los valores
  const query = 'UPDATE Carreras SET Nombre = ? WHERE CarreraID = ?';
  const values = [Nombre, id];

  try {
    // Ejecutar la consulta
    await pool.query(query, values);

    // Enviar una respuesta JSON
    res.json({ status: 200, message: 'Carrera actualizada exitosamente' });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al actualizar la carrera:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar una carrera por su ID
router.delete('/delete/:id', async (req, res) => {
  // Obtener el ID de la carrera desde los parámetros de la solicitud
  const { id } = req.params;

  try {
    // Ejecutar la consulta de eliminación
    await pool.query('DELETE FROM Carreras WHERE CarreraID = ?', [id]);

    // Enviar una respuesta JSON
    res.json({ status: 200, message: 'Carrera eliminada exitosamente' });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al eliminar la carrera:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
