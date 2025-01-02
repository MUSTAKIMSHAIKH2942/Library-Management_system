const express = require('express');
const multer = require('multer');
const Book = require('../models/book');
const sendMail = require('../utils/sendMail');

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Route: Home
router.get('/', async (req, res) => {
    const books = await Book.find();
    res.render('index', { books });
});

// Route: Issue Book (Form)
router.get('/issue', (req, res) => {
    res.render('issueForm');
});

// Route: Handle Book Issue
router.post('/issue', upload.single('bookImage'), async (req, res) => {
    const { title, author, name, email, phone } = req.body;

    const book = new Book({
        title,
        author,
        user: { name, email, phone },
        returnDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
    });

    await book.save();
    res.redirect('/');
});

// Route: Send Alerts
setInterval(async () => {
    const books = await Book.find({ isReturned: false });

    books.forEach(book => {
        const daysLeft = Math.ceil((book.returnDate - Date.now()) / (1000 * 60 * 60 * 24));
        if (daysLeft === 1) {
            sendMail(book.user.email, `Reminder: Return Book "${book.title}"`, `
                Your book is due tomorrow. Please return it to avoid a fine.
            `);
        }
    });
}, 24 * 60 * 60 * 1000); // Check every day

module.exports = router;
