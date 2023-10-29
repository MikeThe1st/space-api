"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const mainRouter = require('../routes/main.ts');
// const logger = require('../routes/logger.ts')
// import { logger } from '../routes/logger.ts';
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use('/api', mainRouter);
// app.get('/', (req, res) => {
//   res.send("worked")
// })
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        yield mongoose_1.default.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
            console.log('Connected to MongoDB');
        })
            .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
        app.listen(port, () => console.log(`Server Port: ${port}`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
//# sourceMappingURL=index.js.map