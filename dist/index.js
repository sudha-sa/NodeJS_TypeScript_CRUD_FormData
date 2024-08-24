"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const PeopleRoutes_1 = __importDefault(require("./routes/PeopleRoutes"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files from the "uploads" directory
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Routes
app.use('/api', PeopleRoutes_1.default);
// Connect to MongoDB
mongoose_1.default.connect('mongodb://127.0.0.1:27017/MVC_Pattern_FormTS')
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
