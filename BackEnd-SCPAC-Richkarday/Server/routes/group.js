const express = require('express');
const _ = require('underscore');
const fs = require('fs');
const PDFDocument = require('pdfkit') //Hacemos requiere de paquete pdfkit
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
    var body = req.body;
    var id = req.params.id;

    var group = new Group({
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


    var pdf = new PDFDocument({ //Creamos un nuevo documento pdf
        layout: 'landscape',
        size: [300, 300],
        margin: 5,
        info: {
            Title: 'Lista de alumnos',
            Author: 'Universidad Tecnológica de Aguascalientes'
        }
    });

    pdf.moveDown()
        .fillColor('black')
        .fontSize(10)
        .text('CONTENIDO', {
            align: 'center',
            indent: 2,
            height: 2,
            ellipsis: true
    });

    pdf.moveDown()         //Mandamos a llamar cada uno de los campos de la colección para que cuando se haga el post, esos datos se guarden en el pdf
        .fillColor('black')
        .fontSize(10)
        .text('GROUP: '+ group.name, {
            align: 'left',
            indent: 2,
            height: 2,
            ellipsis: true
        })
        .text('CREATOR: '+ group.creator, {
            align: 'left',
            indent: 2,
            height: 2,
            ellipsis: true
        })
        .text('LESSONS: '+ group.lessons, {
            align: 'left',
            indent: 2,
            height: 2,
            ellipsis: true
        })
        .text('MEMBERS: '+ group.members,  {
            align: 'left',
            indent: 2,
            height: 2,
            ellipsis: true
        })

    
    pdf.pipe(fs.createWriteStream(group.name+""+'.pdf')).on('finish', function () {
        console.log('Archivo creado satisfactoriamente ....'); //Creamos el archivo mandano a llamar el nombre de la lista y con la extención del archivo
     });
 
     pdf.end();


   
});

module.exports = app;