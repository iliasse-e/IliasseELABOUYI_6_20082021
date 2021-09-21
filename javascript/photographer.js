import { lightbox } from "./lightbox.js";
import { CreateMedia } from "./factory.js";
import { generateProfile } from "./profile.js";
import { tabindexAdder } from "./tabindex.js";
import { like, totalLikeCounter } from "./like.js"

//imports photographers
fetch('https://iliasse-e.github.io/IliasseELABOUYI_6_20082021/JSON/photographer.json')
.then(function (response) {
  console.log("Je suis la");
  if (response.ok) {
    response.json().then(data => {
        
      // import medias and photographers
      let mediasFromJson = data["media"];
      let photographers = data["photographers"];

      // gets photographer URI identifier component
      const urlParams = window.location.search.substring(2);

      /**
       * Decodes photographer's URI component
       * @returns {Number} photographer id 
       */
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
      
      let medias = [];

      /**
       * creates and gathers medias in array and display each media
       */
      function createmedias() {
        for (let media = 0; media < mediasFromJson.length; media++) {
          if (mediasFromJson[media].photographerId == urlParams) {

                medias.push(new CreateMedia(
                  mediasFromJson[media]["id"],
                  mediasFromJson[media]["photographerId"],
                  mediasFromJson[media]["title"],
                  mediasFromJson[media]["tags"],
                  mediasFromJson[media]["likes"],
                  mediasFromJson[media]["date"], 
                  mediasFromJson[media]["price"], 
                  mediasFromJson[media][CreateMedia.getType(mediasFromJson[media])], 
                  CreateMedia.getType(mediasFromJson[media]),
                  mediasFromJson[media]["alt"],
                ))
          }
          // sorts medias by default
          sortMedias(medias)
        }
        // display medias
        medias.forEach(media => {media.displayMedia()})
      }

      createmedias()
      
      // adds sort function on <select>
      document.getElementById("sort-by").addEventListener("change", () => {
          
        // removes all medias from page
        document.querySelectorAll(".media").forEach(media => {media.remove()})
        
        sortMedias(medias)
        // displays sorted medias
        medias.forEach(media => {media.displayMedia()})
        like();
        lightbox();
        tabindexAdder(".tab-element");
      })

      /**
       * Sorts array elements by category selected (name, date or popularity)
       * @param {array} target 
       */
      function sortMedias(target) {

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
        target.sort(compare)
      }

      like(medias) 

      totalLikeCounter(medias);

      tabindexAdder(".tab-element");

      lightbox();

    })
  }
  else { 
      alert("Les données utilisateurs n'ont pas été chargées")
  }
});


