document.addEventListener('DOMContentLoaded', function () {
    const blogTitleField = document.querySelector('.title');
    const articleField = document.querySelector('.article');

    const bannerImage = document.querySelector('#banner-upload');
    const banner = document.querySelector(".banner");
    let bannerPath;

    const publishBtn = document.querySelector('.publish-btn');
    const uploadInput = document.querySelector('#image-upload');

    bannerImage.addEventListener('change', () => {
        uploadImage(bannerImage, "banner");
    });

    uploadInput.addEventListener('change', () => {
        uploadImage(uploadInput, "image");
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
                .then(res => res.json())
                .then(data => {
                    if (uploadType === "image") {
                        addImage(data, file.name);
                        // Send the image URL to Firebase Realtime Database
                        firebase.database().ref('images/').push().set({
                            imageURL: data,
                            imageName: file.name
                        });
                    } else {
                        bannerPath = `${location.origin}/${data}`;
                        banner.style.backgroundImage = `url("${bannerPath}")`;
                    }
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                });
        } else {
            alert("Upload image files only");
        }
    };

    const addImage = (imagePath, alt) => {
        let curPos = articleField.selectionStart;
        let textToInsert = `\r![${alt}](${imagePath})\r`;
        articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
    };

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    publishBtn.addEventListener('click', () => {
        if (articleField.value.length && blogTitleField.value.length) {
            // generating id
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let blogTitle = blogTitleField.value.split(" ").join("-");
            let id = '';
            for (let i = 0; i < 4; i++) {
                id += letters[Math.floor(Math.random() * letters.length)];
            }

            // setting up docName
            let docName = `${blogTitle}-${id}`;
            let date = new Date(); // for published at info

            // Send blog post data to Firebase Realtime Database
            firebase.database().ref('blogs/').push().set({
                title: blogTitleField.value,
                article: articleField.value,
                bannerImage: bannerPath,
                publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
            })
                .then(() => {
                    console.log("Blog post successfully published");
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            alert('Please enter a title and article content');
        }
    });
});