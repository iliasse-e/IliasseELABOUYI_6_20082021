/*
* 
* displays photographer profiles
* needs "array" array when called
*/

export function generateProfile(array, photographerIndex) {

    //creates HTML element
    const container = document.createElement("figure");
    const image = document.createElement("img");
    const heading = document.createElement("h2");
    const adress = document.createElement("p");
    const tagline = document.createElement("q");
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

    // attributes a class
    container.classList.add("photographer-profile");
    image.setAttribute("src", "images/Photographers ID Photos/" + array[photographerIndex].portrait);
    image.classList.add("photographer-profile__image");
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