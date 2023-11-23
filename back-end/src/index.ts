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
      let path = [
        '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        '0x2dba5dbc339e7316aea2683faf839c1b7b1ee2313db792112588118df066aa35',
        '0x5310a330e8f970388503c73349d80b45cd764db615f1bced2801dcd4524a2ff4',
      ];
      // await WareHouseContract.verifyData('0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', path, 0);
      await WareHouseContract.addLeaf('0x5014830c62b429d1354d6a650e99d3c26f20b585b3e3469d0959acf85a66d074', path, 0);
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
