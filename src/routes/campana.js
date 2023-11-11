const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todas las campañas
router.get('/', async (req, res) => {
  try {
    const campanas = await pool.query('SELECT * FROM Campana');
    res.json({
      status: 200,
      message: 'Se han listado las campañas correctamente',
      campanas: campanas,
    });
  } catch (error) {
    console.error('Error al obtener las campañas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener una campaña por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const campana = await pool.query('SELECT * FROM Campana WHERE CampanaID = ?', [id]);
    if (campana.length === 0) {
      return res.status(404).json({ error: 'Campaña no encontrada' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido la campaña correctamente',
      campana: campana[0],
    });
  } catch (error) {
    console.error('Error al obtener la campaña:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear una nueva campaña
router.post('/create', async (req, res) => {
  const { TipoCamp, Nombre } = req.body;

  if (!TipoCamp || !Nombre) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'INSERT INTO Campana (TipoCamp, Nombre) VALUES (?, ?)';
  const values = [TipoCamp, Nombre];

  try {
    const result = await pool.query(query, values);
    res.json({ status: 200, message: 'Campaña creada exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear la campaña:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de una campaña por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { TipoCamp, Nombre } = req.body;

  if (!TipoCamp || !Nombre) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'UPDATE Campana SET TipoCamp = ?, Nombre = ? WHERE CampanaID = ?';
  const values = [TipoCamp, Nombre, id];

  try {
    await pool.query(query, values);
    res.json({ status: 200, message: 'Campaña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la campaña:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar una campaña por su ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM Campana WHERE CampanaID = ?', [id]);
    res.json({ status: 200, message: 'Campaña eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la campaña:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
