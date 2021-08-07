const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const message = { message: 'OK' };

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const randomItem = (max) => {
      return Math.floor(Math.random() * (max));
    };
    res.json(db.testimonials[randomItem(db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.filter(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
    const newItem = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
    };
    db.testimonials.push(newItem);
    res.json(message);
});

router.route('/testimonials/:id').put((req, res) => {
    const updatedItem = db.testimonials.find(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(updatedItem);
    const updateContent = ({
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
    });
    db.testimonials[index] = updateContent;
    res.json(message);
});

router.route('/testimonials/:id').delete((req, res) => {
    const deletedItem = db.testimonials.find(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(deletedItem);
    db.testimonials.splice(index, 1);
    res.json(message);
});

module.exports = router;