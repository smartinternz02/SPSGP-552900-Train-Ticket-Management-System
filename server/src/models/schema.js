const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const trainSchema = new mongoose.Schema({
    trainName: { type: String, required: true },
    trainNumber: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    price: { type: Number, required: true },
    seatsAvailable: { type: Number, required: true }
});
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  trainName: {type: String, required: true},
  trainNumber: {type: String},
  StartStation: {type: String},
  destinationStation: {type: String},
  email: {type: String},
  mobile: {type: String},
  seats: {type: String},
  passengers: [{
      name: { type: String },
      age: { type: Number }
    }],
  totalPrice: { type: Number },
  bookingDate: { type: Date, default: Date.now },
  journeyDate: { type: Date },
  coachClass: { type: String},
  bookingStatus: {type: String, default: "confirmed"}
});
const models = {
    Users: mongoose.model('Users', userSchema),
    Train: mongoose.model('Train', trainSchema),
    Booking: mongoose.model('Booking', bookingSchema)
}
module.exports = models;