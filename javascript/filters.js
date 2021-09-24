/** 
 * @param {string} name name of the filter
 * @param {Array} photographers photographers having this filter
 * @param {String} classname classes of the filter
 */

 export class FilterCreator {

  constructor(name, photographers, classname) {
    this.name = name;
    this.photographers = photographers;
    this.classname = classname;
  }

  // adds filter tags in DOM
  static displayTag(filters) {
    filters.forEach((filter) => {
      const tag = document.createElement("li");
      document.querySelector(".tag-list").appendChild(tag);
      const tagnode = document.createTextNode("#"+filter.name);
      tag.appendChild(tagnode);
      tag.className = filter.classname;
      tag.setAttribute("filter", filter.name);
      }
    )
  }

  /**
   * Toogles on and off the photographers filtered by tag
   * @param {Array} filters array of DOM elements (filters already displayed)
   * @param {Array} photographers array of DOM elements (photographers already displayed) 
   */
  static tagToggle(filters, photographers) {

    // sticks CSS attributes and filter profiles
    filters.forEach((filter) => filter.addEventListener("click", () => {
          
      FilterCreator.filterByTag(filter.getAttribute("filter"), photographers);
      
      if (filter.getAttribute("my-tag") !== "true") {
          filters.forEach((filter) => {
            filter.setAttribute("my-tag", "false");
            filter.setAttribute("aria-checked", "false")
          });
          filter.setAttribute("my-tag", "true");
          filter.setAttribute("aria-checked", "true")
      }
      
      // resets tag selection
      else {
          filters.forEach((filter) => filter.setAttribute("my-tag", ""));
            photographers.forEach((photographer) => {
              photographer.removeAttribute("tag-selected")
            })
      }
    }))
  }

  /**
   * Displays filtered profiles
   * @param {Array} id identifier of filter
   * @param {Array} photographers array of photographers already displayed on DOM
   */
  static filterByTag(id, photographers) {
    console.log(id)
    photographers.forEach((photographer) => {
        if (!photographer.getAttribute("class").includes(id)) {
            photographer.setAttribute("tag-selected", "false")
        }
        else {
            photographer.setAttribute("tag-selected", "true")
        }
    })
  }


}
