document.addEventListener('DOMContentLoaded', () => {
    const blogTitleField = document.querySelector('.title');
    const articleField = document.querySelector('.article');
    const bannerImageInput = document.querySelector('#banner-upload');
    const publishBtn = document.querySelector('.publish-btn');

    bannerImageInput.addEventListener('change', () => {
        uploadImage(bannerImageInput, "banner");
    });

    const uploadImage = (uploadFile, uploadType) => {
        const [file] = uploadFile.files;
        if (file && file.type.includes("image")) {
            const formData = new FormData();
            formData.append('image', file);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (uploadType === "banner") {
                    // Handle banner image upload logic if needed
                } else {
                    // Handle other image upload logic if needed
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
        } else {
            alert("Upload image files only");
        }
    };

    publishBtn.addEventListener('click', () => {
        const title = blogTitleField.value;
        const article = articleField.value;
        const bannerImage = ''; // Set the banner image URL if applicable
        const publishedAt = new Date().toLocaleString(); // Get current timestamp

        if (title && article) {
            const postData = {
                title: title,
                article: article,
                bannerImage: bannerImage,
                publishedAt: publishedAt
            };

            fetch('/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server, if needed
                console.log(data);
            })
            .catch(error => {
                console.error('Error publishing blog post:', error);
            });
        } else {
            alert('Please enter a title and article content');
        }
    });
});
