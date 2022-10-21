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

    var gallery = new SimpleLightbox(".gallery a", {
      captionsData: "alt",
      captionDelay: 250,
    });

    gallery.open();

    gallery.on("closed.simplelightbox", function () {
      gallery.destroy();
    });
  }

  createGalleryMarkup(galleryContainerRef, galleryItems) {
    const galleryItemsMarkup = galleryItems
      .map((item) => this.createGalleryItem(item))
      .join("");

    galleryContainerRef.insertAdjacentHTML("afterbegin", galleryItemsMarkup);
  }

  createGalleryItem({ preview, original, description }) {
    return `
      <a class="gallery__item" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
        />
      </a>
    `;
  }
}

const galleryRef = document.querySelector(".gallery");

new Gallery(galleryRef, galleryItems).init();
