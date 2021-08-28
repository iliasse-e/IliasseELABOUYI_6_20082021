// gets photogrphers and medias in arrays from json
let photographers = [];
let mediasFromJson = [];

// DOM Elements


//imports photographers
fetch('./JSON/photographer.json')
.then(function (response) {
    console.log("Je suis la");
    if (response.ok) {
        response.json().then(data => {
            photographers = data["photographers"];

            // import medias
            mediasFromJson = data["media"];

            // displays photographer profile
            generateProfile(getPhotographer());

            console.log("Im here")

            class CreateImage {
                constructor(id, photographerId, title, tags, likes, date, price, location, type) {
                    this.id = id;
                    this.photographerId = photographerId;
                    this.title = title;
                    this.tags = tags;
                    this.likes = likes;
                    this.date = date;
                    this.price = price;
                    this.location = location;
                    this.type = "image"

                }
                // generates photographer image
                displayImage() {

                    //creates HTML element
                    const container = document.createElement("section");
                    const image = document.createElement("img");
                    const heading = document.createElement("div");
                    const title = document.createElement("p");
                    const likeCounter = document.createElement("p");
                    const like = document.createElement("i");

                    // creates a text to attach to the HTML element
                    const imagenode = document.createTextNode(this.location);
                    const titlenode = document.createTextNode(this.title);
                    const likeCounternode = document.createTextNode(this.likes);

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
                    container.setAttribute("class", "image media");
                    image.setAttribute("src", "images/" + this.photographerId + "/" + this.location);
                    heading.setAttribute("class", "image__heading");
                    title.setAttribute("class", "image__heading-title");
                    likeCounter.setAttribute("class", "image__heading-like-counter");
                    like.setAttribute("class", "fas fa-heart media-like");
                }
            }

            class CreateVideo {
                constructor(id, photographerId, title, tags, likes, date, price, type) {
                    this.id = id;
                    this.photographerId = photographerId;
                    this.title = title;
                    this.tags = tags;
                    this.likes = likes;
                    this.date = date;
                    this.price = price; 
                    this.type = "video"
                }
                 // generates photographer video
                 displayVideo() {

                    //creates HTML element
                    const container = document.createElement("section");
                    const video = document.createElement("video");
                    const heading = document.createElement("div");
                    const title = document.createElement("p");
                    const likeCounter = document.createElement("p");
                    const like = document.createElement("i");

                    // creates a text to attach to the HTML element
                    const videonode = document.createTextNode(this.location);
                    const titlenode = document.createTextNode(this.title);
                    const likeCounternode = document.createTextNode(this.likes);

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
                    container.setAttribute("class", "video media");
                    video.setAttribute("src", "images/" + this.photographerId + "/" + this.location);
                    heading.setAttribute("class", "video__heading");
                    title.setAttribute("class", "video__heading-title");
                    likeCounter.setAttribute("class", "video__heading-like-counter");
                    like.setAttribute("class", "fas fa-heart media-like");
                }

            }

            // creates and gathers medias
            let medias = []
            for (let media = 0; media < mediasFromJson.length; media++) {
                if (mediasFromJson[media].photographerId === getPhotographerId()) {
                    if (mediasFromJson[media].hasOwnProperty("image")) {
                        medias.push(new CreateImage(mediasFromJson[media]["id"], mediasFromJson[media]["photographerId"], mediasFromJson[media]["title"], mediasFromJson[media]["tags"], mediasFromJson[media]["likes"], mediasFromJson[media]["date"], mediasFromJson[media]["price"], mediasFromJson[media]["image"]))
                }
                    else if (mediasFromJson[media].hasOwnProperty("video")) {
                        medias.push(new CreateVideo(mediasFromJson[media]["id"], mediasFromJson[media]["photographerId"], mediasFromJson[media]["title"], mediasFromJson[media]["tags"], mediasFromJson[media]["likes"], mediasFromJson[media]["date"], mediasFromJson[media]["price"], mediasFromJson[media]["video"]))
                }
                }
                // sorts medias by default
                sortMedias()
            }

            console.log(medias)

            // displays medias
            medias.forEach(media => {
                if (media.type.includes("image")) {media.displayImage()}
                else if (media.type.includes("video")) {media.displayVideo()} 
            })
            
            // adds sort function on <select>
            document.getElementById("sort-by").addEventListener("change", () => {
                
                // removes all medias from page
                document.querySelectorAll(".media").forEach(media => {media.remove()})

                sortMedias()

                // displays sorted medias
                medias.forEach(media => { media.displayImage()})
            })

            // sorts medias Array 
            function sortMedias() {

                // get user <select> input
                let sortBy = document.getElementById("sort-by").value;

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
                medias.sort(compare)
            }

            // adds likes to likes count            
            const likeButtons = document.querySelectorAll(".media-like");
            const likeCounts = document.querySelectorAll(".image__heading-like-counter")

            for (let i = 0; i < document.querySelectorAll(".media-like").length; i++ )  {
                likeButtons[i].addEventListener("click", () => {
                    medias[i].likes += 1;
                    likeCounts[i].innerHTML = medias[i].likes;
                    console.log(medias[0].likes)} )
            }

        })
    }
    else { 
        alert("Les données utilisateurs n'ont pas été chargées")
    }
    console.log("Im here")
});


// gets photographer URI identifier component
const urlParams = window.location.search;

// decodes photographer's URI component (returns Int)
function getPhotographer() {
    for (let photographer = 0; photographer < photographers.length; photographer++) {
        if (urlParams.includes(encodeURIComponent(photographers[photographer].name))) {
            return photographer
        }
    }
}

// converts photographer's name into an id (return Int)
function getPhotographerId() {
    switch (photographers[getPhotographer()].name) {
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
    image.setAttribute("src", "medias/Photographers ID Photos/" + photographers[photographerIndex].portrait);
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





