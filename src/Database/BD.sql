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
    role ENUM('admin','promotor','coordinador'),
    promotorId int,
    FOREIGN KEY (promotorId) REFERENCES Promotor(PromotorID)
);

-- Crear la tabla "Leads"
CREATE TABLE Leads (
    LeadID INT AUTO_INCREMENT PRIMARY KEY,
    NombreCompleto VARCHAR(255),
    Telefono VARCHAR(20),
    Telefono2 Varchar(20),
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
    Programa enum('ADMINISTRACIÓN','ADMINISTRACION DE EMPRESAS','ADMINISTRACION DE NEGOCIOS INTERNACIONALES','ARQ','BACHILLERATO SEMESTRAL','BILINGÜE','BIU','BIUB','BIUM','CIENCIAS POLÍTICAS, RELACIONES INT.','CLS PRT','CORP','CURSO DE VERANO','Curso Intensivo','DAD','DDI','DDPAI','DEI','DEPU','DHU','DI','DIP','DISEÑO DE MODAS','DISEÑO GRÁFICO','DMD','DPU','EAO','EAPD','EAPD y LADD','EATL', 'LDI','LDM','LECE','LED','LEF','LEM',
	'LEMK','LEMP','LIC','LICENCIATURA','LID','LPS','LRI','MADE','MADEL','MARET','MDG','MEL','MELE','MERCADOTECNIA','MGC','MI','NIÑOS','OFERTA EDUCATIVA','PEDAGOGÍA','PREPA A','PREPA-A','REGLR','SIU','SIUB','SIUM','UNI LAE','LPE') ,
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
    promotorOriginal INT,
    FechaPromotorOriginal DATE,
    promotorActual INT,
    FechaPromotorActual DATE,
    Comentarios TEXT,
    Contacto INT,
    FOREIGN KEY (CarreraInteresID) REFERENCES Carreras(CarreraID),
    FOREIGN KEY (CampanaID) REFERENCES Campana(CampanaID),
    FOREIGN KEY (MedioDeContactoID) REFERENCES MedioDeContacto(MedioID),
    FOREIGN KEY (promotorOriginal) REFERENCES Promotor(PromotorID),
    FOREIGN KEY (promotorActual) REFERENCES Promotor(PromotorID),
    FOREIGN KEY (CarreraInscripcion) REFERENCES Carreras(CarreraID)
);

-- Crear la tabla "Contacto"
CREATE TABLE Contacto (
    ContactoID INT AUTO_INCREMENT PRIMARY KEY,
    LeadID int,
    FechaContacto DATE,
    Comentario VARCHAR(255),
    NombrePromotor VARCHAR(50),
    FOREIGN KEY (LeadID) REFERENCES leads(LeadID)
);

-- Crear la tabla "Reasignaciones"
CREATE TABLE Reasignaciones (
    ReasignacionID INT AUTO_INCREMENT PRIMARY KEY,
    LeadID INT,
    NombrePromotor VARCHAR (255),
    FechaReasignacion DATETIME,
    FOREIGN KEY (LeadID) REFERENCES Leads(LeadID)
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



INSERT INTO carreras (CarreraID, Nombre)
VALUES
    (1, 'Psicología (LPS)'),
    (2, 'Derecho (LED)'),
    (3, 'Pedagogía (LPE)'),
    (4, 'Ciencias Políticas y Gestión Pública (LCP)'),
    (5, 'Relaciones Internacionales (LRI)'),
    (6, 'Relaciones Internacionales y Economía (RIEC)'),
    (7, 'Relaciones Internacionales y Ciencias Políticas (RICP)'),
    (8, 'Idiomas (LID)'),
    (9, 'Comunicación (LCO)'),
    (10, 'Comunicación y Relaciones Públicas (CORP)'),
    (11, 'Comercio Exterior (LCE)'),
    (12, 'Economía y Finanzas (LEF)'),
    (13, 'Mercadotecnia (LEM)'),
    (14, 'Mercadotecnia y Publicidad (LEMP)'),
    (15, 'Psicología Organizacional (LPO)'),
    (16, 'Administración de Empresas Turísticas (LAET)'),
    (17, 'Administración de Empresas (LAE)'),
    (18, 'Administración de Negocios Internacionales (LANI)'),
    (19, 'Administración Pública (LAP)'),
    (20, 'Administración y Mercadotecnia (LAM)'),
    (21, 'Diseño de Modas y Tendencias Internacionales (LDM)'),
    (22, 'Diseño Industrial (LDI)'),
    (23, 'Diseño Gráfico (LDG)'),
    (24, 'Animación y Diseño Digital (LADD)'),
    (25, 'Arquitectura (ARQ)'),
    (26, 'Civil (ICI)'),
    (27, 'Mecatrónica (IME)'),
    (28, 'Mecánica Industrial (IMI)'),
    (29, 'Industrial y de Sistemas de Calidad (IISCA)'),
    (30, 'Sistemas Computacionales (ISC)'),
    (31, 'Ambiental (IAM)'),
    (32, 'Gestión Empresarial (LEGE)'),
    (33, 'Mercadotecnia (LEMK)'),
    (34, 'Administración de Negocios Internacionales (LEANI)'),
    (35, 'Administración y Mercadotecnia (LEAM)'),
    (36, 'Mercadotecnia y Publicidad (LEMKP)'),
    (37, 'Comercio Exterior (LECE)');
SELECT * FROM apis4.carreras;


-- Inserciones para la tabla "Promotor"
INSERT INTO Promotor (Nombre, Correo, Passw, Telefono, Estado) VALUES
('Juan Pérez', 'juan@example.com', 'password123', '555-1234', TRUE),
('María Gómez', 'maria@example.com', 'securepass', '555-5678', TRUE);

-- Inserciones para la tabla "Campana"
INSERT INTO Campana (TipoCamp, Nombre) VALUES
('Campaña 1', 'Verano 2023'),
('Campaña 2', 'Otoño 2023');

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
promotorOriginal, FechaPromotorOriginal, promotorActual, FechaPromotorActual, Comentarios, Contacto) VALUES
('Carlos Rodríguez', '555-1111', NULL, 'carlos@example.com', NULL, null, '2002-03-10', 'Escuela A', 'México', 'Ciudad de México', 'Benito Juárez',
  'P-PROSPECTO', 1, 'BACHILLERATO', 'LDI', 'INSC', '1 Semestre', '2023A', 1, 'Formulario1', 'PAUTA', 2, 'PERSONAL UNINTER', 'Juan Pérez', 'B_POSGRADOS',
  '2023-02-01', 1, 0.00, 101, NULL, NULL, NULL, NULL, NULL, NULL),
('Ana Gómez', '555-2222', '555-3333', 'ana@example.com', 'ana2@example.com', null, '1998-11-25', 'Escuela B', 'México', 'Estado de México', 'Toluca',
  'PS-SEGUIMIENTO', 2, 'LIC/ING', 'PEDAGOGÍA', 'REZA', '2 Semestre', '2023A', 2, 'Formulario2', 'ORGÁNICO', 1, 'ESTUDIANTE', 'María Gómez', 'REDES SOCIALES META INSTAGRAM',
  '2023-03-01', 2, 300.00, 102, 1, '2023-02-15', 2, '2023-03-01', 'Comentario sobre la situación', 2),
  ('Bryan Murga', '7771301194', '555-3333', 'bryan@example.com', 'bryan2@example.com', null, '1998-11-25', 'Escuela B', 'México', 'Estado de México', 'Toluca',
  'PS-SEGUIMIENTO', 2, 'LIC/ING', 'SIU', 'REZA', '2 Semestre', '2023A', 2, 'Formulario2', 'ORGÁNICO', 1, 'ESTUDIANTE', 'María Gómez', 'REDES SOCIALES META INSTAGRAM',
  '2023-03-01', 2, 300.00, 102, 1, '2023-02-15', 2, '2023-03-01', 'Comentario sobre la situación', 2);
  
  INSERT INTO Leads (NombreCompleto, Telefono, Telefono2, CorreoElectronico, CorreoElectronico2, FechaPrimerContacto, FechaNac,
EscuelaProcedencia, NombrePais, NombreEstado, NombreCiudad, PSeguimiento, CarreraInteresID, Grado, Programa, EstatusInsc, SemestreIngreso, Ciclo, CampanaID,
AsetNameForm, IsOrganic, MedioDeContactoID, TipoReferido, NombreReferido, DondeObtDato, FechaInscripcion, CarreraInscripcion, BecaOfrecida, NumeroLista,
promotorOriginal, FechaPromotorOriginal, promotorActual, FechaPromotorActual, Comentarios, Contacto) VALUES
  ('Milton Murga', '7771301194', '555-3333', 'bryan@example.com', 'bryan2@example.com', null, '1998-11-25', 'Escuela B', 'México', 'Estado de México', 'Toluca',
  'PS-SEGUIMIENTO', 2, 'LIC/ING', 'SIU', 'REZA', '2 Semestre', '2023A', 2, 'Formulario2', 'ORGÁNICO', 1, 'ESTUDIANTE', 'María Gómez', 'REDES SOCIALES META INSTAGRAM',
  '2023-03-01', 2, 300.00, 102, 3, '2023-02-15', 3, '2023-03-01', 'Comentario sobre la situación', 2);
  
-- Inserciones para la tabla "Contacto"
INSERT INTO Contacto (leadID,FechaContacto, Comentario) VALUES
(1,'2023-01-01', 'Primer contacto por teléfono'),
(2,'2023-01-01', 'Primer contacto por teléfono'),
(2,'2023-02-15', 'Correo enviado para seguimiento');

-- Inserciones para la tabla "Alumnos"
INSERT INTO Alumnos (LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, NoRecibo, Matricula, CarreraInscripcion, Procedencia,
TipoBaja, RSFacebook, RSInstagram, RSTiktok, RSLinkedln, RSTwiter, RSWhatsapp, RSOtro, ContactoID, Estatus, FechaBaja, CorreoInstitucional) VALUES
(1, 'Carlos Rodríguez', '555-1111', 'Escuela A', 1, 'REC2023001', 'LIC2023001', 1, 'Local', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'INSC', NULL, 'carlos@example.com'),
(2, 'Ana Gómez', '555-2222', 'Escuela B', 2, 'REC2023002', 'MAES2023002', 2, 'Foraneo', 'Definitiva', NULL, 'ana2@example.com', NULL, NULL, NULL, 5558888, NULL, 2, 'BAJA', '2023-05-20', 'ana@example.com');

-- Inserciones para la tabla "ListaComision"
INSERT INTO ListaComision (PromotorID, FechaInscripcionAlumno, AlumnoID, Status, CicloEscolar, ProgramaID, SemestreIngreso, Matricula, NoRecibo,
PorcentajeBeca, TotalComision, EscuelaProcedencia, Escuela, Pais, Estado, Municipio, MedioDeContactoID, CanalDeVenta, EsReferido,
PromocionInscripcion, NumTelefonicoAlumno, CorreoElectronicoProspecto, FechaNacimientoProspecto) VALUES
(1, '2023-05-01', 1, 'INSC', '2023A', 1, 'Licenciatura', 'LIC2023001', 'REC2023001', '10%', 500.00, 'Escuela X', 'PRIVADA', 'México', 'Ciudad de México', 'Benito Juárez',
  1, 'WHATSAPP', 'PERSONAL UNINTER', 'FLASH PASS', '555-9999', 'alumno1@example.com', '2000-01-15'),
(2, '2023-05-05', 2, 'INSO', '2023A', 2, 'Maestría', 'MAES2023002', 'REC2023002', '15%', 700.00, 'Escuela Y', 'PÚBLICA', 'México', 'Estado de México', 'Toluca',
  2, 'CORREO', 'ESTUDIANTE', 'EGRESADO', '555-8888', 'alumno2@example.com', '1998-08-20');


-- EJECUTAR HASTA AQUI LA BASE DE DATOS, POSTERIORMENTE EJECUTAR LOS TRIGGERS UNO POR UNO --- IMPORTANTE

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



SET SQL_SAFE_UPDATES = 0; --  IMPORTANTE Ejecutar intrucion

DELIMITER //
CREATE TRIGGER insert_alumnos_create
AFTER INSERT ON Leads
FOR EACH ROW
BEGIN
    IF NEW.EstatusInsc = 'INSC' THEN
        -- Verificar si ya existe un registro para el Lead en la tabla Alumnos
        IF NOT EXISTS (SELECT * FROM Alumnos WHERE LeadID = NEW.LeadID) THEN
            -- Insertar un nuevo registro en la tabla Alumnos
            INSERT INTO Alumnos (LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, Estatus, CarreraInscripcion )
            VALUES (NEW.LeadID, NEW.NombreCompleto, NEW.Telefono, NEW.EscuelaProcedencia, NEW.promotorActual, NEW.EstatusInsc, NEW.CarreraInscripcion);
        ELSE
            -- Actualizar el registro existente en la tabla Alumnos
            UPDATE Alumnos
            SET Nombre = NEW.NombreCompleto,
                Telefono = NEW.Telefono,
                EscuelaProcedencia = NEW.EscuelaProcedencia,
                PromotorID = NEW.promotorActual,
                Estatus = NEW.EstatusInsc,
                CarreraInscripcion = NEW.CarreraInscripcion
            WHERE LeadID = NEW.LeadID;
        END IF;
    END IF;
END;
//
DELIMITER ;



DELIMITER //
CREATE TRIGGER insert_alumnos_update
AFTER UPDATE ON Leads
FOR EACH ROW
BEGIN
    IF NEW.EstatusInsc = 'INSC' THEN
        -- Verificar si ya existe un registro para el Lead en la tabla Alumnos
        IF NOT EXISTS (SELECT * FROM Alumnos WHERE LeadID = NEW.LeadID) THEN
            -- Insertar un nuevo registro en la tabla Alumnos
            INSERT INTO Alumnos (LeadID, Nombre, Telefono, EscuelaProcedencia, PromotorID, Estatus, CarreraInscripcion )
            VALUES (NEW.LeadID, NEW.NombreCompleto, NEW.Telefono, NEW.EscuelaProcedencia, NEW.promotorActual, NEW.EstatusInsc, NEW.CarreraInscripcion);
        ELSE
            -- Actualizar el registro existente en la tabla Alumnos
            UPDATE Alumnos
            SET Nombre = NEW.NombreCompleto,
                Telefono = NEW.Telefono,
                EscuelaProcedencia = NEW.EscuelaProcedencia,
                PromotorID = NEW.promotorActual,
                Estatus = NEW.EstatusInsc,
                CarreraInscripcion = NEW.CarreraInscripcion
            WHERE LeadID = NEW.LeadID;
        END IF;
    END IF;
END;
//
DELIMITER ;

//
DELIMITER ;

DELIMITER //
CREATE TRIGGER insert_users
AFTER INSERT ON promotor
FOR EACH ROW
BEGIN
     INSERT INTO users (userName, email, password, role, promotorId)
    VALUES (NEW.Nombre, NEW.Correo , NEW.Passw, 'promotor', New.PromotorID)
    ON DUPLICATE KEY UPDATE userName = NEW.Nombre, email = NEW.Correo, password = NEW.Passw, promotorId = NEW.PromotorID;
END;
//
DELIMITER ;

-- update promotor
DELIMITER //

CREATE TRIGGER update_users
AFTER UPDATE ON Promotor
FOR EACH ROW
BEGIN
    UPDATE users
    SET userName = NEW.Nombre,
        email = NEW.Correo,
        password = NEW.Passw,
        role = 'promotor'
    WHERE promotorId = NEW.PromotorID;
END;
//
DELIMITER ;




DELIMITER //
CREATE TRIGGER historyPromotor
AFTER UPDATE ON Leads
FOR EACH ROW
BEGIN
    DECLARE idPromotor INT;
    DECLARE PromotorNombre VARCHAR(255);
    DECLARE idPromotorActual INT;
    DECLARE PromotorNombreActual VARCHAR(255);

    -- Verificar si PromotorOriginal cambió
    IF NEW.promotorOriginal is not null and OLD.promotorOriginal is null THEN
        -- Obtener el valor actual de PromotorOriginal
        SET idPromotor = NEW.promotorOriginal;

        -- Obtener el nombre del promotor
        SELECT Nombre INTO PromotorNombre FROM promotor WHERE PromotorID = idPromotor;

        -- Insertar en la tabla de reasignaciones
        INSERT INTO Reasignaciones (LeadID, NombrePromotor, FechaReasignacion)
        VALUES (OLD.LeadID, PromotorNombre, CURRENT_TIMESTAMP());
    END IF;
    
    IF NEW.promotorActual <> OLD.promotorActual THEN
        -- Obtener el valor actual de PromotorOriginal
        SET idPromotorActual = NEW.promotorActual;

        -- Obtener el nombre del promotor
        SELECT Nombre INTO PromotorNombreActual FROM promotor WHERE PromotorID = idPromotorActual;

        -- Insertar en la tabla de reasignaciones
        INSERT INTO Reasignaciones (LeadID, NombrePromotor, FechaReasignacion)
        VALUES (OLD.LeadID, PromotorNombreActual, CURRENT_TIMESTAMP());
    END IF;
END;
//
DELIMITER ;



-- Select de los leads
SELECT leads.NombreCompleto, leads.telefono,leads.telefono2, leads.CorreoElectronico, leads.CorreoElectronico2, leads.FechaPrimerContacto,
leads.FechaNac, leads.EscuelaProcedencia, leads.NombrePais, leads.NombreEstado, leads.NombreCiudad, leads.PSeguimiento, leads.Grado,
leads.EstatusInsc,leads.SemestreIngreso, leads.Ciclo, leads.AsetNameForm, leads.IsOrganic, leads.TipoReferido, leads.NombreReferido, leads.DondeObtDato, 
leads.FechaInscripcion, leads.BecaOfrecida, leads.NumeroLista, leads.FechaPromotorOriginal, leads.FechaPromotorActual, leads.Comentarios, 
CarrerasInt.Nombre as CarreraInteres,  Campana.Nombre as NombreCampana, MedioDeContacto.Nombre as MedioContacto, CarreraIns.Nombre as CarreraInscrita, PromotorOri.Nombre as NombrePromotorOri, PromotorAct.Nombre as NombrePromotorAct 
from leads
LEFT JOIN Carreras CarrerasInt ON leads.carreraInteresID = CarrerasInt.CarreraID
LEFT JOIN Campana ON leads.CampanaID = Campana.CampanaID
LEFT JOIN MedioDeContacto ON leads.MedioDeContactoID = MedioDeContacto.MedioID
LEFT JOIN Carreras CarreraIns ON leads.CarreraInscripcion = CarreraIns.CarreraID
LEFT JOIN Promotor PromotorOri ON leads.promotorOriginal = PromotorOri.PromotorID
LEFT JOIN Promotor PromotorAct ON leads.promotorActual = PromotorAct.PromotorID;

select leads.NombreCompleto, contacto.FechaContacto, contacto.Comentario from Contacto left join leads on Contacto.LeadID = leads.LeadID where Contacto.LeadID = 2;

select * from reasignaciones;
use apis4;
SELECT Promotor.PromotorID, Promotor.Nombre FROM Promotor LEFT JOIN leads ON Promotor.PromotorID = leads.promotorActual AND leads.LeadID = 3 WHERE promotor.Estado = 1 and leads.promotorActual IS NULL;

select * from promotor where estado = 1;

select NombrePromotor, FechaReasignacion from Reasignaciones where LeadID = 1;

SELECT leads.LeadID, leads.NombreCompleto, leads.telefono,leads.telefono2, leads.CorreoElectronico, leads.CorreoElectronico2, leads.FechaPrimerContacto,leads.FechaNac, leads.EscuelaProcedencia, leads.NombrePais, leads.NombreEstado, leads.NombreCiudad, leads.PSeguimiento, leads.Grado,leads.EstatusInsc,leads.SemestreIngreso, leads.Ciclo, leads.AsetNameForm, leads.IsOrganic, leads.TipoReferido, leads.NombreReferido, leads.DondeObtDato, leads.FechaInscripcion, leads.BecaOfrecida, leads.NumeroLista, leads.FechaPromotorOriginal, leads.FechaPromotorActual, leads.Comentarios, leads.Programa, leads.FechaPromotorOriginal, CarrerasInt.Nombre as CarreraInteres,  Campana.Nombre as NombreCampana, MedioDeContacto.Nombre as MedioContacto, CarreraIns.Nombre as CarreraInscrita, PromotorOri.Nombre as NombrePromotorOri, PromotorAct.Nombre as NombrePromotorAct from leads LEFT JOIN Carreras CarrerasInt ON leads.carreraInteresID = CarrerasInt.CarreraID LEFT JOIN Campana ON leads.CampanaID = Campana.CampanaID LEFT JOIN MedioDeContacto ON leads.MedioDeContactoID = MedioDeContacto.MedioID LEFT JOIN Carreras CarreraIns ON leads.CarreraInscripcion = CarreraIns.CarreraID LEFT JOIN Promotor PromotorOri ON leads.promotorOriginal = PromotorOri.PromotorID LEFT JOIN Promotor PromotorAct ON leads.promotorActual = PromotorAct.PromotorID where datediff(curdate(), leads.FechaPromotorActual) >=3 AND FechaPrimerContacto IS NULL and promotorOriginal IS NOT NULL;

	DELIMITER //

-- Insert de las carreras

SELECT
        leads.LeadID,
        leads.NombreCompleto,
        leads.telefono,
        leads.telefono2,
        leads.CorreoElectronico,
        leads.CorreoElectronico2,
        leads.FechaPrimerContacto,
        leads.promotorActual,
        PromotorAct.Nombre as NombrePromotorAct
      FROM
        leads
      LEFT JOIN
        Promotor PromotorAct ON leads.promotorActual = PromotorAct.PromotorID
      LEFT JOIN
        users ON PromotorAct.PromotorID = users.promotorId
      WHERE
        users.userName = 'Bryan Murga';

