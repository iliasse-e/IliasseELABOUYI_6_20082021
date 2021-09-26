/**
 * Creates a lightbox fonctionality for an existing HTML lightbox element
 */

import { tabindexAdder } from "./tabindex.js";

export function lightbox() {
  // DOM elements
  const closeBtn = document.getElementById("lightbox-close");
  const nextBtn = document.getElementById("lightbox-next");
  const prevBtn = document.getElementById("lightbox-prev");
  const lightbox = document.getElementById("lightbox");
  const lightboxHeading = document.getElementById("lightbox-title");
  const mediaContainer = document.getElementById("lightbox-container");
  const mediasDOM = document.querySelectorAll(".media > img, video");
  const page = document.querySelector("body");

  // close lightbox
  function closeLightbox() {
    lightbox.style.display = "none";
    mediaContainer.removeChild(document.getElementById("lightbox-media"));
    mediasDOM.forEach(element => element.removeAttribute("aria-hidden"));
    page.removeAttribute("aria-hidden");
    tabindexAdder(".tab-element");
  }

  closeBtn.addEventListener("click", closeLightbox);
  document.getElementById("blocker").addEventListener("click", closeLightbox);


  // launch lightbox
  mediasDOM.forEach((element, index) =>  element.addEventListener("click", function displayLightbox() {

    lightbox.style.display = "flex";
    const media = document.createElement(element.localName);
    media.setAttribute("aria-label", element.getAttribute("alt"));
    media.setAttribute("id", "lightbox-media");
    media.src = element.src;
    mediaContainer.appendChild(media);
    page.setAttribute("aria-hidden", "true");
    console.log(media);
    media.setAttribute("aria-hidden", "false");
    lightboxHeading.innerHTML = element.nextSibling.firstChild.innerHTML;
    let e = index;
    
    // tab keyboard cycle
    closeBtn.classList.add("tab-element-lightbox");
    media.classList.add("tab-element-lightbox");
    nextBtn.classList.add("tab-element-lightbox");
    prevBtn.classList.add("tab-element-lightbox");
    
    // aria labels
    lightbox.setAttribute("aria-label", "image en plein écran");
    lightbox.setAttribute("aria-live", "polite")
    lightbox.setAttribute("role", "dialog");
    closeBtn.setAttribute("aria-label", "fenêtre fermée");
    prevBtn.setAttribute("aria-label", "média précédent");
    prevBtn.setAttribute("role", "button");
    prevBtn.setAttribute("aria-labelledby", "lightbox")
    nextBtn.setAttribute("aria-label", "média suivant");
    
    tabindexAdder(".tab-element-lightbox");

    // next media
    function next(){
      
      if (mediasDOM[e + 1] !== undefined) {
        document.getElementById("lightbox-media").remove();
        const nextMedia = document.createElement(mediasDOM[e +1].localName);
        nextMedia.setAttribute("aria-label", mediasDOM[e +1].getAttribute("alt"));
        nextMedia.src = mediasDOM[e +1].src;
        mediaContainer.appendChild(nextMedia);
        nextMedia.setAttribute("id", "lightbox-media");
        nextMedia.setAttribute("aria-hidden", "false");
        nextMedia.classList.add("tab-element-lightbox");
        nextMedia.setAttribute("aria-live", "polite");
        lightboxHeading.innerHTML = mediasDOM[e +1].nextSibling.firstChild.innerHTML;
        e++
      }
      else {
        e = 0;
        document.getElementById("lightbox-media").remove();
        const nextMedia = document.createElement(mediasDOM[e].localName);
        nextMedia.setAttribute("aria-label", mediasDOM[e].getAttribute("alt"));
        nextMedia.src = mediasDOM[e].src;
        mediaContainer.appendChild(nextMedia);
        nextMedia.setAttribute("id", "lightbox-media");
        nextMedia.setAttribute("aria-hidden", "false");
        nextMedia.classList.add("tab-element-lightbox");
        nextMedia.setAttribute("aria-live", "polite");
        lightboxHeading.innerHTML = mediasDOM[e].nextSibling.firstChild.innerHTML;
        e++
      }
      tabindexAdder(".tab-element-lightbox")
    }

    // previous media
    function previous() {
      
      if (mediasDOM[e - 1] !== undefined) {
        document.getElementById("lightbox-media").remove();
        const prevMedia = document.createElement(mediasDOM[e -1].localName);
        prevMedia.setAttribute("aria-label", mediasDOM[e -1].getAttribute("alt"));
        prevMedia.src = mediasDOM[e -1].src;
        mediaContainer.appendChild(prevMedia);
        prevMedia.setAttribute("id", "lightbox-media");
        prevMedia.setAttribute("aria-hidden", "false");
        prevMedia.classList.add("tab-element-lightbox");
        nextMedia.setAttribute("aria-live", "polite");
        lightboxHeading.innerHTML = mediasDOM[e -1].nextSibling.firstChild.innerHTML;
        e--
      }
      else {
        e = mediasDOM.length - 1;
        document.getElementById("lightbox-media").remove();
        const prevMedia = document.createElement(mediasDOM[e].localName);
        prevMedia.setAttribute("aria-label", mediasDOM[e].getAttribute("alt"));
        prevMedia.src = mediasDOM[e].src;
        mediaContainer.appendChild(prevMedia);
        prevMedia.setAttribute("id", "lightbox-media");
        prevMedia.setAttribute("aria-hidden", "false");
        prevMedia.classList.add("tab-element-lightbox");
        nextMedia.setAttribute("aria-live", "polite");
        lightboxHeading.innerHTML = mediasDOM[e].nextSibling.firstChild.innerHTML;
        e--
      }
      tabindexAdder(".tab-element-lightbox")
    }
        
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", previous);

    
    //  keyboard listeners
    window.addEventListener("keydown", function (event) {
      if (event.defaultPrevented) {
        return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
      }
    
      switch (event.key) {
        case "ArrowLeft":
          previous();
          break;
        case "ArrowRight":
          next()
          break;
        case "Escape":
          closeLightbox();
          break;
        case "Enter":
          event.preventDefault();
          break;
        default:
          return; // Quitter lorsque cela ne gère pas l'événement touche.
      }
      // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
      event.preventDefault();
    }, true);

  })
  )
}
