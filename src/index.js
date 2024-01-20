import "dotenv/config";
import express from 'express';
import route from './routes/publicRoute.js';
const app = express();
import cors from 'cors';
import mongoose from "mongoose";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }));

mongoose.connect(process.env.CONNECTION_STRING_MDB, {
  useNewUrlParser: true
})
  .then(() => console.log("MongoDb is connected"))
  .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT||4000));
});