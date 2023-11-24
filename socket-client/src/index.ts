import { Request, Response } from 'express';
import json from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import io from 'socket.io-client';
import Product from './models/Product';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const serverUrl = process.env.SERVER_URL || 'http://localhost:8088';

const socket = io(serverUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import('./initDB').then(({ initDB }) => {
  initDB();
});

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.get('*', (req: Request, res: Response) => {
  res.send('Express + typescript for nila socket server');
});

export const syncProducts = async () => {
  try {
    const allProducts: any = await fetch('http://node:1337/api/products').then(res => res.json());
    console.log('allProducts', allProducts);
    for (let product of allProducts) {
      const productExists = await Product.findOne({
        hash: product.hash,
      });
      if (!productExists) {
        const newProduct = new Product(product);
        await newProduct.save();
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  syncProducts();
  socket.on('connect', () => {
    console.log('Connected to server');

    // Send a message to the server
    socket.emit('messageFromClient', 'Hello from client!');
  });

  socket.on('update', data => {
    console.log('product - updated', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});

module.exports = app;
