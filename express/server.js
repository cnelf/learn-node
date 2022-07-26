const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(() => console.warn('DB connection successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.warn(`App listening on port ${port}`);
});
