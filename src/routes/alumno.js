const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todos los alumnos
router.get('/', async (req, res) => {

  const userName = req.query.userName;

  if (!userName) {
    return res.status(400).json({ error: 'Se requiere el parámetro userName en el cuerpo de la solicitud' });
  }

  const query = `SELECT AlumnoID, LeadID, alumnos.Nombre as NombreAlumno, alumnos.Telefono, EscuelaProcedencia, alumnos.PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja, RSFacebook, RSInstagram, RSTiktok, RsLinkedln, RsTwiter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional, Carreras.Nombre as CarreraInsc, promotor.Nombre as PromotorNombre from alumnos LEFT JOIN Carreras ON CarreraInscripcion = Carreras.CarreraID LEFT JOIN promotor ON alumnos.PromotorID = promotor.PromotorID
  LEFT JOIN users ON promotor.PromotorID = users.promotorId WHERE users.userName = ?;`

  const valores = [userName];

  try {
    const alumnos = await pool.query(query, valores);
    res.json({
      status: 200,
      message: 'Lead listado exitosamente',
      alumnos: alumnos
    });
  } catch (error) {
    console.error('Error al obtener los leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/coordinador', async (req, res) => {

  const userName = req.query.userName;

  const query = `SELECT AlumnoID, alumnos.LeadID, alumnos.Nombre as NombreAlumno, alumnos.Telefono, alumnos.EscuelaProcedencia, alumnos.PromotorID, NoRecibo, Matricula, alumnos.CarreraInscripcion, Procedencia, TipoBaja, RSFacebook, RSInstagram, RSTiktok, RsLinkedln, RsTwiter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional, leads.CorreoElectronico, leads.FechaNac, leads.NombrePais, leads.NombreEstado, leads.NombreCiudad, leads.Grado, leads.Programa, leads.SemestreIngreso, leads.Ciclo, leads.TipoReferido, leads.NombreReferido, leads.FechaInscripcion, leads.BecaOfrecida, Carreras.Nombre as CarreraInsc, promotor.Nombre as PromotorNombre from alumnos LEFT JOIN leads ON alumnos.LeadID = leads.LeadID  LEFT JOIN Carreras ON alumnos.CarreraInscripcion = Carreras.CarreraID LEFT JOIN promotor ON alumnos.PromotorID = promotor.PromotorID ;`

  try {
    const alumnos = await pool.query(query);
    res.json({
      status: 200,
      message: 'Lead listado exitosamente',
      alumnos: alumnos
    });
  } catch (error) {
    console.error('Error al obtener los leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/redes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const redes = await pool.query('SELECT AlumnoID, RSFacebook, RSInstagram, RSTiktok, RsLinkedln, RsTwiter, RSWhatsapp, RSOtro from alumnos where AlumnoID = ?;', [id]);
    if (redes.length === 0) {
      return res.status(404).json({ error: 'Redes no encontradas' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido las redes correctamente',
      redes: redes[0],
    });
  } catch (error) {
    console.error('Error al obtener el alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un alumno por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const alumno = await pool.query(`SELECT *, alumnos.Nombre as nombreAlumno, carreras.Nombre as CarreraInscrita, Promotor.Nombre as NombrePromotor
    FROM Alumnos
    LEFT JOIN carreras ON Alumnos.CarreraInscripcion = carreras.CarreraID
    LEFT JOIN promotor ON Alumnos.PromotorID = promotor.PromotorID
    WHERE Alumnos.AlumnoID = ?;`, [id]);
    if (alumno.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido el alumno correctamente',
      alumno: alumno[0],
    });
  } catch (error) {
    console.error('Error al obtener el alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear un nuevo alumno
router.post('/create', async (req, res) => {
  // Desestructurar los campos del cuerpo de la solicitud
  const { LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja,
    RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional } = req.body;

  // Validar campos obligatorios
  if (!LeadID || !Nombre) {
    return res.status(400).json({ error: 'LeadID y Nombre son campos obligatorios' });
  }

  // Construir la consulta SQL y los valores
  const query = `INSERT INTO Alumnos
    (LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja,
    RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja,
    RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional];

  try {
    // Ejecutar la consulta y obtener el resultado
    const result = await pool.query(query, values);

    // Enviar una respuesta JSON con el resultado
    res.json({ status: 200, message: 'Alumno creado exitosamente', insertedId: result.insertId });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al crear el alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de un alumno por su ID
router.put('/update/:id', async (req, res) => {
  // Obtener el ID del alumno desde los parámetros de la solicitud
  const { id } = req.params;

  // Desestructurar los campos del cuerpo de la solicitud
  const { Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja,
    RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional } = req.body;

  // Validar campos obligatorios
  if (!Nombre) {
    return res.status(400).json({ error: 'LeadID y Nombre son campos obligatorios' });
  }

  // Construir la consulta SQL y los valores
  const query = `UPDATE alumnos SET
  Nombre = COALESCE(?, Nombre),
  Telefono = COALESCE(?, Telefono),
  EscuelaProcedencia = COALESCE(?, EscuelaProcedencia),
  PromotorID = COALESCE(?, PromotorID),
  NoRecibo = COALESCE(?, NoRecibo),
  Matricula = COALESCE(?, Matricula),
  CarreraInscripcion = COALESCE(?, CarreraInscripcion),
  Procedencia = COALESCE(?, Procedencia),
  TipoBaja = COALESCE(?, TipoBaja),
  RSFacebook = COALESCE(?, RSFacebook),
  RSInstagram = COALESCE(?, RSInstagram),
  RSTiktok = COALESCE(?, RSTiktok),
  RSLinkedln = COALESCE(?, RSLinkedln),
  RSTwiter = COALESCE(?, RSTwiter),
  RSWhatsapp = COALESCE(?, RSWhatsapp),
  RSOtro = COALESCE(?, RSOtro),
  ContactoID = COALESCE(?, ContactoID),
  Estatus = COALESCE(?, Estatus),
  FechaBaja = COALESCE(?, FechaBaja),
  CorreoInstitucional = COALESCE(?, CorreoInstitucional)
WHERE AlumnoID = ?;`;

  const values = [ Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja,
    RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional, id];

  try {
    // Ejecutar la consulta
    await pool.query(query, values);
    // Enviar una respuesta JSON
    res.json({ status: 200, message: 'Alumno actualizado exitosamente' });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al actualizar el alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

//Dar de baja alumno
router.put('/baja/:id', async (req, res) => {
  // Obtener el ID del alumno desde los parámetros de la solicitud
  const { id } = req.params;

  // Desestructurar los campos del cuerpo de la solicitud
  const { TipoBaja} = req.body;

  // Validar campos obligatorios
  if (!TipoBaja) {
    return res.status(400).json({ error: 'TipoBaja, Estatus y FechaBaja son campos obligatorios' });
  }

  // Construir la consulta SQL y los valores
  const query = `UPDATE alumnos SET
  TipoBaja = ?, Estatus = 'BAJA', FechaBaja = CURRENT_DATE
  WHERE AlumnoID = ?;`;

  const values = [TipoBaja, id];

  try {
    // Ejecutar la consulta
    await pool.query(query, values);
    // Enviar una respuesta JSON
    res.json({ status: 200, message: 'Alumno se ha dado de baja exitosamente' });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al dar de baja el alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un alumno por su ID
router.delete('/delete/:id', async (req, res) => {
  // Obtener el ID del alumno desde los parámetros de la solicitud
  const { id } = req.params;

  try {
    // Ejecutar la consulta de eliminación
    await pool.query('DELETE FROM Alumnos WHERE AlumnoID = ?', [id]);

    // Enviar una respuesta JSON
    res.json({ status: 200, message: 'Alumno eliminado exitosamente' });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al eliminar el alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
