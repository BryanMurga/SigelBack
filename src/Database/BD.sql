DROP DATABASE APIS2;
CREATE DATABASE APIS2;
USE APIS2;

-- Crear la tabla "Promotor"
CREATE TABLE Promotor (
    PromotorID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Correo VARCHAR(255),
    Passw VARCHAR(255),
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
    FechaNac date,
    EscuelaProcedencia VARCHAR(255),
	NombrePais VARCHAR(255),
    NombreEstado VARCHAR(255),
    NombreCiudad VARCHAR(255),
    PSeguimiento ENUM('AU-ALUMNO UNINTER','INSC-INSCRIPCIÓIN','NC-NO CONTESTA', 'NI-NO INTERESA',
                      'P-PROSPECTO','PI-INSCRIPCIÓN', 'PS-SEGUIMIENTO','SC-SIN CONTACTO','PU-PERSONAL UNINTER','DU-DUPLICADO','DI-DATO NO VALIDO','BA-BAJA ALUMNO', 'VACIO'),
    CarreraInteresID INT,
    Grado ENUM('SECUNDARIA','BACHILLERATO','PREPA-A','LIC/ING','ESPECIALIDAD','DIPLOMADO','MAESTRIA','DOCTORADO','NO ESPECIFICA'),
    Programa ENUM('Psicología (LPS)','Derecho (LED)','Pedagogía (LPE)','Ciencias Políticas y Gestión Pública (LCP)',
                  'Relaciones Internacionales (LRI)','Relaciones Internacionales y Economía (RIEC)','Relaciones Internacionales y Ciencias Políticas (RICP)',
                  'Idiomas (LID)','Comunicación (LCO)','Comunicación Y Relaciones Públicas (CORP)','Civil (ICI)','Mecatrónica (IME)','Mecánica Industrial (IMI)',
                  'Industrial y de Sistemas de Calidad (IISCA)','Sistemas Computacionales (ISC)','Ambiental (IAM)','Arquitectura(ARQ)','Comercio Exterior (LCE)',
                  'Economía y Finanzas (LEF)','Mercadotecnia (LEM)','Mercadotecnia y Publicidad (LEMP)','Psicología Organizacional (LPO)','Administración de Empresas Turísticas (LAET)',
                  'Administración de Empresas (LAE)','Administración de Negocios Internacionales (LANI)','Administración Pública (LAP)','Administración y Mercadotecnia (LAM)',
                  'Diseño de Modas y Tendencias Internacionales (LDM)','Diseño Industrial (LDI)','Diseño Gráfico (LDG)','Animación y Diseño Digital (LADD)',
                  'Licenciatura Ejecutiva en Gestión Empresarial(LEGE)','Licenciatura Ejecutiva en Mercadotecnia(LEMK)','Licenciatura Ejecutiva en Administración de Negocios Internacionales(LEANI)',
                  'Licenciatura Ejecutiva en Administración y Mercadotecnia (LEAM)','Licenciatura en Ejecutiva Mercadotecnia y Publicidad (LEMKP)','Licenciatura en Ejecutiva Comercio Exterior (LECE)', 'OTRO'),
    EstatusInsc ENUM('INSO','REZA', 'INSC', 'BAJA', 'ARCHIVAR'),
    SemestreIngreso ENUM('1 Semestre','2 Semestre','3 Semestre','4 Semestre','5 Semestre','6 Semestre','7 Semestre', '8 Semestre',
    'Maestria','Doctorado','Licenciatura','Diplomados'),
    Ciclo VARCHAR(10),
    CampanaID INT,
    IsOrganic ENUM('PAUTA', 'ORGÁNICO', '') NOT NULL DEFAULT '',
    MedioDeContactoID INT,
    -- referido
    TipoReferido ENUM('ESTUDIANTE','FAMILIAR DE ALGÚN ESTUDIANTE', 'PERSONAL UNINTER', 'NINGUNO'),
    NombreReferido VARCHAR(100),
    DondeObtDato ENUM('B_AFC','B_EMPRESAS','B_ESTRATEGIA VACACIONES EQUI','B_PERSONAL','B_POSGRADOS','BARRIDO BASE','BARRIDO EGRESADOS',
                      'BASE EGRESADOS','BASE FAMILIAR','CLIENGO','ESTRATEGIA EQUIPO MORADO','EXPO EDUCATIVA','REDES SOCIALES META FACEBOOK',
                      'REDES SOCIALES META INSTAGRAM', 'LANDING','LANDING CARRERAS','LANDING FORMULARIO','LANDING TOT','LLAMADA UNINTER','OPEN SCHOOL ESPECIAL POR CONVENIO CON EMPRESA',
                      'VISITA UNINTER'),
    FechaInscripcion DATE,
    BecaOfrecida DECIMAL(10, 2),
    NumeroLista INT,
    PromotorOriginal INT,
    NombrePromOrigi VARCHAR (255),
    FechaPromotorOriginal DATE,
    PromotorActual INT,
    NombrePromAct VARCHAR (255),
    FechaPromotorActual DATE,
    Comentarios TEXT,
    Contacto INT
    );
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


CREATE TABLE ContactoAlumno(
	ContactoAlumnoID INT PRIMARY KEY auto_increment NOT NULL,
    FechaContacto date,
    Comentario text
);

CREATE TABLE Alumnos (
    AlumnoID INT AUTO_INCREMENT PRIMARY KEY,
    LeadID INT,
    Nombre VARCHAR(50),
    Telefono varchar(20),
    EscuelaProcedencia varchar(50),
    PromotorID INT(11),
    NoRecibo VARCHAR(50),
	Matricula VARCHAR(50),
    CarreraInscripcion ENUM('Psicología (LPS)','Derecho (LED)','Pedagogía (LPE)','Ciencias Políticas y Gestión Pública (LCP)',
                  'Relaciones Internacionales (LRI)','Relaciones Internacionales y Economía (RIEC)','Relaciones Internacionales y Ciencias Políticas (RICP)',
                  'Idiomas (LID)','Comunicación (LCO)','Comunicación Y Relaciones Públicas (CORP)','Civil (ICI)','Mecatrónica (IME)','Mecánica Industrial (IMI)',
                  'Industrial y de Sistemas de Calidad (IISCA)','Sistemas Computacionales (ISC)','Ambiental (IAM)','Arquitectura(ARQ)','Comercio Exterior (LCE)',
                  'Economía y Finanzas (LEF)','Mercadotecnia (LEM)','Mercadotecnia y Publicidad (LEMP)','Psicología Organizacional (LPO)','Administración de Empresas Turísticas (LAET)',
                  'Administración de Empresas (LAE)','Administración de Negocios Internacionales (LANI)','Administración Pública (LAP)','Administración y Mercadotecnia (LAM)',
                  'Diseño de Modas y Tendencias Internacionales (LDM)','Diseño Industrial (LDI)','Diseño Gráfico (LDG)','Animación y Diseño Digital (LADD)',
                  'Licenciatura Ejecutiva en Gestión Empresarial(LEGE)','Licenciatura Ejecutiva en Mercadotecnia(LEMK)','Licenciatura Ejecutiva en Administración de Negocios Internacionales(LEANI)',
                  'Licenciatura Ejecutiva en Administración y Mercadotecnia (LEAM)','Licenciatura en Ejecutiva Mercadotecnia y Publicidad (LEMKP)','Licenciatura en Ejecutiva Comercio Exterior (LECE)', 'OTRO'),
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
    FechaBaja date,
    CorreoInstitucional varchar (50),
    FOREIGN KEY (LeadID) REFERENCES Leads(LeadID),
    FOREIGN KEY (ContactoID) REFERENCES ContactoAlumno(ContactoAlumnoID),
    FOREIGN KEY (PromotorID) REFERENCES Promotor(PromotorID)
);

CREATE TABLE users(
	idUser Int primary key auto_increment not null,
    userName varchar(30) not null,
    password varchar(30) not null,
    role enum('admin','promotor','coordinador')
);

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


-- Consultas a tablas

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
	mes int,
    anio int,
    cantidad_registros int
);

CREATE TABLE leadxmes_promotor (
	mes int,
    anio int,
    nombrePromotor VARCHAR(255),
    cantidad_registros int
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
CREATE TRIGGER actualizar_conteo_leadoxpromotor
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
     INSERT INTO alumnos (LeadID,Nombre,Telefono,EscuelaProcedencia,NombrePromotor,Estatus)
    VALUES (NEW.LeadID, NEW.NombreCompleto , NEW.Telefono, NEW.EscuelaProcedencia, NEW.NombrePromAct, NEW.EstatusInsc)
    ON DUPLICATE KEY UPDATE LeadID = NEW.LeadID, Nombre = NEW.NombreCompleto, Telefono = NEW.Telefono, EscuelaProcedencia = NEW.EscuelaProcedencia, NombrePromotor = NEW.NombrePromAct, Estatus = NEW.EstatusInsc;
    END IF;
END;
//
DELIMITER ;
-- DROP trigger insert_alumnos;
UPDATE leads SET EstatusInsc = 'INSC' WHERE LeadID= 2;

//
DELIMITER ;