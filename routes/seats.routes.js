const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const message = { message: 'OK' };

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.filter(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const newItem = {
        id: uuidv4(),
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    };
    db.seats.push(newItem);
    res.json(message);
});

router.route('/seats/:id').put((req, res) => {
    const updatedItem = db.seats.find(item => item.id == req.params.id);
    const index = db.seats.indexOf(updatedItem);
    const updateContent = ({
        id: req.params.id,
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    });
    db.seats[index] = updateContent;
    res.json(message);
});

router.route('/seats/:id').delete((req, res) => {
    const deletedItem = db.seats.find(item => item.id == req.params.id);
    const index = db.seats.indexOf(deletedItem);
    db.seats.splice(index, 1);
    res.json(message);
});

module.exports = router;