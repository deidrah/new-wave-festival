const express = require('express');
const cors = require('cors');
const socket = require("socket.io");

const path = require('path');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);
app.use('/api/', testimonialsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});