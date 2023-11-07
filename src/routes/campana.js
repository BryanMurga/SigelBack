const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Listar todas las campañas
router.get('/', async (req, res) => {
  try {
    const campañas = await pool.query('SELECT * FROM Campana');
    res.json({
      status: 200,
      message: 'Listado de campañas',
      campañas: campañas,
    });
  } catch (error) {
    console.error('Error al obtener la lista de campañas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener una campaña por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const campaña = await pool.query('SELECT * FROM Campana WHERE CampanaID = ?', [id]);
    if (campaña.length === 0) {
      return res.status(404).json({ error: 'Campaña no encontrada' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido la campaña correctamente',
      campaña: campaña[0],
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

  const nuevaCampana = { TipoCamp, Nombre };

  try {
    const result = await pool.query('INSERT INTO Campana SET ?', [nuevaCampana]);
    res.json({ status: 200, message: 'Nueva campaña creada exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear la campaña:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar una campaña por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { TipoCamp, Nombre } = req.body;

  if (!TipoCamp || !Nombre) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const campañaActualizada = { TipoCamp, Nombre };

  try {
    await pool.query('UPDATE Campana SET ? WHERE CampanaID = ?', [campañaActualizada, id]);
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
