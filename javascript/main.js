import { generateProfile } from "./profile.js";
import { tabindexAdder } from "./tabindex.js";
import { FilterCreator } from "./filters.js"

// import (photographer profil) json data
fetch('https://iliasse-e.github.io/IliasseELABOUYI_6_20082021/JSON/photographer.json')
.then(function (response) {
  console.log("Je suis la");
  if (response.ok) {
    response.json().then(data => {
      let photographers = data["photographers"];

      // gathers available tags
      let tags = [];
      for (let photographer = 0; photographer < photographers.length; photographer++ ) {
          for (let tag = 0; tag < photographers[photographer].tags.length; tag++) {
              if (!tags.includes(photographers[photographer].tags[tag])) {
                  tags.push(photographers[photographer].tags[tag])
              }
          }
      };

      let filters = [];
      for (let photographer = 0; photographer < photographers.length; photographer++ ) {
        for (let tag = 0; tag < photographers[photographer].tags.length; tag++) {
            if (!filters.some(filter => filter["name"] === photographers[photographer].tags[tag])) {
                filters.push(new FilterCreator(photographers[photographer].tags[tag], ["Mimi Keel", "Nabeel Bradford"], "tag tab-element " + photographers[photographer].tags[tag]))
            }
        }
      };

      // displays filters in navigation and under photographer profile
      FilterCreator.displayTag(filters);
      

      for (let i = 0; i < photographers.length; i++ ) {
        generateProfile(photographers, i)
      }

      // DOM Elements
      let navTags =  document.querySelectorAll(".nav-tag-list > .tag"); 
      const photographerProfiles = document.querySelectorAll(".photographer-profile");

      // filters in and off the photographer chosen when filter clicked
      FilterCreator.tagToggle(navTags, photographerProfiles)


      // cleans the DOM up and organize an order for the navigation by tab kayboard
      tabindexAdder(".tab-element");


    })
  }
    else { 
        alert("Les données utilisateurs n'ont pas été chargées")
    }
});
