const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.post('/update', async (req, res) => {

    const updateLead = req.body;
  
    if (!updateLead || !updateLead.ids) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const leadIDs = Array.isArray(updateLead.ids) ? updateLead.ids : [updateLead.ids];

  
    const query = `UPDATE Leads
    SET 
      EscuelaProcedencia = COALESCE(?, EscuelaProcedencia),
      NombrePais = COALESCE(?, NombrePais),
      NombreEstado = COALESCE(?, NombreEstado),
      NombreCiudad = COALESCE(?, NombreCiudad),
      PSeguimiento = COALESCE(?, PSeguimiento),
      CarreraInteresID = COALESCE(?, CarreraInteresID),
      Grado = COALESCE(?, Grado),
      Programa = COALESCE(?, Programa),
      EstatusInsc = COALESCE(?, EstatusInsc),
      SemestreIngreso = COALESCE(?, SemestreIngreso),
      Ciclo = COALESCE(?, Ciclo),
      CampanaID = COALESCE(?, CampanaID),
      AsetNameForm = COALESCE(?, AsetNameForm),
      IsOrganic = COALESCE(?, IsOrganic),
      MedioDeContactoID = COALESCE(?, MedioDeContactoID)
    WHERE LeadID IN (${leadIDs.map(() => '?').join(',')})`;
  
  const valores = [
    updateLead.EscuelaProcedencia,
    updateLead.NombrePais,
    updateLead.NombreEstado,
    updateLead.NombreCiudad,
    updateLead.PSeguimiento,
    updateLead.CarreraInteresID,
    updateLead.Grado,
    updateLead.Programa,
    updateLead.EstatusInsc,
    updateLead.SemestreIngreso,
    updateLead.Ciclo,
    updateLead.CampanaID,
    updateLead.AsetNameForm,
    updateLead.IsOrganic,
    updateLead.MedioDeContactoID,
    ...leadIDs
    ];
  
    try {
      await pool.query(query, valores);
      res.json({ status: 200, message: 'Lead actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar el lead:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  
  });





  module.exports = router;