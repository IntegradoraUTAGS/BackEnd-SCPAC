const express = require('express');
const _ = require('underscore');

const Group = require('../models/group');
const app = express();


app.get('/get/:desde/:limite', (req, res) => {
    let desde = req.params.desde || 0;
    desde = Number(desde); //forzar que el dato siempre sea numerico
    let limite = req.params.limite || 1;
    limite = Number(limite);

    Group.find({ status: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .skip(desde)
        .limit(limite)
        .exec((err, groups) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.group);
            return res.status(200).json({
                ok: true,
                count: groups.length,
                groups
            });
        });
});

app.delete('/delete/:id', (req, res) => {
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

app.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
    let nombre = obj.name;

    let body = _.pick(obj, ['name', 'members']); //FILTRAR del obj, el pick selecciona los campos que interesan del obj 
    // console.log(body);
    //  console.log(nombre);
    // console.log(obj);
    //  console.log(obj["name"]);
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
        creator: id,
        lessons: body.lessons,
        members: body.members

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