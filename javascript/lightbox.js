/**
 * Creates a lightbox fonctionality for an existing HTML lightbox element
 */

export function lightbox() {
  // DOM elements
  const closeBtn = document.getElementById("lightbox-close");
  const nextBtn = document.getElementById("lightbox-next");
  const prevBtn = document.getElementById("lightbox-prev");
  const lightbox = document.getElementById("lightbox");
  const lightboxHeading = document.getElementById("lightbox-title")
  const mediaContainer = document.getElementById("lightbox-container")
  const mediasDOM = document.querySelectorAll(".media > img, video")

  // close lightbox
  function closeLightbox() {
    lightbox.style.display = "none";
    mediaContainer.removeChild(document.getElementById("lightbox-media"));
  }

  closeBtn.addEventListener("click", closeLightbox);
  document.getElementById("blocker").addEventListener("click", closeLightbox);


  // launch lightbox
  mediasDOM.forEach((element, index) =>  element.addEventListener("click", function displayLightbox() {

    lightbox.style.display = "flex";
    const media = document.createElement(element.localName);
    media.setAttribute("id", "lightbox-media");
    media.src = element.src;
    mediaContainer.appendChild(media);
    lightboxHeading.innerHTML = element.nextSibling.firstChild.innerHTML;
    let e = index;

    // next media
    function next(){
      
      if (mediasDOM[e + 1] !== undefined) {
        document.getElementById("lightbox-media").remove();
        const nextMedia = document.createElement(mediasDOM[e +1].localName);
        nextMedia.src = mediasDOM[e +1].src;
        mediaContainer.appendChild(nextMedia);
        nextMedia.setAttribute("id", "lightbox-media");
        lightboxHeading.innerHTML = mediasDOM[e +1].nextSibling.firstChild.innerHTML;
        e++
      }
      else {
        e = 0;
        document.getElementById("lightbox-media").remove();
        const nextMedia = document.createElement(mediasDOM[e].localName);
        nextMedia.src = mediasDOM[e].src;
        mediaContainer.appendChild(nextMedia);
        nextMedia.setAttribute("id", "lightbox-media");
        lightboxHeading.innerHTML = mediasDOM[e].nextSibling.firstChild.innerHTML;
        e++
      }
    }

    // previous media
    function previous() {
      
      if (mediasDOM[e - 1] !== undefined) {
        document.getElementById("lightbox-media").remove()
        const nextMedia = document.createElement(mediasDOM[e -1].localName);
        nextMedia.src = mediasDOM[e -1].src;
        mediaContainer.appendChild(nextMedia);
        nextMedia.setAttribute("id", "lightbox-media");
        lightboxHeading.innerHTML = mediasDOM[e -1].nextSibling.firstChild.innerHTML;
        e--
      }
      else {
        e = mediasDOM.length - 1;
        document.getElementById("lightbox-media").remove();
        const nextMedia = document.createElement(mediasDOM[e].localName);
        nextMedia.src = mediasDOM[e].src;
        mediaContainer.appendChild(nextMedia);
        nextMedia.setAttribute("id", "lightbox-media");
        lightboxHeading.innerHTML = mediasDOM[e].nextSibling.firstChild.innerHTML;
        e--
      }
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
          previous()
          console.log(event.key)
          break;
        case "ArrowRight":
          next()
          break;
        case "Escape":
          closeLightbox()
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
