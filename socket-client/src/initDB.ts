import mongoose from 'mongoose';

export const initDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://mongo_db:27017', {
      dbName: process.env.DB_NAME || 'sample-db',
      // user: process.env.DB_USER,
      // pass: process.env.DB_PASS,
    })
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  //   process.on('SIGINT', () => {
  //     mongoose.connection.close(() => {
  //       console.log('Mongoose connection is disconnected due to app termination...');
  //       process.exit(0);
  //     });
  //   });
};
