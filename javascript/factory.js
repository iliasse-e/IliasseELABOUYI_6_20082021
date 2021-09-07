/**
 * This class uses the factory pattern to create media objects and display them
 * The method creates a DOM content from the object which is an image, title,
 * like count and container
 * @param id [int] one number for each media
 * @param photographerId [int] links to its photographer
 * @param title [string] name of the media
 * @param tags [string] array of tag elements
 * @param likes [int] likes number
 * @param date YYYY-MM-DD
 * @param price [int] price of the media
 * @param location [int] Name of the file to bring in (ex: "animal_zoo.jpg")
 * @param type [string] Defines if the media is an image or video (takes "image" or "video")
 * @param liked [bool] by default "false", it will be "true" when user is going to "like"
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

  /**
   * This method of class creates from a new media :
   * new nodes,
   * generates them on the DOM,
   * gives them attributes
   */
  displayMedia() {
    // creates HTML element
    const container = document.createElement("figure");
    let media;
    if (this.type == "video") {
      media = document.createElement("video");
    } else if (this.type == "image") {
      media = document.createElement("img");
    }
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
    media.setAttribute("src", `images/${this.photographerId}/${this.location}`);
    heading.classList.add(`${this.type}__heading`);
    title.classList.add(`${this.type}__heading-title`);
    likeCounter.classList.add(`${this.type}__heading-like-counter`);
    like.classList.add("fas", "fa-heart", "media-like");
  }
}
