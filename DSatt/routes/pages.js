const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('form');
})

router.get('/form', (req, res) => {
    res.render('form');
})

router.get('/reg_confirm', (req, res) => {
    res.render('reg_confirm');
})

module.exports = router;

