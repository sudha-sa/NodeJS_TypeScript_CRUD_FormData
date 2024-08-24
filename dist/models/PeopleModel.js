"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PeopleSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    MobileNumber: { type: String, required: true },
    PassportPhoto: { type: String, required: true },
    PassportPhotoPath: { type: String, required: true }
});
const PeopleModel = mongoose_1.default.model('People', PeopleSchema);
exports.default = PeopleModel;
