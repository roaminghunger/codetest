import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PW = process.env.DB_PASSWORD;

const Connection = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const MONGODB_URI = `mongodb+srv://${USERNAME}:${PW}@todo-app.wxi7uk0.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(MONGODB_URI, connectionParams);
    console.log('Connected to database.');
  } catch (error) {
    console.log('Could not connect to database.', error);
  }
};

export default Connection;
