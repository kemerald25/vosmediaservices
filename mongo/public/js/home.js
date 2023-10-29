// Import required MongoDB module
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb+srv://unityekeoba18:Devroyale2005@cluster0.0tjsbja.mongodb.net/?retryWrites=true&w=majority';

// Function to retrieve and display blogs on the home page
const displayBlogs = async () => {
  try {
    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Access the 'blogs' collection in MongoDB
    const database = client.db('<database>'); // Replace '<database>' with your actual database name
    const collection = database.collection('blogs');

    // Find all documents in the 'blogs' collection
    const blogs = await collection.find({}).toArray();

    // Close the MongoDB connection
    client.close();

    // Display blogs on the home page
    const blogSection = document.getElementById('blog-section'); // Assuming you have a div with id 'blog-section' in your HTML
    blogs.forEach(blog => {
      createBlogCard(blog, blogSection);
    });
  } catch (error) {
    console.error(error);
  }
};

// Function to create a blog card and append it to the specified element
const createBlogCard = (blog, container) => {
  let truncatedTitle = blog.title.substring(0, 100) + '...';
  let truncatedArticle = blog.article.substring(0, 200) + '...';

  const blogCard = document.createElement('div');
  blogCard.classList.add('blog-card');
  blogCard.innerHTML = `
    <img src="${blog.bannerImage}" class="blog-image" alt="">
    <h1 class="blog-title">${truncatedTitle}</h1>
    <p class="blog-overview">${truncatedArticle}</p>
    <a href="/${blog.id}" class="btn dark">Read</a>
  `;

  container.appendChild(blogCard);
};

// Call the displayBlogs function when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  displayBlogs();
});
