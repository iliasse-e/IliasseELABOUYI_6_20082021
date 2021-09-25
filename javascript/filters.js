/** 
 * @param {string} name name of the filter
 * @param {Array} photographers photographers having this filter
 * @param {String} classname classes of the filter
 */

 export class Filter {

  constructor(name, photographers, classname) {
    this.name = name;
    this.photographers = photographers;
    this.classname = classname;
  }

  // adds parameter in url


  // adds filter tags in DOM
  static displayTag(filters) {
    filters.forEach((filter) => {
      const tag = document.createElement("li");
      document.querySelector(".nav-tag-list").appendChild(tag);
      const tagnode = document.createTextNode("#"+filter.name);
      tag.appendChild(tagnode);
      tag.className = filter.classname;
      tag.setAttribute("filter", filter.name);
      }
    )
  }

  // adds filter tags in profile card DOM
  static displayProfileTags(photographers, filters) {
    photographers.forEach((photographer, index) => {
      filters.forEach((filter) => {
        if (filter.photographers.includes(photographer.name)) {
          const tag = document.createElement("li");
          document.querySelector(`[photographer="${photographer.name}"]`).appendChild(tag);
          const tagnode = document.createTextNode("#"+filter.name);
          tag.appendChild(tagnode);
          tag.className = filters[index].classname;
          tag.setAttribute("filter", filters[index].name);
        }
      })
    })
  }

  /**
   * Toogles on and off the photographers filtered by tag
   * @param {Array} filters array of DOM elements (filters already displayed)
   * @param {Array} photographers array of DOM elements (photographers already displayed) 
   */
  static tagToggle(filters, photographers) {

    const homeUrl = new URL("https://iliasse-e.github.io/IliasseELABOUYI_6_20082021/");
    let search = homeUrl.search;

    // sticks CSS attributes and filter profiles
    filters.forEach((filter) => filter.addEventListener("click", () => {
      
      if (filter.getAttribute("my-tag") !== "true") {
          filters.forEach((filter) => {
            filter.setAttribute("my-tag", "false");
            filter.setAttribute("aria-checked", "false")
          });
          filter.setAttribute("my-tag", "true");
          filter.setAttribute("aria-checked", "true")
          search = "?filter=" +filter.getAttribute("filter");
      }
      
      // resets tag selection
      else {
          filters.forEach((filter) => filter.setAttribute("my-tag", ""));
            photographers.forEach((photographer) => {
              photographer.removeAttribute("tag-selected")
            })
            search = "";
      }

      Filter.filterByTag(search.substring(8), photographers);

    }))
  }

  /**
   * Displays filtered profiles
   * @param {Array} id identifier of filter
   * @param {Array} photographers array of photographers already displayed on DOM
   */
  static filterByTag(id, photographers) {
  
    photographers.forEach((photographer) => {
        if (!photographer.getAttribute("class").includes(id)) {
            photographer.setAttribute("tag-selected", "false")
        }
        else {
            photographer.setAttribute("tag-selected", "true")
        }
    })
  }

  static profileFilters(profileFilters) {

    profileFilters.forEach((filter) => filter.addEventListener("click", () => {
      console.log("tag");
      const tag = filter.getAttribute("filter");
      document.querySelector(".nav-tag-list > ." + tag).click()
    })
    
    )

  }


}
