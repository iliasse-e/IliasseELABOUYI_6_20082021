
let photographers = [];
let medias = [];
fetch('./JSON/photographer.json')
.then(function (response) {
    console.log("Je suis la");
    if (response.ok) {
        response.json().then(data => {
            photographers = data["photographers"];

            // import (photographer profil) json data
            
            fetch('./JSON/photographer.json')
            .then(function (response) {
                console.log("Je suis la");
                if (response.ok) {
                    response.json().then(data => {
                        medias = data["media"];
                        generateImage(0);
                        generateImage(8);
                        generateImage(4);
                        generateImage(5);
                        generateImage(7);
                        generateImage(9);
                        
                        console.log(identifyPhotographer())
                        console.log(medias);
                        console.log(photographers[0]);
                        
                        generateProfile(identifyPhotographer());
                    })
                }
                else { 
                    alert("Les données utilisateurs n'ont pas été chargées")
                }
                console.log("Im here")
            });

        })
    }
    else { 
        alert("Les données utilisateurs n'ont pas été chargées")
    }
    console.log("Im here")
});


// identify photographer from URL
const urlParams = window.location.search;

function identifyPhotographer() {
    for (let photographer = 0; photographer < photographers.length; photographer++) {
        if (urlParams.includes(encodeURIComponent(photographers[photographer].name))) {
            return photographer
        }
    }
}

// generates photographer images
function generateImage(mediaIndex) {

    //creates HTML element
    const container = document.createElement("section");
    const image = document.createElement("img");
    const heading = document.createElement("div");
    const title = document.createElement("p");
    const likeCounter = document.createElement("p");
    const like = document.createElement("i");

    // creates a text to attach to the HTML element
    const imagenode = document.createTextNode(medias[mediaIndex].image);
    const titlenode = document.createTextNode(medias[mediaIndex].title);
    const likeCounternode = document.createTextNode(medias[mediaIndex].likes);

    // joins the textNodes to HTML element
    image.appendChild(imagenode);
    title.appendChild(titlenode);
    likeCounter.appendChild(likeCounternode);
    
    // sets the new element to the DOM
    document.querySelector(".gallery").appendChild(container);
    container.appendChild(image);
    container.appendChild(heading);
    heading.appendChild(title);
    heading.appendChild(likeCounter);
    heading.appendChild(like);

    // attributes a class
    container.setAttribute("class", "image");
    image.setAttribute("src", "images/Tracy/" + medias[mediaIndex].image);
    heading.setAttribute("class", "image__heading");
    title.setAttribute("class", "image__heading-title");
    likeCounter.setAttribute("class", "image__heading-like-counter");
    like.setAttribute("class", "fas fa-heart image-like");
}

// import generate photographer profile
function generateProfile(photographerIndex) {

    //creates HTML element
    const container = document.createElement("section");
    const image = document.createElement("img");
    const heading = document.createElement("h2");
    const adress = document.createElement("p");
    const tagline = document.createElement("p");
    const price = document.createElement("p");
    const tags = document.createElement("ul");
    const link = document.createElement("a");
    const headinglink = document.createElement("a");

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
    document.querySelector(".catalog").prepend(container);
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
    headinglink.setAttribute("href", "http://127.0.0.1:5500/photographer.html"+"?="+photographers[photographerIndex].name);

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