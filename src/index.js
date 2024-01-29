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


// const URL = process.env.CONNECTION_STRING_MDB;
mongoose.connect(URL, {
  useNewUrlParser: true,
  // useUnifiedTopology:true
})
  .then(() => console.log("MongoDb is connected"))
  .catch(err => console.log(err))

app.use('/', route);
const PORT = 4000;
app.listen(PORT || 4000, function () {
    console.log('Express app running on port ' + (PORT||4000));
});
