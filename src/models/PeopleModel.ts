import mongoose from 'mongoose';

const PeopleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique:true },
    address: { type: String, required: true },
    MobileNumber: { type: String, required: true },
    PassportPhoto: { type: String, required: true },
    PassportPhotoPath: { type: String, required: true }
});

const PeopleModel = mongoose.model('People', PeopleSchema);

export default PeopleModel;
