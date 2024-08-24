import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import peopleRoutes from './routes/PeopleRoutes';
import path from 'path';


// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api', peopleRoutes);



// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/MVC_Pattern_FormTS')
    .then(() => {
        console.log("MongoDB connected");

        // Start the server only after successful MongoDB connection
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the process if the database connection fails
    });

// // Example route
// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });
