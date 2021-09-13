/**
  * Displays photographer profile in DOM
  * @param {Array} array array of photographer's objects
  * @param {Number} photographerIndex photographer id, highly suggested to call "getPhotographer()"
  */

export function generateProfile(array, photographerIndex) {

  // error msg if photographer not found 
  if (photographerIndex === undefined) {
    console.log(photographerIndex)
    document.querySelector(".catalog").remove();
    document.querySelector(".gallery-container").remove();

    const error = document.createElement("p");
    const errornode = document.createTextNode("Photographer could not be found");
    error.appendChild(errornode);
    error.setAttribute("id", "error-not-found")
    document.querySelector("main").appendChild(error);
  }

  // photographer found get the DOM ready to display
  else {
    //creates HTML element
    const container = document.createElement("figure");
    const image = document.createElement("img");
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
    container.appendChild(headinglink);
    headinglink.appendChild(heading);
    container.appendChild(adress);
    container.appendChild(tagline);
    container.appendChild(price);
    container.appendChild(tags);
  
    // sets attributes
    container.classList.add("photographer-profile");
    image.setAttribute("src", "images/Photographers ID Photos/" + array[photographerIndex].portrait);
    image.setAttribute("alt", "profile picture of " + array[photographerIndex].name + " - Page photographer")
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