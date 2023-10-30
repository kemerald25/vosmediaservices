const path = require('path');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(express.json())




const uri = 'mongodb+srv://vosmediaservices:vosdatabase@clustervos.jmm0mao.mongodb.net/blog';

async function connect() {
    try {
        const client = await mongoose.connect(uri)
        console.log("Connected to MongoDB")
        setupRoutes(client);
        app.listen(8000, () => {
            console.log('Server is running on port 8000');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

function setupRoutes(client) {
    app.post('/publish', async (req, res) => {
        console.log("Data received from client:", req.body);
        const { title, article, bannerImage } = req.body;
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('blog'); // Specify your database name here
        const blogPosts = db.collection('blogs'); // Specify your collection name here

        const newBlogPost = {
            title,
            article,
            bannerImage,
            publishedAt: new Date(),
        };

        try {
            const result = await blogPosts.insertOne(newBlogPost, { writeConcern: { w: 'majority' } });
            console.log('Insertion Result:', result); // Log the entire result object
            if (result.insertedCount > 0) {
                console.log('Blog post saved:', result.ops[0]);
                res.json(result.ops[0]);
            } else {
                console.error('Error saving blog post: Insertion failed');
                res.status(500).json({ error: 'Failed to save blog post' });
            }
        } catch (error) {
            // console.error('Error saving blog post:', error);
            // res.status(500).json({ error: 'Failed to save blog post' });
        }
    });

    app.post('/upload', (req, res) => {
        let file = req.files.image;
        let date = new Date();
        let imagename = date.getDate() + date.getTime() + file.name;
        let uploadPath = path.join(__dirname, 'public', 'uploads', imagename);

        file.mv(uploadPath, (err) => {
            if (err) {
                console.error('Error uploading image:', err);
                res.status(500).json({ error: 'Failed to upload image' });
            } else {
                res.json(`uploads/${imagename}`);
            }
        });
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'home.html'));
    });

    app.get('/editor', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'editor.html'));
    });

    app.get("/:blog", (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'blog.html'));
    });

    app.use((req, res) => {
        res.status(404).json("Not Found");
    });
}


connect();

// app.listen(8000, () => {
//     console.log("Server started on port 8000");
// })
