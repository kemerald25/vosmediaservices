document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Get blogId from location pathname
        const blogId = decodeURI(location.pathname.split("/").pop());

        // Fetch blog post data from the server
        const response = await fetch(`/api/blog/${blogId}`); // Assuming you have an endpoint to fetch a specific blog post
        const blogPosts = await response.json();

        if (blogPosts) {
            setupBlog(blogPosts);
        } else {
            location.replace("/");
        }
    } catch (error) {
        console.error(error);
        location.replace("/"); // Redirect to home page in case of an error
    }
});

function setupBlog(blogPosts) {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const publish = document.querySelector('.published');
    const article = document.querySelector('.article');

    // Set up blog post details in the DOM
    banner.style.backgroundImage = `url(${blogPosts.bannerImage})`;
    blogTitle.textContent = blogPosts.title;
    publish.textContent = `Published on: ${new Date(blogPosts.publishedAt).toLocaleDateString()}`;
    article.innerHTML = blogPosts.article;
}


// const setupBlog = (data) => {
//     const banner = document.querySelector('.banner');
//     const blogTitle = document.querySelector('.title');
//     const titleTag = document.querySelector('title');
//     const publish = document.querySelector('.published');
    
//     banner.style.backgroundImage = `url(${data.bannerImage})`;

//     titleTag.innerHTML += blogTitle.innerHTML = data.title;
//     publish.innerHTML += data.publishedAt;

//     const article = document.querySelector('.article');
//     addArticle(article, data.article);
// }

// const addArticle = (ele, data) => {
//     data = data.split("\n").filter(item => item.length);
//     // console.log(data);

//     data.forEach(item => {
//         // check for heading
//         if(item[0] == '#'){
//             let hCount = 0;
//             let i = 0;
//             while(item[i] == '#'){
//                 hCount++;
//                 i++;
//             }
//             let tag = `h${hCount}`;
//             ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
//         } 
//         //checking for image format
//         else if(item[0] == "!" && item[1] == "["){
//             let seperator;

//             for(let i = 0; i <= item.length; i++){
//                 if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
//                     seperator = i;
//                 }
//             }

//             let alt = item.slice(2, seperator);
//             let src = item.slice(seperator + 2, item.length - 1);
//             ele.innerHTML += `
//             <img src="${src}" alt="${alt}" class="article-image">
//             `;
//         }

//         else{
//             ele.innerHTML += `<p>${item}</p>`;
//         }
//     })
// }