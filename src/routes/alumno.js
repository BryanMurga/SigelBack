const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todos los alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await pool.query('SELECT * FROM Alumnos');
    res.json({
      status: 200,
      message: 'Se han listado los alumnos correctamente',
      alumnos: alumnos,
    });
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un alumno por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const alumno = await pool.query('SELECT * FROM Alumnos WHERE AlumnoID = ?', [id]);
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
    RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwitter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional } = req.body;

  // Validar campos obligatorios
  if (!LeadID || !Nombre) {
    return res.status(400).json({ error: 'LeadID y Nombre son campos obligatorios' });
  }

  // Construir la consulta SQL y los valores
  const query = `INSERT INTO Alumnos
    (LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja,
    RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwitter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja,
    RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwitter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional];

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
  const { LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja,
    RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwitter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional } = req.body;

  // Validar campos obligatorios
  if (!LeadID || !Nombre) {
    return res.status(400).json({ error: 'LeadID y Nombre son campos obligatorios' });
  }

  // Construir la consulta SQL y los valores
  const query = `UPDATE Alumnos SET
    LeadID = ?, Nombre = ?, Telefono = ?, EscuelaProcedencia = ?, PromotorID = ?, NoRecibo = ?, Matricula = ?, CarreraInscripcion = ?,
    Procedencia = ?, TipoBaja = ?, RSFacebook = ?, RSInstagram = ?, RSTiktok = ?, RSLinkedln = ?, RSTwitter = ?, RSWhatsapp = ?, RSOtro = ?,
    ContactoID = ?, Estatus = ?, FechaBaja = ?, CorreoInstitucional = ?
    WHERE AlumnoID = ?`;

  const values = [LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja,
    RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwitter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional, id];

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
