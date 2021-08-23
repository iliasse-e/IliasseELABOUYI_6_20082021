import {generateProfile} from /javacsript/photographer.js;

function generateProfile(photographerIndex) {

    //creates HTML element
    const container = document.createElement("section");
    const image = document.createElement("img");

    // creates a text to attach to the HTML element
    const adressnode = document.createTextNode(photographers[photographerIndex].city + ", " + photographers[photographerIndex].country);
    const headingnode = document.createTextNode(photographers[photographerIndex].name);
    const taglinenode = document.createTextNode(photographers[photographerIndex].tagline);
    const pricenode = document.createTextNode(photographers[photographerIndex].price + "€ /jour")
    const tagsgnode = document.createTextNode(photographers[photographerIndex].tags)

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

    // attributes a class
    container.setAttribute("class", "photographer-profile");
    image.setAttribute("src", "images/Photographers ID Photos/" + photographers[photographerIndex].portrait);
    image.setAttribute("class", "photographer-profile__image");
    heading.setAttribute("class", "photographer-profile__heading");
    adress.setAttribute("class", "photographer-profile__location");
    tagline.setAttribute("class", "photographer-profile__tagline");
    price.setAttribute("class", "photographer-profile__price");
    tags.setAttribute("class", "tag-list");
    link.setAttribute("href", "http://127.0.0.1:5500/photographer.html");
    headinglink.setAttribute("href", "http://127.0.0.1:5500/photographer.html");

    photographers[photographerIndex].tags.forEach(tag => {
        container.classList.add(tag)
    }) 
    
    // sets tags
    photographers[photographerIndex].tags.forEach(element => { 
        const tag = document.createElement("li");
        const tagnode = document.createTextNode("#"+element);
        tag.appendChild(tagnode);
        tags.appendChild(tag);
        tag.setAttribute("class", "tag")
    });
}