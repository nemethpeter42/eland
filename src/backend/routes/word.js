const express = require('express')
const app = express.Router()
const WordService = require('../services/word.service');

app.get('/:id', (req, res) => res.send(WordService.getInstance().get(req.params.id)))

module.exports = app