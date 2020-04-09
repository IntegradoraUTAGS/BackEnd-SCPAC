const express = require('express');
const bcrypt = require('bcrypt');
const Lista = require('../models/lista');
const app = express();
const jwt = require('jsonwebtoken');
//const {verificaToken} = require('../middlewares/autenticacion');

app.post('/lista', (req, res) => {
    let body = req.body;

    let lista = new Lista({
        
        nombreLista: body.nombreLista,
          
    });

    lista.save((err, listaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        let token = jwt.sign({
            lista: listaDB
        }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});

        return res.status(200).json({
            ok: true,
            listaDB,
            token: token
        });
    });
});

// app.post('/unirse', (req, res) => {
//     let body = req.body;

//     let lista = new Lista({
        
//         token: body.token, 
        
//     });

//     lista.save((err, listaDB) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }
//         return res.status(200).json({
//             ok: true,
//             listaDB,
//             msg: 'Bienvenido a la lista'+ lista, 
//         });
//     });
// });

app.get('/lista', (req, res) =>{
    Lista.find({ Status: true})
    .exec((err, lista) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                count: lista.length,
                lista 
            });
        }
    });
});

module.exports = app;