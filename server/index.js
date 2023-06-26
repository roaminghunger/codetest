import express from 'express';
import Connection from './database/db.js';
import cors from 'cors';

const app = express();

Connection();

app.use(cors());
app.use(express.json());


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
