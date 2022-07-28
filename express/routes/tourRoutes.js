const express = require('express');
const tourController = require('../controller/tourController');

const tourRouter = express.Router();

tourRouter.param('id', tourController.checkId);

tourRouter.route('/').get(tourController.getAllTours).post(tourController.createTourById);
tourRouter
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);

module.exports = tourRouter;
