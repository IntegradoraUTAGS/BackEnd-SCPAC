const express = require('express');
const _ = require('underscore')
const Lesson = require('../models/lesson');
const app = express();



app.get('/lesson', (req, res) => {
    Lesson.find().populate('rolls')
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

app.put('/lesson/:id', (req, res) => {
    let id = req.params.id

    let body = _.pick(req.body, ['rolls'])

    Lesson.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, lessDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            lessDB
        });

    });
});

app.delete('/lesson/:id', (req, res) => {
    let id = req.params.id

    Lesson.findByIdAndUpdate(id, {status: false}, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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
})

module.exports = app;