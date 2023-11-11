DROP DATABASE IF EXISTS APIS3;
CREATE DATABASE APIS3;
USE APIS3;

-- Crear la tabla "Promotor"
CREATE TABLE Promotor (
    PromotorID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Correo VARCHAR(255),
    Salt VARCHAR(255),
   -- HashedPassword VARCHAR(255),
    Telefono varchar(20),
    Estado BOOLEAN DEFAULT TRUE NOT NULL
);

-- Crear la tabla "Leads"
CREATE TABLE Leads (
    LeadID INT AUTO_INCREMENT PRIMARY KEY,
    NombreCompleto VARCHAR(255),
    Telefono VARCHAR(20),
    Telefono2 INT(20),
    CorreoElectronico VARCHAR(255),
    CorreoElectronico2 VARCHAR(255),
    FechaPrimerContacto DATE,
    FechaNac DATE,
    EscuelaProcedencia VARCHAR(255),
    NombrePais VARCHAR(255),
    NombreEstado VARCHAR(255),
    NombreCiudad VARCHAR(255),
    PSeguimiento ENUM('AU-ALUMNO UNINTER', 'INSC-INSCRIPCIÓN', 'NC-NO CONTESTA', 'NI-NO INTERESA',
                      'P-PROSPECTO', 'PI-INSCRIPCIÓN', 'PS-SEGUIMIENTO', 'SC-SIN CONTACTO', 'PU-PERSONAL UNINTER',
                      'DU-DUPLICADO', 'DI-DATO NO VALIDO', 'BA-BAJA ALUMNO', 'VACIO'),
    CarreraInteresID INT,
    Grado ENUM('SECUNDARIA', 'BACHILLERATO', 'PREPA-A', 'LIC/ING', 'ESPECIALIDAD', 'DIPLOMADO', 'MAESTRIA', 'DOCTORADO', 'NO ESPECIFICA'),
    Programa INT(1),
    EstatusInsc ENUM('INSO', 'REZA', 'INSC', 'BAJA', 'ARCHIVAR'),
    SemestreIngreso ENUM('1 Semestre', '2 Semestre', '3 Semestre', '4 Semestre', '5 Semestre', '6 Semestre', '7 Semestre', '8 Semestre',
    'Maestria', 'Doctorado', 'Licenciatura', 'Diplomados'),
    Ciclo VARCHAR(10),
    CampanaID INT,
    AsetNameForm VARCHAR(255),
    IsOrganic ENUM('PAUTA', 'ORGÁNICO', '') NOT NULL DEFAULT '',
    MedioDeContactoID INT,
    TipoReferido ENUM('ESTUDIANTE', 'FAMILIAR DE ALGÚN ESTUDIANTE', 'PERSONAL UNINTER', 'NINGUNO'),
    NombreReferido VARCHAR(100),
    DondeObtDato ENUM('B_AFC', 'B_EMPRESAS', 'B_ESTRATEGIA VACACIONES EQUI', 'B_PERSONAL', 'B_POSGRADOS', 'BARRIDO BASE', 'BARRIDO EGRESADOS',
                      'BASE EGRESADOS', 'BASE FAMILIAR', 'CLIENGO', 'ESTRATEGIA EQUIPO MORADO', 'EXPO EDUCATIVA', 'REDES SOCIALES META FACEBOOK',
                      'REDES SOCIALES META INSTAGRAM', 'LANDING', 'LANDING CARRERAS', 'LANDING FORMULARIO', 'LANDING TOT', 'LLAMADA UNINTER', 'OPEN SCHOOL ESPECIAL POR CONVENIO CON EMPRESA',
                      'VISITA UNINTER'),
    FechaInscripcion DATE,
    CarreraInscripcion INT(11),
    BecaOfrecida DECIMAL(10, 2),
    NumeroLista INT,
    PromotorOriginal INT,
    FechaPromotorOriginal DATE,
    PromotorActual INT,
    FechaPromotorActual DATE,
    Comentarios TEXT,
    Contacto INT
);
-- Continuación del script

-- Crear la tabla "Campana"
CREATE TABLE Campana (
    CampanaID INT AUTO_INCREMENT PRIMARY KEY,
    TipoCamp VARCHAR(255),
    Nombre VARCHAR(255)
);

-- Crear la tabla "CarreraInteres"
CREATE TABLE CarreraInteres (
    CarreraID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255)
);

-- Crear la tabla "Contacto"
CREATE TABLE Contacto (
    ContactoID INT AUTO_INCREMENT PRIMARY KEY,
    FechaContacto DATE,
    Comentario VARCHAR(255)
);

-- Crear la tabla "MedioDeContacto"
CREATE TABLE MedioDeContacto (
    MedioID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre CHAR(255)
);

-- Crear la tabla "Reasignaciones"
CREATE TABLE Reasignaciones (
    ReasignacionID INT AUTO_INCREMENT PRIMARY KEY,
    LeadID INT,
    PromotorAnterior INT,
    PromotorNuevo INT,
    FechaReasignacion DATETIME
);

-- Crear la tabla "ContactoAlumno"
CREATE TABLE ContactoAlumno(
    ContactoAlumnoID INT PRIMARY KEY AUTO_INCREMENT,
    LeadID INT,
    ContactoID INT
);

-- Crear la tabla "Carreras"
CREATE TABLE Carreras (
    CarreraID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255)
);

-- Crear la tabla "Alumnos"
CREATE TABLE Alumnos (
    AlumnoID INT AUTO_INCREMENT PRIMARY KEY,
    LeadID INT,
    Nombre VARCHAR(50),
    Telefono varchar(20),
    EscuelaProcedencia varchar(50),
    PromotorID INT(11),
    NoRecibo VARCHAR(50),
    Matricula VARCHAR(50),
    CarreraInscripcion INT,
    Procedencia ENUM('Local', 'Foraneo'),
    TipoBaja ENUM('Temporal','Definitiva'),
    RSFacebook VARCHAR(50),
    RSInstagram VARCHAR(50),
    RSTiktok VARCHAR(50),
    RSLinkedln VARCHAR(255),
    RSTwiter VARCHAR(50),
    RSWhatsapp INT (15),
    RSOtro VARCHAR(255),
    ContactoID INT,
    Estatus ENUM('INSC','BAJA'),
    FechaBaja DATE,
    CorreoInstitucional varchar (50),
    FOREIGN KEY (LeadID) REFERENCES Leads(LeadID),
    FOREIGN KEY (ContactoID) REFERENCES ContactoAlumno(ContactoAlumnoID),
    FOREIGN KEY (PromotorID) REFERENCES Promotor(PromotorID),
    FOREIGN KEY (CarreraInscripcion) REFERENCES Carreras(CarreraID)
);

-- Crear la tabla "users"
CREATE TABLE users(
	idUser Int primary key auto_increment not null,
    userName varchar(30) not null,
    email varchar(30),
    password varchar(30) not null,
    role enum('admin','promotor','coordinador')
);

-- Crear la tabla "ListaComision"
CREATE TABLE ListaComision (
    ListaComisionID INT AUTO_INCREMENT PRIMARY KEY,
    PromotorID INT,
    FechaInscripcionAlumno DATE,
    AlumnoID INT,
    Status ENUM('INSC', 'INSO', 'REZA'),
    CicloEscolar VARCHAR(10),
    ProgramaID INT,
    SemestreIngreso ENUM('1 Semestre', '2 Semestre', '3 Semestre', '4 Semestre', '5 Semestre', '6 Semestre', '7 Semestre', '8 Semestre',
                         'Maestria', 'Doctorado', 'Licenciatura', 'Diplomados'),
    Matricula VARCHAR(50),
    NoRecibo VARCHAR(50),
    PorcentajeBeca ENUM('0%', '5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '55%', '60%', 'APOYO A TRABAJADOR', 'ORFANDAD', 'PATRONATO'),
    TotalComision DECIMAL(10, 2),
    EscuelaProcedencia VARCHAR(255),
    Escuela ENUM('PUBLICA', 'PRIVADA'),
    Pais VARCHAR(255),
    Estado VARCHAR(255),
    Municipio VARCHAR(255),
    MedioDeContactoID INT,
    CanalDeVenta ENUM('FACEBOOK', 'WHATSAPP', 'TELEMARKETING', 'CORREO', 'NO ESPECIFICA', 'PRESENCIAL'),
    EsReferido ENUM('NINGUNO', 'PERSONAL UNINTER', 'ESTUDIANTE', 'FAMILIAR DE ALGUN ESTUDIANTE'),
    PromocionInscripcion ENUM('FLASH PASS', 'SEMESTRE O AÑO AVANZADO', 'EGRESADO', 'NO PAGA COLEGIATURA EN DOS PARCIALIDADES', 'APOYO TRABAJADOR', 'CERO INSC PAGA 1RA COLEGIATURA',
                              'PAGA INSCRIPCION SIN PROMOCION', 'OTRO'),
    NumTelefonicoAlumno VARCHAR(20),
    CorreoElectronicoProspecto VARCHAR(255),
    FechaNacimientoProspecto DATE,
    FOREIGN KEY (PromotorID) REFERENCES Promotor(PromotorID),
    FOREIGN KEY (AlumnoID) REFERENCES Alumnos(AlumnoID),
    FOREIGN KEY (ProgramaID) REFERENCES CarreraInteres(CarreraID),
    FOREIGN KEY (MedioDeContactoID) REFERENCES MedioDeContacto(MedioID)
);

-- Agregar la relación entre Leads y CarreraInteres
ALTER TABLE Leads
ADD FOREIGN KEY (CarreraInteresID) REFERENCES CarreraInteres(CarreraID);

ALTER TABLE Leads
ADD FOREIGN KEY (CarreraInscripcion) REFERENCES CarreraInteres(CarreraID);

-- Agregar la relación entre Leads y Campana
ALTER TABLE Leads
ADD FOREIGN KEY (CampanaID) REFERENCES Campana(CampanaID);

-- Agregar la relación entre Leads y MedioDeContacto
ALTER TABLE Leads
ADD FOREIGN KEY (MedioDeContactoID) REFERENCES MedioDeContacto(MedioID);

-- Agregar la relación entre Leads y PromotorOriginal
ALTER TABLE Leads
ADD FOREIGN KEY (PromotorOriginal) REFERENCES Promotor(PromotorID);

-- Agregar la relación entre Leads y PromotorActual
ALTER TABLE Leads
ADD FOREIGN KEY (PromotorActual) REFERENCES Promotor(PromotorID);

-- Agregar la relación entre Reasignaciones y Leads
ALTER TABLE Reasignaciones
ADD FOREIGN KEY (LeadID) REFERENCES Leads(LeadID);

-- Agregar la relación entre Reasignaciones y PromotorAnterior
ALTER TABLE Reasignaciones
ADD FOREIGN KEY (PromotorAnterior) REFERENCES Promotor(PromotorID);

-- Agregar la relación entre Reasignaciones y PromotorNuevo
ALTER TABLE Reasignaciones
ADD FOREIGN KEY (PromotorNuevo) REFERENCES Promotor(PromotorID);

-- Agregar la relación entre Leads y Contactos
ALTER TABLE Leads
ADD FOREIGN KEY (Contacto) REFERENCES Contacto(ContactoID);

<<<<<<< HEAD
=======

-- mis insert
#contactoAlumno
INSERT INTO `contactoalumno` (`ContactoAlumnoID`, `FechaContacto`, `Comentario`) 
VALUES 
(NULL, '2023-11-02', 'Se realizo un seguimiento de inscripción con el alumno');
INSERT INTO `contactoalumno` (`ContactoAlumnoID`, `FechaContacto`, `Comentario`) 
VALUES 
(NULL, '2023-11-03', 'se concluyo la inscripción');

-- New Insert
#campana
INSERT INTO `campana` (`CampanaID`, `TipoCamp`, `Nombre`) VALUES (NULL, 'Beca especial', 'GENERACIÓN DE OPORTUNIDADES DE VENTA');
INSERT INTO `campana` (`CampanaID`, `TipoCamp`, `Nombre`) VALUES (NULL, 'EQUIVALENCIAS', 'GENERACIÓN DE OPORTUNIDADES DE VENTA');

#carrerainteres
INSERT INTO `carrerainteres` (`CarreraID`, `Nombre`) VALUES (NULL, 'INGENIERIA MECATRONICA');
INSERT INTO `carrerainteres` (`CarreraID`, `Nombre`) VALUES (NULL, 'ADMINISTRACION DE NEGOCIOS INTERNACIONALES');

#mediocontacto
INSERT INTO `mediodecontacto` (`MedioID`, `Nombre`) VALUES (NULL, 'BARRIDO BASE');
INSERT INTO `mediodecontacto` (`MedioID`, `Nombre`) VALUES (NULL, 'LANDING CARRERAS');

#promotor
INSERT INTO `promotor` (`PromotorID`, `Nombre`, `Correo`, `Passw`, `Telefono`) VALUES (NULL, 'ximena', 'ximena@correo.com', '123456', '777852632');
INSERT INTO `promotor` (`PromotorID`, `Nombre`, `Correo`, `Passw`, `Telefono`) VALUES (NULL, 'Yanin', 'yanin@correo.com', '123456', '77458623');

#leads
INSERT INTO `leads` (`LeadID`, `NombreCompleto`, `Telefono`, `Telefono2`, `CorreoElectronico`, `CorreoElectronico2`, `FechaPrimerContacto`, `FechaNac`, `EscuelaProcedencia`, `NombrePais`, `NombreEstado`, `NombreCiudad`, `PSeguimiento`, `CarreraInteresID`, `Grado`, `Programa`, `EstatusInsc`, `SemestreIngreso`, `Ciclo`, `CampanaID`, `IsOrganic`, `MedioDeContactoID`, `TipoReferido`, `NombreReferido`, `DondeObtDato`, `FechaInscripcion`, `BecaOfrecida`, `NumeroLista`, `PromotorOriginal`, `NombrePromOrigi`, `FechaPromotorOriginal`, `PromotorActual`, `NombrePromAct`, `FechaPromotorActual`, `Comentarios`, `Contacto`) 
VALUES (NULL, 'JOHAN ANTONIO FIGUEROA FITZ', '7341282632', NULL, 'JOHANFIGUEROA2022@GMAIL.COM', NULL, '2023-05-18', '2001-05-11', 'CBTIS', 'Mexico', 'Morelos', 'Cuernavaca', 'AU-ALUMNO UNINTER', '1', 'LIC/ING', 'Mecatrónica (IME)', 'INS', '6 Semestre', '2023-2024', '1', 'PAUTA', '1', 'PERSONAL UNINTER', 'Hugo Mariaca', 'B_PERSONAL', '2023-06-19', '40', '406', '1', 'Ximena', '2023-06-16', NULL, NULL, NULL, 'Contesto llamda', NULL);
INSERT INTO `leads` (`LeadID`, `NombreCompleto`, `Telefono`, `Telefono2`, `CorreoElectronico`, `CorreoElectronico2`, `FechaPrimerContacto`, `FechaNac`, `EscuelaProcedencia`, `NombrePais`, `NombreEstado`, `NombreCiudad`, `PSeguimiento`, `CarreraInteresID`, `Grado`, `Programa`, `EstatusInsc`, `SemestreIngreso`, `Ciclo`, `CampanaID`, `IsOrganic`, `MedioDeContactoID`, `TipoReferido`, `NombreReferido`, `DondeObtDato`, `FechaInscripcion`, `BecaOfrecida`, `NumeroLista`, `PromotorOriginal`, `NombrePromOrigi`, `FechaPromotorOriginal`, `PromotorActual`, `NombrePromAct`, `FechaPromotorActual`, `Comentarios`, `Contacto`) 
VALUES (NULL, 'Mariana Lopez', '5551234567', NULL, 'mariana@email.com', NULL, '2023-11-20', '2001-11-20', 'CBTIS', 'Mexico', 'Morelos', 'Cuernavaca', 'AU-ALUMNO UNINTER', '1', 'LIC/ING', 'Mecatrónica (IME)', 'INS', '6 Semestre', '2023-2024', '1', 'PAUTA', '1', 'PERSONAL UNINTER', 'Hugo Mariaca', 'B_PERSONAL', '2023-06-19', '40', '406', '1', 'Ximena', '2023-11-20', NULL, NULL, NULL, 'Contesto llamda', NULL);

#reasignaciones
INSERT INTO `reasignaciones` (`ReasignacionID`, `LeadID`, `PromotorAnterior`, `PromotorNuevo`, `FechaReasignacion`) VALUES (NULL, '1', '1', '2', '2023-11-16 14:33:50');

>>>>>>> 2912762975087844683094117fc4807227ed21b4
-- Consultas a tablas

-- Inserts para la tabla "Promotor"

INSERT INTO Promotor (Nombre, Correo, HashedPassword, Telefono, Estado)
VALUES ('Juan Perez', 'juan@example.com', 'hashed_password', '123456789', TRUE);

-- Inserts para la tabla "Campana"
INSERT INTO Campana (TipoCamp, Nombre)
VALUES ('Publicitaria', 'Campaña de Verano');

-- Inserts para la tabla "CarreraInteres"
INSERT INTO CarreraInteres (Nombre)
VALUES ('Licenciatura en Psicología'),
       ('Licenciatura en Derecho'),
       ('Licenciatura en Ingeniería Informática');

-- Inserts para la tabla "Contacto"
INSERT INTO Contacto (FechaContacto, Comentario)
VALUES ('2023-02-15', 'Llamada de seguimiento');

-- Inserts para la tabla "MedioDeContacto"
INSERT INTO MedioDeContacto (Nombre)
VALUES ('Llamada telefónica'),
       ('Correo electrónico'),
       ('Redes sociales');

-- Inserts para la tabla "Leads"
-- Inserts para la tabla "Leads"
INSERT INTO `leads` (`LeadID`, `NombreCompleto`, `Telefono`, `Telefono2`, `CorreoElectronico`, `CorreoElectronico2`, `FechaPrimerContacto`, `FechaNac`, `EscuelaProcedencia`, `NombrePais`, `NombreEstado`, `NombreCiudad`, `PSeguimiento`, `CarreraInteresID`, `Grado`, `EstatusInsc`, `SemestreIngreso`, `Ciclo`, `CampanaID`, `IsOrganic`, `MedioDeContactoID`, `TipoReferido`, `NombreReferido`, `DondeObtDato`, `FechaInscripcion`, `BecaOfrecida`, `NumeroLista`, `PromotorOriginal`, `FechaPromotorOriginal`, `PromotorActual`, `FechaPromotorActual`, `Comentarios`, `Contacto`) 
VALUES (NULL, 'Laura Rodriguez', '987654321', NULL, 'laura@example.com', NULL, '2023-11-01', '2014-01-01', 'Preparatoria XYZ', 'México', 'Jalisco', 'Guadalajara', 'PS-SEGUIMIENTO', '3', 'LIC/ING', 'INSO', '3 Semestre', '2024-1', '1', 'ORGÁNICO', '1', 'ESTUDIANTE', 'Alex Milan', 'B_PERSONAL', NULL, '15', '404', '1', '2023-11-01', '1', '2023-10-11', 'No responde', '1');

INSERT INTO `leads` (`LeadID`, `NombreCompleto`, `Telefono`, `Telefono2`, `CorreoElectronico`, `CorreoElectronico2`, `FechaPrimerContacto`, `FechaNac`, `EscuelaProcedencia`, `NombrePais`, `NombreEstado`, `NombreCiudad`, `PSeguimiento`, `CarreraInteresID`, `Grado`, `EstatusInsc`, `SemestreIngreso`, `Ciclo`, `CampanaID`, `IsOrganic`, `MedioDeContactoID`, `TipoReferido`, `NombreReferido`, `DondeObtDato`, `FechaInscripcion`, `BecaOfrecida`, `NumeroLista`, `PromotorOriginal`, `FechaPromotorOriginal`, `PromotorActual`, `FechaPromotorActual`, `Comentarios`, `Contacto`) 
VALUES (NULL, 'Mario Rodriguez', '123456789', NULL, 'Mario@example.com', NULL, '2023-10-01', '2013-01-01', 'Preparatoria ZXY', 'México', 'Morelos', 'Cuernavaca', 'PS-SEGUIMIENTO', '3', 'LIC/ING', 'INSC', '3 Semestre', '2024-1', '1', 'ORGÁNICO', '1', 'ESTUDIANTE', 'Alex Milan', 'B_PERSONAL', NULL, '15', '404', '1', '2023-11-01', '1', '2023-10-11', 'No responde', '1');


-- Inserts para la tabla "Reasignaciones"
INSERT INTO Reasignaciones (LeadID, PromotorAnterior, PromotorNuevo, FechaReasignacion)
VALUES (1, 1, 1, '2023-02-10');

-- Inserts para la tabla "Alumnos"
-- INSERT INTO Alumnos (LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia, TipoBaja, RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional)
-- VALUES (2, 'Carlos García', '987654321', 'Preparatoria ABC', 1, 'REC-123', 'MAT-456', 'Licenciatura en Psicología', 'Local', 'Temporal', 'facebook.com/carlos', 'instagram.com/carlos', 'tiktok.com/carlos', 'linkedin.com/in/carlos', 'twitter.com/carlos', 987654321, 'Otro perfil social', 1, 'INSC', NULL, 'carlos@example.com');

-- Inserts para la tabla "ListaComision"
-- INSERT INTO ListaComision (PromotorID, FechaInscripcionAlumno, AlumnoID, Status, CicloEscolar, ProgramaID, SemestreIngreso, Matricula, NoRecibo, PorcentajeBeca, TotalComision, EscuelaProcedencia, Escuela, Pais, Estado, Municipio, MedioDeContactoID, CanalDeVenta, EsReferido, PromocionInscripcion, NumTelefonicoAlumno, CorreoElectronicoProspecto, FechaNacimientoProspecto)
-- VALUES (1, '2023-01-15', 1, 'INSC', '2023A', 1, '1 Semestre', 'MAT-789', 'REC-321', '10%', 5000.00, 'Preparatoria ABC', 'PRIVADA', 'México', 'Jalisco', 'Guadalajara', 1, 'FACEBOOK', 'NINGUNO', 'FLASH PASS', '9876543210', 'carlos_prospecto@example.com', '2000-01-20');

-- Inserts para la tabla "users"
INSERT INTO users (userName, password, role)
VALUES ('admin1', 'admin1_password', 'admin'),
       ('promotor1', 'promotor1_password', 'promotor');

-- Consulta del nombre de los promotores Actual
SELECT 
    P.nombre as NombrePromotor
FROM Leads L
JOIN promotor P ON L.PromotorActual = P.PromotorID;

-- Consulta el nombre del promotor nuevo que se reasigno a un Lead
SELECT
    L.NombreCompleto,
    P.nombre as PromotorNuevo
FROM reasignaciones R
JOIN Leads L ON R.LeadID = L.LeadID
JOIN promotor P ON R.PromotorNuevo = P.promotorID;

-- Consulta de carrera de Interes por Lead
SELECT 
    L.NombreCompleto,
    CI.Nombre
FROM leads L
JOIN carrerainteres CI ON L.CarreraInteresID = CI.CarreraID;

-- Consulta de por campana
SELECT
    L.NombreCompleto,
    C.Nombre
FROM leads L
JOIN campana C ON L.CampanaID = C.campanaID;

-- Consulta Medio de contacto
SELECT
    L.NombreCompleto,
    MC.Nombre
FROM leads L
JOIN mediodecontacto MC ON L.MedioDeContactoID = MC.MedioID;

-- Trigger para saber la cantidad de regisros por mes de los leads
CREATE TABLE leadxmes (
    mes INT,
    anio INT,
    cantidad_registros INT
);

CREATE TABLE leadxmes_promotor (
    mes INT,
    anio INT,
    nombrePromotor VARCHAR(255),
    cantidad_registros INT
);

DELIMITER //
CREATE TRIGGER actualizar_conteo
AFTER INSERT ON leads
FOR EACH ROW
BEGIN
    DECLARE mes_insert INT;
    DECLARE anio_insert INT;
    SET mes_insert = MONTH(NEW.FechaPrimerContacto); -- Suponiendo que tienes una columna llamada "fecha" en tu tabla
    SET anio_insert = YEAR(NEW.FechaPrimerContacto);

    -- Verificar si ya existe un registro para el mes y año actual
    IF EXISTS (SELECT * FROM leadxmes WHERE mes = mes_insert AND anio = anio_insert) THEN
        -- Actualizar el conteo
        UPDATE leadxmes
        SET cantidad_registros = cantidad_registros + 1
        WHERE mes = mes_insert AND anio = anio_insert;
    ELSE
        -- Insertar un nuevo registro para el mes y año actual
        INSERT INTO leadxmes (mes, anio, cantidad_registros)
        VALUES (mes_insert, anio_insert, 1);
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER actualizar_conteo_leadxpromotor
AFTER INSERT ON leads
FOR EACH ROW
BEGIN
    DECLARE mes_insert INT;
    DECLARE anio_insert INT;
    DECLARE promotor_insert VARCHAR(255);
    SET mes_insert = MONTH(NEW.FechaPrimerContacto); -- Suponiendo que tienes una columna llamada "fecha" en tu tabla
    SET anio_insert = YEAR(NEW.FechaPrimerContacto);
    SET promotor_insert = NEW.NombrePromAct;

    -- Verificar si ya existe un registro para el mes y año actual
    IF EXISTS (SELECT * FROM leadxmes_promotor WHERE mes = mes_insert AND anio = anio_insert AND nombrePromotor =  promotor_insert ) THEN
        -- Actualizar el conteo
        UPDATE leadxmes_promotor
        SET cantidad_registros = cantidad_registros + 1
        WHERE mes = mes_insert AND anio = anio_insert AND nombrePromotor = promotor_insert;
    ELSE
        -- Insertar un nuevo registro para el mes y año actual
        INSERT INTO leadxmes_promotor (mes, anio, nombrePromotor, cantidad_registros)
        VALUES (mes_insert, anio_insert, promotor_insert, 1);
    END IF;
END;
//
DELIMITER ;

SET SQL_SAFE_UPDATES = 0;

DELIMITER //
CREATE TRIGGER insert_alumnos
AFTER UPDATE ON Leads
FOR EACH ROW
BEGIN
    IF NEW.EstatusInsc = 'INSC' THEN
        -- Verificar si ya existe un registro para el Lead en la tabla Alumnos
        IF NOT EXISTS (SELECT * FROM Alumnos WHERE LeadID = NEW.LeadID) THEN
            -- Insertar un nuevo registro en la tabla Alumnos
            INSERT INTO Alumnos (LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, Estatus, CarreraInscripcion )
            VALUES (NEW.LeadID, NEW.NombreCompleto, NEW.Telefono, NEW.EscuelaProcedencia, NEW.PromotorActual, NEW.EstatusInsc, NEW.CarreraInscripcion);
        ELSE
            -- Actualizar el registro existente en la tabla Alumnos
            UPDATE Alumnos
            SET Nombre = NEW.NombreCompleto,
                Telefono = NEW.Telefono,
                EscuelaProcedencia = NEW.EscuelaProcedencia,
                PromotorID = NEW.PromotorActual,
                Estatus = NEW.EstatusInsc,
                CarreraInscripcion = NEW.CarreraInscripcion
            WHERE LeadID = NEW.LeadID;
        END IF;
    END IF;
END;
//
DELIMITER ;

 -- DROP trigger insert_alumnos;

UPDATE leads SET EstatusInsc = 'INSC' WHERE LeadID= 3;

//
DELIMITER ;

<<<<<<< HEAD
-- Continuación del script

-- Consulta para obtener la cantidad de registros por mes
SELECT * FROM leadxmes;

-- Consulta para obtener la cantidad de registros por mes y promotor
SELECT * FROM leadxmes_promotor;

-- Fin del script

=======
DELIMITER //
CREATE TRIGGER insert_users
AFTER INSERT ON promotor
FOR EACH ROW
BEGIN
     INSERT INTO users (userName, email, password, role)
    VALUES (NEW.Nombre, NEW.Correo , NEW.Passw, 'promotor')
    ON DUPLICATE KEY UPDATE userName = NEW.Nombre, email = NEW.Correo, password = NEW.Passw;
END;
//
DELIMITER ;
>>>>>>> 2912762975087844683094117fc4807227ed21b4
