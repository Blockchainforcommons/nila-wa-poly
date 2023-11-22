import mongoose from 'mongoose';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { socketServer } from './services/socket';
import { WareHouseContract } from './contracts/web3';
dotenv.config();

const app = express();
const port = process.env.PORT || 8088;

app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('Express Server + typescript');
});
app.use(require('./routes'));

// catch 404 and forward error response
app.get('*', function (req: Request, res: Response) {
  res.status(404).json({
    status: false,
    message: 'Invalid route',
  });
});

mongoose
  .connect(
    `${process.env.MONGO_URI}/${process.env.MONGO_DB}?retryWrites=true&w=majority` || 'mongodb://localhost:27017/nila',
  )
  .then(() => {
    console.log('Connected to database');
    const server = app.listen(port, async () => {
      const contract = await WareHouseContract.setup();
      if (contract) {
        console.log('Contract is ready');
      } else {
        console.log('Contract is not ready');
      }
      const depth = await WareHouseContract.getDepth();
      console.log(`Depth is ${depth}`);
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    socketServer(server);
  })
  .catch(err => {
    console.error(err);
    throw new Error('DB connection failed');
  });

module.exports = app;
