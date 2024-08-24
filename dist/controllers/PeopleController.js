"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.updatePerson = exports.createPerson = exports.getPersonById = exports.getPeople = void 0;
const PeopleModel_1 = __importDefault(require("../models/PeopleModel"));
const fs_1 = __importDefault(require("fs"));
const getPeople = async (req, res) => {
    try {
        const people = await PeopleModel_1.default.find();
        res.status(200).json(people);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.getPeople = getPeople;
const getPersonById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        // Find the person by ID
        const person = await PeopleModel_1.default.findById(id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json(person);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.getPersonById = getPersonById;
const createPerson = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);
        const { name, age, email, address, MobileNumber } = req.body;
        const PassportPhoto = req.file?.filename;
        const PassportPhotoPath = req.file?.path;
        // Check if body and file are properly received
        if (!name || !age || !email || !address || !MobileNumber || !PassportPhoto || !PassportPhotoPath) {
            return res.status(400).json({ message: 'All fields are required, including the file' });
        }
        // if (PassportPhoto && !fs.existsSync(PassportPhoto)) {
        //     return res.status(404).json({ message: 'Passport photo not found.' });
        // }
        // Ensure the uploaded file exists
        if (PassportPhotoPath && !fs_1.default.existsSync(PassportPhotoPath)) {
            return res.status(404).json({ message: 'Passport photo not found.' });
        }
        const newPerson = new PeopleModel_1.default({
            name,
            age,
            email,
            address,
            MobileNumber,
            PassportPhoto,
            PassportPhotoPath
        });
        const savedPerson = await newPerson.save();
        res.status(201).json(savedPerson);
    }
    catch (error) {
        if (error instanceof Error) {
            // Handle known errors
            res.status(500).json({ message: error.message });
        }
        else {
            // Handle unknown errors
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.createPerson = createPerson;
const updatePerson = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Received ID:', id);
        const { name, age, email, address, MobileNumber } = req.body;
        // const PassportPhoto = req.file?.filename;
        // const PassportPhotoPath = req.file?.path; 
        const PassportPhoto = req.file?.path;
        // Check if person exists
        const person = await PeopleModel_1.default.findById(id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        // Update the person's details
        person.name = name || person.name;
        person.age = age || person.age;
        person.email = email || person.email;
        person.address = address || person.address;
        person.MobileNumber = MobileNumber || person.MobileNumber;
        if (PassportPhoto) {
            // Optionally delete the old photo if it exists
            if (person.PassportPhotoPath && fs_1.default.existsSync(person.PassportPhotoPath)) {
                fs_1.default.unlinkSync(person.PassportPhotoPath);
            }
            person.PassportPhotoPath = PassportPhoto;
        }
        const updatedPerson = await person.save();
        res.status(200).json(updatedPerson);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.updatePerson = updatePerson;
const deletePerson = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        // Find and delete the person
        const person = await PeopleModel_1.default.findByIdAndDelete(id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        // Delete the photo file if it exists
        if (person.PassportPhoto && fs_1.default.existsSync(person.PassportPhoto)) {
            fs_1.default.unlinkSync(person.PassportPhoto);
        }
        res.status(200).json({ message: 'Person deleted successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.deletePerson = deletePerson;
