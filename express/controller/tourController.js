const fs = require('fs');
const path = require('path');

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/tours.json')));

exports.checkId = (req, res, next, val) => {
  const tour = tours.find((item) => item.id === Number(val));
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id'
    });
  }
  next();
};

exports.checkCreateBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing required parameter "name" and "price" in body'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTourById = (req, res) => {
  const tour = tours.find((item) => item.id === Number(req.params.id));
  res.status(200).json({
    status: 'success',
    tour
  });
};

exports.createTourById = (req, res) => {
  const lastTour = tours[tours.length - 1];
  const newTour = { id: lastTour.id + 1, ...req.body };

  tours.push(newTour);

  fs.writeFile(path.join(__dirname, '../data/tours.json'), JSON.stringify(tours), (err) => {
    if (err) {
      return console.log(err);
    }
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
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
