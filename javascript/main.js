// import (photographer profil) json data
let photographers = [];
fetch('./JSON/photographer.json')
.then(function (response) {
    console.log("Je suis la");
    if (response.ok) {
        response.json().then(data => {
            photographers = data["photographers"];
          
        })
    }
    else { 
        alert("Les données utilisateurs n'ont pas été chargées")
    }
    console.log("Im here")
});

// DOM elements

setTimeout(function() {

console.log("where are you");

// gathers available tags
let tags = [];
for (let photographer = 0; photographer < photographers.length; photographer++ ) {
    for (let tag = 0; tag < photographers[photographer].tags.length; tag++) {
        if (!tags.includes(photographers[photographer].tags[tag])) {
            tags.push(photographers[photographer].tags[tag])
        }
    }
};

// generates nav #tags 
tags.forEach((element) => {
    const tag = document.createElement("li");
    document.querySelector(".nav-tag-list").appendChild(tag);
    const tagnode = document.createTextNode("#"+element);
    tag.appendChild(tagnode);
    tag.setAttribute("class", "tag");
    tag.setAttribute("id", element);
    }
)

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
    link.setAttribute("href", "http://127.0.0.1:5500/photographer.html"+"?="+photographers[photographerIndex].name);
    headinglink.setAttribute("href", "https://iliasse-e.github.io/IliasseELABOUYI_6_20082021/photographer.html"+"?="+photographers[photographerIndex].name);

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

for (let i = 0; i < photographers.length; i++ ) {
    generateProfile(i)
}


function filterByTag(id) {

    document.querySelectorAll(".photographer-profile").forEach((photographer) => {
        if (!photographer.getAttribute("class").includes(id)) {
            photographer.setAttribute("tag-selected", "false")
        }
        else {
            photographer.setAttribute("tag-selected", "true")
        }
        console.log(id)
    })
}

// filter profile by tag selected
document.querySelectorAll(".nav-tag-list > .tag").forEach((element) => element.addEventListener('click', () => {filterByTag(element.id)}));

// apply CSS form when tag selected
document.querySelectorAll(".nav-tag-list > .tag").forEach((element) => element.addEventListener('click', () => {
    document.querySelectorAll(".nav-tag-list > .tag").forEach((element) => element.setAttribute("my-tag", "false"));
    document.getElementById(element.id).setAttribute("my-tag", "true");
    document.querySelectorAll(".tag").forEach((photographer) => {
        photographer.removeAttribute("onclick")
    })
    document.getElementById(element.id).setAttribute("onclick", "resetTagSearch()");
}))




}, 100);

// reset tag selection
function resetTagSearch() {
    document.querySelectorAll(".nav-tag-list > .tag").forEach((element) => element.removeAttribute("my-tag"));

    document.querySelectorAll(".nav-tag-list > .tag").forEach((element) => element.removeAttribute("onclick"));
    
    document.querySelectorAll(".photographer-profile").forEach((photographer) => {
        photographer.removeAttribute("tag-selected")
    })
}