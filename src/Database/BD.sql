DROP DATABASE IF EXISTS APIS4;
CREATE DATABASE APIS4;
USE APIS4;

-- Crear la tabla "Promotor"
CREATE TABLE Promotor (
    PromotorID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Correo VARCHAR(255),
    Passw VARCHAR(255),
    Telefono varchar(20),
    Estado BOOLEAN DEFAULT TRUE NOT NULL
);

-- Crear la tabla "Campana"
CREATE TABLE Campana (
    CampanaID INT AUTO_INCREMENT PRIMARY KEY,
    TipoCamp VARCHAR(255),
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

-- Crear la tabla "ContactoAlumno"
CREATE TABLE ContactoAlumno(
    ContactoAlumnoID INT PRIMARY KEY AUTO_INCREMENT,
    FechaContacto DATE,
    Comentario VARCHAR(255)
);

-- Crear la tabla "Carreras"
CREATE TABLE Carreras (
    CarreraID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255)
);

-- Crear la tabla "users"
CREATE TABLE users(
    idUser INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userName VARCHAR(30) NOT NULL,
    email VARCHAR(30),
    password VARCHAR(30) NOT NULL,
    role ENUM('admin','promotor','coordinador')
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
    CarreraInscripcion INT,
    BecaOfrecida DECIMAL(10, 2),
    NumeroLista INT,
    PromotorOriginal INT,
    FechaPromotorOriginal DATE,
    PromotorActual INT,
    FechaPromotorActual DATE,
    Comentarios TEXT,
    Contacto INT,
    FOREIGN KEY (CarreraInteresID) REFERENCES Carreras(CarreraID),
    FOREIGN KEY (CampanaID) REFERENCES Campana(CampanaID),
    FOREIGN KEY (MedioDeContactoID) REFERENCES MedioDeContacto(MedioID),
    FOREIGN KEY (PromotorOriginal) REFERENCES Promotor(PromotorID),
    FOREIGN KEY (PromotorActual) REFERENCES Promotor(PromotorID),
    FOREIGN KEY (CarreraInscripcion) REFERENCES Carreras(CarreraID),
    FOREIGN KEY (Contacto) REFERENCES Contacto(ContactoID)
);

-- Crear la tabla "Reasignaciones"
CREATE TABLE Reasignaciones (
    ReasignacionID INT AUTO_INCREMENT PRIMARY KEY,
    LeadID INT,
    PromotorAnterior INT,
    PromotorNuevo INT,
    FechaReasignacion DATETIME,
    FOREIGN KEY (LeadID) REFERENCES Leads(LeadID),
    FOREIGN KEY (PromotorAnterior) REFERENCES Promotor(PromotorID),
    FOREIGN KEY (PromotorNuevo) REFERENCES Promotor(PromotorID)
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
    FOREIGN KEY (ProgramaID) REFERENCES Carreras(CarreraID),
    FOREIGN KEY (MedioDeContactoID) REFERENCES MedioDeContacto(MedioID)
);

-- Trigger para saber la cantidad de regisros por mes de los leads
CREATE TABLE leadxmes (
    mes INT,
    anio INT,
    cantidad_registros INT
);

CREATE TABLE leadxmes_promotor (
    mes INT,
    anio INT,
    nombrePromotor INT,
    cantidad_registros INT
);


-- Inserciones para la tabla "Promotor"
INSERT INTO Promotor (Nombre, Correo, Passw, Telefono, Estado) VALUES
('Juan Pérez', 'juan@example.com', 'password123', '555-1234', TRUE),
('María Gómez', 'maria@example.com', 'securepass', '555-5678', TRUE);

-- Inserciones para la tabla "Campana"
INSERT INTO Campana (TipoCamp, Nombre) VALUES
('Campaña 1', 'Verano 2023'),
('Campaña 2', 'Otoño 2023');

-- Inserciones para la tabla "Contacto"
INSERT INTO Contacto (FechaContacto, Comentario) VALUES
('2023-01-01', 'Primer contacto por teléfono'),
('2023-02-15', 'Correo enviado para seguimiento');

-- Inserciones para la tabla "MedioDeContacto"
INSERT INTO MedioDeContacto (Nombre) VALUES
('Teléfono'), ('Correo Electrónico'), ('Redes Sociales');



-- Inserciones para la tabla "ContactoAlumno"
INSERT INTO ContactoAlumno (FechaContacto, Comentario) VALUES
('2023-04-10', 'Entrevista realizada con el alumno 1'),
('2023-04-20', 'Reunión con los padres del alumno 2');

-- Inserciones para la tabla "Carreras"
INSERT INTO Carreras (Nombre) VALUES
('Licenciatura en Informática'), ('Maestría en Administración');

-- Inserciones para la tabla "users"
INSERT INTO users (userName, email, password, role) VALUES
('adminuser', 'admin@example.com', 'adminpass', 'admin'),
('promotoruser', 'promotor@example.com', 'promotorpass', 'promotor');


-- Inserciones para la tabla "Leads"
INSERT INTO Leads (NombreCompleto, Telefono, Telefono2, CorreoElectronico, CorreoElectronico2, FechaPrimerContacto, FechaNac,
EscuelaProcedencia, NombrePais, NombreEstado, NombreCiudad, PSeguimiento, CarreraInteresID, Grado, Programa, EstatusInsc, SemestreIngreso, Ciclo, CampanaID,
AsetNameForm, IsOrganic, MedioDeContactoID, TipoReferido, NombreReferido, DondeObtDato, FechaInscripcion, CarreraInscripcion, BecaOfrecida, NumeroLista,
PromotorOriginal, FechaPromotorOriginal, PromotorActual, FechaPromotorActual, Comentarios, Contacto) VALUES
('Carlos Rodríguez', '555-1111', NULL, 'carlos@example.com', NULL, '2023-01-15', '2002-03-10', 'Escuela A', 'México', 'Ciudad de México', 'Benito Juárez',
  'P-PROSPECTO', 1, 'BACHILLERATO', 1, 'INSC', '1 Semestre', '2023A', 1, 'Formulario1', 'PAUTA', 2, 'PERSONAL UNINTER', 'Juan Pérez', 'B_POSGRADOS',
  '2023-02-01', 1, 0.00, 101, NULL, NULL, NULL, NULL, NULL, NULL),
('Ana Gómez', '555-2222', '555-3333', 'ana@example.com', 'ana2@example.com', '2023-02-10', '1998-11-25', 'Escuela B', 'México', 'Estado de México', 'Toluca',
  'PS-SEGUIMIENTO', 2, 'LIC/ING', 1, 'REZA', '2 Semestre', '2023A', 2, 'Formulario2', 'ORGÁNICO', 1, 'ESTUDIANTE', 'María Gómez', 'REDES SOCIALES META INSTAGRAM',
  '2023-03-01', 2, 300.00, 102, 1, '2023-02-15', 2, '2023-03-01', 'Comentario sobre la situación', 2);

-- Inserciones para la tabla "Alumnos"
INSERT INTO Alumnos (LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia,
TipoBaja, RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional) VALUES
(1, 'Carlos Rodríguez', '555-1111', 'Escuela A', 1, 'REC2023001', 'LIC2023001', 1, 'Local', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'INSC', NULL, 'carlos@example.com'),
(2, 'Ana Gómez', '555-2222', 'Escuela B', 2, 'REC2023002', 'MAES2023002', 2, 'Foraneo', 'Definitiva', NULL, 'ana2@example.com', NULL, NULL, NULL, 5558888, NULL, 2, 'BAJA', '2023-05-20', 'ana@example.com');

-- Inserciones para la tabla "Reasignaciones"
INSERT INTO Reasignaciones (LeadID, PromotorAnterior, PromotorNuevo, FechaReasignacion) VALUES
(1, 2, 1, '2023-03-01'),
(2, 1, 2, '2023-03-05');
-- Inserciones para la tabla "ListaComision"
INSERT INTO ListaComision (PromotorID, FechaInscripcionAlumno, AlumnoID, Status, CicloEscolar, ProgramaID, SemestreIngreso, Matricula, NoRecibo,
PorcentajeBeca, TotalComision, EscuelaProcedencia, Escuela, Pais, Estado, Municipio, MedioDeContactoID, CanalDeVenta, EsReferido,
PromocionInscripcion, NumTelefonicoAlumno, CorreoElectronicoProspecto, FechaNacimientoProspecto) VALUES
(1, '2023-05-01', 1, 'INSC', '2023A', 1, 'Licenciatura', 'LIC2023001', 'REC2023001', '10%', 500.00, 'Escuela X', 'PRIVADA', 'México', 'Ciudad de México', 'Benito Juárez',
  1, 'WHATSAPP', 'PERSONAL UNINTER', 'FLASH PASS', '555-9999', 'alumno1@example.com', '2000-01-15'),
(2, '2023-05-05', 2, 'INSO', '2023A', 2, 'Maestría', 'MAES2023002', 'REC2023002', '15%', 700.00, 'Escuela Y', 'PÚBLICA', 'México', 'Estado de México', 'Toluca',
  2, 'CORREO', 'ESTUDIANTE', 'EGRESADO', '555-8888', 'alumno2@example.com', '1998-08-20');



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
    SET promotor_insert = NEW.PromotorActual;

    -- Verificar si ya existe un registro para el mes y año actual
    IF EXISTS (SELECT * FROM leadxmes_promotor WHERE mes = mes_insert AND anio = anio_insert AND promotorActual =  promotor_insert ) THEN
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

