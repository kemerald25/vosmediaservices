// Connect to MongoDB and fetch blog post data
const mongoose = require('mongoose')
const uri = 'mongodb+srv://vosmediaservices:vosdatabase@clustervos.jmm0mao.mongodb.net/?retryWrites=true&w=majority';
const client = mongoose.connect(uri)
client.connect(async err => {
    if (err) {
        console.error(err);
        return;
    }

    try {
        // Get blogId from location pathname
        const blogId = decodeURI(location.pathname.split("/").pop());

        // Access blogs collection in MongoDB
        const db = client.db('blog').doc(blogId); // Replace '<database>' with your actual database name
        const collection = db.collection('blogs');

        // Find document with matching blogId
        const blogPost = await collection.findOne({ blogId });

        if (blogPost) {
            setupBlog(blogPost);
            console.log(doc.data())
        } else {
            location.replace("/");
        }
    } catch (error) {
        console.error(error);
        location.replace("/"); // Redirect to home page in case of an error
    } finally {
        client.close(); // Close MongoDB connection
    }
});

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    const article = document.querySelector('.article');

    // Set up blog post details in the DOM
    banner.style.backgroundImage = `url(${data.bannerImage})`;
    titleTag.innerHTML += blogTitle.innerHTML = data.titleTag;
    publish.innerHTML += data.publishedAt;

    addArticle(article, data.article);
}

const addArticle = (element, content) => {
    // Populate the article content in the specified element
    element.innerHTML = content;
}
