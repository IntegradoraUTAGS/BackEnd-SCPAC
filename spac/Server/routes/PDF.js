const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();

//PDF
const PDF = require('pdfkit');
const fs = require('fs'); 

var doc = new PDF();

doc.pipe(fs.createWriteStream(__dirname + '/PaseLista.pdf'));

doc.text('PASE DE LISTA',{
    align: 'center'
}); 

var lista = 'ALUMNO: Cesar Medina PRESENTE'
doc.text(lista,{
    columns: 3
});

doc.end();

console.log('Archivo creado');

app.post('/PDF', (req, res) => {
    let body = req.body;

    let lista = new Usuario({
        lista: body.lista
    });

    lista.save((err, listDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            listDB
        });
    });
});

//Termina PDF   

module.exports = app;