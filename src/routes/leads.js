const express = require('express');
const router = express.Router();
const pool = require('../db.js');


// Obtener todos los leads

router.get('/', async (req, res) => {

  try {
    const leads = await pool.query('SELECT leads.LeadID, leads.NombreCompleto, leads.telefono,leads.telefono2, leads.CorreoElectronico, leads.CorreoElectronico2, leads.FechaPrimerContacto,leads.FechaNac, leads.EscuelaProcedencia, leads.NombrePais, leads.NombreEstado, leads.NombreCiudad, leads.PSeguimiento, leads.Grado,leads.EstatusInsc,leads.SemestreIngreso, leads.Ciclo, leads.AsetNameForm, leads.IsOrganic, leads.TipoReferido, leads.NombreReferido, leads.DondeObtDato, leads.FechaInscripcion, leads.BecaOfrecida, leads.NumeroLista, leads.FechaPromotorOriginal, leads.FechaPromotorActual, leads.Comentarios, leads.Programa, CarrerasInt.Nombre as CarreraInteres,  Campana.Nombre as NombreCampana, MedioDeContacto.Nombre as MedioContacto, CarreraIns.Nombre as CarreraInscrita, PromotorOri.Nombre as NombrePromotorOri, PromotorAct.Nombre as NombrePromotorAct from leads LEFT JOIN Carreras CarrerasInt ON leads.carreraInteresID = CarrerasInt.CarreraID LEFT JOIN Campana ON leads.CampanaID = Campana.CampanaID LEFT JOIN MedioDeContacto ON leads.MedioDeContactoID = MedioDeContacto.MedioID LEFT JOIN Carreras CarreraIns ON leads.CarreraInscripcion = CarreraIns.CarreraID LEFT JOIN Promotor PromotorOri ON leads.promotorOriginal = PromotorOri.PromotorID LEFT JOIN Promotor PromotorAct ON leads.promotorActual = PromotorAct.PromotorID;');
    res.json({
      status: 200,
      message: 'Se ha obtenido los leads correctamente',
      leads: leads,
    });
  } catch (error) {
    console.error('Error al obtener los leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/asignacion', async (req, res) => {

  try {
    const leads = await pool.query('SELECT * from leads where promotorOriginal is null');
    res.json({
      status: 200,
      message: 'Se ha obtenido los leads correctamente',
      leads: leads,
    });
  } catch (error) {
    console.error('Error al obtener los leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener leads con promotores asignados
router.get('/reasignacion', async (req, res) => {

  try {
    const leads = await pool.query('SELECT leads.LeadID, leads.NombreCompleto, leads.telefono,leads.telefono2, leads.CorreoElectronico, leads.CorreoElectronico2, leads.FechaPrimerContacto,leads.FechaNac, leads.EscuelaProcedencia, leads.NombrePais, leads.NombreEstado, leads.NombreCiudad, leads.PSeguimiento, leads.Grado,leads.EstatusInsc,leads.SemestreIngreso, leads.Ciclo, leads.AsetNameForm, leads.IsOrganic, leads.TipoReferido, leads.NombreReferido, leads.DondeObtDato, leads.FechaInscripcion, leads.BecaOfrecida, leads.NumeroLista, leads.FechaPromotorOriginal, leads.FechaPromotorActual, leads.Comentarios, leads.Programa, leads.FechaPromotorOriginal, CarrerasInt.Nombre as CarreraInteres,  Campana.Nombre as NombreCampana, MedioDeContacto.Nombre as MedioContacto, CarreraIns.Nombre as CarreraInscrita, PromotorOri.Nombre as NombrePromotorOri, PromotorAct.Nombre as NombrePromotorAct from leads LEFT JOIN Carreras CarrerasInt ON leads.carreraInteresID = CarrerasInt.CarreraID LEFT JOIN Campana ON leads.CampanaID = Campana.CampanaID LEFT JOIN MedioDeContacto ON leads.MedioDeContactoID = MedioDeContacto.MedioID LEFT JOIN Carreras CarreraIns ON leads.CarreraInscripcion = CarreraIns.CarreraID LEFT JOIN Promotor PromotorOri ON leads.promotorOriginal = PromotorOri.PromotorID LEFT JOIN Promotor PromotorAct ON leads.promotorActual = PromotorAct.PromotorID where datediff(curdate(), leads.FechaPromotorActual) >=3 AND FechaPrimerContacto IS NULL and promotorOriginal IS NOT NULL;');
    res.json({
      status: 200,
      message: 'Se ha obtenido los leads correctamente',
      leads: leads,
    });
  } catch (error) {
    console.error('Error al obtener los leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un lead por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const lead = await pool.query('SELECT leads.LeadID, leads.NombreCompleto, leads.telefono,leads.telefono2, leads.CorreoElectronico, leads.CorreoElectronico2, leads.FechaPrimerContacto,leads.FechaNac, leads.EscuelaProcedencia, leads.NombrePais, leads.NombreEstado, leads.NombreCiudad, leads.PSeguimiento, leads.CarreraInteresID, leads.CarreraInscripcion, leads.Grado,leads.EstatusInsc,leads.SemestreIngreso, leads.Ciclo, leads.CampanaID, leads.AsetNameForm, leads.IsOrganic, leads.MedioDeContactoID, leads.TipoReferido, leads.NombreReferido, leads.DondeObtDato, leads.FechaInscripcion, leads.BecaOfrecida, leads.NumeroLista, leads.PromotorOriginal, leads.FechaPromotorOriginal, leads.PromotorActual, leads.FechaPromotorActual, leads.Comentarios, leads.Programa, CarrerasInt.Nombre as CarreraInteres,  Campana.Nombre as NombreCampana, MedioDeContacto.Nombre as MedioContacto, CarreraIns.Nombre as CarreraInscrita, PromotorOri.Nombre as NombrePromotorOri, PromotorAct.Nombre as NombrePromotorAct from leads LEFT JOIN Carreras CarrerasInt ON leads.carreraInteresID = CarrerasInt.CarreraID LEFT JOIN Campana ON leads.CampanaID = Campana.CampanaID LEFT JOIN MedioDeContacto ON leads.MedioDeContactoID = MedioDeContacto.MedioID LEFT JOIN Carreras CarreraIns ON leads.CarreraInscripcion = CarreraIns.CarreraID LEFT JOIN Promotor PromotorOri ON leads.PromotorOriginal = PromotorOri.PromotorID LEFT JOIN Promotor PromotorAct ON leads.PromotorActual = PromotorAct.PromotorID WHERE LeadID = ?', [id]);
    if (lead.length === 0) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido el lead correctamente',
      lead: lead[0],
    });
  } catch (error) {
    console.error('Error al obtener el lead:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para crear un nuevo lead
router.post('/create', async (req, res) => {
  const {
    NombreCompleto, Telefono, Telefono2, CorreoElectronico, CorreoElectronico2, FechaPrimerContacto, FechaNac,
    EscuelaProcedencia, NombrePais, NombreEstado, NombreCiudad, PSeguimiento, CarreraInteresID, Grado, Programa,
    EstatusInsc, SemestreIngreso, Ciclo, CampanaID, AsetNameForm, IsOrganic, MedioDeContactoID, TipoReferido,
    NombreReferido, DondeObtDato, FechaInscripcion, CarreraInscripcion, BecaOfrecida, NumeroLista, promotorOriginal,
    FechaPromotorOriginal, promotorActual, FechaPromotorActual, Comentarios
  } = req.body;

  // Validar campos obligatorios
  if (!NombreCompleto || !Telefono || !CorreoElectronico) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = `
    INSERT INTO Leads (NombreCompleto, Telefono, Telefono2, CorreoElectronico, CorreoElectronico2, FechaPrimerContacto, FechaNac,
      EscuelaProcedencia, NombrePais, NombreEstado, NombreCiudad, PSeguimiento, CarreraInteresID, Grado, Programa, EstatusInsc,
      SemestreIngreso, Ciclo, CampanaID, AsetNameForm, IsOrganic, MedioDeContactoID, TipoReferido, NombreReferido, DondeObtDato,
      FechaInscripcion, CarreraInscripcion, BecaOfrecida, NumeroLista, promotorOriginal, FechaPromotorOriginal, promotorActual, FechaPromotorActual, Comentarios) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    NombreCompleto, Telefono, Telefono2, CorreoElectronico, CorreoElectronico2, FechaPrimerContacto, FechaNac,
    EscuelaProcedencia, NombrePais, NombreEstado, NombreCiudad, PSeguimiento, CarreraInteresID, Grado, Programa,
    EstatusInsc, SemestreIngreso, Ciclo, CampanaID, AsetNameForm, IsOrganic, MedioDeContactoID, TipoReferido,
    NombreReferido, DondeObtDato, FechaInscripcion, CarreraInscripcion, BecaOfrecida, NumeroLista, promotorOriginal,
    FechaPromotorOriginal, promotorActual, FechaPromotorActual, Comentarios
  ];

  try {
    const result = await pool.query(query, values);
    res.json({ status: 200, message: 'Lead creado exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear el lead:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


// Actualizar solo el campo Promotor Original de un lead por su ID
router.put('/update-promotor/:id', async (req, res) => {
  const { id } = req.params;
  const { promotorOriginal } = req.body;

  // Validar que el campo PromotorActual esté presente en la solicitud
  if (!promotorOriginal) {
    return res.status(400).json({ error: 'El campo Promotor Original es obligatorio' });
  }

  const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = 'UPDATE Leads SET promotorOriginal = ?, FechaPromotorOriginal = ?, promotorActual = ?, FechaPromotorActual = ? WHERE LeadID = ?';
  const values = [promotorOriginal, fechaActual,promotorOriginal, fechaActual, id];

  try {
    await pool.query(query, values);
    res.json({ status: 200, message: 'Promotor actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el promotor del lead:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar solo el campo Promotor Actual de un lead por su ID
router.put('/update-promotor-actual/:id', async (req, res) => {
  const { id } = req.params;
  const { promotorActual } = req.body;

  // Validar que el campo PromotorActual esté presente en la solicitud
  if (!promotorActual) {
    return res.status(400).json({ error: 'El campo Promotor Actual es obligatorio' });
  }

  const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = `UPDATE Leads SET promotorActual = ?, FechaPromotorActual = ? WHERE LeadID = ?`;
  const values = [promotorActual, fechaActual, id];

  try {
    await pool.query(query, values);
    res.json({ status: 200, message: 'Promotor actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el promotor del lead:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de un lead por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;

  const {
    NombreCompleto, Telefono, Telefono2, CorreoElectronico, CorreoElectronico2, FechaPrimerContacto, FechaNac,
    EscuelaProcedencia, NombrePais, NombreEstado, NombreCiudad, PSeguimiento, CarreraInteresID, Grado, Programa,
    EstatusInsc, SemestreIngreso, Ciclo, CampanaID, AsetNameForm, IsOrganic, MedioDeContactoID, TipoReferido,
    NombreReferido, DondeObtDato, FechaInscripcion, CarreraInscripcion, BecaOfrecida, NumeroLista, promotorOriginal,
    FechaPromotorOriginal, promotorActual, FechaPromotorActual, Comentarios, Contacto
  } = req.body;

  // Validar campos obligatorios
  if (!NombreCompleto || !Telefono || !CorreoElectronico || !FechaPrimerContacto || !CarreraInteresID) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = `UPDATE Leads SET
      NombreCompleto = ?, Telefono = ?, Telefono2 = ?, CorreoElectronico = ?, CorreoElectronico2 = ?, FechaPrimerContacto = ?, FechaNac = ?,
      EscuelaProcedencia = ?, NombrePais = ?, NombreEstado = ?, NombreCiudad = ?, PSeguimiento = ?, CarreraInteresID = ?, Grado = ?, Programa = ?,
      EstatusInsc = ?, SemestreIngreso = ?, Ciclo = ?, CampanaID = ?, AsetNameForm = ?, IsOrganic = ?, MedioDeContactoID = ?, TipoReferido = ?,
      NombreReferido = ?, DondeObtDato = ?, FechaInscripcion = ?, CarreraInscripcion = ?, BecaOfrecida = ?, NumeroLista = ?, promotorOriginal = ?,
      FechaPromotorOriginal = ?, promotorActual = ?, FechaPromotorActual = ?, Comentarios = ?, Contacto = ?
      WHERE LeadID = ?`;

  const values = [
    NombreCompleto, Telefono, Telefono2, CorreoElectronico, CorreoElectronico2, FechaPrimerContacto, FechaNac,
    EscuelaProcedencia, NombrePais, NombreEstado, NombreCiudad, PSeguimiento, CarreraInteresID, Grado, Programa,
    EstatusInsc, SemestreIngreso, Ciclo, CampanaID, AsetNameForm, IsOrganic, MedioDeContactoID, TipoReferido,
    NombreReferido, DondeObtDato, FechaInscripcion, CarreraInscripcion, BecaOfrecida, NumeroLista, promotorOriginal,
    FechaPromotorOriginal, promotorActual, FechaPromotorActual, Comentarios, Contacto,
    LeadID
  ];

  try {
    await pool.query(query, values);
    res.json({ status: 200, message: 'Lead actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el lead:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un lead por su ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Ejecutar la consulta de eliminación
    await pool.query('DELETE FROM Leads WHERE LeadID = ?', [id]);

    // Enviar una respuesta JSON
    res.json({ status: 200, message: 'Lead eliminado exitosamente' });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al eliminar el lead:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/contacto/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const contacto = await pool.query('select leads.NombreCompleto, contacto.FechaContacto, contacto.Comentario, contacto.LeadID, contacto.nombrePromotor from Contacto left join leads on Contacto.LeadID = leads.LeadID where Contacto.LeadID = ?;', [id]);
    res.json({
      status: 200,
      message: 'Se ha obtenido los comentarios del lead correctamente',
      contacto: contacto,
    });
  } catch (error) {
    console.error('Error al obtener los leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/historial-reasignacion/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const historial = await pool.query('select NombrePromotor, FechaReasignacion from Reasignaciones where LeadID = ?;', [id]);
    res.json({
      status: 200,
      message: 'Se ha obtenido el historial de promotores correctamente',
      historial: historial,
    });
  } catch (error) {
    console.error('Error al obtener el historial:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});






module.exports = router;  