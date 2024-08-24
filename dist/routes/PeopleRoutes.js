"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multerconfig_1 = __importDefault(require("../config/multerconfig")); // Adjust the path as necessary
const PeopleController_1 = require("../controllers/PeopleController");
const router = (0, express_1.Router)();
// Create person
router.post('/people', multerconfig_1.default.single('PassportPhoto'), PeopleController_1.createPerson);
// Update person
router.put('/people/:id', multerconfig_1.default.single('PassportPhoto'), PeopleController_1.updatePerson);
// Delete person
router.delete('/people/:id', PeopleController_1.deletePerson);
// Get all people
router.get('/people', PeopleController_1.getPeople);
// Get person by ID
router.get('/people/:id', PeopleController_1.getPersonById);
exports.default = router;
