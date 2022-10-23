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

  onGalleryImageClick(event) {
    event.preventDefault();
    if (!event.target.classList.contains("gallery__image")) {
      return;
    }

    const imgSrc = event.target.dataset.source;
    const lightboxImg = this.createLightboxImg(imgSrc);
    const instance = basicLightbox.create(lightboxImg, {
      onClose: () => {
        window.removeEventListener("keydown", onEscape);
      },
    });

    instance.show();

    const onEscape = (event) => {
      if (event.code !== "Escape") {
        return;
      }
      instance.close();
      window.removeEventListener("keydown", onEscape);
    };

    window.addEventListener("keydown", onEscape);
  }

  createLightboxImg(srcLink) {
    return `<img src="${srcLink}" width="800" height="600">`;
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
}

const galleryRef = document.querySelector(".gallery");

new Gallery(galleryRef, galleryItems).init();
