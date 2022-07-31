const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {};

exports.getTourById = (req, res) => {};

exports.createTourById = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data send!'
    });
  }
};

exports.updateTourById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

exports.deleteTourById = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
