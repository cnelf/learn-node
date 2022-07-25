const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, './data/tours.json')));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTourById = (req, res) => {
  const tour = tours.find((item) => item.id === Number(req.params.id));
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id'
    });
    return;
  }
  res.status(200).json({
    status: 'success',
    tour
  });
};

const createTourById = (req, res) => {
  const lastTour = tours[tours.length - 1];
  const newTour = Object.assign({ id: lastTour.id + 1 }, req.body);
  tours.push(newTour);
  fs.writeFile(path.join(__dirname, './data/tours.json'), JSON.stringify(tours), (err) => {
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

const updateTourById = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

const deleteTourById = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

app.route('/api/v1/tours').get(getAllTours).post(createTourById);
app.route('/api/v1/tours/:id').get(getTourById).patch(updateTourById).delete(deleteTourById);

const port = 3000;
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
