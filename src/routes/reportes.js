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

// Obtener reporte de leads por promotores
router.post('/reporte-ps-pi-promotores', async (req, res) => {
  const { ciclo, fechaInicio, fechaFin } = req.body;

  try {
    const reportePromotores = await pool.query(`
      SELECT
        p.Nombre as Promotor,
        COUNT(CASE WHEN l.PSeguimiento = 'PI-INSCRIPCIÓN' THEN 1 ELSE NULL END) as PI,
        COUNT(CASE WHEN l.PSeguimiento = 'PI-INSCRIPCIÓN' AND l.FechaInscripcion IS NOT NULL THEN 1 ELSE NULL END) as INS_PI,
        COUNT(CASE WHEN l.PSeguimiento = 'PS-SEGUIMIENTO' THEN 1 ELSE NULL END) as PS,
        COUNT(CASE WHEN l.PSeguimiento = 'PS-SEGUIMIENTO' AND l.FechaInscripcion IS NOT NULL THEN 1 ELSE NULL END) as INS_PS,
        COUNT(CASE WHEN l.PSeguimiento NOT IN ('PI-INSCRIPCIÓN', 'PS-SEGUIMIENTO') THEN 1 ELSE NULL END) as INS_OTRO_STATUS,
        l.DondeObtDato as MedioOtraInscripcion,
        COUNT(CASE WHEN l.FechaInscripcion IS NOT NULL THEN 1 ELSE NULL END) as TOTAL_INS
      FROM Leads l
      INNER JOIN Promotor p ON l.promotorActual = p.PromotorID
      WHERE l.Ciclo = ? AND l.FechaPrimerContacto BETWEEN ? AND ?
      GROUP BY p.Nombre, l.DondeObtDato
    `, [ciclo, fechaInicio, fechaFin]);

    res.json({
      status: 200,
      message: 'Reporte de Leads por Promotores obtenido correctamente',
      reportePromotores: reportePromotores,
    });
  } catch (error) {
    console.error('Error al obtener el reporte de Leads por Promotores:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


module.exports = router;
