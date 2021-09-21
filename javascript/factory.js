/**
 * This class uses the factory pattern to create media objects and display them
 * The method creates a DOM content from the object which is an image, title,
 * like count and container
 */

export class CreateMedia {
  /** 
   * @param {Number} id one number for each media
   * @param {Number} photographerId links to its photographer
   * @param {String} title name of the media
   * @param {Array} tags array which contains tag elements
   * @param {Number} likes likes number
   * @param {Date} date YYYY-MM-DD
   * @param {Number} price price of the media
   * @param {String} location Name of the file to bring in (ex: "animal_zoo.jpg")
   * @param {String} type Defines if the media is an image or video (takes "image" or "video")
   * @param {String} alt only for images, alt text
   * @param {Boolean} liked by default "false", it will be "true" when user is going to "like" the media
   */
  constructor(id, photographerId, title, tags, likes, date, price, location, type, alt, liked ) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.location = location;
    this.type = type;
    this.alt=alt;
    this.liked = false;
  }

  /**
   * This method get the type (image, video) to create a media
   * @param {any} target element to analyse
   * @returns {String} type of media (image or video)
   */
  static getType(target) {
    if (target.hasOwnProperty("image")) {
      return "image"
    }
    else if (target.hasOwnProperty("video")) {
      return "video"
    }
  }

  /**
   * This method of class creates from an Object :
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

    // sets attributes
    container.classList.add(this.type, "media");
    media.setAttribute("src", `images/${this.photographerId}/${this.location}`);
    media.classList.add("tab-element");
    if (this.type == "image") { media.setAttribute("alt", this.alt);}
    heading.classList.add("media__heading");
    title.classList.add("media__heading-title");
    likeCounter.classList.add("media__heading-like-counter");
    like.classList.add("fas", "fa-heart", "media-like");

    //sets aria attributes
    likeCounter.setAttribute("aria-label", "nombre de like")
  }
}
