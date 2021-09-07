import { generateProfile } from "./profile.js";

// import (photographer profil) json data
fetch('./JSON/photographer.json')
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

      // displays nav #tags 
      tags.forEach((element) => {
        const tag = document.createElement("li");
        document.querySelector(".nav-tag-list").appendChild(tag);
        const tagnode = document.createTextNode("#"+element);
        tag.appendChild(tagnode);
        tag.classList.add("tag");
        tag.setAttribute("id", element);
        }
      )



      for (let i = 0; i < photographers.length; i++ ) {
        generateProfile(photographers, i)
      }


      // DOM Elements
      let navTags =  document.querySelectorAll(".nav-tag-list > .tag"); 
      const photographerProfiles = document.querySelectorAll(".photographer-profile");

      function filterByTag(id) {
        photographerProfiles.forEach((photographer) => {
            if (!photographer.getAttribute("class").includes(id)) {
                photographer.setAttribute("tag-selected", "false")
            }
            else {
                photographer.setAttribute("tag-selected", "true")
            }
        })
      }

      navTags.forEach((element) => element.setAttribute("my-tag", ""));
      // sticks CSS attributes and filter profiles
      navTags.forEach((element) => element.addEventListener("click", () => {
          
        // displays filtered profiles
        filterByTag(element.id)
        
        if (element.getAttribute("my-tag") !== "true") {
            navTags.forEach((element) => element.setAttribute("my-tag", "false"));
            element.setAttribute("my-tag", "true");
        }
        
        // resets tag selection
        else {
                navTags.forEach((element) => element.setAttribute("my-tag", ""));
                photographerProfiles.forEach((photographer) => {
                    photographer.removeAttribute("tag-selected")
                })
        }
      }))


    })
  }
    else { 
        alert("Les données utilisateurs n'ont pas été chargées")
    }
});
