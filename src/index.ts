import express from "express";
import mongoose from "mongoose"; //middleware to connect to mongoDB
import bodyparser from "body-parser";
import { User, userArray } from "./models/userObj";
import { usersRouter } from "./routes/Users";
import cookieParser from 'cookie-parser';


const app = express();
const port = 3000;
app.use(bodyparser.json()); //parses and send backs JSON obj
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());

//routes 
app.use('/', usersRouter);

//listening to specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

/*
Database stuff 

const uriconnection'String =
  "mongodb+srv://asrangel2012:ASR2269439s!@cluster0.gpct4.mongodb.net/mongoDB_backend_API?retryWrites=true&w=majority";
const db = mongoose.connection;
mongoose.connect(uriConnectiongString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, () => {
  console.log('connected to the database!')
});

db.on("error", (err: any) => {
  console.error("connection error", err);
});
*/
