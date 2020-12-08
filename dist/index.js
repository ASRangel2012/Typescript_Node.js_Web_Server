"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Users_1 = require("./routes/Users");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express_1.default();
const port = 3000;
app.use(body_parser_1.default.json()); //parses and send backs JSON obj
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
//routes 
app.use('/', Users_1.usersRouter);
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
//# sourceMappingURL=index.js.map