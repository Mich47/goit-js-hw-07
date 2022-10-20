import { galleryItems } from "./gallery-items.js";
// Change code below this line

class Gallery {
  constructor(galleryRef, galleryItems) {
    this.galleryRef = galleryRef;
    this.galleryItems = galleryItems;
  }

  init() {
    this.createGalleryMarkup(this.galleryRef, this.galleryItems);
    this.addListeners(this.galleryRef);
  }

  addListeners(elem) {
    elem.addEventListener("click", this.onGalleryImageClick.bind(this));
  }

  onGalleryImageClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains("gallery__image")) {
      return;
    }

    const imgSrc = e.target.dataset.source;
    this.initLightbox(imgSrc);
  }

  createGalleryMarkup(galleryContainerRef, galleryItems) {
    const galleryItemsMarkup = galleryItems
      .map((item) => this.createGalleryItem(item))
      .join("");

    galleryContainerRef.insertAdjacentHTML("afterbegin", galleryItemsMarkup);
  }

  createGalleryItem(galleryItem) {
    const galleryLink = this.createGalleryLink(galleryItem);
    return `
      <div class="gallery__item">
        ${galleryLink}
      </div>
    `;
  }

  createGalleryLink({ preview, original, description }) {
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

  createLightboxImg(srcLink) {
    return `<img src="${srcLink}" width="800" height="600">`;
  }

  initLightbox(srcLink) {
    const lightboxImg = this.createLightboxImg(srcLink);
    const instance = basicLightbox.create(lightboxImg);
    instance.show();
  }
}

const galleryRef = document.querySelector(".gallery");

new Gallery(galleryRef, galleryItems).init();
