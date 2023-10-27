

const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'Blog';

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
});



app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
});







let blogData = {
    title: req.body.title,
    article: req.body.article,
    bannerImage: req.body.bannerImage,
};

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        throw err;
    }

    const db = client.db(dbName);
    const collection = db.collection('blog');

    collection.insertOne(blogData, (error, result) => {
        if (error) {
            throw error;
        }

        console.log('Blog data saved to MongoDB:', result.ops[0]);
        res.json(result.ops[0]); // Send back the saved data to the client
        client.close();
    });
});














app.use((req, res) => {
    res.json("404");
});

app.listen("3000", () => {
    console.log('Server is listening on port 3000...');
});
