const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todos los alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await pool.query('SELECT * FROM alumnos');
    res.json({
      status: 200,
      message: 'Se han listado los alumnos correctamente',
      alumnos: alumnos,
    });
  } catch (error) {
    console.error('Error al obtener la lista de alumnos:', error);
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
  const { Nombre, Telefono, EscuelaProcedencia, NombrePromotor, Estatus, Procedencia, TipoBaja, RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro } = req.body;

  if (!Nombre || !Telefono || !EscuelaProcedencia || !NombrePromotor || !Estatus) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'INSERT INTO Alumnos (Nombre, Telefono, EscuelaProcedencia, NombrePromotor, Estatus, Procedencia, TipoBaja, RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  const values = [Nombre, Telefono, EscuelaProcedencia, NombrePromotor, Estatus, Procedencia, TipoBaja, RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro];

  try {
    const result = await pool.query(query, values);
    res.json({ status: 200, message: 'Alumno creado exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear el alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de un alumno por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { Nombre, Telefono, EscuelaProcedencia, NombrePromotor, Estatus, Procedencia, TipoBaja, RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro } = req.body;

//   if (!Nombre || !Telefono || !EscuelaProcedencia || !NombrePromotor || !Estatus) {
//     return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
//   }

  const query = 'UPDATE Alumnos SET Nombre = ?, Telefono = ?, EscuelaProcedencia = ?, NombrePromotor = ?, Estatus = ?, Procedencia = ?, TipoBaja = ?, RSFacebook = ?, RSInstagram = ?, RSTiktok = ?, RSLinkedln = ?, RSTwiter = ?, RSWhatsapp = ?, RSOtro = ? WHERE AlumnoID = ?';

  const values = [Nombre, Telefono, EscuelaProcedencia, NombrePromotor, Estatus, Procedencia, TipoBaja, RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro, id];

  try {
    await pool.query(query, values);
    res.json({ status: 200, message: 'Alumno actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el alumno:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un alumno por su ID
// router.delete('/alumnos/:alumnoId', async (req, res) => {
//   const { alumnoId } = req.params;

//   try {
//     await pool.query('DELETE FROM Alumnos WHERE AlumnoID = ?', [alumnoId]);
//     res.json({ status: 200, message: 'Alumno eliminado exitosamente' });
//   } catch (error) {
//     console.error('Error al eliminar el alumno:', error);
//     res.status(500).json({ error: 'Error en el servidor' });
//   }
// });

module.exports = router;