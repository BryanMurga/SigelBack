const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.get('/', async(req, res) =>{
    let listPromotores = await pool.query('SELECT * FROM promotor');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listPromotores : listPromotores
    });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;      
    let promotor = await pool.query('SELECT * FROM promotor WHERE PromotorID = ?',[id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        promotor : promotor
    });
});

router.post('/create', async(req, res) =>{
    const {Nombre} = req.body;
    const {Correo} = req.body;
    const {Passw} = req.body;

    const promotor = {
        Nombre, Correo, Passw
    }

    await pool.query('INSERT INTO promotor set ?', [promotor]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        promotor : promotor
    });

});

router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const {Nombre} = req.body;
    const {Correo} = req.body;
    const {Passw} = req.body

    const promotor = { Nombre, Correo, Passw};

    pool.query('UPDATE promotor SET ? WHERE  PromotorID = ?', [promotor, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        promotor: promotor
    });
});

/*
router.post('/delete/:id', async(req, res) =>{
    const { id } = req.params;

   await pool.query('DELETE FROM categoria WHERE id = ?', [id]);
   res.json({
       status: 200,
       message: "Se ha eliminado corectamente"
   });
});
*/

module.exports = router;