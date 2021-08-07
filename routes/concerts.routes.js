const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const message = { message: 'OK' };

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.filter(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
    const newItem = {
        id: uuidv4(),
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    };
    db.concerts.push(newItem);
    res.json(message);
});

router.route('/concerts/:id').put((req, res) => {
    const updatedItem = db.concerts.find(item => item.id == req.params.id);
    const index = db.concerts.indexOf(updatedItem);
    const updateContent = ({
        id: req.params.id,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    });
    db.concerts[index] = updateContent;
    res.json(message);
});

router.route('/concerts/:id').delete((req, res) => {
    const deletedItem = db.concerts.find(item => item.id == req.params.id);
    const index = db.concerts.indexOf(deletedItem);
    db.concerts.splice(index, 1);
    res.json(message);
});

module.exports = router;