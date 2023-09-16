const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalIamges = 0;
let photosArray = [];

// Unsplash API;
const count = 30;
const apiKey = "UpmRnx8m0QPxfoIrGzD_6QTD37ZrB3nR7RtiKnFNO4Q";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were load
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalIamges) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper FUnction to set Attributes on DOM elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Element for links &photos, add to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalIamges = photosArray.length;
  
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttribute(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event listener, check when each is finished loading 
    img.addEventListener('load', () => {
      imageLoaded();
    });

    // Put <img> inside <a>, then put both inside imageContainer Element 
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}


//Get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    alert(error)
    // Catch Error here
  }
}

// check to see if scrolling near bottom of page,load more photos
window.addEventListener('scroll', () => {
  console.log('scrolled');
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos()
