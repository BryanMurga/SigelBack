const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todos los contactos de alumnos
router.get('/', async (req, res) => {
  try {
    const listContactoAlumnos = await pool.query('SELECT * FROM ContactoAlumno');
    res.json({
      status: 200,
      message: 'Se ha listado correctamente',
      listContactoAlumnos: listContactoAlumnos,
    });
  } catch (error) {
    console.error('Error al obtener la lista de contactos de alumnos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un contacto de alumno por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const contactoAlumno = await pool.query('SELECT * FROM ContactoAlumno WHERE alumnoID = ?', [id]);
    if (contactoAlumno.length === 0) {
      return res.status(404).json({ error: 'Contacto de alumno no encontrado' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido el contacto de alumno correctamente',
      contactoAlumno: contactoAlumno,
    });
  } catch (error) {
    console.error('Error al obtener el contacto de alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear un nuevo contacto de alumno
router.post('/create', async (req, res) => {
  const { alumnoID, Comentario } = req.body;

  if ( !alumnoID || !Comentario) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'INSERT INTO ContactoAlumno (alumnoID, FechaContacto, Comentario) VALUES (?, CURRENT_DATE, ?)';

  try {
    const result = await pool.query(query, [alumnoID, Comentario]);
    res.json({ status: 200, message: 'Contacto de alumno creado exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear el contacto de alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de un contacto de alumno por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { FechaContacto, Comentario } = req.body;

  if (!FechaContacto || !Comentario) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'UPDATE ContactoAlumno SET FechaContacto = ?, Comentario = ? WHERE ContactoAlumnoID = ?';

  try {
    await pool.query(query, [FechaContacto, Comentario, id]);
    res.json({ status: 200, message: 'Contacto de alumno actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el contacto de alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un contacto de alumno por su ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM ContactoAlumno WHERE ContactoAlumnoID = ?', [id]);
    res.json({ status: 200, message: 'Contacto de alumno eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el contacto de alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
