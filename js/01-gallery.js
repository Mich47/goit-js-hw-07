import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");

createGalleryMarkup(galleryRef, galleryItems);

galleryRef.addEventListener("click", onGalleryImageClick);

function onGalleryImageClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

  const imgSrc = e.target.dataset.source;
  initLightbox(imgSrc);
}

function createGalleryMarkup(galleryContainerRef, galleryItems) {
  const galleryItemsMarkup = galleryItems
    .map((item) => createGalleryItem(item))
    .join("");

  galleryContainerRef.insertAdjacentHTML("afterbegin", galleryItemsMarkup);
}

function createGalleryItem(galleryItem) {
  const galleryLink = createGalleryLink(galleryItem);
  return `
  <div class="gallery__item">
    ${galleryLink}
  </div>
  `;
}

function createGalleryLink({ preview, original, description }) {
  return `
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
  `;
}

function createLightboxImg(srcLink) {
  return `<img src="${srcLink}" width="800" height="600">`;
}

function initLightbox(srcLink) {
  const lightboxImg = createLightboxImg(srcLink);
  const instance = basicLightbox.create(lightboxImg);
  instance.show();
}
