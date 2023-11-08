const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todos los registros de ContactoAlumno
router.get('/', async (req, res) => {
  try {
    const contactosAlumno = await pool.query('SELECT * FROM ContactoAlumno');
    res.json({
      status: 200,
      message: 'Se han listado los registros de ContactoAlumno correctamente',
      contactosAlumno: contactosAlumno,
    });
  } catch (error) {
    console.error('Error al obtener la lista de registros de ContactoAlumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un registro de ContactoAlumno por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const contactoAlumno = await pool.query('SELECT * FROM ContactoAlumno WHERE ContactoAlumnoID = ?', [id]);
    if (contactoAlumno.length === 0) {
      return res.status(404).json({ error: 'Registro de ContactoAlumno no encontrado' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido el registro de ContactoAlumno correctamente',
      contactoAlumno: contactoAlumno[0],
    });
  } catch (error) {
    console.error('Error al obtener el registro de ContactoAlumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear un nuevo registro de ContactoAlumno
router.post('/create', async (req, res) => {
  const { FechaContacto, Comentario } = req.body;

  if (!FechaContacto || !Comentario) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'INSERT INTO ContactoAlumno (FechaContacto, Comentario) VALUES (?, ?)';
  const values = [FechaContacto, Comentario];

  try {
    const result = await pool.query(query, values);
    res.json({ status: 200, message: 'Registro de ContactoAlumno creado exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear el registro de ContactoAlumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de un registro de ContactoAlumno por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { FechaContacto, Comentario } = req.body;

  if (!FechaContacto || !Comentario) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'UPDATE ContactoAlumno SET FechaContacto = ?, Comentario = ? WHERE ContactoAlumnoID = ?';
  const values = [FechaContacto, Comentario, id];

  try {
    await pool.query(query, values);
    res.json({ status: 200, message: 'Registro de ContactoAlumno actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el registro de ContactoAlumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un registro de ContactoAlumno por su ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM ContactoAlumno WHERE ContactoAlumnoID = ?', [id]);
    res.json({ status: 200, message: 'Registro de ContactoAlumno eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro de ContactoAlumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
