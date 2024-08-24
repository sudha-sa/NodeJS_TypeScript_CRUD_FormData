import { Router } from 'express';
import upload from '../config/multerconfig'; // Adjust the path as necessary
import { createPerson, updatePerson, deletePerson, getPeople, getPersonById } from '../controllers/PeopleController';

const router = Router();

// Create person
router.post('/people', upload.single('PassportPhoto'), createPerson);

// Update person
router.put('/people/:id', upload.single('PassportPhoto'), updatePerson);

// Delete person
router.delete('/people/:id', deletePerson);

// Get all people
router.get('/people', getPeople);

// Get person by ID
router.get('/people/:id', getPersonById);

export default router;
