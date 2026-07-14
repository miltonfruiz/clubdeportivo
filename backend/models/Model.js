const mongoose = require('mongoose');

const disciplineSchema = new mongoose.Schema({
  name: String,
  description: String,
  history: String
});

const informationSchema = new mongoose.Schema({
  description: String
});

const historySchema = new mongoose.Schema({
  description: String
});

const clubSchema = new mongoose.Schema({
  information: [informationSchema],
  history: [historySchema],
  disciplines: [disciplineSchema]
});

module.exports = mongoose.model('Club', clubSchema);