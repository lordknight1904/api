import config from './config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// ROUTES FOR OUR API

import bear from './routes/bear.routes';
import role from './routes/role.routes';
import admin from './routes/admin.routes';
app.use('/api', [bear, role, admin]);

mongoose.connect(config.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});
// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Api start at ' + config.port);
