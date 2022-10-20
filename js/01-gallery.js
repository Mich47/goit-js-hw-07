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
    // const inst = this.getLightbox(imgSrc);
    // initLightbox(inst);

    const lightboxImg = this.createLightboxImg(imgSrc);
    const instance = basicLightbox.create(lightboxImg);
    instance.show();

    const escFun = this.onEscape.bind(this, instance);
    window.addEventListener("keydown", escFun);
    // window.removeEventListener("keydown", escFun);
    // window.addEventListener("keydown", (e) => {
    //   if (e.code !== "Escape") {
    //     return;
    //   }
    //   console.log(e.code);
    // });
  }

  createLightboxImg(srcLink) {
    return `<img src="${srcLink}" width="800" height="600">`;
  }

  // getLightbox(srcLink) {
  //   const lightboxImg = this.createLightboxImg(srcLink);
  //   const instance = basicLightbox.create(lightboxImg);
  //   return instance;
  // }

  // initLightbox(instance) {
  //   instance.show();
  // }

  // initLightbox(srcLink) {
  //   const lightboxImg = this.createLightboxImg(srcLink);
  //   const instance = basicLightbox.create(lightboxImg);
  //   instance.show();
  //   return instance;
  // }

  onEscape(instance, e) {
    if (e.code !== "Escape") {
      return;
    }
    // window.removeEventListener("keydown", this.onEscape.bind(instance, e));
    instance.close();
    // console.log(this);
    console.log("e ", e);
    console.log("x ", instance);
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
