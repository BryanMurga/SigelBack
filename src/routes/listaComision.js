const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todas las listas de comisión
router.get('/', async (req, res) => {
  try {
    const listasComision = await pool.query('SELECT * FROM ListaComision');
    res.json({
      status: 200,
      message: 'Se han listado las listas de comisión correctamente',
      listasComision: listasComision,
    });
  } catch (error) {
    console.error('Error al obtener la lista de comisión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener una lista de comisión por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const listaComision = await pool.query('SELECT * FROM ListaComision WHERE ListaComisionID = ?', [id]);
    if (listaComision.length === 0) {
      return res.status(404).json({ error: 'Lista de comisión no encontrada' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido la lista de comisión correctamente',
      listaComision: listaComision[0],
    });
  } catch (error) {
    console.error('Error al obtener la lista de comisión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear una nueva lista de comisión
router.post('/create', async (req, res) => {
  // Desestructurar los campos del cuerpo de la solicitud
  const {
    PromotorID, FechaInscripcionAlumno, AlumnoID, Status, CicloEscolar, ProgramaID, SemestreIngreso, Matricula, NoRecibo,
    PorcentajeBeca, TotalComision, EscuelaProcedencia, Escuela, Pais, Estado, Municipio, MedioDeContactoID,
    CanalDeVenta, EsReferido, PromocionInscripcion, NumTelefonicoAlumno, CorreoElectronicoProspecto, FechaNacimientoProspecto
  } = req.body;

  // Validar campos obligatorios
  if (!PromotorID || !FechaInscripcionAlumno || !AlumnoID || !Status || !CicloEscolar || !ProgramaID || !SemestreIngreso) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  // Construir la consulta SQL y los valores
  const query = `INSERT INTO ListaComision
    (PromotorID, FechaInscripcionAlumno, AlumnoID, Status, CicloEscolar, ProgramaID, SemestreIngreso, Matricula, NoRecibo,
    PorcentajeBeca, TotalComision, EscuelaProcedencia, Escuela, Pais, Estado, Municipio, MedioDeContactoID,
    CanalDeVenta, EsReferido, PromocionInscripcion, NumTelefonicoAlumno, CorreoElectronicoProspecto, FechaNacimientoProspecto)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    PromotorID, FechaInscripcionAlumno, AlumnoID, Status, CicloEscolar, ProgramaID, SemestreIngreso, Matricula, NoRecibo,
    PorcentajeBeca, TotalComision, EscuelaProcedencia, Escuela, Pais, Estado, Municipio, MedioDeContactoID,
    CanalDeVenta, EsReferido, PromocionInscripcion, NumTelefonicoAlumno, CorreoElectronicoProspecto, FechaNacimientoProspecto
  ];

  try {
    // Ejecutar la consulta y obtener el resultado
    const result = await pool.query(query, values);

    // Enviar una respuesta JSON con el resultado
    res.json({ status: 200, message: 'Lista de comisión creada exitosamente', insertedId: result.insertId });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al crear la lista de comisión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de una lista de comisión por su ID
router.put('/update/:id', async (req, res) => {
  // Obtener el ID de la lista de comisión desde los parámetros de la solicitud
  const { id } = req.params;

  // Desestructurar los campos del cuerpo de la solicitud
  const {
    PromotorID, FechaInscripcionAlumno, AlumnoID, Status, CicloEscolar, ProgramaID, SemestreIngreso, Matricula, NoRecibo,
    PorcentajeBeca, TotalComision, EscuelaProcedencia, Escuela, Pais, Estado, Municipio, MedioDeContactoID,
    CanalDeVenta, EsReferido, PromocionInscripcion, NumTelefonicoAlumno, CorreoElectronicoProspecto, FechaNacimientoProspecto
  } = req.body;

  // Validar campos obligatorios
  if (!PromotorID || !FechaInscripcionAlumno || !AlumnoID || !Status || !CicloEscolar || !ProgramaID || !SemestreIngreso) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  // Construir la consulta SQL y los valores
  const query = `UPDATE ListaComision SET
    PromotorID = ?, FechaInscripcionAlumno = ?, AlumnoID = ?, Status = ?, CicloEscolar = ?, ProgramaID = ?, SemestreIngreso = ?,
    Matricula = ?, NoRecibo = ?, PorcentajeBeca = ?, TotalComision = ?, EscuelaProcedencia = ?, Escuela = ?, Pais = ?,
    Estado = ?, Municipio = ?, MedioDeContactoID = ?, CanalDeVenta = ?, EsReferido = ?, PromocionInscripcion = ?,
    NumTelefonicoAlumno = ?, CorreoElectronicoProspecto = ?, FechaNacimientoProspecto = ?
    WHERE ListaComisionID = ?`;

  const values = [
    PromotorID, FechaInscripcionAlumno, AlumnoID, Status, CicloEscolar, ProgramaID, SemestreIngreso, Matricula, NoRecibo,
    PorcentajeBeca, TotalComision, EscuelaProcedencia, Escuela, Pais, Estado, Municipio, MedioDeContactoID,
    CanalDeVenta, EsReferido, PromocionInscripcion, NumTelefonicoAlumno, CorreoElectronicoProspecto, FechaNacimientoProspecto,
    id
  ];

  try {
    // Ejecutar la consulta
    await pool.query(query, values);

    // Enviar una respuesta JSON
    res.json({ status: 200, message: 'Lista de comisión actualizada exitosamente' });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al actualizar la lista de comisión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar una lista de comisión por su ID
router.delete('/delete/:id', async (req, res) => {
  // Obtener el ID de la lista de comisión desde los parámetros de la solicitud
  const { id } = req.params;

  try {
    // Ejecutar la consulta de eliminación
    await pool.query('DELETE FROM ListaComision WHERE ListaComisionID = ?', [id]);

    // Enviar una respuesta JSON
    res.json({ status: 200, message: 'Lista de comisión eliminada exitosamente' });
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    console.error('Error al eliminar la lista de comisión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
