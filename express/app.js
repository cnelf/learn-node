const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/tours.json')));

// Get All Tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

// Get Tour By Id
app.get('/api/v1/tour/:id', (req, res) => {
  const tour = tours.find((item) => item.id === Number(req.params.id));
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Not found tour with this id'
    });
    return;
  }
  res.status(200).json({
    status: 'success',
    tour
  });
});

// Create New Tour
app.post('/api/v1/tours', (req, res) => {
  const lastTour = tours[tours.length - 1];
  const newTour = Object.assign({ id: lastTour.id + 1 }, req.body);
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
});

const port = 3000;
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
