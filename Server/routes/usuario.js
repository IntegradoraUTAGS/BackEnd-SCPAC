const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();

app.delete('/admin/grupo/delete/:id', (req, res) => {
    let id = req.params.id;

    Group.findByIdAndUpdate(id, { status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });

});



app.post('/registrar', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        name: body.name,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        status: body.status,
    });

    usuario.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

module.exports = app;