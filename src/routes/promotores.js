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
      const nombre = `%${req.query.nombre}%;` // Añadir comodines para buscar coincidencias parciales
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
        leads.FechaPromotorActual,
        leads.PSeguimiento,
        leads.promotorActual,
        leads.MedioDeContactoID,
        leads.CarreraInteresID,
        leads.CarreraInscripcion,
        leads.Grado,
        leads.Programa,
        leads.CampanaID,
        leads.IsOrganic,
        leads.EscuelaProcedencia,
        leads.NombrePais,
        leads.NombreEstado,
        leads.NombreCiudad,
        PromotorAct.Nombre as NombrePromotorAct
      FROM
        leads
      LEFT JOIN
        Promotor PromotorAct ON leads.promotorActual = PromotorAct.PromotorID
      LEFT JOIN
        users ON PromotorAct.PromotorID = users.promotorId
      WHERE
        users.userName = ? AND datediff(curdate(), leads.FechaPromotorActual) <=3;
    `;

  const valores = [userName];
  try {
    const leads = await pool.query(query, valores);
    res.json({
      status: 200,
      message: 'Lead listado exitosamente',
      leads: leads
    });
  } catch (error) {
    console.error('Error al obtener los leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/getPromotorID', async (req, res) => {

  const userName = req.query.userName;

  if (!userName) {
    return res.status(400).json({ error: 'Se requiere el parámetro userName en el cuerpo de la solicitud' });
  }

  const query = `select promotorID from users where userName = ?`;

  const valores = [userName];
  try {
    const promotor = await pool.query(query, valores);
    res.json({
      status: 200,
      message: 'Promotro ID listado exitosamente',
      promotor: promotor[0]
    });
  } catch (error) {
    console.error('Error al obtener el promotorID:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }

});



// Obtener promotores activos
router.get('/activos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const promotoresActivos = await pool.query('SELECT Promotor.PromotorID, Promotor.Nombre FROM Promotor LEFT JOIN leads ON Promotor.PromotorID = leads.promotorActual AND leads.LeadID = ? WHERE promotor.Estado = 1 and leads.promotorActual IS NULL;', [id]);
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

//Obtener count de leads por General
router.get('/count/general', async (req, res) => {
  const { id } = req.params;

  try {
    const result  = await pool.query(`SELECT
        p.Nombre AS NombrePromotor,
        COUNT(CASE WHEN l.EstatusInsc = 'INSC' THEN 1 END) AS Count_insc,
        COUNT(CASE WHEN l.PSeguimiento = 'P-PROSPECTO' THEN 1 END) AS P_Prospecto,
        COUNT(CASE WHEN l.PSeguimiento = 'PS-SEGUIMIENTO' THEN 1 END) AS PS_Seguimiento,
        COUNT(CASE WHEN l.PSeguimiento = 'PI-INSCRIPCIÓN' THEN 1 END) AS PI_Inscripcion,
        COUNT(CASE WHEN l.PSeguimiento = 'NI-NO INTERESA' THEN 1 END) AS NI_NO_Interesa,
        COUNT(CASE WHEN l.PSeguimiento = 'SC-SIN CONTACTO' THEN 1 END) AS SC_Sin_Contacto,
        COUNT(CASE WHEN l.PSeguimiento = 'DI-DATO NO VALIDO' THEN 1 END) AS DI_Dato_No_Valido,
        COUNT(CASE WHEN l.PSeguimiento = 'NC-NO CONTESTA' THEN 1 END) AS NC_NO_Contesta,
        COUNT(CASE WHEN l.PSeguimiento = 'PU-PERSONAL UNINTER' THEN 1 END) AS PU_Personal_UNINTER,
        COUNT(CASE WHEN l.PSeguimiento = 'AU-ALUMNO UNINTER' THEN 1 END) AS AU_Alumno_UNINTER,
        COUNT(CASE WHEN l.PSeguimiento = 'DU-DUPLICADO' THEN 1 END) AS DU_Duplicado,
        COUNT(l.PSeguimiento) AS Datos_Trabajados,
        COUNT(l.LeadID) AS Datos_Asignados
        FROM
            promotor p
        LEFT JOIN
            leads l ON p.PromotorID = l.promotorActual
        GROUP BY
            p.PromotorID, p.Nombre;`);

      const porcentajes = result.map((row) => ({
        ...row,
        Datos_Trabajando: row.Datos_Asignados > 0 ? ((row.Datos_Trabajados / row.Datos_Asignados) * 100).toFixed(2) : 0,
      }));

    res.json({
      status: 200,
      message: 'Se ha obtenido el conteo de leads correctamente',
      count: porcentajes,
    });
  } catch (error) {
    console.error('Error al obtener el conteo de leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener count de leads por promotor
router.get('/count/tiktok', async (req, res) => {
  const { id } = req.params;

  try {
    const result  = await pool.query(`SELECT
          p.Nombre AS NombrePromotor,
          COUNT(CASE WHEN l.EstatusInsc = 'INSC' THEN 1 END) AS Count_insc,
          COUNT(CASE WHEN l.PSeguimiento = 'P-PROSPECTO' THEN 1 END) AS P_Prospecto,
          COUNT(CASE WHEN l.PSeguimiento = 'PS-SEGUIMIENTO' THEN 1 END) AS PS_Seguimiento,
          COUNT(CASE WHEN l.PSeguimiento = 'PI-INSCRIPCIÓN' THEN 1 END) AS PI_Inscripcion,
          COUNT(CASE WHEN l.PSeguimiento = 'NI-NO INTERESA' THEN 1 END) AS NI_NO_Interesa,
          COUNT(CASE WHEN l.PSeguimiento = 'SC-SIN CONTACTO' THEN 1 END) AS SC_Sin_Contacto,
          COUNT(CASE WHEN l.PSeguimiento = 'DI-DATO NO VALIDO' THEN 1 END) AS DI_Dato_No_Valido,
          COUNT(CASE WHEN l.PSeguimiento = 'NC-NO CONTESTA' THEN 1 END) AS NC_NO_Contesta,
          COUNT(CASE WHEN l.PSeguimiento = 'PU-PERSONAL UNINTER' THEN 1 END) AS PU_Personal_UNINTER,
          COUNT(CASE WHEN l.PSeguimiento = 'AU-ALUMNO UNINTER' THEN 1 END) AS AU_Alumno_UNINTER,
          COUNT(CASE WHEN l.PSeguimiento = 'DU-DUPLICADO' THEN 1 END) AS DU_Duplicado,
          COUNT(l.PSeguimiento) AS Datos_Trabajados,
	        COUNT(l.LeadID) AS Datos_Asignados
      FROM
          promotor p
      LEFT JOIN
          leads l ON p.PromotorID = l.promotorActual AND l.CampanaID = (SELECT CampanaID FROM Campana WHERE TipoCamp = 'TikTok')
      GROUP BY
          p.PromotorID, p.Nombre;`);

      const porcentajes = result.map((row) => ({
        ...row,
        Datos_Trabajando: row.Datos_Asignados > 0 ? ((row.Datos_Trabajados / row.Datos_Asignados) * 100).toFixed(2) : 0,
      }));

    res.json({
      status: 200,
      message: 'Se ha obtenido el conteo de leads correctamente',
      count: porcentajes,
    });
  } catch (error) {
    console.error('Error al obtener el conteo de leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener count de leads por promotor en META
router.get('/count/meta', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT
          p.Nombre AS NombrePromotor,
          COUNT(CASE WHEN l.EstatusInsc = 'INSC' THEN 1 END) AS Count_insc,
          COUNT(CASE WHEN l.PSeguimiento = 'P-PROSPECTO' THEN 1 END) AS P_Prospecto,
          COUNT(CASE WHEN l.PSeguimiento = 'PS-SEGUIMIENTO' THEN 1 END) AS PS_Seguimiento,
          COUNT(CASE WHEN l.PSeguimiento = 'PI-INSCRIPCIÓN' THEN 1 END) AS PI_Inscripcion,
          COUNT(CASE WHEN l.PSeguimiento = 'NI-NO INTERESA' THEN 1 END) AS NI_NO_Interesa,
          COUNT(CASE WHEN l.PSeguimiento = 'SC-SIN CONTACTO' THEN 1 END) AS SC_Sin_Contacto,
          COUNT(CASE WHEN l.PSeguimiento = 'DI-DATO NO VALIDO' THEN 1 END) AS DI_Dato_No_Valido,
          COUNT(CASE WHEN l.PSeguimiento = 'NC-NO CONTESTA' THEN 1 END) AS NC_NO_Contesta,
          COUNT(CASE WHEN l.PSeguimiento = 'PU-PERSONAL UNINTER' THEN 1 END) AS PU_Personal_UNINTER,
          COUNT(CASE WHEN l.PSeguimiento = 'AU-ALUMNO UNINTER' THEN 1 END) AS AU_Alumno_UNINTER,
          COUNT(CASE WHEN l.PSeguimiento = 'DU-DUPLICADO' THEN 1 END) AS DU_Duplicado,
          COUNT(l.PSeguimiento) AS Datos_Trabajados,
	        COUNT(l.LeadID) AS Datos_Asignados
      FROM
          promotor p
      LEFT JOIN
          leads l ON p.PromotorID = l.promotorActual AND l.CampanaID = (SELECT CampanaID FROM Campana WHERE TipoCamp = 'Meta')
      GROUP BY
          p.PromotorID, p.Nombre;`);

      const porcentajes = result.map((row) => ({
        ...row,
        Datos_Trabajando: row.Datos_Asignados > 0 ? ((row.Datos_Trabajados / row.Datos_Asignados) * 100).toFixed(2) : 0,
      }));

    res.json({
      status: 200,
      message: 'Se ha obtenido el conteo de leads correctamente',

      count: porcentajes,
    });
  } catch (error) {
    console.error('Error al obtener el conteo de leads:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

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