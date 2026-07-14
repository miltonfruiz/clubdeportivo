const Model = require('../models/Model');

async function getAll(req, res) {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching models' });
  }
}

async function getOne(req, res) {
  try {
    const id = req.params.id;
    const model = await Model.findById(id);
    if (!model) {
      res.status(404).json({ message: 'Model not found' });
    } else {
      res.json(model);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching model' });
  }
}

async function create(req, res) {
  try {
    const model = new Model(req.body);
    await model.save();
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: 'Error creating model' });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const model = await Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!model) {
      res.status(404).json({ message: 'Model not found' });
    } else {
      res.json(model);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating model' });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    await Model.findByIdAndRemove(id);
    res.json({ message: 'Model deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting model' });
  }
}

module.exports = { getAll, getOne, create, update, remove };