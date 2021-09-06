/*
* 
*/

export class CreateMedia {
    constructor(id, photographerId, title, tags, likes, date, price, location, type, liked) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.tags = tags;
        this.likes = likes;
        this.date = date;
        this.price = price;
        this.location = location;
        this.type = type;
        this.liked = false;
    }

    // generates photographer image
    displayMedia() {

        //creates HTML element
        const container = document.createElement("figure");
        let media;
        if (this.type == "video") {media = document.createElement("video");}
        else if (this.type == "image") {media = document.createElement("img")}
        const heading = document.createElement("figcaption");
        const title = document.createElement("p");
        const likeCounter = document.createElement("p");
        const like = document.createElement("i");

        // creates a text to attach to the HTML element
        const medianode = document.createTextNode(this.location);
        const titlenode = document.createTextNode(this.title);
        const likeCounternode = document.createTextNode(this.likes);

        // joins the textNodes to HTML element
        media.appendChild(medianode);
        title.appendChild(titlenode);
        likeCounter.appendChild(likeCounternode);
        
        // sets the new element to the DOM
        document.querySelector(".gallery").appendChild(container);
        container.appendChild(media);
        container.appendChild(heading);
        heading.appendChild(title);
        heading.appendChild(likeCounter);
        heading.appendChild(like);

        // attributes a class
        container.classList.add(this.type, "media");
        media.setAttribute("src", "images/" + this.photographerId + "/" + this.location);
        heading.classList.add(this.type + "__heading");
        title.classList.add(this.type + "__heading-title");
        likeCounter.classList.add(this.type + "__heading-like-counter");
        like.classList.add("fas", "fa-heart", "media-like");
    }
}