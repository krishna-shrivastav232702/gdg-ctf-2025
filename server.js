const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Hardcoded userId for verification
const correctUserId = "12345"; // Static for now

// Route to serve the React app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { userId } = req.body;
    
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    
    if (userId === correctUserId) {
        return res.json({ message: 'Flag Captured! Proceed to the next challenge.' });
    } else {
        return res.status(401).json({ message: 'Incorrect User ID. Try again.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
