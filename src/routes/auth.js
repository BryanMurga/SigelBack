const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Debes proporcionar un nombre de usuario y contraseña');
    }

    // Consulta la base de datos para encontrar el usuario por su nombre de usuario
    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }

        const user = results[0];

        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
        if (password !== user.password) {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }

        res.json({ message: 'Inicio de sesión exitoso',  userName: user.userName, role: user.role });
    });
});


router.post('/register', (req, res) => {
    const { userName, email, password, role} = req.body;

    if (!email || !password) {
        return res.status(400).send('Debes proporcionar un nombre de usuario y contraseña');
    }

    // Verifica si el nombre de usuario ya existe en la base de datos
    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length > 0) {
            return res.status(401).json({ message: 'El nombre de usuario se encuentra en uso' });
        }

        // Crea un nuevo usuario en la base de datos sin encriptar la contraseña
        pool.query('INSERT INTO users SET ?', { userName: userName, email: email, password: password, role: role}, (err, results) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                return res.status(500).json({ message: 'Error en el servidor' });
            }

            res.json({ message: 'Usuario registrado exitosamente' });
        });
    });
});


module.exports = router;