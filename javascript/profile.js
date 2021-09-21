/**
  * Displays photographer profile in DOM
  * @param {Array} array array of photographer's objects
  * @param {Number} photographerIndex photographer id, highly suggested to call "getPhotographer()"
  */

export function generateProfile(array, photographerIndex) {

  // error msg if photographer not found 
  if (photographerIndex === undefined) {
    document.querySelector(".catalog").remove();
    document.querySelector(".gallery-container").remove();

    const error = document.createElement("p");
    const errornode = document.createTextNode("Photographer could not be found");
    error.appendChild(errornode);
    error.setAttribute("id", "error-not-found");
    error.setAttribute("role", "alert");
    document.querySelector("main").appendChild(error);
  }

  // photographer found get the DOM ready to display
  else {
    //creates HTML element
    const container = document.createElement("figure");
    const image = document.createElement("img");
    const headingContainer = document.createElement("header");
    const heading = document.createElement("h2");
    const adress = document.createElement("p");
    const tagline = document.createElement("p");
    const price = document.createElement("p");
    const tags = document.createElement("ul");
    const link = document.createElement("a");
    const headinglink = document.createElement("a");
  
    // creates a text to attach to the HTML element
    const adressnode = document.createTextNode(array[photographerIndex].city + ", " + array[photographerIndex].country);
    const headingnode = document.createTextNode(array[photographerIndex].name);
    const taglinenode = document.createTextNode(array[photographerIndex].tagline);
    const pricenode = document.createTextNode(array[photographerIndex].price + "€ /jour")
    const tagsgnode = document.createTextNode(array[photographerIndex].tags)
  
    // joins the textNodes to HTML element
    heading.appendChild(headingnode);
    adress.appendChild(adressnode);
    tagline.appendChild(taglinenode);
    price.appendChild(pricenode);
    
    // sets the new element to the DOM
    document.querySelector(".catalog").appendChild(container);
    container.appendChild(link);
    link.appendChild(image);
    container.appendChild(headingContainer);
    headingContainer.appendChild(headinglink);
    headinglink.appendChild(heading);
    headingContainer.appendChild(adress);
    headingContainer.appendChild(tagline);
    headingContainer.appendChild(price);
    headingContainer.appendChild(tags);
  
    // sets attributes
    container.classList.add("photographer-profile");
    image.setAttribute("src", "images/Photographers ID Photos/" + array[photographerIndex].portrait);
    image.setAttribute("alt", "photo de profile de " + array[photographerIndex].name + " - Page photographe")
    image.classList.add("photographer-profile__image", "tab-element");
    heading.classList.add("photographer-profile__heading");
    adress.classList.add("photographer-profile__location");
    tagline.classList.add("photographer-profile__tagline");
    price.classList.add("photographer-profile__price");
    tags.classList.add("tag-list");
    link.setAttribute("href", "https://iliasse-e.github.io/IliasseELABOUYI_6_20082021/photographer.html"+"?="+array[photographerIndex].id);
    headinglink.setAttribute("href", "https://iliasse-e.github.io/IliasseELABOUYI_6_20082021/photographer.html"+"?="+array[photographerIndex].id);
  
    array[photographerIndex].tags.forEach(tag => {
      container.classList.add(tag)
    }) 

    // sets aria and role attributes
    container.setAttribute("aria-label", "profil du photographe");
    image.setAttribute("role", "heading");
    heading.setAttribute("role", "heading");
    heading.setAttribute("aria-level", "1");
    adress.setAttribute("role", "heading");
    adress.setAttribute("aria-level", "2");
    tagline.setAttribute("role", "heading");
    tagline.setAttribute("aria-level", "3");
    price.setAttribute("role", "heading");
    price.setAttribute("aria-level", "4");
    tags.setAttribute("role", "heading");
    tags.setAttribute("aria-level", "5");

    
    // sets tags
    array[photographerIndex].tags.forEach(element => { 
      const tag = document.createElement("li");
      const tagnode = document.createTextNode("#"+element);
      tag.appendChild(tagnode);
      tags.appendChild(tag);
      tag.classList.add("tag")
    });
  
    // add price if page allows it
    if (document.getElementById("photographer-price")) {
      document.getElementById("photographer-price").innerHTML = array[photographerIndex].price + "€/jour"
    }
    
  }


}