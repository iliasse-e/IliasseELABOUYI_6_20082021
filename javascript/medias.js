
let photographers = [];
let medias = [];

//imports photographers
fetch('./JSON/photographer.json')
.then(function (response) {
    console.log("Je suis la");
    if (response.ok) {
        response.json().then(data => {
            photographers = data["photographers"];

            // import medias
            medias = data["media"];

            for (let media = 0; media < photographerMediasArray().length; media++) {
                console.log(media);
                console.log(photographerMediasArray());
                factory(photographerMediasArray(),media);
            };

            generateProfile(identifyPhotographer());

            console.log("Im here")
        })
    }
    else { 
        alert("Les données utilisateurs n'ont pas été chargées")
    }
    console.log("Im here")
});



// identifies photographer from URL
const urlParams = window.location.search;

// identifies current photographer (return Int)
function identifyPhotographer() {
    for (let photographer = 0; photographer < photographers.length; photographer++) {
        if (urlParams.includes(encodeURIComponent(photographers[photographer].name))) {
            return photographer
        }
    }
}

// gather medias of the current photographer and organizes it (throught select)
function photographerMediasArray() {
    let myArray = [];

    // get user <select> input
    let sortBy = document.getElementById("sort-by").value;
    
    // fill the array
    for (let media = 0; media < medias.length; media++) {
        if (medias[media].photographerId === getPhotographerId()) {
            myArray.push(medias[media])
        }
    }

    // func that changes the order of array when called
    function compare( a, b ) {
        if ( a[sortBy] < b[sortBy] ){
          return -1;
        }
        if ( a[sortBy] > b[sortBy] ){
          return 1;
        }
        return 0;
    }

    // sorts the array
    myArray.sort(compare)
    return myArray
}

// converts photographer's name into an id (return Int)
function getPhotographerId() {
    switch (photographers[identifyPhotographer()].name) {
        case "Mimi Keel":
            return 243;
            break;
        case "Rhode Dubois":
            return 925;
        break;
        case "Marcel Nikolic":
            return 195;
        break;
        case "Nabeel Bradford":
            return 527;
        break;
        case "Tracy Galindo":
            return 82;
        break;
        case "Ellie-Rose Wilkens":
            return 930;
        break
    }
}

// generates photographer image
function generateImage(index) {

    //creates HTML element
    const container = document.createElement("section");
    const image = document.createElement("img");
    const heading = document.createElement("div");
    const title = document.createElement("p");
    const likeCounter = document.createElement("p");
    const like = document.createElement("i");

    // creates a text to attach to the HTML element
    const imagenode = document.createTextNode(photographerMediasArray()[index].image);
    const titlenode = document.createTextNode(photographerMediasArray()[index].title);
    const likeCounternode = document.createTextNode(photographerMediasArray()[index].likes);

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
    image.setAttribute("src", "images/" + getPhotographerId() + "/" + photographerMediasArray()[index].image);
    heading.setAttribute("class", "image__heading");
    title.setAttribute("class", "image__heading-title");
    likeCounter.setAttribute("class", "image__heading-like-counter");
    like.setAttribute("class", "fas fa-heart image-like");
}

// generates photographer video
function generateVideo(index) {

    //creates HTML element
    const container = document.createElement("section");
    const video = document.createElement("video");
    const heading = document.createElement("div");
    const title = document.createElement("p");
    const likeCounter = document.createElement("p");
    const like = document.createElement("i");

    // creates a text to attach to the HTML element
    const videonode = document.createTextNode(photographerMediasArray()[index].video);
    const titlenode = document.createTextNode(photographerMediasArray()[index].title);
    const likeCounternode = document.createTextNode(photographerMediasArray()[index].likes);

    // joins the textNodes to HTML element
    video.appendChild(videonode);
    title.appendChild(titlenode);
    likeCounter.appendChild(likeCounternode);
    
    // sets the new element to the DOM
    document.querySelector(".gallery").appendChild(container);
    container.appendChild(video);
    container.appendChild(heading);
    heading.appendChild(title);
    heading.appendChild(likeCounter);
    heading.appendChild(like);

    // attributes a class
    container.setAttribute("class", "video");
    video.setAttribute("src", "images/" + getPhotographerId() + "/" + photographerMediasArray()[index].video);
    heading.setAttribute("class", "video__heading");
    title.setAttribute("class", "video__heading-title");
    likeCounter.setAttribute("class", "video__heading-like-counter");
    like.setAttribute("class", "fas fa-heart image-like");
}

// generates photographer profile
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

function factory(array, index) {
    console.log(array)
    if (array[index].hasOwnProperty("image")) {
            return generateImage(index)
    }
    else if (array[index].hasOwnProperty("video")) {
            return generateVideo(index)
    }
}

