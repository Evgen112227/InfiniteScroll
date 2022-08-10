const imageContainer = document.querySelector('.image-container');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let count = 6;
let apiKey = 'L4ZkPZSskzCkbEaHZsilkSA3TquxzUx5Rv9DaMYU-_8';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
	}
}

function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	photosArray.forEach((photo) => {
		const item = document.createElement('a');
		item.setAttribute('href', photo.links.html);
		item.setAttribute('target', '_blank');
		const img = document.createElement('img');
		img.setAttribute('src', photo.urls.regular)
		img.addEventListener('load', imageLoaded);
		item.appendChild(img);
		imageContainer.appendChild(item)
	});
};

async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.log(error);

	}
}

window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

getPhotos();




