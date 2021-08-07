const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Adam Nowak', text: 'Lorem ipsum.' },
  { id: 4, author: 'Jan Szpan', text: 'Dolor sit.' },
  { id: 5, author: 'Iza Pąk', text: 'Lorem sit.' },
  { id: 6, author: 'Jacek Bąk', text: 'Dolor ipsum.' },
];

const message = { message: 'OK' };

app.get('/testimonials', (req, res) => {
    res.json(db);
});

 app.get('/testimonials/random', (req, res) => {
    const randomItem = (max) => {
      return Math.floor(Math.random() * (max));
    };
    res.json(db[randomItem(db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
    const newItem = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
    };
    db.push(newItem);
    res.json(message);
});

app.put('/testimonials/:id', (req, res) => {
    const updatedItem = db.find(item => item.id == req.params.id);
    const index = db.indexOf(updatedItem);
    const updateContent = ({
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
    });
    db[index] = updateContent;
    res.json(message);
});

app.delete('/testimonials/:id', (req, res) => {
    const deletedItem = db.find(item => item.id == req.params.id);
    const index = db.indexOf(deletedItem);
    db.splice(index, 1);
    res.json(message);
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});