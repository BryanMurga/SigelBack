const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Listar todas las carreras de interés
router.get('/', async (req, res) => {
  try {
    const carreras = await pool.query('SELECT * FROM CarreraInteres');
    res.json({
      status: 200,
      message: 'Listado de carreras de interés',
      carreras: carreras,
    });
  } catch (error) {
    console.error('Error al obtener la lista de carreras de interés:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener una carrera de interés por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const carrera = await pool.query('SELECT * FROM CarreraInteres WHERE CarreraID = ?', [id]);
    if (carrera.length === 0) {
      return res.status(404).json({ error: 'Carrera de interés no encontrada' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido la carrera de interés correctamente',
      carrera: carrera[0],
    });
  } catch (error) {
    console.error('Error al obtener la carrera de interés:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear una nueva carrera de interés
router.post('/create', async (req, res) => {
  const { Nombre } = req.body;

  if (!Nombre) {
    return res.status(400).json({ error: 'El campo Nombre es obligatorio' });
  }

  const nuevaCarrera = { Nombre };

  try {
    const result = await pool.query('INSERT INTO CarreraInteres SET ?', [nuevaCarrera]);
    res.json({ status: 200, message: 'Nueva carrera de interés creada exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear la carrera de interés:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar una carrera de interés por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { Nombre } = req.body;

  if (!Nombre) {
    return res.status(400).json({ error: 'El campo Nombre es obligatorio' });
  }

  const carreraActualizada = { Nombre };

  try {
    await pool.query('UPDATE CarreraInteres SET ? WHERE CarreraID = ?', [carreraActualizada, id]);
    res.json({ status: 200, message: 'Carrera de interés actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la carrera de interés:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar una carrera de interés por su ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM CarreraInteres WHERE CarreraID = ?', [id]);
    res.json({ status: 200, message: 'Carrera de interés eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la carrera de interés:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
