const count = 10
const apiKey = 'LeCiGuDQHdix7u1hLwZx7BD4HmsDm5hJwwxL-6z0K9k'
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
const imagesWrapper = document.getElementById('images-wrapper')
const loader = document.querySelector('.loader')
let photos = []
let totalPhotos = 0
let imagesLoaded = 0
let ready = false

// Set ready to true if all images are loaded and hide the loader
const imageLoaded = () => {
  imagesLoaded++
  if (imagesLoaded === totalPhotos) {
    ready = true
    loader.hidden = true
  }
}

// Display Photos
const displayPhotos = () => {
  imagesLoaded = 0
  totalPhotos = photos.length
  photos.forEach(image => {
    let imageItem = document.createElement('div')
    imageItem.className = 'image-item'
    imageItem.innerHTML = `
      <a href="${image.links.html}" class="download-image" target="_blank">
        <img src="${image.urls.regular}" alt="${image.alt_description}">
      </a> 
    `
    imageItem.querySelector('img').addEventListener('load', () => {
      imageLoaded()
    })
    imagesWrapper.append(imageItem)
  })
  loader.hidden = true
}

// Fetch photos from Unsplash API
const fetchImages = async () => {
  try {
    const response = await fetch(apiURL)
    const data = await response.json()
    photos = data
    displayPhotos()
  } catch (error) {
    console.log("Something went wrong: " + error)
  }
}

fetchImages()

// Fetch new images if we reach at the end of the document
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 400 && ready) {
    ready = false
    fetchImages()
  }
})