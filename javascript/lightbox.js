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
   let prevActiveElement
 
   // launch lightbox
   mediasDOM.forEach((element, index) =>  element.addEventListener("click", function displayLightbox() {
     
     console.log("image clicked")
     prevActiveElement = document.activeElement;
     lightbox.style.display = "flex";
     document.querySelectorAll(".lightbox__container img").forEach(n => n.remove());
     const media = document.createElement(element.localName);
     media.setAttribute("aria-label", element.getAttribute("alt"));
     media.setAttribute("id", "lightbox-media");
     media.src = element.src;
     mediaContainer.appendChild(media);
     lightboxHeading.innerHTML = element.nextSibling.firstChild.innerHTML;
     let e = index;
     lightbox.setAttribute("tabindex", 1);
     lightbox.focus();
     
     // tab keyboard cycle
     closeBtn.classList.add("tab-element-lightbox");
     media.classList.add("tab-element-lightbox");
     nextBtn.classList.add("tab-element-lightbox");
     prevBtn.classList.add("tab-element-lightbox");
     
     
     tabindexAdder(".tab-element-lightbox");
 
     // next media
     function next() {
 
      console.log("next clicked")
        if (mediasDOM[e + 1] !== undefined) {
          document.getElementById("lightbox-media").remove();
          const nextMedia = document.createElement(mediasDOM[e +1].localName);
          nextMedia.setAttribute("aria-label", mediasDOM[e +1].getAttribute("alt"));
          nextMedia.src = mediasDOM[e +1].src;
          mediaContainer.appendChild(nextMedia);
          nextMedia.setAttribute("id", "lightbox-media");
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
          nextMedia.classList.add("tab-element-lightbox");
          nextMedia.setAttribute("aria-live", "polite");
          lightboxHeading.innerHTML = mediasDOM[e].nextSibling.firstChild.innerHTML;
        }
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
         prevMedia.classList.add("tab-element-lightbox");
         prevMedia.setAttribute("aria-live", "polite");
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
         prevMedia.classList.add("tab-element-lightbox");
         prevMedia.setAttribute("aria-live", "polite");
         lightboxHeading.innerHTML = mediasDOM[e].nextSibling.firstChild.innerHTML;
         e = mediasDOM.length;
         e--
       }
     }

    // close lightbox
   function closeLightbox() {
      lightbox.style.display = "none";
      mediaContainer.removeChild(document.getElementById("lightbox-media"));
      tabindexAdder(".tab-element");
      prevActiveElement.focus();
    }
         
     // click listeners
     nextBtn.addEventListener("click", next);
     prevBtn.addEventListener("click", previous);

     closeBtn.addEventListener("click", closeLightbox);
     document.getElementById("blocker").addEventListener("click", closeLightbox);
     
     
     //  keyboard listeners
     window.addEventListener("keydown", function (event) {
       console.log(event)
       if (event.defaultPrevented) {
         return // Ne devrait rien faire si l'événement de la touche était déjà consommé.
       }
     
       switch (event.key) {
         case "ArrowLeft":
           prevBtn.click();
           break;
         case "ArrowRight":
           nextBtn.click();
           break;
         case "Escape":
           closeBtn.click();
           break;
         case "Enter":
           event.preventDefault()
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
 