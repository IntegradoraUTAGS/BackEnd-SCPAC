const express = require('express');
const _ = require('underscore');

const Group = require('../models/group');
const app = express();

app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;

    Group.findByIdAndUpdate(id, { status: true }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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

app.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['members[]', 'name']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
    console.log(body);
    Group.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, groDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            groDB
        });

    });
});

app.post('/registrar/:id', (req, res) => {
    let body = req.body;
    let id = req.params.id;

    let group = new Group({
        name: body.name,
        creator: id
    });

    group.save((err, groDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            groDB
        });
    });
});

module.exports = app;