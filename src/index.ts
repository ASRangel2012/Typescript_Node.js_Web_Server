import express from "express";
import bodyparser from "body-parser";
import { usersRouter } from "./routes/Users";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { postsRouter } from "./routes/Posts";
import { catRouter } from "./routes/Categories";
import { postCatRouter } from "./routes/PostCategories";
import { commentRouter } from "./routes/Comment";


let app = express();
const PORT = 3000;


app.use(cors({credentials: true, origin: true}));
app.use(bodyparser.json()); //parses and send backs JSON obj
//app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());

//routes 
app.use('/Users', usersRouter);
app.use('/Posts', postsRouter);
app.use('/Categories', catRouter);
app.use('/PostCategory', postCatRouter);
app.use('/Comments', commentRouter);
// handle anything else 



//listening to specified PORT
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}!`);
});


