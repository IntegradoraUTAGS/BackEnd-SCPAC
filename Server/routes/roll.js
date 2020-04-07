const express = require('express');
const _ = require('underscore')
const Roll = require('../models/roll');
const app = express();



app.get('/roll', (req, res) => {
    Roll.find().populate('user') //El populate es para mostrar los datos del campo user
    .exec((err, rolls) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(200).json({
            ok: true,
            rolls
        })
    })
})

app.post('/roll', (req, res) => {
    let body = req.body

    let roll = new Roll ({
        user: body.user,
        date: body.date
    })

    roll.save((err, rollDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(200).json({
            ok: true,
            rollDB
        })
    })
})

app.delete('/roll', (req, res) => {
    let _id = req.body._id

    Roll.deleteOne({_id} , (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    _id
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });    
    });
});

module.exports = app;