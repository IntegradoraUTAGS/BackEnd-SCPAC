const express = require('express');
const _ = require('underscore')
const Lesson = require('../models/lesson');
const app = express();



app.get('/lesson', (req, res) => {
    Lesson.find()
    .exec((err, lessons) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(200).json({
            ok: true,
            lessons
        })
    })
})

app.post('/lesson', (req, res) => {
    let body = req.body

    let lesson = new Lesson({
        date: body.date,
        rolls: body.rolls,
        status: body.status
    })

    lesson.save((err, lessonDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(200).json({
            ok: true,
            lessonDB
        })
    })
})

module.exports = app;