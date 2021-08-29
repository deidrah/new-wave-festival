const Concert = require("../models/concert.model");
const Seat = require("../models/seats.model");

exports.getAllconcerts = async (req, res) => {
  try {
    res.json(await Concert.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomConcert = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concert.findOne().skip(rand);
    if (!concert) res.status(404).json({ message: "Not found" });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.getConcertById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: "Not found" });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.getTicketsForTheConcert = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    const concertDay = concert.day;
    const soldSeats = await Seat.find({ day: concert.day });
    const freeTickets = 50 - soldSeats.length;
    if (!concert) res.status(404).json({ message: "Not found" });
    else res.json({ concert, freeTickets });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.getConcertByPerformer = async (req, res) => {
  try {
    const concerts = await Concert.find({
      performer: req.params.performer,
    });

    if (!concerts) res.status(404).json({ message: "Not found" });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.getConcertByGenre = async (req, res) => {
  try {
    const concerts = await Concert.find({ genre: req.params.genre });

    if (!concerts) res.status(404).json({ message: "Not found" });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertByPrice = async (req, res) => {
  try {
    const concerts = await Concert.find({
      price: { $gte: req.params.price_min, $lte: req.params.price_max },
    });

    if (!concerts) res.status(404).json({ message: "Not found" });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertByDay = async (req, res) => {
  try {
    const concerts = await Concert.find({ day: req.params.day });

    if (!concerts) res.status(404).json({ message: "Not found" });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.postConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putConcertById = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.updateOne(
        { _id: req.params.id },
        {
          $set: {
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image,
          },
        }
      );
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteConcertById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};