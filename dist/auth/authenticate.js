"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(body_parser_1.default.json());
const port = 4000;
//listening here to log in users 
app.listen(4000, () => {
    console.log(`Authentication service started on port: ${port} `);
});
//# sourceMappingURL=authenticate.js.map