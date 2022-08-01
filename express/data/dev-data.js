const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../models/tourModel');

dotenv.config({ path: `${__dirname}/../config.env` });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(() => {
  console.warn('DB connection successful!');
});

const importData = async () => {
  try {
    const tours = JSON.parse(fs.readFileSync(path.join(__dirname, './tours.json'), 'utf-8'));
    await Tour.create(tours);
    console.warn('Data import successful!');
  } catch (err) {
    console.warn(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.warn('Data delete successful!');
  } catch (err) {
    console.warn(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
