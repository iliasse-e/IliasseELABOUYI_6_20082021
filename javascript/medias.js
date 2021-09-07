import { lightbox } from "./lightbox.js";
import { CreateMedia } from "./factory.js";
import { generateProfile } from "./profile.js";

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
        let index = "error"
        for (let photographer = 0; photographer < photographers.length; photographer++) {
            if (urlParams == photographers[photographer].id) {
                return index = photographer
            }
        }
      }

      // displays photographer profile
      generateProfile(photographers, getPhotographer());
      
      // creates and gathers medias
      let medias = []
      for (let media = 0; media < mediasFromJson.length; media++) {
        if (mediasFromJson[media].photographerId == urlParams) {
    
          if (mediasFromJson[media].hasOwnProperty("image")) {
              medias.push(new CreateMedia(mediasFromJson[media]["id"], mediasFromJson[media]["photographerId"], mediasFromJson[media]["title"], mediasFromJson[media]["tags"], mediasFromJson[media]["likes"], mediasFromJson[media]["date"], mediasFromJson[media]["price"], mediasFromJson[media]["image"], "image"))
          }
          else if (mediasFromJson[media].hasOwnProperty("video")) {
              medias.push(new CreateMedia(mediasFromJson[media]["id"], mediasFromJson[media]["photographerId"], mediasFromJson[media]["title"], mediasFromJson[media]["tags"], mediasFromJson[media]["likes"], mediasFromJson[media]["date"], mediasFromJson[media]["price"], mediasFromJson[media]["video"], "video"))
          }
        }
        // sorts medias by default
        sortMedias()
      }
      
      // display medias
      medias.forEach(media => {media.displayMedia()})
      
      // adds sort function on <select>
      document.getElementById("sort-by").addEventListener("change", () => {
          
        // removes all medias from page
        document.querySelectorAll(".media").forEach(media => {media.remove()})
        
        sortMedias()
        // displays sorted medias
        medias.forEach(media => {media.displayMedia()})
        like();
        lightbox()

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
      function like() {
        const likeButtons = document.querySelectorAll(".media-like");
        const likeCounts = document.querySelectorAll(".image__heading-like-counter");
        const currentmediaElements = document.querySelectorAll(".media > img");
        document.querySelectorAll(".media-like").forEach((likeBtn, index) => likeBtn.onclick = function addLike() {

          for (let e=0; e < medias.length; e++) {
            if (currentmediaElements[index].innerHTML == medias[e].location) {
              if (medias[e].liked == true) {
                medias[e].likes -= 1;
                likeCounts[index].innerHTML = medias[e].likes;
                medias[e].liked = false;   
              }
              else {
                medias[e].likes += 1;
                likeCounts[index].innerHTML = medias[e].likes;
                medias[e].liked = true;
              }
            }
          }
            
        totalLikeCounter();
        })
      }

      like() 


      // total likes counter
      function totalLikeCounter() {
        let totalLikes = [];
        medias.forEach(media => { totalLikes.push(media.likes)})
        document.querySelector("#total-likes > p").innerHTML = totalLikes.reduce((a, b) => a + b, 0)
      }
      totalLikeCounter()

      lightbox()
      

    })
  }
  else { 
      alert("Les données utilisateurs n'ont pas été chargées")
  }
});


