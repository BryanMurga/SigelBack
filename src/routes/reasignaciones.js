const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todas las reasignaciones
router.get('/', async (req, res) => {
  try {
    const reasignaciones = await pool.query('SELECT * FROM Reasignaciones');
    res.json({
      status: 200,
      message: 'Se han listado las reasignaciones correctamente',
      reasignaciones: reasignaciones,
    });
  } catch (error) {
    console.error('Error al obtener la lista de reasignaciones:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener una reasignación por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const reasignacion = await pool.query('SELECT * FROM Reasignaciones WHERE ReasignacionID = ?', [id]);
    if (reasignacion.length === 0) {
      return res.status(404).json({ error: 'Reasignación no encontrada' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido la reasignación correctamente',
      reasignacion: reasignacion[0],
    });
  } catch (error) {
    console.error('Error al obtener la reasignación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear una nueva reasignación
router.post('/create', async (req, res) => {
  const { LeadID, PromotorAnterior, PromotorNuevo, FechaReasignacion } = req.body;

  if (!LeadID || !PromotorAnterior || !PromotorNuevo || !FechaReasignacion) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'INSERT INTO Reasignaciones (LeadID, PromotorAnterior, PromotorNuevo, FechaReasignacion) VALUES (?, ?, ?, ?)';
  const values = [LeadID, PromotorAnterior, PromotorNuevo, FechaReasignacion];

  try {
    const result = await pool.query(query, values);
    res.json({ status: 200, message: 'Reasignación creada exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear la reasignación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de una reasignación por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { LeadID, PromotorAnterior, PromotorNuevo, FechaReasignacion } = req.body;

  if (!LeadID || !PromotorAnterior || !PromotorNuevo || !FechaReasignacion) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'UPDATE Reasignaciones SET LeadID = ?, PromotorAnterior = ?, PromotorNuevo = ?, FechaReasignacion = ? WHERE ReasignacionID = ?';
  const values = [LeadID, PromotorAnterior, PromotorNuevo, FechaReasignacion, id];

  try {
    await pool.query(query, values);
    res.json({ status: 200, message: 'Reasignación actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la reasignación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar una reasignación por su ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM Reasignaciones WHERE ReasignacionID = ?', [id]);
    res.json({ status: 200, message: 'Reasignación eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la reasignación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
