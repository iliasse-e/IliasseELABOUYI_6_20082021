
//imports photographers
fetch('./JSON/photographer.json')
.then(function (response) {
    console.log("Je suis la");
    if (response.ok) {
        response.json().then(data => {
           
            // import medias and photographers
            let mediasFromJson = data["media"];
            let photographers = data["photographers"];

            // gets photographer URI identifier component
            const urlParams = window.location.search.substring(2);

            // decodes photographer's URI component (returns Int)
            function getPhotographer() {
                for (let photographer = 0; photographer < photographers.length; photographer++) {
                    if (urlParams == photographers[photographer].id) {
                        return photographer
                    }
                }
            }

            // generates photographer profile
            function generateProfile(photographerIndex) {

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

                // adds price to fixed figure
                document.getElementById("photographer-price").innerHTML = photographers[photographerIndex].price + "€/ jour";
            }

            // displays photographer profile
            generateProfile(getPhotographer());

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
                    const container = document.createElement("figure");
                    const image = document.createElement("img");
                    const heading = document.createElement("figcaption");
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
                constructor(id, photographerId, title, tags, likes, date, price, location, type) {
                    this.id = id;
                    this.photographerId = photographerId;
                    this.title = title;
                    this.tags = tags;
                    this.likes = likes;
                    this.date = date;
                    this.price = price;
                    this.location = location; 
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
                if (mediasFromJson[media].photographerId == urlParams) {

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

            // displays all medias
            function generateMedias() {
                medias.forEach(media => {
                    if (media.type.includes("image")) {media.displayImage()}
                    else if (media.type.includes("video")) {media.displayVideo()} 
                })
            }
            generateMedias()
            
            // adds sort function on <select>
            document.getElementById("sort-by").addEventListener("change", () => {
                
                // removes all medias from page
                document.querySelectorAll(".media").forEach(media => {media.remove()})
                
                sortMedias()
                console.log(medias)
                // displays sorted medias
                generateMedias()
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
            for (let i = 0; i < document.querySelectorAll(".media-like").length; i++ )  {
                const likeButtons = document.querySelectorAll(".media-like");
                const likeCounts = document.querySelectorAll(".image__heading-like-counter")

                likeButtons[i].addEventListener("click", function addLike() {
                    medias[i].likes += 1;
                    likeCounts[i].innerHTML = medias[i].likes;
                    totalLikesDisplay();
                    likeButtons[i].removeEventListener("click", addLike)
                } )
            }

            // total likes counter
            function totalLikesDisplay() {
                let totalLikes = [];
                medias.forEach(media => { totalLikes.push(media.likes)})
                document.querySelector("#total-likes > p").innerHTML = totalLikes.reduce((a, b) => a + b, 0)
            }
            totalLikesDisplay()
            

            // DOM Element

            const closeBtn = document.getElementById("lightbox-close");
            const nextBtn = document.getElementById("lightbox-next");
            const prevBtn = document.getElementById("lightbox-prev");
            const lightbox = document.getElementById("lightbox");
            const lightboxHeading = document.getElementById("lightbox-title")
            const mediaContainer = document.getElementById("lightbox-container")
            const mediasDOM = document.querySelectorAll(".media > img, video")
            
            // close lightbox
            function closeLightbox() {
                lightbox.style.display = "none";
                mediaContainer.removeChild(document.getElementById("lightbox-media"))
            }

            closeBtn.addEventListener("click", closeLightbox)
            document.getElementById("blocker").addEventListener("click", closeLightbox)


            // launch lightbox
            mediasDOM.forEach((element, index) =>  element.addEventListener("click", () => {
            
                lightbox.style.display = "flex";
                const media = document.createElement(element.localName);
                media.setAttribute("id", "lightbox-media")
                media.src = element.src;
                mediaContainer.appendChild(media);
                lightboxHeading.innerHTML = element.nextSibling.firstChild.innerHTML;
                let e = index;
                
                //next media
                nextBtn.onclick= () => {
                
                    if (mediasDOM[e + 1] !== undefined) {
                        document.getElementById("lightbox-media").remove()
                        const nextMedia = document.createElement(mediasDOM[e +1].localName);
                        nextMedia.src = mediasDOM[e +1].src;
                        mediaContainer.appendChild(nextMedia);
                        nextMedia.setAttribute("id", "lightbox-media");
                        lightboxHeading.innerHTML = mediasDOM[e +1].nextSibling.firstChild.innerHTML;
                        e++
                    }
                    else {
                        lightbox.style.display = "none";
                        document.getElementById("lightbox-media").remove()
                    }
                }
                
                //previous media
                prevBtn.onclick= () => {

                    if (mediasDOM[e - 1] !== undefined) {
                        document.getElementById("lightbox-media").remove()
                        const nextMedia = document.createElement(mediasDOM[e -1].localName);
                        nextMedia.src = mediasDOM[e -1].src;
                        mediaContainer.appendChild(nextMedia);
                        nextMedia.setAttribute("id", "lightbox-media");
                        lightboxHeading.innerHTML = mediasDOM[e -1].nextSibling.firstChild.innerHTML;
                        e--
                    }
                    else {
                        lightbox.style.display = "none";
                        document.getElementById("lightbox-media").remove()
                    }
                }
                }
            ))
            

        })
    }
    else { 
        alert("Les données utilisateurs n'ont pas été chargées")
    }
});


