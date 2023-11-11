const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todos los medios de contacto
router.get('/', async (req, res) => {
  try {
    const listMediosDeContacto = await pool.query('SELECT * FROM MedioDeContacto');
    res.json({
      status: 200,
      message: 'Se ha listado correctamente',
      listMediosDeContacto: listMediosDeContacto,
    });
  } catch (error) {
    console.error('Error al obtener la lista de medios de contacto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un medio de contacto por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const medioDeContacto = await pool.query('SELECT * FROM MedioDeContacto WHERE MedioID = ?', [id]);
    if (medioDeContacto.length === 0) {
      return res.status(404).json({ error: 'Medio de contacto no encontrado' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido el medio de contacto correctamente',
      medioDeContacto: medioDeContacto[0],
    });
  } catch (error) {
    console.error('Error al obtener el medio de contacto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear un nuevo medio de contacto
router.post('/create', async (req, res) => {
  const { Nombre } = req.body;

  if (!Nombre) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'INSERT INTO MedioDeContacto (Nombre) VALUES (?)';

  try {
    const result = await pool.query(query, [Nombre]);
    res.json({ status: 200, message: 'Medio de contacto creado exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear el medio de contacto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de un medio de contacto por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { Nombre } = req.body;

  if (!Nombre) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'UPDATE MedioDeContacto SET Nombre = ? WHERE MedioID = ?';

  try {
    await pool.query(query, [Nombre, id]);
    res.json({ status: 200, message: 'Medio de contacto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el medio de contacto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un medio de contacto por su ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM MedioDeContacto WHERE MedioID = ?', [id]);
    res.json({ status: 200, message: 'Medio de contacto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el medio de contacto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
