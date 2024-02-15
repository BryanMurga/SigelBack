const express = require("express");
const router = express.Router();
const pool = require("../db.js");

// ... (otros endpoints)

// Obtener datos para las gráficas
router.get("/datos-graficas", async (req, res) => {
  try {
    const inscripcionesPorPromotor = await pool.query(
      "SELECT p.Nombre AS PromotorNombre, l.promotorActual AS PromotorID, COUNT(*) AS total FROM Leads l JOIN Promotor p ON l.promotorActual = p.PromotorID GROUP BY l.promotorActual"
    );
    const inscripcionesPorEdad = await pool.query(
      "SELECT YEAR(CURDATE()) - YEAR(FechaNac) AS Edad, COUNT(*) AS total FROM Leads GROUP BY YEAR(CURDATE()) - YEAR(FechaNac)"
    );
    const inscripcionesPorStatus = await pool.query(
      "SELECT EstatusInsc, COUNT(*) AS total FROM Leads GROUP BY EstatusInsc"
    );
    const totalPorGrado = await pool.query(
      "SELECT Grado, COUNT(*) AS total FROM Leads GROUP BY Grado"
    );
    const totalPorBeca = await pool.query(
      "SELECT BecaOfrecida, COUNT(*) AS total FROM Leads GROUP BY BecaOfrecida"
    );
    const totalPorPais = await pool.query(
      "SELECT NombrePais, COUNT(*) AS total FROM Leads GROUP BY NombrePais"
    );
    const totalPorEstado = await pool.query(
      "SELECT NombreEstado, COUNT(*) AS total FROM Leads GROUP BY NombreEstado"
    );
    const totalPorMunicipio = await pool.query(
      "SELECT NombreCiudad, COUNT(*) AS total FROM Leads GROUP BY NombreCiudad"
    );
    const totalPorCiclo = await pool.query(
      "SELECT Ciclo, COUNT(*) AS total FROM Leads GROUP BY Ciclo"
    );
    const totalPorPrograma = await pool.query(
      "SELECT Programa, COUNT(*) AS total FROM Leads GROUP BY Programa"
    );
    const totalPorSemestre = await pool.query(
      "SELECT SemestreIngreso, COUNT(*) AS total FROM Leads GROUP BY SemestreIngreso"
    );
    const totalPorReferido = await pool.query(
      "SELECT TipoReferido, COUNT(*) AS total FROM Leads GROUP BY TipoReferido"
    );
    const totalPorEscuela = await pool.query(
      "SELECT EscuelaProcedencia, COUNT(*) AS total FROM Leads GROUP BY EscuelaProcedencia"
    );
    const totalInscripcionesPorAnio = await pool.query(
      "SELECT YEAR(FechaInscripcion) AS anio, COUNT(*) AS total FROM Leads GROUP BY YEAR(FechaInscripcion)"
    );
    const totalInscripcionesPorMes = await pool.query(
      "SELECT YEAR(FechaInscripcion) AS anio, MONTH(FechaInscripcion) AS mes, COUNT(*) AS total FROM Leads GROUP BY YEAR(FechaInscripcion), MONTH(FechaInscripcion)"
    );
    const totalDondeObtDato = await pool.query(
      "SELECT DondeObtDato, COUNT(*) AS total FROM Leads GROUP BY DondeObtDato"
    );
    const totalPSeguimiento = await pool.query(
      "SELECT PSeguimiento, COUNT(*) AS total FROM Leads GROUP BY PSeguimiento"
    );

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
      totalPSeguimiento,
    };

    res.json({
      status: 200,
      message: "Datos para las gráficas obtenidos correctamente",
      data: response,
    });
  } catch (error) {
    console.error("Error al obtener datos para las gráficas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Obtener datos para las gráficas promotor
router.get("/dash-prom", async (req, res) => {
  const userName = req.query.userName;

  if (!userName) {
    return res
      .status(400)
      .json({
        error: "Se requiere el parámetro userName en el cuerpo de la solicitud",
      });
  }

  try {
    const inscripcionesPorProm = await pool.query(
      "SELECT p.Nombre AS PromotorNombre, l.promotorActual AS PromotorID, l.Grado, COUNT(*) AS total FROM Leads l JOIN Promotor p ON l.promotorActual = p.PromotorID WHERE p.Nombre = ? GROUP BY l.promotorActual, l.Grado",
        [userName]
    );

    const pseguimientoProm = await pool.query(
"SELECT PSeguimiento, COUNT(*) AS total FROM Leads l JOIN Promotor p ON l.promotorActual = p.PromotorID JOIN users u ON p.PromotorID = u.promotorId WHERE u.userName = ? GROUP BY PSeguimiento",
[userName]
    );

    const totalPorCicloProm = await pool.query(
      "SELECT l.Ciclo, COUNT(*) AS total FROM Leads l JOIN users u ON l.promotorActual = u.promotorId WHERE u.userName = ? GROUP BY l.Ciclo",
      [userName]
    );

    const totalPorPaisProm = await pool.query(
      "SELECT l.NombrePais, COUNT(*) AS total FROM Leads l JOIN users u ON l.promotorActual = u.promotorId WHERE u.userName = ? GROUP BY l.NombrePais",
        [userName]
    );

    const totalPorEstadoProm = await pool.query(
      "SELECT l.NombreEstado, COUNT(*) AS total FROM Leads l JOIN users u ON l.promotorActual = u.promotorId WHERE u.userName = ? GROUP BY l.NombreEstado",
[userName]
    );

    const totalPorCiudadProm = await pool.query(
      "SELECT l.NombreCiudad, COUNT(*) AS total FROM Leads l JOIN users u ON l.promotorActual = u.promotorId WHERE u.userName = ? GROUP BY l.NombreCiudad",
[userName]
    );



    const totalPorMesAnioProm = await pool.query(
      "SELECT YEAR(l.FechaInscripcion) AS anio, MONTH(l.FechaInscripcion) AS mes, COUNT(*) AS total FROM Leads l JOIN users u ON l.promotorActual = u.promotorId WHERE u.userName = ? GROUP BY YEAR(l.FechaInscripcion), MONTH(l.FechaInscripcion)",
      [userName]
    );

    const totalPorEscProdProm = await pool.query(
      "SELECT l.EscuelaProcedencia, COUNT(*) AS total FROM Leads l JOIN users u ON l.promotorActual = u.promotorId WHERE u.userName = ? GROUP BY l.EscuelaProcedencia",
      [userName]
    );

    const totalPorEdadesProm = await pool.query(
      "SELECT YEAR(CURDATE()) - YEAR(FechaNac) AS Edad, COUNT(*) AS total FROM Leads l JOIN users u ON l.promotorActual = u.promotorId WHERE u.userName = ? GROUP BY Edad",
    [userName]
    );

    const totalPorBecaProm = await pool.query(
      "SELECT l.BecaOfrecida, COUNT(*) AS total FROM Leads l JOIN users u ON l.promotorActual = u.promotorId WHERE u.userName = ? GROUP BY l.BecaOfrecida",
      [userName]
    );

    const totalPorReferidoProm = await pool.query(
    "SELECT l.TipoReferido, l.NombreReferido, COUNT(*) AS total FROM Leads l JOIN users u ON l.promotorActual = u.promotorId WHERE u.userName = ? GROUP BY l.TipoReferido, l.NombreReferido",
    [userName]
    );

    const totalPorMedioContactoProm = await pool.query(
    "SELECT m.Nombre AS MedioContacto, COUNT(*) AS total FROM Leads l JOIN MedioDeContacto m ON l.MedioDeContactoID = m.MedioID JOIN users u ON l.promotorActual = u.promotorId WHERE u.userName = ? GROUP BY m.Nombre",
    [userName]

    );


    //edades, referidos, % becas, medio contacto 

    

    // Construir un objeto de respuesta con todas las consultas
    const response = {
      inscripcionesPorProm,
      pseguimientoProm,
      totalPorCicloProm,
      totalPorPaisProm,
      totalPorEstadoProm,
      totalPorCiudadProm,
      totalPorMesAnioProm,
      totalPorEscProdProm,
      totalPorEdadesProm,
      totalPorBecaProm,
      totalPorReferidoProm,
      totalPorMedioContactoProm,
      

    };

    res.json({
      status: 200,
      message: "Datos para las gráficas obtenidos correctamente",
      data: response,
    });
  } catch (error) {
    console.error("Error al obtener datos para las gráficas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Agrega más endpoints para los demás datos del dashboard siguiendo un enfoque similar

module.exports = router;
