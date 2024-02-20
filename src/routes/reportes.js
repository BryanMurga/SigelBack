const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Generar reporte de Leads
router.post('/reporte-ps-pi', async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;

  try {
    const reporte = await pool.query(`
    SELECT Grado, Programa, Ciclo, PSeguimiento, COUNT(LeadID) as total
    FROM Leads
    WHERE FechaPrimerContacto BETWEEN ? AND ?
      AND (PSeguimiento = 'PI-INSCRIPCIÓN' OR PSeguimiento = 'PS-SEGUIMIENTO')
    GROUP BY Grado, Programa, PSeguimiento
  `, [fechaInicio, fechaFin]);

    res.json({
      status: 200,
      message: 'Se ha generado el reporte de Leads correctamente',
      reporte: reporte,
    });
  } catch (error) {
    console.error('Error al generar el reporte de Leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
