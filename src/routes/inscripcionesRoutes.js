const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// ... (otros endpoints)

// Obtener datos para las gráficas
router.get('/datos-graficas', async (req, res) => {
  try {
    const inscripcionesPorPromotor = await pool.query('SELECT p.Nombre AS PromotorNombre, l.promotorActual AS PromotorID, COUNT(*) AS total FROM Leads l JOIN Promotor p ON l.promotorActual = p.PromotorID GROUP BY l.promotorActual');
    const inscripcionesPorEdad = await pool.query('SELECT YEAR(CURDATE()) - YEAR(FechaNac) AS Edad, COUNT(*) AS total FROM Leads GROUP BY YEAR(CURDATE()) - YEAR(FechaNac)');
    const inscripcionesPorStatus = await pool.query('SELECT EstatusInsc, COUNT(*) AS total FROM Leads GROUP BY EstatusInsc');
    const totalPorGrado = await pool.query('SELECT Grado, COUNT(*) AS total FROM Leads GROUP BY Grado');
    const totalPorBeca = await pool.query('SELECT BecaOfrecida, COUNT(*) AS total FROM Leads GROUP BY BecaOfrecida');
    const totalPorPais = await pool.query('SELECT NombrePais, COUNT(*) AS total FROM Leads GROUP BY NombrePais');
    const totalPorEstado = await pool.query('SELECT NombreEstado, COUNT(*) AS total FROM Leads GROUP BY NombreEstado');
    const totalPorMunicipio = await pool.query('SELECT NombreCiudad, COUNT(*) AS total FROM Leads GROUP BY NombreCiudad');
    const totalPorCiclo = await pool.query('SELECT Ciclo, COUNT(*) AS total FROM Leads GROUP BY Ciclo');
    const totalPorPrograma = await pool.query('SELECT Programa, COUNT(*) AS total FROM Leads GROUP BY Programa');
    const totalPorSemestre = await pool.query('SELECT SemestreIngreso, COUNT(*) AS total FROM Leads GROUP BY SemestreIngreso');
    const totalPorReferido = await pool.query('SELECT TipoReferido, COUNT(*) AS total FROM Leads GROUP BY TipoReferido');
    const totalPorEscuela = await pool.query('SELECT EscuelaProcedencia, COUNT(*) AS total FROM Leads GROUP BY EscuelaProcedencia');
    const totalInscripcionesPorAnio = await pool.query('SELECT YEAR(FechaInscripcion) AS anio, COUNT(*) AS total FROM Leads GROUP BY YEAR(FechaInscripcion)');
    const totalInscripcionesPorMes = await pool.query('SELECT YEAR(FechaInscripcion) AS anio, MONTH(FechaInscripcion) AS mes, COUNT(*) AS total FROM Leads GROUP BY YEAR(FechaInscripcion), MONTH(FechaInscripcion)');
    const totalDondeObtDato = await pool.query('SELECT DondeObtDato, COUNT(*) AS total FROM Leads GROUP BY DondeObtDato');
    // Construir un objeto de respuesta con todas las consultas
    const response = {
      inscripcionesPorPromotor,
      inscripcionesPorEdad,
      inscripcionesPorStatus,
      totalPorGrado,
      totalPorBeca,
      totalPorPais,
      totalPorEstado,
      totalPorMunicipio,
      totalPorCiclo,
      totalPorPrograma,
      totalPorSemestre,
      totalPorReferido,
      totalPorEscuela,
      totalInscripcionesPorAnio,
      totalInscripcionesPorMes,
      totalDondeObtDato,
    };

    res.json({
      status: 200,
      message: 'Datos para las gráficas obtenidos correctamente',
      data: response,
    });
  } catch (error) {
    console.error('Error al obtener datos para las gráficas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


// Obtener datos del dashboard para el promotor
// Importa los módulos necesarios

// Endpoint para inscripcionesPorEdad por promotor
// Suponiendo que estás utilizando Express.js y que pool es tu conexión a la base de datos

router.get('/dash-prom', async (req, res) => {
  const userName = req.query.userName;

  if (!userName) {
    return res.status(400).json({ error: 'Se requiere el parámetro userName en el cuerpo de la solicitud' });
  }

  try {

    const totalDondeObtDatoData = await pool.query(`
      SELECT
        YEAR(CURDATE()) - YEAR(FechaNac) AS Edad,
        COUNT(*) AS total
      FROM
        Leads l
      JOIN
        Promotor p ON l.promotorActual = p.PromotorID
      JOIN
        users u ON p.PromotorID = u.promotorId
      WHERE
        u.userName = ?
      GROUP BY
        YEAR(CURDATE()) - YEAR(FechaNac);
    `, [userName]);

    // inscripcionesPorPromotor
    const inscripcionesPorPromotorData = await pool.query(`
      SELECT
        p.Nombre AS PromotorNombre,
        l.promotorActual AS PromotorID,
        COUNT(*) AS total
      FROM
        Leads l
      JOIN
        Promotor p ON l.promotorActual = p.PromotorID
      WHERE
        p.PromotorID = ?
      GROUP BY
        l.promotorActual;
    `, [userName]);

    // inscripcionesPorEdad
    const inscripcionesPorEdadData = await pool.query(`
      SELECT
        YEAR(CURDATE()) - YEAR(FechaNac) AS Edad,
        COUNT(*) AS total
      FROM
        Leads l
      JOIN
        Promotor p ON l.promotorActual = p.PromotorID
      JOIN
        users u ON p.PromotorID = u.promotorId
      WHERE
        u.userName = ?
      GROUP BY
        YEAR(CURDATE()) - YEAR(FechaNac);
    `, [userName]);

    // inscripcionesPorStatus
    const inscripcionesPorStatusData = await pool.query(`
      SELECT
        EstatusInsc,
        COUNT(*) AS total
      FROM
        Leads l
      JOIN
        Promotor p ON l.promotorActual = p.PromotorID
      JOIN
        users u ON p.PromotorID = u.promotorId
      WHERE
        u.userName = ?
      GROUP BY
        EstatusInsc;
    `, [userName]);

    // totalPorGrado
    const totalPorGradoData = await pool.query(`
      SELECT
        Grado,
        COUNT(*) AS total
      FROM
        Leads l
      JOIN
        Promotor p ON l.promotorActual = p.PromotorID
      JOIN
        users u ON p.PromotorID = u.promotorId
      WHERE
        u.userName = ?
      GROUP BY
        Grado;
    `, [userName]);

    // Puedes continuar con las demás consultas siguiendo el mismo formato.

    res.json({
      status: 200,
      message: 'Datos obtenidos exitosamente',
      data: {
        inscripcionesPorPromotor: inscripcionesPorPromotorData,
        inscripcionesPorEdad: inscripcionesPorEdadData,
        inscripcionesPorStatus: inscripcionesPorStatusData,
        totalPorGrado: totalPorGradoData,
        totalDondeObtDato: totalDondeObtDatoData,
        // Agrega las demás propiedades según tus necesidades.
      },
    });
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
// Agrega más endpoints para los demás datos del dashboard siguiendo un enfoque similar



module.exports = router;
