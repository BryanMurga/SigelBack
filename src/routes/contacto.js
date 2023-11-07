const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Listar todos los contactos
router.get('/', async (req, res) => {
  try {
    const contactos = await pool.query('SELECT * FROM Contacto');
    res.json({
      status: 200,
      message: 'Listado de contactos',
      contactos: contactos,
    });
  } catch (error) {
    console.error('Error al obtener la lista de contactos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un contacto por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const contacto = await pool.query('SELECT * FROM Contacto WHERE ContactoID = ?', [id]);
    if (contacto.length === 0) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    res.json({
      status: 200,
      message: 'Se ha obtenido el contacto correctamente',
      contacto: contacto[0],
    });
  } catch (error) {
    console.error('Error al obtener el contacto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear un nuevo contacto
router.post('/create', async (req, res) => {
  const { FechaContacto, Comentario } = req.body;

  if (!FechaContacto || !Comentario) {
    return res.status(400).json({ error: 'Los campos FechaContacto y Comentario son obligatorios' });
  }

  const nuevoContacto = { FechaContacto, Comentario };

  try {
    const result = await pool.query('INSERT INTO Contacto SET ?', [nuevoContacto]);
    res.json({ status: 200, message: 'Nuevo contacto creado exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error('Error al crear el contacto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar un contacto por su ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { FechaContacto, Comentario } = req.body;

  if (!FechaContacto || !Comentario) {
    return res.status(400).json({ error: 'Los campos FechaContacto y Comentario son obligatorios' });
  }

  const contactoActualizado = { FechaContacto, Comentario };

  try {
    await pool.query('UPDATE Contacto SET ? WHERE ContactoID = ?', [contactoActualizado, id]);
    res.json({ status: 200, message: 'Contacto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el contacto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un contacto por su ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM Contacto WHERE ContactoID = ?', [id]);
    res.json({ status: 200, message: 'Contacto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el contacto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
