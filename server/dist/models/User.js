"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId },
    username: { type: String, min: 4, max: 60, require: true, unique: true },
    email: { type: String, require: true, unique: true, max: 60 },
    password: { type: String, require: true, min: 5 },
    subscription: {
        unlimited: { type: Boolean },
        limit: { type: Number },
        usage: { type: Number }
    }
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map