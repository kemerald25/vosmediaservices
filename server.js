const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const initial_path = path.join(__dirname, "public");

app.use(express.static(initial_path));
app.use(fileupload());
app.use(express.json());

// MongoDB schema for blog posts
const blogSchema = new mongoose.Schema({
    title: String,
    article: String,
    bannerImage: String,
    publishedAt: String
});

const Blog = mongoose.model('Blog', blogSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
});

app.post('/uploads', (req, res) => {
    // Handle image upload logic similar to your previous implementation
    // ...
});

app.post('/publish', (req, res) => {
    const { title, article, bannerImage, publishedAt } = req.body;
    
    const newBlog = new Blog({
        title: title,
        article: article,
        bannerImage: bannerImage,
        publishedAt: publishedAt
    });

    newBlog.save((err) => {
        if (err) {
            res.status(500).json({ error: 'Error saving blog post' });
        } else {
            res.status(200).json({ message: 'Blog post saved successfully' });
        }
    });
});

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
});

app.use((req, res) => {
    res.status(404).json("404");
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
