const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todos los promotores
// Obtener todos los promotores o filtrar por nombre
router.get('/', async (req, res) => {
  try {
    let query = 'SELECT * FROM Promotor';

    // Verificar si se proporciona un parámetro de búsqueda por nombre
    if (req.query.nombre) {
      const nombre = `%${req.query.nombre}%`; // Añadir comodines para buscar coincidencias parciales
      query += ' WHERE Nombre LIKE ?';
      const listPromotores = await pool.query(query, [nombre]);
      res.json({
        status: 200,
        message: 'Se ha listado correctamente',
        listPromotores: listPromotores,
      });
    } else {
      const listPromotores = await pool.query(query);
      res.json({
        status: 200,
        message: 'Se ha listado correctamente',
        listPromotores: listPromotores,
      });
    }
  } catch (error) {
    console.error('Error al obtener la lista de promotores:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/leads', async (req, res) => {
  // Obtén el valor de userName de los parámetros de consulta (query parameters)
  const userName = req.query.userName;

  if (!userName) {
    return res.status(400).json({ error: 'Se requiere el parámetro userName en el cuerpo de la solicitud' });
  }

  const query = `
      SELECT
        leads.LeadID,
        leads.NombreCompleto,
        leads.telefono,
        leads.telefono2,
        leads.CorreoElectronico,
        leads.CorreoElectronico2,
        leads.FechaPrimerContacto,
        leads.FechaNac,
        leads.EscuelaProcedencia,
        leads.NombrePais,
        leads.NombreEstado,
        leads.NombreCiudad,
        leads.PSeguimiento,
        leads.Grado,  
        leads.EstatusInsc,
        leads.SemestreIngreso,
        leads.Ciclo,
        leads.AsetNameForm,
        leads.IsOrganic,
        leads.TipoReferido,
        leads.NombreReferido,
        leads.DondeObtDato,
        leads.FechaInscripcion,
        leads.BecaOfrecida,
        leads.NumeroLista,
        leads.FechaPromotorOriginal,
        leads.FechaPromotorActual,
        leads.Comentarios,
        leads.Programa,
        CarrerasInt.Nombre as CarreraInteres,
        Campana.Nombre as NombreCampana,
        MedioDeContacto.Nombre as MedioContacto,
        CarreraIns.Nombre as CarreraInscrita,
        PromotorOri.Nombre as NombrePromotorOri,
        PromotorAct.Nombre as NombrePromotorAct
      FROM
        leads
      LEFT JOIN
        Carreras CarrerasInt ON leads.carreraInteresID = CarrerasInt.CarreraID
      LEFT JOIN
        Campana ON leads.CampanaID = Campana.CampanaID
      LEFT JOIN
        MedioDeContacto ON leads.MedioDeContactoID = MedioDeContacto.MedioID
      LEFT JOIN
        Carreras CarreraIns ON leads.CarreraInscripcion = CarreraIns.CarreraID
      LEFT JOIN
        Promotor PromotorOri ON leads.PromotorOriginal = PromotorOri.PromotorID
      LEFT JOIN
        Promotor PromotorAct ON leads.PromotorActual = PromotorAct.PromotorID
      LEFT JOIN
        users ON PromotorAct.PromotorID = users.promotorId
      WHERE
        users.userName = ?;
    `;

  const valores = [userName];
  try {
    const leads = await pool.query(query, valores);
    res.json({ 
      status: 200, 
      message: 'Lead listado exitosamente', 
      leads: leads });
  } catch (error) {
    console.error('Error al obtener los leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


// Obtener promotores activos
router.get('/activos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const promotoresActivos = await pool.query('SELECT Promotor.PromotorID, Promotor.Nombre FROM Promotor LEFT JOIN leads ON Promotor.PromotorID = leads.PromotorActual AND leads.LeadID = ? WHERE promotor.Estado = 1 and leads.PromotorActual IS NULL;', [id]);
    if (promotoresActivos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron promotores activos' });
    }
    res.json({
      status: 200,
      message: 'Se han obtenido los promotores activos correctamente',
      promotores: promotoresActivos,
    });
  } catch (error) {
    console.error('Error al obtener promotores activos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});;

router.get('/activos/all', async (req, res) => {
  const { id } = req.params;
  try {
    const promotoresActivos = await pool.query('SELECT * promotores where estado = 1');
    if (promotoresActivos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron promotores activos' });
    }
    res.json({
      status: 200,
      message: 'Se han obtenido los promotores activos correctamente',
      promotores: promotoresActivos,
    });
  } catch (error) {
    console.error('Error al obtener promotores activos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});;

// Obtener un promotor por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const promotor = await pool.query('SELECT * FROM Promotor WHERE PromotorID = ?', [id]);
    if (promotor.length === 0) {
      return res.status(404).json({ error: 'Promotor no encontrado' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido el promotor correctamente',
      promotor: promotor[0],
    });
  } catch (error) {
    console.error('Error al obtener el promotor:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear un nuevo promotor
router.post('/create', async (req, res) => {
  const { Nombre, Correo, Telefono, Passw } = req.body;

  if (!Nombre || !Correo || !Telefono || !Passw) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'INSERT INTO Promotor (Nombre, Correo, Telefono, Passw) VALUES (?, ?, ?, ?)';

  try {
    const result = await pool.query(query, [Nombre, Correo, Telefono, Passw]);
    res.json({ status: 200, message: 'Promotor creado exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear el promotor:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar la información de un promotor por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { Nombre, Correo, Telefono, Estado, Passw } = req.body;

  if (!Nombre || !Correo || !Telefono) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  const query = 'UPDATE Promotor SET Nombre = ?, Correo = ?, Telefono = ?, Estado = ?, Passw = ? WHERE PromotorID = ?';

  try {
    await pool.query(query, [Nombre, Correo, Telefono, Estado, Passw, id]);
    res.json({ status: 200, message: 'Promotor actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el promotor:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un promotor por su ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM Promotor WHERE PromotorID = ?', [id]);
    res.json({ status: 200, message: 'Promotor eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el promotor:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
