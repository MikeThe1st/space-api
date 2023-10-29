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
exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get user input from the request body
        const { username, email, password } = req.body;
        // Create a new user document using the User model
        const newUser = new User_1.default({
            username,
            email,
            password
        });
        // Save the user to the database
        const savedUser = yield newUser.save();
        // Return a success response with the saved user
        res.status(201).json(savedUser);
    }
    catch (error) {
        // Handle errors, such as validation errors or database errors
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});
exports.signup = signup;
//# sourceMappingURL=auth.js.map