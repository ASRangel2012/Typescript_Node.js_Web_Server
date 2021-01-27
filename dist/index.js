"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Users_1 = require("./routes/Users");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const Posts_1 = require("./routes/Posts");
const Categories_1 = require("./routes/Categories");
const PostCategories_1 = require("./routes/PostCategories");
const Comment_1 = require("./routes/Comment");
let app = express_1.default();
const PORT = 3000;
app.use(cors_1.default({ credentials: true, origin: true }));
app.use(body_parser_1.default.json()); //parses and send backs JSON obj
//app.use(bodyparser.urlencoded({extended:true}));
app.use(cookie_parser_1.default());
//routes 
app.use('/Users', Users_1.usersRouter);
app.use('/Posts', Posts_1.postsRouter);
app.use('/Categories', Categories_1.catRouter);
app.use('/PostCategory', PostCategories_1.postCatRouter);
app.use('/Comments', Comment_1.commentRouter);
// handle anything else 
app.all('*', function (req, res) {
    res.redirect("/Posts");
});
//listening to specified PORT
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}!`);
});
//# sourceMappingURL=index.js.map